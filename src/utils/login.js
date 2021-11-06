import context from '@/main.js';
import {
	getCode
} from '@/src/utils/user.js'


//无感知登录
/**
 * @param {boolean}  = [setStorage]  是否需要存储在本地
 */
export const drvMpLogin = (setStorage = true) => {
	return new Promise(async (resolve, reject) => {
		try {
			const params = {
				code: await getCode(),
				type: 1,
			}
			const {
				token: userToken,
				userInfo: userinfoXY,
				drv_info,
				is_drv
			} = await context.$http.api.drvMpLogin(params)
			if (setStorage) {
				uni.setStorageSync('userToken', userToken)
				uni.setStorageSync('userinfoXY', userinfoXY)
				uni.setStorageSync('drv_info', drv_info)
				uni.setStorageSync('is_drv', is_drv)
			}
			resolve({
				userToken,
				userinfoXY
			})
		} catch (err) {
			console.log(err)
		}
	})
}

//微信登录
export const loginWx = (rawUserInfo) => {
	return new Promise(async (resolve, reject) => {
		try {
			const params = {
				code: await getCode(),
				encryptedData: rawUserInfo.encryptedData,
				iv: rawUserInfo.iv
			}
			resolve(await context.$u.api.mplogin(params))
		} catch (err) {
			console.log(err)
			reject()
		}

	})
}
/**
 * 判断用户是否是司机身份
 */
export const checkUserIsDriver = () => {
	return new Promise((resolve, reject) => {
		const is_drv = uni.getStorageSync('is_drv')
		if (is_drv) {
			resolve(true)
		} else {
			reject(false)
		}
	})

}
/**
 * 判断用户是否已经登录
 */
export const checkUserIsLogin = () => {
	return new Promise((resolve, reject) => {
		const userinfoXY = uni.getStorageSync('userinfoXY')
		if (userinfoXY && userinfoXY.login_status !== 0) {
			resolve(true)
		} else {
			reject(false)
		}
	})

}
/**
 * 判断用户是否已经绑定
 */
export const checkUserIsBind = () => {
	return new Promise((resolve, reject) => {
		const userinfoXY = uni.getStorageSync('userinfoXY')
		if (userinfoXY && userinfoXY.login_status === 2) {
			resolve(true)
		} else {
			reject(false)
		}
	})

}
/**
 * 判断是否处于企业微信环境下
 */
export const checkQyWechatEnv = () => {
	const info = uni.getSystemInfoSync()
	if (info.environment && info.environment === 'wxwork') {
		return true
	} else {
		return false
	}
}

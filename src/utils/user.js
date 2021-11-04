// 获取微信code
export const getCode = () => {
	return new Promise((resolve, reject) => {
		uni.login({
			success: res => {
				resolve(res.code)
			},
			fail: err => {
				console.log(err)
				reject(err)
			}
		});
	})
}
// 获取微信code
export const getQyCode = () => {
	return new Promise((resolve, reject) => {
		wx.qy.login({
			success: res => {
				resolve(res.code)
			},
			fail: err => {
				console.log(err)
				reject(err)
			}
		});
	})
}
//获取用户信息
export const getUserInfoRes = () => {
	return new Promise((resolve, reject) => {
		uni.getUserProfile({
			desc: '需要获取您的头像昵称等信息',
			success: (infoRes) => {
				resolve(infoRes)
			},
			fail: err => {
				console.log(err)
				reject(err);
			}
		});
	});
}
import Request from '@/src/vendor/luch-request/index.js'
import {
	ONLINEHOST
} from '@/src/config/index.js'
import {
	mplogin
} from '@/src/utils/login.js'

const http = new Request();

/* 全局配置*/
http.setConfig((config) => {
	config.baseURL = ONLINEHOST; /* 根域名 */
	return config
})

/**
 * 请求拦截
 */
http.interceptors.request.use((config, cancel) => {
	uni.showLoading({
		title: '正在获取数据'
	})
	/* cancel 为函数，如果调用会取消本次请求。需要注意：调用cancel,本次请求的catch仍会执行。必须return config */
	const userToken = uni.getStorageSync('userToken')
	config.header = {
		...config.header,
		userToken
	}
	return config
})

/**
 * 请求后拦截
 */

let isRefreshing = false
let requests = []
http.interceptors.response.use(async (response) => {
	uni.hideLoading()
	//如果不存在code，报错
	if (!response.data.code) {
		console.error('不存在code状态码，请检查接口是否填写正确', response)
		uni.showModal({
			title: '提示',
			showCancel: false,
			content: `与服务端通讯出现错误，请联系客服反馈，${response.data}`
		})

	}
	//非200情况
	if (response.data && response.data.code !== 200) {
		if (response.data.code == 401) {
			const {
				config
			} = response
			if (!isRefreshing) {
				isRefreshing = true
				await mplogin()
				requests.forEach(cb => cb())
				// 重试完了清空这个队列
				requests = []
				isRefreshing = false
				return http.request(config)
			} else {
				return new Promise((resolve) => {
					// 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
					requests.unshift(() => {
						resolve(http.request(config))
					})
				})
			}
		}
		//其他非200请求拦截
		if (response.data.url) {
			//后端指定跳转
			uni.showModal({
				title: '提示',
				content: response.data.msg,
				success: (res) => {
					if (res.confirm) {
						uni.navigateTo({
							url: response.data.url
						})
					}
				}
			})
			return Promise.reject(response)
		}
		uni.showModal({
			title: '提示',
			showCancel: false,
			content: response.data.msg
		})
		return Promise.reject(response);
	}
	//正常200返回
	// if(response.config.url === "/platform.Userservice/checkIsDrv"){
	// 	return response.data
	// }
	return response.data.data
}, (err) => {
	/*  对响应错误做点什么 （statusCode !== 200）*/
	console.log(err)

	//这里是根据statusCode进行处理，一般是出现断网等严重问题
	uni.hideLoading()
	//后端反馈错误
	try {
		if (err.data && err.data.data) {
			uni.showModal({
				title: '提示',
				showCancel: false,
				content: err.data.data.msg
			})
		}
		uni.showToast({
			title: '错误:' + err,
			duration: 3000,
			icon: 'none'
		})
	} catch (err) {
		uni.showToast({
			title: '错误:' + err,
			duration: 3000,
			icon: 'none'
		})
	}

	return Promise.reject(err)
})

export default http

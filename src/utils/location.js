import {
	TencentLocationKey
} from '@/src/config/index.js'
//调用原生接口获取经纬度
export const getLocation = () => {
	return new Promise((resolve, reject) => {
		uni.getLocation({
			type: 'gcj02',
			success: res => {
				resolve({
					longitude: res.longitude,
					latitude: res.latitude
				})
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}
// 腾讯逆地址解析（经纬度——>中文地址）
export const getAddress = (location) => {
	return new Promise(async (resolve, reject) => {
		uni.request({
			url: 'https://apis.map.qq.com/ws/geocoder/v1/',
			data: {
				location,
				key: TencentLocationKey
			},
			success: (res) => {
				const address = res.data.result
				//当	结合知名地点形成的描述性地址 存在是优先返回，不存在时直接返回以行政区划+道路+门牌号等信息组成的标准格式化地址
				if (JSON.stringify(address.formatted_addresses) !== '{}') {
					resolve({
						name: address.formatted_addresses.recommend,
						location
					})
				} else {
					resolve({
						name: address.address,
						location
					})
				}
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

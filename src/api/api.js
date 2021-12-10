// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F

const install = (Vue, vm) => {
	// 此处使用了传入的params参数，一切自定义即可
	const drvMpLogin = (params = {}) => vm.$http.post(`/platform.pubservice/drvMpLogin`, params);
	const resignAsDriver = (params = {}) => vm.$http.post(`/platform.Userservice/resignAsDriver`, params);
	const getMyOrderList = (params = {}) => vm.$http.post(`/gwyc.driver/getMyOrderList`, params);
	const setOrderStart = (params = {}) => vm.$http.post(`/gwyc.driver/setOrderStart`, params);
	const setOrderDone = (params = {}) => vm.$http.post(`/gwyc.driver/setOrderDone`, params);
	const checkIsDrv = (params = {}) => vm.$http.post(`/platform.Userservice/checkIsDrv`, params);
	const getCarPrice = (params = {}) => vm.$http.post('/gwyc.apply/getCarPrice', params);
	const getOrderInfo = (params = {}) => vm.$http.post('/gwyc.driver/getOrderDetail', params);
	const setOrderHalfMile = (params = {}) => vm.$http.post('/gwyc.driver/setOrderHalfMile', params);
	const drvBindPhone = (params = {}) => vm.$http.post('/platform.Userservice/drvBindPhone', params);
	// 将各个定义的接口名称，统一放进对象挂载到vm.$http.api(因为vm就是this，也即this.$http.api)下
	vm.$http.api = {
		drvMpLogin,
		resignAsDriver,
		getMyOrderList,
		setOrderStart,
		setOrderDone,
		checkIsDrv,
		getCarPrice,
		getOrderInfo,
		setOrderHalfMile,
		drvBindPhone
	};
}

export default {
	install
}

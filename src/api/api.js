// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F

const install = (Vue, vm) => {
	// 此处使用了传入的params参数，一切自定义即可
	const mplogin = (params = {}) => vm.$http.post(`/platform.Pubservice/mplogin`, params);
	const getPubNotice = (params = {}) => vm.$http.post(`/platform.index/getPubNotice`, params);
	const getSwiper = (params = {}) => vm.$http.post(`/platform.index/getSwiper`, params);
	const getQa = (params = {}) => vm.$http.post(`/platform.index/getQa`, params);
	const getCarList = (params = {}) => vm.$http.post('/gwyc.apply/getCarList', params);
	const bindWechatUserInfo = (params = {}) => vm.$http.post('/platform.Userservice/bindWechatUserInfo', params);
	const getDepartmentList = (params = {}) => vm.$http.post('/gwyc.apply/getDepartmentList', params);
	const getCarApplyReason = (params = {}) => vm.$http.post('/gwyc.apply/getCarApplyReason', params);
	const getCarPrice = (params = {}) => vm.$http.post('/gwyc.apply/getCarPrice', params);
	const doApply = (params = {}) => vm.$http.post('/gwyc.apply/doApply', params);
	const getApplyDetail = (params = {}) => vm.$http.post('/gwyc.apply/getApplyDetail', params);
	const getMyApplyList = (params = {}) => vm.$http.post('/gwyc.apply/getMyApplyList', params);
	const getPrePrice = (params = {}) => vm.$http.post('/gwyc.apply/getPrePrice', params);
	const getApplyList = (params = {}) => vm.$http.post('/gwyc.review/getApplyList', params);
	const getApplyDetail_admin = (params = {}) => vm.$http.post('/gwyc.review/getApplyDetail', params);
	const getCwProjects = (params = {}) => vm.$http.post('/gwyc.review/getCwProjects', params);
	const getReviewTags = (params = {}) => vm.$http.post('/gwyc.review/getReviewTags', params);
	const revokeApply = (params = {}) => vm.$http.post('/gwyc.apply/revokeApply', params);
	const urgeCheck = (params = {}) => vm.$http.post('gwyc.apply/urgeCheck', params);
	const doCheck = (params = {}) => vm.$http.post('/gwyc.review/doCheck', params);
	const getNoCheckNum = (params = {}) => vm.$http.post('gwyc.review/getNoCheckNum', params);
	const getOrderInfo = (params = {}) => vm.$http.post('/gwyc.Orders/getOrderInfo', params);
	const getOrderList = (params = {}) => vm.$http.post('/gwyc.Orders/getOrderList', params);
	const getDistanceFromDepart = (params = {}) => vm.$http.post('/gwyc.Orders/getDistanceFromDepart', params);
	// 将各个定义的接口名称，统一放进对象挂载到vm.$http.api(因为vm就是this，也即this.$http.api)下
	vm.$http.api = {
		mplogin,
		getPubNotice,
		getSwiper,
		getQa,
		getCarList,
		bindWechatUserInfo,
		getDepartmentList,
		getCarApplyReason,
		getCarPrice,
		doApply,
		getApplyDetail,
		getMyApplyList,
		getPrePrice,
		getApplyList,
		getApplyDetail_admin,
		getCwProjects,
		getReviewTags,
		revokeApply,
		urgeCheck,
		doCheck,
		getNoCheckNum,
		getOrderInfo,
		getOrderList,
		getDistanceFromDepart
	};
}

export default {
	install
}

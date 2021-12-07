<template>
	<view class="special-trip-container ">
		<view class="top-shadow"></view>
		<!-- 待安排司机wait/派单失败 -->
		<!-- 只需要将用户出发点居中即可 -->
		<map
			id="map"
			v-if="isGetResult"
			class="cc-map"
			:markers="markers"
			:longitude="departLocation.longitude"
			:latitude="departLocation.latitude"
			:polyline="mapPolyline"
			layer-style="1"
		></map>
		<!-- 顶部说明 -->
		<forecast v-if="currentTripStauts === 'car_ok'" />
		<view class="cc-float-layout__container static-block">
			<!-- <callThePolice  @callPolice="callPolice"/> -->
			<feeInfo @signature="signature" @goFeeDetail="goFeeDetail" :tripDetail="tripDetail" />
		</view>
	</view>
</template>

<script>
import forecast from './components/forecast.vue';
import callThePolice from './components/callThePolice.vue';
import watingCar from './components/watingCar.vue';
import feeInfo from './components/feeInfo.vue';
export default {
	components: {
		forecast,
		callThePolice,
		watingCar,
		feeInfo
	},
	onReady: function(e) {
		//创建 map 上下文 MapContext 对象。
		this.mapCtx = wx.createMapContext('map', this);
		console.log(this.mapCtx);
	},
	onLoad(option) {
		//获取地图实例
		// const id = 10061;
		const id = option.id;
		this.id = id;
		this.getOrderInfo(id);
		this.timer = setInterval(id => {
			this.getOrderInfo(this.id);
		}, 10000);
	},
	onUnload() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	},
	computed: {
		mapPolyline() {
			if (this.isGetResult) {
				const points = this.tripDetail.trip_info.path_info.map(item => {
					return {
						longitude: item[0],
						latitude: item[1]
					};
				});
				return [
					{
						points: points,
						width: 8,
						dottedLine: false,
						zIndex: 9,
						color: '#00BB2CFF'
					}
				];
			}
		},
		//判断是够已经获取到数据
		isGetResult() {
			return JSON.stringify(this.tripDetail) === '{}' ? false : true;
		},
		departLocation() {
			if (this.isGetResult) {
				return {
					depart_point_cn: this.tripDetail.depart_point_cn,
					longitude: parseFloat(this.tripDetail.trip_info.start_point.lon),
					latitude: parseFloat(this.tripDetail.trip_info.start_point.lat)
				};
			}
		},
		//车辆当前经纬度
		carLocation() {
			if (this.isGetResult) {
				return this.tripDetail.car_info.location_data;
			}
		},
		//当前行程状态
		currentTripStauts() {
			if (this.isGetResult) {
				return this.tripDetail.order_status;
			}
		},
		// 终点
		destLocation() {
			if (this.isGetResult) {
				return {
					depart_point_cn: this.tripDetail.dest_point_cn,
					longitude: parseFloat(this.tripDetail.trip_info.end_point.lon),
					latitude: parseFloat(this.tripDetail.trip_info.end_point.lat)
				};
			}
		},
		markers() {
			//显示出发点和目的地
			if (this.isGetResult) {
				const depart_point_cn = this.tripDetail.depart_point_cn;
				let marker = [];
				marker.push({
					id: 1,
					iconPath: 'https://cdn99.jerlan.cn/20211101003309.png',
					latitude: this.departLocation.latitude,
					longitude: this.departLocation.longitude,
					// latitude: 27.85632,
					// longitude: 112.90737,
					markerLevel: 10,
					width: 22,
					height: 34,
					zIndex: 10,
					label: { content: this.departLocation.depart_point_cn, anchorY: 0.35, color: '#00A626' }
				});
				//终点
				marker.push({
					id: 2,
					iconPath: 'https://cdn99.jerlan.cn/20211102220058.png',
					latitude: this.destLocation.latitude,
					longitude: this.destLocation.longitude,
					// latitude: 27.85632,
					// longitude: 112.90737,
					markerLevel: 10,
					width: 22,
					height: 34,
					zIndex: 10,
					label: { content: this.destLocation.depart_point_cn, anchorY: 0.35, color: '#00A626' }
				});
				return marker;
			}
		}
	},
	data() {
		return {
			tripDetail: {},
			mapCtx: null,
			id: null
		};
	},
	methods: {
		goFeeDetail() {
			uni.navigateTo({
				url: '/order/costDetails/costDetails?id=' + this.id
			});
		},
		signature() {
			uni.navigateTo({
				url: '/order/tripOrder/finish/signature?id=' + this.id
			});
		},
		async getOrderInfo(order_id) {
			this.tripDetail = await this.$http.api.getOrderInfo({ order_id });
			// this.addMarker(this.markers);
			let points = [];
			points.push({
				longitude: this.destLocation.longitude,
				latitude: this.destLocation.latitude
			});
			points.push({
				longitude: this.departLocation.longitude,
				latitude: this.departLocation.latitude
			});
			this.includePoints(points);
		},
		includePoints(points) {
			//判断是否已经创建上下文
			if (this.mapCtx === null) {
				this.mapCtx = wx.createMapContext('map', this);
			}
			this.mapCtx.includePoints({
				points: points,
				success: e => {
					console.log(e);
				},
				fail: e => {
					console.log(e);
				},
				padding: [150, 100, 100, 100]
			});
		},
		callPolice() {
			uni.navigateTo({
				url: '/helpCenter/callPolice/callPolice'
			});
		}
	}
};
</script>

<style>
@import url('./base.css');
@import url('./tripOrder.css');
</style>

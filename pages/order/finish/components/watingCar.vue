<template>
	<view class="main">
		<view class="title">{{tripDetail.order_status_info.title}}</view>
		<view class="sub-title">{{tripDetail.order_status_info.desc}}</view>
		<view class="margin-bottm"></view>
		<view class="layout-body">
			<br />
			<view class="driver-info">
				<view class="driver-text">
					<view class="car-num">
						<view class="">{{tripDetail.car_info.car_no}}</view>
						<image class="line" src="https://cdncc-frontend.caocaokeji.cn/2/special-mini-program/assets/wx-imgs/line_card_green%403x.png" mode=""></image>
					</view>
					<view class="car-type margin-top">
						{{tripDetail.car_info.car_brand}}
						<view class="driver">
							<view class="name">{{tripDetail.driver_info.name}}</view>
							<!-- <view class="count" style="margin-left: 12rpx;">241单</view> -->
							<view class="rate" style="margin-left: 12rpx;">
								<image class="star" src="https://cdncc-frontend.caocaokeji.cn/2/special-mini-program/assets/wx-imgs/icon_card_star%403x.png" mode=""></image>
								<view class="number">{{tripDetail.driver_info.rate}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 照片 -->
				<view class="driver-img">
					<image class="car-img" :src="tripDetail.car_type_info.img" mode=""></image>
					<image class="header" src="https://cdn99.jerlan.cn/20211012230643.jpeg" mode=""></image>
				</view>
			</view>
			<!-- 功能区 -->
			<view class="trip-card">
				<view class="card-item color">打电话</view>
				<view class="card-item">问题反馈</view>
				<view class="card-item">取消行程</view>
			</view>
		</view>
		<view class="phoneXBottomBlock"></view>
	</view>
</template>

<script>
export default {
	props: {
		tripDetail: {
			type: Object
		}
	}
};
</script>

<style></style>

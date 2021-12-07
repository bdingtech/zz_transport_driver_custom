<template>
	<view class="main ">
		<view class="title">{{ tripDetail.order_status_info.title_drv }}</view>
		<view class="sub-title">{{ tripDetail.order_status_info.desc }}</view>
		<view class="margin-bottm"></view>
		<view class="layout-body">
			<!-- 正在计算价格 -->
			<view class="" v-if="tripDetail.price_detail.length === 0">
				<view class="fee-info">
					<view class="money-num">
						<view class="blance-block"></view>
						<view class="money"><view class="num" style="font-size: 36rpx;">平台正在计算费用，请稍后重试...</view></view>
					</view>
				</view>
			</view>
			<!-- 已计算完价格 -->
			<view class="" v-else>
				<view class="fee-info">
					<view class="money-num">
						<view class="blance-block"></view>
						<view class="money">
							<view class="num" v-if="tripDetail.price_detail">{{ tripDetail.price_detail.total }}</view>
							<view class="unit">元</view>
						</view>
					</view>
					<view class="text-content" @click="this.$emit('goFeeDetail')">
						<view class="text">查看费用详情</view>
						<image src="https://cdncc-frontend.caocaokeji.cn/2/special-mini-program/assets/imgs/spcial/trip/common_icon_more_black_small.png" mode=""></image>
					</view>
				</view>
	<!-- 			<view class="tips text-sm text-gray" style="padding: 20rpx 0;">如对费用有疑问，请联系司机或者平台客服</view>
				<view class="confirm-btn" v-if="tripDetail.order_status === 'need_check'">
					<u-button @click="this.$emit('signature')" type="success">确认无误，去签名</u-button>
				</view> -->
			</view>
			<view class="padding" style="border-top: 2rpx solid #f5f5f5;">
				<view class="flex justify-between " style="color: ##999;font-size: 24rpx;line-height: 40rpx;">
					<text>订单编号</text>
					<text>{{tripDetail.id}}</text>
				</view>
				<view class="flex justify-between " style="color: ##999;font-size: 24rpx;line-height: 40rpx;">
					<text>计费方式</text>
					<text>{{tripDetail.price_type === 'time' ? '按时间计费' : '按里程计费'}}</text>
				</view>
				<view class="flex justify-between " style="color: ##999;font-size: 24rpx;line-height: 40rpx;">
					<text>出发点</text>
					<text>{{tripDetail.depart_point_cn}}</text>
				</view>
				<view class="flex justify-between " style="color: ##999;font-size: 24rpx;line-height: 40rpx;">
					<text>目的地</text>
					<text>{{tripDetail.dest_point_cn}}</text>
				</view>
				<view class="flex justify-between " style="color: ##999;font-size: 24rpx;line-height: 40rpx;">
					<text>联系人</text>
					<text>{{tripDetail.name}}</text>
				</view>
				<view class="flex justify-between " style="color: ##999;font-size: 24rpx;line-height: 40rpx;">
					<text>联系人电话</text>
					<text>{{tripDetail.tel}}</text>
				</view>
				<view class="flex justify-between" style="color: ##999;font-size: 24rpx;line-height: 40rpx;">
					<text>行程开始时间</text>
					<text>{{tripDetail.trip_info.trip_start_time}}</text>
				</view>
				<view class="flex justify-between" style="color: ##999;font-size: 24rpx;line-height: 40rpx;">
					<text>行程结束时间</text>
					<text>{{tripDetail.trip_info.trip_end_time}}</text>
				</view>			
					
			</view>

<!-- 			<view class="bottom-button" v-if="tripDetail.order_status === 'finish'">
				<view class="carbon-content item">
					<image
						src="https://cdncc-frontend.caocaokeji.cn/2/special-mini-program/assets/imgs/spcial/trip-over/customer_driver_card_01_icon_carbonassets@2x.png"
						mode="scaleToFill"
					></image>
					<view class="carbon">碳积分</view>
					<view class="value">+{{ tripDetail.price_detail.total }}g</view>
				</view>
			</view> -->
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

<style>
.bottom-button {
	height: 88rpx;
	border-top: 2rpx solid #f5f5f5;
}
.fee-info {
	padding: 48rpx;
	border-top: 2rpx solid #f5f5f5;
}
.fee-info .money-num {
	height: 60rpx;
	margin-bottom: 16rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.fee-info .blance-block {
	/* width: 25rpx; */
}
.fee-info .money {
	/* margin-right: 8rpx; */
	display: flex;
	align-items: flex-end;
}
.fee-info .money .unit {
	margin-left: 6rpx;
	font-family: PingFangSC-Medium;
	padding-bottom: 6rpx;
	margin-left: 6rpx;
	font-family: PingFangSC-Medium;
	padding-bottom: 6rpx;
	font-size: 24rpx;
	color: #43434a;
	font-size: 24rpx;
	color: #43434a;
}
.fee-info .money .num {
	font-size: 60rpx;
	color: #28282d;
	font-family: caocaonumber;
	display: flex;
	align-items: flex-end;
}
.text-content {
	display: flex;
	justify-content: center;
	height: 24rpx;
	align-items: center;
}
.text-content .text {
	font-size: 24rpx;
	color: #88888e;
	line-height: 24rpx;
}
.text-content cover-image,
.text-content image {
	margin-left: 4rpx;
	height: 24rpx;
	width: 16rpx;
}
.carbon-content {
	height: 88rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.carbon-content image {
	width: 32rpx;
	height: 32rpx;
}

.carbon-content .carbon {
	margin: 0 4rpx;
	font-family: PingFangSC-Medium;
	font-size: 24rpx;
	color: #999;
	text-align: center;
}

.carbon-content .value {
	font-family: PingFangSC-Medium;
	font-size: 24rpx;
	color: #ffa724;
	text-align: center;
	line-height: 32rpx;
}
</style>

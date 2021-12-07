<template>
	<view>
		<empty text="没有待处理的订单" mode="search" margin-top="100" v-if="orderList.length === 0"></empty>
		<view class="orderList" v-else>
			<view class="item" v-for="item in orderList" :key="item.id" @click="goDetail(item.id)">
				<view class="nut-cell-group__warp">
					<!-- <view title="链接" icon="my">132</view> -->
					<view class="nut-cell">
						<view class="header">
							<view class="time">
								<view class="num">{{ item.departure_time_cn }}</view>
								{{ item.name }}
								<!-- <view class="tel">按时间计费</view> -->
							</view>
							<!-- <view><image src="@/static/images/bus_details_icon_go.png" /></view> -->
							<!-- <view @click="call(item.tel)"><image src="@/static/images/call.png" /></view> -->
						</view>
					</view>
					<view class="nut-cell">
						<view class="location">
							<view class="from" @click="navi(item.depart_point_cn, item.depart_point_array.latitude, item.depart_point_array.longitude)">
								{{ item.depart_point_cn }}
								<image src="@/static/images/navigation3.png" mode=""></image>
							</view>
							<view class="to" @click="navi(item.dest_point_cn, item.dest_point_array.latitude, item.dest_point_array.longitude)">
								{{ item.dest_point_cn }}
								<image src="@/static/images/navigation3.png" mode=""></image>
							</view>
						</view>
					</view>
					<view>
						<view class="detail_info ">
							<view class="item_info">
								<text class="title">派单车辆</text>
								{{ item.car_info.car_no }} · {{ item.car_info.car_brand }}
							</view>
							<view class="item_info">
								<text class="title">接驾人</text>
								{{ item.name }}
							</view>

							<view class="item_info">
								<text class="title">计费方式</text>
								{{ item.price_type === 'mile' ? '按里程计费' : '按时间计费' }}
							</view>
							<view class="item_info">
								<text class="title">出发时间</text>
								{{ item.time }}
							</view>
						</view>
						<view class="price text-orange">
							<text class="title">￥</text>
							{{ item.price }}
							<!-- <text class="text-sm ">（已产生费用）</text> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import empty from '@/comnponents/empty.vue';
export default {
	data() {
		return {
			orderList: []
		};
	},
	components: {
		empty
	},
	onLoad() {
		this.getMyOrderList();
	},
	methods: {
		goDetail(id){
			uni.navigateTo({
				url:'/pages/order/finish/finish?id=' + id
			})
		},
		async getMyOrderList() {
			this.orderList = await this.$http.api.getMyOrderList();
		},
		async setOrderStart(order_id) {
			await this.$http.api.setOrderStart({
				order_id
			});
			this.getMyOrderList();
		},
		async setOrderDone(order_id) {
			uni.showModal({
				title: '提示',
				content: '确认结束计费吗？',
				success: res => {
					if (res.confirm) {
						this.$http.api.setOrderDone({
							order_id
						});
					}
				}
			});

			this.getMyOrderList();
		},
		navi(name, latitude, longitude) {
			uni.openLocation({
				name,
				latitude,
				longitude
			});
		},
		call(tel) {
			uni.makePhoneCall({
				phoneNumber: tel
			});
		}
	}
};
</script>

<style lang="scss" scopd>
.item {
	margin-bottom: 20rpx;
}
.detail_info {
	padding: 20rpx;
	font-size: 25rpx;
	border-bottom: 4rpx solid #f5f6f7;
	.item_info {
		.title {
			display: inline-block;
			width: 130rpx;
		}
	}
}
.price {
	padding: 10rpx;
	font-size: 40rpx;
	.title {
		font-size: 30rpx;
	}
}
.nut-cell-group__warp {
	display: block;
	border-radius: 12rpx;
	overflow: hidden;
	background-color: #fff;
}
.nut-cell-group__warp .nut-cell {
	margin: 0;
	box-shadow: none;
	border-radius: 0;
}
.nut-cell::after {
	position: absolute;
	box-sizing: border-box;
	content: ' ';
	pointer-events: none;
	right: 16rpx;
	bottom: 0;
	left: 16rpx;
	border-bottom: 4rpx solid #f5f6f7;
	transform: scaleY(0.5);
}
.nut-cell-group .nut-cell::after {
	border-bottom: 2px solid #f5f6f7;
}
.nut-cell {
	position: relative;
	display: flex;
	width: 100%;
	line-height: 40rpx;
	padding: 13rpx 16rpx;
	background: #fff;
	border-radius: 6rpx;
	box-shadow: 0 2rpx 14rpx 0 #edeef1;
	font-size: 28rpx;
	color: #666;
	margin: 20rpx 0;
	box-sizing: border-box;
}
.orderList {
	height: 100%;
	width: 100%;
	position: absolute;
	padding: 40rpx;
	background: #f7f8fa;

	.item {
		padding: 20rpx;
		.header {
			width: 100%;
			display: flex;
			justify-content: space-between;
			// align-items: baseline;
			align-items: center;
			image {
				width: 20rpx;
				height: 20rpx;
			}
			.time {
				display: flex;
				align-items: center;
				font-size: 36rpx;
				font-weight: bold;
				color: #262626;
				.tel {
					color: #8c8c8c;
					font-size: 28rpx;
					margin-left: 20rpx;
				}
				.num {
					// width: 180rpx;
					width: 240rpx;
					height: 50rpx;
					margin-right: 16rpx;
					border-radius: 8rpx;
					padding: 10rpx 16rpx;
					text-align: center;
					font-size: 28rpx;
					color: #ffffff;
					line-height: 30rpx;
					// background-color: #0062df;
					background-color: #8c8c8c;
				}
			}
		}
		.location {
			margin: 20rpx 0;
			width: 100%;
			display: flex;
			flex-direction: column;
			font-size: 32rpx;
			color: #333;
			image {
				margin-left: 10rpx;
				display: inline-block;
				width: 35rpx;
				height: 35rpx;
			}
			.from {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
			}
			.from::before {
				content: '';
				display: inline-block;
				width: 16rpx;
				height: 16rpx;
				line-height: 32rpx;
				border-radius: 50%;
				margin-right: 20rpx;
				background-color: #0062df;
			}
			.to {
				margin-top: 20rpx;
				display: flex;
				align-items: center;
			}
			.to::before {
				content: '';
				display: inline-block;
				width: 16rpx;
				height: 16rpx;
				line-height: 32rpx;
				border-radius: 50%;
				margin-right: 20rpx;
				background-color: #f37b1d;
			}
		}
		.operat_area {
			display: flex;
			justify-content: space-between;
			width: 100%;
			align-items: center;
			.price {
				font-size: 16rpx;
			}
			.operat {
				.btn {
					margin-left: 20rpx;
					width: 140rpx;
					height: 60rpx;
				}
			}
		}
		background-color: #ffffff;
	}
}
</style>

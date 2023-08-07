<template>
	<view class="item">
		<view class="nut-cell-group__warp">
			<!-- <view title="链接" icon="my">132</view> -->
			<view class="nut-cell">
				<view class="header">
					<view class="time">
						<!-- <view class="num">{{orderDetail.time_cn}}</view> -->
						{{orderDetail.body}}
						<!-- <view class="tel">按时间计费</view> -->
					</view>
					<!-- <view><image src="@/static/images/bus_details_icon_go.png" /></view> -->
					<!-- <view @click="call(item.tel)"><image src="@/static/images/call.png" /></view> -->
				</view>
			</view>
			<view class="nut-cell">
				<view class="location">
					<view class="from" @click="navi(orderDetail.from, orderDetail.from_location)">
						{{ orderDetail.from }}
						<image src="@/static/images/navigation3.png" mode=""></image>
					</view>
					<view class="to" @click="navi(orderDetail.to, orderDetail.to_location)">
						{{ orderDetail.to }}
						<image src="@/static/images/navigation3.png" mode=""></image>
					</view>
				</view>
			</view>
			<view>
				<view class="detail_info ">
					<view class="item_info">
						<text class="title">订单号</text>
						{{orderDetail.trade_no}}
					</view>
					<view class="item_info">
						<text class="title">乘客数</text>
						{{ orderDetail.passenger_num }}人
					</view>

					<view class="item_info">
						<text class="title">计费方式</text>
						{{ orderDetail.tag }}
					</view>
					<view class="item_info">
						<text class="title">出发时间</text>
						{{ orderDetail.departure_time }}
					</view>
				</view>
				<view class="price text-orange">
					<text class="title">￥</text>
					{{ orderDetail.cost }}
					<!-- <text class="text-sm ">（已产生费用）</text> -->
				</view>
				<view class="margin-top order-operate" v-if="showWaitStatusOprate">
					<button class="cu-btn bg-red lg operate-dismiss"
						@click="$emit('onDismiss',orderDetail.trade_no)">忽略接单</button>
					<button class="cu-btn bg-red lg operate-confirm"
						@click="$emit('onAccept',orderDetail.trade_no)">确认接单</button>
				</view>
				<view class="margin-top order-operate" v-if="shoProcessStatusOprate">
					<button class="cu-btn bg-red lg operate-dismiss"
						@click="$emit('onSendBack',orderDetail.trade_no)">退回订单</button>
					<button class="cu-btn bg-red lg operate-confirm"
						@click="$emit('onFinish',orderDetail.trade_no)">行程结束</button>
				</view>
				<!-- 				<view class="margin-top flex flex-direction">
					<button class="cu-btn bg-red lg" @click="setOrderDone(item.id)"
						v-if="item.order_status == 'running'">结束计费</button>
					<button class="cu-btn bg-blue lg" @click="setOrderStart(item.id)" v-else>开始计费</button>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			orderDetail: {
				type: Object,
				default: {}
			},
			showWaitStatusOprate: {
				type: Boolean,
				default: false
			},
			shoProcessStatusOprate: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			navi(name, location) {
				const latitude = +location.split(',')[0]
				const longitude = +location.split(',')[1]
				uni.openLocation({
					name,
					latitude,
					longitude
				});
			},
		}
	}
</script>

<style lang="scss">
	.order-operate {
		display: flex;
		justify-content: space-between;
		padding: 0 10rpx;

		.operate-dismiss {
			width: 210rpx;
			background-color: #6B7280;
		}

		.operate-confirm {
			width: 440rpx;
			background-color: #3B82F6;
		}
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
		padding: 20rpx 10rpx;
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

	.item {
		padding: 20rpx;
		border-radius: 24rpx;

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
	}
</style>
<template>
	<view>
		<view class="orderList">
			<view class="item">
				<view class="nut-cell-group__warp">
					<!-- <view title="链接" icon="my">132</view> -->
					<view class="nut-cell">
						<view class="header">
							<view class="time">
								<view class="num">今天18:00</view>
								赵信
								<view class="tel">按时间计费</view>
							</view>
							<view><image src="@/static/images/call.png" /></view>
						</view>
					</view>
					<view class="nut-cell">
						<view class="location">
							<view class="from">
								湖南科技大学（南校）
								<image src="@/static/images/navigation3.png" mode=""></image>
							</view>
							<view class="to">
								湘潭大学
								<image src="@/static/images/navigation3.png" mode=""></image>
							</view>
						</view>
					</view>
					<view>
						<!-- <view class="operat_area">
							<view class="price"><nut-price price="111" :need-symbol="true" :thousands="false" /></view>
							<view class="operat">
								<button class="cu-btn round" type="default">改派</button>
								<button class="cu-btn round  bg-red" type="default">导航</button>
							</view>
						</view> -->
						<view class="margin-top flex flex-direction">
							<button class="cu-btn bg-blue lg">开始计费</button>
							<!-- <button class="cu-btn bg-red lg">结束计费</button> -->
							<!-- <button class="cu-btn bg-red margin-tb-sm lg">嫣红</button> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scopd>
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
				width: 60rpx;
				height: 60rpx;
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
					width: 180rpx;
					height: 50rpx;
					margin-right: 16rpx;
					border-radius: 8rpx;
					padding: 10rpx 16rpx;
					text-align: center;
					font-size: 28rpx;
					color: #ffffff;
					line-height: 30rpx;
					background-color: #0062df;
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

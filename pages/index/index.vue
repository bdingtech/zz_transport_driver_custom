<template>
	<view class="index" :style="'padding-top:' + topHeight + 'px'">
		<view class="index-header">
			<image src="https://cdn99.jerlan.cn/20210806005505.png" srcset="" />
			<view class="info">
				<h1>湘潭客运·司机端</h1>
				<p>更专业的本地出行平台</p>
			</view>
		</view>
		<div class="index-components">
			<ol>
				<ul v-if="!isDriver">
					<li @click="goDetail('register')">
						<image class="img" src="@/static/images/register.png" />
						<view class="text">
							<span>注册成为司机</span>
							<image class="_img" src="/static/images/bus_details_icon_go.png" mode=""></image>
						</view>
					</li>
				</ul>
				<ul v-else>
					<li @click="goDetail('pending')">
						<image class="img" src="@/static/images/waiting.png" />
						<view class="text">
							<span>待处理订单</span>
							<image class="_img" src="/static/images/bus_details_icon_go.png" mode=""></image>
						</view>
					</li>
					<li @click="goDetail('order')">
						<image class="img" src="@/static/images/orderQuery.png" />
						<view class="text">
							<span>历史订单</span>
							<image class="_img" src="/static/images/bus_details_icon_go.png" mode=""></image>
						</view>
					</li>
					<li @click="goDetail('driverInfo')">
						<image class="img" src="@/static/images/acount.png" />
						<view class="text">
							<span>司机信息</span>
							<image class="_img" src="/static/images/bus_details_icon_go.png" mode=""></image>
						</view>
					</li>
				</ul>
			</ol>
		</div>
		<!-- <introduction /> -->
	</view>
</template>

<script>
// import introduction from '/components/introduction.vue';
import { checkUserIsDriver } from '@/src/utils/login.js';
import { drvMpLogin } from '@/src/utils/login.js';
export default {
	name: 'home',
	onShow() {
		drvMpLogin().then(res => {
			checkUserIsDriver().then(res => {
				this.isDriver = true;
			});
		});
	},
	data() {
		return {
			isDriver: true,
			topHeight: uni.getSystemInfoSync().statusBarHeight
		};
	},
	methods: {
		goDetail(type) {
			let url = '';
			switch (type) {
				case 'register':
					url = '/pages/user/login';
					break;
				case 'pending':
					url = '/pages/order/pendingOrder/pendingOrder';
					break;
				case 'order':
					url = '/pages/order/pastOrder/pastOrder';
					break;
			}
			uni.navigateTo({
				url
			});
		}
	}
	// components: {
	// 	introduction
	// }
};
</script>
<style lang="scss" scopd>
.index {
	height: 100%;
	width: 100%;
	position: absolute;
	background-color: #f6f7f9;
	&-header {
		display: flex;
		align-items: center;
		margin-top: 30rpx;
		padding: 0 34px;
		height: 117px;
		> image {
			width: 67px;
			height: 67px;
			margin-right: 18px;
			flex-shrink: 0;
		}
		.info {
			display: flex;
			flex-direction: column;
			h1 {
				height: 48px;
				line-height: 48px;
				font-size: 27px;
				color: rgba(51, 51, 51, 1);
				font-weight: 500;
			}
			p {
				height: 18px;
				line-height: 18px;
				font-size: 12px;
				color: rgba(154, 155, 157, 1);
			}
		}
	}
	&-components {
		background: #f7f8fa;
		border-radius: 30px 30px 0 0;
		overflow: hidden;
		padding: 30px 25px;
		> ol {
			margin-bottom: 17px;
			> li {
				line-height: 20px;
				font-size: 14px;
				color: rgba(144, 156, 164, 1);
				margin-bottom: 10px;
			}
			> ul {
				li {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 24px;
					width: 100%;
					height: 80px;
					line-height: 90px;
					background: rgba(255, 255, 255, 1);
					border-radius: 22px;
					box-shadow: 0px 1px 4px 0px rgba(102, 102, 102, 0.06);
					margin-bottom: 23px;
					box-sizing: border-box;
					span {
						width: 200px;
						display: flex;
						justify-content: flex-end;
						margin-right: 10px;
						font-size: 16px;
						color: #595959;
						/* font-weight: bold; */
					}
					.img {
						width: 50px;
						height: 50px;
					}
					.text {
						display: flex;
						align-items: center;
						image {
							width: 10rpx;
							height: 18rpx;
						}
					}
				}
			}
		}
		ol,
		li {
			list-style: none;
		}
	}
}
</style>

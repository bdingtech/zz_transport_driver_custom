<template>
	<view class="center-container">
		<view class="header_wrap">
			<!-- 用户信息 -->
			<view class="user_wrap">
				<image class="_img left" src="//image.bbxhc.com/pub/web/bbx-minapp/images/common-v2/default_head.png" mode=""></image>
				<view class="_div right">
					<label class="_span " style="font-size: 45rpx;">{{userinfoXY.length !== 0 ? userinfoXY.name : '未认证用户'}}</label>
					<view class="_em">用心服务,守护客户的每一次出行</view>
				</view>
			</view>
			<!-- 订单区 -->
<!-- 			<view class="aside_wrap" style="display: flex;justify-content: space-around;">
				<view class="funtion_area">
					<image src="@/static/images/quanbu.png" class="funtion_area" mode=""></image>
					<text>全部申请</text>
				</view>
				<view class="funtion_area">
					<image src="@/static/images/daishenpi.png" class="funtion_area" mode=""></image>
					<text>待审批</text>
				</view>
				<view class="funtion_area">
					<image src="@/static/images/yitongguo.png" class="funtion_area" mode=""></image>
					<text>已通过</text>
				</view>
				<view class="funtion_area">
					<image src="@/static/images/weitongguo.png" class="funtion_area" mode=""></image>
					<text>未通过</text>
				</view>
			</view> -->
		</view>
		<!-- 审批中心 -->
		<view class="_ul">
			<view class="_li flex-sb-c" @click="goDetail('approval')">
				<view class="flex align-center"  >
					<!-- <image src="@/static/images/daishenpi.png" class="funtion_area" style="width: 100rpx;height: 100rpx;" mode=""></image> -->
					<view class="left-tit">审批管理</view>
				</view>
				<image class="_img" src="/static/images/bus_details_icon_go.png" mode=""></image>
			</view>
		</view>
		<!-- 功能区 -->
		<view class="_ul">
			<view class="_li flex-sb-c" @click="goDetail('feeInfo')">
				<view class="left-tit">实名信息</view>
				<image class="_img" src="/static/images/bus_details_icon_go.png" mode=""></image>
			</view>
			<view class="_li flex-sb-c" @click="goDetail('feeInfo')">
				<view class="left-tit">费用说明</view>
				<image class="_img" src="/static/images/bus_details_icon_go.png" mode=""></image>
			</view>
			<view class="_li flex-sb-c" @click="goDetail('helpCenter')">
				<view class="left-tit">帮助中心</view>
				<image class="_img" src="/static/images/bus_details_icon_go.png" mode=""></image>
			</view>
			<view class="_li flex-sb-c" @click="goDetail('aboutUs')">
				<view class="left-tit">关于我们</view>
				<image class="_img" src="/static/images/bus_details_icon_go.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
// import { checkUserIsBind } from '@/src/utils/login.js';
export default {
	data() {
		return {
			userinfoXY:{}
		};
	},
	onLoad() {
		const userinfoXY = uni.getStorageSync('userinfoXY')
		this.userinfoXY = userinfoXY
		console.log(this.userinfoXY)
		// checkUserIsBind().catch(err => {
		// 	uni.navigateTo({
		// 		url: '/home/users/login'
		// 	});
		// });
	},
	methods: {
		goDetail(item) {
			let url = '';
			switch (item) {
				case 'feeInfo':
					url = '/helpCenter/chargeStandard/chargeStandard';
					break;
				case 'approval':
					url = '/approval/approval';
					break;
			}
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style lang="scss">
@import url('users.css');
page {
	background-color: #eeefef;
}
.flex-sb-c {
	justify-content: space-between;
	align-items: center;
}
._li{
	display: flex;
}
.funtion_area {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	image {
		width: 80rpx;
		height: 80rpx;
	}
	text {
		display: inline-block;
		margin-top: 10rpx;
	}
}
</style>

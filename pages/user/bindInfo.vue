<template>
	<view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<!-- <text class="cuIcon-circlefill  text-gray"></text> -->
					<text class="text-gray">编号</text>
				</view>
				<view class="value">{{ info.driver_uid }}</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<!-- <text class="cuIcon-circlefill  text-gray"></text> -->
					<text class="text-gray">姓名</text>
				</view>
				<view class="value">{{ info.driver_name }}</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<!-- <text class="cuIcon-circlefill  text-gray"></text> -->
					<text class="text-gray">手机号码</text>
				</view>
				<view class="value">{{ info.driver_tel }}</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<!-- <text class="cuIcon-circlefill  text-gray"></text> -->
					<text class="text-gray">身份证号码</text>
				</view>
				<view class="value">{{info.driver_sfz}}</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<!-- <text class="cuIcon-circlefill  text-gray"></text> -->
					<text class="text-gray">评价分</text>
				</view>
				<view class="value">{{info.rate}}</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<!-- <text class="cuIcon-circlefill  text-gray"></text> -->
					<text class="text-gray">注册时间</text>
				</view>
				<view class="value">{{info.add_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {}
		};
	},
	onLoad() {
		this.getDriverInfo();
	},
	methods: {
		async getDriverInfo() {
			const result = await this.$http.api.checkIsDrv();
			this.info = result;
		}
	}
};
</script>

<style></style>

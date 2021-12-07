<template>
	<view>
		<view class="page">
			<view class="weui-msg">
				<view class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></view>
				<view class="weui-msg__text-area">
					<h2 class="weui-msg__title">签名确认成功</h2>
					<p class="weui-msg__desc">签名确认成功，可通过订单中心查看具体详情</p>
				</view>
				<view class="weui-msg__opr-area">
					<p class="weui-btn-area"><button @click="backHome" class="weui-btn weui-btn_primary">返回首页</button></p>
				</view>
				<view class="weui-msg__opr-area">
					<!-- <view class="weui-btn-area"><navigator @click="goOrder" class="weui-btn weui-btn_default" aria-role="button">查看申请</navigator></view> -->
				</view>
				<view class="weui-msg__tips-area">
					<!-- <p class="weui-msg__tips">提示详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现<a href="javascript:">文字链接</a></p> -->
				</view>
				<view class="weui-msg__extra-area">
					<view class="weui-footer">
						<p class="weui-footer__links"><!-- <a href="javascript:" class="weui-footer__link">底部链接文本</a> --></p>
						<p class="weui-footer__text">Copyright &copy; 2021 科大公务出行</p>
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
	methods: {
		backHome() {
			uni.switchTab({
				url: '/home/main/main'
			});
		},
		goOrder() {
			uni.switchTab({
				url: '/home/apply/myApplay'
			});
		}
	}
};
</script>

<style>
	@import url("@/src/vendor/weui.css");
	.page{
		height: 100%;
		position: absolute;
	}
</style>

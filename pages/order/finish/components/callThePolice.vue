<template>
	<!-- 定位icon -->
	<view class="extra-block">
		<view class="top-button">
			<view class="call-police item" @click="this.$emit('callPolice')">
				<image src="https://cdncc-frontend.caocaokeji.cn/2/special-mini-program/assets/wx-imgs/map/main_icon_safe@3x.png" mode=""></image>
				<view class="text">一键报警</view>
			</view>
			<view class="fixed-location item">
				<image src="https://cdncc-frontend.caocaokeji.cn/2/special-mini-program/assets/wx-imgs/map/map_btn_loction@3x.png" mode="scaleToFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
</style>

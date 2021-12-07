<template>
	<view>
		<view class="price-standard-container">
			<view class="switch-car-container">
				<view class="title f-36 " style="padding-bottom: 40rpx;">{{currentCarType.name}}</view>
				<view class="car-box">
					<view class="iconfont icon-btn_leftarrow_light" style="color:rgba(0,0,0,0)"></view>
					<u-swiper
						@change="swiperChange"
						style="width: 100%;margin: 20rpx 0;"
						height="450"
						:autoplay="false"
						:list="carPriceList"
						name="img"
						:effect3d="false"
					></u-swiper>
					<!-- <swiper class="switch-box">
						<swiper-item v-for="(item,index) in carPriceList" style="display: flex; justify-content: center; align-items: center; flex-direction: column; position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px);">
							<image class="car-img" :src="item.img" mode=""></image>
							<view class="car-info-box">
								<view class="car-info-item">
									<text class="title f-24">载重</text>
									<text class="f-28">500公斤</text>
								</view>
								<view class="car-info-item">
									<text class="title f-24">载重</text>
									<text class="f-28">500公斤</text>
								</view>
								<view class="car-info-item">
									<text class="title f-24">载重</text>
									<text class="f-28">500公斤</text>
								</view>
							</view>
						</swiper-item>
					</swiper> -->
					<view class="iconfont icon-btn_rightarrow_light"></view>
					<view class="iconfont icon-btn_leftarrow_light" style="color:rgba(0,0,0,0)"></view>
				</view>
				<!-- 轮播图符号 -->
				<!-- 				<view class="spot-box">
					<view class="spot active"></view>
					<view class="spo"></view>
					<view class="spot"></view>
					<view class="spot"></view>
				</view> -->
			</view>
			<!-- 费用标准内容 -->
			<view class="price-info-box">
				<view class="price-item f-28">
					<view class="title">车型简介</view>
					<view class="price-row" style="background:#f8f8f8">
						{{currentCarType.introduce}} 
					<!-- 	<view class="field">{{item2.label}}</view>
						<view class="value">{{item2.value}}</view> -->
					</view>
				</view>
				<view class="price-item f-28" v-for="item in currentCarType.price_detail">
					<view class="title">{{ item.label }}</view>
					<view class="price-row" v-for="(item2, index) in item.value"  :style="index % 2 === 0 ? 'background:#f8f8f8' : ''">
						<view class="field">{{item2.label}}</view>
						<view class="value">{{item2.value}}</view>
					</view>
				</view>
			</view>
			<!-- 解释 -->
			<view class="explain f-24">
				*如有疑问，请咨询平台客服
			</view>
		</view>
	</view>
</template>

<script>
export default {
	onLoad() {
		this.getCarPrice();
	},
	data() {
		return {
			carPriceList: [],
			index: 0
		};
	},
	computed: {
		currentCarType() {
			return this.carPriceList[this.index];
		}
	},
	methods: {
		async getCarPrice() {
			this.carPriceList = await this.$http.api.getCarPrice();
		},
		swiperChange(e) {
			this.index = e;
		}
	}
};
</script>

<style>
@import url('chargeStandard.css');
</style>

<template>
	<view>
		<!-- 无网络提示 -->
		<!-- <u-no-network></u-no-network> -->
		<!--登录图标-->
		<!-- 		<view class="zaiui-user-login-avatar-view">
			<view class="cu-avatar round lg">
				<open-data type="userAvatarUrl"></open-data>
			</view>
		</view> -->

		<!-- 欢迎 -->
		<view class="welcom">
			<view>你好，</view>
			<view>欢迎注册成为司机</view>
		</view>
		<view class="register_box">
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input v-model="driverInfo.driver_name" type="text" placeholder="请输入您的姓名" />
			</view>
			<view class="cu-form-group ">
				<view class="title">身份证</view>
				<input v-model="driverInfo.driver_sfz" type="idcard" placeholder="请输入您的身份证号码" />
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input v-model="driverInfo.driver_tel" type="number" placeholder="请输入您的手机号码" />
				<button class="cu-btn sm bg-green" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>
			</view>
		</view>
		<!--按钮-->
		<view class="flex flex-direction zaiui-btn-view">
			<!-- <u-modal v-model="show" :mask-close-able="true" :show-confirm-button="false" :content="content">
				<view class="slot-content">
					<view class="content"><text>在登录之前我们需要微信授权获取您的头像、昵称等信息</text></view>
					<view class="btn">
						<u-button type="success" @click="getUserinfo">
							<text class="cuIcon-weixin icon" />
							<text>微信授权</text>
						</u-button>
					</view>
				</view>
			</u-modal> -->

			<button @click="resignAsDriver" class="cu-btn round bg-green">
				<text class="cuIcon-weixin icon" />
				<text>注册成为司机</text>
			</button>
			<!-- 			<button class="cu-btn plain round margin-top tel" >
				<text >使用短信验证码登录</text>
			</button> -->
		</view>

		<!--协议-->
		<view class="zaiui-agreement-checked-view">
			<!-- <checkbox class='round red sm zaiui-checked checked'/> -->
			<view class="text-sm text-black-view">
				<view @click="goUrl('/usercenter/about/agreement/agreement')" class="text-gray text-center">登录即代表您同意我们的以下协议</view>
				<view @click="goUrl('/usercenter/about/agreement/agreement')" class="text-blue text-center">《{{ APPNAME }}用户服务协议》《{{ APPNAME }}隐私政策》</view>
			</view>
		</view>
		<!--底部说明-->
		<view class="text-sm text-gray zaiui-foot-ad-view">{{ APPNAME }}-更专业的本地出行平台</view>
	</view>
</template>

<script>
import { APPNAME } from '@/src/config/index.js';
import { getUserInfoRes, getCode, getQyCode } from '@/src/utils/user.js';
import { checkQyWechatEnv } from '@/src/utils/login.js';
export default {
	data() {
		return {
			APPNAME: APPNAME,
			telData: {},
			infoData: {},
			driverInfo: {
				driver_name: '',
				driver_tel: '',
				driver_sfz: ''
			},
			code: null,
			qyCode: null,
			show: false
		};
	},
	async onLoad() {
		console.log(checkQyWechatEnv());
		try {
			if (checkQyWechatEnv()) {
				this.qyCode = await getQyCode();
			}
			this.code = await getCode();
		} catch (e) {
			this.$u.toast('获取code失败');
		}
	},
	onReady() {
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 0
		});
	},
	methods: {
		goUrl(url) {
			uni.navigateTo({
				url: url
			});
		},
		async getPhoneNumber(e) {
			console.log(e);
			if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
				//用户拒绝授权

				//拒绝授权后弹出一些提示
				this.$u.toast('请同意授权');
				return;
			}
			if (e.detail.errMsg !== 'getPhoneNumber:ok') {
				return;
			}

			this.telData = e.detail;
			// this.driverInfo.driver_tel =
			// this.login();
			// this.show = true;
		},
		async resignAsDriver() {
			if (this.driverInfo.driver_sfz.length === 0) {
				uni.showToast({
					title: '请输入身份证',
					icon: 'error'
				});
				return;
			}
			if (this.driverInfo.driver_tel.length === 0) {
				uni.showToast({
					title: '请输入手机号',
					icon: 'error'
				});
				return;
			}
			if (this.driverInfo.driver_name.length === 0) {
				uni.showToast({
					title: '请输入姓名',
					icon: 'error'
				});
				return;
			}
			const result = await this.$http.api.resignAsDriver({
				...this.driverInfo
			});
			uni.showToast({
				title: '注册成功'
			});
			setTimeout(() => {
				uni.navigateBack();
			}, 2000);
			console.log(result);
		},
		async getUserinfo(telData) {
			this.infoData = await getUserInfoRes();
			if (this.infoData.errMsg !== 'getUserProfile:ok') {
				this.$u.toast('请同意授权');
				return;
			}
			this.login();
		},
		async login() {
			try {
				const params = {
					infoData: this.infoData,
					telData: this.telData,
					code: this.code,
					qyCode: this.qyCode
				};
				const result = await this.$http.api.bindWechatUserInfo(params);
				uni.setStorageSync('userinfoXY', result);
				if (result) {
					console.log(result);
					uni.navigateBack();
				}
			} catch (err) {
				// this.$u.toast('登录失败，请联系客服处理');
				console.log(err);
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #ffffff;
}
.cu-form-group .title {
	min-width: calc(4em + 15px);
}
.slot-content {
	padding: 20rpx;
	.content {
		padding: 10rpx 0;
		color: #262626;
	}
	.btn {
		margin-top: 20rpx;
	}
}
.welcom {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: 0 65.45rpx;
	margin-top: 80rpx;
	font-size: 28px;
	font-weight: bold;
}
.register_box {
	margin: 60rpx 0;
	padding: 0 45.45rpx;
}
.zaiui-user-login-avatar-view {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 218.18rpx;
	.cu-avatar {
		width: 181.81rpx;
		height: 181.81rpx;
	}
}
.zaiui-btn-view {
	position: relative;
	// margin-top: 172.72rpx;
	padding: 0 65.45rpx;
	font-weight: bold;
	.cu-btn .icon {
		position: relative;
		font-size: 47.27rpx;
		right: 9.09rpx;
		top: -3.63rpx;
	}
	button {
		font-size: 16px;
		background-color: #07c160;
		height: 90rpx;
		&.tel {
			// background-color:#FFFFFF;
			color: #74757e;
			font-weight: normal;
		}
	}
}
.zaiui-agreement-checked-view {
	position: relative;
	padding: 27.27rpx 45.45rpx;
	.zaiui-checked {
		position: absolute;
		transform: scale(0.7);
	}
	.text-black-view {
		// padding-left: 34.54rpx;
		line-height: 47.27rpx;
	}
}
.zaiui-foot-ad-view {
	position: fixed;
	text-align: center;
	bottom: 72.72rpx;
	width: 100%;
}
</style>

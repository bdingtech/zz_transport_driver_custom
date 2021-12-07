<template>
	<view class="contents">
		<canvas
			class="firstCanvas"
			canvas-id="firstCanvas"
			@touchmove="move"
			@touchstart="start($event)"
			@touchend="end"
			@touchcancel="cancel"
			@longtap="tap"
			disable-scroll="true"
			@error="error"
		></canvas>
		<!-- 	<view class="caozuo">
			<view class="chongqian" @tap="clearClick">重签</view>
			<view class="over" @tap="overSign">完成签名</view>
			
		</view> -->
		<view class="ic__bottom_container">
			<view class="bottom_btn">
				<view class="btn_my"><u-button @click="clearClick" shape="circle">重签</u-button></view>
				<view class="btn_bind"><u-button @click="overSign" type="success" shape="circle">完成签名</u-button></view>
			</view>
		</view>
	</view>
</template>

<script>
var content = null;
var touchs = [];
var canvasw = 0;
var canvash = 0;
var _that;
//获取系统信息
uni.getSystemInfo({
	success: function(res) {
		canvasw = res.windowWidth;
		canvash = res.windowHeight;
	}
});
export default {
	data() {
		return {
			order_id: null,
			signImage: '',
			isEnd: false // 是否签名
		};
	},

	methods: {
		async comfirm() {
			const uploadImage = async () => {
				//上传图片，先获取token
				const result = await this.$http.api.getUploadToken();
				const token = result.token;
				const upload_addr = result.upload_addr;
				return new Promise((resolve, reject) => {
					uni.showLoading({
						title: '上传中...'
					});
					uni.uploadFile({
						url: upload_addr,
						filePath: this.signImage,
						name: 'file',
						formData: {
							token: token
						},
						success: uploadFileRes => {
							uni.hideLoading();
							uploadFileRes = JSON.parse(uploadFileRes.data);
							const file_url = uploadFileRes.data.file_url;
							resolve(file_url);
						},
						fail: err => {
							console.log(err);
							reject(err);
						}
					});
				});
			};
			try {
				const file_url = await uploadImage();
				await this.$http.api.confirmCost({
					order_id: this.order_id,
					sign_img: file_url
				}); 
				uni.reLaunch({
					url:'/order/tripOrder/finish/success/success'
				})
				console.log(file_url);
			} catch (err) {
				console.log(err)
				uni.showModal({
					content: '发生未知错误：' + JSON.stringify(err)
				});
			}
		},
		overSign: function() {
			if (this.isEnd) {
				uni.canvasToTempFilePath({
					canvasId: 'firstCanvas',

					success: function(res) {
						//打印图片路径
						console.log(res.tempFilePath);
						console.log('完成签名');
						//设置图片
						_that.signImage = res.tempFilePath;
						_that.comfirm();
					}
				});
			} else {
				uni.showToast({
					title: '请先完成签名',
					icon: 'none',
					duration: 1500,
					mask: true
				});
			}
		},

		// 画布的触摸移动开始手势响应
		start: function(event) {
			// console.log(event)
			console.log('触摸开始' + event.changedTouches[0].x);
			console.log('触摸开始' + event.changedTouches[0].y);
			//获取触摸开始的 x,y
			let point = {
				x: event.changedTouches[0].x,
				y: event.changedTouches[0].y
			};
			// console.log(point)
			touchs.push(point);
		},
		// 画布的触摸移动手势响应
		move: function(e) {
			let point = {
				x: e.touches[0].x,
				y: e.touches[0].y
			};
			// console.log(point)
			touchs.push(point);
			if (touchs.length >= 2) {
				this.draw(touchs);
			}
		},

		// 画布的触摸移动结束手势响应
		end: function(e) {
			console.log('触摸结束' + e);
			// 设置为已经签名
			this.isEnd = true;
			// 清空轨迹数组
			for (let i = 0; i < touchs.length; i++) {
				touchs.pop();
			}
		},

		// 画布的触摸取消响应
		cancel: function(e) {
			console.log('触摸取消' + e);
		},

		// 画布的长按手势响应
		tap: function(e) {
			console.log('长按手势' + e);
		},

		error: function(e) {
			console.log('画布触摸错误' + e);
		},

		//绘制
		draw: function(touchs) {
			console.log(touchs[0], touchs[1]);
			let point1 = touchs[0];
			let point2 = touchs[1];
			touchs.shift();
			content.moveTo(point1.x, point1.y);
			content.lineTo(point2.x, point2.y);
			content.stroke();
			content.draw(true);
		},
		//清除操作
		clearClick: function() {
			// 设置为未签名
			this.isEnd = false;
			//清除画布
			content.clearRect(0, 0, canvasw, canvash);
			content.draw(true);
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log(options);
		const id = options.id;
		this.order_id = id;
		_that = this;
		//获得Canvas的上下文
		content = wx.createCanvasContext('firstCanvas');
		//设置线的颜色
		content.setStrokeStyle('#000');
		//设置线的宽度
		content.setLineWidth(5);
		//设置线两端端点样式更加圆润
		content.setLineCap('round');
		//设置两条线连接处更加圆润
		content.setLineJoin('round');
	}
};
</script>

<style lang="scss">
.ic__bottom_container {
	background-image: linear-gradient(bottom, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0));
	background-repeat: repeat-y;
	background-color: #ffffff;
	padding: 2rem 0;
	width: 100%;
	position: fixed;
	left: 0;
	bottom: 0;
	.bottom_btn {
		display: flex;
		flex: 0;
		justify-content: space-between;
		padding: 0 40rpx;
		.btn_my {
		}
		.btn_bind {
			width: 400rpx;
		}
	}
}

.ts {
	color: #ff485d;
	font-size: 30upx;
	height: 100upx;
	line-height: 100upx;
	padding-left: 20upx;
}

canvas {
	background-color: #dddddd;
	width: 700upx;
	margin: 0 25upx;
	height: calc(100vh - 140upx);
}

.contents {
	padding-top: 20upx;
	padding-bottom: 100upx;
	box-sizing: border-box;
}

#signatureImg {
	background-color: #eeeeee;
}

.caozuo {
	display: flex;
	height: 100upx;
	width: 750upx;
	position: fixed;
	left: 0;
	bottom: 0;
	padding-bottom: 50rpx;
}

.caozuo view {
	width: 375upx;
	text-align: center;
	height: 100upx;
	line-height: 100upx;
	color: #ffffff;
}

.caozuo view:active {
	background-color: #cccccc;
	color: #333333;
}

.chongqian {
	background-color: #ff8f58;
}

.over {
	background-color: #0599d7;
}
</style>

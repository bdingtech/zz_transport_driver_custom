<template>
	<view>
		<uv-navbar autoBack>
			<template v-slot:center>
				<view class="" style="margin-right: 200rpx;">
					<uv-tabs :current="current" placeholder fixed :autoBack="true" :list="list" lineColor="#0066E6"
						@change="onTabChange" bold></uv-tabs>
				</view>
			</template>
		</uv-navbar>
		<!-- 站位 -->
		<view style="margin-top: 200rpx;"></view>
		<!-- 待接单 -->
		<block v-if="current === 0">
			<scroll-view scroll-y="true" class="order-list" :style="{opacity: work_status ? '1' :'.3;'}">
				<view v-if="waitOrderList.length>0">
					<orderCard v-for="item in waitOrderList" :orderDetail="item" @onDismiss="onDismiss"
						showWaitStatusOprate @onAccept="onAccept"></orderCard>
				</view>
				<view v-else>
					<uv-empty mode="order" text="暂无订单,您可以刷新列表或者检查是否开启出车模式" textColor="#696a6c"
						icon="/static/empty.png"></uv-empty>
					<view class="" style="width: 270rpx;margin: 20rpx auto 0">
						<u-button type="primary" :plain="true" text="镂空" :hairline="true"
							@click="this.current = 1">去查看已接单列表</u-button>
					</view>

				</view>

			</scroll-view>
		</block>

		<!-- 已接单 -->
		<block v-if="current === 1">
			<scroll-view scroll-y="true">
				<view v-if="processOrdersList.length>0">
					<orderCard v-for="item in processOrdersList" :orderDetail="item" shoProcessStatusOprate
						@onFinish="onFinish" @onSendBack="onSendBack"></orderCard>
				</view>
				<uv-empty v-else mode="order" text="暂无订单,您可以刷新列表" textColor="#696a6c"
					icon="/static/empty.png"></uv-empty>
			</scroll-view>
		</block>

		<!-- 已完成 -->
		<block v-if="current === 2">
			<scroll-view scroll-y="true" style="margin: 0 auto;">
				<view v-if="allOrderList.length>0">
					<orderCard v-for="item in allOrderList" :orderDetail="item"></orderCard>
				</view>
				<uv-empty v-else mode="order" text="暂无订单,您可以刷新列表" textColor="#696a6c"
					icon="/static/empty.png"></uv-empty>
			</scroll-view>

		</block>


		<view class="home-bottom">
			<button v-if="work_status === 0" class="bottom-start" @click="startStatus">开始出车</button>
			<view class="home-bottom-relax-box" v-if="work_status === 1">
				<view class="bottom-refresh" @click="refreshAll"><u-icon name="reload"
						style="margin-right: 8rpx;"></u-icon>刷新列表</view>
				<view class="bottom-relax" @click="stopStatus">停止出车</view>
			</view>
		</view>

	</view>
</template>

<script>
	import empty from '@/comnponents/empty.vue';
	import orderCard from '@/comnponents/orderCard.vue';
	export default {
		data() {
			return {
				list: [{
					name: '待接单',
					badge: {
						value: 0,
					}
				}, {
					name: '已接单',
					badge: {
						value: 0,
					}
				}, {
					name: '已完成',
					badge: {
						value: 0,
					}
				}],
				// 待接单
				waitOrderList: [],
				// 已接单
				processOrdersList: [],
				// 已完成
				allOrderList: [],
				current: 0,
				// 司机信息&状态
				drvInfo: {},
				// 工作状态
				work_status: 0
			}
		},
		components: {
			empty,
			orderCard
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				this.getDriverInfo()
				this.getWaitOrderList()
				this.getAllOrders()
				this.getProcessOrders()
			},

			async onDismiss(trade_no) {
				uni.showModal({
					title: '提示',
					content: '确认忽略订单吗？',
					success: async (e) => {
						if (e.confirm) {
							const result = await this.$http.api.doIgnoreOrders({
								trade_no
							});
							this.init()
						}

					}
				})
			},
			async onAccept(trade_no) {
				uni.showModal({
					title: '提示',
					content: '确认接受派单吗？',
					success: async (e) => {
						if (e.confirm) {
							const result = await this.$http.api.doTakeOrders({
								trade_no
							});
							this.init()
						}
					}
				})
			},
			async onSendBack(trade_no) {
				uni.showModal({
					title: '提示',
					content: '确认退回订单吗？',
					success: async (e) => {
						if (e.confirm) {
							const result = await this.$http.api.doIgnoreOrders({
								trade_no
							});
							this.init()
						}
					}
				})
			},
			async onFinish(trade_no) {
				uni.showModal({
					title: '提示',
					content: '确认结束行程完成计费吗？',
					success: async (e) => {
						if (e.confirm) {
							const result = await this.$http.api.setOrderDone_v2({
								trade_no
							});
							this.init()
						}
					}
				})
			},
			refreshAll() {
				this.init()
			},
			async startStatus() {
				const result = await this.$http.api.doExWorkStatus({
					work_status: 1
				});
				this.init()
			},
			async stopStatus() {
				const result = await this.$http.api.doExWorkStatus({
					work_status: 0
				});
				this.init()
			},
			async getDriverInfo() {
				const result = await this.$http.api.checkIsDrv();
				this.drvInfo = result;
				this.work_status = result.driver_info.work_status
			},
			async getWaitOrderList() {
				this.waitOrderList = await this.$http.api.getWaitOrders({});
				// this.$set(this.list, badge, {
				// 	value: this.waitOrderList.length,
				// })

				this.list[0].badge.value = this.waitOrderList.length
			},
			async getProcessOrders() {
				this.processOrdersList = await this.$http.api.getProcessOrders({});
				this.list[1].badge.value = this.processOrdersList.length
			},
			async getAllOrders() {
				this.allOrderList = await this.$http.api.getAllOrders({});
			},
			onTabChange(e) {
				this.current = e.index
				this.init()
			},
			click(item) {
				console.log('item', item);
			},
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	.order-list {
		/* height: 1000rpx */
		padding-bottom: 300rpx;
	}

	.home-bottom {
		position: fixed;
		bottom: 0;
		height: 200rpx;
		background-color: #fff;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: constant(safe-area-inset-bottom);
		/*兼容 IOS<11.2*/
		padding-bottom: env(safe-area-inset-bottom);
		/*兼容 IOS>11.2*/
	}

	.bottom-start,
	.bottom-relax {
		width: 680rpx;
		height: 100rpx;
		margin-top: 20rpx;
		background-color: #0066E6;
		color: #fff;
		line-height: 100rpx;
		border-radius: 24rpx;
	}

	.home-bottom-relax-box {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
	}

	.bottom-relax {
		margin-top: 0;
		text-align: center;
		font-size: 30rpx;
		/* background-color: #5495e6 */
		width: 200rpx;
		background-color: #E48645;
		border-radius: 24rpx;

	}

	.bottom-refresh {
		height: 100rpx;
		width: 480rpx;
		border-radius: 24rpx;
		background-color: #eee;
		line-height: 100rpx;
		text-align: center;
		color: #000;
		font-size: 30rpx;
	}
</style>
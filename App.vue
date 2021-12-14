<script>
import { drvMpLogin } from '@/src/utils/login.js';
export default {
	onLaunch: function() {
		drvMpLogin();
		//强制更新小程序到最新版本
		const updateManager = uni.getUpdateManager();
		
		updateManager.onCheckForUpdate(function(res) {
			// 请求完新版本信息的回调
			// console.log(res.hasUpdate);
		});
		
		updateManager.onUpdateReady(function(res) {
			uni.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				}
			});
		});
		
		updateManager.onUpdateFailed(function(res) {
			// 新的版本下载失败
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style  lang="scss"> 
/*每个页面公共css */
@import '@/src/vendor/uview-ui/index.scss';
@import '@/src/vendor/colorUI/main.css';
@import '@/src/vendor/colorUI/icon.css';
</style>

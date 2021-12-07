<script>
import { drvMpLogin } from '@/src/utils/login.js';
export default {
	onLaunch: function() {
		drvMpLogin();
		console.log('App Launch');
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

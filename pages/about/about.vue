<template>
	<view>
		<view class="img"><view class="logo"></view></view>
		<view class="about">
			<view class="title">- 科大公务用车·小程序 -</view>
			<view class="article">
				<text space="emsp">
					湘潭交通发展集团有限公司(以下简称“交发集团”)组建于2016年12月，注册资本10亿元人民币，是湘潭市政府出资设立的市属大型国有独资集团公司。作为湘潭市唯一家综合性大型交通集团，交发集团承担着区域重大交通基础设施项目的投融资、运营、管理，为社会公众提供优质满意的交通营运服务，以及推进区域交通运输体系多元化发展的功能和职责。
				</text>
				<text space="emsp">
					目前，交发集团本部设有12个职能部门，辖9家全资子公司，共有从业人员万余人，正式职工近4300人。经过近三年的经营发展，逐步发展形成交通基础设施业务、交通运输营运业务、交通资源综合开发业务、交通关联业务等几大主营板块，以优异的成绩全面完成了市委、市政府交办的各项任务，彰显了国有企业的政治责任、社会责任和经济责任，为保障“交通强市”和“乡村振兴”战略落实落地作出了较大贡献。根据新一轮国企改革部署和要求，交发集团将不断提升企业核心竞争力，积极推进企业转型升级发展，在聚焦做大做强交通主业的同时，依托交通基础设施项目，积极参与相关产业的对外合作投资，进一步盘活资产资源，促进国有资产保值增值，持续巩固和提升作为区域“交通建设主战场、交通服务主阵地、交通融资主平台、交通发展主力军”的坚实地位。通过五到十年的努力，力争打造成为主业竞争力强，经济效益和社会效益双增长的现代优秀企业。
				</text>
				<!-- <text space="emsp">并且拥有跨省班线和全省13家地州市的跨区班线以及县际县内班线共300多条，拥有高、中档营运客车1400余台，日发班次2200多个，年客运总量近4000万人次，年总收入近4亿元，每年上缴国家税费2000多万元，目前企业拥有各类资产5亿元。树立了良好的企业形象和社会信誉。</text> -->
				<!-- <text space="emsp">欢迎广大同学们一起见证轻应用的不断完善，交流反馈群: 362858401。</text> -->
			</view>
			<!--    <view class="title">- 科大校园菌 -</view>
    <view class="article">
        <text space="emsp">科大校园菌成立于2019年9月，现已有超过20位成员分别负责技术、设计、运营推广等工作。截止到现在，科大校园菌团队已经开发“科大校园菌”公众号、“We湖科”小程序、“科大商贸街”小程序等。其中，“科大校园菌”各种云现已有超过2万用户，日均活跃量超过8000人次。</text>
        <text space="emsp">出于对技术的热爱和对设计的追求，科大校园菌团队成员本着为湖科大学生服务的出发点，创造解决生活学习中存在的痛点的可能，开发产品，服务同学，提升技术能力。玩转湖科大，一个小程序就够了。</text>
    </view> -->
		</view>
		<view style="height:10vh;background-color: #ffffff;"></view>
		<view style="background-color: #ffffff;">
			<view @click="agreement" class="privacy" style="color:#0062DF">用户协议&隐私政策</view>
			<view style="height:2vh;"></view>
			<!-- <view id="footer" style="bottom:0;margin:40rpx auto;width:100%;left:0;">
     <view class="copyright" style="font-size:12px;line-height:24px;color:#919797;text-align:center;margin:0 auto;"> 2019 - 2020 科大校园菌</view>
     <view class="copyright" style="font-size:12px;line-height:24px;color:#919797;text-align:center;margin:0 auto;">All Rights Reserved.</view>
 </view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},

	components: {},
	props: {},
	onLoad: function(n) {},
	onReady: function() {},
	onShow: function() {},
	onHide: function() {},
	onUnload: function() {},
	onPullDownRefresh: function() {},
	onReachBottom: function() {},
	onShareAppMessage: function() {},
	methods: {
		agreement() {
		 console.log(111);
			// uni.navigateTo({
			//     url: "pages/universal/agreement/agreement"
			// });
			uni.navigateTo({
				url: '/helpCenter/about/agreement/agreement'
			});
		}
	}
};
</script>
<style scoped>
@import './about.css';
</style>

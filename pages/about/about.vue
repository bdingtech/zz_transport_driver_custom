<template>
	<view>
		<view class="img"><view class="logo"></view></view>
		<view class="about">
			<view class="title">- 湘运行·小程序 -</view>
			<view class="article">
				<text space="emsp">
					湘运集团有限责任公司系湖南省株洲地区举足轻重的专业化道路运输龙头企业。是以运输产业为主，房地产开发、汽车维修、汽配销售、住宿餐饮、保险代理、户外及车身广告、房屋及场地租赁为辅的多元化经营的企业集团。始创于1984年，2006年由国有企业成功改制为民营企业。现有从业人员5000多人，拥有各类营运车辆1100余台（含出租车和公交车），下辖9个分（子）公司和12个等级汽车客运站及11个汽车修理厂，开行客运班线300余条，幅射全国15个省（市），日均发送旅客1.5万人次。是交通部首批确定的二级道路客运企业。
				</text>
				<text space="emsp">
					企业始终坚持以“优质服务、文明经营、安全生产、奉献社会”为宗旨，以“高起点规划企业、高质量建设企业、高标准管理企业、高效益经营企业”为总要求，以“保安全、保稳定、保效益、保优质服务”为目标，把牢发展主线，调整经营思路，推进诚信建设，促进和谐发展，强化服务质量，提升服务水平，加强安全监管，确保企业稳定，取得了一定的经济效益和良好的社会效益，为繁荣经济，搞活流通，加快地区交通运输事业快速发展作出了积极贡献，赢得了各级政府及社会各界的普遍赞誉。特别是在企业改制以后，能主动为政府分忧，将原企业在岗职工100%安排继续上岗，积极推行工资集体协商制度，签订集体合同，实行全员劳动合同制，切实维护员工合法权益。始终坚持依法经营，照章纳税，每年向国家缴纳各项税、费2000余万元。始终将追求社会效益摆在首位，不计得失地服务广大市民，于2008年正式开通了单程长达38km的湖南工大至方特106公交专线，在没有享受政府任何补贴的情况下，每年亏损多达300余万元，一直坚持运行至今，为方便市民出行作出了巨大牺牲。尤其难能可贵的是，尽管道路运输行业是一个高风险、低回报的行业，湘运集团能始终不忘企业的立足之本，勇于承担社会责任，先后向各级慈善机构、贫困地区和光荣院及学校捐款1000余万元，用一腔赤诚诠释着人间大爱。


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

<template>
	<div id="detail">
		<detailnavbar class="nav_bar" @titleClick="titleClick" ref="nav"/>
		<scroll class="content" ref="scroll"  :probe-type="3" @scroll="contentScroll"><!--通过Scroll.vue定义的scroll事件监听页面的滚动位置-->
			<detail-swiper :adImgData="ad_img"></detail-swiper>
			<detail-base-info :baseinfo="detailData" @detailImageLoad="detailImageLoad"></detail-base-info>
			<detail-param-info ref="params"/>
			<detail-comment-info ref="comment" :commeninfo="detailData"/>
			<goods-list ref="recommend" :goods="recommends"/>
		</scroll>
		<detail-bottom-bar  @addToCart="addToCart"/>
		<back-top @click.native="backClick" v-show="isShowBackTop"/>
	</div>
</template>

<script>
	import detailnavbar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailParamInfo from './childComps/DetailParamInfo'
	import DetailCommentInfo from './childComps/DetailCommentInfo'
	import DetailBottomBar from './childComps/DetailBottomBar'
	
	import Scroll from 'components/common/scroll/Scroll'
	import GoodsList from 'components/content/goods/GoodsList'

	import {getDetail} from 'network/detail.js'
	import {getHomeGoods} from 'network/home.js'
	import {debouce} from 'common/utils.js'
	import {itemListenerMixin,backTopMixin} from 'common/mixin.js'
	
	import {mapActions} from 'vuex'
	export default{
		name:"Detail",
		components:{
			detailnavbar,
			DetailSwiper,
			DetailBaseInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar,
			Scroll,
			GoodsList,
			
		},
		mixins:[itemListenerMixin,backTopMixin],
		data(){
			return{
				g_id:null,
				ad_img:[],
				detailData:{},
				recommends:[],
				themeTopys:[] ,//titletab滚动高度
				getThemeTopy:null,
				currentIndex:0,
			}
		},
		created(){
			//详情数据
			this.g_id = this.$route.params.g_id			
			getDetail(this.g_id).then(res => {
				this.ad_img = res.data.ad_img
				this.detailData = res.data
				
				//子组件数据完全加载展示完后回调
				// this.$nextTick(()=>{
				// 	this.themeTopys = []
				// 	this.themeTopys.push(0)
				// 	this.themeTopys.push(this.$refs.params.$el.offsetTop)
				// 	this.themeTopys.push(this.$refs.comment.$el.offsetTop)
				// 	this.themeTopys.push(this.$refs.recommend.$el.offsetTop)
				// 	console.log(this.themeTopys)
				// })
			}),
			//推荐数据
			getHomeGoods('pop',1).then(res=>{
				this.recommends = res.data.list
			})
			
			this.getThemeTopy =debouce(()=>{
				this.themeTopys = []
				this.themeTopys.push(0)
				this.themeTopys.push(this.$refs.params.$el.offsetTop - 55)
				this.themeTopys.push(this.$refs.comment.$el.offsetTop)
				this.themeTopys.push(this.$refs.recommend.$el.offsetTop)
				this.themeTopys.push(Number.MAX_VALUE)
				// console.log(this.themeTopys)
			},100)
			
		},
		
		mounted() {
			//console.log('methods')
		},
		updated(){
			
		},
		destroyed() {
			this.$bus.$off('itemImageLoad',this.itemImgListener)
		},
		methods:{	
			...mapActions(['addCart']),
			titleClick(index){
				this.$refs.scroll.scrollTo(0, -this.themeTopys[index], 100)
			},
			detailImageLoad(){
				this.newRefresh()
				// this.$refs.scroll.refresh()
				this.getThemeTopy()
			},
			//监听页面的滚动位置
			contentScroll(position){
				// [0, 959, 1216, 1504,非常大的值]
				// console.log(position)
				//1.获取Y值
				const positionY = - position.y
				//2.positionY语标题中的Y值进行比较
				let length = this.themeTopys.length
				for(let i = 0; i<length-1; i++){//i<length-1 因为最后一次不用遍历，所以要减一
					if(this.currentIndex!==i  && (positionY >= this.themeTopys[i] && positionY < this.themeTopys[i+1])){
						this.currentIndex = i
						// console.log(this.currentIndex)
						//把判断后的值传入navbar ，实现滚动切换
						this.$refs.nav.currentIndex = this.currentIndex						 
					}
				}
				//3.是否显示回到顶部
				this.isShowBackTop = (-position.y) > 1000
				
				// for(let i = 0; i<length; i++){
				// 	if(this.currentIndex!==i  && ((i < length -1 && positionY >= this.themeTopys[i] && positionY < this.themeTopys[i+1])
				// 	|| (i === length -1 && positionY >= this.themeTopys [i]))){
				// 		this.currentIndex = i
				// 		console.log(this.currentIndex)
				// 		//把判断后的值传入navbar ，实现滚动切换
				// 		this.$refs.nav.currentIndex = this.currentIndex
				// 	}
				// }
				
			},
			addToCart(){
				//1.获取购物车需要展示的信息
				const product = {}
				product.img = this.ad_img[0].img_url
				product.title = this.detailData.name
				product.sum = this.detailData.sum
				product.id = this.detailData.id
				product.conut = 1
				//1通过vuex添加到store中进行管理，
				//2因为是要实时修改state中的数据，所以要是通过actions 执行mutartion来修改state中的数据
				//这样在其他多个页面都能共享这些信息
				// this.$store.commit('addCart',product)
				// this.$store.dispatch('addCart',product)
				this.addCart(product).then(res =>{
					this.$toast.show(res,2000)
					// console.log(this.$toast)
				})
			}
			
		}
	}
</script>

<style scoped>
	#detail{
		height: 100vh;
		position:relative;
		z-index: 10;
		background: #FFFFFF;
	}
	.content{
		position:absolute;
		height:calc(100% - 44px - 55px);
		overflow: hidden;
	}
	.nav_bar{
		position: relative;
		z-index: 9;
		background: #FFFFFF;
	}

</style>

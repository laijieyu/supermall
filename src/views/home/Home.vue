<template>
	<div id="home">
		<navbar class="home-nav"><div slot="center">新鲜到家</div></navbar>
		<tab-control :titles="['今日生鲜', '精选食品', '五谷粮油']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isToFixed"/>
		<scroll class="content"  
				ref="scroll"  
				:probe-type="3" 
				@scroll="contentScroll" 
				:pull-up-load="true" 
				@pullingUp="loadMore">
			<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
			<recommend-view :recommends="recommends"/>
			<!-- <feature-view/> -->
			<tab-control :titles="['今日生鲜', '精选食品', '五谷粮油']" @tabClick="tabClick" ref="tabControl2" />
			<good-list :goods="showGoods"/>
		</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop"/>
		
	</div>
	
</template>

<script>
	//公共组件
	import navbar from 'components/common/navbar/NavBar'
	import TabControl from 'components/content/tabControl/TabControl'
	import GoodList from 'components/content/goods/GoodsList'
	import Scroll from 'components/common/scroll/Scroll'
	
	//私有子组件
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import FeatureView from './childComps/FeatureView'
	
	//方法
	import {getHomeMultidata,getHomeGoods} from 'network/home' 
	import {debounce} from 'common/utils.js'
	import {itemListenerMixin,backTopMixin} from 'common/mixin.js'
	export default{
		name:"Home",
		components:{
			navbar,
			TabControl,
			GoodList,
			Scroll,
		
			HomeSwiper,
			RecommendView,
			FeatureView
		},
		mixins:[itemListenerMixin,backTopMixin],
		data(){
			return {
				banners:[], 	//轮播图
				recommends:[],	//四个推荐
				goods:{		//商品列
					'pop':{page:0,list:[]},
					'new':{page:0,list:[]},
					'sell':{page:0,list:[]}
				},
				currentType: 'pop', //默认加载商品列类型
				tabOffsetTop:0,   //tab-control到顶部的高度
				isToFixed:false  //是否吸顶
			}
		},	
		computed: {
			//根据tab显示商品列
		  showGoods() {
		    return this.goods[this.currentType].list
		  }
		},
		activated: function () {
		  this.$refs.hSwiper.startTimer()
		},
		deactivated: function () {
		  this.$refs.hSwiper.stopTimer()
		},
		//生命周期
		created(){ //created中一般不写具体代码
			//调接口获取首页数据
			this.getHomeMultidata()
			//请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
			
		},
		mounted() {
			//监听商品数据item图片加载完成
			// this.$bus.$on('itemImageLoad',()=>{
			// 	this.$refs.scroll.refresh()
			// 	console.log('-----')
			// })
			//注意：但是我们直接执行refresh，那么refresh在每次刷新加载的时候都会加载n+10次
			//	   如果讲refresh函数传入debounce函数中，生成一个新的函数
			
			// 防抖动 通过防抖动函数控制refresh调用次数
			//图片加载完成的时间监听
			// const refresh =debounce(this.$refs.scroll.refresh,50)
			// this.$bus.$on('itemImageLoad',()=>{
			// 	refresh()
			// })
			// 方法一根据路由执行发出对应时间
			// this.$bus.$on('homeitemImageLoad',()=>{
			// 	refresh()
			// })
			
		},
		methods:{			
			tabClick(index) {
			  switch (index) {
			    case 0:
			      this.currentType = 'pop'
			      break
			    case 1:
			      this.currentType = 'new'
			      break
			    case 2:
			      this.currentType = 'sell'
			      break
			  }
			  this.$refs.tabControl1.currentIndex = index
			  this.$refs.tabControl2.currentIndex = index
			},
			// 回到顶部 已抽取到mixin
			//  backClick() {
			//   this.$refs.scroll.scrollTo(0, 0)
			// },
			// 距离1000显示回到顶部
			contentScroll(position) {
				//1.判断BackTop是否显示
				// console.log(position);
			  this.isShowBackTop = (-position.y) > 1000
				//2.判断TabControl是否吸顶
				this.isToFixed = (-position.y) > this.tabOffsetTop
			},
			//加载更多
			loadMore() {
			  this.getHomeGoods(this.currentType)
			},
			//获取tab-control到顶部的高度tabOffsetTop
			swiperImageLoad(){
				//所有的组件都有一个属性$el,$el:用于获取组件中的元素
				// console.log(this.$refs.tabControl2.$el.offsetTop)		
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
				
			},
			//调接口获取首页数据
			getHomeMultidata(){
				getHomeMultidata().then(res=>{
					// console.log(res)
					 this.banners = res.data.data.ad_img
					 this.recommends = res.data.data.goods_class
				})
			},
			// 获取商品列
			getHomeGoods(type){
				const page = this.goods[type].page+1
				getHomeGoods(type,1).then(res=>{
					// console.log(res)
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page+=1
					//加载更多
					this.$refs.scroll.finishPullUp()
				})
				
			},
			
		}
	}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh; 
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
	
  .content {
    overflow: hidden;
    position:absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
	.tab-control{
		position: relative;
		z-index: 9;
	}
</style>
<template>
	 <div id="category">
	  <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
	  <div class="content">
	    <tab-menu :categories="categories"  @selectItem="selectItem"></tab-menu>
	
	  <scroll id="tab-content">
	      <div>
			  
	        <tab-content-category  :subcategories="subcategories"></tab-content-category>
	      <!-- <tab-control :titles="['综合', '新品', '销量']"
	                     @itemClick="tabClick"></tab-control>
	        <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail> -->
	      </div>
	    </scroll>
	  </div>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	// 
	import TabMenu from './childComps/TabMenu'
	 import TabControl from 'components/content/tabControl/TabControl'
	import Scroll from 'components/common/scroll/Scroll'
	import TabContentCategory from './childComps/TabContentCategory'
	 // import TabContentDetail from './childComps/TabContentDetail'
	// 
	 import {getCategory,getSubcategory} from "network/category";
	// import {POP, SELL, NEW} from "@/common/const";
	 import {tabControlMixin} from "@/common/mixin";
	
	export default{
		name:"Category",
		components:{
			NavBar,
			TabMenu,
			TabControl,
			Scroll,
			TabContentCategory,
			// TabContentDetail
		},
		data() {
		  return {
		    categories: [],
		    categoryData: {
		    },
				subcategories:[],
		    currentIndex: -1
		  }
		},
		created() {
		  // 1.请求分类数据
		  this._getCategory()
		},
		 methods: {
		  _getCategory() {
		    getCategory().then(res => {
					// console.log(res)
		      // 1.获取分类数据
		      this.categories = res.data.data
		      // 2.初始化每个类别的子数据
		      for (let i = 0; i < this.categories.length; i++) {
		        this.categoryData[i] = {
		          subcategories: {},
		          // categoryDetail: {
		          //   'pop': [],
		          //   'new': [],
		          //   'sell': []
		          // }
		        }
		      }
		      // 3.请求第一个分类的数据
		       this._getSubcategories(0)
		    })
		  },
			_getSubcategories(index) {
			  this.currentIndex = index;
			  // const mailKey = this.categories[index].maitKey;
				const class_id = this.categories[index].id;
			  getSubcategory(class_id).then(res => {
					// console.log(res)
			     this.categoryData[index].subcategories = res.data.data
			     this.categoryData = {...this.categoryData}
					 this.subcategories=res.data.data
			    // this._getCategoryDetail(POP)
			    // this._getCategoryDetail(SELL)
			    // this._getCategoryDetail(NEW)
			  })
			},
			/**
			 * 事件响应相关的方法
			 */
			selectItem(index) {
			  this._getSubcategories(index)
			}
		}	
	}
</script>

<style scoped>
	#category {
	  height: 100vh;
	  position:relative
	}
	
	.nav-bar {
	  background-color: var(--color-tint);
	  font-weight: 700;
	  color: #fff;
	}
	
	.content {
	  position: absolute;
	  left: 0;
	  right: 0;
	  top: 44px;
	  bottom: 49px;
		overflow: hidden;
	  display: flex;
	}
	
	#tab-content {
	  height: 100%;
	  flex: 1;
	  
	}
</style>
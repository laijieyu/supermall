// import {POP, NEW, SELL} from "./const";
// import {POP, NEW, SELL} from "./const";
//混入

import {debouce} from './utils.js'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin={
	data(){
		return{
			itemImgListener:null,
			newRefresh:null
		}
	},
	mounted(){
		this.newRefresh =debouce(this.$refs.scroll.refresh,50)
		this.itemImgListener = ()=>{
				this.newRefresh()
			}
		this.$bus.$on('itemImageLoad',this.itemImgListener)
		console.log('我是混入中的内容')
	},
	// 
	
}
export const backTopMixin = {
	components:{
		BackTop
	},
  data: function () {
    return {
      isShowBackTop:false, //是否显示点击回到顶部
    }
  },
  methods: {
    // 回到顶部
     backClick() {
      this.$refs.scroll.scrollTo(0, 0,300)
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}

<!-- 页面滚动 -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
        message: '哈哈哈'
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 2.监听滚动的位置
			  if(this.probeType === 2 || this.probeType === 3){
				this.scroll.on('scroll', (position) => {
         // console.log(position);
        this.$emit('scroll',position)
      })
		  }
      

      // 3.监听上拉事件
			if(this.pullUpLoad){
				this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
			}
      
    },
    methods: {
			//显示回到顶部
      scrollTo(x, y, time=300) {
       this.scroll && this.scroll.scrollTo(x, y, time)
      },
			//上拉事件
      finishPullUp() {
        this.scroll.finishPullUp()
      },
			//刷新可加载高度(图片加载情况)
			refresh(){
				//console.log('----')
				this.scroll && this.scroll.refresh()
			}
    }
  }
</script>

<style scoped>

</style>

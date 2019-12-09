<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="goodsItem.img" alt="" @load="imageLoad"><!-- @load监听图片加载完成-->
    <div class="goods-info">
      <p>{{goodsItem.name}}</p>
      <span class="price">¥{{goodsItem.sum | amount }}</span>
      <span class="collect">{{goodsItem.likes}}</span>
    </div>
  </div>
</template>

<script>

  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      },
    },
		filters:{
			amount:function(sum){
					// console.log(sum)
					 return isNaN(sum) ? 0.00 : parseFloat(sum/100).toFixed(2);
			}
		},
		methods:{
			imageLoad (){
				//$bus事件总线  通过$bus.$emit发射发射的事件在祖父组件也能直接通过$bus.$on监听到 
				//方法一根据路由执行发出对应时间
				// if(this.$route.path.indexOf('/home')){
				// 	this.$bus.$emit('homeitemImageLoad')
				// }else if(this.$route.path.indexOf('/detail')){
				// 		this.$bus.$emit('detailitemImageLoad')
				// }
				//方法二
				this.$bus.$emit('itemImageLoad')
				
			},
			itemClick(){
				this.$router.push('/detail/' + this.goodsItem.id)
			}
		}
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>

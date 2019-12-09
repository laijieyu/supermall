<template>
	<div class="base-info">
		<div class="info-title">{{baseinfo.name}}</div>
		<div class="info-price">
			<span class="n-price">¥ {{baseinfo.sum | amount }}</span>
			<span class="o-price">¥ {{baseinfo.lable_sum| amount}}</span>
			<span class="discount">今日特价</span>
		</div>
		<div class="info-other">
			<span>销量:{{baseinfo.sv_num}}</span>
			<span>收藏:{{baseinfo.col_num}}</span>
			<span>{{baseinfo.dg_time}}</span>
		</div>
		<div class="info-service">
			<span v-for="item in detailTag" class="info-service-item" >
				<img src="~assets/img/detail/queren.png"/>
				<span>{{item.content}}</span>
			</span>
		</div>
		<div class="info_detailed_img">
			<div class="ed_title">商品详情图</div>
			<img :src="baseinfo.detailed_img" @load="imgLoad"/><!-- " -->
		</div>
	</div>
</template>

<script>
	export default{
		name:"DetailBaseInfo",
		props:{
			baseinfo:{
				type:Object,
			}
		},
		data(){
			return{
				detailTag:[
					{
					 img:'～assets/img/detail/queren.png',
					 content:'退货补运费'
					},
					{
					 img:'～assets/img/detail/queren.png',
					 content:'全国包邮'
					},
					{
					 img:'～assets/img/detail/queren.png',
					 content:'7天无理由退货'
					}
				],
				conntent:0,
				imgLenght:0
			}
		},
		filters:{
			amount:function(sum){
				// console.log(sum)
				 return isNaN(sum) ? 0.00 : parseFloat(sum/100).toFixed(2);
			}
		},
		methods:{
			imgLoad(){
				//判断所有图片加载完，进行一次回调
				// if(++this.conntent === this.imgLenght){
					this.$emit('detailImageLoad')
					//console.log('1')
				// }
			}
		},
		watch:{
			// 获取图片个数
			baseinfo(){
				this.imgLenght = this.baseinfo.detailed_img.length
 			}
		}
	}
</script>
<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-title {
    color: #222
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }

  .info-price .o-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }

  .info-price .discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;

    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -8px;
  }

  .info-other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }

  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }

  .info-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .info-service-item span {
    font-size: 13px;
    color: #333;
  }
 
  .info_detailed_img img{
	  width: 100%;
  }
  .ed_title{
	  /* margin-top: 3rem; */
	  padding: 15px;
	  text-align: center;
	  border-top: 1px solid #F1F1F1;
	   border-bottom: 1px solid #F1F1F1;
  }
</style>

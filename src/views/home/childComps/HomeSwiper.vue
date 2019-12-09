<template>
	<swiper>
		<swiper-item v-for="item in banners" >
			<img :src="item.img_url" @load="imageLoad" />
		</swiper-item>
	</swiper>
</template>

<script>
	import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
	export default{
		name:"HomeSwiper",
		props:{
			banners:{
				type:Array,
				default(){
					return[]
				}
			}
		},
		components:{
			Swiper,
			SwiperItem
		},
		data(){
			return{
				isLoad:false
			}
		},
		methods:{
			//监测轮播图是否加载完成 
			//根据isLoad的值使该时间只调用一次
			imageLoad(){
				//判断是否加载
				if(!this.isLoad){
					//发送到home
					this.$emit('swiperImageLoad')
					this.isLoad =true
				}
				
			}
		}
	}	
</script>

<style>
</style>

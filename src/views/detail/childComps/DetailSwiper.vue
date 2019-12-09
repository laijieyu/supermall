<template>
	<swiper>
		<swiper-item v-for="item in adImgData">
			<img :src="item.img_url"/>
		</swiper-item>
	</swiper>
</template>

<script>
	import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
	export default{
		name:"DetailSwiper",
		components:{
			Swiper,
			SwiperItem
		},
		props:{
			adImgData:{
				type:Array,
				default(){
					return[]
				}
			}
		}
		
	}
</script>

<style>
</style>

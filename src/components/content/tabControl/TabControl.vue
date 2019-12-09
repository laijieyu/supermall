<!-- 吸顶导航 -->
<template>
	<div class="tab-ontrol">
		<div class="tab-ontrol-item" v-for="(item, index) in titles" 
		:class="{active:index===currentIndex}" @click="itemClick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		name:"TabControl",
		props:{
			titles:{
				type:Array,
				default(){
					return[]
				}
			}
		},
		data(){
			return{
				currentIndex:0
			}
		},
		methods:{
			itemClick(index){
				this.currentIndex=index
				//传出点击的tab
				this.$emit('tabClick', index)
			}
		}
	}
</script>

<style scoped>
	.tab-ontrol{
		display: flex;
		text-align: center;
		background: #FFFFFF;
		font-size: 15px;
		height: 44px;
		line-height: 44px;
	}
	.tab-ontrol-item{
		flex: 1;
	}
	.tab-ontrol-item span{
		padding: 5px;
	}
	.active{
		color:var(--color-high-text)
	}
	.active span{
		border-bottom:3px solid var(--color-tint);
	}
</style>

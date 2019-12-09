<template>
	<div class="tab-bar-item" @click="itemClick()">
		<!-- 为了防止插槽替换的时候出现样式混乱最好是用div包裹起来 -->
		<div v-if="!isActive"><slot name='item-icon'></slot></div>
		<div v-else><slot name='item-icon-active'></slot></div>
		<div :style="activeStyle"><slot name='item-text'></slot></div>
	</div>
	
</template>

<script>
	export default{
		name:"TabBarItem",
		props:{   //接受组件传入的数据
			path:String,
			activeColor:{
				type:String,
				default:"#ff5777"
			}
		},
		data(){
			return{
				
			}
		},
		computed:{
			isActive(){  //判断当前页面是不是最活跃的页面 是返回true 不是返货false
				return this.$route.path.indexOf(this.path)!==-1
			},
			
			activeStyle(){//当前页面是最活跃的话添加点击样式	
				 return this.isActive?{color:this.activeColor} : { }
			}
		},
		methods:{
			itemClick(){
				if(this.$route.path!=this.path){
					this.$router.replace(this.path)//replace不能返回
				}
				
			}
		}
	}
</script>

<style>
	.tab-bar-item{
		flex: 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
		padding-top: 3px;
	}
	.tab-bar-item img{
		width: 24px;
		height: 24px;
		vertical-align: middle;
		margin-bottom: 2px;
	}

</style>

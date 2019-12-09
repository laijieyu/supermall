<template>
	<div>
		<navbar>
			<div slot="left" class="back" @click="backClick"><img src="~assets/img/common/back.svg"/></div>
			<div slot="center" class="titles">		
				<div v-for="(item,index) in titles"
				 @click="titleClick(index)"
				 :class="{active:index===currentIndex}">{{item}}</div>
			</div>
		</navbar>
	</div>
	
</template>

<script>
	import navbar from 'components/common/navbar/NavBar'
	export default{
		name:"DetailNavBar",
		components:{
			navbar
		},
		data(){
			return{
				titles:['商品','参数','评论','推荐'],
				currentIndex:0
			}
		},
		methods:{
			titleClick(index){
				this.currentIndex=index
				//给父组件发出顶部title点击事件
				this.$emit('titleClick',index)
			},
			backClick(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped>
	.titles{
		display: flex;
		font-size: 13px;
	}
	.titles div{
		flex: 1;
	}
	.active{
		color:var(--color-high-text)
	}
	.back img{
		margin-top: 11px;
	}
</style>

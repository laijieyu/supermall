<template>
	<div class="toast" v-show="isshow">
		<div>{{message}}</div>
	</div>
</template>

<script>
	export default {
		name:"Toast",
		props:{
			// message:{
			// 	type:String,
			// 	default:''				
			// },
			// isshow:{
			// 	type:Boolean,
			// 	default:false
			// }
		},
		data(){
			return{
				message:'',
				isshow:false
			}
		},
		methods:{
			//给参数默认的值
			show(message='成功！',duration=2000){
				this.isshow = true
				this.message = message
				
				setTimeout(()=>{
					this.isshow = false
					this.message = ''
				},duration)
			}
		}
	}
</script>

<style scoped="scoped">
	.toast{
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		padding: 8px 10px;
		color: #FFFFFF;
		background: rgba(0,0,0,0.75);
		z-index: 33;
	}
</style>

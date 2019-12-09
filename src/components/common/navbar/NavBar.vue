<!-- 页头 -->
<template>
	<div class="nav-bar">
		<div class="n-left"><slot name="left"></slot></div>
		<div class="n-center"><slot name="center"></slot></div>
		<div class="n-right"><slot name="right"></slot></div>
	</div>
</template>

<script>
	export default{
		name:"NavBar"
	}
</script>
	
<style scoped>
	.nav-bar{
		display: flex;
		height: 44px;
		line-height: 44px;
		text-align: center;
		box-shadow: 1px 1px 6px 1px #f1f1f1;

	}
	.n-left, .n-right{
		width: 60px;
		
	}
	.n-center{
		flex: 1;
	}
</style>

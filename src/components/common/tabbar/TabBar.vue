<!-- 底部导航 -->
<template>
	<div id="tab-bar">
		<slot></slot>
	</div>
</template>

<script>
	export default{
		name:"TabBar"
	}
</script>

<style>
	@import url('../../../assets/css/base.css');
	#tab-bar{
		display: flex;
		position: fixed;
		right: 0;
		left: 0;
		bottom: 0;
		background: #f6f6f6;
		box-shadow: 0 -1px 7px rgba(111,111,111,0.2);
	}
</style>

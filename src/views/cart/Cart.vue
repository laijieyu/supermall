<template>
	<div id="cart">
	  <nav-bar class="nav_bar2"><div slot="center">购物车({{cartLength}})</div></nav-bar>
	  <cart-list  :cart-list="cartlist"></cart-list>	 
	  <bottom-bar></bottom-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	 import BottomBar from './childComps/BottomBar'
	import CartList from './childComps/CartList'
	
	import { mapGetters } from 'vuex'
	export default{
		name:"Cart",
		components: {
			NavBar,
			CartList,
			BottomBar
		 
		},
		computed:{
			// mapGetters 辅助函数
			// mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters([
			  'cartLength',
			  'cartlist'
			  // ...
			])
			// cartCount() {
			//    return this.$store.getters.cartLength
			// }
			
		}
	}
</script>

<style scoped>
	#cart {
	   position: relative;
	   height: 100vh; 
	}
	
	.nav_bar2{
	background-color: var(--color-tint);
	  font-weight: 700;
	  color: #fff;
	  position: relative;
	  z-index: 9;
	}
	
	
</style>
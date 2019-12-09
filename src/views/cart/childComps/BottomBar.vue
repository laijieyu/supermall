<template>
  <div class="bottom-menu">
    <check-button class="select-all" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice | amount}}</span>
   <span class="buy-product" @click="calcClick">去计算({{checkLength}})</span>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue'
	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed:{
		  totalPrice(){
        // const cartList = this.$store.getters.cartList;
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
           return preValue + item.conut * item.sum
         }, 0)
      },
			checkLength(){
				  return this.$store.state.cartList.filter(item => item.checked).length;
			},
      isSelectAll: function () {
				if(this.$store.state.cartList.length === 0) return false
				//1.使用filter
				 //return !(this.$store.state.cartList.filter(item => !item.checked).length)
				 //使用find 找到某一个元素
         //2.return this.$store.state.cartList.find(item => item.checked === false) === undefined;
				 //3.普通遍历方法
				 for(let item of this.$store.state.cartList){
					 if(!item.checked){
						 return false
					 }
					 
				 }
				 return true
      }
    },
		filters:{
			amount:function(sum){
				 return isNaN(sum) ? 0.00 : parseFloat(sum/100).toFixed(2);
			}
		},
    methods: {
      checkClick: function () {
        // 1.判断是否有未选中的按钮
        // let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);
// 
//         // 2.有未选中的内容, 则全部选中
        if (this.isSelectAll) {
          this.$store.state.cartList.forEach(item => item.checked = false);
        } else {
            this.$store.state.cartList.forEach(item => item.checked = true);
        }
      },
			calcClick:function (){
				if(!this.isSelectAll){
					this.$toast.show('请选择购买的商品',2000)
				}
			}
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>

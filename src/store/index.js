import Vue from 'vue'
import Vuex from 'vuex'
//安装插件
Vue.use(Vuex)
//创建实例store
const store = new Vuex.Store({
	state:{
		//需要保存的购物车列
		cartList:[]
	},
	mutations:{
		//数量+1
		addCounter(state,payload){
			payload.conut ++
		},
		addToCart(state,payload){
			payload.checked = true
			state.cartList.push(payload)
		}
	},
	actions:{
		addCart(context,payload){
			return new Promise((resolve,reject)=>{
				// 添加信息到state
				//1查找数组之前是否有该条数据
				let oldProduct = context.state.cartList.find(item => item.id === payload.id)
				if(oldProduct){//数量加1
					context.commit('addCounter',oldProduct)
					resolve('当前的商品数量+1')
				}else{//添加新的商品到购物车
					payload.conut =1
					context.commit('addToCart',payload)
					resolve('添加到购物车成功')
				}
			})
			
		}
	},
	getters:{
		cartLength(state){
			return state.cartList.length
		},
		cartlist(state){
			return state.cartList
		}
	}
}) 
//导出实例 
export default store
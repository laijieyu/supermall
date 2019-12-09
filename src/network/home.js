//首页所有的网络请求
//1.导入网络请求
import {request1} from './request.js'
//创建首页网络请求实例
export function getHomeMultidata(){
	return request1({
		url:'/Index/get_index_data?u_id=1&token=51448cceb09e12e0dc36ef51b70f9bb3'
	})
	
}
export function getHomeGoods(type,page){
	return request1({
	  url:'/Test/test_ll',
	  params:{
	    type,
	    page
	  }
	})
}
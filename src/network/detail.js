import {request,request1} from './request.js'
export function getDetail(g_id){
	return request1({
	  url:'/Test/test_goods_dtl',
	  params:{
	   g_id
	  }
	})
}
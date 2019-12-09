//1.导入网络请求
import {request1} from './request.js'
export function getCategory(){
	return request1({
		url:'/Classify/get_fh_goods_class'
	})
	
}
export function getSubcategory(class_id){
	return request1({
		url:'/Classify/get_fh_goods_by_class_id',
		params: {
			u_id:1,
			token:'51448cceb09e12e0dc36ef51b70f9bb3',
			class_id,
			sort_type:1,
			xb:0
		}
	})
	
}

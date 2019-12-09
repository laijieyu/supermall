// 网络请求
// 1导入axios
import axios from 'axios'

export function request(config){//config传入的参数
		//创建axios实例
		const instance = axios.create({
			baseURL:'http://123.207.32.32:8000' ,
			timeout:5000
		})
		//2.axios拦截器
		//请求拦截
		instance.interceptors.request.use(config=>{
			return config
		},err=>{
			console.log(err)
		})
		//响应拦截
		instance.interceptors.response.use(res=>{
			return res.data
		},err=>{
			console.log(err)
		})
		return instance(config)
	
}
export function request1(config){//config传入的参数
		//创建axios实例
		const instance1 = axios.create({
			baseURL:'https://fresh365.gomyhome365.com/fresh365/index.php/api' ,
			timeout:5000,
		})
		//2.axios拦截器
		// //请求拦截
		// instance1.interceptors.request.use(config=>{
		// 	return config
		// },err=>{
		// 	console.log(err)
		// })
		// //响应拦截
		// instance1.interceptors.response.use(res=>{
		// 	return res.data
		// },err=>{
		// 	console.log(err)
		// })
		return instance1(config)
	
}

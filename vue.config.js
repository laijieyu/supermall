module.exports={
	configureWebpack:{
		resolve:{
			alias:{
				'assets':'@/assets',
				'common':'@/common',				
				'components':'@/components',
				'network':'@/network',
				'views':'@/views'
			}
		},
		// devServer: {
  //           proxy: {
  //               //名字可以自定义，这里我用的是api
  //               '/api': {
  //                 target: 'https://fresh365.gomyhome365.com/fresh365/index.php/api',//设置你调用的接口域名和端口号 别忘了加http
  //                 changeOrigin:true,//这里设置是否跨域
  //                 pathRewrite: {
  //                   '^/api': ''
  //                 }
  //               }
  //           }
  //       }

	},


}
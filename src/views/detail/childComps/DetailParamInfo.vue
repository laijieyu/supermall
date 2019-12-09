<template>
	<div class="param-info">
		<!-- <table v-for="(table, index) in paramInfo.sizes" class="info-size" :key="index">
			<tr v-for="(tr, indey) in table" :key="indey">
				<td v-for="(td, indez) in tr" :key="indez">{{ td }}</td>
			</tr>
		</table> -->
			<div class="info-header">
        <div class="header-title">商品参数</div>
        <div class="header-more">
        <!--  更多 -->
          <!-- <i class="arrow-right"></i> -->
        </div>
      </div>
		<table class="info-param">
			<tr v-for="(item, index) in paramInfo.infos">
				<td class="info-param-key">{{ item.key }}</td>
				<td class="param-value">{{ item.value }}</td>
			</tr>
		</table>

		<!-- <div class="info-img"><img :src="paramInfo[].image" alt="" /></div> -->
	</div>
</template>

<script>
export default {
	name: 'DetailParamInfo',
	data() {
		return {
			paramInfo: {
				infos: [
					{
						key: '产地',
						value: '广东'
					},
					{
						key: '规格',
						value: '500g'
					},
					{
						key: '储存方式',
						value: '冷藏'
					}
				]
			}
		}
	}
};
</script>

<style scoped>
	  .info-header {
	  height: 50px;
	  line-height: 50px;
	  
	}
	
	.header-title {
	  float: left;
	  font-size: 15px;
	}
	
	.header-more {
	  float: right;
	  margin-right: 10px;
	  font-size: 13px;
	}
	
.param-info {
	padding:0 15px 20px 15px;
	font-size: 14px;
	border-bottom: 5px solid #f2f5f8;
}

.param-info table {
	width: 100%;
	border-collapse: collapse;
}

.param-info table tr {
	height: 42px;
}

.param-info table tr td {
	border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.info-param-key {
	/*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
	width: 95px;
}

.info-param {
	border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.param-value {
	color: #eb4868;
}

.info-img img {
	width: 100%;
}
</style>

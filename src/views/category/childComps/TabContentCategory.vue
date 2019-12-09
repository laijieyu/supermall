<template>
  <div>
    <grid-view class="grid" :cols="2" :lineSpace="10" :v-margin="15" :h-margin="5" :itemSpace="2">
			<div class="item" style="width:45%" v-for="(item, index) of subcategories" :key="index">
			  <a>
			    <img class="item-img" :src="item.rough_img" alt="">
			    <div class="item-text">{{item.name}}</div>
			  </a>
			</div>
    </grid-view>
  </div>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'

  export default {
    name: "TabContentCategory",
    components: {
      GridView
    },
    props: {
      subcategories:{
        type:Array,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
	.grid{
		justify-content: space-around;
	}
  .panel img {
    width: 100%;
  }

  .item {
    text-align: center;
    font-size: 12px;
		
  }

  .item-img {
    width: 75%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>

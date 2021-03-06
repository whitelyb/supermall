<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll id="tab-content" 
      :data="[categoryData]"
      ref="scroll" 
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll">
        <div>
          <tab-content-category :subcategories="showSubcategory" @imgLoad="imgLoad"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @itemClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
      <back-top v-show="showBackTop" @click.native="backTop"></back-top>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import BackTop from 'components/content/backtop/BackTop'

  import TabMenu from './childComps/TabMenu'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import {POP, SELL, NEW} from "common/const";
  import {tabControlMixin, backTopMixin, itemListenerMixin} from "common/mixin";

  export default {
		name: "Category",
    components: {
		  NavBar,
      TabControl,
      Scroll,
      BackTop,
      TabMenu,
      TabContentCategory,
      TabContentDetail
    },
    mixins: [tabControlMixin, backTopMixin, itemListenerMixin],
    data() {
		  return {
		    categories: [],
        categoryData: {},
        currentIndex: -1
      }
    },
    created() {
		  // 1.请求分类数据
      this._getCategory()
      
    },

    computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
		  _getCategory() {
		    getCategory().then(res => {
		      // 1.获取分类数据
		      this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this._getSubcategories(index)
      },
      imgLoad() {        
        // 1.使用mixin中的保存的防抖动函数
        this.mixinRefresh(); 
      },
      contentScroll(position) {
        this.showBackTop = (-position.y) > 1000
      }
    }
	}
</script>

<style scoped>
  #category {
    position: relative;
    height: 100vh;
    margin-bottom: 44px;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
    display: flex;
  }
  #tab-content {
    overflow: hidden;
    height: calc(100vh - 49px - 44px);
    flex: 1;
  }
</style>
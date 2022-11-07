<template>
  <div class="main-block-class">
    <el-button @click="init(1000)">init</el-button>

    <div style="overflow-y: auto;">
      <div v-for="(item, index) in dataTempList" @click="showDialog">
        <div v-for="(itemChild, indexChild) in item.list" :key="itemChild.id" style="text-align: center;background: #ddd;color: #FFFFFF;width:52px;height: 40px;line-height: 40px;display: inline-block">
          {{screenWidth}}
        </div>
      </div>
    </div>
<!--    <div style="height: 500px;overflow-y: auto">-->
<!--      <ItemH :source="dataArray" @click="showDialog"></ItemH>-->
<!--    </div>-->

<!--    <div style="width: 100%">-->
<!--      <virtual-list class="list"-->
<!--                    :data-key="'id'"-->
<!--                    :data-sources="dataArray"-->
<!--                    :data-component="itemComponent"-->
<!--                    :estimate-size="52"-->
<!--                    :keeps="30"-->
<!--                    :item-class="'list-item-fixed'"-->
<!--      />-->
<!--    </div>-->

<!--          <virtual-list class="list-horizontal"-->
<!--                        :data-key="'id'"-->
<!--                        :data-sources="dataArray"-->
<!--                        :data-component="itemComponent"-->
<!--                        :estimate-size="52"-->
<!--                        :keeps="100"-->
<!--                        :wrap-class="'wrapper'"-->
<!--                        :item-class="'list-item-horizontal'"-->
<!--          />-->

    <el-drawer
      title="我是外面的 Drawer"
      :visible.sync="drawerTest"
      size="50%">
      <div>
        <span>111</span>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import Item from "./item";
import ItemH from "./itemH";
import VirtualList from 'vue-virtual-scroll-list'

const sizes = [5, 14, 25, 52];
const lists = [10, 50, 100, 1000, 5000, 10000];
export default {
  layout: 'defaultFull',
  components: {Item,VirtualList},
  data(){
    return {
      drawerTest: false,
      dataArray: [],
      dataList: [],
      dataTempList: [],
      itemComponent: ItemH,
      itemComponentV: Item,
      startIndex: 0,
      endIndex: 10,
      scrollTop: 0,
      itemWidth: 52,
      screenWidth: 0,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
  },
  destroyed() {

  },
  beforeMount() {

  },
  computed: {
    dataArrayList() {
      const newDataList = [...Array(this.dataList || 0).keys()].map((v, i) => ({
        brandId: i + 1,
        name: `第${i + 1}项`,
        id: this.dataList[i].id,
        list: this.dataList[i].list
      }));
      return newDataList
    }
  },
  created() {
    this.hh();
  },
  methods:{
    hh() {
      if (process.browser) {
        let screenWidth = window.innerWidth;
        this.screenWidth = screenWidth;
        console.log(this.screenWidth/52);
      }
    },
    init(col){
      this.dataArray = [];
      for (let i = 0; i < 10; i++){
        let list = [];
        let col = (i+1) * 10;
        for (let j = 0; j < col; j++){
          list.push({
            row: i,
            id: j,
            size: sizes[Math.floor(Math.random()*3+1)],
            name: j
          });
        }
        this.dataArray.push({
          id: i,
          name: i,
          size: sizes[Math.floor(Math.random()*3+1)],
          list: list
        });
      }

      this.dataList = [];
      for (let i = 0; i < 10; i++){
        let list = [];
        for (let j = 0; j < col; j++){
          list.push({
            row: i,
            id: j,
            name: j,
            width: this.itemWidth+'px'
          });
        }
        this.dataList.push({
          id: i,
          name: i,
          list: list
        });
      }
      this.visibleList();
    },
    showDialog(){
      this.drawerTest = true;
    },
    visibleList() {
      this.dataTempList = [];
      for (let i = 0; i < this.dataList.length; i++){
        this.dataTempList.push({
          id: i,
          name: i,
          list: this.dataList[i].list.slice(this.startIndex, this.endIndex)
        });
      }
      //console.log(this.dataTempList);
    },
    handleScroll(e) {
      //const scrollTop = e.target.scrollLeft
      const scrollTop = document.documentElement.scrollLeft || document.body.scrollLeft;
      this.scrollTop = scrollTop;
      this.startIndex = Math.floor(scrollTop / this.itemWidth);
      this.endIndex = this.startIndex + 10;

      console.log(this.scrollTop, this.startIndex, this.endIndex);
      //this.visibleList();
    }
  }
}
</script>

<style scoped>

</style>

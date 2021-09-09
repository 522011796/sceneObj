<template>
  <div>
    <div id="guide-v" class="guide guide-v" @mousedown="mousedown"></div>
    <div class="demoRuleClass" :style="{'width': ruleMax * 70+'px'}">
      <div>
        <div class="demoRuleFixedClass" :style="{'width': ruleMax * 70+'px', 'left': -scrollLeft+0 + 'px'}">
          <div v-for="(itemNum, indexNum) in ruleMax" :key="indexNum" class="rule-class">
            <div class="num">
              {{format(indexNum)}}
            </div>
            <div class="ver-line"></div>
          </div>
        </div>
        <!--<el-slider v-model="sliderValue"></el-slider>-->
      </div>

      <div class="demoRuleContentClass" :style="divStyle" ref="wrapper" @scroll="handleScrollTop">
        <div v-for="(item, index) in dataList" style="margin-bottom: 10px">
          <div class="demoRuleChildClass" v-for="(itemBlock, indexBlock) in item.list" :style="{'background': indexBlock % 2 == 0 ? '#00f' : '#f00', 'width': itemBlock.sec * 70+'px', 'height':'40px'}" @click="selBlock($event, item, index, itemBlock, indexBlock)">
            <el-popover
              popper-class="indexPopVisible"
              v-model="itemBlock.popVisible"
              placement="bottom"
              trigger="manual">
              <div>
                {{itemBlock.sec}}
              </div>
              <div style="height: 100%; width: 100%" slot="reference">
                {{itemBlock.sec}}
              </div>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from '/mixins/mixins';
export default {
  mixins: [mixins],
  data(){
    return {
      popvisible: false,
      sliderValue: 0,
      dataList:[],
      ruleList: [],
      ruleCount: 0,
      ruleMax: 0,
      scrollLeft: 0,
      scrollTop: 0,
      screenOrientation: 'portrait',
      appType: 'app',
      paddingBottom: '0px',
      paddingMainBottom: '0px',
      dialogHeight: '50%',
      divStyle: {
        'height': '0px',
        'overflow-y': 'auto',
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
    // 监听窗口大小
    window.addEventListener( 'resize', () => (this.checkIndexOrient())
    )

    this.init();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
  },
  beforeMount() {
    window.addEventListener('orientationchange', (e) => {
      this.checkIndexOrient();
    });
  },
  created() {
    this.checkIndexOrient();
  },
  methods:{
    init(){
      this.dataList = [];
      this.ruleList = [];
      for (let i = 0; i < 3; i++){
        let dataObj = {
          name: i,
          list: []
        };
        this.ruleCount = 0;
        for (let j = 0; j < 30; j++){
          let aNumber = (5 - 1) * Math.random() + 1;
          let result = Math.floor(aNumber);
          this.ruleCount += result;
          dataObj.list.push({
            sec: result,
            popVisible: false
          });
        }
        this.ruleList.push(this.ruleCount);
        this.dataList.push(dataObj);
      }
      let ruleMax = Math.max(...this.ruleList);
      this.ruleMax = ruleMax;
      //this.handleScrollTop()
    },
    format(seconds) {
      let hour = Math.floor(seconds / 3600) >= 10 ? Math.floor(seconds / 3600) : '0' + Math.floor(seconds / 3600);
      seconds -= 3600 * hour;
      let min = Math.floor(seconds / 60) >= 10 ? Math.floor(seconds / 60) : '0' + Math.floor(seconds / 60);
      seconds -= 60 * min;
      let sec = seconds >= 10 ? seconds : '0' + seconds;
      return hour + ':' + min + ':' + sec;
    },
    hhIndex(){
      if (process.browser) {
        //this.divStyle.height = window.innerHeight-40-60 + 'px';
        this.$set(this.divStyle,'height', window.innerHeight-40-60 + 'px');
      }
    },
    checkIndexOrient() {
      if (process.browser) {
        if (window.orientation == 0 || window.orientation == 180){
          this.screenOrientation = 'portrait';
          this.dialogHeight = '50%';
          this.paddingBottom = this.appType == 'app' ? '84px' : '0px';
          this.appType == 'app' ? this.paddingMainBottom = '104px' : this.paddingMainBottom = '0px';
        }
        else if (window.orientation == 90 || window.orientation == -90){
          this.screenOrientation = 'landscape';
          this.dialogHeight = '80%';
          this.paddingBottom = this.appType == 'app' ? '35px' : '0px';
          this.appType == 'app' ? this.paddingMainBottom = '55px' : this.paddingMainBottom = '0px';
        }
        this.hhIndex();
        return this.screenOrientation;
      }
    },
    handleScroll() {
      this.scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      this.hidePopVisible();
    },
    handleScrollTop(){
      this.changeFlag(true);
      if (this.minxinsScroll) {
        this.$parent.$parent.$refs.menuRef.scrollTop = this.$refs.wrapper.scrollTop;
      }
      this.hidePopVisible();
    },
    selBlock(event, item, index, itemBlock, indexBlock){
      //console.log(index, indexBlock);
      for (let i = 0; i < this.dataList.length; i++){
        for (let j = 0; j < this.dataList[i].list.length; j++){
          this.dataList[i].list[j].popVisible = false;
          if (i == index && indexBlock == j){
            this.dataList[i].list[j].popVisible = true;
          }
        }
      }
    },
    mousedown(){
      console.log(111);
    },
    hidePopVisible(){
      for (let i = 0; i < this.dataList.length; i++){
        for (let j = 0; j < this.dataList[i].list.length; j++){
          this.dataList[i].list[j].popVisible = false;
        }
      }
    }
  }
}
</script>

<style scoped>
  .demoRuleClass{
    padding: 0px 0px;
    overflow-x: auto;
  }
  .demoRuleFixedClass{
    position: relative;
    top:0px;
    z-index:1;
    height: 40px;
    padding:0px 0px;
  }
  .demoRuleContentClass{
    position: relative;
    margin-top: 0px;
  }
  .drawer-bottom .el-drawer__body{
    padding: 0px 20px 0px 20px;
  }
  .demoRuleChildClass{
    display: inline-block;
    min-width: 70px;
    height: 45px;
  }
  .rule-class {
    min-width: 70px;
    height: 30px;
    display: inline-block;
  }
  .ver-line{
    height: 20px;
    width: 1px;
    background: #dddddd;
    position: relative;
    bottom: 0px;
  }
  .num{
    font-size: 12px;
  }
  .demoRuleChildClass:hover{
    box-shadow: 0px 0px 10px #000000;
  }
  .guide{
    display: none;
    position: absolute;
    left: 1px;
    top: 0;
    z-index: 30;
  }
  .guide-v{
    border-left: 1px dashed #825723;
    height: 100%;
  }
</style>

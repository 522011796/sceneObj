<template>
  <div @click="hidePopVisible">
    <div id="guide-v" class="guide guide-v" @mousedown="mousedown"></div>
    <div class="demoRuleClass" :style="{'width': ruleMax * 70 + 25 + 'px'}">
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
          <div class="demoRuleChildClass" v-for="(itemBlock, indexBlock) in item.list" :style="{'background': indexBlock % 2 == 0 ? '#00f' : '#f00', 'width': itemBlock.sec * 70+'px', 'height':'40px'}" @click.stop="selBlock($event, item, index, itemBlock, indexBlock)">
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
          <span class="index-plus-item">
            <i class="fa fa-plus font-size-14" @click.stop="setSence($event, item, index)"></i>
          </span>
        </div>
      </div>
    </div>

    <!--场景框-->
    <el-drawer
      title="场景设置"
      custom-class="drawer-bottom"
      :show-close="false"
      :modal="true"
      :size="dialogHeight"
      :wrapperClosable="false"
      :visible.sync="drawer"
      :direction="direction"
      :style="{'width': screenOrientation == 'landscape' ? '90% !important' : '100% !important', 'margin': '0px auto'}">

      <div slot="title">
        <div class="drawerHeader">
          <el-row>
            <el-col :span="4">
              <div class="drawerHeaderDiv">
                <a href="javascript:;" class="drawerHeaderBtn error-color" @click="cancelDrawer">关闭</a>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="drawerHeaderDiv">
                {{$t("场景设置")}}
              </div>
            </el-col>
            <el-col :span="4">
              <div class="drawerHeaderDiv">
                <a href="javascript:;" class="drawerHeaderBtn primary-color" @click="okConfirm">确定</a>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="drawerHeaderContent" :style="{'padding-bottom': paddingBottom}">
        <el-form class="netmoon-form-dialog" label-width="90px" ref="formPlain" :model="formPlain">
          <el-form-item label="场景名称" v-model="formPlain.name">
            <el-input :placeholder="$t('请输入任务名称')" v-model="formPlain.name"></el-input>
          </el-form-item>
          <el-form-item label="控制房间">
            <div class="textRight color-666666" @click="addDialog($event, 'room')">
              <label>{{formPlain.room == '' ? $t("请选择") : formPlain.room}}</label>
              <label><i class="fa fa-chevron-right"></i></label>
            </div>
          </el-form-item>
          <el-form-item label="自定义图标">
            <div class="textRight color-666666" @click="addDialog($event, 'icon')">
              <label>{{formPlain.icon == '' ? $t("请选择") : formPlain.icon}}</label>
              <label><i class="fa fa-chevron-right"></i></label>
            </div>
          </el-form-item>
          <el-form-item label="选择模版">
            <div class="textRight color-666666" @click="addDialog($event, 'template')">
              <label>{{formPlain.template == '' ? $t("请选择") : formPlain.template}}</label>
              <label><i class="fa fa-chevron-right"></i></label>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <!--房间列表-->
    <el-drawer
      custom-class="drawer-right-bottom"
      title="我是标题"
      :size="drawerRightWidth"
      :show-close="false"
      :visible.sync="drawerDevice"
      :direction="directionDevice"
      @closed="closeDrawer">
      <div class="drawerRightHeader" slot="title">
        <el-row>
          <el-col :span="4">
            <div class="drawerHeaderDiv">
              &nbsp;
            </div>
          </el-col>
          <el-col :span="16">
            <div class="drawerHeaderDiv">
              <span v-if="setType == 'room'">{{$t("房间列表")}}</span>
              <span v-if="setType == 'icon'">{{$t("图标列表")}}</span>
              <span v-if="setType == 'template'">{{$t("模版列表")}}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="drawerHeaderDiv">
              <a href="javascript:;" class="drawerHeaderBtn primary-color" @click="cancelDeviceDrawer">关闭</a>
            </div>
          </el-col>
        </el-row>
      </div>
      <div :class="setType == 'template' ? '' : 'marginTop20'">
        <div class="rightDialogTab" v-if="setType == 'template'">
          <el-row>
            <el-col :span="24">
              <div>
                <el-button-group>
                  <el-button size="mini" @click="selTemplate($event, 1)" :type="templateType == '1' ? 'primary' : ''">{{$t("光效墙模板")}}</el-button>
                  <el-button size="mini" @click="selTemplate($event, 2)" :type="templateType == '2' ? 'primary' : ''">{{$t("自定义编程")}}</el-button>
                </el-button-group>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="rightDialogContent" v-if="setType != 'template'" :style="dialogRightTabStyle">
          <div>
            <el-row :gutter="8">
              <template v-if="setType == 'room'">
                <el-col :span="8" v-for="n in 30" :key="n">
                  <div class="item-block">
                    <div class="textCenter">
                      <img src="~/static/img/light.png" class="item-icon"/>
                    </div>
                    <div class="textCenter index-item-title">
                      <label>room</label>
                    </div>
                  </div>
                </el-col>
              </template>

              <template v-if="setType == 'icon'">
                <el-col :span="8" v-for="n in 30" :key="n">
                  <div class="item-block">
                    <div class="textCenter">
                      <img src="~/static/img/light.png" class="item-icon"/>
                    </div>
                    <div class="textCenter index-item-title">
                      <label>icon</label>
                    </div>
                  </div>
                </el-col>
              </template>

            </el-row>
          </div>
        </div>

        <!--模板-->
        <div v-if="setType == 'template'">
          <div v-if="templateType == '1'">
            <div class="rightDialogContent">
              <el-form label-width="80px" ref="formPlain" :model="formPlain">
                <el-form-item label="场景名称" class="netmoon-form-item-dialog">
                  <div class="textRight padding-right5">
                    <el-input :placeholder="$t('请输入任务名称')" v-model="formPlain.name"></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="控制房间" class="netmoon-form-item-dialog">
                  <div class="textRight padding-right5" @click="addChildDialog($event, 'room')">
                    <label>{{formTemplate.room == '' ? $t("请选择") : formTemplate.room}}</label>
                    <label><i class="fa fa-chevron-right"></i></label>
                  </div>
                </el-form-item>
                <el-form-item label="变化速度" class="netmoon-form-item-dialog">
                  <div class="textRight padding-right5" @click="addChildBottomDialog($event, 'change')">
                    <label>{{formTemplate.change == '' ? $t("请选择") : formTemplate.change}}</label>
                    <label><i class="fa fa-chevron-right"></i></label>
                  </div>
                </el-form-item>
                <el-form-item label="执行次数" class="netmoon-form-item-border-dialog">
                  <div class="textRight padding-right5">
                    <el-row>
                      <el-col :span="8">
                        <div class="textLeft">
                          <label class="color-bbbbbb font-size-12">({{$t("0表示无限重复")}})</label>
                        </div>
                      </el-col>
                      <el-col :span="16">
                        <el-input-number size="mini" v-model="formTemplate.setNum" @change="handleChange($event, 'setNum')" :min="0"></el-input-number>
                      </el-col>
                    </el-row>
                  </div>
                </el-form-item>
                <el-form-item label="重复间隔" class="netmoon-form-item-border-dialog">
                  <div class="textRight padding-right5">
                    <el-input-number size="mini" v-model="formTemplate.loop" @change="handleChange($event, 'loop')" :min="0"></el-input-number>
                  </div>
                </el-form-item>
              </el-form>
            </div>

            <div class="marginTop20" style="margin-bottom: 10px">
              <div>
                <label class="color-666666">{{$t("灯具列表")}}</label>
              </div>
              <div class="rightDialogContent marginTop10">
                <div class="item-list-child" v-for="n in 2" :key="n">
                  <el-row>
                    <el-col :span="18">
                      <span>1</span>
                      <span class="marginLeft10">xxxx | xxxx</span>
                    </el-col>
                    <el-col :span="6">
                      <div class="textRight">
                        <i class="fa fa-arrow-down"></i>
                        <i class="fa fa-arrow-up marginLeft10"></i>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>

          <div v-if="templateType == '2'">
            <div class="rightDialogContent">
              <el-form class="netmoon-form-dialog" label-width="80px" ref="formPlain" :model="formPlain">
                <el-form-item label="场景名称" v-model="formPlain.name">
                  <div class="textRight padding-right5">
                    <el-input :placeholder="$t('请输入任务名称')" v-model="formPlain.name"></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="控制房间">
                  <div class="textRight padding-right5" @click="addChildDialog($event, 'room')">
                    <label>{{formPlain.room == '' ? $t("请选择") : formPlain.room}}</label>
                    <label><i class="fa fa-chevron-right"></i></label>
                  </div>
                </el-form-item>
              </el-form>
            </div>

            <div class="marginTop20" style="margin-bottom: 10px">
              <div>
                <label class="color-666666">{{$t("灯具列表")}}</label>
              </div>
              <div class="rightDialogContent marginTop10">
                <div class="item-list-child" v-for="n in 2" :key="n">
                  <el-row>
                    <el-col :span="18">
                      <span>1</span>
                      <span class="marginLeft10">xxxx | xxxx</span>
                    </el-col>
                    <el-col :span="6">
                      <div class="textRight">
                        <i class="fa fa-arrow-down"></i>
                        <i class="fa fa-arrow-up marginLeft10"></i>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--模版操作-->
        <el-drawer
          custom-class="drawer-right-bottom"
          title="我是标题"
          :size="drawerRightChildWidth"
          :append-to-body="true"
          :show-close="false"
          :visible.sync="drawerChild"
          :direction="directionDevice"
          @closed="closeChildDrawer">
          <div class="drawerRightHeader" slot="title">
            <el-row>
              <el-col :span="4">
                <div class="drawerHeaderDiv">
                  &nbsp;
                </div>
              </el-col>
              <el-col :span="16">
                <div class="drawerHeaderDiv">
                  <span v-if="setChildType == 'room'">{{$t("房间列表")}}</span>
                  <span v-if="setChildType == 'icon'">{{$t("图标列表")}}</span>
                  <span v-if="setChildType == 'template'">{{$t("模版列表")}}</span>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="drawerHeaderDiv">
                  <a href="javascript:;" class="drawerHeaderBtn primary-color" @click="cancelChildDrawer">关闭</a>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="marginTop20">
            <div class="rightDialogContent" :style="dialogRightChildTabStyle">
              <el-row :gutter="8">
                <el-col :span="8" v-for="n in 30" :key="n">
                  <div class="item-block">
                    <div class="textCenter">
                      <img src="~/static/img/light.png" class="item-icon"/>
                    </div>
                    <div class="textCenter index-item-title">
                      <label>room</label>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-drawer>

        <!--底部弹出-->
        <div class="mask" v-show="drawerBottomDialogVisible" @click="cancelChildBottomDrawer"></div>
        <transition :name="screenOrientation == 'landscape' ? 'myboxV' : 'mybox'">
          <div :class="screenOrientation == 'landscape' ? 'drawerBottomDialogV' : 'drawerBottomDialog'" class="share" v-show="drawerBottomDialogVisible"
               :style="{
            'width': (screenOrientation == 'landscape' && appType == 'app') ? '90% !important' : '100% !important',
            'margin-left': (screenOrientation == 'landscape' && appType == 'app') ? '5% !important' : ''
          }">
            <div>
              <div class="drawerHeader header">
                <el-row>
                  <el-col :span="4">
                    <div class="drawerHeaderDiv">
                      <a href="javascript:;" class="drawerHeaderBtn error-color" @click="cancelChildBottomDrawer">关闭</a>
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div class="drawerHeaderDiv">
                      {{$t("场景设置")}}
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="drawerHeaderDiv">
                      <a href="javascript:;" class="drawerHeaderBtn primary-color" @click="okConfirm">确定</a>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="drawerBottomDialogContent" :style="drawerBottomDialogStyle">
                <div class="item-list-child" v-for="(item, index) in 5">
                  <el-row>
                    <el-col :span="20">
                      <span>{{$t("速度")}}+{{5-index}}</span>
                    </el-col>
                    <el-col :span="4">

                    </el-col>
                  </el-row>
                </div>
                <div class="item-list-child">
                  <el-row>
                    <el-col :span="20">
                      <span>{{$t("默认速度")}}</span>
                    </el-col>
                    <el-col :span="4">

                    </el-col>
                  </el-row>
                </div>
                <div class="item-list-child" v-for="(item, index) in 5">
                  <el-row>
                    <el-col :span="20">
                      <span>{{$t("速度")}}-{{index+1}}</span>
                    </el-col>
                    <el-col :span="4">

                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </el-drawer>
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
      drawer: false,
      drawerDevice: false,
      dialogVisible: false,
      drawerChild: false,
      drawerChildBottom: false,
      drawerBottomDialogVisible: false,
      dialogHeight: '50%',
      drawerRightWidth: '90%',
      drawerRightChildWidth: '90%',
      direction: 'btt',
      directionDevice: 'rtl',
      screenArrow: '',
      setType: '',
      setChildType: '',
      setChildBottomType: '',
      templateType: '1',
      repetLoop: '无限重复',
      divStyle: {
        'height': '0px',
        'overflow-y': 'auto',
      },
      dialogRightTabStyle:{
        'height': '0px',
        'overflow-y': 'auto',
      },
      dialogRightChildTabStyle: {
        'height': '0px',
        'overflow-y': 'auto',
      },
      drawerBottomDialogStyle: {
        'height': '0px',
        'overflow-y': 'auto',
      },
      formPlain: {
        name: '',
        room: '',
        icon: '',
        template: ''
      },
      formTemplate: {
        name: '',
        room: '',
        change: '',
        setNum: 0,
        loop: 0
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
    // 监听窗口大小
    window.addEventListener( 'resize', () => (this.checkIndexOrient())
    );

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
    this.appType = this.$route.query.appType;
    this.appType == 'app' ? this.paddingMainBottom = '104px' : this.paddingMainBottom = '0px';
    this.appType == 'app' ? this.paddingBottom = '84px' : this.paddingBottom = '0px';
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
    hhIndex(type){
      if (process.browser) {
        //this.divStyle.height = window.innerHeight-40-60 + 'px';
        let height = this.setType == 'template' ? window.innerHeight-45-60-30 : window.innerHeight-45-60;
        let heightChild = window.innerHeight-45-60;
        let heightBottomChild = type == 'landscape' ? window.innerHeight * 0.7-45 : window.innerHeight * 0.5-45;
        this.$set(this.divStyle,'height', window.innerHeight-40-60 + 'px');
        this.$set(this.dialogRightTabStyle,'height', height + 'px');
        this.$set(this.dialogRightChildTabStyle,'height', heightChild + 'px');
        this.$set(this.drawerBottomDialogStyle,'height', heightBottomChild + 'px');
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
        this.hhIndex(this.screenOrientation);
        this.setDialogWidth(this.setType);
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
    setDialogWidth(type){
      let screenWidth = window.innerWidth;
      if (this.appType == 'app'){
        if (type == 'template'){
          this.drawerRightWidth = '100%';
        }else {
          this.drawerRightWidth = '90%';
        }
        this.drawerRightChildWidth = '90%';
      }else {
        if (screenWidth < 550){
          if (type == 'template'){
            this.drawerRightWidth = '100%';
          }else {
            this.drawerRightWidth = '90%';
          }
          this.drawerRightChildWidth = '90%';
        }else{
          if (type == 'template'){
            this.drawerRightWidth = '60%';
          }else {
            this.drawerRightWidth = '60%';
          }
          this.drawerRightChildWidth = '50%';
        }
      }
    },
    selBlock(event, item, index, itemBlock, indexBlock){
      //console.log(index, indexBlock);
      this.drawer = true;
      for (let i = 0; i < this.dataList.length; i++){
        for (let j = 0; j < this.dataList[i].list.length; j++){
          if (i == index && indexBlock == j){
            this.dataList[i].list[j].popVisible = !this.dataList[i].list[j].popVisible;
          }else {
            this.dataList[i].list[j].popVisible = false;
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
    },
    setSence(event, item, index){
      this.drawer = true;
    },
    okConfirm(){
      this.dialogVisible = true;
    },
    addPlain(){
      this.drawer = true;
    },
    cancelDrawer(){
      this.drawer = false;
    },
    cancelDeviceDrawer(){
      this.drawerDevice = false;
    },
    cancelChildDrawer(){
      this.drawerChild = false;
    },
    cancelChildBottomDrawer(){
      this.drawerBottomDialogVisible = false;
    },
    addDialog(event, type){
      this.drawerDevice = true;
      this.setType = type;
      this.setDialogWidth(type);
      this.hhIndex();
    },
    addChildDialog(event, type){
      this.drawerChild = true;
      this.setChildType = type;
      this.hhIndex();
    },
    addChildBottomDialog(event, type){
      //this.drawerChildBottom = true;
      this.setChildBottomType = type;
      this.drawerBottomDialogVisible = true;
    },
    selTemplate(event, type){
      this.templateType = type;
    },
    closeDrawer(){
      this.templateType = 1;
      this.drawerBottomDialogVisible = false;
      this.setDialogWidth(this.setType);
    },
    closeChildDrawer(){
    },
    handleChange(data, type){
      if (type == 'setNum'){
        this.formTemplate.setNum = data;
      }else if (type == 'loop'){
        this.formTemplate.loop = data;
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
  .index-plus-item{
    display: inline-block;
    position: relative;
    top: 12px;
  }
  .item-icon{
    height: 50px;
    width: 50px;
  }
  .item-block{
    background: #eeeeee;
    border-radius: 5px;
    padding:10px;
    margin-bottom: 10px;
  }
  .item-list-child{
    padding:10px 10px;
    border-bottom: 1px solid #f8f8f8;
    color: #666666;
  }
  .drawerBottomDialog .header{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .drawerBottomDialog{
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 50%;
    width: 100%;
    background: #fefefe;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .drawerBottomDialogV .header{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .drawerBottomDialogV{
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 70%;
    width: 100%;
    background: #fefefe;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .drawerBottomDialogContent{
    position: absolute;
    top: 45px;
    left: 0px;
    width: 100%;
  }
  .share{
    z-index: 100;
    transition: bottom .5s ease-in;
  }
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 99;
  }
  /* 给过渡的name加样式 */
  .mybox-leave-active, .mybox-enter-active {
    transition: all 0.4s ease;
  }

  .mybox-leave-active, .mybox-enter {
    height: 0px !important;
  }

  .mybox-leave, .mybox-enter-active {
    height: 50%;
  }

  .myboxV-leave-active, .myboxV-enter-active {
    transition: all 0.4s ease;
  }

  .myboxV-leave-active, .myboxV-enter {
    height: 0px !important;
  }

  .myboxV-leave, .myboxV-enter-active {
    height: 70%;
  }
</style>

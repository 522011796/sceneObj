<template>
    <div>
      <div>
        <div class="layout-main-left" :style="mainStyle" style="position: relative">
          <div class="moon-left-menu-tag">
            <div class="moon-left-menu-tag-container">
              <div class="moon-left-menu-tag_indicator" @click="isCollapse == true ? toggleLeftMenu($event) : toggleRightMenu($event)">
                <i class="fa fa-chevron-left" :class="isCollapse == true ? 'icon-class-left' : 'icon-class-right'"></i>
              </div>
            </div>
          </div>
          <div>
            <div class="layout-menu-header">
              <span v-if="isCollapse == true">{{$t("任务列表")}}</span>
            </div>

            <div :style="menuStyle" ref="menuRef" @scroll="handleDefaultScrollTop">
              <div class="layout-menu-list moon-ellipsis-class" v-for="(item, index) in menuList">
                <div @click="selMenu($event, item, index)" class="moon-ellipsis-class" :class="item.selected == true ? 'menu-active' : ''">
                  <span :class="mainStyle.width == '30px' ? 'index-number-collase-min-class' : 'index-number-collase-max-class'" v-if="isCollapse == false">{{index+1}}</span>
                  <span>
                    <span v-if="isCollapse == true">
                      <img src="~/static/img/light.png" class="layout-menu-icon"/>
                    </span>
                    <span class="layout-menu-title" v-if="isCollapse == true">
                      {{ item.n }}
                    </span>
                  </span>
                </div>
              </div>
              <div class="layout-menu-add" v-show="showMenuAdd == false" :style="showMenuAdd == false ? {'height': '40px','line-height': '40px'} : {'height': '0px','line-height': '0px'}">
                <el-button type="warning" size="mini" icon="el-icon-plus" @click="addPlain">{{$t("添加任务")}}</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="layout-main-right" :style="contentStyle">
          <nuxt ref="childRef"></nuxt>
        </div>
        <div class="clearfix"></div>
      </div>

      <div class="layout-main-footer">
        <div class="layout-main-footer-left" :style="footerLeftStyle">
          <div v-show="showMenuAdd == true">
            <div class="layout-menu-add" :style="showMenuAdd == true ? {'height': '60px','line-height': '60px'} : {'height': '0px','line-height': '0px'}">
              <el-button type="warning" size="mini" icon="el-icon-plus" @click="addPlain">{{$t("添加任务")}}</el-button>
            </div>
          </div>
        </div>
        <div class="layout-main-footer-right" :style="footerRightStyle">
          <el-button size="mini" plain @click="delPlain">{{$t("删除")}}</el-button>
          <el-button size="mini" plain @click="updatePlain">{{$t("修改")}}</el-button>
          <el-button size="mini" plain @click="copyPlain">{{$t("复制")}}</el-button>
<!--          <el-button size="mini" plain @click="changeDevice">{{$t("设备")}}</el-button>-->
        </div>
        <div class="clearfix"></div>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        custom-class="alert-class"
        width="300px"
        @close="closeDialog">
        <div slot="title">
          <div class="alertHeader">
            <div class="alertTitle">
              <span>title</span>
            </div>
          </div>
        </div>
        <div class="alertContent">
          <div>{{alertMessageTips}}</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-row>
            <el-col :span="12">
              <div class="alertFooterClass alertFooterSpanRightBorder">
                <span class="alertFooterSpan" @click="dialogVisible = false">
                  取 消
                </span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="alertFooterClass">
                <span class="alertFooterSpan" @click="dialogVisible = false">
                  确 定
                </span>
              </div>
            </el-col>
          </el-row>
        </span>
      </el-dialog>

      <!--任务框-->
      <el-drawer
        title="任务设置"
        custom-class="drawer-default-bottom"
        :show-close="false"
        :modal="true"
        :size="dialogHeight"
        :wrapperClosable="false"
        :visible.sync="drawer"
        :direction="direction"
        :style="{'width': screenOrientation == 'landscape' ? '100% !important' : '100% !important', 'margin': '0px auto'}">

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
                  {{$t("任务设置")}}
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

        <div class="drawerHeaderContent" :style="{'padding-bottom': paddingBottom, 'padding-left': paddingLR, 'padding-right': paddingLR}">
          <el-form class="netmoon-form-dialog" label-width="70px" ref="formPlain" :model="formPlain">
            <el-form-item label="任务类型">
              <div class="textRight color-666666">
                <el-popover
                  placement="left"
                  width="100"
                  popper-class="pop-custom"
                  trigger="click"
                  v-model="customPlainVisible">
                  <div class="textCenter">
                    <div class="index-pop-item" @click="changePlainType($event, 1)">
                      <span>{{$t("灯")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changePlainType($event, 2)">
                      <span>{{$t("开关")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changePlainType($event, 3)">
                      <span>{{$t("窗帘")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changePlainType($event, 4)">
                      <span>{{$t("音乐")}}</span>
                    </div>
                  </div>
                  <span slot="reference" size="mini">
                    <label>{{formPlain.type == '' ? $t("请选择") : formPlain.type}}</label>
                    <label><i class="fa fa-chevron-right"></i></label>
                  </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item label="任务名称" v-model="formPlain.name">
              <el-input :placeholder="$t('请输入任务名称')" v-model="formPlain.name"></el-input>
            </el-form-item>
            <el-form-item label="添加设备">
              <el-row>
                <el-col :span="24">
                  <div class="textRight color-666666">
                    <label>({{$t("已选择")}}0{{$t("台设备")}})</label>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>

          <div class="color-666666 block-plane" :style="drawerTreeStyle">
            <el-tree
              :data="dataDeviceList"
              show-checkbox>
            </el-tree>
          </div>
        </div>
      </el-drawer>

      <!--设备列表-->
      <el-drawer
        custom-class="drawer-right-bottom"
        title="我是标题"
        size="90%"
        :show-close="false"
        :visible.sync="drawerDevice"
        :direction="directionDevice">
        <div class="drawerRightHeader" slot="title">
          <el-row>
            <el-col :span="4">
              <div class="drawerHeaderDiv">
                <a href="javascript:;" class="drawerHeaderBtn color-success">保存</a>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="drawerHeaderDiv">
                {{$t("设备列表")}}
              </div>
            </el-col>
            <el-col :span="4">
              <div class="drawerHeaderDiv">
                <a href="javascript:;" class="drawerHeaderBtn primary-color" @click="cancelDeviceDrawer">关闭</a>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="rightDialogTab">
          <el-row>
            <el-col :span="18">
              <div>
                <el-button-group>
                  <el-button size="mini">{{$t("单灯")}}</el-button>
                  <el-button size="mini">{{$t("灯组")}}</el-button>
                  <el-button size="mini">{{$t("开关")}}</el-button>
                  <el-button size="mini">{{$t("窗帘")}}</el-button>
                </el-button-group>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="textRight">
                <el-popover
                  placement="top"
                  width="100"
                  popper-class="pop-custom"
                  trigger="click">
                  <div class="textCenter">
                    <div class="index-pop-item" v-for="n in 5">
                      <span>xxxxxxx</span>
                    </div>
                  </div>
                  <el-button slot="reference" size="mini">
                    <span>{{$t("全部房间")}}</span>
                    <i class="fa fa-chevron-down"></i>
                  </el-button>
                </el-popover>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="rightDialogContent" :style="dialogRightTabStyle">
            <div class="rightdialogContentItem" v-for="(item, index) in deviceList" @click="selDevice($event, item)">
              <el-row>
                <el-col :span="18">
                  <div>
                    <label v-if="item._checked" class="checkedICon"><i class="fa fa-check-circle color-success"></i></label>
                    <label v-if="!item._checked" class="checkedICon"><i class="fa fa-circle-o color-default"></i></label>
                    <span>
                      <img src="~/static/img/light.png" class="item-icon"/>
                    </span>
                    <span class="index-item-title">
                      <label>xxxxxxx</label>
                    </span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="textRight index-item-room">
                    <label>xxxxxx</label>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
</template>

<script>
    import mixins from "/mixins/mixins";
    import {MessageSuccess, MessageWarning} from "../utils/utils";
    export default {
      name: "default",
      mixins: [mixins],
      data(){
        return {
          menuToggle: true,
          isCollapse: true,
          scrollTop: 0,
          screenOrientation: 'portrait',
          appType: 'app',
          paddingBottom: '0px',
          paddingMainBottom: '0px',
          paddingLR: '0px',
          dialogHeight: '100%',
          menuList: [],
          deviceList: [],
          customPlainVisible: false,
          showMenuAdd: false,
          dialogVisible: false,
          drawer: false,
          drawerDevice: false,
          direction: 'btt',
          directionDevice: 'rtl',
          selMenuData: '',
          alertMessageTips: '',
          customPlainType: '',
          test: '',
          taskList: [],
          planList:[],
          dataDeviceGroup: [],
          formPlain: {
            type: '',
            name: '',
            deviceList: []
          },
          contentStyle:{
            'height': '0px',
            'overflow-y': 'auto',
            'margin-left': '100px'
          },
          mainStyle: {
            'width': '100px'
          },
          menuStyle: {
            'height': '0px',
            'overflow-y': 'auto',
          },
          footerLeftStyle:{
            'height': '0px',
            'width': '100px',
          },
          footerRightStyle:{
            'height': '0px',
            'margin-left': '100px'
          },
          dialogRightTabStyle:{
            'height': '0px',
            'overflow-y': 'auto',
          },
          drawerTreeStyle: {
            'height': '0px',
            'overflow-y': 'auto',
          }
        }
      },
      mounted() {
       //window.addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
        // 监听窗口大小
        window.onresize = () => {
          this.checkOrient();
        };
        //this.initMenu();
      },
      beforeMount() {
        window.addEventListener('orientationchange', (e) => {
          this.checkOrient();
        })
      },
      destroyed() {
        //window.removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
      },
      created() {
        this.appType == 'app' ? this.paddingMainBottom = '104px' : this.paddingMainBottom = '0px';
        this.appType == 'app' ? this.paddingBottom = '84px' : this.paddingBottom = '0px';
        this.appType == 'app' ? this.paddingLR = '10px' : this.paddingLR = '10px';
        this.checkOrient();
        this.initDevice();
      },
      methods:{
        hh(){
          if (process.browser) {
            let screenWidth = window.innerWidth;
            this.contentStyle.height = window.innerHeight-60 + 'px';
            this.appType = this.$route.query.appType;
            if (this.appType == 'app'){
              if (screenWidth < 550){
                this.mainStyle.width = this.isCollapse == false ? '30px' : '100px';
                this.footerLeftStyle.width = '100px';
                this.contentStyle["margin-left"] = this.isCollapse == false ? '30px' : '105px';
                this.footerRightStyle["margin-left"] = '105px';
              }else{
                this.mainStyle.width = this.isCollapse == false ? '8%' : '15%';
                this.footerLeftStyle.width = '15%';
                this.contentStyle["margin-left"] = this.isCollapse == false ? '8.5%' :'15.5%';
                this.footerRightStyle["margin-left"] = '15.5%';
              }
            }else {
              if (screenWidth < 550){
                this.mainStyle.width = this.isCollapse == false ? '30px' : '100px';
                this.footerLeftStyle.width = '100px';
                this.contentStyle["margin-left"] = this.isCollapse == false ? '30px' : '105px';
                this.footerRightStyle["margin-left"] = '105px';
              }else{
                this.mainStyle.width = this.isCollapse == false ? '8%' : '15%';
                this.footerLeftStyle.width = '15%';
                this.contentStyle["margin-left"] = this.isCollapse == false ? '8.5%' :'15.5%';
                this.footerRightStyle["margin-left"] = '15.5%';
              }
            }
            this.menuStyle.height = window.innerHeight-40-60 + 'px';
            this.drawerTreeStyle.height = window.innerHeight-40-160 + 'px';
            this.$set(this.dialogRightTabStyle,'height', window.innerHeight-45-60-30 + 'px');
            this.test = window.innerHeight;
          }
        },
        initMenu(menuList){
          this.menuList = [];
          let menuListTemp = [];
          for (let i = 0; i < menuList.length; i++){
            //menuList[i]['selected'] = false;
            menuListTemp.push({
              selected: false,
              n: menuList[i].n,
              t: menuList[i].t,
              d: menuList[i].d
            });
          }

          this.menuList = menuListTemp;

          this.setMenuAdd();
          //this.handleDefaultScrollTop();
        },
        setMenuAdd(){
          let menuListCount = this.menuList.length;
          if (process.browser) {
            let menuHeight = window.innerHeight - 60 - 40;
            this.showMenuAdd = false;
            if (menuListCount * 40 + 40 >= menuHeight){
              this.showMenuAdd = true;
            }
          }
        },
        initDevice(){
          this.deviceList = [];
          for (let i = 0; i < 20; i++){
            this.deviceList.push({
              _checked: false,
              name: i
            });
          }
        },
        toggleLeftMenu(event){
          this.showMenuAdd = true;
          this.isCollapse = false;
          this.menuToggle = false;
          this.contentStyle["margin-left"] = "0px";
          this.mainStyle.width = "0px";
          //this.toggleTag['left'] = "0px";
          this.hh();
        },
        toggleRightMenu(event){
          //this.showMenuAdd = false;
          this.isCollapse = true;
          this.menuToggle = true;
          this.contentStyle["margin-left"] = "100px";
          this.mainStyle.width = "100px";
          //this.toggleTag['left'] = "220px";
          this.hh();
          this.setMenuAdd();
        },
        selMenu(event, item, index){
          this.selMenuData = item.n;
          for (let i = 0; i < this.menuList.length; i++){
            this.menuList[i].selected = false;
            this.$set(this.menuList[i],'selected', false);
            if (i == index) {
              this.menuList[i].selected = true;
              this.$set(this.menuList[i],'selected', true);
            }
          }
        },
        checkOrient() {
          if (process.browser) {
            if (window.orientation == 0 || window.orientation == 180){
              this.screenOrientation = 'portrait';
              this.dialogHeight = '100%';
              this.paddingBottom = this.appType == 'app' ? '84px' : '0px';
              this.paddingLR = this.appType == 'app' ? '10px' : '10px';
              this.appType == 'app' ? this.paddingMainBottom = '104px' : this.paddingMainBottom = '0px';
            }
            else if (window.orientation == 90 || window.orientation == -90){
              this.screenOrientation = 'landscape';
              this.dialogHeight = '100%';
              this.paddingBottom = this.appType == 'app' ? '35px' : '0px';
              this.paddingLR = this.appType == 'app' ? '20px' : '20px';
              this.appType == 'app' ? this.paddingMainBottom = '55px' : this.paddingMainBottom = '0px';
            }
            this.hh();
            return this.screenOrientation;
          }
        },
        handleDefaultScrollTop(){
          this.changeFlag(false);
          if (!this.minxinsScroll) {
            this.$refs.childRef.$children[0].$refs.wrapper.scrollTop = this.$refs.menuRef.scrollTop;
          }
        },
        okConfirm(){
          this.dialogVisible = true;
        },
        addPlain(){
          this.getDeviceList();
          this.drawer = true;
        },
        cancelDrawer(){
          this.drawer = false;
        },
        cancelDeviceDrawer(){
          this.drawerDevice = false;
        },
        closeDialog(){
          //this.selMenuData = "";
        },
        addDevice(){
          this.drawerDevice = true;
        },
        delPlain(){
          if (this.selMenuData == ""){
            MessageWarning(this.$t("请选择需要删除的任务"));
            return;
          }
          this.alertMessageTips = this.$t("确定删除该任务吗？");
          this.dialogVisible = true;
        },
        updatePlain(){
          if (this.selMenuData == ""){
            MessageWarning(this.$t("请选择需要修改的任务"));
            return;
          }
          this.drawer = true;
        },
        copyPlain(){
          if (this.selMenuData == ""){
            MessageWarning(this.$t("请选择需要复制的任务"));
            return;
          }
          MessageSuccess(this.$t("复制任务成功"));
        },
        changeDevice(){
          if (this.selMenuData == ""){
            MessageWarning(this.$t("请选择需要调整设备的任务"));
            return;
          }
          this.drawerDevice = true;
        },
        selDevice(event, item){
          item._checked = !item._checked;
        },
        changePlainType(event, type){
          this.customPlainType = type;
          this.customPlainVisible = false;
          this.formPlain.type = event.target.innerText;
        }
      }
    }
</script>

<style scoped>
.layout-main-left{
  background: #595959;
  float: left;
  width: 100px;
  border-right: 1px solid #454545;
  box-shadow: 2px 0px 4px #454545;
  position: relative;
  background-image: linear-gradient(to bottom, #555555 , #555555);
  position: relative;
  transition: all .2s ease-in-out;
  user-select: none;
}
.layout-main-right{
  background: #595959;
  margin-left: 105px;
  position: relative;
}
.layout-main-footer-left{
  float: left;
  width: 100px;
}
.layout-main-footer-right{
  margin-left: 105px;
}
.layout-main-footer{
  height: 60px;
  line-height: 60px;
  background: #454545;
  text-align: right;
  padding: 0px 25px 0px 0px;
}
.layout-menu-header{
  color: #cccccc;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.layout-menu-list{
  color: #999999;
  text-align: center;
  height: 40px;
  line-height: 40px;
  padding: 0px 5px;
  font-size: 12px;
  margin-bottom: 10px;
  position: relative;
}
.layout-menu-icon{
  width: 18px;
  height: 18px;
  position: relative;
  top: 5px;
}
.layout-menu-title{
  position: relative;
  top: 0px;
}
.layout-menu-add{
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.moon-left-menu-tag{
  position: absolute;
  top: 0;
  bottom: 0;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  right: -15px;
  transition: all .2s ease-in-out;
  z-index: 99;
}
.moon-left-menu-tag .moon-left-menu-tag-container {
  width: 100%;
  height: 100%;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
}
.moon-left-menu-tag .moon-left-menu-tag_indicator {
  margin-top: -44.5px;
  width: 100%;
  height: 30px;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #454545;
  border-radius: 0 4px 4px 0;
  border: 1px solid #454545;
  border-left-color: transparent;
  opacity: 0.85;
  /*transition-property: background-color,opacity;*/
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
  color: #dddddd;
  padding-right: 2px;
}
.moon-left-menu-tag_indicator:hover{
  background-color: #454545;
  color: #FFFFFF;
}
.icon-class-left{
  color: #dddddd;
  transform: rotate(0deg);
}
.icon-class-right{
  transform: rotate(180deg);
}
.index-number-class{
  padding: 0px 4px;
  background: #353535;
  position: absolute;
  left: 0px;
  font-size: 12px;
}
.index-number-collase-max-class{
  padding: 5px 8px;
  background: #353535;
  font-size: 12px;
}
.index-number-collase-min-class{
  padding: 5px 4px;
  background: #353535;
  font-size: 12px;
}
.menu-active{
  background: #825723;
}
.menu-active span{
  background: #825723;
}
.checkedICon{
  font-size: 14px;
  position: relative;
  top: -5px;
  padding: 0px 0px;
  width: 20px;
  height: 20px;
  display: inline-block;
  text-align: center;
}
.block-plane{
  padding: 0px;
  border-radius: 5px;
  border: 1px solid #dddddd;
}
</style>

<template>
    <div class="default-block-class">
      <div>
        <div class="layout-main-left" :style="mainStyle" style="position: relative" @click="hideIndexPop($event)">
          <div class="moon-left-menu-tag">
            <div class="moon-left-menu-tag-container">
              <div class="moon-left-menu-tag_indicator" @click="isCollapse == true ? toggleLeftMenu($event) : toggleRightMenu($event)">
                <i class="fa fa-chevron-left" :class="isCollapse == true ? 'icon-class-left' : 'icon-class-right'"></i>
              </div>
            </div>
          </div>
          <div>
            <div class="layout-menu-header">
              <div v-if="globalDeviceType != 'ios'">
                <span v-if="isCollapse == true" @click="returnSenceList">
                  <i class="fa fa-chevron-left"></i>
                  {{$t("任务列表")}}
                </span>
                  <span v-if="isCollapse == false" @click="returnSenceList">
                  <i class="fa fa-chevron-left"></i>
                </span>
              </div>

              <div v-if="globalDeviceType == 'ios'">
                <span v-if="isCollapse == true">
                  {{$t("任务列表")}}
                </span>
                <span v-if="isCollapse == false">
                  <i class="fa fa-list"></i>
                </span>
              </div>
            </div>

            <div :style="menuStyle" ref="menuRef" @scroll="handleDefaultScrollTop">
              <div class="layout-menu-list moon-ellipsis-class" v-for="(item, index) in menuList">
                <el-popover
                  placement="right"
                  popper-class="pop-menu-custom"
                  trigger="click"
                  v-model="item.visible">
                  <div class="textLeft">
                    <div>
                      <el-button size="mini" type="danger" plain @click.stop="delPlain">{{$t("删除")}}</el-button>
                    </div>
                    <div class="marginTop5">
                      <el-button size="mini" type="warning" plain @click.stop="updatePlain">{{$t("修改")}}</el-button>
                    </div>
                    <div class="marginTop5">
                      <el-button size="mini" type="info" plain @click.stop="copyPlain">{{$t("复制并粘贴")}}</el-button>
                    </div>
                  </div>
                  <span slot="reference" size="mini" class="font-size-12">
                    <div @click="selMenu($event, item, index)" class="moon-ellipsis-class" :class="item.selected == true ? 'menu-active' : ''">
                      <span :class="mainStyle.width == '30px' ? 'index-number-collase-min-class' : 'index-number-collase-max-class'" v-if="isCollapse == false">{{index+1}}</span>
                      <span>
                        <span v-if="isCollapse == true">
                          <img v-if="item.t == 1" src="~/static/img/light.png" class="layout-menu-icon"/>
                          <img v-else-if="item.t == 2" src="~/static/img/switch.png" class="layout-menu-icon"/>
                          <img v-else-if="item.t == 3" src="~/static/img/curtains.png" class="layout-menu-icon"/>
                          <img v-else-if="item.t == 5" src="~/static/img/music.png" class="layout-menu-icon"/>
                          <img v-else-if="item.t == 0" src="~/static/img/sence.png" class="layout-menu-icon"/>
                        </span>
                        <span class="layout-menu-title" v-if="isCollapse == true">
                          {{ item.n }}
                        </span>
                      </span>
                    </div>
                  </span>
                </el-popover>
              </div>
              <div v-if="globalDeviceType != 'ios'" class="layout-menu-add" v-show="showMenuAdd == false" :style="showMenuAdd == false ? {'height': '40px','line-height': '40px'} : {'height': '0px','line-height': '0px'}">
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

      <div class="layout-main-footer" :style="globalDeviceType == 'ios' ? footerAppStyle : footerStyle">
        <div class="layout-main-footer-left" :style="footerLeftStyle">
          <div v-show="showMenuAdd == true">
            <div class="layout-menu-add" :style="showMenuAdd == true ? {'height': '60px','line-height': '60px'} : {'height': '0px','line-height': '0px'}">
              <el-button type="warning" size="mini" icon="el-icon-plus" @click="addPlain">{{$t("添加任务")}}</el-button>
            </div>
          </div>
        </div>
        <div class="layout-main-footer-right" :style="footerRightStyle">
          <el-button v-if="globalDeviceType != 'ios'" :loading="loading" size="mini" type="success" @click="saveConfig()">{{$t("保存")}}</el-button>
<!--          <el-button size="mini" plain @click="delPlain">{{$t("删除")}}</el-button>-->
<!--          <el-button size="mini" plain @click="updatePlain">{{$t("修改")}}</el-button>-->
<!--          <el-button size="mini" plain @click="copyPlain">{{$t("复制并粘贴")}}</el-button>-->
<!--          <el-button size="mini" plain @click="changeDevice">{{$t("设备")}}</el-button>-->
        </div>
        <div class="clearfix"></div>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        custom-class="alert-class"
        top="30vh"
        width="300px"
        @close="closeDelDialog">
        <div slot="title">
          <div class="alertHeader">
            <div class="alertTitle">
              <span>提示</span>
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
                <span class="alertFooterSpan" @click="oprPlain()">
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
        @close="closeDialog"
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
                    <div class="index-pop-item" @click="changePlainType($event, 5)">
                      <span>{{$t("音乐")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changePlainType($event, 0)">
                      <span>{{$t("场景")}}</span>
                    </div>
                  </div>
                  <span class="font-size-12" slot="reference" size="mini">
                    <label>{{formPlain.type === '' ? $t("请选择") : planTypeInfo(formPlain.type)}}</label>
                    <label><i class="fa fa-chevron-right"></i></label>
                  </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item label="任务名称" v-model="formPlain.name">
              <el-input :placeholder="$t('请输入任务名称')" v-model="formPlain.name"></el-input>
            </el-form-item>
            <el-form-item label="添加设备" v-if="formPlain.type !== 0">
              <el-row>
                <el-col :span="24">
                  <div class="textRight color-666666 font-size-12">
                    <label>({{$t("已选择")}}{{formPlain.deviceSelDevice.length}}{{$t("台设备")}})</label>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>

          <div v-if="this.formPlain.type !== 0" class="color-666666 block-plane" :style="drawerTreeStyle">
            <el-tree
              ref="tree"
              node-key="sn"
              :empty-text="$t('暂无数据')"
              :data="dataDeviceList"
              :default-checked-keys="formPlain.deviceSelDevice"
              show-checkbox
              @check="checkDevice"
              @check-change="checkChangeDevice"
              @current-change="checkChangeCurrentDevice">
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
import {MessageCommonTips, MessageSuccess, MessageWarning, planType} from "../utils/utils";
    import mixins from "../mixins/mixins";
    export default {
      name: "default",
      mixins: [mixins],
      data(){
        return {
          oprType: '',
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
          loading: false,
          direction: 'btt',
          directionDevice: 'rtl',
          selMenuData: '',
          selMenuIndex: '',
          alertMessageTips: '',
          customPlainType: '',
          changeStatus: 0,
          test: '',
          taskList: [],
          planList:[],
          dataDeviceGroup: [],
          formPlain: {
            type: '',
            name: '',
            deviceList: [],
            deviceSelDevice: []
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
          footerStyle:{
            'height': '60px',
            'line-height': '60px',
          },
          footerAppStyle:{
            'height': '0px',
            'line-height': '0px',
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
        });
        document.addEventListener('touchstart', function(e) {
          if (e.touches.length > 1) {
            e.preventDefault()
          }
        });
        document.addEventListener('gesturestart', function(e) {
          e.preventDefault()
        });
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
            this.contentStyle.height = this.globalDeviceType == 'ios' ? window.innerHeight + 'px' : window.innerHeight - 60 + 'px';
            this.appType = this.$route.query.appType;
            if (this.appType == 'app'){
              if (screenWidth < 550){
                this.mainStyle.width = this.isCollapse == false ? '30px' : '100px';
                this.footerLeftStyle.width = '100px';
                this.contentStyle["margin-left"] = this.isCollapse == false ? '30px' : '105px';
                this.footerRightStyle["margin-left"] = '105px';
              }else{
                this.mainStyle.width = this.isCollapse == false ? '8%' : '15%';
                this.footerLeftStyle.width = '10%';
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
                this.footerLeftStyle.width = '10%';
                this.contentStyle["margin-left"] = this.isCollapse == false ? '8.5%' :'15.5%';
                this.footerRightStyle["margin-left"] = '15.5%';
              }
            }
            this.menuStyle.height = this.globalDeviceType == 'ios' ? window.innerHeight - 40 + 'px' : window.innerHeight-40-60 + 'px';
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
              visible: false,
              n: menuList[i].n,
              t: menuList[i].t,
              d: menuList[i].d,
              i: menuList[i].i,
            });
          }

          this.menuList = menuListTemp;

          this.setMenuAdd();
          //this.handleDefaultScrollTop();
        },
        hiddenMenuPop(){
          for (let i = 0; i < this.menuList.length; i++){
            this.menuList[i].visible = false;
          }
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
          this.selMenuData = item;
          this.selMenuIndex = index;
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
            this.hiddenMenuPop();
            this.$refs.childRef.$children[0].$refs.wrapper.scrollTop = this.$refs.menuRef.scrollTop;
          }
        },
        okConfirm(){
          if (this.formPlain.type === ""){
            MessageCommonTips(this, this.$t("请设置任务类型"), 'warning');
            return;
          }else if (this.formPlain.name === ""){
            MessageCommonTips(this, this.$t("请设置任务名称"), 'warning');
            return;
          }else if (this.formPlain.type !== 0 && this.formPlain.deviceSelDevice.length == 0){
            MessageCommonTips(this, this.$t("请设置设备"), 'warning');
            return;
          }
          //this.alertMessageTips = this.$t("确认保存该任务？");
          //this.dialogVisible = true;
          this.oprPlain();
        },
        addPlain(){
          this.oprType = "add";
          //this.getDeviceList();
          this.drawer = true;
        },
        cancelDrawer(){
          this.drawer = false;
        },
        cancelDeviceDrawer(){
          this.drawerDevice = false;
        },
        closeDelDialog(){
          //this.selMenuData = "";
          //this.selMenuIndex = "";
        },
        closeDialog(){
          //this.selMenuData = "";
          if (this.formPlain.type !== 0){
            this.$refs.tree.setCheckedKeys([]);
          }
          this.dataDeviceList = [];
          this.formPlain = {
            type: '',
            name: '',
            deviceList: [],
            deviceSelDevice: []
          };
        },
        addDevice(){
          this.drawerDevice = true;
        },
        delPlain(){
          if (this.selMenuData == ""){
            MessageCommonTips(this, this.$t("请选择需要删除的任务"), 'warning');
            return;
          }
          this.oprType = 'del';
          //this.alertMessageTips = this.$t("确定删除该任务吗？");
          //this.dialogVisible = true;
          this.oprPlain();
        },
        updatePlain(){
          if (this.selMenuData == ""){
            MessageCommonTips(this, this.$t("请选择需要修改的任务"), 'warning');
            return;
          }
          this.getDeviceList(this.selMenuData.t);
          this.formPlain = {
            type: this.selMenuData.t,
            name: this.selMenuData.n,
            deviceList: this.dataDeviceList,
            deviceSelDevice: this.selMenuData.d
          }
          this.oprType = 'update';
          //console.log(this.formPlain);
          this.drawer = true;
        },
        copyPlain(){
          if (this.selMenuData == ""){
            MessageCommonTips(this, this.$t("请选择需要复制的任务"), 'warning');
            return;
          }
          //console.log(this.selMenuData);
          this.menuList.push(this.selMenuData);
          //this.initMenu(this.menuList);
          //setSenceData();
          this.$refs.childRef.$children[0].setSenceData(this.menuList);
          MessageCommonTips(this, this.$t("复制任务成功"), 'success');
        },
        changeDevice(){
          if (this.selMenuData == ""){
            MessageCommonTips(this, this.$t("请选择需要调整设备的任务"), 'warning');
            return;
          }
          this.drawerDevice = true;
        },
        selDevice(event, item){
          item._checked = !item._checked;
        },
        planTypeInfo(value){
          return planType('set', value);
        },
        returnSenceList(value){
          console.log(this);
          if (value == 2){
            this.$refs.childRef.$children[0].$refs.sceneIndexRef.drawerTplVisible = false;
            this.$refs.childRef.$children[0].$refs.sceneIndexRef.$refs.tplList.dialogDeviceMoreVisible = false;
            this.$refs.childRef.$children[0].$refs.sceneIndexRef.$refs.tplList.dialogDeviceVisible = false
            return;
          }
          if (value == 100){
            this.saveConfig();
            return;
          }
          if (value == 200){
            this.addPlain();
            return;
          }
          if (value == 300){
            this.$refs.childRef.$children[0].createSence();
            return;
          }
          if (value == 400){
            this.$refs.childRef.$children[0].$refs.sceneIndexRef.selEnvTplList();
            return;
          }
          let planList = this.$refs.childRef.$children[0].planList;
          let planTempList = this.$refs.childRef.$children[0].planList;
          this.changeStatus = 0;
          for (let i = 0; i < planList.length; i++) {
            for (let j = 0; j < planList[i].i.length; j++) {
              if (planList[i].i[j].popVisible != undefined || planList[i].i[j].popVisible != null) {
                planList[i].i[j].popVisible = undefined;
              }
              if (planList[i].i[j].insertVisible != undefined || planList[i].i[j].insertVisible != null) {
                planList[i].i[j].insertVisible = undefined;
              }
              if (planList[i].i[j].secLoop != undefined || planList[i].i[j].secLoop != null) {
                planList[i].i[j].secLoop = undefined;
              }
              if (planList[i].i[j].list != undefined || planList[i].i[j].list != null) {
                planList[i].i[j].list = undefined;
              }
            }
          }
          for (let i = 0; i < planTempList.length; i++) {
            for (let j = 0; j < planTempList[i].i.length; j++) {
              if (planTempList[i].i[j].popVisible != undefined || planTempList[i].i[j].popVisible != null) {
                planTempList[i].i[j].popVisible = undefined;
              }
              if (planTempList[i].i[j].insertVisible != undefined || planTempList[i].i[j].insertVisible != null) {
                planTempList[i].i[j].insertVisible = undefined;
              }
              if (planTempList[i].i[j].secLoop != undefined || planTempList[i].i[j].secLoop != null) {
                planTempList[i].i[j].secLoop = undefined;
              }
              if (planTempList[i].i[j].list != undefined || planTempList[i].i[j].list != null) {
                planTempList[i].i[j].list = undefined;
              }
            }
          }


          if (!this.compareArray(planList, planTempList)){
            this.alertMessageTips = this.$t("系统检测到你修改过数据并未保存，返回后将清除已修改的部分");
            this.oprType = 'return';
            this.dialogVisible = true;
            this.changeStatus = 1;
            return;
          }

          let taskList = this.$refs.childRef.$children[0].taskList;
          let taskTempList = this.$refs.childRef.$children[0].taskTempList;
          for (let i = 0; i < taskList.length; i++){
            for (let j = 0; j < taskList[i].length; j++){
              if (taskList[i][j].popVisible != undefined || taskList[i][j].popVisible != null){
                taskList[i][j].popVisible = undefined;
              }
              if (taskList[i][j].sec){
                taskList[i][j].sec = undefined;
              }
              if (taskList[i][j].secLoop != undefined || taskList[i][j].secLoop){
                taskList[i][j].secLoop = undefined;
              }
              if (taskList[i][j].insertVisible != undefined || taskList[i][j].insertVisible != null){
                taskList[i][j].insertVisible = undefined;
              }
              if (taskList[i][j].list != undefined || taskList[i][j].list != null){
                taskList[i][j].list = undefined;
              }
            }
          }

          for (let i = 0; i < taskTempList.length; i++){
            for (let j = 0; j < taskTempList[i].length; j++){
              if (taskTempList[i][j].popVisible != undefined || taskTempList[i][j].popVisible != null){
                taskTempList[i][j].popVisible = undefined;
              }
              if (taskTempList[i][j].sec){
                taskTempList[i][j].sec = undefined;
              }
              if (taskTempList[i][j].secLoop != undefined || taskTempList[i][j].secLoop){
                taskTempList[i][j].secLoop = undefined;
              }
              if (taskTempList[i][j].insertVisible != undefined || taskTempList[i][j].insertVisible != null){
                taskTempList[i][j].insertVisible = undefined;
              }
              if (taskTempList[i][j].list != undefined || taskTempList[i][j].list != null){
                taskTempList[i][j].list = undefined;
              }
            }
          }

          taskList = JSON.parse(JSON.stringify(taskList));
          taskTempList = JSON.parse(JSON.stringify(taskTempList));

          if (!this.compareArray(taskList, taskTempList)){
            this.alertMessageTips = this.$t("系统检测到你修改过数据并未保存，返回后将清除已修改的部分");
            this.oprType = 'return';
            this.dialogVisible = true;
            this.changeStatus = 1;
            return;
          }

          this.$refs.childRef.$children[0].mainCodeData = {
            id: "",
            room: "",
            name: "",
            icon: "",
            enable: "",
            internal: "",
            duration: "",
          };

          this.$refs.childRef.$children[0].oprType = "";
          this.$refs.childRef.$children[0].editSceneList = "";
          this.$refs.childRef.$children[0].editSceneList = "";
          this.$refs.childRef.$children[0].drawerDevice = false;
          this.$refs.childRef.$children[0].drawerBottomDialogVisible = false;
          this.$refs.childRef.$children[0].drawer = false;
          this.drawer = false;
          this.$refs.childRef.$children[0].formSence = {
            id: '',
            envKey: '',
            name: '',
            iconId: 1,
            internal: true,
            roomId: '',
            sceneId: '',
            sceneName: '',
            sceneType: 1,
            sourceCode: '',
            openSource: true,
            img: ''
          };
          this.selMenuData = "";
          this.$refs.childRef.$children[0].drawerListVisible = true;
        },
        changePlainType(event, type){
          this.customPlainType = type;
          this.customPlainVisible = false;
          this.formPlain.type = type;
          this.formPlain.deviceSelDevice = [];
          this.getDeviceList(this.customPlainType);
        },
        hideIndexPop(event){
          this.$refs.childRef.$children[0].hidePopDocumentVisible(event)
        },
        checkChangeDevice(event){

        },
        checkChangeCurrentDevice(current, node){

        },
        checkDevice(data, checkData){
          let deviceList = [];
          for (let i = 0; i < checkData.checkedNodes.length; i++){
            if (checkData.checkedNodes[i].type == 'device'){
              deviceList.push(checkData.checkedNodes[i].sn);
            }
          }
          this.formPlain.deviceSelDevice = deviceList;
        },
        oprPlain(){
          let planList = this.$refs.childRef.$children[0].planList;
          //console.log(12345678,planList);
          if (this.oprType == "add"){
            let planObj = {
              d: this.formPlain.deviceSelDevice,
              i: [],
              n: this.formPlain.name,
              t: this.formPlain.type,
            };
            planList.push(planObj);
            this.dialogVisible = false;
            this.drawer = false;
            this.$refs.childRef.$children[0].selSence(planList, null, 'save');
          }else if (this.oprType == "del"){
            planList.splice(this.selMenuIndex,1);
            this.drawer = false;
            this.dialogVisible = false;
            this.$refs.childRef.$children[0].selSence(planList, null, 'save');
          }else if (this.oprType == "update"){
            planList[this.selMenuIndex].d = this.formPlain.deviceSelDevice;
            planList[this.selMenuIndex].i = planList[this.selMenuIndex].i;
            planList[this.selMenuIndex].n = this.formPlain.name;
            planList[this.selMenuIndex].t = this.formPlain.type;

            this.drawer = false;
            this.dialogVisible = false;
            this.$refs.childRef.$children[0].selSence(planList, null, 'save');
          }else if(this.oprType == "return"){
            this.$refs.childRef.$children[0].drawerListVisible = true;
            this.setOkConfirm(1);
            this.dialogVisible = false;
          }
        },
        saveConfig(){
          let flag = false;
          let indexRow = 0;
          if (this.$refs.childRef.$children[0].taskList.length == 0){
            MessageCommonTips(this, this.$t("请设置场景中的任务和指令！"), 'warning');
            return;
          }
          for (let i = 0; i < this.$refs.childRef.$children[0].taskList.length; i++){
            if (this.$refs.childRef.$children[0].taskList[i] == undefined || JSON.stringify(this.$refs.childRef.$children[0].taskList[i]) == "[]"){
              flag = true;
              indexRow = i + 1;
              break;
            }
          }
          if (flag == true){
            MessageCommonTips(this, this.$t("场景任务第") + indexRow + this.$t("行指令集为空，请设置！"), 'warning');
            return;
          }
          //console.log(this.$refs.childRef.$children[0].mainCodeData.internal == 1 ? true : false);
          this.$refs.childRef.$children[0].formSence = {
            id: this.$refs.childRef.$children[0].mainCodeData.id,
            envKey: '',
            name: this.$refs.childRef.$children[0].mainCodeData.name,
            iconId:  this.$refs.childRef.$children[0].mainCodeData.icon,
            internal: this.$refs.childRef.$children[0].mainCodeData == "" ? true : this.$refs.childRef.$children[0].mainCodeData.internal == 1 ? true : false,
            roomId: this.$refs.childRef.$children[0].mainCodeData.room,
            sceneId: this.$refs.childRef.$children[0].mainCodeData.id,
            sceneName: this.$refs.childRef.$children[0].mainCodeData.name,
            sceneType: 1,
            sourceCode: '',
            openSource: true,
            img: ''
          };
          //console.log(this.$refs.childRef.$children[0].formSence);
          if (this.$refs.childRef.$children[0].formSence.id != undefined && this.$refs.childRef.$children[0].formSence.id != ''){
            this.loading = true;
            this.$refs.childRef.$children[0].saveConfig();
          }else {
            this.$refs.childRef.$children[0].addSenceOpr();
          }
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
  padding: 0px 20px 0px 0px;
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
  z-index: 9;
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

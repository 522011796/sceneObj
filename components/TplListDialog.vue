<template>
  <div>
    <el-drawer
      title="场景设置"
      custom-class="drawer-list"
      :show-close="true"
      :modal="true"
      size="100%"
      :wrapperClosable="false"
      :visible.sync="drawer_"
      :direction="direction"
      @open="initTplData($event, 2)">

      <div slot="title">
        <div class="block-list-header" style="text-align: center">
          <el-button-group>
            <el-button size="mini" :type="listType == 2 ? 'success' : 'default'" @click="initTplData($event, 2)">我的模版</el-button>
            <el-button size="mini" :type="listType == 1 ? 'success' : 'default'" @click="initTplData($event, 1)">系统模版</el-button>
            <el-button size="mini" :type="listType == 3 ? 'success' : 'default'" @click="initTplData($event, 3)">待接收模版</el-button>
          </el-button-group>
        </div>
      </div>

      <div class="marginTop10">
        <el-empty v-if="data.length == 0" :description="$t('暂无数据')"></el-empty>
        <div v-else v-for="(item, index) in data" class="block-list-content-item marginBottom10" style="position: relative">
          <div v-if="item.authorKey != item.userKey" style="position: absolute;right: 0px;top: 0px;padding:0px;border-radius: 2px">
            <i class="font-size-12 fa fa-handshake-o"></i>
          </div>
          <el-row v-if="listType != 3">
            <el-col :span="6">
              <div class="textLeft">
                <div class="marginTop10 fontBold moon-ellipsis-class">{{ item.tplName }}</div>
                <div class="marginTop5 font-size-12 moon-ellipsis-class">
                  <label style="position: relative; top: 0px;">{{ item.tplDesc }}</label>
                </div>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="textRight marginTop10" style="position: relative">
                <div v-if="role == 'ROLE_ADMIN' && (listType == 1 || listType == 2)">
                  <span v-if="listType != 1 && item.authorKey == item.userKey" class="color-default" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 40px;text-align: center" @click.stop="shareTplOpr($event, item)">
                    {{ $t("分享") }}
                  </span>
                  <span class="color-warning" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 40px;text-align: center" @click.stop="useTplOpr($event, item)">
                    {{ $t("使用") }}
                  </span>
                  <span class="color-success" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 40px;text-align: center" @click.stop="updateTplOpr($event, item)">
                    {{ $t("修改") }}
                  </span>
                  <span class="color-error" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 40px;text-align: center" @click.stop="removeTplOpr($event, item)">
                    {{ $t("删除") }}
                  </span>
                </div>
                <div v-else-if="!role && listType == 2">
                  <span v-if="item.authorKey == item.userKey" class="color-default" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 40px;text-align: center" @click.stop="shareTplOpr($event, item)">
                    {{ $t("分享") }}
                  </span>
                  <span class="color-warning" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 40px;text-align: center" @click.stop="useTplOpr($event, item)">
                    {{ $t("使用") }}
                  </span>
                  <span class="color-success" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 40px;text-align: center" @click.stop="updateTplOpr($event, item)">
                    {{ $t("修改") }}
                  </span>
                  <span class="color-error" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 40px;text-align: center" @click.stop="removeTplOpr($event, item)">
                    {{ $t("删除") }}
                  </span>
                </div>
                <div v-else-if="!role && listType == 1">
                  <span class="color-warning" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 40px;text-align: center" @click.stop="useTplOpr($event, item)">
                    {{ $t("使用") }}
                  </span>
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row v-if="listType == 3">
            <el-col :span="12">
              <div class="textLeft">
                <div class="marginTop10 fontBold moon-ellipsis-class">{{ item.tplName }}</div>
                <div class="marginTop5 font-size-12 moon-ellipsis-class">
                  <label style="position: relative; top: 0px;">{{$t("分享者")}}:{{ item.nickName }}</label>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="textRight marginTop10" style="position: relative">
                <span class="color-default" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 40px;text-align: center" @click.stop="handleShareTplOpr($event, item ,3)">
                  {{ $t("接收") }}
                </span>
                <span class="color-warning" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 40px;text-align: center" @click.stop="handleShareTplOpr($event, item , 2)">
                  {{ $t("拒绝") }}
                </span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-drawer>

    <el-drawer
      title="设备设置"
      custom-class="drawer-child-bottom"
      :show-close="false"
      :modal="true"
      :size="globalScreenWidth < 550 || appType == 'app' ? '100%' : '50%'"
      :wrapperClosable="false"
      :visible.sync="dialogDeviceVisible"
      direction="rtl">

      <div slot="title">
        <div class="drawerHeader">
          <el-row>
            <el-col :span="4">
              <div class="drawerHeaderDiv">
                <a href="javascript:;" class="drawerHeaderBtn error-color" @click="cancelDeviceDrawer">关闭</a>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="drawerHeaderDiv">
                {{$t("设备设置")}}
              </div>
            </el-col>
            <el-col :span="4">
              <div class="drawerHeaderDiv">
                <a v-if="tplLoading == false" href="javascript:;" class="drawerHeaderBtn primary-color" @click="okDeviceConfirm">
                  确定
                </a>
                <a v-if="tplLoading == true" href="javascript:;" class="drawerHeaderBtn primary-color color-default">
                  <i class="fa fa-spinner fa-spin"></i>
                  确定
                </a>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="padding-full10 color-666666" style="position: relative">
        <div>
          <div class="marginLR20">
            <span style="font-weight: bold">
              {{ $t("批量操作") }}
              <label class="font-size-12 color-default">({{$t("任务列表对应非空设备将替换为相同")}})</label>
            </span>
            <span class="floatRight">
              <el-button style="padding: 3px 0" type="text" @click="moreDevice()">更多</el-button>
            </span>
          </div>
          <div class="custon-card-class marginTop10">
            <el-card class="marginLR20" :body-style="{padding: '10px'}">
              <div>
                <el-row :gutter="8">
                  <el-col :span="8" v-for="(item, index) in planDeviceExtar" :key="index" v-if="index < 10" class="marginBottom10">
                    <div class="dialog-device-tag-item-block">
                      <el-popover
                        placement="right"
                        trigger="click"
                        @after-enter="showDeviceList($event, item, 'muti')"
                        @after-leave="closeDeviceList()">
                        <div style="max-height: 300px;overflow-y: auto">
                          <span v-if="deviceLoading == true"><i class="fa fa-spinner fa-spin"></i></span>
                          <el-tree v-if="dataTplDeviceList.length > 0" ref="treeDevice" accordion empty-text="" :data="dataTplDeviceList" @node-click="(data, node, self) => selTreeItem(data, node, self, item, index, 'muti')"></el-tree>
                        </div>
                        <div slot="reference">
                          <span class="moon-ellipsis-class color-666666 dialog-device-tag-item-left">{{ item.key }}:</span>
                          <span class="moon-ellipsis-class dialog-device-tag-item-right">
                            <label v-if="item.value != ''" class="color-success" style="position: relative; top: 2px">{{ item.value }}</label>
                            <label v-if="item.value == ''" class="fa fa-plus-circle color-success" style="position: relative; top: 2px"></label>
                          </span>
                        </div>
                      </el-popover>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>

          <div class="marginTop10">
            <div class="marginLR20">
              <span style="font-weight: bold">{{ $t("任务操作") }}</span>
            </div>
            <div class="custon-card-class marginTop10">
              <el-card v-for="(item, index) in planDeviceResetData" :key="index" class="marginLR20 marginBottom10" :body-style="{padding: '15px 10px'}">
<!--                <div slot="header" class="color-666666">-->
<!--                  <span>任务1</span>-->
<!--                  <el-button style="float: right; padding: 3px 0" type="text" @click="moreDevice($event, item)">更多</el-button>-->
<!--                </div>-->
<!--                <div>-->
<!--                  <el-row :gutter="8">-->
<!--                    <el-col :span="8" v-for="(itemChild, indexChild) in 10" :key="indexChild" v-if="indexChild < 5" class="marginBottom10">-->
<!--                      <div>-->
<!--                        <span class="color-666666" style="display: inline-block; width: 35px;">${{ indexChild+1 }}:</span>-->
<!--                        <span class="moon-ellipsis-class" style="display: inline-block; width: 60%;position: relative; top: 3px">-->
<!--                          <label v-if="indexChild % 2 == 0" class="color-success">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</label>-->
<!--                          <label v-if="indexChild % 2 != 0" class="fa fa-plus-circle color-success"></label>-->
<!--                        </span>-->
<!--                      </div>-->
<!--                    </el-col>-->
<!--                  </el-row>-->
<!--                </div>-->
                <div @click="moreDevice($event, item, index)">
                  <el-row>
                    <el-col :span="12">
                      <span>{{ item.n }}</span>
                    </el-col>
                    <el-col :span="12">
                      <div class="textRight">
                        <i class="fa fa-warning color-warning" v-if="item.dExtraCount != item.d.length"></i>
                        <span class="color-default">{{ item.dExtraCount }}/{{ item.d.length }}</span>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </div>
      <!--更多-->
      <div v-show="dialogDeviceMoreVisible" class="mask"></div>
      <transition name="mybox">
        <div class="drawerBottomDialog" v-show="dialogDeviceMoreVisible"
        :style="globalScreenWidth < 550 || appType == 'app' ? {width: '100%'} : {width: '95%'}"
        >
          <div class="drawerHeader header">
            <el-row>
              <el-col :span="4">
                <div class="drawerHeaderDiv">
                  <a href="javascript:;" class="drawerHeaderBtn error-color" @click="closeDeviceMore">关闭</a>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="drawerHeaderDiv color-666666">
                  <span>{{$t("设备设置")}}</span>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="drawerHeaderDiv">
                  <a href="javascript:;" class="drawerHeaderBtn primary-color" @click="okDeviceMoreConfirm">确定</a>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="padding-full10 marginLR20">
            <el-row class="marginTop20" :gutter="8">
              <el-col :span="8" v-for="(itemChild, indexChild) in dExtra" :key="indexChild" class="marginBottom10">
                <div class="dialog-device-tag-item-block">
                  <el-popover
                    placement="right"
                    trigger="click"
                    @after-enter="showDeviceList($event, itemChild, 'plan')"
                    @after-leave="closeDeviceList()">
                    <div style="max-height: 300px;overflow-y: auto">
                      <span v-if="deviceLoading == true"><i class="fa fa-spinner fa-spin"></i></span>
                      <el-tree ref="treeDevice" v-if="dataTplDeviceList.length > 0" accordion empty-text="" :data="dataTplDeviceList" @node-click="(data, node, self) => selTreeItem(data, node, self, itemChild, indexChild, cardIndex !== '' ?'plan' : 'muti')"></el-tree>
                    </div>
                    <div slot="reference">
                      <span class="moon-ellipsis-class color-666666 dialog-device-tag-item-left">{{ itemChild.key }}:</span>
                      <span class="moon-ellipsis-class dialog-device-tag-item-right">
                        <label v-if="itemChild.value != ''" class="color-success" style="position: relative; top: 2px">{{ itemChild.value }}</label>
                        <label v-if="itemChild.value == ''" class="fa fa-plus-circle color-success" style="position: relative; top: 2px"></label>
                      </span>
                    </div>
                  </el-popover>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </transition>
    </el-drawer>

    <!--提示-->
    <alert-message-dialog :alert-message-tips="alertMessageTips" :timer="timer" :dialog-visible="dialogVisible" @cancel="cancelOpr" @okClick="saveOpr" @changeDrawer="closeAlertDialog"></alert-message-dialog>

    <alert-inpue-dialog :timer="timerShare" :dialog-visible="dialogShareVisible" @cancel="cancelShareOpr" @okClick="saveShareOpr" @changeDrawer="closeAlertDialog"></alert-inpue-dialog>
  </div>
</template>

<script>
import mixins from "../mixins/mixins";
import {common} from "../utils/api/url";
import {inArray, MessageError, MessageSuccess, MessageWarning} from "../utils/utils";
import AlertMessageDialog from "./AlertMessageDialog";
import AlertInpueDialog from "./AlertInpueDialog";
import { Loading } from 'element-ui';

export default {
  components: {AlertInpueDialog, AlertMessageDialog},
  mixins: [ mixins ],
  props: {
    dialogListSize: String,
    drawerTplVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    drawer_:{
      get(){
        return this.drawerTplVisible
      },
      set(v){
        this.$emit("changeDrawer",v)
      }
    }
  },
  mounted() {
    this.dialogNormalVisible = this.drawerTplVisible;
    this.role = localStorage.getItem("accountRole");
  },
  created() {
    this.initTplData(null, 2);
  },
  data() {
    return {
      dialogNormalVisible: false,
      roomObj: {},
      direction: 'rtl',
      data: [],
      listType: 2,
      alertMessageTips: '',
      timer: null,
      timerShare: null,
      dialogVisible: false,
      dialogDeviceVisible: false,
      dialogDeviceMoreVisible: false,
      dialogShareVisible: false,
      tplLoading: false,
      deviceLoading: false,
      directionDevice: 'btt',
      item: '',
      shareItem: '',
      role: '',
      dataTplDeviceList: [],
      planDeviceExtar: [],
      planDeviceResetData: [],
      dExtra: [],
      deviceType: '',
      cardIndex: ''
    }
  },
  methods: {
    initTplData(event, type){
      let url = '';
      let params = {};
      this.listType = type;
      this.data = [];
      if (type == 3){
        params = {
          statusSet: '1'
        };
        url = common.queryReceiveTplShareInfoList;
      }else {
        params = {
          tplType: type
        };
        url = common.queryTplInfoList;
      }
      this.$axios.get(this.baseUrl + url, {params: params, sessionId: this.sessionId}).then(res => {
        if (res.data.code == 200){
          this.data = res.data.data;
        }else {
          MessageWarning(res.data.msg);
        }
      });
    },
    useTplOpr(event, item){
      let params = {
        tplId: item.id
      };
      let deviceExtra = [];
      let device$ = [];
      const loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(221, 221, 221, 0.3)',
        customClass: 'custom-g-loading',
        target: document.querySelector('.drawer-child-bottom')//设置加载动画区域
      });
      this.$axios.get(this.baseUrl + common.queryTplInfo, {params: params, sessionId: this.sessionId}).then(res => {
        if (res.data.code == 200){
          let tplSource = JSON.parse(res.data.data.tplSource);
          for (let i = 0; i < tplSource.length; i++){
            tplSource[i]['dExtra'] = [];
            tplSource[i]['dExtraCount'] = 0;
            let t = tplSource[i].t;
            for (let j = 0; j < tplSource[i].d.length; j++){
              device$.push({
                key: tplSource[i].d[j],
                value: '',
                t: t,
                sn: ''
              });

              tplSource[i]['dExtra'].push({
                key: tplSource[i].d[j],
                value: "",
                set: false,
                t: t,
                sn: ''
              });
            }
          }

          let arrId = [];
          for(var item of device$){
            if(arrId.indexOf(item['key']) == -1){
              arrId.push(item['key']);
              deviceExtra.push(item);
            }
          }
          this.planDeviceExtar = deviceExtra;
          this.planDeviceResetData = tplSource;

          loading.close();
        }else {
          MessageWarning(res.data.msg);
          loading.close();
        }
      });
      this.dialogDeviceVisible = true;
    },
    updateTplOpr(event, item){
      this.$emit('updateTplOpr', event, item);
    },
    removeTplOpr(event, item){
      this.alertMessageTips = this.$t("确认删除该模版吗？");
      this.item = item;
      this.dialogVisible = true;
    },
    cancelOpr(){
      clearInterval(this.timer);
      this.timer = null;
      this.dialogVisible = false;
    },
    cancelShareOpr(){
      clearInterval(this.timerShare);
      this.timerShare = null;
      this.dialogShareVisible = false;
      this.shareItem = "";
    },
    saveShareOpr(data){
      if (data == ""){
        MessageWarning(this.$t("请输入信息"));
        return;
      }
      let params = {
        account: data,
        tplId: this.shareItem.id
      };
      this.timerShare = 1;
      params = this.$qs.stringify(params);
      this.$axios.post(this.baseUrl + common.sendShareTplInfo, params, {sessionId: this.sessionId, loading: false}).then(res => {
        if (res.data.code == 200){
          MessageSuccess(res.data.msg);
          this.dialogShareVisible = false;
          this.shareItem = "";
        }else {
          MessageError(res.data.msg);
          this.configLoading = false;
        }
        this.timerShare = 0;
      });
    },
    saveOpr(){
      let params = {
        tplId: this.item.id
      };
      params = this.$qs.stringify(params);
      this.timer = 1;
      this.$axios.post(this.baseUrl + common.deleteTplInfo, params, {sessionId: this.sessionId, loading: false}).then(res => {
        if (res.data.code == 200){
          this.initTplData(null, this.listType);
          this.item = "";
          this.dialogVisible = false;
        }else {
          MessageWarning(res.data.msg);
        }
        this.timer = null;
      });
    },
    closeAlertDialog(event){
      this.item = "";
      this.dialogVisible = event;
      this.dialogShareVisible = event;
    },
    moreDevice(event, item, index){
      if (item){
        this.cardIndex = index;
        this.deviceType = item.t;
        this.dExtra = item.dExtra;
      }else {
        this.dExtra = this.planDeviceExtar;
      }
      this.dialogDeviceMoreVisible = true;
    },
    closeDeviceMore(){
      this.cardIndex = "";
      this.dialogDeviceMoreVisible = false;
    },
    okDeviceMoreConfirm(){
      this.cardIndex = "";
      this.dialogDeviceMoreVisible = false;
    },
    cancelDeviceDrawer(){
      this.cardIndex = "";
      this.dialogDeviceVisible = false;
      this.dialogDeviceMoreVisible = false;
    },
    okDeviceConfirm(){
      let num = 0;
      this.tplLoading = true;
      for (let i = 0; i < this.planDeviceResetData.length; i++){
        for (let j = 0; j < this.planDeviceResetData[i].dExtra.length; j++){
          if (this.planDeviceResetData[i].dExtra[j].value == ""){
            num++;
            break;
          }
        }
      }
      this.tplLoading = false;
      if (num > 0){
        MessageWarning(this.$t("任务列表中存在未设置的设备，请检查！"));
        return;
      }

      this.$parent.$parent.$parent.$parent.$refs.childRef.$children[0].setSenceData(this.planDeviceResetData);
      this.$parent.$refs.tplList.$parent.drawerTplVisible = false;
      this.dialogDeviceMoreVisible = false;
      this.dialogDeviceVisible = false;
      this.$parent.$parent.$parent.$parent.$refs.childRef.$children[0].drawerListVisible = false;
    },
    async showDeviceList(event, item, type){
      this.deviceLoading = true;
      if (type == 'muti'){
        await this.getDeviceList(item.t);
      }else if (type == 'plan'){
        await this.getDeviceList(item.t);
      }
      this.dataTplDeviceList = [];
      this.dataTplDeviceList = this.dataDeviceList;
      this.deviceLoading = false;
    },
    closeDeviceList(){
      this.dataTplDeviceList = [];
    },
    selTreeItem(data, node, self, item, index, type){
      if (!data.children){
        const loading = Loading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(221, 221, 221, 0.3)',
          customClass: 'custom-g-loading',
          target: document.querySelector('.drawer-child-bottom, .drawerBottomDialog')//设置加载动画区域
        });
        //console.log(type);
        if(type == 'muti'){
          this.planDeviceExtar[index].value = data.label;
          this.planDeviceExtar[index].sn = data.sn;
          for (let i = 0; i < this.planDeviceResetData.length; i++){
            let dExtra = this.planDeviceResetData[i].dExtra;
            let dExtraD = this.planDeviceResetData[i].d;
            for (let j = 0; j < dExtra.length; j++){
              if (dExtra[j].key == item.key){
                if (dExtra[j].value == ""){
                  this.planDeviceResetData[i].dExtra[j].value = data.label;
                  this.planDeviceResetData[i].dExtra[j].sn = data.sn;
                  this.planDeviceResetData[i].dExtraCount++;
                }
              }
            }

            for (let k = 0; k < dExtraD.length; k++){
              if(dExtraD[k] == item.key){
                //console.log(dExtraD[k]);
                this.planDeviceResetData[i].d[k] = data.sn;
              }
            }
          }
        }else if(type == 'plan'){
          if(this.dExtra[index].value == ""){
            this.planDeviceResetData[this.cardIndex].dExtraCount++;
          }
          this.dExtra[index].value = data.label;
          this.dExtra[index].sn = data.sn;

          for (let i = 0; i < this.planDeviceResetData[this.cardIndex].d.length; i++){
            if(this.planDeviceResetData[this.cardIndex].d[i] == this.dExtra[index].key){
              this.planDeviceResetData[this.cardIndex].d[i] = data.sn;
            }
            if(this.planDeviceResetData[this.cardIndex].d[i] != this.dExtra[index].sn){
              //console.log(this.dExtra[index].sn);
              this.planDeviceResetData[this.cardIndex].d[i] = data.sn;
            }
          }
        }
        loading.close();
      }
    },
    shareTplOpr(event, item){
      this.shareItem= item;
      this.dialogShareVisible = true;
    },
    handleShareTplOpr(event, item, status){
      let params = {
        status: status,
        tplShareId: item.id
      };
      params = this.$qs.stringify(params);
      this.$axios.post(this.baseUrl + common.handleShareTplInfo, params, {sessionId: this.sessionId, loading: false}).then(res => {
        if (res.data.code == 200){
          MessageSuccess(res.data.msg);
          this.initTplData(null, this.listType);
        }else {
          MessageError(res.data.msg);
          this.configLoading = false;
        }
      });
    },
    refruceShareTplOpr(event, item){

    }
  }
}
</script>

<style scoped>
/* 给过渡的name加样式 */
.mybox-enter-active,  .mybox-leave-active {
  transition: all 0.3s linear;
  transform: translateX(0);
}
.mybox-enter,  .mybox-leave {
  transform: translateX(100%);
}
.mybox-leave-to{
  transform: translateX(100%);
}
.share{
  z-index: 9999;
  transition: bottom .5s ease-in;
}
.drawerBottomDialog{
  position: absolute;
  bottom: 0px;
  right: 0px;
  top: 0px;
  height: 100%;
  width: 80%;
  background: #f5f5f5;
  z-index: 100;
}
.mask{
  position: absolute;
  top: 0px;
  right: 0;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 99;
}
.dialog-device-tag-item-left{
  display: inline-block;
  width: 40px;
  height: 30px;
  line-height: 30px;
  position: relative;
  top: 2px
}
.dialog-device-tag-item-right{
  display: inline-block;
  width: 52%;
  position: relative;
  height: 30px;
  line-height: 30px
}
.dialog-device-tag-item-block{
  border-radius: 5px;
  background: #EBEEF5;
  padding:0px 5px;
}
</style>

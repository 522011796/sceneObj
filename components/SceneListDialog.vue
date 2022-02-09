<template>
  <div>
    <el-drawer
      ref="sceneList"
      title="场景设置"
      custom-class="drawer-list"
      :show-close="false"
      :modal="true"
      :size="dialogListSize"
      :wrapperClosable="false"
      :visible.sync="drawerListVisible"
      :direction="direction">

      <div slot="title">
<!--        <div v-if="appType == 'app'" class="app-block-list-header padding-lf10">-->
<!--          <div v-if="globalPhoneXbar == false" style="height: 20px;line-height: 20px"></div>-->
<!--          <div v-if="globalPhoneXbar == true" style="height: 44px;line-height: 44px"></div>-->
<!--          <div style="height: 44px;line-height: 44px">-->
<!--            <el-row>-->
<!--              <el-col :span="8">-->
<!--              <span class="font-size-17_5 color-ffffff">-->
<!--                <i class="fa fa-angle-left" style="font-size: 32px;position: relative; top:3px;"></i>-->
<!--                <label style="margin-left: 5px">{{$t("返回")}}</label>-->
<!--              </span>-->
<!--              </el-col>-->
<!--              <el-col :span="8">-->
<!--                <div class="textCenter font-size-17_5 color-ffffff" style="font-weight: 500">-->
<!--                  {{$t("场景管理V2")}}-->
<!--                </div>-->
<!--              </el-col>-->
<!--              <el-col :span="8">-->
<!--                <div class="textRight font-size-14 color-ffffff">-->
<!--                  <span class="marginRight10">{{$t("模版")}}</span>-->
<!--                  <i class="fa fa-plus-circle marginRight10" style="font-size: 20px;position: relative; top:3px;"></i>-->
<!--                </div>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </div>-->
<!--        </div>-->
        <div class="block-list-header">
          <div v-if="appType != 'app'">
            <el-row>
              <el-col :span="3">
                <span>
                  <el-button size="mini" type="error" @click="logout()">{{$t("退出")}}</el-button>
                </span>
              </el-col>
              <el-col :span="21" class="textRight">
                <el-button size="mini" type="error" @click="selEnvList()">{{$t("场所列表")}}</el-button>
                <el-button size="mini" type="success" @click="selEnvTplList()">{{$t("模版列表")}}</el-button>
                <el-button size="mini" type="warning" @click="createSence()">{{$t("创建场景")}}</el-button>
              </el-col>
            </el-row>
          </div>

          <div v-if="appType == 'app'">
            <div v-if="globalDeviceType == 'ios'">
              <el-row>
                <el-col :span="24">
                <span class="fontBold">
                  <label>{{$t("场景列表")}}</label>
                  :
                  <label>{{data.length}}</label>
                </span>
                </el-col>
              </el-row>
            </div>
            <div v-else>
              <el-row>
                <el-col :span="24" class="textRight">
                  <el-button size="mini" type="success" @click="selEnvTplList()">{{$t("模版列表")}}</el-button>
                  <el-button size="mini" type="warning" @click="createSence()">{{$t("创建场景")}}</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>

      <div class="marginTop10">
        <el-empty v-if="data.length == 0" :description="$t('暂无数据')"></el-empty>
        <div v-else v-for="(item, index) in data" class="block-list-content-item marginBottom10" @click="selSence($event, item, 'menu')">
          <el-row>
            <el-col :span="12">
              <div class="textLeft">
                <div class="marginTop10 fontBold">
                  <span slot="reference" style="display: inline-block">
                    <label class="moon-ellipsis-class" style="display: inline-block;max-width: 70% !important;position: relative;vertical-align:middle;">{{ item.sceneName }}</label>
                    <label @click.stop="showDeviceStatus($event, item, index)"  style="position: relative;padding: 10px 0px 0px 0px;vertical-align:middle;">
                      (<label class="color-success">{{item.successCount}}</label>/<label class="color-default">{{item.totalCount}}</label>)
                    </label>
                  </span>
                </div>
                <div class="font-size-12 marginTop5">
                  <img v-if="item.roomId" :src="require(`~/static/img/${item.roomId}.png`)" style="height: 20px; width: 20px;">
                  <label style="position: relative; top: -6px;">{{ getGlobalRoomObj(item.roomId) }}</label>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="textRight marginTop10" style="position: relative">
                <!--                <span class="color-666666">{{ $moment(item.lastTime).format("yyyy-MM-DD") }}</span>-->
                <span class="color-warning" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 50px;text-align: center" @click.stop="createTplOpr($event, item)">
                  {{ $t("创建模版") }}
                </span>
                <span class="color-success" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 30px;text-align: center" @click.stop="updateSenceOpr($event, item)">
                  {{ $t("修改") }}
                </span>
                <span class="color-error" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 30px;text-align: center" @click.stop="removeSenceOpr($event, item)">
<!--                  <i class="fa fa-trash font-size-20 marginLeft10 color-error" style="position: relative; top: 9px;"></i>-->
                  {{ $t("删除") }}
                </span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-drawer>

    <tpl-list-dialog
      ref="tplList"
      :drawer-tpl-visible="drawerTplVisible"
      @changeDrawer="changeTplDrawer"
      @updateTplOpr="updateTplOpr"
      @returnIndex="changeTplDrawer"
    >
    </tpl-list-dialog>

    <el-drawer
      title="场景设置"
      custom-class="drawer-opr drawer-model-edit-opr"
      :show-close="false"
      :modal="true"
      :size="dialogBottomSize"
      :wrapperClosable="false"
      :visible.sync="drawerCreateTplVisible"
      :direction="appType != 'app' ? 'rtl' : 'btt'"
      @closed="closeTplOprDrawer">

      <div slot="title">
        <div class="block-opr-header">
          <el-row>
            <el-col :span="6" class="textLeft">
              <el-button size="mini" @click="cancelTplConfig">{{$t("取消")}}</el-button>
            </el-col>
            <el-col :span="12" class="textCenter">
              <span>{{$t("创建模版")}}</span>
            </el-col>
            <el-col :span="6" class="textRight">
              <el-button v-if="configLoading == false" size="mini" type="warning" @click="saveTplSetConfig">
                {{$t("保存")}}
              </el-button>
              <el-button size="mini" type="warning" v-if="configLoading == true">
                <i class="fa fa-spinner fa-spin" v-if="configLoading == true"></i>
                {{$t("保存")}}
              </el-button>

<!--              <div v-if="formTpl.id == ''">-->
<!--                <el-button v-if="setTplLoading == false" size="mini" type="warning" @click="saveTplConfig">-->
<!--                  {{$t("位置设置")}}-->
<!--                </el-button>-->
<!--                <el-button size="mini" type="warning" v-if="setTplLoading == true">-->
<!--                  <i class="fa fa-spinner fa-spin" v-if="setTplLoading == true"></i>-->
<!--                  {{$t("位置设置")}}-->
<!--                </el-button>-->
<!--              </div>-->

<!--              <div v-if="formTpl.id != ''">-->
<!--                <el-button v-if="configLoading == false" size="mini" type="warning" @click="saveTplSetConfig">-->
<!--                  {{$t("保存")}}-->
<!--                </el-button>-->
<!--                <el-button size="mini" type="warning" v-if="configLoading == true">-->
<!--                  <i class="fa fa-spinner fa-spin" v-if="configLoading == true"></i>-->
<!--                  {{$t("保存")}}-->
<!--                </el-button>-->
<!--              </div>-->
            </el-col>
          </el-row>
        </div>
      </div>

      <div>
        <el-form class="netmoon-form-dialog padding-tb10-lr20" label-width="90px" ref="formTpl" :model="formTpl">
          <el-form-item label="模版名称" v-model="formTpl.tplName" class="netmoon-form-item-border-dialog">
            <el-input :placeholder="$t('请输入模版名称')" v-model="formTpl.tplName"></el-input>
          </el-form-item>
          <el-form-item v-if="formTpl.id == '' || formTpl.id == undefined" label="模版开源" class="netmoon-form-item-border-dialog">
            <div class="textRight">
              <el-radio-group v-model="formTpl.tplOpen">
                <el-radio :label="true" disabled>开源</el-radio>
                <el-radio :label="false" disabled>闭源</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item v-if="formTpl.id == '' || formTpl.id == undefined" label="模版类型" class="netmoon-form-item-border-dialog">
            <div class="textRight">
              <el-radio-group v-model="formTpl.tplType">
                <el-radio :label="2">个人</el-radio>
                <el-radio :label="1" v-if="role != 'ROLE_ADMIN'" disabled>系统</el-radio>
                <el-radio :label="1" v-if="role == 'ROLE_ADMIN'">系统</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item v-if="formTpl.id == '' || formTpl.id == undefined" label="编辑设备名称" class="netmoon-form-item-border-dialog">
            <div class="textRight">
              <span class="fontBold">
                <label class="color-warning">{{deviceSetCount}}</label> / <label class="color-success">{{deviceListCount}}</label>
              </span>
              <el-button size="mini" plain type="success" :loading="setTplLoading == true" @click="editDeviceModelName">
                {{$t("编辑")}}
                <i class="fa fa-edit"></i>
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="模版描述" v-model="formTpl.tplDesc" class="netmoon-form-item-border-dialog">
            <el-input type="textarea" :rows="5" :placeholder="$t('请输入模版描述')" v-model="formTpl.tplDesc"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <el-drawer
      title="场景设置"
      custom-class="drawer-opr drawer-opr-loading"
      :show-close="false"
      :modal="true"
      :size="dialogSubChildSize"
      :wrapperClosable="false"
      :visible.sync="tplSetDeviceVisible"
      :direction="appType != 'app' ? 'rtl' : 'btt'"
      @closed="closeTplSetOprDrawer">

      <div slot="title">
        <div class="block-opr-header">
          <el-row>
            <el-col :span="4" class="textLeft">
              <el-button size="mini" @click="cancelTplSetConfig">{{$t("取消")}}</el-button>
            </el-col>
            <el-col :span="16" class="textCenter">
              <span>{{$t("编辑设备列表")}}</span>
            </el-col>
            <el-col :span="4" class="textRight">
              <el-button v-if="configLoading == false" size="mini" type="warning" @click="okTplSetConfig">
                {{$t("确定")}}
              </el-button>
              <el-button size="mini" type="warning" v-if="configLoading == true">
                <i class="fa fa-spinner fa-spin" v-if="configLoading == true"></i>
                {{$t("确定")}}
              </el-button>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="custom-collapse-block marginTop5 padding-lf10">
        <el-collapse accordion>
          <el-collapse-item v-for="(itemMain, indexMain) in deviceTplData" :key="indexMain">
            <template slot="title">
              <el-row style="width: 100%">
                <el-col :span="20">
                  <span class="color-success font-size-12">{{deviceTypeInfo(itemMain.t)}}</span>
                </el-col>
                <el-col :span="4">
                  <div class="textRight">
                    <label class="color-warning">{{itemMain.extraCount}}</label>
                    /
                    <label class="color-success">{{itemMain.d.length}}</label>
                  </div>
                </el-col>
              </el-row>
            </template>
            <el-row :gutter="16" class="marginTop5">
              <el-col class="marginBottom10" :span="12" v-for="(item, index) in itemMain.d" :key="index">
                <div class="tpl-item-child-main-block">
                  <div class="tpl-item-child-title-block" style="">
                    <el-popover
                      placement="top"
                      width="160"
                      v-model="item.editVisible"
                      @hide="cancelEditPop($event, item)">
                      <div>
                        <el-input size="mini" v-model="item.name"></el-input>
                      </div>
                      <div style="text-align: right; margin-top: 10px">
                        <el-button size="mini" type="text" @click="cancelEditPop($event, item, index)">取消</el-button>
                        <el-button type="success" size="mini" @click="saveEditPop($event, item, index)">确定</el-button>
                      </div>
                      <div slot="reference">
                        <span class="moon-ellipsis-class font-size-12" style="display: inline-block;max-width: 80%;vertical-align: middle">
                          <label>{{ item.name }}</label>
                        </span>
                        <span style="display: inline-block;vertical-align: middle; float: right" @click="editDeviceName($event, item)"><i class="fa fa-edit color-warning font-size-12"></i></span>
                      </div>
                    </el-popover>
                  </div>
                  <div class="tpl-item-child-content-block">
<!--                    <div @click="showBottomDialog($event, indexMain, itemMain, item, index)">-->
<!--                        <span v-if="item.extraSn != ''">-->
<!--                          <label class="moon-ellipsis-class font-size-12" style="display: inline-block;max-width: 85%;vertical-align: middle">{{ item.extraName }}</label>-->
<!--                          <label @click="removeDeviceItem($event ,itemMain.dd, item, itemMain)">-->
<!--                            <i class="fa fa-close"></i>-->
<!--                          </label>-->
<!--                        </span>-->
<!--                      <div v-if="item.extraSn == ''">-->
<!--                        <i class="fa fa-plus-circle color-warning"></i>-->
<!--                      </div>-->
<!--                    </div>-->

                    <el-popover
                      placement="bottom"
                      trigger="click"
                      @after-enter="showItemData($event, itemMain)"
                      @after-leave=""
                      @show=""
                      @hide="closeItemData"
                      v-model="item.visible">
                      <div style="height: 140px;overflow-y: auto">
                        <span v-if="deviceBottomList.length == 0"><i class="fa fa-spinner fa-spin"></i></span>
<!--                        <el-tree ref="treeDevice" v-if="deviceBottomList.length > 0" accordion empty-text="" :data="deviceBottomList" @node-click="(data, node, self) => selTreeItem(data, node, self, itemMain.dd, item, itemMain)">-->
<!--                          <span class="custom-tree-node" slot-scope="{ node, data }">-->
<!--                            <label class="font-size-12">{{ data.label }}</label>-->
<!--                            <label class="font-size-12 color-disabled">({{ data.n }})</label>-->
<!--                          </span>-->
<!--                        </el-tree>-->
                        <div v-for="(itemTree, indexTree) in deviceBottomList" style="height: 25px; line-height: 25px" @click="selTreeItem(itemTree,itemMain.dd, item, itemMain)">
                          <span class="font-size-12">{{itemTree.label}}</span>
<!--                          <span class="font-size-12 color-disabled">({{itemTree.n}})</span>-->
                        </div>
                      </div>
                      <div slot="reference">
                        <span v-if="item.extraSn != ''">
                          <label class="moon-ellipsis-class font-size-12" style="display: inline-block;max-width: 85%;vertical-align: middle">{{ item.extraName }}</label>
                          <label @click="removeDeviceItem($event ,itemMain.dd, item, itemMain)">
                            <i class="fa fa-close"></i>
                          </label>
                        </span>
                        <div v-if="item.extraSn == ''">
                          <i class="fa fa-plus-circle color-warning"></i>
                        </div>
                      </div>
                    </el-popover>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>

        <!--底部弹出--暂时没用-->
        <div class="mask" v-show="drawerBottomDialogVisible"></div>
        <transition name="myboxV">
          <div class="drawerBottomDialog share" v-show="drawerBottomDialogVisible" style="width: 100%">
            <div>
              <div class="drawerHeader header textCenter" @click="closeBottomDialog">
                <span class="color-666666">设备列表</span>
              </div>
            </div>
            <div>
              <el-tree ref="treeDevice" accordion empty-text="" :data="deviceBottomList" @node-click="(data, node, self) => selTreeBottomItem(data, node, self, deviceBottomList, deviceBottomMainIndex, deviceBottomItem, deviceBottomItemIndex)">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <label class="font-size-12">{{ data.label }}</label>
                  <label class="font-size-12 color-disabled">({{ data.n }})</label>
                </span>
              </el-tree>
            </div>
          </div>
        </transition>
      </div>
    </el-drawer>

    <el-drawer
      title="场景设置"
      custom-class="drawer-bottom"
      :show-close="false"
      :modal="true"
      size="80%"
      :wrapperClosable="false"
      :visible.sync="drawerDeviceVisible"
      direction="btt"
      :style="{'width': '100% !important', 'margin': '0px auto'}">

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
                {{$t("设备列表")}}
              </div>
            </el-col>
            <el-col :span="4">
              <div class="drawerHeaderDiv">
                <label class="drawerHeaderBtn color-disabled">
<!--                  <i class="fa fa-spinner fa-spin color-disabled"></i>-->
                  <span class="font-size-12 color-default">自动更新</span>
                </label>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="drawerBottomDialogContent">
        <div>
          <div v-if="deviceStatusData.length == 0" class="textCenter">
            <div style="margin-top: 25%">
              <i class="fa fa-spinner fa-spin" style="font-size: 40px"></i>
            </div>
          </div>
          <div class="font-size-14 padding-lf20" style="font-weight: normal; height: 45px; line-height: 45px; position: relative;border-bottom: 1px dashed #dddddd" v-for="(itemDevice, indexDevice) in deviceStatusData">
            <el-row>
              <el-col :span="16">
                <div class="moon-ellipsis-class color-666666">
                  <span v-if="itemDevice.deviceInfo">
                    {{itemDevice.deviceInfo.name}}
                  </span>
                  <span>
                    ({{itemDevice.sn}})
                  </span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="textRight">
                  <span v-if="itemDevice.actionStatus == 1" class="color-success">
                    已安装
                  </span>
                  <span v-if="itemDevice.actionStatus == 2" class="color-warning">
                    安装中
                  </span>
                  <span v-if="itemDevice.actionStatus == 3" class="color-success">
                    安装成功
                  </span>
                  <span v-if="itemDevice.actionStatus == 4" class="color-error">
                    安装失败
                  </span>
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
import mixins from "../mixins/mixins";
import TplListDialog from "./TplListDialog";
import {common} from "../utils/api/url";
import {deviceType, inArray, MessageCommonTips, MessageError, MessageSuccess, MessageWarning} from "../utils/utils";
import {Loading} from "element-ui";
import itemH from "../pages/itemH";

export default {
  components: {TplListDialog},
  mixins: [ mixins ],
  props: {
    data: Array,
    direction: String,
    dialogListSize: String,
    dialogBottomSize: String,
    dialogSubChildSize: String,
    drawerListVisible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.dialogNormalVisible = this.drawerEnvVisible;
    this.role = localStorage.getItem("accountRole");
    this.initRoomData();
  },
  data() {
    return {
      drawerBottomDialogVisible: false,
      dialogNormalVisible: false,
      roomObj: {},
      drawerTplVisible: false,
      drawerCreateTplVisible: false,
      configLoading: false,
      deviceStatusVisible: false,
      drawerDeviceVisible: false,
      role: '',
      deviceStatusData: [],
      deviceTplData: [],
      deviceTplBakData: [],
      deviceBottomList: [],
      deviceBottomMainIndex: '',
      deviceBottomItemIndex: '',
      deviceBottomItem: '',
      timer: null,
      tplSetDeviceVisible: false,
      deviceLoading: false,
      setTplLoading: false,
      loopTime: 60,
      deviceSetCount: 0,
      deviceListCount: 0,
      formTpl:{
        id: '',
        tplName: '',
        tplOpen: true,
        tplType: 2,
        tplSource: '',
        tplDesc: ''
      }
    }
  },
  methods: {
    async initRoomData(){
      await this.getRoomList();
      this.roomObj = this.globalRoomObj;
    },
    logout(){
      this.$emit('logout');
    },
    selEnvList(){
      this.$emit('selEnvList');
    },
    selEnvTplList(){
      this.setPageStatus(2);
      this.drawerTplVisible = true;
    },
    createSence(){
      this.$emit('createSence');
    },
    selSence(event, item, type){
      this.hideDeviceStatus();
      this.$emit('selSence', event, item, type);
    },
    async createTplOpr(event, item){
      await this.getSourceUrl(item.sourceUrl);
      await this.getDeviceOldList();
      await this.saveTplConfig();
      if (this.deviceListCount == 0){
        MessageCommonTips(this, this.$t("该场景暂不允许创建模版！"), 'warning');
        return;
      }
      this.showDialogStatus();
      this.drawerCreateTplVisible = true;
    },
    changeTplDrawer(event){
      this.drawerTplVisible = event;
    },
    updateSenceOpr(event, item){
      this.$emit('updateSenceOpr', event, item);
    },
    removeSenceOpr(event, item){
      this.$emit('removeSenceOpr', event, item);
    },
    getGlobalRoomObj(val){
      return this.roomObj[val];
    },
    async getSourceUrl(sourceUrl){
      await this.$axios.get(sourceUrl).then(res => {
        this.formTpl.tplSource = res.data;
      });
    },
    closeTplOprDrawer(){
      this.formTpl = {
        id: '',
        tplName: '',
        tplOpen: false,
        tplType: 2,
        tplSource: '',
        tplDesc: ''
      }
      this.dismissDialogStatus();
      this.setTplLoading = false;
    },
    closeTplSetOprDrawer(){

    },
    cancelTplConfig(){
      this.deviceTplData = [];
      this.deviceTplBakData = [];
      this.dismissDialogStatus();
      this.drawerCreateTplVisible = false;
    },
    editDeviceModelName(){
      let _self = this;
      _self.deviceTplData = JSON.parse(JSON.stringify(_self.deviceTplBakData));
      this.tplSetDeviceVisible = true;
    },
    async saveTplConfig(){
      // if (this.formTpl.tplName == ""){
      //   MessageCommonTips(this, this.$t("请输入模版名称"), 'warning');
      //   return;
      // }
      const loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(221, 221, 221, 0.3)',
        customClass: 'custom-g-loading',
        target: document.querySelector('.drawer-model-edit-opr')//设置加载动画区域
      });
      //setTimeout(() => {
        this.setTplLoading = true;
        let taskType = [];
        let taskDevice = [];
        let taskTempDevice = [];
        this.deviceSetCount = 0;
        this.deviceListCount = 0;
        let deviceSetCount = 0;
        let deviceListCount = 0;
        let deviceCountIndex = 0;
        //缓存场景中的设备列表，用于后期选择
        let task = this.formTpl.tplSource.tasks;
        task.map((e) => {
          taskType.push(e['t']);
        });
        //数组去重
        taskType = taskType.filter((e, i, self) => {
          return self.indexOf(e) == i
        });
        for (let j = 0; j < taskType.length; j++){
          let device = [];
          let deviceIndex = 0;
          let deviceList = [];

          taskDevice.push({
            t: taskType[j]
          });
          let arr = task.filter((e) => {
            return e['t'] == taskType[j];
          });
          for(let k = 0; k < arr.length; k++) {
            let taskD = arr[k].d;
            for(let i = 0; i < taskD.length; i++) {
              let child = {
                sn: taskD[i],
              };
              let sel = inArray(child, device, 'sn');
              if (sel == -1){
                deviceIndex++;
                deviceCountIndex++;
                deviceList.push({
                  n: taskD[i],
                  name: this.getDeviceName(taskD[i]),
                  label: this.getDeviceName(taskD[i]),
                });
                device.push({
                  extra: "$" + deviceIndex,
                  name: deviceType(taskType[j]) + deviceIndex,
                  nickname: deviceType(taskType[j]) + deviceIndex,
                  sn: taskD[i],
                  extraSn: '',
                  extraName: '',
                  editVisible: false,
                  visible: false
                });
              }
            }
            taskDevice[j]['dd'] = deviceList;
            taskDevice[j]['d'] = device;
            taskDevice[j]['extraCount'] = 0;
            deviceSetCount = 0;
            deviceListCount = deviceCountIndex;
          }
        }
        this.deviceSetCount = deviceSetCount;
        this.deviceListCount = deviceListCount;
        //this.deviceTplData = taskDevice;
        taskTempDevice = taskDevice;
        this.deviceTplBakData = taskDevice;
        this.setTplLoading = false;
      //}, 500);
      loading.close();
      //console.log(this.deviceTplData);
      //this.tplSetDeviceVisible = true;
    },
    saveTplOpr(){
      let params = {
        tplName: this.formTpl.tplName,
        tplOpen: this.formTpl.tplOpen,
        tplType: this.formTpl.tplType,
        tplDesc: this.formTpl.tplDesc,
        tplSource: ''
      };

      if (this.formTpl.id == "" || this.formTpl.id == undefined){
        let sourceData = this.formTpl.tplSource.tasks;
        let dArr = [];
        let sourceDataExtra = [];
        let sourceIndex = 0;
        let sourceKeyIndex = 0;
        for (let i = 0; i < sourceData.length; i++){
          let d = sourceData[i].d;
          sourceDataExtra.push({
            i: sourceData[i].i,
            n: sourceData[i].n,
            t: sourceData[i].t,
            d: []
          });
          for (let j = 0; j < d.length; j++){
            if (dArr.indexOf(d[j]) == -1){
              dArr.push(d[j]);
            }
          }
          //console.log(dArr);
          for (let j = 0; j < d.length; j++){
            //console.log(dArr.indexOf(d[j]),sourceIndex++);
            if (dArr.indexOf(d[j]) == -1){
              sourceIndex++;
              sourceKeyIndex = sourceIndex;
            }else{
              sourceKeyIndex = dArr.indexOf(d[j]) + 1;
            }
            sourceDataExtra[i]['d'].push("$"+sourceKeyIndex);
          }
        }
        //console.log(sourceDataExtra);
        params['tplSource'] = JSON.stringify(sourceDataExtra);
      }

      if (this.formTpl.id != "" || this.formTpl.id != undefined){
        params['tplId'] = this.formTpl.id;
      }

      params = this.$qs.stringify(params);

      let url = (this.formTpl.id == "" || this.formTpl.id == undefined) ? common.createTplInfo : common.editTplInfo;
      this.configLoading = true;
      this.$axios.post(this.baseUrl + url, params, {sessionId: this.sessionId, userKey: this.userKey, loading: false}).then(res => {
        if (res.data.code == 200){
          this.$refs.tplList.initTplData(null, this.$refs.tplList.listType);
          this.drawerCreateTplVisible = false;
          MessageCommonTips(this, res.data.msg, 'success');
        }else {
          MessageCommonTips(this, res.data.msg, 'error');
        }
        this.configLoading = false;
      });
    },
    updateTplOpr(event, item){
      this.formTpl = {
        id: item.id,
        tplName: item.tplName,
        tplDesc: item.tplDesc
      };
      this.showDialogStatus();
      this.drawerCreateTplVisible = true;
    },
    hideDeviceStatus(){
      for (let i = 0; i < this.data.length; i++){
        this.data[i]['_visible'] = false;
      }
      this.$parent.$parent.$parent.$refs.childRef.$children[0].envPopStatus = "";
    },
    showDeviceStatus(event, item, index){
      this.installSenceDeviceStauts(event, item);
      this.drawerDeviceVisible = true;
    },
    closeTimer(){
      clearInterval(this.timer);
      this.timer = null;
      this.$parent.$parent.$parent.$refs.childRef.$children[0].envPopStatus = "";
    },
    showItemData(event, itemData){
      this.deviceBottomList = [];
      this.deviceBottomList = itemData.dd;
    },
    closeItemData(){
      this.deviceBottomList = [];
    },
    showBottomDialog(event, indexMain, itemMain, item, index){
      this.deviceBottomList = itemMain.dd;
      this.deviceBottomMainIndex = indexMain;
      this.deviceBottomItemIndex = index;
      this.deviceBottomItem = item;
      this.drawerBottomDialogVisible = true;
    },
    closeBottomDialog(){
      this.drawerBottomDialogVisible=false
    },
    installSenceDeviceStauts(event, item){
      let params = {
        envKey: this.$route.query.envKey != "" && this.$route.query.envKey != undefined ? this.$route.query.envKey : localStorage.getItem("envKey"),
        sceneId: item.sceneId
      };
      clearTimeout(this.timer);
      this.$axios.get(this.baseUrl + common.querySceneActionList, {params: params, sessionId: this.sessionId, userKey: this.userKey, loading: false}).then(res => {
        if (res.data.code == 200){
          let flag = false;
          this.deviceStatusData = res.data.data;
          if (res.data.data.length == 0){
            if (this.loopTime > 0){
              this.timer = setTimeout(() => {
                this.installSenceDeviceStauts(event, item);
              }, 3000);
              this.loopTime = this.loopTime - 3;
            }else {
              this.loopTime = 60;
              clearTimeout(this.timer);
            }
          }else {
            this.loopTime = 60;
            for (let i = 0; i < res.data.data.length; i++){
              if (res.data.data[i].actionStatus != 1){
                if (res.data.data[i].systemTime / 1000 - res.data.data[i].lastTime / 1000 < 60){
                  //console.log(res.data.data[i].systemTime / 1000 - res.data.data[i].lastTime / 1000);
                  flag = true;
                  break;
                }
              }
            }
            //console.log(flag);
            if (flag == false){
              clearTimeout(this.timer);
            }else {
              this.timer = setTimeout(() => {
                this.installSenceDeviceStauts(event, item);
              }, 3000);
            }
          }
        }
      });
    },
    closeDevicePop(event, item){
      item._visible = false;
      this.$parent.$parent.$parent.$refs.childRef.$children[0].envPopStatus = "";
      clearTimeout(this.timer);
      this.timer = null;
    },
    cancelDrawer(){
      this.deviceStatusData = [];
      clearTimeout(this.timer);
      this.timer = null;
      this.drawerDeviceVisible = false;
    },
    deviceTypeInfo(val){
      return deviceType(val);
    },
    removeDeviceItem(event, itemMainDD, item, itemMain){
      itemMainDD.splice(itemMainDD.length ,0, {
        label: item.extraName,
        n: item.extraSn,
        name: item.extraName,
      });
      item.label = '';
      item.extraSn = '';
      item.extraName = '';
      itemMain.extraCount--;
    },
    selTreeItem(data, itemMainDD, item, itemMain){
      let deviceList = JSON.parse(JSON.stringify(itemMainDD));
      if(item.extraName != ""){
        itemMainDD.splice(itemMainDD.length ,0, {
          label: item.extraName,
          n: item.extraSn,
          name: item.extraName,
        });
        itemMain.extraCount--;
      }
      item.extraSn = data.n;
      item.extraName = data.label;
      item.label = data.label;
      for (let i = 0; i < deviceList.length; i++){
        if (data.n == deviceList[i].n){
          itemMainDD.splice(i,1);
        }
      }
      itemMain.extraCount++;
      item.visible = false;
    },
    selTreeBottomItem(data, node, self, deviceBottomList, mainIndex, item, itemIndex){
      let deviceList = JSON.parse(JSON.stringify(deviceBottomList));
      // if(item.extraName != ""){
      //   itemMainDD.splice(itemMainDD.length ,0, {
      //     label: item.extraName,
      //     n: item.extraSn,
      //     name: item.extraName,
      //   });
      //   itemMain.extraCount--;
      // }
      // item.extraSn = data.n;
      // item.extraName = data.label;
      // item.label = data.label;
      // for (let i = 0; i < deviceList.length; i++){
      //   if (data.n == deviceList[i].n){
      //     itemMainDD.splice(i,1);
      //   }
      // }
      // itemMain.extraCount++;

      //this.deviceBottomList[] = '';
      this.drawerBottomDialogVisible = false;
    },
    editDeviceName(event, item){

    },
    cancelEditPop(event, item, index){
      item.name = item.nickname;
      item.editVisible = false;
    },
    saveEditPop(event, item, index){
      item.name = item.name;
      item.nickname = item.name;
      item.editVisible = false;
    },
    cancelTplSetConfig(){
      this.deviceTplData = [];
      this.deviceBottomList = [];
      this.tplSetDeviceVisible = false;
    },
    okTplSetConfig(){
      let num = 0;
      let deviceSetCount = 0;
      let deviceListCount = 0;
      this.deviceSetCount = 0;
      for (let i = 0; i < this.deviceTplData.length; i++){
        if (this.deviceTplData[i].extraCount <= 0){
          num++;
          break;
        }
        deviceListCount += this.deviceTplData[i].d.length;
        deviceSetCount += this.deviceTplData[i].extraCount;
      }
      if (num > 0){
        MessageCommonTips(this, this.$t("有未设置的设备,请设置！"), 'warning');
        return;
      }
      this.deviceSetCount = deviceSetCount;
      this.deviceListCount = deviceListCount;
      this.deviceTplBakData = JSON.parse(JSON.stringify(this.deviceTplData));
      this.tplSetDeviceVisible = false;
    },
    saveTplSetConfig(){
      let dataObj = [];
      let data = [];
      let dataExtraJSon = [];
      let dataIndex = 0;
      let errorCount = 0;
      let params = {
        tplName: this.formTpl.tplName,
        tplOpen: this.formTpl.tplOpen,
        tplType: this.formTpl.tplType,
        tplDesc: this.formTpl.tplDesc
      };

      if (this.formTpl.id == "" || this.formTpl.id == undefined){
        let sourceData = this.formTpl.tplSource.tasks;
        let dArr = [];
        let sourceDataExtra = [];
        let dataJSon = {};
        let sourceIndex = 0;
        let sourceKeyIndex = 0;

        if (this.formTpl.tplName == ""){
          MessageCommonTips(this, this.$t("请输入模版名称"), 'warning');
          return;
        }
        if (this.deviceSetCount != this.deviceListCount){
          MessageCommonTips(this, this.$t("请编辑设备名称"), 'warning');
          return;
        }

        //console.log(this.deviceTplData);
        for (let i = 0; i < this.deviceTplData.length; i++){
          let extraT = this.deviceTplData[i]['t'];
          let extraD = this.deviceTplData[i]['d'];
          let dataObj = {};
          let dataArr = [];

          if (errorCount > 0){
            break;
          }

          for (let j = 0; j < extraD.length; j++){
            if (extraD[j]['extraSn'] == "" || extraD[j]['extraSn'] == undefined){
              errorCount++;
              break;
            }
            dataIndex++;
            let key = '$'+dataIndex;
            dataObj[key] = extraD[j]['name'];
            dataArr.push(dataObj);

            dataExtraJSon.push({
              key: key,
              sn: extraD[j]['extraSn']
            });
          }

          if (extraT == 1){
            dataJSon['light'] = dataObj;
          }else if (extraT == 2){
            dataJSon['switch'] = dataObj;
          }else if (extraT == 3){
            dataJSon['curtains'] = dataObj;
          }else if (extraT == 5){
            dataJSon['music'] = dataObj;
          }
        }

        params['tplAbstract'] = JSON.stringify(dataJSon);

        for (let i = 0; i < sourceData.length; i++){
          let d = sourceData[i].d;
          let extraT = sourceData[i].t;
          sourceDataExtra.push({
            i: sourceData[i].i,
            n: sourceData[i].n,
            t: sourceData[i].t,
            d: []
          });
          for (let j = 0; j < d.length; j++){
            if (dArr.indexOf(d[j]) == -1){
              dArr.push(d[j]);
            }
          }
          //console.log(dArr);
          for (let j = 0; j < d.length; j++){
            let key = "";
            // if (dArr.indexOf(d[j]) == -1){
            //   sourceIndex++;
            //   sourceKeyIndex = sourceIndex;
            // }else{
            //   sourceKeyIndex = dArr.indexOf(d[j]) + 1;
            // }

            for (let k = 0; k < dataExtraJSon.length; k++){
              if (d[j] == dataExtraJSon[k].sn){
                key = dataExtraJSon[k].key;
              }
            }

            //sourceDataExtra[i]['d'].push("$"+sourceKeyIndex);
            sourceDataExtra[i]['d'].push(key);
          }
        }
        params['tplSource'] = JSON.stringify(sourceDataExtra);
      }

      if (errorCount > 0){
        MessageCommonTips(this, this.$t("有未设置的设备位置,请设置！"), 'warning');
        return;
      }

      if (this.formTpl.id != "" || this.formTpl.id != undefined){
        params['tplId'] = this.formTpl.id;
      }

      params = this.$qs.stringify(params);
      let url = (this.formTpl.id == "" || this.formTpl.id == undefined) ? common.createTplInfo : common.editTplInfo;
      this.configLoading = true;
      this.$axios.post(this.baseUrl + url, params, {sessionId: this.sessionId, userKey: this.userKey, loading: false}).then(res => {
        if (res.data.code == 200){
          this.$refs.tplList.initTplData(null, this.$refs.tplList.listType);
          this.drawerCreateTplVisible = false;
          this.tplSetDeviceVisible = false;
          MessageCommonTips(this, res.data.msg, 'success');
        }else {
          MessageCommonTips(this, res.data.msg, 'error');
        }
        this.configLoading = false;
      });
    }
  }
}
</script>

<style scoped>
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
.drawerBottomDialogContent{
  position: absolute;
  top: 45px;
  left: 0px;
  width: 100%;
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
</style>

<template>
  <div>
    <el-drawer
      title="场景设置"
      custom-class="drawer-list"
      :show-close="false"
      :modal="true"
      :size="dialogListSize"
      :wrapperClosable="false"
      :visible.sync="drawerListVisible"
      :direction="direction">

      <div slot="title">
        <div class="block-list-header">
          <el-row>
            <el-col :span="6">
              <span v-if="this.appType != 'app'">
                <el-button size="mini" type="error" @click="logout()">{{$t("退出")}}</el-button>
              </span>
              <span v-else>
                &nbsp;
              </span>
            </el-col>
            <el-col :span="18" class="textRight">
              <el-button size="mini" type="error" @click="selEnvList()" v-if="this.appType != 'app'">{{$t("场所列表")}}</el-button>
              <el-button size="mini" type="success" @click="selEnvTplList()">{{$t("模版列表")}}</el-button>
              <el-button size="mini" type="warning" @click="createSence()">{{$t("创建场景")}}</el-button>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="marginTop10">
        <el-empty v-if="data.length == 0" :description="$t('暂无数据')"></el-empty>
        <div v-else v-for="(item, index) in data" class="block-list-content-item marginBottom10" @click="selSence($event, item, 'menu')">
          <el-row>
            <el-col :span="6">
              <div class="textLeft">
                <div class="marginTop10 fontBold">{{ item.sceneName }}</div>
                <div class="marginTop5 font-size-12">
                  <img :src="require(`~/static/img/${item.roomId}.png`)" style="height: 20px; width: 20px;">
                  <label style="position: relative; top: -6px;">{{ getGlobalRoomObj(item.roomId) }}</label>
                </div>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="textRight marginTop10" style="position: relative">
                <!--                <span class="color-666666">{{ $moment(item.lastTime).format("yyyy-MM-DD") }}</span>-->
                <span class="color-warning" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 70px;text-align: center" @click.stop="createTplOpr($event, item)">
                  {{ $t("创建模版") }}
                </span>
                <span class="color-success" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 40px;text-align: center" @click.stop="updateSenceOpr($event, item)">
                  {{ $t("修改") }}
                </span>
                <span class="color-error" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 40px;text-align: center" @click.stop="removeSenceOpr($event, item)">
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
    >
    </tpl-list-dialog>

    <el-drawer
      title="场景设置"
      custom-class="drawer-opr"
      :show-close="false"
      :modal="true"
      :size="dialogListSize"
      :wrapperClosable="false"
      :visible.sync="drawerCreateTplVisible"
      direction="rtl"
      @closed="closeTplOprDrawer">

      <div slot="title">
        <div class="block-opr-header">
          <el-row>
            <el-col :span="4" class="textLeft">
              <el-button size="mini" @click="cancelTplConfig">{{$t("取消")}}</el-button>
            </el-col>
            <el-col :span="16" class="textCenter">
              <span>{{$t("创建模版")}}</span>
            </el-col>
            <el-col :span="4" class="textRight">
              <el-button v-if="configLoading == false" size="mini" type="warning" @click="saveTplConfig">
                {{$t("保存")}}
              </el-button>
              <el-button size="mini" type="warning" v-if="configLoading == true">
                <i class="fa fa-spinner fa-spin" v-if="configLoading == true"></i>
                {{$t("保存")}}
              </el-button>
            </el-col>
          </el-row>
        </div>
      </div>

      <div>
        <el-form class="netmoon-form-dialog padding-tb10-lr20" label-width="80px" ref="formTpl" :model="formTpl">
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
          <el-form-item label="模版描述" v-model="formTpl.tplDesc" class="netmoon-form-item-border-dialog">
            <el-input type="textarea" :rows="5" :placeholder="$t('请输入模版描述')" v-model="formTpl.tplDesc"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import mixins from "../mixins/mixins";
import TplListDialog from "./TplListDialog";
import {common} from "../utils/api/url";
import {MessageError, MessageSuccess, MessageWarning} from "../utils/utils";

export default {
  components: {TplListDialog},
  mixins: [ mixins ],
  props: {
    data: Array,
    direction: String,
    dialogListSize: String,
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
      dialogNormalVisible: false,
      roomObj: {},
      drawerTplVisible: false,
      drawerCreateTplVisible: false,
      configLoading: false,
      role: '',
      formTpl:{
        id: '',
        tplName: '',
        tplOpen: false,
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
      this.drawerTplVisible = true;
    },
    createSence(){
      this.$emit('createSence');
    },
    selSence(event, item, type){
      this.$emit('selSence', event, item, type);
    },
    async createTplOpr(event, item){
      await this.getSourceUrl(item.sourceUrl);
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
    },
    cancelTplConfig(){
      this.drawerCreateTplVisible = false;
    },
    saveTplConfig(){
      if (this.formTpl.tplName == ""){
        MessageWarning(this.$t("请输入模版名称"));
        return;
      }

      let params = {
        tplName: this.formTpl.tplName,
        tplOpen: this.formTpl.tplOpen,
        tplType: this.formTpl.tplType,
        tplDesc: this.formTpl.tplDesc,
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
        console.log(sourceDataExtra);
        params['tplSource'] = JSON.stringify(sourceDataExtra);
      }

      if (this.formTpl.id != "" || this.formTpl.id != undefined){
        params['tplId'] = this.formTpl.id;
      }

      params = this.$qs.stringify(params);

      let url = (this.formTpl.id == "" || this.formTpl.id == undefined) ? common.createTplInfo : common.editTplInfo;
      this.configLoading = true;
      this.$axios.post(this.baseUrl + url, params, {sessionId: this.sessionId, loading: false}).then(res => {
        if (res.data.code == 200){
          this.$refs.tplList.initTplData(null, this.$refs.tplList.listType);
          this.drawerCreateTplVisible = false;
          MessageSuccess(res.data.msg);
        }else {
          MessageError(res.data.msg);
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
      this.drawerCreateTplVisible = true;
    }
  }
}
</script>

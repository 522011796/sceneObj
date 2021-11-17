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
      @opened="initTplData($event, 2)">

      <div slot="title">
        <div class="block-list-header" style="text-align: center">
          <el-button-group>
            <el-button size="mini" :type="listType == 2 ? 'success' : 'default'" @click="initTplData($event, 2)">我的模版</el-button>
            <el-button size="mini" :type="listType == 1 ? 'success' : 'default'" @click="initTplData($event, 1)">系统模版</el-button>
          </el-button-group>
        </div>
      </div>

      <div class="marginTop10">
        <div v-for="(item, index) in data" class="block-list-content-item marginBottom10" @click="selSence($event, item, 'menu')">
          <el-row>
            <el-col :span="6">
              <div class="textLeft">
                <div class="marginTop10 fontBold">{{ item.tplName }}</div>
                <div class="marginTop5 font-size-12">
                  <label style="position: relative; top: 0px;">{{ item.tplDesc }}</label>
                </div>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="textRight marginTop10" style="position: relative">
                <div v-if="role == 'ROLE_ADMIN'">
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
                <div v-else>
                  <span class="color-warning" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 40px;text-align: center" @click.stop="useTplOpr($event, item)">
                    {{ $t("使用") }}
                  </span>
                  <span class="color-success" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;line-height: 40px; width: 40px;text-align: center" @click.stop="updateTplOpr($event, item)">
                    {{ $t("修改") }}
                  </span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-drawer>

    <!--提示-->
    <alert-message-dialog :alert-message-tips="alertMessageTips" :timer="timer" :dialog-visible="dialogVisible" @cancel="cancelOpr" @okClick="saveOpr" @changeDrawer="closeAlertDialog"></alert-message-dialog>

  </div>
</template>

<script>
import mixins from "../mixins/mixins";
import {common} from "../utils/api/url";
import {MessageWarning} from "../utils/utils";
import AlertMessageDialog from "./AlertMessageDialog";

export default {
  components: {AlertMessageDialog},
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
      dialogVisible: false,
      item: '',
      role: '',
    }
  },
  methods: {
    initTplData(event, type){
      let params = {
        tplType: type
      };
      this.listType = type;
      this.$axios.get(this.baseUrl + common.queryTplInfoList, {params: params, sessionId: this.sessionId}).then(res => {
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
      this.$axios.get(this.baseUrl + common.queryTplInfo, {params: params, sessionId: this.sessionId}).then(res => {
        if (res.data.code == 200){
          console.log(JSON.parse(res.data.data.tplSource));
        }else {
          MessageWarning(res.data.msg);
        }
      });
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
    }
  }
}
</script>

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
            <el-col :span="12">
              <span v-if="this.appType != 'app'">
                <el-button size="mini" type="error" @click="logout()">{{$t("退出")}}</el-button>
              </span>
              <span v-else>
                &nbsp;
              </span>
            </el-col>
            <el-col :span="12" class="textRight">
              <el-button size="mini" type="error" @click="selEnvList()" v-if="this.appType != 'app'">{{$t("场所列表")}}</el-button>
              <el-button size="mini" type="warning" @click="createSence()">{{$t("创建场景")}}</el-button>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="marginTop10">
        <div v-for="(item, index) in data" class="block-list-content-item marginBottom10" @click="selSence($event, item, 'menu')">
          <el-row>
            <el-col :span="14">
              <div class="textLeft">
                <div class="marginTop10 fontBold">{{ item.sceneName }}</div>
                <div class="marginTop5 font-size-12">
                  <img :src="require(`~/static/img/${item.roomId}.png`)" style="height: 20px; width: 20px;">
                  <label style="position: relative; top: -6px;">{{ getGlobalRoomObj(item.roomId) }}</label>
                </div>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="textRight marginTop20" style="position: relative">
                <!--                <span class="color-666666">{{ $moment(item.lastTime).format("yyyy-MM-DD") }}</span>-->
                <span class="color-success" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;width: 40px;text-align: center" @click.stop="updateSenceOpr($event, item)">
                  {{ $t("修改") }}
                </span>
                <span class="color-error" style="display: inline-block;position: relative; top: 0px; cursor: default; height: 40px;width: 40px;text-align: center" @click.stop="removeSenceOpr($event, item)">
<!--                  <i class="fa fa-trash font-size-20 marginLeft10 color-error" style="position: relative; top: 9px;"></i>-->
                  {{ $t("删除") }}
                </span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import mixins from "../mixins/mixins";

export default {
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
    this.initRoomData();
  },
  data() {
    return {
      dialogNormalVisible: false,
      roomObj: {},
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
    createSence(){
      this.$emit('createSence');
    },
    selSence(event, item, type){
      this.$emit('selSence', event, item, type);
    },
    updateSenceOpr(event, item){
      this.$emit('updateSenceOpr', event, item);
    },
    removeSenceOpr(event, item){
      this.$emit('removeSenceOpr', event, item);
    },
    getGlobalRoomObj(val){
      return this.roomObj[val];
    }
  }
}
</script>

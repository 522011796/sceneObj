<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="drawer_"
      custom-class="alert-class"
      top="30vh"
      width="300px"
      @close="closeDialog">
      <div slot="title">
        <div class="alertHeader">
          <div class="alertTitle">
            <span>分享模版</span>
          </div>
        </div>
      </div>
      <div class="alertContent">
        <div>
          <el-input v-model="account" :placeholder="$t('请输入分享的账号信息')"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-row>
            <el-col :span="12">
              <div class="alertFooterClass alertFooterSpanRightBorder">
                <span class="alertFooterSpan" @click="cancelOpr()">
                  取 消
                </span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="alertFooterClass">
                <span class="alertFooterSpan" @click="saveOpr()">
                  <i class="fa fa-spinner fa-spin" v-if="timer != null"></i>
                  <label>确 定</label>
                </span>
              </div>
            </el-col>
          </el-row>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    alertMessageTips: {
      type: String,
      default: ''
    },
    timer: {
      type: [Number, String],
      default: null
    }
  },
  computed: {
    drawer_:{
      get(){
        return this.dialogVisible
      },
      set(v){
        this.$emit("changeDrawer",v)
      }
    }
  },
  mounted() {
    this.dialogNormalVisible = this.dialogVisible;
  },
  data() {
    return {
      dialogNormalVisible: false,
      account: ''
    }
  },
  methods: {
    saveOpr(){
      this.$emit('okClick', this.account);
    },
    cancelOpr(data){
      this.$emit('cancel', data);
    },
    closeDialog(){
      this.$emit('close');
    }
  }
}
</script>

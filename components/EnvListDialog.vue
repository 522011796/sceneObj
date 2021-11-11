<template>
  <div>
    <el-drawer
      title="场景设置"
      custom-class="drawer-list"
      :show-close="true"
      :modal="true"
      :size="dialogEnvSize"
      :wrapperClosable="false"
      :visible.sync="drawerEnvVisible"
      :direction="direction">

      <div slot="title">
        <div class="block-list-header">
          <el-row>
            <el-col :span="12">
              <span>{{$t("场所列表")}}</span>
            </el-col>
            <el-col :span="12" class="textRight">

            </el-col>
          </el-row>
        </div>
      </div>

      <div class="marginTop10">
        <div>
          <div v-for="(item, index) in data" :key="index" class="block-list-content-item marginBottom10" @click="selEnv($event, item)">
            <el-row>
              <el-col :span="16">
                <div class="textLeft">
                  <div class="marginTop10 fontBold">{{ item.envName }}</div>
                  <div class="marginTop5">{{ item.envKey }}</div>
                </div>
              </el-col>
              <el-col :span="8">

              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    direction: String,
    dialogEnvSize: String,
    drawerEnvVisible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.dialogNormalVisible = this.drawerEnvVisible;
  },
  data() {
    return {
      dialogNormalVisible: false
    }
  },
  methods: {
    selEnv(event, item){
      this.$emit('click', event, item);
    }
  }
}
</script>

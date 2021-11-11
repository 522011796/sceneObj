<template>
  <div>
    <div class="index-pop-item" @click="changeCustomBottomSwitchKeyOprType($event, 0)">
      <el-row>
        <el-col :span="20">
          <div class="textLeft">
            <span>{{$t("释放")}}</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="textRight" v-if="form.keyOpr === 0">
            <span><i class="fa fa-check-circle color-success"></i></span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="index-pop-item" @click="changeCustomBottomSwitchKeyOprType($event, 1)">
      <el-row>
        <el-col :span="20">
          <div class="textLeft">
            <span>{{$t("按下")}}</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="textRight" v-if="form.keyOpr === 1">
            <span><i class="fa fa-check-circle color-success"></i></span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {keyType, openType, orderColor, orderValue, outEditTypeObj, outTypeObj} from "../utils/utils";

export default {
  props: {
    form: Object
  },
  data() {
    return {}
  },
  methods: {
    changeCustomBottomSwitchKeyOprType(event, type){
      this.$emit('click', event, type);
    }
  }
}
</script>

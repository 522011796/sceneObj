<template>
  <div>
    <div class="index-pop-item">
      <el-row>
        <el-col :span="20">
          <div class="textLeft">
            <span>{{$t("断电")}}</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="textRight">
            <span><i class="fa fa-check-circle color-success"></i></span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="index-pop-item">
      <el-row>
        <el-col :span="20">
          <div class="textLeft">
            <span>{{$t("通电")}}</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="textRight">
            <span></span>
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
    setChildBottomType: String
  },
  data() {
    return {}
  },
  methods: {
    changeCustomBottomType(event, type){
      this.$emit('click', event, type);
    }
  }
}
</script>

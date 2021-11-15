<template>
  <div>
    <div class="index-pop-item" @click="changeCustomBottomType($event, 1)">
      <span>{{$t("开/关灯控制")}}</span>
    </div>
    <div class="index-pop-item" @click="changeCustomBottomType($event, 2)">
      <span>{{$t("亮度控制")}}</span>
    </div>
    <div class="index-pop-item" @click="changeCustomBottomType($event, 3)">
      <span>{{$t("色温控制")}}</span>
    </div>
    <div class="index-pop-item" @click="changeCustomBottomType($event, 4)">
      <span>{{$t("色彩控制")}}</span>
    </div>
    <div v-if="setChildBottomType != 'lightGroupSub'" class="index-pop-item" @click="changeCustomBottomType($event, 7)">
      <span>{{$t("循环操作")}}</span>
    </div>
    <div v-if="setChildBottomType != 'lightSub'" class="index-pop-item" @click="changeCustomBottomType($event, 8)">
      <span>{{$t("电源控制(勿与循环操作一起使用)")}}</span>
    </div>
<!--    <div class="index-pop-item" @click="changeCustomBottomType($event, 5)">-->
<!--      <span>{{$t("场景调用(勿使用2级以上嵌套)")}}</span>-->
<!--    </div>-->
    <div class="index-pop-item" @click="changeCustomBottomType($event, 6)">
      <span>{{$t("延时")}}</span>
    </div>
    <div class="index-pop-item" @click="changeCustomBottomType($event, 9)">
      <span>{{$t("空闲时段")}}</span>
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

<template>
  <div>
    <div class="index-pop-item" @click="changeCustomBottomSwitchType($event, 11)">
      <span>{{$t("按键操作")}}</span>
    </div>
    <div class="index-pop-item" @click="changeCustomBottomSwitchType($event, 6)">
      <span>{{$t("延时")}}</span>
    </div>
    <div class="index-pop-item" @click="changeCustomBottomSwitchType($event, 9)">
      <span>{{$t("空闲时段")}}</span>
    </div>
  </div>
</template>

<script>
import {keyType, openType, orderColor, orderValue, outEditTypeObj, outTypeObj} from "../utils/utils";

export default {
  props: {

  },
  data() {
    return {}
  },
  methods: {
    changeCustomBottomSwitchType(event, type){
      this.$emit('click', event, type);
    }
  }
}
</script>

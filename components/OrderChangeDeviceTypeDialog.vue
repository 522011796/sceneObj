<template>
  <div>
    <div class="index-pop-item" @click="changeCustomBottomChangeDeviceType($event, 18)">
      <span>{{$t("发送串行器数据")}}</span>
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
    changeCustomBottomChangeDeviceType(event, type){
      this.$emit('click', event, type);
    }
  }
}
</script>

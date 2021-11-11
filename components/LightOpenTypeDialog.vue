<template>
  <div>
    <div class="index-pop-item" @click="changeCustomBottomOpen($event, 1)">
      <span>{{$t("开灯")}}</span>
    </div>
    <div class="index-pop-item" @click="changeCustomBottomOpen($event, 0)">
      <span>{{$t("关灯")}}</span>
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
    changeCustomBottomOpen(event, type){
      this.$emit('click', event, type);
    }
  }
}
</script>

<template>
  <div>
    <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 10)">
      <span>{{$t("行程控制")}}</span>
    </div>
    <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 3)">
      <span>{{$t("循环操作")}}</span>
    </div>
<!--    <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 4)">-->
<!--      <span>{{$t("场景调用(勿使用2级以上嵌套)")}}</span>-->
<!--    </div>-->
    <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 2)">
      <span>{{$t("延时")}}</span>
    </div>
    <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 1)">
      <span>{{$t("空闲时间")}}</span>
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
    changeCustomBottomCurtainsType(event, type){
      this.$emit('click', event, type);
    }
  }
}
</script>

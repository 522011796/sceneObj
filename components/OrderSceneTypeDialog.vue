<template>
  <div>
    <div class="index-pop-item" @click="changeSceneBottomCurtainsType($event, 3)">
      <span>{{$t("循环操作")}}</span>
    </div>
    <div class="index-pop-item" @click="changeSceneBottomCurtainsType($event, 4)">
      <span>{{$t("场景调用(勿使用2级以上嵌套)")}}</span>
    </div>
    <div class="index-pop-item" @click="changeSceneBottomCurtainsType($event, 2)">
      <span>{{$t("延时")}}</span>
    </div>
    <div class="index-pop-item" @click="changeSceneBottomCurtainsType($event, 1)">
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
    changeSceneBottomCurtainsType(event, type){
      this.$emit('click', event, type);
    }
  }
}
</script>

<template>
  <div>
    <div class="index-pop-item" @click="changeCustomBottomMusicType($event, 13)">
      <span>{{$t("音乐播放")}}</span>
    </div>
    <div class="index-pop-item" @click="changeCustomBottomMusicType($event, 14)">
      <span>{{$t("音乐暂停")}}</span>
    </div>
    <div class="index-pop-item" @click="changeCustomBottomMusicType($event, 12)">
      <span>{{$t("音乐音量")}}</span>
    </div>
    <div class="index-pop-item" @click="changeCustomBottomMusicType($event, 15)">
      <span>{{$t("音乐进度")}}</span>
    </div>
    <div class="index-pop-item" @click="changeCustomBottomMusicType($event, 2)">
      <span>{{$t("延时")}}</span>
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
    changeCustomBottomMusicType(event, type){
      this.$emit('click', event, type);
    }
  }
}
</script>

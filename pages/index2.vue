<template>
  <div>
    <SketchRule
      :lang="lang"
      :thick="thick"
      :scale="scale"
      :width="582"
      :height="482"
      :startX="startX"
      :startY="startY"
      :horLineArr="lines.h"
      :verLineArr="lines.v"
      :cornerActive="true"
    >
    </SketchRule>
  </div>
</template>

<script>
export default {
  layout: 'defaultFull',
  data(){
    return {
      scale: 2, //658813476562495, //1,
      startX: 0,
      startY: 0,
      lines: {
        h: [100, 200],
        v: [100, 200]
      },
      thick: 20,
      lang: "zh-CN",
      isShowRuler: true,
      isShowReferLine: true,
      mainStyle: {
        'height': '',
        'overflow-y': 'auto'
      },
      mainTop: {
        'top': '',
      }
    }
  },
  components: {

  },
  created() {
    this.hh();
  },
  methods:{
    hh(){
      if (process.browser) {
        let screenWidth = window.innerWidth;
        this.mainStyle.height = window.innerHeight-80 + 'px';
        this.mainTop.top = window.innerHeight-80 + 'px';
      }
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
<!--    <div style="position: relative;height: 100%; width: 100%; background: #000000">-->
<!--      <div v-for="n in 10">-->
<!--        222333-->
<!--      </div>-->
<!--    </div>-->
    <div style="position: fixed;bottom: 0;width: 100%; height: 40px; background: #dddddd;color: #434343">
      45454545
    </div>
  </div>
</template>

<script>
export default {
  layout: 'defaultFull',
  data(){
    return {
      mainStyle: {
        'height': '',
        'overflow-y': 'auto'
      },
      mainTop: {
        'top': '',
      }
    }
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

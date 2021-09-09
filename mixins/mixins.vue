<script>
    export default {
      name: "mixins",
      data(){
        return {
          minxinsScroll: false,
        }
      },
      methods: {
        changeFlag(flag) {
          this.minxinsScroll = flag;
        }
      }
    }
</script>

<style scoped>

</style>

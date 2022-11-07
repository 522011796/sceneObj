<template>
  <div>
    <div v-for="(item, index) in 10">
      <div :style="{width: source.size + 'px'}" style="text-align: center;background: #ddd;color: #FFFFFF;height: 40px;line-height: 40px" @click="showDialog">
        {{source.row}}--{{source.id}}
      </div>
    </div>

    <el-drawer
      title="我是外面的 Drawer"
      :visible.sync="drawerTest"
      size="50%">
      <div>
        <span>111</span>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  props: {
    source: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data(){
    return {
      drawerTest: false,
    }
  },
  methods:{
    showDialog(){
      console.log(1,this.source);
      this.drawerTest = true;
    }
  }
}
</script>

<style scoped>
.item{
  height: 40px;
  line-height: 40px;
}
</style>

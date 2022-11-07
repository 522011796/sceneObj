<template>
  <div>
    <el-tree ref="treeDevice" accordion empty-text="" :data="data" @node-click="(data, node, self) => selTreeItem(data, node, self, itemMain.dd, item, itemMain)">
                          <span class="custom-tree-node" slot-scope="{ node, data }">
                            <label class="font-size-12">{{ data.label }}</label>
                            <label class="font-size-12 color-disabled">({{ data.n }})</label>
                          </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    direction: String,
    dialogRoomSize: String,
    drawerRoomVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    drawer_:{
      get(){
        return this.drawerRoomVisible
      },
      set(v){
        this.$emit("changeDrawer",v)
      }
    }
  },
  mounted() {
    this.dialogNormalVisible = this.drawerRoomVisible;
  },
  data() {
    return {
      dialogNormalVisible: false
    }
  },
  methods: {
    selTreeItem(data, node, self, dd, item, itemMain){
      this.$emit('click', data, node, self, dd ,item, itemMain);
    }
  }
}
</script>

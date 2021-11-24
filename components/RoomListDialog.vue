<template>
  <div>
    <el-drawer
      title="场景设置"
      custom-class="drawer-list"
      :show-close="true"
      :modal="true"
      :size="dialogRoomSize"
      :wrapperClosable="false"
      :visible.sync="drawer_"
      :direction="direction">

      <div slot="title">
        <div class="block-list-header">
          <el-row>
            <el-col :span="12">
              <span>{{$t("房间列表")}}</span>
            </el-col>
            <el-col :span="12" class="textRight">
              <!--              <el-button size="mini" type="warning" @click="createSence()">{{$t("创建场景")}}</el-button>-->
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="marginTop10">
        <el-row :gutter="10">
          <el-col :span="8" class="textCenter" v-for="(item, index) in data" :key="index">
            <div class="room-Block-Item" @click="selRoomItem($event, item)">
              <div class="marginTop10">
                <img v-if="item.id" :src="require(`~/static/img/${item.icon}.png`)" style="height: 50px; width: 50px;">
              </div>
              <div class="marginTop5">
                {{ item.name }}
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
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
    selRoomItem(event, item){
      this.$emit('click', event, item);
    }
  }
}
</script>

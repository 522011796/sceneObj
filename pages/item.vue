<template>
  <div class="">
    <div>
<!--      <virtual-list class="list-horizontal"-->
<!--                          :data-key="'id'"-->
<!--                          :data-sources="source.list"-->
<!--                          :data-component="itemComponent"-->
<!--                          :estimate-size="52"-->
<!--                          :keeps="100"-->
<!--                          :wrap-class="'wrapper'"-->
<!--                          :item-class="'list-item-horizontal'"-->
<!--      />-->
    </div>
  </div>
</template>
<script>
import ItemH from "./itemH";
import VirtualList from "vue-virtual-scroll-list";
export default {
  components: {VirtualList},
  props: {
    source: {
      type: Object,
      default () {
        return {

        }
      }
    }
  },
  data(){
    return {
      itemComponent: ItemH,
    }
  },
  methods:{

  }
}
</script>

<style scoped>
</style>

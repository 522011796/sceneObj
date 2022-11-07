<template>
  <div>
    <div class="demoRuleChildClass" v-for="(itemBlock, indexBlock) in item" :key="itemBlock.id"
         v-if="item.length > 0 && (itemBlock.i == 1 || itemBlock.i == 2 || itemBlock.i == 3 || itemBlock.i == 4)"
         :style="{
                        'background': orderColorInfo(itemBlock.i),
                        //'width': itemBlock.secLoop ? itemBlock.secLoop / 1000 * ruleDefaultWith +'px' : itemBlock.sec / 1000 * ruleDefaultWith +'px',
                        'width': itemBlock.width +'px',
                        'height':'40px',
                        'color': itemBlock.i == 1 ? '#ffffff' : '#555555',
                        'position': 'relative'
                      }"
    >

      <v-touch v-on:tap="ruleLineStatus == true ? '' : selBlock($event, item, index, itemBlock, indexBlock)" style="height: 100%;width:100%;">
        <el-popover
          popper-class="indexPopVisible"
          v-model="itemBlock.popVisible"
          placement="bottom"
          trigger="manual"
          width="240">
          <div class="font-size-10">
            <order-list-pop-child-dialog :item-block="itemBlock" :item="item"></order-list-pop-child-dialog>
          </div>
          <v-touch  v-on:tap="ruleLineStatus == true ? selRuleLine($event, item, index, itemBlock, indexBlock) : ''" v-on:press="ruleLineStatus == true ? '' : selPressBlock($event, item, index, itemBlock, indexBlock)" slot="reference" style="height: 100%; width: 100%; user-select: none;position: relative" ref="blockItemRef">
            <div>
              <div class="moon-ellipsis-class index-main-item-block font-size-12">
                      <span v-if="(itemBlock.i == 1 || itemBlock.i == 2 && (itemBlock.i != 3 || itemBlock.i != 4)) && (!itemBlock.list || itemBlock.list.length == 0)"
                            :class="itemBlock.i == 1 ? 'color-ffffff' : 'color-434343'"
                      >
                        {{ orderValueInfo(itemBlock.i, 'set') }}
                        <div class="moon-ellipsis-class font-size-10 color-F2F6FC marginTop2">
                          {{format(itemBlock.timeCount)}}---{{itemBlock.id}}
                        </div>
                      </span>
                <span v-if="(itemBlock.i == 3) && (!itemBlock.list || itemBlock.list.length == 0)" class="color-434343 font-size-12">
                        <label v-if="itemBlock.t > 0">
                          {{ orderValueInfo(itemBlock.i, 'set') }}
                          <div class="moon-ellipsis-class font-size-10 color-909399 marginTop2">
                            {{format(itemBlock.timeCount)}}
                          </div>
                        </label>
                        <label v-if="itemBlock.t == 0">{{ $t("无限循环") }}</label>
                      </span>
                <span v-if="(itemBlock.i == 4) && (!itemBlock.list || itemBlock.list.length == 0)" class="color-434343 font-size-12">
                        {{ itemBlock.n }}
                        <div v-if="itemBlock.sec != -1" class="moon-ellipsis-class font-size-10 color-F2F6FC marginTop2">
                          {{format(itemBlock.timeCount)}}
                        </div>
                        <label v-if="itemBlock.sec == -1" class="color-default">({{ $t("无限循环") }})</label>
                      </span>

                <span v-for="(itemList, indexList) in itemBlock.list" class="marginBottom2 pop-child-item font-size-12">
                        {{orderValueInfo(itemList.i, 'set')}}
                        <label v-if="indexList != itemBlock.list.length - 1"> | </label>

                        <div class="moon-ellipsis-class font-size-10 color-F2F6FC marginTop2">
                            {{format(itemBlock.timeCount)}}
                          </div>
                      </span>

                <div v-if="itemBlock.i == 3" size="mini" class="color-error font-size-12" style="position: absolute; right: 0px; top: 0px; height:15px; width: 15px; line-height: 15px;color: #ffffff">
                  <span v-if="itemBlock.t != 0">{{ itemBlock.t }}</span>
                  <span v-if="itemBlock.t === 0" class="font-size-14">∞</span>
                </div>

                <div v-if="itemBlock.i == 4" size="mini" class="color-error font-size-12" style="position: absolute; right: 0px; top: 0px; height:15px; width: 15px; line-height: 15px;color: #ffffff">
                  <span v-if="itemBlock.sec == -1" class="font-size-14">∞</span>
                </div>
              </div>
            </div>
          </v-touch>
        </el-popover>
      </v-touch>
    </div>
    <div class="demoRuleChildEmptyClass" style="height: 40px; width: 0px;display: inline-block;position: relative" v-if="item.length <= 0">
      <div>
        <div class="moon-ellipsis-class index-main-item-block">
          <span>&nbsp</span>
        </div>
      </div>
    </div>

    <div style="height: 40px;width: 0px;display: inline-block;" v-if="item.length > 0 && checkItemList(item,index)[1] <= 0">
      <span>&nbsp;</span>
    </div>
    <span :class="checkItemList(item,index)[1] > 0 ? 'index-plus-list-item' : 'index-plus-item'" :style="item.length <=0 ? {float:'left'} : {}">
      <div v-if="checkItemList(item,index)[0] > 0" @click="selBlock($event, item, index, null, null)" :class="checkItemList(item,index)[1] > 0 ? 'item-tips-list-block' : 'item-tips-block'">1+</div>

      <i class="fa fa-plus font-size-14" @click.stop="ruleLineStatus == true ? '' : setSence($event, item, index, 'lightSub')"></i>
    </span>
  </div>
</template>

<script>
import {keyType, openType, orderColor} from "../utils/utils";
import OrderListPopChildDialog from "./OrderListPopChildDialog";

export default {
  components: {OrderListPopChildDialog},
  props: {
    data: Array,
    item: Array
  },
  computed: {

  },
  mounted() {

  },
  data() {
    return {
      dialogNormalVisible: false
    }
  },
  methods: {
    keyTypeInfo(type){
      return keyType(type);
    },
    openTypeInfo(type){
      return openType(type);
    },
    orderColorInfo(type){
      return orderColor(type);
    }
  }
}
</script>

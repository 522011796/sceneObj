<template>
  <div>
    <el-popover
      placement="left"
      width="260"
      popper-class="pop-custom"
      trigger="click"
      v-model="customDrawBottomVisible">
      <div class="textCenter">
        <order-light-type-dialog :set-child-bottom-type="setChildBottomType" @click="changeCustomBottomType"></order-light-type-dialog>
      </div>
      <span slot="reference" size="mini">
        <label>{{formOrder.type == '' ? $t("请选择") : orderValueInfo(outTypeObjInfo(formOrder.type), 'set')}}</label>
        <label><i class="fa fa-chevron-right"></i></label>
      </span>
    </el-popover>
  </div>
</template>

<script>
import OrderLightTypeDialog from "./OrderLightTypeDialog";
import {keyType, openType, orderColor, orderValue, outEditTypeObj, outTypeObj} from "../utils/utils";
export default {
  components: {OrderLightTypeDialog},
  props: {
    setChildBottomType: String,
    formOrder: Object,
    customDrawBottomVisible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.dialogNormalVisible = this.customDrawBottomVisible;
  },
  data() {
    return {
      dialogNormalVisible: false
    }
  },
  methods: {
    changeCustomBottomType(event, type){
      this.$emit('click', event, type);
    },
    converArgbToRgb(argb){
      var rgb = [];
      rgb[0] = (argb & 0xff0000) >> 16;
      rgb[1] = (argb & 0xff00) >> 8;
      rgb[2] = (argb & 0xff);
      return "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
    },
    orderValueInfo(value, type){
      return orderValue(type, value);
    },
    outTypeObjInfo(type){
      return outTypeObj(type);
    },
    outEditTypeObjInfo(type){
      return outEditTypeObj(type);
    },
    keyTypeInfo(type){
      return keyType(type);
    },
    openTypeInfo(type){
      return openType(type);
    },
    orderColorInfo(type){
      return orderColor(type);
    },
    lightFormatTooltip(val){
      if (val){
        return val.toFixed(2) * 100 + "%";
      }
    },
    curtainsFormatTooltip(val){
      if (val){
        return val.toFixed(2) * 100 + "%";
      }
    }
  }
}
</script>

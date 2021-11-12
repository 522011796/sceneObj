<template>
  <span>
    <span v-if="item.i == 1" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-14">{{ $t("空闲") }}</label>

      <label>{{ item.v }}</label>
    </span>
    <span v-if="item.i == 2" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-14">{{ $t("延时") }}</label>

      <label>{{ item.v }}</label>
    </span>
    <span v-if="item.i == 3" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-14">{{ $t("循环") }}</label>

      <label>{{ $t("起始") }} {{ item.v + 1 }}</label>
      |
      <label>{{ $t("重复") }} {{ item.t === 0 ? '∞' : item.t }}</label>
    </span>

    <span v-if="item.i == 4" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-14">{{ $t("场景") }}</label>

      <label>{{ item.n }}</label>
    </span>
    <span v-if="item.i == 6" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-14">{{ openTypeInfo(item.v) }}</label>

      <label>{{ $t("渐变") }}: {{ item.t }}</label>
    </span>
    <span v-if="item.i == 7" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-14">{{ $t("亮度") }}</label>

      <label>{{ item.v * 100 }}%</label>
      |
      <label>{{ $t("渐变") }}: {{ item.t }}</label>
    </span>
    <span v-if="item.i == 8" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-14">{{ $t("色温") }}</label>

      <label>{{ item.v }}</label>
      |
      <label>{{ $t("渐变") }}: {{ item.t }}</label>
    </span>
    <span v-if="item.i == 9" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-14">{{ $t("色彩") }}</label>

      <span :style="{background:  converArgbToRgb(item.v) }" style="height: 10px; width: 10px;display: inline-block;position: relative; top: 1px;"></span>
      |
      <label>{{ $t("渐变时间") }}: {{ item.t }}</label>
    </span>

    <span v-if="item.i == 10" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-14">{{ $t("行程") }}</label>

      <label>{{ item.v * 100 }}%</label>
    </span>
    <span v-if="item.i == 11" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-14">{{ $t("继电器") }}</label>

      <label>
      <label v-for="(itemKey, indexKey) in item.v" :key="indexKey">{{ itemKey + 1 }}<template v-if="indexKey != item.v.length-1">,</template></label></label>
      |
      <label>{{ keyTypeInfo(item.s) }}</label>
  </span>
  </span>
</template>

<script>
import {keyType, openType, orderColor, orderValue, outEditTypeObj, outTypeObj} from "../utils/utils";

export default {
  props: {
    item: Object
  },
  data() {
    return {}
  },
  methods: {
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
    }
  }
}
</script>

<template>
  <span>
    <span v-if="item.i == 1" size="mini" class="font-size-12 color-default textLeft" style="position: relative;min-width: 100px;display: inline-block;">
      <label class="color-666666 font-size-12">{{ $t("空闲") }}</label>

      <label>{{ item.v }}</label>
      <div class="font-size-12 color-disabled marginTop5" style="position: absolute; left: 0; top: 10px;">
        <i class="fa fa-clock-o"></i> {{format(item.timeCount)}}
      </div>
    </span>
    <span v-if="item.i == 2" size="mini" class="font-size-12 color-default textLeft" style="position: relative;min-width: 100px;display: inline-block;">
      <label class="color-666666 font-size-12">{{ $t("延时") }}</label>

      <label>
        {{ item.v }}
      </label>
      <div class="font-size-12 color-disabled marginTop5" style="position: absolute; left: 0; top: 10px;">
        <i class="fa fa-clock-o"></i> {{format(item.timeCount)}}
      </div>
    </span>
    <span v-if="item.i == 3" size="mini" class="font-size-12 color-default textLeft" style="position: relative;min-width: 100px;display: inline-block;">
      <label class="color-666666 font-size-12">{{ $t("循环") }}</label>

      <label>{{ $t("起始") }} {{ item.v + 1 }}</label>
      |
      <label>{{ $t("重复") }} {{ item.t === 0 ? '∞' : item.t }}</label>

      <div class="font-size-12 color-disabled marginTop5" style="position: absolute; left: 0; top: 10px;">
        <i class="fa fa-clock-o"></i> {{format(item.timeCount)}}
      </div>
    </span>

    <span v-if="item.i == 4" size="mini" class="font-size-12 color-default textLeft" style="position: relative;min-width: 120px;display: inline-block;">
      <label class="color-666666 font-size-12">{{ $t("场景") }}</label>

      <label>{{ item.n }}</label>

      <div class="font-size-12 color-disabled marginTop5" style="position: absolute; left: 0; top: 10px;">
        <i class="fa fa-clock-o"></i> {{format(item.timeCount)}}
      </div>
    </span>
    <span v-if="item.i == 6" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-12" style="display: inline-block;vertical-align: middle;">{{ openTypeInfo(item.v) }}</label>

      <label class="moon-ellipsis-class" style="max-width: 100px;display: inline-block;vertical-align: middle;">{{ $t("渐变") }}: {{ item.t }}</label>
    </span>
    <span v-if="item.i == 7" size="mini" class="font-size-12 color-default">
      <label style="display: inline-block;vertical-align: middle;" class="color-666666 font-size-12">{{ $t("亮度") }}</label>

      <label style="display: inline-block;vertical-align: middle;">{{ item.v.toFixed(2) * 100 }}%</label>
      |
      <label class="moon-ellipsis-class" style="max-width: 80px;display: inline-block;vertical-align: middle;">{{ $t("渐变") }}: {{ item.t }}</label>
    </span>
    <span v-if="item.i == 8" size="mini" class="font-size-12 color-default">
      <label style="display: inline-block;vertical-align: middle;" class="color-666666 font-size-12">{{ $t("色温") }}</label>

      <label style="display: inline-block;vertical-align: middle;">{{ item.v }}</label>
      |
      <label class="moon-ellipsis-class" style="max-width: 80px;display: inline-block;vertical-align: middle;">{{ $t("渐变") }}: {{ item.t }}</label>
    </span>
    <span v-if="item.i == 9" size="mini" class="font-size-12 color-default">
      <label style="display: inline-block;vertical-align: middle;" class="color-666666 font-size-12">{{ $t("色彩") }}</label>

      <span :style="{background:  converArgbToRgb(item.v) }" style="height: 10px; width: 10px;display: inline-block;position: relative; top: 1px;vertical-align: middle"></span>
      |
      <label class="moon-ellipsis-class" style="max-width: 80px;display: inline-block;vertical-align: middle;">{{ $t("渐变") }}: {{ item.t }}</label>
    </span>

    <span v-if="item.i == 10" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-12">{{ $t("行程") }}</label>

      <label>{{ item.v.toFixed(2) * 100 }}%</label>
    </span>
    <span v-if="item.i == 11" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-12">{{ $t("继电器") }}</label>

      <label>
      <label v-for="(itemKey, indexKey) in item.v" :key="indexKey">{{ itemKey + 1 }}<template v-if="indexKey != item.v.length-1">,</template></label></label>
      |
      <label>{{ keyTypeInfo(item.s) }}</label>
    </span>
    <span v-if="item.i == 12" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-12">{{ $t("音量") }}</label>

      <label>{{ item.v.toFixed(2) * 100 }}%</label>
    </span>
    <span v-if="item.i == 13" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-12">{{ $t("名称") }}</label>

      <label>{{ item.v}}</label>
    </span>
    <span v-if="item.i == 14" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-12">{{ $t("暂停") }}</label>
    </span>
    <span v-if="item.i == 15" size="mini" class="font-size-12 color-default">
      <label class="color-666666 font-size-12">{{ $t("进度") }}</label>

      <label>{{ item.v}}秒</label>
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
    },
    format(seconds) {
      //var x = 1200
      var d = this.$moment.duration(seconds, 'milliseconds');
      var hours = Math.floor(d.asHours());
      var mins = Math.floor(d.asMinutes()) - hours * 60;
      var secs = Math.floor(d.asSeconds()) - mins * 60;
      var secss = Math.floor(d.asMilliseconds()) - secs * 1000;

      // let hour = Math.floor(seconds / 3600) >= 10 ? Math.floor(seconds / 3600) : '0' + Math.floor(seconds / 3600);
      // seconds -= 3600 * hour;
      // let min = Math.floor(seconds / 60) >= 10 ? Math.floor(seconds / 60) : '0' + Math.floor(seconds / 60);
      // seconds -= 60 * min;
      // let sec = seconds >= 10 ? seconds : '0' + seconds;

      hours = hours >= 10 ? hours : '0'+hours;
      mins = mins >= 10 ? mins : '0'+mins;
      secs = secs >= 10 ? secs : '0'+secs;
      return hours + ':' + mins + ':' + secs;
    }
  }
}
</script>

<template>
  <div>
    <div>
      <el-row>
        <el-col :span="10">
          {{$t("类型")}}:
        </el-col>
        <el-col :span="14">
          {{ orderValueInfo(itemBlock.i, 'set') }}
        </el-col>
      </el-row>
    </div>
    <div>
      <div v-if="itemBlock.i == 4">
        <div>
          <div>
            <el-row>
              <el-col :span="10">
                {{$t("场景名称")}}:
              </el-col>
              <el-col :span="14">
                {{ itemBlock.n }}
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="10">
                {{$t("循环次数")}}:
              </el-col>
              <el-col :span="14">
                <label v-if="itemBlock.sec == -1">{{ $t("无限循环") }}</label>
                <label v-if="itemBlock.sec != -1">{{ itemBlock.t }}</label>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div v-if="itemBlock.i == 2">
        <div>
          <el-row>
            <el-col :span="10">
              {{$t("延时时间")}}:
            </el-col>
            <el-col :span="14">
              {{ itemBlock.v }}
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-col :span="10">
              {{$t("指令数")}}
            </el-col>
            <el-col :span="14">
              {{ itemBlock.list ? itemBlock.list.length : 0 }}
            </el-col>
          </el-row>
        </div>
        <div class="marginTop5">
          <div ref="popChildBlock" class="pop-child-bLock">
            <div v-for="(itemList, indexList) in itemBlock.list" class="marginBottom2 pop-child-item color-ffffff">
              <el-row class=" padding-full5">
                <el-col :span="8">
                  {{orderValueInfo(itemList.i, 'set')}}:
                </el-col>
                <el-col :span="16">
                  <div v-if="itemList.i == 1">
                    {{$t("空闲时间")}}: {{ itemList.v }}
                  </div>
                  <div v-if="itemList.i == 2">
                    {{$t("延时时间")}}: {{ itemList.v }}
                  </div>
                  <div v-if="itemList.i == 3">
                    <div>
                      {{$t("循环起始")}}: {{ itemList.v + 1 }}
                    </div>
                    <div>
                      {{$t("循环位置")}}: {{ orderValueInfo(item[itemList.v].i, 'set') }}
                    </div>
                    <div>
                      {{$t("重复次数")}}: {{ itemList.t === 0 ? '∞' : itemList.t }}
                    </div>
                  </div>
                  <div v-if="itemList.i == 4">
                    <div>
                      {{$t("场景名称")}}: {{ itemList.n }}
                    </div>
                  </div>
                  <div v-if="itemList.i == 6">
                    <div>
                      {{$t("状态")}}: {{ openTypeInfo(itemList.v) }}
                    </div>
                    <div>
                      {{$t("渐变时间")}}: {{ itemList.t }}
                    </div>
                  </div>
                  <div v-if="itemList.i == 7">
                    <div>
                      {{$t("亮度百分比")}}: {{ itemList.v * 100 }}%
                    </div>
                    <div>
                      {{$t("渐变时间")}}: {{ itemList.t }}
                    </div>
                  </div>
                  <div v-if="itemList.i == 8">
                    <div>
                      {{$t("色温")}}: {{ itemList.v }}
                    </div>
                    <div>
                      {{$t("渐变时间")}}: {{ itemList.t }}
                    </div>
                  </div>
                  <div v-if="itemList.i == 9">
                    <div>
                      {{$t("色彩")}}: <span :style="{background:  converArgbToRgb(itemList.v) }" style="height: 10px; width: 10px;display: inline-block;position: relative; top: 1px;"></span>
                    </div>
                    <div>
                      {{$t("渐变时间")}}: {{ itemList.t }}
                    </div>
                  </div>
                  <div v-if="itemList.i == 10">
                    <div>
                      {{$t("行程百分比")}}: {{ itemList.v * 100 }}%
                    </div>
                  </div>
                  <div v-if="itemList.i == 11">
                    <div>
                      {{$t("继电器")}}: {{ itemList.v.join() }}
                    </div>
                    <div>
                      {{$t("状态")}}: {{ keyTypeInfo(itemList.s) }}
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div v-if="itemBlock.list.length-1 != indexList" style="background: #dddddd;height: 0.5px;margin: 2px 0px 0px 0px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {keyType, openType, orderColor, orderValue, outEditTypeObj, outTypeObj} from "../utils/utils";

export default {
  props: {
    itemBlock: Object,
    item: Array
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

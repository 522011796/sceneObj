<template>
  <div @click="hidePopVisible">
    <div id="guide-v" class="guide guide-v" @mousedown="mousedown"></div>
    <div class="demoRuleClass" :style="{'width': ruleMax * 90 + 40 + 0.1 + 'px'}">
      <div>
        <div class="demoRuleFixedClass" :style="{'width': ruleMax * 90 + 0.1+'px', 'left': -scrollLeft+0 + 'px'}">
          <div v-for="(itemNum, indexNum) in ruleMax" :key="indexNum" class="rule-class">
            <div class="num">
              {{format(indexNum * 100)}}
            </div>
            <div class="ver-line"></div>
          </div>
        </div>
        <!--<el-slider v-model="sliderValue"></el-slider>-->
      </div>

      <div class="demoRuleContentClass" :style="divStyle" ref="wrapper" @scroll="handleScrollTop">
        <div class="demoRuleBlockClass" v-for="(item, index) in taskResetList" style="margin-bottom: 10px;position: relative">
<!--          <div class="demoRuleChildClass" v-for="(itemBlock, indexBlock) in item.list" :style="{'background': indexBlock % 2 == 0 ? '#f56c6c' : '#67c23a', 'width': itemBlock.sec * 70+'px', 'height':'40px'}"-->
<!--               @click.stop="selBlock($event, item, index, itemBlock, indexBlock)"-->
<!--          >-->
          <div class="demoRuleChildClass" v-for="(itemBlock, indexBlock) in item"
               v-if="item.length > 0 && (itemBlock.i == 1 || itemBlock.i == 2)"
               :style="{
                        'background': orderColorInfo(itemBlock.i),
                        'width': itemBlock.sec / 100 * 90+'px',
                        'height':'40px',
                        'color': '#555555',
                        'position': 'relative'
                      }"
          >

            <v-touch v-on:tap="selBlock($event, item, index, itemBlock, indexBlock)" style="height: 100%;width:100%;">
              <el-popover
                popper-class="indexPopVisible"
                v-model="itemBlock.popVisible"
                placement="bottom"
                trigger="manual"
                width="240">
                <div class="font-size-10">
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
                                    {{$t("重复次数")}}: {{ itemList.t }}
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
                <v-touch v-on:press="selPressBlock($event, item, index, itemBlock, indexBlock)" slot="reference" style="height: 100%; width: 100%; user-select: none;position: relative">
                  <div>
                    <div class="moon-ellipsis-class index-main-item-block font-size-10">
                      <span v-if="itemBlock.i == 1 || (itemBlock.i == 2 && itemBlock.list.length == 0)" class="color-434343">
                        {{ orderValueInfo(itemBlock.i, 'set') }}
                      </span>
                      <span v-for="(itemList, indexList) in itemBlock.list" class="marginBottom2 pop-child-item">
                        {{orderValueInfo(itemList.i, 'set')}}
                        <label v-if="indexList != itemBlock.list.length - 1">|</label>
                      </span>
                    </div>
                    <el-tag v-if="itemBlock.i == 2" size="mini" style="position: absolute; right: 5px; top: 5px;">
                      {{itemBlock.list ? itemBlock.list.length : 0}}
                    </el-tag>
                  </div>
                </v-touch>
              </el-popover>
            </v-touch>
          </div>
          <div class="demoRuleChildEmptyClass" style="height: 40px" v-if="item.length <= 0">
            <div>
              <div class="moon-ellipsis-class index-main-item-block">&nbsp;</div>
            </div>
          </div>
          <span :class="checkItemList(item,index)[1] > 0 ? 'index-plus-list-item' : 'index-plus-item'">
            <div v-if="checkItemList(item,index)[0] > 0" @click="selBlock($event, item, index, null, null)" :class="checkItemList(item,index)[1] > 0 ? 'item-tips-list-block' : 'item-tips-block'">1+</div>

            <i class="fa fa-plus font-size-14" @click.stop="setSence($event, item, index, 'lightSub')"></i>
          </span>
        </div>
      </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      custom-class="alert-class"
      width="300px"
      @close="closeDialog">
      <div slot="title">
        <div class="alertHeader">
          <div class="alertTitle">
            <span>提示</span>
          </div>
        </div>
      </div>
      <div class="alertContent">
        <div>{{alertMessageTips}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-row>
            <el-col :span="12">
              <div class="alertFooterClass alertFooterSpanRightBorder">
                <span class="alertFooterSpan" @click="dialogVisible = false">
                  取 消
                </span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="alertFooterClass">
                <span class="alertFooterSpan" @click="saveOpr()">
                  <i class="fa fa-spinner fa-spin" v-if="timer != null"></i>
                  <label v-else>确 定</label>
                </span>
              </div>
            </el-col>
          </el-row>
        </span>
    </el-dialog>

    <!--场所列表-->
    <el-drawer
      title="场景设置"
      custom-class="drawer-list"
      :show-close="true"
      :modal="true"
      :size="dialogEnvSize"
      :wrapperClosable="false"
      :visible.sync="drawerEnvVisible"
      :direction="direction">

      <div slot="title">
        <div class="block-list-header">
          <el-row>
            <el-col :span="12">
              <span>{{$t("场所列表")}}</span>
            </el-col>
            <el-col :span="12" class="textRight">

            </el-col>
          </el-row>
        </div>
      </div>

      <div class="marginTop10">
        <div>
          <div v-for="(item, index) in globalEnvList" :key="index" class="block-list-content-item marginBottom10" @click="selEnv($event, item)">
            <el-row>
              <el-col :span="16">
                <div class="textLeft">
                  <div class="marginTop10 fontBold">{{ item.envName }}</div>
                  <div class="marginTop5">{{ item.envKey }}</div>
                </div>
              </el-col>
              <el-col :span="8">

              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-drawer>

    <!--场景列表-->
    <el-drawer
      title="场景设置"
      custom-class="drawer-list"
      :show-close="false"
      :modal="true"
      :size="dialogListSize"
      :wrapperClosable="false"
      :visible.sync="drawerListVisible"
      :direction="directionList">

      <div slot="title">
        <div class="block-list-header">
          <el-row>
            <el-col :span="12">
              <span>
                <el-button size="mini" type="error" @click="logout()">{{$t("退出")}}</el-button>
              </span>
            </el-col>
            <el-col :span="12" class="textRight">
              <el-button size="mini" type="error" @click="selEnvList()">{{$t("场所列表")}}</el-button>
              <el-button size="mini" type="warning" @click="createSence()">{{$t("创建场景")}}</el-button>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="marginTop10">
        <div v-for="(item, index) in sceneList" class="block-list-content-item marginBottom10" @click="selSence($event, item, 'menu')">
          <el-row>
            <el-col :span="16">
              <div class="textLeft">
                <div class="marginTop10 fontBold">{{ item.sceneName }}</div>
                <div class="marginTop5">{{ item.envKey }}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="textRight marginTop20" style="position: relative">
                <span class="color-666666">{{ $moment(item.lastTime).format("yyyy-MM-DD") }}</span>
                <span style="display: inline-block;position: relative; top: -9px; height: 40px;width: 40px;text-align: center" @click.stop="removeSenceOpr($event, item)">
                  <i class="fa fa-trash font-size-20 marginLeft10 color-error" style="position: relative; top: 9px;"></i>
                </span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-drawer>

    <!--场景列表-->
    <el-drawer
      title="场景设置"
      custom-class="drawer-list"
      :show-close="true"
      :modal="true"
      :size="dialogRoomSize"
      :wrapperClosable="false"
      :visible.sync="drawerRoomVisible"
      :direction="directionList">

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
          <el-col :span="8" class="textCenter" v-for="(item, index) in globalRoomList" :key="index">
            <div class="room-Block-Item" @click="selRoomItem($event, item)">
              <div class="marginTop10">
                <img :src="require(`~/static/img/${item.id}.png`)" style="height: 50px; width: 50px;">
              </div>
              <div class="marginTop5">
                {{ item.name }}
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-drawer>

    <!--场景列表-->
    <el-drawer
      title="场景设置"
      custom-class="drawer-opr"
      :show-close="false"
      :modal="true"
      :size="dialogListSize"
      :wrapperClosable="false"
      :visible.sync="drawerSenceVisible"
      :direction="directionList"
      @closed="closeOprDrawer">

      <div slot="title">
        <div class="block-opr-header">
          <el-row>
            <el-col :span="4" class="textLeft">
              <el-button size="mini" @click="cancelConfig">{{$t("取消")}}</el-button>
            </el-col>
            <el-col :span="16" class="textCenter">
              <span>{{$t("创建场景")}}</span>
            </el-col>
            <el-col :span="4" class="textRight">
              <el-button size="mini" type="warning" v-if="configLoading == false" @click="saveConfig">
                {{$t("保存")}}
              </el-button>
              <el-button size="mini" type="warning" v-if="configLoading == true">
                <i class="fa fa-spinner fa-spin" v-if="configLoading == true"></i>
                {{$t("保存")}}
              </el-button>
            </el-col>
          </el-row>
        </div>
      </div>

      <div>
        <el-form class="netmoon-form-dialog padding-tb10-lr20" label-width="120px" ref="formSence" :model="formSence">
          <el-form-item label="场景名称" v-model="formSence.name" class="netmoon-form-item-border-dialog">
            <el-input :placeholder="$t('请输入场景名称')" v-model="formSence.name"></el-input>
          </el-form-item>
          <el-form-item label="房间" class="netmoon-form-item-border-dialog" v-model="formSence.roomId">
            <div class="textRight" @click="selRoom($event)">
              <label class="color-666666">{{formSence.roomId == '' ? $t("请选择") : getGlobalRoomObj(formSence.roomId)}}</label>
              <label><i class="fa fa-chevron-right"></i></label>
            </div>
          </el-form-item>
          <el-form-item label="场景开源" class="netmoon-form-item-border-dialog">
            <div class="textRight">
              <el-radio-group v-model="formSence.openSource">
                <el-radio :label="true">开源</el-radio>
                <el-radio :label="false" disabled>闭源</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item label="场景类型" class="netmoon-form-item-border-dialog">
            <div class="textRight">
              <el-radio-group v-model="formSence.sceneType">
                <el-radio :label="1">原创</el-radio>
                <el-radio :label="2" disabled>模板</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item label="场景内部调用" class="netmoon-form-item-border-dialog">
            <div class="textRight">
              <el-radio-group v-model="formSence.internal">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <!--场景框-->
    <el-drawer
      title="场景设置"
      custom-class="drawer-bottom"
      :show-close="false"
      :modal="true"
      :size="dialogHeight"
      :wrapperClosable="false"
      :visible.sync="drawer"
      :direction="direction"
      @closed="closeDrawder"
      :style="{'width': screenOrientation == 'landscape' ? '90% !important' : '100% !important', 'margin': '0px auto'}">

      <div slot="title">
        <div class="drawerHeader">
          <el-row>
            <el-col :span="4">
              <div class="drawerHeaderDiv">
                <a href="javascript:;" class="drawerHeaderBtn error-color" @click="cancelDrawer">关闭</a>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="drawerHeaderDiv">
                {{$t("指令设置")}}
              </div>
            </el-col>
            <el-col :span="4">
              <div class="drawerHeaderDiv">
                <a href="javascript:;" class="drawerHeaderBtn primary-color" @click="okConfirm">确定</a>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="drawerBottomDialogContent">
        <div v-if="setChildBottomType == 'lightSub' || setChildBottomType == 'lightGroupSub'" >
          <el-form class="padding-tb10-lr20" label-width="70px" ref="formOrder" :model="formOrder">
            <el-form-item label="指令类型" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-popover
                  placement="left"
                  width="260"
                  popper-class="pop-custom"
                  trigger="click"
                  v-model="customDrawBottomVisible">
                  <div class="textCenter">
                    <div class="index-pop-item" @click="changeCustomBottomType($event, 1)">
                      <span>{{$t("开/关灯控制")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changeCustomBottomType($event, 2)">
                      <span>{{$t("亮度控制")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changeCustomBottomType($event, 3)">
                      <span>{{$t("色温控制")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changeCustomBottomType($event, 4)">
                      <span>{{$t("色彩控制")}}</span>
                    </div>
                    <div v-if="setChildBottomType != 'lightGroupSub'" class="index-pop-item" @click="changeCustomBottomType($event, 7)">
                      <span>{{$t("循环操作")}}</span>
                    </div>
                    <div v-if="setChildBottomType != 'lightSub'" class="index-pop-item" @click="changeCustomBottomType($event, 8)">
                      <span>{{$t("电源控制(勿与循环操作一起使用)")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changeCustomBottomType($event, 5)">
                      <span>{{$t("场景调用(勿使用2级以上嵌套)")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changeCustomBottomType($event, 6)">
                      <span>{{$t("延时")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changeCustomBottomType($event, 9)">
                      <span>{{$t("空闲时段")}}</span>
                    </div>
                  </div>
                  <span slot="reference" size="mini">
                          <label>{{formOrder.type == '' ? $t("请选择") : orderValueInfo(outTypeObjInfo(formOrder.type), 'set')}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 1" label="开/关" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-popover
                  placement="left"
                  width="100"
                  popper-class="pop-custom"
                  trigger="click"
                  v-model="customDrawBottomOpenVisible">
                  <div class="textCenter">
                    <div class="index-pop-item" @click="changeCustomBottomOpen($event, 1)">
                      <span>{{$t("开灯")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changeCustomBottomOpen($event, 0)">
                      <span>{{$t("关灯")}}</span>
                    </div>
                  </div>
                  <span slot="reference" size="mini">
                          <label>{{formOrder.open == '' && formOrder.open != 0 ? $t("请选择") : openTypeInfo(formOrder.open)}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 7" label="循环起始" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-popover
                  placement="left"
                  width="260"
                  popper-class="pop-custom"
                  trigger="click"
                  v-model="customDrawBottomOpenVisible">
                  <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                    <div class="index-pop-item" v-for="(item, index) in this.taskList[this.taskIndex]" @click="selLoopOrder($event, item, index, 'lightSub')">
                      <el-row>
                        <el-col :span="20">
                          <div class="textLeft">
                            <span>
                              <el-tag>
                                <label class="font-size-12 color-default">
                                  {{$t("No.")}}
                                  {{index+1}}
                                </label>
                              </el-tag>
                            </span>
                            <span class="marginLeft10">{{ orderGetAndSet(item.i, 'set')}}</span>
                          </div>
                        </el-col>
                        <el-col :span="4">
                          <div class="textRight">
                            <span v-if="(loopIndex != '' || loopIndex === 0) && index === loopIndex" style="position: relative; top: 7px;"><i class="fa fa-check-circle color-success"></i></span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <span slot="reference" size="mini">
                          <label>{{formOrder.startOrderI == '' ? $t("请选择") : orderValueInfo(formOrder.startOrderI, 'set')}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 2" label="亮度" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-slider v-model="formOrder.light" :step="0.0001" :max="1" :format-tooltip="lightFormatTooltip" @change="handleChange($event, 'light')"></el-slider>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 3" label="色温" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-slider v-model="formOrder.temp" :min="2700" :max="6500" @change="handleChange($event, 'temp')"></el-slider>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 4" label="色彩" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <!--                        <el-color-picker v-model="formOrder.color"></el-color-picker>-->
                <!--                        <v-swatches v-model="formOrder.color" fallback-input-type="color"></v-swatches>-->
                <el-popover
                  placement="left"
                  width="180"
                  popper-class="pop-custom"
                  trigger="click"
                  v-model="customDrawBottomOpenVisible">
                  <div class="textCenter">
                    <color-picker v-bind="colors" style="height: 150px; width: 150px;margin: 0 auto;" @input="inputColor" @change="changeColor"></color-picker>
                  </div>
                  <span slot="reference">
                            <span class="colorBlock" :style="{'background': this.formOrder.color}"></span>
                          </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 7" label="重复次数" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="mini" v-model="formOrder.startLoop" @change="handleChange($event, 'startLoop')" :min="100" :step="100"></el-input-number>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 8" label="电源" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-popover
                  placement="left"
                  width="240"
                  popper-class="pop-custom"
                  trigger="click"
                  v-model="customDrawBottomOpenVisible">
                  <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                    <div class="index-pop-item">
                      <el-row>
                        <el-col :span="20">
                          <div class="textLeft">
                            <span>{{$t("断电")}}</span>
                          </div>
                        </el-col>
                        <el-col :span="4">
                          <div class="textRight">
                            <span><i class="fa fa-check-circle color-success"></i></span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="index-pop-item">
                      <el-row>
                        <el-col :span="20">
                          <div class="textLeft">
                            <span>{{$t("通电")}}</span>
                          </div>
                        </el-col>
                        <el-col :span="4">
                          <div class="textRight">
                            <span></span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <span slot="reference" size="mini">
                            <label>{{formOrder.sence == '' ? $t("请选择") : formOrder.sence}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 5" label="场景名称" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-popover
                  placement="left"
                  width="240"
                  popper-class="pop-custom"
                  trigger="click"
                  v-model="customDrawBottomOpenVisible">
                  <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                    <div class="index-pop-item" v-for="(item, index) in sceneList">
                      <el-row>
                        <el-col :span="20">
                          <div class="textLeft" @click="item.sceneId != senceId ? selSenceUse($event, item, index, 'lightSub') : ''" v-if="item.sceneId != senceId" :class="item.sceneId != senceId ? '' : 'color-disabled disbled-icon'">
                            <span>{{ item.sceneName }}</span>
                          </div>
                        </el-col>
                        <el-col :span="4">
                          <div class="textRight">
                            <span v-if="(senceIndex != '' || senceIndex === 0) && index === senceIndex" style="position: relative; top: 0px;"><i class="fa fa-check-circle color-success"></i></span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <span slot="reference" size="mini">
                            <label>{{formOrder.sence == '' ? $t("请选择") : formOrder.senceText}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType != 5 && customBottomType != 6 && customBottomType != 7 && customBottomType != 8 && customBottomType != 9" label="渐变时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="mini" v-model="formOrder.changeTime" @change="handleChange($event, 'changeTime')" :min="100" :step="100"></el-input-number>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType != 9 && customBottomType != 1 && customBottomType != 2 && customBottomType != 3 && customBottomType != 4 && customBottomType != 7 && customBottomType != 5" label="延时时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="mini" v-model="formOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="100" :step="100"></el-input-number>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 9" label="空闲时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="mini" v-model="formOrder.emptyTime" @change="handleChange($event, 'emptyTime')" :min="100" :step="100"></el-input-number>
              </div>
            </el-form-item>
          </el-form>
        </div>

        <div v-if="setChildBottomType == 'curtainsSub'" >
          <el-form class="padding-tb10-lr20" label-width="95px" ref="formCurtainsOrder" :model="formCurtainsOrder">
            <el-form-item label="指令类型" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-popover
                  placement="left"
                  width="260"
                  popper-class="pop-custom"
                  trigger="click"
                  v-model="customDrawBottomVisible">
                  <div class="textCenter">
                    <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 10)">
                      <span>{{$t("行程控制")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 3)">
                      <span>{{$t("循环操作")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 4)">
                      <span>{{$t("场景调用(勿使用2级以上嵌套)")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 2)">
                      <span>{{$t("延时")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 1)">
                      <span>{{$t("空闲时间")}}</span>
                    </div>
                  </div>
                  <span slot="reference" size="mini">
                          <label>{{formCurtainsOrder.type == '' ? $t("请选择") : orderValueInfo(formCurtainsOrder.type, 'set')}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 10" label="开合百分比" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-slider v-model="formCurtainsOrder.curtainsOpenClose" :step="0.01" :max="1" :format-tooltip="curtainsFormatTooltip" @change="handleChange($event, 'curtainsOpenClose')"></el-slider>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 3" label="循环起始" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-popover
                  placement="left"
                  width="240"
                  popper-class="pop-custom"
                  trigger="click"
                  v-model="customDrawBottomOpenVisible">
                  <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                    <div class="index-pop-item" v-for="(item, index) in  this.taskList[this.taskIndex]" @click="selLoopOrder($event, item, index, 'lightSub')">
                      <el-row>
                        <el-col :span="20">
                          <div class="textLeft">
                            <span>
                              <el-tag>
                                <label class="font-size-12 color-default">
                                  {{$t("No.")}}
                                  {{index+1}}
                                </label>
                              </el-tag>
                            </span>
                            <span class="marginLeft10">{{ orderGetAndSet(item.i, 'set')}}</span>
                          </div>
                        </el-col>
                        <el-col :span="4">
                          <div class="textRight">
                            <span v-if="(loopIndex != '' || loopIndex === 0) && index === loopIndex" style="position: relative; top: 7px;"><i class="fa fa-check-circle color-success"></i></span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <span slot="reference" size="mini">
                            <label>{{formOrder.startOrderI == '' ? $t("请选择") : orderValueInfo(formOrder.startOrderI, 'set')}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 3" label="重复次数" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="mini" v-model="formCurtainsOrder.startLoop" @change="handleChange($event, 'startLoop')" :min="0"></el-input-number>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 4" label="场景名称" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-popover
                  placement="left"
                  width="240"
                  popper-class="pop-custom"
                  trigger="click"
                  v-model="customDrawBottomOpenVisible">
                  <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                    <div class="index-pop-item" v-for="(item, index) in sceneList">
                      <el-row>
                        <el-col :span="20">
                          <div class="textLeft" @click="item.sceneId != senceId ? selSenceUse($event, item, index, 'curtainsSub') : ''" v-if="item.sceneId != senceId" :class="item.sceneId != senceId ? '' : 'color-disabled disbled-icon'">
                            <span>{{ item.sceneName }}</span>
                          </div>
                        </el-col>
                        <el-col :span="4">
                          <div class="textRight">
                            <span v-if="(senceIndex != '' || senceIndex === 0) && index === senceIndex" style="position: relative; top: 0px;"><i class="fa fa-check-circle color-success"></i></span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <span slot="reference" size="mini">
                          <label>{{formCurtainsOrder.sence == '' ? $t("请选择") : formCurtainsOrder.senceText}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType != 10 && customBottomType != 3 && customBottomType != 4 && customBottomType != 5 && customBottomType != 1" label="延时时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="mini" v-model="formCurtainsOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="100" :step="100"></el-input-number>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 1" label="空闲时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="mini" v-model="formCurtainsOrder.emptyTime" @change="handleChange($event, 'emptyTime')" :min="100" :step="100"></el-input-number>
              </div>
            </el-form-item>
          </el-form>
        </div>

        <div v-if="setChildBottomType == 'switchSub'" >
          <el-form class="padding-tb10-lr20" label-width="80px" ref="formSwitchOrder" :model="formSwitchOrder">
            <el-form-item label="指令类型" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-popover
                  placement="left"
                  width="260"
                  popper-class="pop-custom"
                  trigger="click"
                  v-model="customDrawBottomVisible">
                  <div class="textCenter">
                    <div class="index-pop-item" @click="changeCustomBottomSwitchType($event, 11)">
                      <span>{{$t("按键操作")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changeCustomBottomSwitchType($event, 6)">
                      <span>{{$t("延时")}}</span>
                    </div>
                    <div class="index-pop-item" @click="changeCustomBottomSwitchType($event, 9)">
                      <span>{{$t("空闲时段")}}</span>
                    </div>
                  </div>
                  <span slot="reference" size="mini">
                          <label>{{formSwitchOrder.type == '' ? $t("请选择") : orderValueInfo(formSwitchOrder.type, 'set')}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 11" label="继电器" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <div class="textRight color-666666">
                  <el-popover
                    placement="left"
                    width="240"
                    popper-class="pop-custom"
                    trigger="click"
                    v-model="customDrawBottomKeyVisible">
                    <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                      <div class="index-pop-item" v-for="(item ,index) in 4" @click="selSwitchKey($event, item, index)">
                        <el-row>
                          <el-col :span="20">
                            <div class="textLeft">
                              <span>{{ $t("继电器")}}{{index+1}}</span>
                            </div>
                          </el-col>
                          <el-col :span="4">
                            <div class="textRight">
                              <span v-if="formSwitchOrder.keyArr.indexOf(index) > -1" style="position: relative; top: 0px;"><i class="fa fa-check-circle color-success"></i></span>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <span slot="reference" size="mini">
                            <label>{{formSwitchOrder.key == '' ? $t("请选择") : $t("继电器")+formSwitchOrder.keyNoArr.join()}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                  </el-popover>
                </div>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 11" label="按键操作" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-popover
                  placement="left"
                  width="240"
                  popper-class="pop-custom"
                  trigger="click"
                  v-model="customDrawBottomKeyOprVisible">
                  <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                    <div class="index-pop-item" @click="changeCustomBottomSwitchKeyOprType($event, 0)">
                      <el-row>
                        <el-col :span="20">
                          <div class="textLeft">
                            <span>{{$t("释放")}}</span>
                          </div>
                        </el-col>
                        <el-col :span="4">
                          <div class="textRight" v-if="formSwitchOrder.keyOpr === 0">
                            <span><i class="fa fa-check-circle color-success"></i></span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="index-pop-item" @click="changeCustomBottomSwitchKeyOprType($event, 1)">
                      <el-row>
                        <el-col :span="20">
                          <div class="textLeft">
                            <span>{{$t("按下")}}</span>
                          </div>
                        </el-col>
                        <el-col :span="4">
                          <div class="textRight" v-if="formSwitchOrder.keyOpr === 1">
                            <span><i class="fa fa-check-circle color-success"></i></span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <span slot="reference" size="mini">
                            <label>{{formSwitchOrder.keyOpr === '' && formSwitchOrder.keyOpr != 0 ? $t("请选择") : keyTypeInfo(formSwitchOrder.keyOpr)}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 6" label="延时时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="mini" v-model="formSwitchOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="100" :step="100"></el-input-number>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 9" label="空闲时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="mini" v-model="formSwitchOrder.emptyTime" @change="handleChange($event, 'emptyTime')" :min="100" :step="100"></el-input-number>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>

<!--      <div class="drawerHeaderContent" :style="{'padding-bottom': paddingBottom}">-->
<!--        <el-form class="netmoon-form-dialog" label-width="90px" ref="formPlain" :model="formPlain">-->
<!--          <el-form-item label="场景名称" v-model="formPlain.name">-->
<!--            <el-input :placeholder="$t('请输入任务名称')" v-model="formPlain.name"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="控制房间">-->
<!--            <div class="textRight color-666666" @click="addDialog($event, 'room')">-->
<!--              <label>{{formPlain.room == '' ? $t("请选择") : formPlain.room}}</label>-->
<!--              <label><i class="fa fa-chevron-right"></i></label>-->
<!--            </div>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="自定义图标">-->
<!--            <div class="textRight color-666666" @click="addDialog($event, 'icon')">-->
<!--              <label>{{formPlain.icon == '' ? $t("请选择") : formPlain.icon}}</label>-->
<!--              <label><i class="fa fa-chevron-right"></i></label>-->
<!--            </div>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="选择模版">-->
<!--            <div class="textRight color-666666" @click="addDialog($event, 'template')">-->
<!--              <label>{{formPlain.template == '' ? $t("请选择") : formPlain.template}}</label>-->
<!--              <label><i class="fa fa-chevron-right"></i></label>-->
<!--            </div>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </div>-->
    </el-drawer>

    <!--指令列表-->
    <el-drawer
      custom-class="drawer-right-bottom"
      title="我是标题"
      :size="drawerRightWidth"
      :show-close="false"
      :visible.sync="drawerDevice"
      :direction="directionDevice"
      @closed="closeDrawer">
      <div class="drawerRightHeader" slot="title">
        <el-row>
          <el-col :span="4">
            <div class="drawerHeaderDiv">
              <div class="drawerHeaderDiv">
                <a href="javascript:;" class="drawerHeaderBtn primary-color" @click="cancelDeviceDrawer">确认/关闭</a>
              </div>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="drawerHeaderDiv">
              <span >{{$t("指令列表")}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="drawerHeaderDiv">
              <a href="javascript:;" class="color-success" @click="addChildBottomDialog($event, 'lightSub')">{{$t("添加指令")}}</a>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="marginTop10">
        <div>
          <div class="marginTop10">
            <div class="rightDialogContent" :style="dialogRightTabOrderStyle">
              <div class="item-list-child" v-for="(item, index) in orderList" :key="index">
                <el-row>
                  <el-col :span="16">
                    <span>
                      <el-tag>
                        <label class="font-size-12 color-default">
                          {{index+1}}
                        </label>
                      </el-tag>
                    </span>
                    <span class="marginLeft10">{{ orderGetAndSet(item.i, 'set')}}</span>
                    <span>
                      <el-tooltip class="item" effect="dark" placement="bottom">
                        <div slot="content">
                          <label v-if="item.i == 1" size="mini">{{$t("空闲")}}:{{ item.v }}</label>
                          <label v-if="item.i == 2" size="mini">{{$t("延时")}}:{{ item.v }}</label>
                          <label v-if="item.i == 3" size="mini">
                            {{$t("循环起始")}}: {{ item.v + 1 }}
                            {{$t("循环位置")}}: {{ orderValueInfo(orderList[item.v].i, 'set') }}
                            {{$t("重复次数")}}: {{ item.t }}
                          </label>
                          <label v-if="item.i == 4" size="mini">{{$t("场景")}}: {{ item.n }}</label>
                          <label v-if="item.i == 6" size="mini">
                            {{$t("状态")}}: {{ openTypeInfo(item.v) }}
                            {{$t("渐变时间")}}: {{ item.t }}
                          </label>
                          <label v-if="item.i == 7" size="mini">
                            {{$t("亮度百分比")}}: {{ item.v * 100 }}%
                            {{$t("渐变时间")}}: {{ item.t }}
                          </label>
                          <label v-if="item.i == 8" size="mini">
                            {{$t("色温")}}: {{ item.v }}
                            {{$t("渐变时间")}}: {{ item.t }}
                          </label>
                          <label v-if="item.i == 9" size="mini">
                            {{$t("色彩")}}: <span :style="{background:  converArgbToRgb(item.v) }" style="height: 10px; width: 10px;display: inline-block;position: relative; top: 1px;"></span>
                            {{$t("渐变时间")}}: {{ item.t }}
                          </label>
                          <label v-if="item.i == 10" size="mini">
                            {{$t("行程百分比")}}: {{ item.v * 100 }}%
                          </label>
                          <label v-if="item.i == 11" size="mini">
                            {{$t("继电器")}}: {{ item.v.join() }}
                            {{$t("状态")}}: {{ keyTypeInfo(item.s) }}
                          </label>
                        </div>
                        <i class="fa fa-info-circle"></i>
                      </el-tooltip>
                    </span>
                  </el-col>
                  <el-col :span="8">
                    <div class="textRight">
                      <a href="javascript:;" class="color-warning" @click="upateChildBottomDialog($event, 'lightSub', index, item)">{{$t("修改")}}</a>
                      <a href="javascript:;" class="color-error" @click="delOpr($event, index, 'lightCustom')">{{$t("删除")}}</a>
                      <el-popover
                        width="140"
                        placement="bottom"
                        trigger="manual"
                        v-model="item.insertVisible">
                        <div class="color-666666 textCenter">
                          <div class="index-pop-item" @click="insertOrder($event,item, index, 'pre', 'lightSub')">
                            <span>{{$t("插入到上一行")}}</span>
                          </div>
                          <div class="index-pop-item" @click="insertOrder($event,item, index, 'next', 'lightSub')">
                            <span>{{$t("插入到下一行")}}</span>
                          </div>
                        </div>
                        <label slot="reference" @click.stop="insertOrderOpr($event,item, index)">{{$t("插入")}}</label>
                      </el-popover>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--底部弹出-->
      <!--<div class="mask" v-show="drawerBottomDialogVisible" @click="cancelChildBottomDrawer"></div>-->
      <div class="mask" v-show="drawerBottomDialogVisible"></div>
      <transition :name="screenOrientation == 'landscape' ? 'myboxV' : 'mybox'">
        <div :class="screenOrientation == 'landscape' ? 'drawerBottomDialogV' : 'drawerBottomDialog'" class="share" v-show="drawerBottomDialogVisible"
             :style="{
            'width': (screenOrientation == 'landscape' && appType == 'app') ? '100% !important' : '100% !important',
            'margin-left': (screenOrientation == 'landscape' && appType == 'app') ? '' : ''
          }">
          <div>
            <div class="drawerHeader header">
              <el-row>
                <el-col :span="4">
                  <div class="drawerHeaderDiv">
                    <a href="javascript:;" class="drawerHeaderBtn error-color" @click="cancelChildBottomDrawer">关闭</a>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="drawerHeaderDiv color-666666">
                    <span v-if="setChildBottomType == 'change'">{{$t("速度设置")}}</span>
                    <span v-if="setChildBottomType == 'lightSub' || setChildBottomType == 'curtainsSub' || setChildBottomType == 'switchSub' || setChildBottomType == 'lightGroupSub'">{{$t("指令设置")}}</span>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="drawerHeaderDiv">
                    <a href="javascript:;" class="drawerHeaderBtn primary-color" @click="okConfirm">确定</a>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div v-if="setChildBottomType == 'change'" class="drawerBottomDialogContent" :style="drawerBottomDialogStyle">
              <div v-for="(item, index) in 11" @click="selSpeed(item, index)">
                <div class="item-list-child" v-if="index <= 4">
                  <el-row>
                    <el-col :span="20">
                      <span>{{$t("速度")}}+{{5-index}}</span>
                    </el-col>
                    <el-col :span="4">
                      <div class="textRight" v-if="speed == index"><i class="fa fa-check-circle color-success"></i></div>
                    </el-col>
                  </el-row>
                </div>
                <div class="item-list-child" v-if="index == 5">
                  <el-row>
                    <el-col :span="20">
                      <span>{{$t("默认速度")}}</span>
                    </el-col>
                    <el-col :span="4">
                      <div class="textRight" v-if="speed == index"><i class="fa fa-check-circle color-success"></i></div>
                    </el-col>
                  </el-row>
                </div>
                <div class="item-list-child" v-if="index > 5">
                  <el-row>
                    <el-col :span="20">
                      <span>{{$t("速度")}}-{{index - 5}}</span>
                    </el-col>
                    <el-col :span="4">
                      <div class="textRight" v-if="speed == index"><i class="fa fa-check-circle color-success"></i></div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>

            <div class="drawerBottomDialogContent">
              <div v-if="setChildBottomType == 'lightSub' || setChildBottomType == 'lightGroupSub'" >
                <el-form class="padding-tb10-lr20" label-width="70px" ref="formOrder" :model="formOrder">
                  <el-form-item label="指令类型" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-popover
                        placement="left"
                        width="260"
                        popper-class="pop-custom"
                        trigger="click"
                        v-model="customBottomVisible">
                        <div class="textCenter">
                          <div class="index-pop-item" @click="changeCustomBottomType($event, 1)">
                            <span>{{$t("开/关灯控制")}}</span>
                          </div>
                          <div class="index-pop-item" @click="changeCustomBottomType($event, 2)">
                            <span>{{$t("亮度控制")}}</span>
                          </div>
                          <div class="index-pop-item" @click="changeCustomBottomType($event, 3)">
                            <span>{{$t("色温控制")}}</span>
                          </div>
                          <div class="index-pop-item" @click="changeCustomBottomType($event, 4)">
                            <span>{{$t("色彩控制")}}</span>
                          </div>
                          <div v-if="setChildBottomType != 'lightGroupSub'" class="index-pop-item" @click="changeCustomBottomType($event, 7)">
                            <span>{{$t("循环操作")}}</span>
                          </div>
                          <div v-if="setChildBottomType != 'lightSub'" class="index-pop-item" @click="changeCustomBottomType($event, 8)">
                            <span>{{$t("电源控制(勿与循环操作一起使用)")}}</span>
                          </div>
                          <div class="index-pop-item" @click="changeCustomBottomType($event, 5)">
                            <span>{{$t("场景调用(勿使用2级以上嵌套)")}}</span>
                          </div>
                          <div class="index-pop-item" @click="changeCustomBottomType($event, 6)">
                            <span>{{$t("延时")}}</span>
                          </div>
                          <div class="index-pop-item" @click="changeCustomBottomType($event, 9)">
                            <span>{{$t("空闲时段")}}</span>
                          </div>
                        </div>
                        <span slot="reference" size="mini">
                          <label v-if="areaItem == ''">{{formOrder.type == '' ? $t("请选择") : orderValueInfo(outTypeObjInfo(formOrder.type), 'set')}}</label>
                          <label v-if="areaItem != ''">{{formOrder.type == '' ? $t("请选择") : orderValueInfo(formOrder.type, 'set')}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 1" label="开/关" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-popover
                        placement="left"
                        width="100"
                        popper-class="pop-custom"
                        trigger="click"
                        v-model="customBottomOpenVisible">
                        <div class="textCenter">
                          <div class="index-pop-item" @click="changeCustomBottomOpen($event, 1)">
                            <span>{{$t("开灯")}}</span>
                          </div>
                          <div class="index-pop-item" @click="changeCustomBottomOpen($event, 0)">
                            <span>{{$t("关灯")}}</span>
                          </div>
                        </div>
                        <span slot="reference" size="mini">
                          <label>{{formOrder.open == '' && formOrder.open != 0 ? $t("请选择") : openTypeInfo(formOrder.open)}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 7" label="循环起始" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-popover
                        placement="left"
                        width="260"
                        popper-class="pop-custom"
                        trigger="click"
                        v-model="customBottomOpenVisible">
                        <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                          <div class="index-pop-item" v-for="(item, index) in this.taskList[this.taskIndex]" @click="selLoopOrder($event, item, index, 'lightSub')">
                            <el-row>
                              <el-col :span="20">
                                <div class="textLeft">
                            <span>
                              <el-tag>
                                <label class="font-size-12 color-default">
                                  {{$t("No.")}}
                                  {{index+1}}
                                </label>
                              </el-tag>
                            </span>
                                  <span class="marginLeft10">{{ orderGetAndSet(item.i, 'set')}}</span>
                                </div>
                              </el-col>
                              <el-col :span="4">
                                <div class="textRight">
                                  <span v-if="(loopIndex != '' || loopIndex === 0) && index === loopIndex" style="position: relative; top: 7px;"><i class="fa fa-check-circle color-success"></i></span>
                                </div>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                        <span slot="reference" size="mini">
                          <label>{{formOrder.startOrderI == '' ? $t("请选择") : orderValueInfo(formOrder.startOrderI, 'set')}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 2" label="亮度" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-slider v-model="formOrder.light" :step="0.0001" :max="1" :format-tooltip="lightFormatTooltip" @change="handleChange($event, 'light')"></el-slider>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 3" label="色温" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-slider v-model="formOrder.temp" :min="2700" :max="6500" @change="handleChange($event, 'temp')"></el-slider>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 4" label="色彩" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <!--                        <el-color-picker v-model="formOrder.color"></el-color-picker>-->
                      <!--                        <v-swatches v-model="formOrder.color" fallback-input-type="color"></v-swatches>-->
                      <el-popover
                        placement="left"
                        width="180"
                        popper-class="pop-custom"
                        trigger="click"
                        v-model="customBottomOpenVisible">
                        <div class="textCenter">
                          <color-picker v-bind="colors" style="height: 150px; width: 150px;margin: 0 auto;" @input="inputColor" @change="changeColor"></color-picker>
                        </div>
                        <span slot="reference">
                            <span class="colorBlock" :style="{'background': this.formOrder.color}"></span>
                          </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 7" label="重复次数" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="mini" v-model="formOrder.startLoop" @change="handleChange($event, 'startLoop')" :min="0"></el-input-number>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 8" label="电源" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-popover
                        placement="left"
                        width="240"
                        popper-class="pop-custom"
                        trigger="click"
                        v-model="customBottomOpenVisible">
                        <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                          <div class="index-pop-item">
                            <el-row>
                              <el-col :span="20">
                                <div class="textLeft">
                                  <span>{{$t("断电")}}</span>
                                </div>
                              </el-col>
                              <el-col :span="4">
                                <div class="textRight">
                                  <span><i class="fa fa-check-circle color-success"></i></span>
                                </div>
                              </el-col>
                            </el-row>
                          </div>
                          <div class="index-pop-item">
                            <el-row>
                              <el-col :span="20">
                                <div class="textLeft">
                                  <span>{{$t("通电")}}</span>
                                </div>
                              </el-col>
                              <el-col :span="4">
                                <div class="textRight">
                                  <span></span>
                                </div>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                        <span slot="reference" size="mini">
                            <label>{{formOrder.sence == '' ? $t("请选择") : formOrder.sence}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 5" label="场景名称" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-popover
                        placement="left"
                        width="240"
                        popper-class="pop-custom"
                        trigger="click"
                        v-model="customBottomOpenVisible">
                        <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                          <div class="index-pop-item" v-for="(item, index) in sceneList">
                            <el-row>
                              <el-col :span="20">
                                <div class="textLeft" @click="item.sceneId != senceId ? selSenceUse($event, item, index, 'lightSub') : ''" v-if="item.sceneId != senceId" :class="item.sceneId != senceId ? '' : 'color-disabled disbled-icon'">
                                  <span>{{ item.sceneName }}</span>
                                </div>
                              </el-col>
                              <el-col :span="4">
                                <div class="textRight">
                                  <span v-if="(senceIndex != '' || senceIndex === 0) && index === senceIndex" style="position: relative; top: 0px;"><i class="fa fa-check-circle color-success"></i></span>
                                </div>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                        <span slot="reference" size="mini">
                            <label>{{formOrder.sence == '' ? $t("请选择") : formOrder.senceText}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType != 5 && customBottomType != 6 && customBottomType != 7 && customBottomType != 8 && customBottomType != 9" label="渐变时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="mini" v-model="formOrder.changeTime" @change="handleChange($event, 'changeTime')" :min="100" :step="100"></el-input-number>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType != 9 && customBottomType != 1 && customBottomType != 2 && customBottomType != 3 && customBottomType != 4 && customBottomType != 7 && customBottomType != 5" label="延时时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="mini" v-model="formOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="100" :step="100"></el-input-number>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 9" label="空闲时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="mini" v-model="formOrder.emptyTime" @change="handleChange($event, 'emptyTime')" :min="100" :step="100"></el-input-number>
                    </div>
                  </el-form-item>
                </el-form>
              </div>

              <div v-if="setChildBottomType == 'curtainsSub'" >
                <el-form class="padding-tb10-lr20" label-width="95px" ref="formCurtainsOrder" :model="formCurtainsOrder">
                  <el-form-item label="指令类型" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-popover
                        placement="left"
                        width="260"
                        popper-class="pop-custom"
                        trigger="click"
                        v-model="customBottomVisible">
                        <div class="textCenter">
                          <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 10)">
                            <span>{{$t("行程控制")}}</span>
                          </div>
                          <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 3)">
                            <span>{{$t("循环操作")}}</span>
                          </div>
                          <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 4)">
                            <span>{{$t("场景调用(勿使用2级以上嵌套)")}}</span>
                          </div>
                          <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 2)">
                            <span>{{$t("延时")}}</span>
                          </div>
                          <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 1)">
                            <span>{{$t("空闲时间")}}</span>
                          </div>
                        </div>
                        <span slot="reference" size="mini">
                          <label v-if="areaItem == ''">{{formCurtainsOrder.type == '' ? $t("请选择") : orderValueInfo(formCurtainsOrder.type, 'set')}}</label>
                          <label v-if="areaItem != ''">{{formCurtainsOrder.type == '' ? $t("请选择") : orderValueInfo(formCurtainsOrder.type, 'set')}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 10" label="开合百分比" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-slider v-model="formCurtainsOrder.curtainsOpenClose" :step="0.01" :max="1" :format-tooltip="curtainsFormatTooltip" @change="handleChange($event, 'curtainsOpenClose')"></el-slider>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 3" label="循环起始" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-popover
                        placement="left"
                        width="240"
                        popper-class="pop-custom"
                        trigger="click"
                        v-model="customBottomOpenVisible">
                        <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                          <div class="index-pop-item" v-for="(item, index) in  this.taskList[this.taskIndex]" @click="selLoopOrder($event, item, index, 'lightSub')">
                            <el-row>
                              <el-col :span="20">
                                <div class="textLeft">
                            <span>
                              <el-tag>
                                <label class="font-size-12 color-default">
                                  {{$t("No.")}}
                                  {{index+1}}
                                </label>
                              </el-tag>
                            </span>
                                  <span class="marginLeft10">{{ orderGetAndSet(item.i, 'set')}}</span>
                                </div>
                              </el-col>
                              <el-col :span="4">
                                <div class="textRight">
                                  <span v-if="(loopIndex != '' || loopIndex === 0) && index === loopIndex" style="position: relative; top: 7px;"><i class="fa fa-check-circle color-success"></i></span>
                                </div>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                        <span slot="reference" size="mini">
                            <label>{{formOrder.startOrderI == '' ? $t("请选择") : orderValueInfo(formOrder.startOrderI, 'set')}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 3" label="重复次数" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="mini" v-model="formCurtainsOrder.startLoop" @change="handleChange($event, 'startLoop')" :min="100" :step="100"></el-input-number>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 4" label="场景名称" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-popover
                        placement="left"
                        width="240"
                        popper-class="pop-custom"
                        trigger="click"
                        v-model="customBottomOpenVisible">
                        <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                          <div class="index-pop-item" v-for="(item, index) in sceneList">
                            <el-row>
                              <el-col :span="20">
                                <div class="textLeft" @click="item.sceneId != senceId ? selSenceUse($event, item, index, 'curtainsSub') : ''" v-if="item.sceneId != senceId" :class="item.sceneId != senceId ? '' : 'color-disabled disbled-icon'">
                                  <span>{{ item.sceneName }}</span>
                                </div>
                              </el-col>
                              <el-col :span="4">
                                <div class="textRight">
                                  <span v-if="(senceIndex != '' || senceIndex === 0) && index === senceIndex" style="position: relative; top: 0px;"><i class="fa fa-check-circle color-success"></i></span>
                                </div>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                        <span slot="reference" size="mini">
                          <label>{{formCurtainsOrder.sence == '' ? $t("请选择") : formCurtainsOrder.senceText}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType != 10 && customBottomType != 3 && customBottomType != 4 && customBottomType != 1" label="延时时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="mini" v-model="formCurtainsOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="100" :step="100"></el-input-number>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 1" label="空闲时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="mini" v-model="formCurtainsOrder.emptyTime" @change="handleChange($event, 'emptyTime')" :min="100" :step="100"></el-input-number>
                    </div>
                  </el-form-item>
                </el-form>
              </div>

              <div v-if="setChildBottomType == 'switchSub'" >
                <el-form class="padding-tb10-lr20" label-width="80px" ref="formSwitchOrder" :model="formSwitchOrder">
                  <el-form-item label="指令类型" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-popover
                        placement="left"
                        width="260"
                        popper-class="pop-custom"
                        trigger="click"
                        v-model="customBottomVisible">
                        <div class="textCenter">
                          <div class="index-pop-item" @click="changeCustomBottomSwitchType($event, 11)">
                            <span>{{$t("按键操作")}}</span>
                          </div>
                          <div class="index-pop-item" @click="changeCustomBottomSwitchType($event, 6)">
                            <span>{{$t("延时")}}</span>
                          </div>
                          <div class="index-pop-item" @click="changeCustomBottomSwitchType($event, 9)">
                            <span>{{$t("空闲时段")}}</span>
                          </div>
                        </div>
                        <span slot="reference" size="mini">
                          <label v-if="areaItem == ''">{{formSwitchOrder.type == '' ? $t("请选择") : orderValueInfo(outTypeObjInfo(formSwitchOrder.type), 'set')}}</label>
                          <label v-if="areaItem != ''">{{formSwitchOrder.type == '' ? $t("请选择") : orderValueInfo(formSwitchOrder.type, 'set')}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 11" label="继电器" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <div class="textRight color-666666">
                        <el-popover
                          placement="left"
                          width="240"
                          popper-class="pop-custom"
                          trigger="click"
                          v-model="customBottomKeyVisible">
                          <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                            <div class="index-pop-item" v-for="(item ,index) in 4" @click="selSwitchKey($event, item, index)">
                              <el-row>
                                <el-col :span="20">
                                  <div class="textLeft">
                                    <span>{{ $t("继电器")}}{{index+1}}</span>
                                  </div>
                                </el-col>
                                <el-col :span="4">
                                  <div class="textRight">
                                    <span v-if="formSwitchOrder.keyArr.indexOf(index) > -1" style="position: relative; top: 0px;"><i class="fa fa-check-circle color-success"></i></span>
                                  </div>
                                </el-col>
                              </el-row>
                            </div>
                          </div>
                          <span slot="reference" size="mini">
                            <label>
                              {{formSwitchOrder.keyArr == '' ? $t("请选择") : $t("继电器")+formSwitchOrder.keyNoArr.join()}}
                            </label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                        </el-popover>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 11" label="按键操作" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-popover
                        placement="left"
                        width="240"
                        popper-class="pop-custom"
                        trigger="click"
                        v-model="customBottomKeyOprVisible">
                        <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                          <div class="index-pop-item" @click="changeCustomBottomSwitchKeyOprType($event, 0)">
                            <el-row>
                              <el-col :span="20">
                                <div class="textLeft">
                                  <span>{{$t("释放")}}</span>
                                </div>
                              </el-col>
                              <el-col :span="4">
                                <div class="textRight" v-if="formSwitchOrder.keyOpr === 0">
                                  <span><i class="fa fa-check-circle color-success"></i></span>
                                </div>
                              </el-col>
                            </el-row>
                          </div>
                          <div class="index-pop-item" @click="changeCustomBottomSwitchKeyOprType($event, 1)">
                            <el-row>
                              <el-col :span="20">
                                <div class="textLeft">
                                  <span>{{$t("按下")}}</span>
                                </div>
                              </el-col>
                              <el-col :span="4">
                                <div class="textRight" v-if="formSwitchOrder.keyOpr === 1">
                                  <span><i class="fa fa-check-circle color-success"></i></span>
                                </div>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                        <span slot="reference" size="mini">
                            <label>{{formSwitchOrder.keyOpr === '' && formSwitchOrder.keyOpr != 0 ? $t("请选择") : keyTypeInfo(formSwitchOrder.keyOpr)}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 6" label="延时时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="mini" v-model="formSwitchOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="100" :step="100"></el-input-number>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 9" label="空闲时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="mini" v-model="formSwitchOrder.emptyTime" @change="handleChange($event, 'emptyTime')" :min="100" :step="100"></el-input-number>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </el-drawer>
  </div>
</template>

<script>
import mixins from "../mixins/mixins";
import {common} from "../utils/api/url";
import {
  MessageSuccess,
  MessageWarning,
  orderValue,
  outTypeObj,
  keyType,
  orderColor,
  outEditTypeObj,
  openType,
  MessageError
} from "../utils/utils";
export default {
  mixins: [mixins],
  components: { },
  data(){
    return {
      popvisible: false,
      configLoading: false,
      sliderValue: 0,
      dataList:[],
      ruleList: [],
      roomList: [],
      deviceList: [],
      iconList: [],
      ruleCount: 0,
      ruleMax: 0,
      scrollLeft: 0,
      scrollTop: 0,
      screenOrientation: 'portrait',
      appType: 'app',
      paddingBottom: '0px',
      paddingMainBottom: '0px',
      oprType: '',
      oprOtherType: '',
      areaType: '',
      areaIndex: '',
      areaItem: '',
      drawerEnvVisible: false,
      drawer: false,
      drawerDevice: false,
      drawerDeviceBak: false,
      dialogVisible: false,
      drawerChild: false,
      drawerChildBottom: false,
      drawerBottomDialogVisible: false,
      customBottomVisible:false,
      customDrawBottomVisible:false,
      customBottomOpenVisible: false,
      customDrawBottomOpenVisible: false,
      customBottomKeyOprVisible: false,
      customDrawBottomKeyOprVisible: false,
      customBottomKeyVisible: false,
      customDrawBottomKeyVisible: false,
      customInsetVisible: false,
      drawerListVisible: true,
      drawerRoomVisible: false,
      drawerSenceVisible: false,
      dialogEnvSize: '70%',
      dialogHeight: '50%',
      dialogListSize: '100%',
      dialogRoomSize: '70%',
      drawerRightWidth: '90%',
      drawerRightChildWidth: '90%',
      direction: 'btt',
      directionDevice: 'rtl',
      directionList: 'rtl',
      screenArrow: '',
      setType: '',
      setChildType: '',
      setChildBottomType: '',
      templateType: '1',
      repetLoop: '无限重复',
      alertMessageTips: '',
      customBottomType: '1',
      customBottomOpen: '1',
      customBottomKeyOpr: '',
      timeOutEvent: 0,
      speed: '',
      touchStatus: false,
      taskIndex: '',
      taskItem: '',
      loopIndex: '',
      loopItem: '',
      senceIndex: '',
      senceItem: '',
      switchIndex: '',
      switchItem: '',
      oprOrderIndex: '',
      sceneList: [],
      taskList: [],
      taskResetList: [],
      planList:[],
      planTempList:[],
      taskTempList:[],
      orderList: [],
      configList: [],
      mainCodeData: '',
      removeSenceItem: '',
      timer: null,
      senceId: '',
      colors: {
        hue: 50,
        saturation: 100,
        luminosity: 50,
        alpha: 1
      },
      valuetext: '',
      divStyle: {
        'height': '0px',
        'overflow-y': 'auto',
      },
      dialogRightTabStyle:{
        'height': '0px',
        'overflow-y': 'auto',
      },
      dialogRightTabOrderStyle:{
        'height': '0px',
        'overflow-y': 'auto',
      },
      dialogRightChildTabStyle: {
        'height': '0px',
        'overflow-y': 'auto',
      },
      drawerBottomDialogStyle: {
        'height': '0px',
        'overflow-y': 'auto',
      },
      formPlain: {
        name: '',
        room: '',
        icon: '',
        template: ''
      },
      formTemplate: {
        name: '',
        room: '',
        change: '',
        setNum: 0,
        loop: 0
      },
      formOrder: {
        type: '1',
        light: 0,
        color: '',
        colorInt: '',
        temp: 2000,
        waitTime: 0,
        changeTime: 0,
        sence: '',
        senceText: '',
        senceRoom: '',
        senceName: '',
        open: '关灯',
        startLoop: 0,
        startOrder: '',
        startOrderI: '',
        emptyTime: 0
      },
      formCurtainsOrder: {
        type: 10,
        waitTime: 0,
        sence: '',
        startLoop: 0,
        startOrder: '',
        startOrderI: '',
        senceText: '',
        senceRoom: '',
        senceName: '',
        curtainsOpenClose: 0,
        emptyTime: 0
      },
      formSwitchOrder: {
        type: '11',
        keyArr: [],
        keyNoArr: [],
        key: '',
        keyOpr: '1',
        waitTime: 0,
        emptyTime: 0,
        senceRoom: '',
        senceName: '',
      },
      formSence:{
        id: '',
        envKey: '',
        name: '',
        iconId: 1,
        internal: true,
        roomId: '',
        sceneId: '',
        sceneName: '',
        sceneType: 1,
        sourceCode: '',
        openSource: true,
        img: ''
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
    // 监听窗口大小
    window.addEventListener( 'resize', () => (this.checkIndexOrient())
    );
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
  },
  beforeMount() {
    window.addEventListener('orientationchange', (e) => {
      this.checkIndexOrient();
    });
  },
  created() {
    this.appType = this.$route.query.appType;
    this.appType == 'app' ? this.paddingMainBottom = '104px' : this.paddingMainBottom = '0px';
    this.appType == 'app' ? this.paddingBottom = '84px' : this.paddingBottom = '0px';

    this.initSenceList();

    this.checkIndexOrient();
    //this.initRoom();
    this.initDevice();
    //this.initICon();
    //this.initOrder();
  },
  methods:{
    initSenceList(){
      let params = {
        envKey: this.envKey
      };
      this.$axios.get(this.baseUrl + common.senceList, {params: params, sessionId: this.sessionId}).then(res => {
        if (res.data.code == 200){
          this.sceneList = res.data.data;
        }else {
          MessageWarning(res.data.msg);
        }
      });
    },
    init(){
      this.dataList = [];
      this.ruleList = [];
      for (let i = 0; i < this.taskList.length; i++){
        this.ruleCount = 0;
        for (let j = 0; j < this.taskList[i].length; j++){
          //let aNumber = (5 - 1) * Math.random() + 1;
          let aNumber = 0;
          if (this.taskList[i][j].i == 1 || this.taskList[i][j].i == 2){
            aNumber = this.taskList[i][j].sec / 100;
            //aNumber = this.taskList[i][j].sec;
          }
          // else if(this.taskList[i][j].i == 6 || this.taskList[i][j].i == 7 || this.taskList[i][j].i == 3 || this.taskList[i][j].i == 4
          //   || this.taskList[i][j].i == 8 || this.taskList[i][j].i == 9 || this.taskList[i][j].i == 10 || this.taskList[i][j].i == 11){
          //   aNumber = this.taskList[i][j].sec / 100;
          // }
          let result = Math.floor(aNumber);
          this.ruleCount += result;
        }
        this.ruleList.push(this.ruleCount);
      }

      let ruleMax = Math.max(...this.ruleList);
      this.ruleMax = ruleMax;
      console.log(1111111,ruleMax);
      //this.handleScrollTop()
      //this.$router.push("/index2");
    },
    initRoom(){
      this.roomList = [];
      for (let i = 0; i < 30; i++){
        this.roomList.push({
          _checked: false,
          name: i
        });
      }
    },
    initICon(){
      this.iconList = [];
      for (let i = 0; i < 30; i++){
        this.iconList.push({
          _checked: false,
          name: i
        });
      }
    },
    initDevice(){
      this.deviceList = [];
      for (let i = 0; i < this.deviceList.length; i++){
        this.deviceList.push({
          _checked: false,
          name: i
        });
      }
    },
    initOrder(event, item){
      this.orderList = [];
      for (let i = 0; i < 20; i++){
        this.orderList.push({
          insertVisible: false,
          name: i
        });
      }
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
      return hours + ':' + mins + ':' + secs + "." + secss;
    },
    hhIndex(type){
      if (process.browser) {
        //this.divStyle.height = window.innerHeight-40-60 + 'px';
        let height = this.setType == 'template' ? window.innerHeight-45-60-30 : window.innerHeight-45-60;
        let heightChild = window.innerHeight-45-60;
        let heightBottomChild = type == 'landscape' ? window.innerHeight * 0.7-45 : window.innerHeight * 0.5-45;
        let heightOrder = window.innerHeight-45-60;
        this.$set(this.divStyle,'height', window.innerHeight-40-60 + 'px');
        this.$set(this.dialogRightTabStyle,'height', height + 'px');
        this.$set(this.dialogRightChildTabStyle,'height', heightChild + 'px');
        this.$set(this.drawerBottomDialogStyle,'height', heightBottomChild + 'px');
        this.$set(this.dialogRightTabOrderStyle,'height', heightOrder + 'px');
      }
    },
    checkIndexOrient() {
      if (process.browser) {
        if (window.orientation == 0 || window.orientation == 180){
          this.screenOrientation = 'portrait';
          this.dialogHeight = '50%';
          this.paddingBottom = this.appType == 'app' ? '84px' : '0px';
          this.appType == 'app' ? this.paddingMainBottom = '104px' : this.paddingMainBottom = '0px';
        }
        else if (window.orientation == 90 || window.orientation == -90){
          this.screenOrientation = 'landscape';
          this.dialogHeight = '80%';
          this.paddingBottom = this.appType == 'app' ? '35px' : '0px';
          this.appType == 'app' ? this.paddingMainBottom = '55px' : this.paddingMainBottom = '0px';
        }
        this.hhIndex(this.screenOrientation);
        this.setDialogWidth(this.setType);
        return this.screenOrientation;
      }
    },
    handleScroll(e) {
      this.touchStatus = false;
      this.scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      if(e.target.className != "pop-child-bLock"){
        this.hidePopVisible();
      }
    },
    handleScrollTop(){
      this.touchStatus = false;
      this.changeFlag(true);
      if (this.minxinsScroll) {
        this.$parent.$parent.$refs.menuRef.scrollTop = this.$refs.wrapper.scrollTop;
      }
      this.hidePopVisible();
    },
    setDialogWidth(type){
      let screenWidth = window.innerWidth;
      if (this.appType == 'app'){
        if (type == 'template'){
          this.drawerRightWidth = '100%';
        }else {
          this.drawerRightWidth = '90%';
        }
        this.drawerRightChildWidth = '90%';
      }else {
        if (screenWidth < 550){
          if (type == 'template'){
            this.drawerRightWidth = '100%';
          }else {
            this.drawerRightWidth = '90%';
          }
          this.drawerRightChildWidth = '90%';
        }else{
          if (type == 'template'){
            this.drawerRightWidth = '60%';
          }else {
            this.drawerRightWidth = '60%';
          }
          this.drawerRightChildWidth = '50%';
        }
      }
    },
    selEnvList(){
      this.getEnvList();
      this.drawerEnvVisible = true;
    },
    selBlock(event, item, index, itemBlock, indexBlock){
      this.orderList = item;
      this.taskIndex = index;
      this.oprOtherType = "orderList";

      this.clearForm();
      this.formOrder.type = "";
      this.formCurtainsOrder.type = "";
      this.formSwitchOrder.type = "";
      this.loopIndex = "";
      this.loopItem = "";
      this.senceIndex = "";
      this.senceItem = "";
      this.switchIndex = "";
      this.switchItem = "";

      if (this.planList[index].t == 1){
        this.setChildBottomType = 'lightSub';
        this.formOrder.type = 1;
        this.customBottomType = 1;
      }else if (this.planList[index].t == 2){
        this.setChildBottomType = 'switchSub';
        this.customBottomType = 11;
        this.formSwitchOrder.type = 11;
      }else if (this.planList[index].t == 3){
        this.setChildBottomType = 'curtainsSub';
        this.customBottomType = 10;
        this.formCurtainsOrder.type = 10;
      }

      this.drawerDevice = true;
      for (let i = 0; i < this.taskList.length; i++){
        for (let j = 0; j < this.taskList[i].length; j++){
          // if (i == index && indexBlock == j){
          //   this.taskList[i].list[j].popVisible = !this.taskList[i].list[j].popVisible;
          // }else {
          //   this.taskList[i].list[j].popVisible = false;
          // }
          this.taskList[i][j].popVisible = false;
        }
      }

      console.log(this.formOrder.type, this.formSwitchOrder.type);
    },
    selSence(event, item, type){
      if (type == 'menu'){
        this.senceId = item.sceneId;
        this.$axios.get(item.sourceUrl).then(res => {
          this.mainCodeData = {
            id: res.data.id,
            room: res.data.room,
            name: res.data.name,
            icon: res.data.icon,
            enable: res.data.enable,
            internal: res.data.internal,
            duration: res.data.duration,
          };
          this.setSenceData(res.data.tasks);
          this.drawerListVisible = false;
        });
      }else {
        this.setSenceData(event, 'setChild');
      }
    },
    selRoom(){
      this.drawerRoomVisible = true;
    },
    selRoomItem(event, item){
      this.formSence.roomId = item.id;
      this.formSence.img = "~/static/img/" + item.id + ".png";
      this.drawerRoomVisible = false;
    },
    setSenceData(item, type){
      let data = item;
      let plans = [];
      let tasks = [];
      let tasksTemp = [];
      for (let i = 0; i < data.length; i++){
        plans.push({
          d: data[i].d,
          n: data[i].n,
          t: data[i].t,
          i: data[i].i
        });

        tasksTemp = [];
        for (let j = 0; j < data[i].i.length; j++){
          tasksTemp.push({
            i: data[i].i[j].i,
            popVisible: false,
            v: data[i].i[j].v
          });
          if (data[i].i[j].i == 1 || data[i].i[j].i == 2){
            tasksTemp[j]['sec'] = data[i].i[j].v
          }else{
            tasksTemp[j]['sec'] = 100
          }
          if (data[i].i[j].t){
            tasksTemp[j]['t'] = data[i].i[j].t
          }else {
            tasksTemp[j]['t']
          }
          if (data[i].i[j].r){
            tasksTemp[j]['r'] = data[i].i[j].r
          }
          if (data[i].i[j].g){
            tasksTemp[j]['g'] = data[i].i[j].g
          }
          if (data[i].i[j].s == 0 || data[i].i[j].s){
            tasksTemp[j]['s'] = data[i].i[j].s
          }
        }
        tasks.push(tasksTemp);
      }
      this.planList = plans;
      this.taskList = tasks;

      console.log(this.planList);
      console.log(this.taskList);
      this.$parent.$parent.initMenu(this.planList);
      this.init();
      this.setTaskList(this.taskList, type);
    },
    setTaskList(taskList, type){//重新组装tasklist，用于显示列表
      let list = [];
      let array = [];
      for (let i = 0; i < taskList.length; i++){
        for (let j = 0; j < taskList[i].length; j++){
          if (taskList[i][j].i != 1 && taskList[i][j].i != 2){
            array.push(taskList[i][j]);
          }else if (taskList[i][j].i == 2){
            taskList[i][j]['list'] = array;
            array = [];
          }
        }
      }
      this.taskResetList = taskList;
      //原始数据
      if (type != 'setChild'){
        this.taskTempList = JSON.parse(JSON.stringify(taskList));
        this.planTempList = JSON.parse(JSON.stringify(this.planList));
      }
    },
    mousedown(){

    },
    hidePopVisible(){
      if (this.touchStatus == true){
        return;
      };
      for (let i = 0; i < this.taskList.length; i++){
        for (let j = 0; j < this.taskList[i].length; j++){
          //console.log(this.taskList[i][j]);
          this.taskList[i][j].popVisible = false;
        }
      }

      for (let i = 0; i < this.orderList.length; i++){
        this.$set(this.orderList[i], 'insertVisible', false);
      }

      //this.$forceUpdate();
    },
    openDialogSence(){
      this.drawerSenceVisible = true;
    },
    setSence(event, item, index, type){
      this.clearForm();
      this.formOrder.type = "";
      this.formCurtainsOrder.type = "";
      this.formSwitchOrder.type = "";
      this.loopIndex = "";
      this.loopItem = "";
      this.senceIndex = "";
      this.senceItem = "";
      this.switchIndex = "";
      this.switchItem = "";
      //暂时屏蔽
      if (this.planList[index].t == 1){
        this.setChildBottomType = 'lightSub';
        this.formOrder.type = 1;
        this.customBottomType = 1;
      }else if (this.planList[index].t == 2){
        this.setChildBottomType = 'switchSub';
        this.customBottomType = 11;
        this.formSwitchOrder.type = 11;
      }else if (this.planList[index].t == 3){
        this.setChildBottomType = 'curtainsSub';
        this.customBottomType = 10;
        this.formCurtainsOrder.type = 10;
      }

      console.log(this.formOrder.type, this.formSwitchOrder.type);

      this.taskIndex = index;
      this.taskItem = item;
      this.drawer = true;
    },
    okConfirm(){
      this.alertMessageTips = this.$t("确认保存该指令？");
      this.oprType = 'order';
      this.dialogVisible = true;
    },
    addPlain(){
      this.drawer = true;
    },
    cancelDrawer(){
      this.drawer = false;
    },
    cancelDeviceDrawer(){
      this.drawerDevice = false;
    },
    cancelChildDrawer(){
      this.drawerChild = false;
    },
    cancelChildBottomDrawer(){
      this.areaIndex = "";
      this.areaItem = "";
      //this.clearForm();
      this.drawerBottomDialogVisible = false;
      //this.setChildBottomType = "";
      //this.customBottomType = 1;
    },
    addDialog(event, type){
      this.drawerDevice = true;
      this.setType = type;
      this.setDialogWidth(type);
      this.hhIndex();
    },
    addChildDialog(event, type){
      this.drawerChild = true;
      this.setChildType = type;
      this.hhIndex();
    },
    addChildBottomDialog(event, type, index){
      //this.drawerChildBottom = true;
      //this.setChildBottomType = type;
      if (this.setChildBottomType == 'lightSub'){
        this.formOrder.type = 1;
        this.formOrder.changeTime = 100;
        this.formOrder.open = 1;
        this.customBottomType = 1;
      }else if (this.setChildBottomType == 'switchSub'){
        this.customBottomType = 11;
        this.formSwitchOrder.type = 11;
        this.formSwitchOrder.keyArr = [];
        this.formSwitchOrder.keyOpr = 1;
      }else if (this.setChildBottomType == 'curtainsSub'){
        this.customBottomType = 10;
        this.formCurtainsOrder.type = 10;
        this.formCurtainsOrder.curtainsOpenClose = 0;
      }
      //this.clearForm();
      this.oprOtherType = "orderList";
      this.drawerBottomDialogVisible = true;
    },
    upateChildBottomDialog(event, type, index, item){
      this.areaIndex = index;
      this.areaItem = item;
      this.oprOtherType = "editOrderList";
      console.log(item);
      if (this.setChildBottomType == 'lightSub'){
        this.formOrder.type = item.i;
        this.customBottomType = this.outEditTypeObjInfo(item.i);
        if (item.i == 1){
          this.formOrder.emptyTime = item.v;
        }else if (item.i == 6){
          this.formOrder.open = item.v;
          this.formOrder.changeTime = item.t;
        }else if (item.i == 2){
          this.formOrder.waitTime = item.v;
        }else if (item.i == 7){
          this.formOrder.light = item.v;
          this.formOrder.changeTime = item.t;
        }else if (item.i == 8){
          this.formOrder.temp = item.v;
          this.formOrder.changeTime = item.t;
        }else if (item.i == 3){
          this.formOrder.startLoop = item.t;
          this.formOrder.startOrder = item.v;
          this.formOrder.startOrderI = this.orderList[item.v].i;
        }else if (item.i == 4){
          this.formOrder.sence = item.v;
          this.formOrder.senceRoom = item.r;
          this.formOrder.senceText = item.n;
        }else if (item.i == 9){
          this.formOrder.color = this.converArgbToRgb(item.v);
          this.formOrder.colorInt = item.v;
          this.formOrder.changeTime = item.t;
        }
      }else if (this.setChildBottomType == 'switchSub') {
        this.formSwitchOrder.type = item.i;
        this.customBottomType = this.outEditTypeObjInfo(item.i);
        if (item.i == 11) {
          this.formSwitchOrder.keyArr = [];
          this.formSwitchOrder.keyNoArr = [];
          this.formSwitchOrder.keyArr = item.v;
          for (let i = 0; i < item.v.length; i++){
            this.formSwitchOrder.keyNoArr.push(item.v[i] + 1);
          }
          this.formSwitchOrder.keyOpr = item.s;
        }else if (item.i == 1){
          this.formSwitchOrder.emptyTime = item.v;
        }else if (item.i == 2){
          this.formSwitchOrder.waitTime = item.v;
        }
      }else if (this.setChildBottomType == 'curtainsSub') {
        this.formCurtainsOrder.type = item.i;
        this.customBottomType = item.i;
        if (item.i == 10) {
          this.formCurtainsOrder.curtainsOpenClose = item.v;
        }else if (item.i == 1){
          this.formCurtainsOrder.emptyTime = item.v;
        }else if (item.i == 4){
          this.formCurtainsOrder.sence = item.v;
          this.formCurtainsOrder.senceRoom = item.r;
          this.formCurtainsOrder.senceText = item.n;
        }else if (item.i == 2){
          this.formCurtainsOrder.waitTime = item.v;
        }
      }
      this.drawerBottomDialogVisible = true;
    },
    insertOrder(event, item, index, area, type){
      //this.setChildBottomType = type;
      this.areaType = area;
      this.areaIndex = index;
      this.drawerBottomDialogVisible = true;
      for (let i = 0; i < this.orderList.length; i++){
        this.orderList[i].insertVisible = false;
      }
    },
    insertOrderOpr(event, item, index){
      for (let i = 0; i < this.orderList.length; i++){
        this.orderList[i].insertVisible = false;
      }
      item.insertVisible = true;
      this.$forceUpdate();
    },
    selTemplate(event, type){
      this.templateType = type;
    },
    closeDrawer(){
      this.templateType = 1;
      this.drawerBottomDialogVisible = false;
      this.customBottomType = 1;
      this.customBottomOpen = 1;
      this.oprOtherType = "";
      this.areaType = "";
      this.areaIndex = "";
      this.areaItem = "";
      this.clearForm();
      this.setDialogWidth(this.setType);
    },
    closeChildDrawer(){
    },
    clearForm(){
      this.formOrder = {
        type: '1',
        light: 0,
        color: '',
        colorInt: '',
        temp: 2000,
        waitTime: 0,
        changeTime: 0,
        sence: '',
        senceText: '',
        senceRoom: '',
        senceName: '',
        open: '1',
        startLoop: 0,
        startOrder: '',
        startOrderI: '',
        emptyTime: 0
      };
      this.formCurtainsOrder = {
        type: 10,
        waitTime: 0,
        sence: '',
        startLoop: 0,
        startOrder: '',
        startOrderI: '',
        senceText: '',
        senceRoom: '',
        senceName: '',
        curtainsOpenClose: 0,
        emptyTime: 0
      };
      this.formSwitchOrder = {
        type: '11',
        keyArr: [],
        keyNoArr: [],
        key: '',
        keyOpr: '1',
        waitTime: 0,
        emptyTime: 0,
        senceRoom: '',
        senceName: '',
      }
    },
    handleChange(data, type){
      if (type == 'setNum'){
        this.formTemplate.setNum = data;
      }else if (type == 'loop'){
        this.formTemplate.loop = data;
      }else if (type == 'changeTime'){
        this.formOrder.changeTime = data;
      }else if (type == 'waiteTime'){
        this.formOrder.waiteTime = data;
        this.formSwitchOrder.waiteTime = data;
      }else if (type == 'light'){
        this.formOrder.light = data;
      }else if (type == 'temp'){
        this.formOrder.temp = data;
      }else if (type == 'startLoop'){
        this.formOrder.startLoop = data;
      }else if (type == 'curtainsOpenClose'){
        this.formCurtainsOrder.curtainsOpenClose = data;
      }else if (type == 'emptyTime'){
        this.formCurtainsOrder.emptyTime = data;
        this.formSwitchOrder.emptyTime = data;
      }
    },
    closeDialog(){
      //this.selMenuData = "";
    },
    closeOprDrawer(){
      this.formSence = {
        id: '',
        envKey: '',
        name: '',
        iconId: 1,
        internal: true,
        roomId: '',
        sceneId: '',
        sceneName: '',
        sceneType: 1,
        sourceCode: '',
        openSource: true
      };
    },
    closeDrawder(){
      this.formOrder = {
        type: '1',
        light: 0,
        color: '',
        temp: 2000,
        waitTime: 0,
        changeTime: 0,
        sence: '',
        open: '关灯',
        startLoop: 0,
        startOrder: '',
        emptyTime: 0
      };
      this.customBottomOpen = 1;
      this.customBottomType = 1;
    },
    delOpr(event, index, type){
      this.oprOrderIndex = index;
      this.oprType = 'delOrder';
      this.alertMessageTips = this.$t("确定删除该数据吗？");
      this.dialogVisible = true;
    },
    changeCustomBottomType(event, type){
      this.formOrder.type = type;
      this.areaItem = "";
      this.customBottomType = type;
      this.customBottomVisible = false;
      this.customDrawBottomVisible = false;
    },
    changeCustomBottomSwitchType(event, type){
      this.areaItem = "";
      this.formSwitchOrder.type = type;
      this.customBottomType = type;
      this.customBottomVisible = false;
      this.customDrawBottomVisible = false;
    },
    changeCustomBottomCurtainsType(event, type){
      this.areaItem = "";
      this.formCurtainsOrder.type = type;
      this.customBottomType = type;
      this.customBottomVisible = false;
      this.customDrawBottomVisible = false;
    },
    changeCustomBottomOpen(event, type){
      this.formOrder.open = type;
      this.customBottomOpen = type;
      this.customBottomOpenVisible = false;
      this.customDrawBottomOpenVisible = false;
    },
    changeCustomBottomSwitchKeyOprType(event, type){
      this.formSwitchOrder.keyOpr = type;
      this.customBottomKeyOpr = type;
      this.customBottomKeyOprVisible = false;
      this.customDrawBottomKeyOprVisible = false;
    },
    selSpeed(item, index){
      this.speed = index;
    },
    selPressBlock(event, item, index, itemBlock, indexBlock){
      event.preventDefault();
      for (let i = 0; i < this.taskList.length; i++){
        for (let j = 0; j < this.taskList[i].length; j++){
          if (i == index && indexBlock == j){
            this.taskList[i][j].popVisible = !this.taskList[i][j].popVisible;
          }else {
            this.taskList[i][j].popVisible = false;
          }
        }
      }
      this.touchStatus = true;
    },
    inputColor(hue){
      let rgb = this.hsltorgb(hue, this.colors.saturation, this.colors.luminosity);
      let color = this.colorRGBtoHex(rgb[0],rgb[1],rgb[2]);
    },
    changeColor(hue){
      let rgb = this.hsltorgb(hue, this.colors.saturation, this.colors.luminosity);
      let color = this.colorRGBtoHex(rgb[0],rgb[1],rgb[2]);
      this.formOrder.color = "#"+color;
      this.formOrder.colorInt = Math.abs(this.converRgbToArgb(rgb[0],rgb[1],rgb[2]));
    },
    converRgbToArgb(r,g,b){
      var color = ((0xFF0000 << 24)|(r << 16)|(g << 8)|b);
      return color;
    },
    converArgbToRgb(argb){
      var rgb = [];
      rgb[0] = (argb & 0xff0000) >> 16;
      rgb[1] = (argb & 0xff00) >> 8;
      rgb[2] = (argb & 0xff);
      return "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
    },
    hsltorgb(h,s,l) {
      var h = h / 360;
      var s = s / 100;
      var l = l / 100;
      var rgb = [];

      if (s == 0) {
        rgb = [Math.round(l * 255), Math.round(l * 255), Math.round(l * 255)];
      } else {
        var q = l >= 0.5 ? (l + s - l * s) : (l * (1 + s));
        var p = 2 * l - q;
        var tr = rgb[0] = h + 1 / 3;
        var tg = rgb[1] = h;
        var tb = rgb[2] = h - 1 / 3;
        for (var i = 0; i < rgb.length; i++) {
          var tc = rgb[i];
          if (tc < 0) {
            tc = tc + 1;
          } else if (tc > 1) {
            tc = tc - 1;
          }
          switch (true) {
            case (tc < (1 / 6)):
              tc = p + (q - p) * 6 * tc;
              break;
            case ((1 / 6) <= tc && tc < 0.5):
              tc = q;
              break;
            case (0.5 <= tc && tc < (2 / 3)):
              tc = p + (q - p) * (4 - 6 * tc);
              break;
            default:
              tc = p;
              break;
          }
          rgb[i] = Math.round(tc * 255);
        }
      }
      return rgb;
    },
    colorRGBtoHex(r, g, b) {
      return ("00000" + (r << 16 | g << 8 | b).toString(16)).slice(-6);
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
    },
    selLoopOrder(event, item, index, type){
      this.loopIndex = index;
      this.loopItem = item;
      if (type == "lightSub"){
        this.formOrder.startOrder = item.i;
        this.formOrder.startOrderI = this.orderList[index].i;
      }else if (type == "curtainsSub"){
        this.formCurtainsOrder.startOrder = item.i;
        this.formOrder.startOrderI = this.orderList[index].i;
      }
      this.customBottomOpenVisible = false;
      this.customDrawBottomOpenVisible = false;
    },
    selSenceUse(event, item, index, type){
      this.senceIndex = index;
      this.senceItem = item;
      if (type == "lightSub"){
        this.formOrder.sence = item.sceneId;
        this.formOrder.senceText = item.sceneName;
        this.formOrder.senceRoom = item.roomId;
      }else if (type == "curtainsSub"){
        this.formCurtainsOrder.sence = item.sceneId;
        this.formCurtainsOrder.senceText = item.sceneName;
        this.formCurtainsOrder.senceRoom = item.roomId;
      }
      this.customBottomOpenVisible = false;
      this.customDrawBottomOpenVisible = false;
    },
    selSwitchKey(event, item, index){
      if (this.formSwitchOrder.keyArr.indexOf(index) == -1){
        this.formSwitchOrder.keyArr.push(index);
        this.formSwitchOrder.keyNoArr.push(index+1);
      }else{
        let indexItem = this.formSwitchOrder.keyArr.indexOf(index);
        this.formSwitchOrder.keyArr.splice(indexItem, 1);
        this.formSwitchOrder.keyNoArr.splice(indexItem, 1);
      }
      this.switchIndex = index;
      this.switchItem = item;
      this.formSwitchOrder.key = index;
    },
    saveOpr(){
      console.log("----"+this.formOrder.type,this.formSwitchOrder.type,this.formCurtainsOrder.type);
      //验证
      if (this.setChildBottomType == 'lightSub'){
        if (outTypeObj(this.formOrder.type) == 9){
          if (this.formOrder.color == ""){
            MessageWarning(this.$t("请设置颜色！"));
            return;
          }
        }else if (outTypeObj(this.formOrder.type) == 3){
          if (this.formOrder.startOrderI == ""){
            MessageWarning(this.$t("请设置起始位置！"));
            return;
          }
        }else if (outTypeObj(this.formOrder.type) == 4){
          if (this.formOrder.sence == ""){
            MessageWarning(this.$t("请设置场景！"));
            return;
          }
        }
      }else if (this.setChildBottomType == 'switchSub'){
        if (this.formSwitchOrder.type == 11){
          if (this.formSwitchOrder.keyArr.length <= 0){
            MessageWarning(this.$t("请设置继电器！"));
            return;
          }
        }
      }if (this.setChildBottomType == 'curtainsSub'){
        if (this.formCurtainsOrder.type == 3){
          if (this.formCurtainsOrder.startOrderI == ""){
            MessageWarning(this.$t("请设置起始位置！"));
            return;
          }
        }else if (this.formOrder.type == 4){
          if (this.formCurtainsOrder.sence == ""){
            MessageWarning(this.$t("请设置场景！"));
            return;
          }
        }
      }

      if (this.oprType == 'order'){
        let obj = {}
        if (this.formOrder.type != ""){
          if (this.oprOtherType == "editOrderList"){
            if (this.areaItem != ""){
              obj = {
                i : this.formOrder.type
              }
              this.formOrder.type = outEditTypeObj(this.formOrder.type);
            }else {
              obj = {
                i : outTypeObj(this.formOrder.type)
              }
              this.formOrder.type = this.formOrder.type;
            }
          }else {
            obj = {
              i : outTypeObj(this.formOrder.type)
            }
          }
        }else if (this.formCurtainsOrder.type != ""){
          obj = {
            i : this.formCurtainsOrder.type
          }
        }else if (this.formSwitchOrder.type != ""){
          if (this.oprOtherType == "editOrderList"){
            if (this.areaItem != ""){
              console.log(1);
              obj = {
                i : this.formSwitchOrder.type
              }
              this.formSwitchOrder.type = outEditTypeObj(this.formSwitchOrder.type);
            }else {
              console.log(2);
              obj = {
                i : outTypeObj(this.formSwitchOrder.type)
              }
              this.formSwitchOrder.type = this.formSwitchOrder.type;
            }
          }else {
            console.log(3);
            obj = {
              i : outTypeObj(this.formSwitchOrder.type)
            }
          }
        }

        if (outTypeObj(this.formOrder.type) == 1 || outTypeObj(this.formSwitchOrder.type) == 1 || this.formCurtainsOrder.type == 1){
          if (this.formOrder.type != ""){
            obj['v'] = this.formOrder.emptyTime;
            obj['sec'] = this.formOrder.emptyTime;
          }else if (this.formCurtainsOrder.type != ""){
            obj['v'] = this.formCurtainsOrder.emptyTime;
            obj['sec'] = this.formCurtainsOrder.emptyTime;
          }else if (this.formSwitchOrder.type != ""){
            obj['v'] = this.formSwitchOrder.emptyTime;
            obj['sec'] = this.formSwitchOrder.emptyTime;
          }
        }else if (outTypeObj(this.formOrder.type) == 2 || this.formCurtainsOrder.type == 2 || outTypeObj(this.formSwitchOrder.type) == 2){
          if (this.formOrder.type != ""){
            obj['v'] = this.formOrder.waitTime;
            obj['sec'] = this.formOrder.waitTime;
          }else if (this.formCurtainsOrder.type != ""){
            obj['v'] = this.formCurtainsOrder.waitTime;
            obj['sec'] = this.formCurtainsOrder.waitTime;
          }else if (this.formSwitchOrder.type != ""){
            obj['v'] = this.formSwitchOrder.waitTime;
            obj['sec'] = this.formSwitchOrder.waitTime;
          }
        }else if (outTypeObj(this.formOrder.type) == 6){
          obj['v'] = this.customBottomOpen;
          obj['t'] = this.formOrder.changeTime;
          obj['sec'] = this.formOrder.changeTime;
        }else if (outTypeObj(this.formOrder.type) == 7){
          obj['v'] = this.formOrder.light;
          obj['t'] = this.formOrder.changeTime;
          obj['sec'] = this.formOrder.changeTime;
        }else if (outTypeObj(this.formOrder.type) == 8){
          obj['v'] = this.formOrder.temp;
          obj['t'] = this.formOrder.changeTime;
          obj['sec'] = this.formOrder.changeTime;
        }else if (outTypeObj(this.formOrder.type) == 9){
          obj['v'] = this.formOrder.colorInt;
          obj['t'] = this.formOrder.changeTime;
          obj['sec'] = this.formOrder.changeTime;
        }else if (outTypeObj(this.formOrder.type) == 3 || this.formCurtainsOrder.type == 3){//循环指令，时间默认1
          obj['v'] = this.loopIndex;
          obj['t'] = this.formOrder.startLoop;
          obj['sec'] = 100;
        }else if (outTypeObj(this.formOrder.type) == 4 || this.formCurtainsOrder.type == 4){//场景指令，时间默认1
          if (this.formOrder.sence != ""){
            obj['v'] = this.formOrder.sence;
            obj['r'] = this.formOrder.senceRoom;
            obj['n'] = this.formOrder.senceText;
          }else if (this.formCurtainsOrder.sence != ""){
            obj['v'] = this.formCurtainsOrder.sence;
            obj['r'] = this.formCurtainsOrder.senceRoom;
            obj['n'] = this.formCurtainsOrder.senceText;
          }
          obj['t'] = 100;
          obj['sec'] = 100;
        }else if (outTypeObj(this.formCurtainsOrder.type) == 10){//行程指令，时间默认1
          obj['v'] = this.formCurtainsOrder.curtainsOpenClose;
          obj['t'] = 100;
          obj['sec'] = 100;
        }else if (outTypeObj(this.formSwitchOrder.type) == 11){//继电器操作指令，时间默认1
          obj['v'] = this.formSwitchOrder.keyArr;
          obj['s'] = this.formSwitchOrder.keyOpr;
          obj['t'] = 100;
          obj['sec'] = 100;
        }
        console.log(obj);
        //this.taskItem.push(obj);

        if (this.oprOtherType == "orderList"){
          if (this.areaType == 'pre'){
            this.orderList.splice(this.areaIndex, 0, obj);
          }else if(this.areaType == 'next'){
            this.orderList.splice(this.areaIndex + 1, 0, obj);
          }else {
            this.orderList.push(obj);
          }
        }else if(this.oprOtherType == "editOrderList"){
          this.orderList[this.areaIndex] = obj;
        }else {
          this.taskList[this.taskIndex].push(obj);
        }
        this.planList[this.taskIndex]['i'].push(obj);
        this.init();
        this.setTaskList(this.taskList);
        this.dialogVisible = false;
        this.drawer = false;
        this.drawerBottomDialogVisible = false;
        this.areaIndex = "";
        this.areaItem = "";
        //this.clearForm();
      }else if(this.oprType == 'delOrder'){
        this.taskList[this.taskIndex].splice(this.oprOrderIndex, 1);
        this.planList[this.taskIndex]['i'].splice(this.oprOrderIndex, 1);;
        this.init();
        this.setTaskList(this.taskList);
        this.dialogVisible = false;
      }else if (this.oprType == 'removeSence'){
        this.removeSence(this.removeSenceItem.sceneId);
      }
      console.log(this.planList);
    },
    cancelConfig(){
      this.drawerSenceVisible = false;
    },
    saveConfig(){
      if (this.formSence.name == ""){
        MessageWarning(this.$t("请输入场景名称"));
        return;
      }else if (this.formSence.roomId == ""){
        MessageWarning(this.$t("请选择房间"));
        return;
      }
      this.configLoading = true;

      let taskList = JSON.parse(JSON.stringify(this.taskList));
      //清理不需要的属性
      let planList = JSON.parse(JSON.stringify(this.planList));
      let taskTempArr = [];

      for (let i = 0; i < taskList.length; i++){
        for (let j = 0; j < taskList[i].length; j++){
          if (taskList[i][j].popVisible != undefined || taskList[i][j].popVisible != null){
            taskList[i][j].popVisible = undefined;
          }
          if (taskList[i][j].sec){
            taskList[i][j].sec = undefined;
          }
          if (taskList[i][j].insertVisible){
            taskList[i][j].insertVisible = undefined;
          }
        }
      }

      for (let i = 0; i < planList.length; i++){
        planList[i]['i'] = taskList[i];
      }
      //源码用
      let dataObj = {
        id:this.formSence.id,
        room: this.formSence.roomId,
        name: this.formSence.name,
        icon: 1,
        enable: 1,
        internal: 1,
        duration: 2000,
        tasks: planList
      };
      //云端用
      let codeData = {
        envKey: this.$route.query.envKey,
        iconId: 1,
        internal: false,
        openSource: false,
        roomId: this.formSence.roomId,
        sceneName: this.formSence.name,
        sceneType: 1,
        sourceCode: JSON.stringify(dataObj)
      };
      if (this.formSence.id != ""){
        codeData['sceneId'] = this.formSence.id;
      }
      //console.log(JSON.stringify(codeData));
      codeData = this.$qs.stringify(codeData);
      let url = (this.formSence.id == "" || this.formSence.id == undefined) ? common.createSence : common.editSence;

      this.$axios.post(this.baseUrl + url, codeData, {sessionId: this.sessionId}).then(res => {
        if (res.data.code == 200){
          this.installSence(res.data.data.sceneId);
        }else {
          MessageError(res.data.msg);
          this.configLoading = false;
        }
      });
    },
    installSence(senceId){
      //loading: false
      let params = {
        envKey: this.$route.query.envKey,
        sceneId: senceId
      };
      params = this.$qs.stringify(params);
      this.$axios.post(this.baseUrl + common.installSence, params, {sessionId: this.sessionId}).then(res => {
        if (res.data.code == 200){
          MessageSuccess(res.data.msg);
          this.closeOprDrawer();
          this.drawerSenceVisible = false;
        }else {
          MessageError(res.data.msg);
        }
        this.configLoading = false;
      });
    },
    removeSenceOpr(event, item){
      this.alertMessageTips = this.$t("确认删除该场景吗？");
      this.oprType = "removeSence";
      this.removeSenceItem = item;
      this.dialogVisible = true;
    },
    removeSence(senceId){
      //loading: false
      let _self = this;
      let params = {
        envKey: this.$route.query.envKey,
        sceneId: senceId
      };
      params = this.$qs.stringify(params);
      this.$axios.post(this.baseUrl + common.removeSence, params, {sessionId: this.sessionId}).then(res => {
        if (res.data.code == 200){
          this.senceItem = "";
          clearInterval(this.timer);
          this.timer = setInterval(function (){
            _self.senceInfo(_self.removeSenceItem.sceneId);
          },1000);
        }else {
          MessageError(res.data.msg);
        }
      });
    },
    senceInfo(senceId){
      let params = {
        envKey: this.$route.query.envKey,
        sceneId: senceId
      };
      params = this.$qs.stringify(params);
      this.$axios.post(this.baseUrl + common.removeSence, params, {sessionId: this.sessionId}).then(res => {
        if (res.data.code == 201){
          clearInterval(this.timer);
          this.timer = null;
          this.dialogVisible = false;
          this.initSenceList();
        }
      });
    },
    createSence(){
      this.planList = [];
      this.taskList = [];
      this.drawerListVisible = false;
    },
    selEnv(event, item){
      this.$router.replace({
        query: {
          envKey: item.envKey,
          sessionId: this.sessionId
        }
      });
      this.envKey = item.envKey;
      this.drawerEnvVisible = false;
      this.initSenceList();
    },
    checkItemList(item,index){
      let count = 0;
      let countList = 0;
      for (let i = 0; i < this.taskResetList[index].length; i++){
        if (this.taskResetList[index][i].i != 1 && this.taskResetList[index][i].i !=2){
          count++;
        }else if (this.taskResetList[index][i].list.length > 0){
          count = 0;
          countList++;
        }else if (this.taskResetList[index][i].list.length == 0){
          countList = 0;
        }
      }
      return [count, countList];
    }
  }
}
</script>

<style scoped>
  .demoRuleClass{
    padding: 0px 0px;
    overflow-x: auto;
  }
  .demoRuleFixedClass{
    position: relative;
    top:0px;
    z-index:1;
    height: 40px;
    padding:0px 0px;
  }
  .demoRuleContentClass{
    position: relative;
    margin-top: 0px;
  }
  .demoRuleBlockClass:hover .demoRuleChildClass{
    box-shadow: 1px 1px 2px #000000;
  }
  .demoRuleChildClass{
    display: inline-block;
    min-width: 90px;
    height: 45px;
    text-align: center;
    /*border-right: 0.1px solid #434343;*/
    box-shadow: 0.5px 0px 1.5px #434343;
  }
  .demoRuleChildEmptyClass{
    display: inline-block;
    width: 1px;
    height: 30px;
  }
  .rule-class {
    min-width: 90px;
    height: 30px;
    display: inline-block;
  }
  .ver-line{
    height: 20px;
    width: 1px;
    background: #dddddd;
    position: relative;
    bottom: 0px;
  }
  .num{
    font-size: 12px;
  }
  .demoRuleChildClass:hover{
    /*box-shadow: 0px 0px 10px #000000;*/
  }
  .demoRuleBlockClass:hover{
    /*box-shadow: 0px 0px 10px #000000;*/
  }
  .guide{
    display: none;
    position: absolute;
    left: 1px;
    top: 0;
    z-index: 30;
  }
  .guide-v{
    border-left: 1px dashed #825723;
    height: 100%;
  }
  .index-plus-item{
    display: inline-block;
    position: relative;
    top: 12px;
    left: 20px;
  }
  .index-plus-list-item{
    display: inline-block;
    position: relative;
    top: 12px;
    left: 15px;
  }
  .item-icon{
    height: 50px;
    width: 50px;
  }
  .item-block{
    background: #eeeeee;
    border-radius: 5px;
    padding:10px;
    margin-bottom: 10px;
  }
  .item-list-child{
    padding:10px 10px;
    border-bottom: 1px solid #f8f8f8;
    color: #666666;
  }
  .drawerBottomDialog .header{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .drawerBottomDialog{
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 50%;
    width: 100%;
    background: #fefefe;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .drawerBottomDialogV .header{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .drawerBottomDialogV{
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 70%;
    width: 100%;
    background: #fefefe;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .drawerBottomDialogContent{
    position: absolute;
    top: 45px;
    left: 0px;
    width: 100%;
  }
  .share{
    z-index: 100;
    transition: bottom .5s ease-in;
  }
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 99;
  }
  /* 给过渡的name加样式 */
  .mybox-leave-active, .mybox-enter-active {
    transition: all 0.4s ease;
  }

  .mybox-leave-active, .mybox-enter {
    height: 0px !important;
  }

  .mybox-leave, .mybox-enter-active {
    height: 50%;
  }

  .myboxV-leave-active, .myboxV-enter-active {
    transition: all 0.4s ease;
  }

  .myboxV-leave-active, .myboxV-enter {
    height: 0px !important;
  }

  .myboxV-leave, .myboxV-enter-active {
    height: 70%;
  }
  .item-list-child-sub{
    height: 45px;
    line-height: 45px;
    border-bottom: 1px dashed #dddddd;
    padding: 0px 0px;
    color: #888888;
    font-size: 12px;
  }
  .item-list-child-main{
    border-bottom: 1px solid #ededed;
    padding: 15px 10px;
  }
  .item-active{
    box-shadow:0 0 5px #888888;
  }
  .index-main-item-block{
    font-size: 12px;
    padding: 0px 10px;
    position: relative;
    top: 12px;
  }
  .colorBlock{
    border: 1px solid #dddddd;
    height: 25px;
    width: 25px;
    border-radius: 5px;
    display: inline-block;
  }
</style>

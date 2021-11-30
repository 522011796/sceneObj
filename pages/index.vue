<template>
  <div class="main-block-class" @click="hidePopDocumentVisible($event, touchType)">
    <div id="guide-v" class="guide guide-v" @mousedown="mousedown"></div>
    <div class="demoRuleClass" :style="{'width': ruleMax / 10 * 52 + 43 + 0.1 + 'px'}">
      <div>
        <div class="demoRuleFixedClass" :style="{'width': ruleMax / 10 * 52 + 0.1+'px', 'left': -scrollLeft+0 + 'px'}">
          <div v-if="taskResetList.length > 0 && JSON.stringify(taskResetList[0]) != '[]' && Math.floor(ruleMax * 100 / 1000) <= 0" v-for="(itemNum, indexNum) in 1" :key="indexNum" class="rule-class" style="width: 52px">
            <div class="num">
              {{format(indexNum * 1000)}}
            </div>

            <div class="ver-line"></div>
          </div>
          <div v-if="taskResetList.length > 0 && Math.floor(ruleMax * 100 / 1000) > 0" v-for="(itemNum, indexNum) in Math.floor(ruleMax * 100 / 1000)" :key="indexNum" class="rule-class" style="width: 52px">
            <div class="num">
              {{format(indexNum * 1000)}}
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
               v-if="item.length > 0 && (itemBlock.i == 1 || itemBlock.i == 2 || itemBlock.i == 3 || itemBlock.i == 4)"
               :style="{
                        'background': orderColorInfo(itemBlock.i),
                        'width': itemBlock.secLoop ? itemBlock.secLoop / 1000 * 52 +'px' : itemBlock.sec / 1000 * 52 +'px',
                        'height':'40px',
                        'color': itemBlock.i == 1 ? '#ffffff' : '#555555',
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
                  <order-list-pop-child-dialog :item-block="itemBlock" :item="item"></order-list-pop-child-dialog>
                </div>
                <v-touch v-on:press="selPressBlock($event, item, index, itemBlock, indexBlock)" slot="reference" style="height: 100%; width: 100%; user-select: none;position: relative">
                  <div>
                    <div class="moon-ellipsis-class index-main-item-block font-size-10">
                      <span v-if="(itemBlock.i == 1 || itemBlock.i == 2 && (itemBlock.i != 3 || itemBlock.i != 4)) && (!itemBlock.list || itemBlock.list.length == 0)"
                                  :class="itemBlock.i == 1 ? 'color-ffffff' : 'color-434343'"
                      >
                        {{ orderValueInfo(itemBlock.i, 'set') }}
                      </span>
                      <span v-if="(itemBlock.i == 3) && (!itemBlock.list || itemBlock.list.length == 0)" class="color-434343">
                        <label v-if="itemBlock.t > 0">{{ orderValueInfo(itemBlock.i, 'set') }}</label>
                        <label v-if="itemBlock.t == 0">{{ $t("无限循环") }}</label>
                      </span>
                      <span v-if="(itemBlock.i == 4) && (!itemBlock.list || itemBlock.list.length == 0)" class="color-434343">
                        {{ itemBlock.n }}
                        <label v-if="itemBlock.sec == -1" class="color-default">({{ $t("无限循环") }})</label>
                      </span>

                      <span v-for="(itemList, indexList) in itemBlock.list" class="marginBottom2 pop-child-item">
                        {{orderValueInfo(itemList.i, 'set')}}
                        <label v-if="indexList != itemBlock.list.length - 1"> | </label>
                      </span>

                      <div v-if="itemBlock.i == 3" size="mini" class="color-error font-size-12" style="position: absolute; right: 0px; top: 0px; height:15px; width: 15px; line-height: 15px;color: #ffffff">
                        <span v-if="itemBlock.t != 0">{{ itemBlock.t }}</span>
                        <span v-if="itemBlock.t === 0" class="font-size-14">∞</span>
                      </div>

                      <div v-if="itemBlock.i == 4" size="mini" class="color-error font-size-12" style="position: absolute; right: 0px; top: 0px; height:15px; width: 15px; line-height: 15px;color: #ffffff">
<!--                        <span v-if="itemBlock.sec != -1">{{ itemBlock.t }}</span>-->
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

            <i class="fa fa-plus font-size-14" @click.stop="setSence($event, item, index, 'lightSub')"></i>
          </span>
        </div>
      </div>
    </div>

    <!--提示-->
    <alert-message-dialog :alert-message-tips="alertMessageTips" :timer="timer" :dialog-visible="dialogVisible" @cancel="cancelOpr" @okClick="saveOpr" @changeDrawer="closeAlertDialog"></alert-message-dialog>

    <!--场所列表-->
    <env-list-dialog :dialog-env-size="dialogEnvSize" :drawer-env-visible="drawerEnvVisible" :direction="direction" :data="globalEnvList"@click="selEnv" @changeDrawer="closeEnvDrawer"></env-list-dialog>

    <!--场景列表-->
    <scene-list-dialog ref="sceneIndexRef" :dialog-list-size="dialogListSize"
                       :dialog-bottom-size="dialogBottomSize"
                       :dialog-sub-child-size="dialogSubChildSize"
                       :drawer-list-visible="drawerListVisible"
                       :direction="directionEnvList"
                       :data="sceneList"
                       @logout="logout()"
                       @selEnvList="selEnvList"
                       @createSence="createSence"
                       @selSence="selSence"
                       @updateSenceOpr="updateSenceOpr"
                       @removeSenceOpr="removeSenceOpr"
    >
    </scene-list-dialog>

    <!--房间列表-->
    <room-list-dialog :dialog-room-size="dialogFullSize"
                      :drawer-room-visible="drawerRoomVisible"
                      :direction="appType != 'app' ? directionList : 'btt'"
                      :data="globalRoomList"
                      @changeDrawer="changeRoomDrawer"
                      @click="selRoomItem"
    >
    </room-list-dialog>

    <!--场景列表-->
    <el-drawer
      title="场景设置"
      custom-class="drawer-opr"
      :show-close="false"
      :modal="true"
      :size="dialogBottomSize"
      :wrapperClosable="false"
      :visible.sync="drawerSenceVisible"
      :direction="appType != 'app' ? directionList : 'btt'">

      <div slot="title">
        <div class="block-opr-header">
          <el-row>
            <el-col :span="4" class="textLeft">
              <el-button size="mini" @click="cancelConfig">{{$t("取消")}}</el-button>
            </el-col>
            <el-col :span="16" class="textCenter">
              <span>{{$t("场景设置")}}</span>
            </el-col>
            <el-col :span="4" class="textRight">
              <el-button v-if="configLoading == false" size="mini" type="warning" @click="saveConfig">
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
              <label class="color-666666 font-size-12">{{formSence.roomId == '' ? $t("请选择") : getGlobalRoomObj(formSence.roomId)}}</label>
              <label><i class="fa fa-chevron-right" style="font-size: 12px"></i></label>
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
                    <order-light-type-dialog :set-child-bottom-type="setChildBottomType" @click="changeCustomBottomType"></order-light-type-dialog>
                  </div>
                  <span slot="reference" size="mini" class="font-size-12">
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
                    <light-open-type-dialog @click="changeCustomBottomOpen"></light-open-type-dialog>
                  </div>
                  <span slot="reference" size="mini" class="font-size-12">
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
                              <el-tag size="mini">
                                <label class="font-size-12 color-default">
                                  {{index+1}}
                                </label>
                              </el-tag>
                            </span>
                            <span class="marginLeft10">
                              <loop-item :item="item"></loop-item>
                            </span>
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
                  <span slot="reference" size="mini" class="font-size-12">
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
                <el-input-number size="medium" v-model="formOrder.startLoop" @change="handleChange($event, 'startLoop')" :min="0" :step="1" :step-strictly="true"></el-input-number>
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
                    <order-power-type-dialog></order-power-type-dialog>
                  </div>
                  <span slot="reference" size="mini" class="font-size-12">
                            <label>{{formOrder.sence == '' ? $t("请选择") : formOrder.sence}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                </el-popover>
              </div>
            </el-form-item>
<!--            <el-form-item v-if="customBottomType == 5" label="场景名称" class="netmoon-form-item-border-dialog">-->
<!--              <div class="textRight color-666666">-->
<!--                <el-popover-->
<!--                  placement="left"-->
<!--                  width="240"-->
<!--                  popper-class="pop-custom"-->
<!--                  trigger="click"-->
<!--                  v-model="customDrawBottomOpenVisible">-->
<!--                  <div class="textCenter" style="max-height: 260px; overflow-y: auto">-->
<!--                    <div class="index-pop-item" v-for="(item, index) in sceneList" v-if="item.sceneId != senceId" :class="index != sceneList.length - 1 ? 'border-bottom-item' : ''">-->
<!--                      <el-row>-->
<!--                        <el-col :span="20">-->
<!--                          <div class="textLeft" @click="item.sceneId != senceId ? selSenceUse($event, item, index, 'lightSub') : ''" v-if="item.sceneId != senceId" :class="item.sceneId != senceId ? '' : 'color-disabled disbled-icon'">-->
<!--                            <span>{{ item.sceneName }}</span>-->
<!--                          </div>-->
<!--                        </el-col>-->
<!--                        <el-col :span="4">-->
<!--                          <div class="textRight">-->
<!--                            <span v-if="(senceIndex != '' || senceIndex === 0) && index === senceIndex" style="position: relative; top: 0px;"><i class="fa fa-check-circle color-success"></i></span>-->
<!--                          </div>-->
<!--                        </el-col>-->
<!--                      </el-row>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <span slot="reference" size="mini">-->
<!--                            <label>{{formOrder.sence == '' ? $t("请选择") : formOrder.senceText}}</label>-->
<!--                            <label><i class="fa fa-chevron-right"></i></label>-->
<!--                          </span>-->
<!--                </el-popover>-->
<!--              </div>-->
<!--            </el-form-item>-->
            <el-form-item v-if="customBottomType != 5 && customBottomType != 6 && customBottomType != 7 && customBottomType != 8 && customBottomType != 9" label="渐变时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="medium" v-model="formOrder.changeTime" @change="handleChange($event, 'changeTime')" :min="0" :step="100" :step-strictly="true"></el-input-number>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType != 9 && customBottomType != 1 && customBottomType != 2 && customBottomType != 3 && customBottomType != 4 && customBottomType != 7 && customBottomType != 5" label="延时时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="medium" v-model="formOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 9" label="空闲时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="medium" v-model="formOrder.emptyTime" @change="handleChange($event, 'emptyTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
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
                    <order-curtains-type-dialog @click="changeCustomBottomCurtainsType"></order-curtains-type-dialog>
                  </div>
                  <span slot="reference" size="mini" class="font-size-12">
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
                    <div class="index-pop-item" v-for="(item, index) in  this.taskList[this.taskIndex]" @click="selLoopOrder($event, item, index, 'curtainsSub')">
                      <el-row>
                        <el-col :span="20">
                          <div class="textLeft">
                            <span>
                              <el-tag size="mini">
                                <label class="font-size-12 color-default">
                                  {{index+1}}
                                </label>
                              </el-tag>
                            </span>
                            <span class="marginLeft10">
                              <loop-item :item="item"></loop-item>
                            </span>
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
                  <span slot="reference" size="mini" class="font-size-12">
                            <label>{{formOrder.startOrderI == '' ? $t("请选择") : orderValueInfo(formOrder.startOrderI, 'set')}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 3" label="重复次数" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="medium" v-model="formCurtainsOrder.startLoop" @change="handleChange($event, 'startLoop')" :min="0" :step="1" :step-strictly="true"></el-input-number>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType != 10 && customBottomType != 3 && customBottomType != 4 && customBottomType != 5 && customBottomType != 1" label="延时时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="medium" v-model="formCurtainsOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 1" label="空闲时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="medium" v-model="formCurtainsOrder.emptyTime" @change="handleChange($event, 'emptyTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
              </div>
            </el-form-item>
          </el-form>
        </div>

        <div v-if="setChildBottomType == 'musicSub'" >
          <el-form class="padding-tb10-lr20" label-width="95px" ref="formMusicOrder" :model="formMusicOrder">
            <el-form-item label="指令类型" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-popover
                  placement="left"
                  width="260"
                  popper-class="pop-custom"
                  trigger="click"
                  v-model="customDrawBottomVisible">
                  <div class="textCenter">
                    <order-music-type-dialog @click="changeCustomBottomMusicType"></order-music-type-dialog>
                  </div>
                  <span slot="reference" size="mini" class="font-size-12">
                          <label>{{formMusicOrder.type == '' ? $t("请选择") : orderValueInfo(formMusicOrder.type, 'set')}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 13" label="音乐播放" class="netmoon-form-item-border-dialog custon-input-item">
              <div class="textRight color-666666">
                <el-input :placeholder="$t('请输入音乐名称')" v-model="formMusicOrder.musicName"></el-input>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 12" label="音乐音量" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-slider v-model="formMusicOrder.musicVoice" :step="0.01" :max="1" :format-tooltip="musicVoiceFormatTooltip" @change="handleChange($event, 'musicVoice')"></el-slider>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 15" label="音乐进度" class="netmoon-form-item-border-dialog custon-input-item">
              <div class="textRight color-666666">
<!--                <el-slider v-model="formMusicOrder.musicProcess" :step="1" :max="65535" :format-tooltip="musicProcessFormatTooltip" @change="handleChange($event, 'musicVoice')"></el-slider>-->
                <el-input :placeholder="$t('范围:0-65535秒')" v-model="formMusicOrder.musicProcess" maxlength="5"></el-input>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 2" label="延时时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="medium" v-model="formMusicOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
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
                    <order-switch-type-dialog @click="changeCustomBottomSwitchType"></order-switch-type-dialog>
                  </div>
                  <span slot="reference" size="mini" class="font-size-12">
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
                    <span slot="reference" size="mini" class="font-size-12">
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
                    <order-switch-key-type-dialog :form="formSwitchOrder" @click="changeCustomBottomSwitchKeyOprType"></order-switch-key-type-dialog>
                  </div>
                  <span slot="reference" size="mini" class="font-size-12">
                            <label>{{formSwitchOrder.keyOpr === '' && formSwitchOrder.keyOpr != 0 ? $t("请选择") : keyTypeInfo(formSwitchOrder.keyOpr)}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                  </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 6" label="延时时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="medium" v-model="formSwitchOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 9" label="空闲时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="medium" v-model="formSwitchOrder.emptyTime" @change="handleChange($event, 'emptyTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
              </div>
            </el-form-item>
          </el-form>
        </div>

        <div v-if="setChildBottomType == 'sceneSub'" >
          <el-form class="padding-tb10-lr20" label-width="95px" ref="formSceneOrder" :model="formSceneOrder">
            <el-form-item label="指令类型" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-popover
                  placement="left"
                  width="260"
                  popper-class="pop-custom"
                  trigger="click"
                  v-model="customDrawBottomVisible">
                  <div class="textCenter">
                    <order-scene-type-dialog @click="changeSceneBottomCurtainsType"></order-scene-type-dialog>
                  </div>
                  <span slot="reference" size="mini" class="font-size-12">
                          <label>{{formSceneOrder.type == '' ? $t("请选择") : orderValueInfo(formSceneOrder.type, 'set')}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                </el-popover>
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
                    <div class="index-pop-item" v-for="(item, index) in  this.taskList[this.taskIndex]" @click="selLoopOrder($event, item, index, 'sceneSub')">
                      <el-row>
                        <el-col :span="20">
                          <div class="textLeft">
                            <span>
                              <el-tag size="mini">
                                <label class="font-size-12 color-default">
                                  {{index+1}}
                                </label>
                              </el-tag>
                            </span>
                            <span class="marginLeft10">
                              <loop-item :item="item"></loop-item>
                            </span>
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
                  <span slot="reference" size="mini" class="font-size-12">
                            <label>{{formOrder.startOrderI == '' ? $t("请选择") : orderValueInfo(formOrder.startOrderI, 'set')}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 3" label="重复次数" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="medium" v-model="formSceneOrder.startLoop" @change="handleChange($event, 'startLoop')" :min="0" :step="1" :step-strictly="true"></el-input-number>
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
                    <div class="index-pop-item" v-for="(item, index) in sceneList" v-if="item.sceneId != senceId" :class="index != sceneList.length - 1 ? 'border-bottom-item' : ''">
                      <el-row>
                        <el-col :span="20">
                          <div class="textLeft" @click="item.sceneId != senceId ? selSenceUse($event, item, index, 'sceneSub') : ''" v-if="item.sceneId != senceId" :class="item.sceneId != senceId ? '' : 'color-disabled disbled-icon'">
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
                  <span slot="reference" size="mini" class="font-size-12">
                          <label>{{formSceneOrder.sence == '' ? $t("请选择") : formSceneOrder.senceText}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                </el-popover>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType != 10 && customBottomType != 3 && customBottomType != 4 && customBottomType != 5 && customBottomType != 1" label="延时时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="medium" v-model="formSceneOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
              </div>
            </el-form-item>
            <el-form-item v-if="customBottomType == 1" label="空闲时间" class="netmoon-form-item-border-dialog">
              <div class="textRight color-666666">
                <el-input-number size="medium" v-model="formSceneOrder.emptyTime" @change="handleChange($event, 'emptyTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
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
          <div class="">
            <div class="rightDialogContent" :style="dialogRightTabOrderStyle">
              <div class="item-list-child" v-for="(item, index) in orderList" :key="index" @click="upateChildBottomDialog($event, 'lightSub', index, item)">
                <el-row>
                  <el-col :span="15">
                    <span class="opr-item-title-block">
                      <el-tag size="mini">
                        <label class="font-size-12 color-default">
                          {{index+1}}
                        </label>
                      </el-tag>
                    </span>
<!--                    <span class="marginLeft10" :class="(item.i == 6 || item.i == 7 || item.i == 8 || item.i == 9 || item.i == 11) ? 'item-list-child-child-title' : 'item-list-child-child-title2'">{{ orderGetAndSet(item.i, 'set')}}</span>-->
                    <span class="opr-item-title-block">
                      <loop-item :item="item"></loop-item>
                    </span>
                  </el-col>
                  <el-col :span="9">
                    <div class="textRight">
                      <span>
                        <a href="javascript:;" class="color-warning opr-item-block" @click.stop="upateChildBottomDialog($event, 'lightSub', index, item)">{{$t("修改")}}</a>
                        <a href="javascript:;" class="color-error opr-item-block" @click.stop="delOpr($event, index, 'lightCustom')">{{$t("删除")}}</a>
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
                          <label slot="reference" class="opr-item-block" @click.stop="insertOrderOpr($event,item, index)">{{$t("插入")}}</label>
                        </el-popover>
                      </span>
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
                    <span v-if="setChildBottomType == 'lightSub' || setChildBottomType == 'curtainsSub' || setChildBottomType == 'switchSub' || setChildBottomType == 'lightGroupSub' || setChildBottomType == 'sceneSub' || setChildBottomType == 'musicSub'">{{$t("指令设置")}}</span>
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
                          <order-light-type-dialog :set-child-bottom-type="setChildBottomType" @click="changeCustomBottomType"></order-light-type-dialog>
                        </div>
                        <span slot="reference" size="mini" class="font-size-12">
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
                          <light-open-type-dialog @click="changeCustomBottomOpen"></light-open-type-dialog>
                        </div>
                        <span slot="reference" size="mini" class="font-size-12">
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
                                    <el-tag size="mini">
                                      <label class="font-size-12 color-default">
                                        {{index+1}}
                                      </label>
                                    </el-tag>
                                  </span>
                                  <span class="marginLeft10">
                                    <loop-item :item="item"></loop-item>
                                  </span>
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
                        <span slot="reference" size="mini" class="font-size-12">
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
                      <el-input-number size="medium" v-model="formOrder.startLoop" @change="handleChange($event, 'startLoop')" :min="0" :step="1" :step-strictly="true"></el-input-number>
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
                          <order-power-type-dialog></order-power-type-dialog>
                        </div>
                        <span slot="reference" size="mini" class="font-size-12">
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
                          <div class="index-pop-item" v-for="(item, index) in sceneList" v-if="item.sceneId != senceId" :class="index != sceneList.length - 1 ? 'border-bottom-item' : ''">
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
                        <span slot="reference" size="mini" class="font-size-12">
                            <label>{{formOrder.sence == '' ? $t("请选择") : formOrder.senceText}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType != 5 && customBottomType != 6 && customBottomType != 7 && customBottomType != 8 && customBottomType != 9" label="渐变时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="medium" v-model="formOrder.changeTime" @change="handleChange($event, 'changeTime')" :min="0" :step="100" :step-strictly="true"></el-input-number>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType != 9 && customBottomType != 1 && customBottomType != 2 && customBottomType != 3 && customBottomType != 4 && customBottomType != 7 && customBottomType != 5" label="延时时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="medium" v-model="formOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 9" label="空闲时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="medium" v-model="formOrder.emptyTime" @change="handleChange($event, 'emptyTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
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
                          <order-curtains-type-dialog @click="changeCustomBottomCurtainsType"></order-curtains-type-dialog>
                        </div>
                        <span slot="reference" size="mini" class="font-size-12">
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
                                    <el-tag size="mini">
                                      <label class="font-size-12 color-default">
                                        {{index+1}}
                                      </label>
                                    </el-tag>
                                  </span>
                                  <span class="marginLeft10">
                                    <loop-item :item="item"></loop-item>
                                  </span>
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
                        <span slot="reference" size="mini" class="font-size-12">
                            <label>{{formCurtainsOrder.startOrderI == '' ? $t("请选择") : orderValueInfo(formCurtainsOrder.startOrderI, 'set')}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 3" label="重复次数" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="medium" v-model="formCurtainsOrder.startLoop" @change="handleChange($event, 'startLoop')" :min="0" :step="1" :step-strictly="true"></el-input-number>
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
                          <div class="index-pop-item" v-for="(item, index) in sceneList" v-if="item.sceneId != senceId" :class="index != sceneList.length - 1 ? 'border-bottom-item' : ''">
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
                        <span slot="reference" size="mini" class="font-size-12">
                          <label>{{formCurtainsOrder.sence == '' ? $t("请选择") : formCurtainsOrder.senceText}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType != 10 && customBottomType != 3 && customBottomType != 4 && customBottomType != 1" label="延时时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="medium" v-model="formCurtainsOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 1" label="空闲时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="medium" v-model="formCurtainsOrder.emptyTime" @change="handleChange($event, 'emptyTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
                    </div>
                  </el-form-item>
                </el-form>
              </div>

              <div v-if="setChildBottomType == 'musicSub'" >
                <el-form class="padding-tb10-lr20" label-width="95px" ref="formMusicOrder" :model="formMusicOrder">
                  <el-form-item label="指令类型" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-popover
                        placement="left"
                        width="260"
                        popper-class="pop-custom"
                        trigger="click"
                        v-model="customBottomVisible">
                        <div class="textCenter">
                          <order-music-type-dialog @click="changeCustomBottomMusicType"></order-music-type-dialog>
                        </div>
                        <span slot="reference" size="mini" class="font-size-12">
                          <label v-if="areaItem == ''">{{formMusicOrder.type == '' ? $t("请选择") : orderValueInfo(formMusicOrder.type, 'set')}}</label>
                          <label v-if="areaItem != ''">{{formMusicOrder.type == '' ? $t("请选择") : orderValueInfo(formMusicOrder.type, 'set')}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 13" label="音乐播放" class="netmoon-form-item-border-dialog custon-input-item">
                    <div class="textRight color-666666">
                      <el-input :placeholder="$t('请输入音乐名称')" v-model="formMusicOrder.musicName"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 12" label="音乐音量" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-slider v-model="formMusicOrder.musicVoice" :step="0.01" :max="1" :format-tooltip="musicVoiceFormatTooltip" @change="handleChange($event, 'musicVoice')"></el-slider>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 15" label="音乐进度" class="netmoon-form-item-border-dialog custon-input-item">
                    <div class="textRight color-666666">
<!--                      <el-slider v-model="formMusicOrder.musicProcess" :step="1" :max="600" show-stops :format-tooltip="musicProcessFormatTooltip" @change="handleChange($event, 'musicProcess')"></el-slider>-->
                      <el-input :placeholder="$t('范围:0-65535秒')" v-model="formMusicOrder.musicProcess" maxlength="5"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 2" label="延时时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="medium" v-model="formMusicOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
                    </div>
                  </el-form-item>
                </el-form>
              </div>

              <div v-if="setChildBottomType == 'sceneSub'" >
                <el-form class="padding-tb10-lr20" label-width="95px" ref="formSceneOrder" :model="formSceneOrder">
                  <el-form-item label="指令类型" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-popover
                        placement="left"
                        width="260"
                        popper-class="pop-custom"
                        trigger="click"
                        v-model="customBottomVisible">
                        <div class="textCenter">
                          <order-scene-type-dialog @click="changeSceneBottomCurtainsType"></order-scene-type-dialog>
                        </div>
                        <span slot="reference" size="mini" class="font-size-12">
                          <label v-if="areaItem == ''">{{formSceneOrder.type == '' ? $t("请选择") : orderValueInfo(formSceneOrder.type, 'set')}}</label>
                          <label v-if="areaItem != ''">{{formSceneOrder.type == '' ? $t("请选择") : orderValueInfo(formSceneOrder.type, 'set')}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                      </el-popover>
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
                          <div class="index-pop-item" v-for="(item, index) in  this.taskList[this.taskIndex]" @click="selLoopOrder($event, item, index, 'sceneSub')">
                            <el-row>
                              <el-col :span="20">
                                <div class="textLeft">
                                  <span>
                                    <el-tag size="mini">
                                      <label class="font-size-12 color-default">
                                        {{index+1}}
                                      </label>
                                    </el-tag>
                                  </span>
                                  <span class="marginLeft10">
                                    <loop-item :item="item"></loop-item>
                                  </span>
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
                        <span slot="reference" size="mini" class="font-size-12">
                            <label>{{formSceneOrder.startOrderI == '' ? $t("请选择") : orderValueInfo(formSceneOrder.startOrderI, 'set')}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 3" label="重复次数" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="medium" v-model="formSceneOrder.startLoop" @change="handleChange($event, 'startLoop')" :min="0" :step="1" :step-strictly="true"></el-input-number>
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
                          <div class="index-pop-item" v-for="(item, index) in sceneList" v-if="item.sceneId != senceId" :class="index != sceneList.length - 1 ? 'border-bottom-item' : ''">
                            <el-row>
                              <el-col :span="20">
                                <div class="textLeft" @click="item.sceneId != senceId ? selSenceUse($event, item, index, 'sceneSub') : ''" v-if="item.sceneId != senceId" :class="item.sceneId != senceId ? '' : 'color-disabled disbled-icon'">
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
                        <span slot="reference" size="mini" class="font-size-12">
                          <label>{{formSceneOrder.sence == '' ? $t("请选择") : formSceneOrder.senceText}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType != 10 && customBottomType != 3 && customBottomType != 4 && customBottomType != 1" label="延时时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="medium" v-model="formSceneOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 1" label="空闲时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="medium" v-model="formSceneOrder.emptyTime" @change="handleChange($event, 'emptyTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
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
                          <order-switch-type-dialog @click="changeCustomBottomSwitchType"></order-switch-type-dialog>
                        </div>
                        <span slot="reference" size="mini" class="font-size-12">
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
                          <span slot="reference" size="mini" class="font-size-12">
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
                          <order-switch-key-type-dialog :form="formSwitchOrder" @click="changeCustomBottomSwitchKeyOprType"></order-switch-key-type-dialog>
                        </div>
                        <span slot="reference" size="mini" class="font-size-12">
                            <label>{{formSwitchOrder.keyOpr === '' && formSwitchOrder.keyOpr != 0 ? $t("请选择") : keyTypeInfo(formSwitchOrder.keyOpr)}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                      </el-popover>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 6" label="延时时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="medium" v-model="formSwitchOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
                    </div>
                  </el-form-item>
                  <el-form-item v-if="customBottomType == 9" label="空闲时间" class="netmoon-form-item-border-dialog">
                    <div class="textRight color-666666">
                      <el-input-number size="medium" v-model="formSwitchOrder.emptyTime" @change="handleChange($event, 'emptyTime')" :min="100" :step="100" :step-strictly="true"></el-input-number>
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
import LoopItem from "../components/LoopItem";
import OrderLightTypeDialog from "../components/OrderLightTypeDialog";
import {
  MessageSuccess,
  MessageWarning,
  orderValue,
  outTypeObj,
  keyType,
  orderColor,
  outEditTypeObj,
  openType,
  MessageError,
  getLength
} from "../utils/utils";
import OrderCurtainsTypeDialog from "../components/OrderCurtainsTypeDialog";
import OrderSwitchTypeDialog from "../components/OrderSwitchTypeDialog";
import OrderListPopChildDialog from "../components/OrderListPopChildDialog";
import AlertMessageDialog from "../components/AlertMessageDialog";
import EnvListDialog from "../components/EnvListDialog";
import SceneListDialog from "../components/SceneListDialog";
import RoomListDialog from "../components/RoomListDialog";
import LightOpenTypeDialog from "../components/LightOpenTypeDialog";
import OrderSwitchKeyTypeDialog from "../components/OrderSwitchKeyTypeDialog";
import OrderPowerTypeDialog from "../components/OrderPowerTypeDialog";
import OrderSceneTypeDialog from "../components/OrderSceneTypeDialog";
import {showChartLoading, hideChartLoading} from "../utils/loadingChart";
import OrderMusicTypeDialog from "../components/OrderMusicTypeDialog";
export default {
  mixins: [mixins],
  components: {
    OrderMusicTypeDialog,
    OrderSceneTypeDialog,
    OrderPowerTypeDialog,
    OrderSwitchKeyTypeDialog,
    LightOpenTypeDialog,
    RoomListDialog,
    SceneListDialog,
    EnvListDialog,
    AlertMessageDialog,
    OrderListPopChildDialog, OrderSwitchTypeDialog, OrderCurtainsTypeDialog, LoopItem, OrderLightTypeDialog },
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
      dialogFullSize: '100%',
      dialogBottomSize: '100%',
      dialogSubChildSize: '100%',
      dialogRoomSize: '70%',
      drawerRightWidth: '90%',
      drawerRightChildWidth: '90%',
      direction: 'btt',
      directionDevice: 'rtl',
      directionList: 'rtl',
      directionEnvList: 'ltr',
      screenArrow: '',
      setType: '',
      setChildType: '',
      setChildBottomType: '',
      templateType: '1',
      repetLoop: '无限重复',
      editOpr: '',
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
      editSceneList: [],
      resetTaskList: [],
      resetSenceList: [],
      sceneIdList: [],
      sceneTimeList: [],
      mainCodeData: '',
      removeSenceItem: '',
      timer: null,
      timerScene: null,
      timerDeviceStatus: null,
      senceId: '',
      scnenDuration: '',
      toastLoading: '',
      envPopStatus: '',
      touchType: '',
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
      formMusicOrder: {
        type: 13,
        musicName: '',
        musicProcess: 0,
        musicVoice: 0,
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
      formSceneOrder: {
        type: 4,
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
    this.initBridage();
    this.initSenceList();
    window.addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
    // 监听窗口大小
    window.addEventListener( 'resize', () => (this.checkIndexOrient())
    );
    if (window.history && window.history.pushState) {
      // 向历史记录中插入了当前页
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.goBack, false);
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
    window.removeEventListener('popstate', this.goBack, false);
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

    this.checkIndexOrient();
    //this.initRoom();
    this.initDevice();
    //this.initICon();
    //this.initOrder();
  },
  methods:{
    initSenceList(){
      let timeMax = '';
      let params = {
        envKey: this.$route.query.envKey != "" && this.$route.query.envKey != undefined ? this.$route.query.envKey : localStorage.getItem("envKey")
      };
      //console.log(this.sceneList);
      clearTimeout(this.timerScene);
      this.$axios.get(this.baseUrl + common.senceList, {params: params, sessionId: this.sessionId, loading: false}).then(res => {
        if (res.data.code == 200){
          this.sceneTimeList = [];
          this.sceneList = res.data.data;
          let flag = false;
          let num = 0;
          for (let i = 0; i < res.data.data.length; i++){
            if ((res.data.data[i].successCount == 0 && res.data.data[i].totalCount == 0) || res.data.data[i].successCount != res.data.data[i].totalCount){
              //this.sceneTimeList.push(res.data.data[i].lastTime);
              //console.log(res.data.data[i].systemTime , res.data.data[i].lastTime, res.data.data[i].systemTime - res.data.data[i].lastTime);
              if (res.data.data[i].systemTime / 1000 - res.data.data[i].lastTime / 1000 < 60){
                flag = true;
                break;
              }
            }
          }
          //console.log(flag);
          if (flag == false){
            clearTimeout(this.timerScene);
          }else {
            this.timerScene = setTimeout(() => {
              this.initSenceList();
            },5000);
          }

          //timeMax = Math.max(...this.sceneTimeList);
          //console.log(Date.parse(new Date()), timeMax);
          //console.log(Date.parse(new Date()) / 1000 - timeMax / 1000);
        }
      });
    },
    init(type){
      this.dataList = [];
      this.ruleList = [];
      let resultLoop = 0;
      let loopNum = 0;
      let selfLoopNumber = 0;
      for (let i = 0; i < this.taskList.length; i++){
        this.ruleCount = 0;
        for (let j = 0; j < this.taskList[i].length; j++){
          //let aNumber = (5 - 1) * Math.random() + 1;
          let aNumber = 0;
          if (this.taskList[i][j].i == 1 || this.taskList[i][j].i == 2 || this.taskList[i][j].i == 3 || this.taskList[i][j].i == 4){
            //console.log(555,this.taskList[i][j].sec);
            if (this.taskList[i][j].sec && this.taskList[i][j].sec != -1){
              aNumber = this.taskList[i][j].sec / 100;
            }
            if (this.taskList[i][j].secLoop){
              aNumber = this.taskList[i][j].secLoop / 100;
            }
          }
          //console.log(66,aNumber);
          let result = Math.floor(aNumber);
          this.ruleCount += result;
        }
        //console.log(567,this.ruleCount,resultLoop * loopNum);
        this.ruleCount = this.ruleCount + resultLoop * loopNum;
        this.ruleList.push(this.ruleCount);
      }

      let ruleMax = this.ruleList.length == 0 ? 0 : Math.max(...this.ruleList);
      this.ruleMax = ruleMax;
      this.resetTaskOtherList();
      //console.log(1111111,ruleMax);
      // if (type != 'reset'){
      //   this.resetTaskOtherList();
      // }
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
      return hours + ':' + mins + ':' + secs;
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
          // this.dialogFullSize = this.appType == 'app' ? '100%' : '100%';
          // this.dialogBottomSize = this.appType == 'app' ? '45%' : '45%';
        }
        else if (window.orientation == 90 || window.orientation == -90){
          this.screenOrientation = 'landscape';
          this.dialogHeight = '80%';
          this.paddingBottom = this.appType == 'app' ? '35px' : '0px';
          this.appType == 'app' ? this.paddingMainBottom = '55px' : this.paddingMainBottom = '0px';
          // this.dialogFullSize = this.appType == 'app' ? '100%' : '100%';
          // this.dialogBottomSize = this.appType == 'app' ? '100%' : '100%';
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
          this.drawerRightWidth = '100%';
        }
        this.drawerRightChildWidth = '90%';
        this.dialogRoomSize = '100%';

        if (this.screenOrientation == 'landscape'){
          this.dialogFullSize = '100%';
          this.dialogBottomSize = '100%';
          this.dialogSubChildSize = '100%';
        }else {
          this.dialogFullSize = '100%';
          this.dialogBottomSize = '45%';
          this.dialogSubChildSize = '100%';
        }
      }else {
        if (screenWidth < 550){
          if (type == 'template'){
            this.drawerRightWidth = '100%';
          }else {
            this.drawerRightWidth = '100%';
          }
          this.drawerRightChildWidth = '90%';
          this.dialogRoomSize = '100%';
          this.dialogFullSize = '100%';
          this.dialogBottomSize = '100%';
          this.dialogSubChildSize = '100%';
        }else{
          if (type == 'template'){
            this.drawerRightWidth = '60%';
          }else {
            this.drawerRightWidth = '60%';
          }
          this.drawerRightChildWidth = '50%';
          this.dialogRoomSize = '70%';
          this.dialogFullSize = '45%';
          this.dialogBottomSize = '45%';
          this.dialogSubChildSize = '45%';
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
      this.touchType = "tap";

      this.clearForm();
      this.formOrder.type = "";
      this.formCurtainsOrder.type = "";
      this.formSwitchOrder.type = "";
      this.formSceneOrder.type = "";
      this.formMusicOrder.type = "";
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
      }else if (this.planList[index].t == 5){
        this.setChildBottomType = 'musicSub';
        this.customBottomType = 13;
        this.formMusicOrder.type = 13;
      }else if (this.planList[index].t == 0){
        this.setChildBottomType = 'sceneSub';
        this.customBottomType = 4;
        this.formSceneOrder.type = 4;
      }

      this.drawerDevice = true;
      this.drawerBottomDialogVisible = false;
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
      //console.log(this.formOrder.type, this.formSwitchOrder.type);
    },
    selSence(event, item, type){
      showChartLoading();
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
          //console.log(res);
          this.setSenceData(res.data.tasks, type);
          this.setPageStatus(1);
          this.drawerListVisible = false;
        });
      }else {
        this.setSenceData(event, 'setChild');
      }
      clearTimeout(this.timerScene);
    },
    selRoom(){
      this.drawerRoomVisible = true;
    },
    selRoomItem(event, item){
      this.formSence.roomId = item.id;
      if (item.id){
        this.formSence.img = "~/static/img/" + item.id + ".png";
      }
      this.drawerRoomVisible = false;
    },
    async setSenceData(item, type){
      let data = item;
      console.log(56,data);
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
            tasksTemp[j]['sec'] = data[i].i[j].v;
          }else if (data[i].i[j].i == 4){
            for (let k = 0; k < this.sceneList.length; k++){
              if (this.sceneList[k].sceneId == data[i].i[j].v){
                await this.getSourceUrl(this.sceneList[k].sourceUrl);
                let scnenDuration = this.scnenDuration;
                tasksTemp[j]['sec'] = scnenDuration == Number.MAX_SAFE_INTEGER ? -1 : scnenDuration;
              }
            }
          }else{
            tasksTemp[j]['sec'] = 100
          }
          if (data[i].i[j].t > 0){
            tasksTemp[j]['t'] = data[i].i[j].t
          }else if (data[i].i[j].t == 0){
            tasksTemp[j]['t'] = 0;
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
          if (data[i].i[j].n == 0 || data[i].i[j].n){
            tasksTemp[j]['n'] = data[i].i[j].n
          }
        }
        tasks.push(tasksTemp);
      }
      this.planList = plans;
      this.taskList = tasks;

      //console.log(this.planList);
      //console.log(this.taskList);
      this.$parent.$parent.initMenu(this.planList);
      this.setTaskList(this.taskList, type);
      this.init();
    },
    resetTaskOtherList(){
      let ruleList = [];
      let ruleMaxList = [];
      let ruleMax = 0;
      for (let i = 0; i < this.resetTaskList.length; i++){
        if (this.ruleMax != 0 && this.resetTaskList[i].obj.t == 0){
          let rule = this.ruleMax * 100 - this.resetTaskList[i].rule;
          this.resetTaskList[i].obj.secLoop = rule;
        }
      }

      for (let i = 0; i < this.resetSenceList.length; i++){
        if (this.ruleMax != 0 && this.resetSenceList[i].obj.sec == -1){
          let rule = this.ruleMax * 100 - this.resetSenceList[i].rule;
          this.resetSenceList[i].obj.secLoop = rule;
        }
      }
    },
    setTaskList(taskList, type){//重新组装tasklist，用于显示列表
      let list = [];
      let array = [];
      let selfLoopNumber = 0;
      let loopNum = 0;
      let resultLoop = 0;
      let indexJ = 0;
      let ruleScene = 0;
      this.resetTaskList = [];
      this.resetSenceList = [];
      for (let i = 0; i < taskList.length; i++){
        for (let j = 0; j < taskList[i].length; j++){
          if (this.taskList[i][j].secLoop != undefined || this.taskList[i][j].secLoop){
            this.taskList[i][j].secLoop = undefined;
          }

          if (taskList[i][j].i != 1 && taskList[i][j].i != 2 && taskList[i][j].i != 3 && taskList[i][j].i != 4){
            array.push(taskList[i][j]);
          }else if (taskList[i][j].i == 3){
            let index = this.taskList[i][j].v;
            let bNumber = 0;
            selfLoopNumber = 0;
            ruleScene = 0;
            loopNum = this.taskList[i][j].t === 0 ? 1 : this.taskList[i][j].t;

            for (let k = index; k < this.taskList[i].length; k++){
              if (k < j && (this.taskList[i][k].i == 1 || this.taskList[i][k].i == 2 || this.taskList[i][k].i == 3 || this.taskList[i][k].i == 4)){
                if (this.taskList[i][k].secLoop){
                  bNumber = this.taskList[i][k].secLoop;
                }else{
                  bNumber = this.taskList[i][k].sec;
                }
                resultLoop += Math.floor(bNumber);
                ruleScene += Math.floor(bNumber);
              }
            }
            if (resultLoop * loopNum > 0){
              //this.taskList[i][j]['secLoop'] = resultLoop * loopNum + selfSec;
              this.resetTaskList.push({
                rule: ruleScene,
                obj: this.taskList[i][j]
              });
              this.$set(this.taskList[i][j],'secLoop', resultLoop * loopNum);
            }
          }else if(taskList[i][j].i == 4){
            //obj['sec'] = this.scnenDuration == Number.MAX_SAFE_INTEGER ? this.ruleMax - sceneRule * 100 : this.scnenDuration;
            ruleScene = 0;
            let bNumber = 0;
            for (let k = 0; k < this.taskList[i].length; k++){
              if ((this.taskList[i][k].i == 1 || this.taskList[i][k].i == 2 || this.taskList[i][k].i == 3 || this.taskList[i][k].i == 4)){
                if (this.taskList[i][k].secLoop){
                  bNumber = this.taskList[i][k].secLoop;
                }else{
                  bNumber = this.taskList[i][k].sec;
                }
                ruleScene += Math.floor(bNumber);
              }
            }
            this.resetSenceList.push({
              rule: ruleScene,
              obj: this.taskList[i][j],
              indexJ: j,
              indexI: i
            });
            //this.taskList[i][j].sec = this.taskList[i][j].sec == -1 ? this.ruleMax * 100 - ruleScene : this.taskList[i][j].sec;
            //this.$set(this.taskList[i][j],'secLoop', this.taskList[i][j].sec == -1 ? this.ruleMax * 100 - ruleScene : this.taskList[i][j].sec);
            if (ruleScene <= 0){
              this.$set(this.taskList[i][j],'secLoop', 1000);
            }else {
              this.$set(this.taskList[i][j],'secLoop',ruleScene);
            }
          }else if (taskList[i][j].i == 2){
            let selfSec = this.taskList[i][j].sec;
            // if (resultLoop * loopNum > 0){
            //   //this.taskList[i][j]['secLoop'] = resultLoop * loopNum + selfSec;
            //   this.$set(this.taskList[i][j],'secLoop', resultLoop * loopNum + selfSec);
            // }
            //taskList[i][j]['list'] = array;
            this.$set(taskList[i][j], 'list', array);
            array = [];
            resultLoop = 0;
          }
        }
      }
      this.taskResetList = taskList;
      //this.taskList = taskList;
      //console.log(12345,this.taskList);
      //原始数据
      //console.log(111111111333333, type);
      if (type == 'menu'){
        this.taskTempList = JSON.parse(JSON.stringify(taskList));
        this.planTempList = JSON.parse(JSON.stringify(this.planList));
      }

      hideChartLoading();
    },
    mousedown(){

    },
    hidePopVisible(){
      console.log(111);
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
    updateSenceOpr($event, item){
      this.$axios.get(item.sourceUrl).then(res => {
        this.formSence = {
          id: res.data.id,
          envKey: '',
          name: res.data.name,
          iconId:  res.data.icon,
          internal: res.data.internal == 1 ? true : false,
          roomId: res.data.room,
          sceneId: res.data.id,
          sceneName: res.data.name,
          sceneType: 1,
          sourceCode: '',
          openSource: true,
          img: ''
        };
        this.oprType = 'editSceneList';
        this.editSceneList = res.data.tasks;
      });
      this.drawerSenceVisible = true;
    },
    addSenceOpr($event, item){
      this.oprType = 'addSceneList';
      this.drawerSenceVisible = true;
    },
    setSence(event, item, index, type){
      this.clearForm();
      this.formOrder.type = "";
      this.formCurtainsOrder.type = "";
      this.formSwitchOrder.type = "";
      this.formSceneOrder.type = "";
      this.formMusicOrder.type = "";
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
      }else if (this.planList[index].t === 0){
        this.setChildBottomType = 'sceneSub';
        this.customBottomType = 4;
        this.formSceneOrder.type = 4;
      }else if (this.planList[index].t === 5){
        this.setChildBottomType = 'musicSub';
        this.customBottomType = 13;
        this.formMusicOrder.type = 13;
      }

      //console.log(this.formOrder.type, this.formSwitchOrder.type);

      this.orderList = item;
      this.taskIndex = index;
      this.taskItem = item;
      this.drawer = true;
    },
    async okConfirm(){
      if (this.oprOtherType != "editOrderList"){
        for (let i = 0; i < this.taskList[this.taskIndex].length; i++){
          if (this.taskList[this.taskIndex][i].i == 3 && this.taskList[this.taskIndex][i].t === 0){
            MessageWarning(this.$t("存在无限循环指令，无法继续添加后续指令"));
            return;
          }else if (this.taskList[this.taskIndex][i].i == 4 && this.taskList[this.taskIndex][i].sec === -1){
            MessageWarning(this.$t("存在无限循环指令，无法继续添加后续指令"));
            return;
          }
        }
      }else {
        if (this.setChildBottomType == 'lightSub'){
          let type = this.editOpr == "edit" ? outTypeObj(this.formOrder.type) : this.formOrder.type;
          if (this.formOrder.startLoop === 0 && type == 3 && this.taskList[this.taskIndex][this.areaIndex+1]){
            MessageWarning(this.$t("设置无限循环指令，请将后续指令移除"));
            return;
          }else if (this.scnenDuration == Number.MAX_SAFE_INTEGER && type == 4 && this.taskList[this.taskIndex][this.areaIndex+1]){
            MessageWarning(this.$t("存在无限循环指令，请将后续指令移除"));
            return;
          }
        }else if (this.setChildBottomType == 'curtainsSub') {
          let type = this.editOpr == "edit" ? this.formCurtainsOrder.type : this.formCurtainsOrder.type;
          if (this.formCurtainsOrder.startLoop === 0 && type == 3 && this.taskList[this.taskIndex][this.areaIndex+1]){
            MessageWarning(this.$t("设置无限循环指令，请将后续指令移除"));
            return;
          }else if (this.scnenDuration == Number.MAX_SAFE_INTEGER && type == 4 && this.taskList[this.taskIndex][this.areaIndex+1]){
            MessageWarning(this.$t("存在无限循环指令，请将后续指令移除"));
            return;
          }
        }
      }

      //this.alertMessageTips = this.$t("确认保存该指令？");
      this.oprType = 'order';
      //this.dialogVisible = true;
      this.saveOpr();
    },
    addPlain(){
      this.drawer = true;
    },
    cancelDrawer(){
      this.drawer = false;
    },
    cancelDeviceDrawer(){
      this.drawerBottomDialogVisible = false;
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
      this.resetOprType();
      //this.clearForm();
      this.oprOtherType = "orderList";
      this.drawerBottomDialogVisible = true;
    },
    upateChildBottomDialog(event, type, index, item){
      this.editOpr = "";
      this.areaIndex = index;
      this.areaItem = item;
      this.oprOtherType = "editOrderList";
      //console.log(item);
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
          this.loopIndex = item.v;
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
        }else if (item.i == 3){
          this.loopIndex = item.v;
          this.formCurtainsOrder.startLoop = item.t;
          this.formCurtainsOrder.startOrder = item.v;
          this.formCurtainsOrder.startOrderI = this.orderList[item.v].i;
        }else if (item.i == 1){
          this.formCurtainsOrder.emptyTime = item.v;
        }else if (item.i == 4){
          this.formCurtainsOrder.sence = item.v;
          this.formCurtainsOrder.senceRoom = item.r;
          this.formCurtainsOrder.senceText = item.n;
        }else if (item.i == 2){
          this.formCurtainsOrder.waitTime = item.v;
        }
      }else if (this.setChildBottomType == 'musicSub') {
        this.formMusicOrder.type = item.i;
        this.customBottomType = item.i;
        if (item.i == 12) {
          this.formMusicOrder.musicVoice = item.v;
        }else if (item.i == 13) {
          this.formMusicOrder.musicName = item.v;
        }else if (item.i == 14) {

        }else if (item.i == 15) {
          this.formMusicOrder.musicProcess = item.v;
        }else if (item.i == 2){
          this.formMusicOrder.waitTime = item.v;
        }
      }else if (this.setChildBottomType == 'sceneSub') {
        this.formSceneOrder.type = item.i;
        this.customBottomType = item.i;
        if (item.i == 1){
          this.formSceneOrder.emptyTime = item.v;
        }else if (item.i == 3){
          this.loopIndex = item.v;
          this.formSceneOrder.startLoop = item.t;
          this.formSceneOrder.startOrder = item.v;
          this.formSceneOrder.startOrderI = this.orderList[item.v].i;
        }else if (item.i == 4){
          this.formSceneOrder.sence = item.v;
          this.formSceneOrder.senceRoom = item.r;
          this.formSceneOrder.senceText = item.n;
        }else if (item.i == 2){
          this.formSceneOrder.waitTime = item.v;
        }
      }
      this.drawerBottomDialogVisible = true;
    },
    resetOprType(){
      //console.log(this.setChildBottomType);
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
      }else if (this.setChildBottomType == 'musicSub'){
        this.customBottomType = 13;
        this.formSceneOrder.type = 13;
        this.formSceneOrder.musicName = "";
      }else if (this.setChildBottomType == 'sceneSub'){
        this.customBottomType = 4;
        this.formSceneOrder.type = 4;
        this.formSceneOrder.curtainsOpenClose = 0;
      }
    },
    insertOrder(event, item, index, area, type){
      //this.setChildBottomType = type;
      this.areaType = area;
      this.areaIndex = index;
      this.oprOtherType = "orderList";
      this.resetOprType();
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
    changeRoomDrawer(event){
      this.drawerRoomVisible = event;
    },
    closeEnvDrawer(event){
      this.drawerEnvVisible = event;
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
      this.formSceneOrder = {
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
      };
      this.formMusicOrder = {
        type: 13,
        musicName: '',
        musicProcess: 0,
        musicVoice: 0,
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
      }
    },
    handleChange(data, type){
      if (type == 'setNum'){
        this.formTemplate.setNum = data;
      }else if (type == 'loop'){
        this.formTemplate.loop = data;
      }else if (type == 'changeTime'){
        this.formOrder.changeTime = data;
      }else if (type == 'waitTime'){
        this.formOrder.waitTime = data;
        this.formSwitchOrder.waitTime = data;
        this.formSceneOrder.waitTime = data;
        this.formMusicOrder.waitTime = data;
      }else if (type == 'light'){
        this.formOrder.light = data;
      }else if (type == 'temp'){
        this.formOrder.temp = data;
      }else if (type == 'startLoop'){
        this.formOrder.startLoop = data;
        this.formSceneOrder.startLoop = data;
      }else if (type == 'curtainsOpenClose'){
        this.formCurtainsOrder.curtainsOpenClose = data;
      }else if (type == 'emptyTime'){
        this.formCurtainsOrder.emptyTime = data;
        this.formSwitchOrder.emptyTime = data;
        this.formSceneOrder.emptyTime = data;
      }else if (type == 'musicVoice'){
        this.formMusicOrder.musicVoice = data;
      }else if (type == 'musicProcess'){
        this.formMusicOrder.musicProcess = data;
      }
    },
    closeAlertDialog(event){
      this.dialogVisible = event;
    },
    closeOprDrawer(){
      this.oprType = "";
      this.editSceneList = [];
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
      //this.alertMessageTips = this.$t("确定删除该数据吗？");
      //this.dialogVisible = true;
      this.saveOpr();
    },
    changeCustomBottomType(event, type){
      this.editOpr = "edit";
      this.formOrder.type = type;
      this.areaItem = "";
      this.customBottomType = type;
      this.customBottomVisible = false;
      this.customDrawBottomVisible = false;
    },
    changeCustomBottomSwitchType(event, type){
      this.editOpr = "edit";
      this.areaItem = "";
      this.formSwitchOrder.type = type;
      this.customBottomType = type;
      this.customBottomVisible = false;
      this.customDrawBottomVisible = false;
    },
    changeCustomBottomCurtainsType(event, type){
      this.editOpr = "edit";
      this.areaItem = "";
      this.formCurtainsOrder.type = type;
      this.customBottomType = type;
      this.customBottomVisible = false;
      this.customDrawBottomVisible = false;
    },
    changeCustomBottomMusicType(event, type){
      this.editOpr = "edit";
      this.areaItem = "";
      this.formMusicOrder.type = type;
      this.customBottomType = type;
      this.customBottomVisible = false;
      this.customDrawBottomVisible = false;
    },
    changeSceneBottomCurtainsType(event, type){
      this.editOpr = "edit";
      this.areaItem = "";
      this.formSceneOrder.type = type;
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
    hidePopDocumentVisible(event, type){
      if (event.target.className == "demoRuleContentClass" || event.target.className == "rule-class" || event.target.className == "" || event.target.className.indexOf('menu-active') > -1){
        this.touchStatus = false;
        this.hidePopVisible();
      }
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
      this.touchType = "press";
    },
    inputColor(hue){
      let rgb = this.hsltorgb(hue, this.colors.saturation, this.colors.luminosity);
      let color = this.colorRGBtoHex(rgb[0],rgb[1],rgb[2]);
      // if (this.getWaitNetwork() >= 500){
      //   console.log(11111);
      // }
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
        let num = (val * 100).toFixed(2) + "%";
        return num;
      }
    },
    curtainsFormatTooltip(val){
      if (val){
        let num = (val * 100).toFixed(0) + "%";
        return num;
      }
    },
    musicVoiceFormatTooltip(val){
      if (val){
        let num = (val * 100).toFixed(0) + "%";
        return num;
      }
    },
    musicProcessFormatTooltip(val){
      if (val){
        return val + "秒";
      }
    },
    selLoopOrder(event, item, index, type){
      this.loopIndex = index;
      this.loopItem = item;
      //console.log(this.orderList);
      if (this.setChildBottomType == 'lightSub'){
        this.formOrder.startOrder = item.i;
        this.formOrder.startOrderI = this.orderList[index].i;
      }else if (this.setChildBottomType == 'curtainsSub'){
        this.formCurtainsOrder.startOrder = item.i;
        this.formCurtainsOrder.startOrderI = this.orderList[index].i;
      }else if (this.setChildBottomType == 'sceneSub'){
        this.formSceneOrder.startOrder = item.i;
        this.formSceneOrder.startOrderI = this.orderList[index].i;
      }
      this.customBottomOpenVisible = false;
      this.customDrawBottomOpenVisible = false;
    },
    async getSourceUrl(sourceUrl){
      await this.$axios.get(sourceUrl).then(res => {
        this.scnenDuration = res.data.duration;
      });
    },
    async selSenceUse(event, item, index, type){
      this.senceIndex = index;
      this.senceItem = item;

      await this.getSourceUrl(item.sourceUrl);
      this.scnenDuration = this.scnenDuration;
      //console.log(6789,this.scnenDuration);

      if (type == "lightSub"){
        this.formOrder.sence = item.sceneId;
        this.formOrder.senceText = item.sceneName;
        this.formOrder.senceRoom = item.roomId;
      }else if (type == "curtainsSub"){
        this.formCurtainsOrder.sence = item.sceneId;
        this.formCurtainsOrder.senceText = item.sceneName;
        this.formCurtainsOrder.senceRoom = item.roomId;
      }else if (type == "sceneSub"){
        this.formSceneOrder.sence = item.sceneId;
        this.formSceneOrder.senceText = item.sceneName;
        this.formSceneOrder.senceRoom = item.roomId;
      }else if (type == "musicSub"){
        this.formMusicOrder.sence = item.sceneId;
        this.formMusicOrder.senceText = item.sceneName;
        this.formMusicOrder.senceRoom = item.roomId;
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
    cancelOpr(){
      clearInterval(this.timer);
      this.timer = null;
      this.dialogVisible = false;
    },
    saveOpr(){
      //console.log("----"+this.formOrder.type,this.formSwitchOrder.type,this.formCurtainsOrder.type);
      let sceneRule = 0;
      let numberNoZeroReg = /^[1-9][0-9]*$/;
      let num0_65535 = /^([0-9]{0,5}|65535)$/;
      //验证
      if (this.setChildBottomType == 'lightSub' && this.oprType != 'delOrder'){
        let type = this.editOpr == "edit" ? outTypeObj(this.formOrder.type) : this.formOrder.type;
        if (type == 9){
          if (this.formOrder.color == ""){
            MessageWarning(this.$t("请设置颜色！"));
            return;
          }
        }else if (type == 3){
          if (this.formOrder.startOrderI == ""){
            MessageWarning(this.$t("请设置起始位置！"));
            return;
          }
        }else if (type == 4){
          if (this.formOrder.sence == ""){
            MessageWarning(this.$t("请设置场景！"));
            return;
          }
        }
      }else if (this.setChildBottomType == 'switchSub' && this.oprType != 'delOrder'){
        if (this.formSwitchOrder.type == 11){
          if (this.formSwitchOrder.keyArr.length <= 0){
            MessageWarning(this.$t("请设置继电器！"));
            return;
          }
        }
      }else if (this.setChildBottomType == 'curtainsSub' && this.oprType != 'delOrder'){
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
      }else if (this.setChildBottomType == 'musicSub' && this.oprType != 'delOrder'){
        if (this.formMusicOrder.type == 13){
          if (this.formMusicOrder.musicName == ""){
            MessageWarning(this.$t("请输入音乐名称！"));
            return;
          }else if (getLength(this.formMusicOrder.musicName) > 24){
            MessageWarning(this.$t("音乐名称长度最长24位！"));
            return;
          }
        }
        if (this.formMusicOrder.type == 15){
          if (this.formMusicOrder.musicProcess == ""){
            MessageWarning(this.$t("请输入音乐进度！"));
            return;
          }else if (this.formMusicOrder.musicProcess != ""){
            if (!num0_65535.test(this.formMusicOrder.musicProcess)){
              MessageWarning(this.$t("范围:0-65535秒"));
              return;
            }
          }
        }
      }else if (this.setChildBottomType == 'sceneSub' && this.oprType != 'delOrder'){
        if (this.formSceneOrder.type == 3){
          if (this.formSceneOrder.startOrderI == ""){
            MessageWarning(this.$t("请设置起始位置！"));
            return;
          }
        }else if (this.formSceneOrder.type == 4){
          if (this.formSceneOrder.sence == ""){
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
        }else if (this.formMusicOrder.type != ""){
          obj = {
            i : this.formMusicOrder.type
          }
        }else if (this.formSceneOrder.type != ""){
          obj = {
            i : this.formSceneOrder.type
          }
        }else if (this.formSwitchOrder.type != ""){
          if (this.oprOtherType == "editOrderList"){
            if (this.areaItem != ""){
              //console.log(1);
              obj = {
                i : this.formSwitchOrder.type
              }
              this.formSwitchOrder.type = outEditTypeObj(this.formSwitchOrder.type);
            }else {
              //console.log(2);
              obj = {
                i : outTypeObj(this.formSwitchOrder.type)
              }
              this.formSwitchOrder.type = this.formSwitchOrder.type;
            }
          }else {
            //console.log(3);
            obj = {
              i : outTypeObj(this.formSwitchOrder.type)
            }
          }
        }

        if (outTypeObj(this.formOrder.type) == 1 || outTypeObj(this.formSwitchOrder.type) == 1 || this.formCurtainsOrder.type == 1 || this.formSceneOrder.type == 1){
          if (this.formOrder.type != ""){
            obj['v'] = this.formOrder.emptyTime;
            obj['sec'] = this.formOrder.emptyTime;
          }else if (this.formCurtainsOrder.type != ""){
            obj['v'] = this.formCurtainsOrder.emptyTime;
            obj['sec'] = this.formCurtainsOrder.emptyTime;
          }else if (this.formSwitchOrder.type != ""){
            obj['v'] = this.formSwitchOrder.emptyTime;
            obj['sec'] = this.formSwitchOrder.emptyTime;
          }else if (this.formSceneOrder.type != ""){
            obj['v'] = this.formSceneOrder.emptyTime;
            obj['sec'] = this.formSceneOrder.emptyTime;
          }
        }else if (outTypeObj(this.formOrder.type) == 2 || this.formCurtainsOrder.type == 2 || outTypeObj(this.formSwitchOrder.type) == 2 || this.formSceneOrder.type == 2 || this.formMusicOrder.type == 2){
          if (this.formOrder.type != ""){
            obj['v'] = this.formOrder.waitTime;
            obj['sec'] = this.formOrder.waitTime;
          }else if (this.formCurtainsOrder.type != ""){
            obj['v'] = this.formCurtainsOrder.waitTime;
            obj['sec'] = this.formCurtainsOrder.waitTime;
          }else if (this.formSwitchOrder.type != ""){
            obj['v'] = this.formSwitchOrder.waitTime;
            obj['sec'] = this.formSwitchOrder.waitTime;
          }else if (this.formSceneOrder.type != ""){
            obj['v'] = this.formSceneOrder.waitTime;
            obj['sec'] = this.formSceneOrder.waitTime;
          }else if (this.formMusicOrder.type != ""){
            obj['v'] = this.formMusicOrder.waitTime;
            obj['sec'] = this.formMusicOrder.waitTime;
          }
        }else if (outTypeObj(this.formOrder.type) == 6){
          obj['v'] = parseInt(this.customBottomOpen);
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
        }else if (outTypeObj(this.formOrder.type) == 3 || this.formCurtainsOrder.type == 3 || this.formSceneOrder.type == 3){//循环指令，时间默认1
          if (this.formOrder.startLoop === 0 || this.formOrder.startLoop != ""){
            obj['v'] = this.loopIndex;
            obj['t'] = this.formOrder.startLoop;
            obj['sec'] = 100;
          }else if (this.formSceneOrder.startLoop === 0 || this.formSceneOrder.startLoop != ""){
            obj['v'] = this.loopIndex;
            obj['t'] = this.formSceneOrder.startLoop;
            obj['sec'] = 100;
          }
        }else if (outTypeObj(this.formOrder.type) == 4 || this.formCurtainsOrder.type == 4 || this.formSceneOrder.type == 4){//场景指令，时间默认1
          if (this.formOrder.sence != ""){
            obj['v'] = this.formOrder.sence;
            obj['r'] = this.formOrder.senceRoom;
            obj['n'] = this.formOrder.senceText;
          }else if (this.formCurtainsOrder.sence != ""){
            obj['v'] = this.formCurtainsOrder.sence;
            obj['r'] = this.formCurtainsOrder.senceRoom;
            obj['n'] = this.formCurtainsOrder.senceText;
          }else if (this.formSceneOrder.sence != ""){
            obj['v'] = this.formSceneOrder.sence;
            obj['r'] = this.formSceneOrder.senceRoom;
            obj['n'] = this.formSceneOrder.senceText;
          }
          //obj['t'] = 100;
          obj['sec'] = this.scnenDuration == Number.MAX_SAFE_INTEGER ? -1 : this.scnenDuration;
        }else if (outTypeObj(this.formCurtainsOrder.type) == 10){//行程指令，时间默认1
          obj['v'] = this.formCurtainsOrder.curtainsOpenClose;
          //obj['t'] = 100;
          obj['sec'] = 100;
        }else if (outTypeObj(this.formSwitchOrder.type) == 11){//继电器操作指令，时间默认1
          obj['v'] = this.formSwitchOrder.keyArr;
          obj['s'] = this.formSwitchOrder.keyOpr;
          obj['t'] = 100;
          obj['sec'] = 100;
        }else if (this.formMusicOrder.type == 12){
          obj['v'] = this.formMusicOrder.musicVoice;
        }else if (this.formMusicOrder.type == 13){
          obj['v'] = this.formMusicOrder.musicName;
        }else if (this.formMusicOrder.type == 14){

        }else if (this.formMusicOrder.type == 15){
          obj['v'] = parseInt(this.formMusicOrder.musicProcess);
        }
        //console.log(5557,obj);
        //this.taskItem.push(obj);

        //console.log(this.oprOtherType, this.areaIndex);
        if (this.oprOtherType == "orderList"){
          if (this.areaType == 'pre'){
            this.orderList.splice(this.areaIndex, 0, obj);
          }else if(this.areaType == 'next'){
            this.orderList.splice(this.areaIndex + 1, 0, obj);
          }else {
            this.orderList.push(obj);
          }
          this.planList[this.taskIndex]['i'].push(obj);
        }else if(this.oprOtherType == "editOrderList"){
          this.orderList[this.areaIndex] = obj;
          this.planList[this.taskIndex]['i'][this.areaIndex] = obj;
        }else {
          this.taskList[this.taskIndex].push(obj);
          this.planList[this.taskIndex]['i'].push(obj);
        }
        //console.log(1234567,this.taskIndex, this.areaIndex);
        this.setTaskList(this.taskList);
        this.init();
        this.dialogVisible = false;
        this.drawer = false;
        this.drawerBottomDialogVisible = false;
        this.areaIndex = "";
        this.areaItem = "";
        this.areaType = "";
        //this.clearForm();
      }else if(this.oprType == 'delOrder'){
        this.taskList[this.taskIndex].splice(this.oprOrderIndex, 1);
        this.planList[this.taskIndex]['i'].splice(this.oprOrderIndex, 1);;
        this.setTaskList(this.taskList);
        this.init();
        this.dialogVisible = false;
      }else if (this.oprType == 'removeSence'){
        this.removeSence(this.removeSenceItem.sceneId);
      }
      //console.log(6666,this.planList);
    },
    cancelConfig(){
      this.oprType = '';
      this.drawerSenceVisible = false;
    },
    saveConfig(){
      let codeData = "";
      let taskList = [];
      let planList = [];
      let loopStatus = "";
      if (this.formSence.name == undefined || this.formSence.name == ""){
        MessageWarning(this.$t("请输入场景名称"));
        return;
      }else if (this.formSence.roomId == undefined || this.formSence.roomId == ""){
        MessageWarning(this.$t("请选择房间"));
        return;
      }
      this.configLoading = true;

      for (let i = 0; i < this.taskList.length; i++){
        for (let j = 0; j < this.taskList[i].length; j++){
          if (this.taskList[i][j].i == 3 && this.taskList[i][j].t == 0){
            loopStatus = Number.MAX_SAFE_INTEGER;
          }
        }
      }

      if (this.oprType != 'editSceneList'){
        taskList = JSON.parse(JSON.stringify(this.taskList));
        //清理不需要的属性
        planList = JSON.parse(JSON.stringify(this.planList));
        let taskTempArr = [];

        for (let i = 0; i < taskList.length; i++){
          for (let j = 0; j < taskList[i].length; j++){
            if (taskList[i][j].popVisible != undefined || taskList[i][j].popVisible != null){
              taskList[i][j].popVisible = undefined;
            }
            if (taskList[i][j].sec){
              taskList[i][j].sec = undefined;
            }
            if (taskList[i][j].secLoop != undefined || taskList[i][j].secLoop){
              taskList[i][j].secLoop = undefined;
            }
            if (taskList[i][j].insertVisible != undefined || taskList[i][j].insertVisible != null){
              taskList[i][j].insertVisible = undefined;
            }
            if (taskList[i][j].list != undefined || taskList[i][j].list != null){
              taskList[i][j].list = undefined;
            }
          }
        }
        console.log(planList);
        for (let i = 0; i < planList.length; i++){
          planList[i]['i'] = taskList[i];
        }
      }

      //源码用
      let dataObj = {
        id:this.formSence.id,
        room: this.formSence.roomId,
        name: this.formSence.name,
        icon: 1,
        enable: 1,
        internal: this.formSence.internal == false ? 0 : 1,
        duration: loopStatus == Number.MAX_SAFE_INTEGER ? loopStatus : this.ruleMax * 100,
        tasks: this.oprType == 'editSceneList' ? this.editSceneList : planList
      };
      //云端用
      codeData = {
        envKey: this.$route.query.envKey != "" && this.$route.query.envKey != undefined ? this.$route.query.envKey : localStorage.getItem("envKey"),
        iconId: 1,
        internal: this.formSence.internal,
        openSource: false,
        roomId: this.formSence.roomId,
        sceneName: this.formSence.name,
        sceneType: 1,
        sourceCode: JSON.stringify(dataObj)
      };
      console.log(this.oprType);
      console.log(this.oprType == 'editSceneList' ? this.editSceneList : planList);
      if (this.formSence.id != ""){
        codeData['sceneId'] = this.formSence.id;
      }
      codeData = this.$qs.stringify(codeData);

      let url = (this.formSence.id == "" || this.formSence.id == undefined) ? common.createSence : common.editSence;

      this.$axios.post(this.baseUrl + url, codeData, {sessionId: this.sessionId, loading: false}).then(res => {
        if (res.data.code == 200){
          this.installSence(res.data.data.sceneId, dataObj.tasks);

          this.taskTempList = this.taskList;
          this.planTempList = this.planList;
        }else {
          MessageError(res.data.msg);
          this.configLoading = false;
        }
        this.$parent.$parent.loading = false;
      });
    },
    installSence(senceId, tasks){
      //loading: false
      let params = {
        envKey: this.$route.query.envKey != "" && this.$route.query.envKey != undefined ? this.$route.query.envKey : localStorage.getItem("envKey"),
        sceneId: senceId
      };
      params = this.$qs.stringify(params);
      this.$axios.post(this.baseUrl + common.installSence, params, {sessionId: this.sessionId}).then(res => {
        if (res.data.code == 200){
          MessageSuccess(res.data.msg);
          //this.closeOprDrawer();
          if (this.oprType != 'editSceneList'){
            //this.oprType = 'editSceneList';
            this.mainCodeData = {
              id: senceId,
              room: this.formSence.roomId,
              name: this.formSence.name,
              icon: 1,
              enable: true,
              internal: this.formSence.internal,
              duration: '',
            };
            this.editSceneList = tasks;
          }
          this.initSenceList();
          this.oprType = '';
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
        envKey: this.$route.query.envKey != "" && this.$route.query.envKey != undefined ? this.$route.query.envKey : localStorage.getItem("envKey"),
        sceneId: senceId
      };
      params = this.$qs.stringify(params);
      this.$axios.post(this.baseUrl + common.removeSence, params, {sessionId: this.sessionId, loading: false}).then(res => {
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
        envKey: this.$route.query.envKey != "" && this.$route.query.envKey != undefined ? this.$route.query.envKey : localStorage.getItem("envKey"),
        sceneId: senceId
      };
      //params = this.$qs.stringify(params);
      this.$axios.get(this.baseUrl + common.senceInfo, {params: params,sessionId: this.sessionId, loading: false}).then(res => {
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
      this.planTempList = [];
      this.taskTempList = [];
      this.taskResetList = [];
      this.ruleMax = 0;
      this.formSence.id = "";
      this.$parent.$parent.formPlain.deviceSelDevice = [];
      this.$parent.$parent.initMenu(this.planList);
      this.setPageStatus(1);
      this.drawerListVisible = false;
    },
    selEnv(event, item){
      // this.$router.replace({
      //   query: {
      //     envKey: item.envKey,
      //     sessionId: this.sessionId
      //   }
      // });
      this.envKey = item.envKey;
      localStorage.setItem("envKey", this.envKey);
      localStorage.setItem("sessionId", this.sessionId);
      this.drawerEnvVisible = false;
      this.initSenceList();
    },
    checkItemList(item,index){
      let count = 0;
      let countList = 0;
      for (let i = 0; i < this.taskResetList[index].length; i++){
        if (this.taskResetList[index][i].i != 1 && this.taskResetList[index][i].i !=2 && this.taskResetList[index][i].i !=3 && this.taskResetList[index][i].i !=4){
          count++;
        }else if (this.taskResetList[index][i].list != undefined && this.taskResetList[index][i].list.length > 0){
          count = 0;
          countList++;
        }else if (this.taskResetList[index][i].list != undefined && this.taskResetList[index][i].list.length == 0){
          countList = 0;
        }
      }
      return [count, countList];
    },
    goBack () {
      // console.log("点击了浏览器的返回按钮");
      history.pushState(null, null, document.URL);
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
    box-shadow: 1px 0px 3px #000000;
  }
  .demoRuleChildClass{
    display: inline-block;
    min-width: 10px;
    height: 45px;
    text-align: center;
    /*border-right: 0.1px solid #434343;*/
    box-shadow: -0.1px 0px 1px #606266;
    vertical-align:top
  }
  .demoRuleChildEmptyClass{
    display: inline-block;
    width: 1px;
    height: 30px;
  }
  .rule-class {
    min-width: 10px;
    height: 30px;
    display: inline-block;
  }
  .rule-empty-class {
    min-width: 0px;
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
    font-size: 10px;
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
    padding: 5px 10px;
  }
  .item-list-child-child-item{
    display: inline-block;
    position: relative;
    top: 0px;
    left: 5px;
  }
  .item-list-child-child-item2{
    display: inline-block;
    position: relative;
    top: 5px;
    left: 5px;
  }
  .item-list-child-child-title2{
    display: inline-block;
    position: relative;
    top: 5px;
    left: 0px;
  }
  .item-list-child-child-opr{
    display: inline-block;
    position: relative;
    top: 15px;
    left: 0px;
  }
  .item-list-child-child-opr-item{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    width: 30px;
    vertical-align: middle;
  }
  .item-list-child-child-title{
    position: relative;
    top: -8px;
  }
  .item-active{
    box-shadow:0 0 5px #888888;
  }
  .index-main-item-block{
    font-size: 12px;
    padding: 0px 10px;
    position: relative;
    top: 0px;
    height: 40px;
    line-height: 40px;
  }
  .colorBlock{
    border: 1px solid #dddddd;
    height: 25px;
    width: 25px;
    border-radius: 5px;
    display: inline-block;
  }
  .opr-item-title-block{
    display: inline-block;
    position: relative;
    top: 0px;
    cursor: default;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .opr-item-block{
    display: inline-block;
    position: relative;
    top: 0px;
    cursor: default;
    height: 30px;
    line-height: 30px;
    width: 30px;
    text-align: center;
  }
</style>

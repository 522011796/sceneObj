<template>
  <div @click="hidePopVisible">
    <div id="guide-v" class="guide guide-v" @mousedown="mousedown"></div>
    <div class="demoRuleClass" :style="{'width': ruleMax * 70 + 25 + 'px'}">
      <div>
        <div class="demoRuleFixedClass" :style="{'width': ruleMax * 70+'px', 'left': -scrollLeft+0 + 'px'}">
          <div v-for="(itemNum, indexNum) in ruleMax" :key="indexNum" class="rule-class">
            <div class="num">
              {{format(indexNum)}}
            </div>
            <div class="ver-line"></div>
          </div>
        </div>
        <!--<el-slider v-model="sliderValue"></el-slider>-->
      </div>

      <div class="demoRuleContentClass" :style="divStyle" ref="wrapper" @scroll="handleScrollTop">
        <div v-for="(item, index) in dataList" style="margin-bottom: 10px">
          <div class="demoRuleChildClass" v-for="(itemBlock, indexBlock) in item.list" :style="{'background': indexBlock % 2 == 0 ? '#00f' : '#f00', 'width': itemBlock.sec * 70+'px', 'height':'40px'}" @click.stop="selBlock($event, item, index, itemBlock, indexBlock)">
            <el-popover
              popper-class="indexPopVisible"
              v-model="itemBlock.popVisible"
              placement="bottom"
              trigger="manual">
              <div>
                {{itemBlock.sec}}
              </div>
              <div style="height: 100%; width: 100%" slot="reference">
                {{itemBlock.sec}}
              </div>
            </el-popover>
          </div>
          <span class="index-plus-item">
            <i class="fa fa-plus font-size-14" @click.stop="setSence($event, item, index)"></i>
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
            <span>title</span>
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
                <span class="alertFooterSpan" @click="dialogVisible = false">
                  确 定
                </span>
              </div>
            </el-col>
          </el-row>
        </span>
    </el-dialog>

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
                {{$t("场景设置")}}
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

      <div class="drawerHeaderContent" :style="{'padding-bottom': paddingBottom}">
        <el-form class="netmoon-form-dialog" label-width="90px" ref="formPlain" :model="formPlain">
          <el-form-item label="场景名称" v-model="formPlain.name">
            <el-input :placeholder="$t('请输入任务名称')" v-model="formPlain.name"></el-input>
          </el-form-item>
          <el-form-item label="控制房间">
            <div class="textRight color-666666" @click="addDialog($event, 'room')">
              <label>{{formPlain.room == '' ? $t("请选择") : formPlain.room}}</label>
              <label><i class="fa fa-chevron-right"></i></label>
            </div>
          </el-form-item>
          <el-form-item label="自定义图标">
            <div class="textRight color-666666" @click="addDialog($event, 'icon')">
              <label>{{formPlain.icon == '' ? $t("请选择") : formPlain.icon}}</label>
              <label><i class="fa fa-chevron-right"></i></label>
            </div>
          </el-form-item>
          <el-form-item label="选择模版">
            <div class="textRight color-666666" @click="addDialog($event, 'template')">
              <label>{{formPlain.template == '' ? $t("请选择") : formPlain.template}}</label>
              <label><i class="fa fa-chevron-right"></i></label>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <!--房间列表-->
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
              <a href="javascript:;" class="color-success" @click="saveDeviceBlock">保存</a>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="drawerHeaderDiv">
              <span v-if="setType == 'room'">{{$t("房间列表")}}</span>
              <span v-if="setType == 'icon'">{{$t("图标列表")}}</span>
              <span v-if="setType == 'template'">{{$t("模版列表")}}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="drawerHeaderDiv">
              <a href="javascript:;" class="drawerHeaderBtn primary-color" @click="cancelDeviceDrawer">关闭</a>
            </div>
          </el-col>
        </el-row>
      </div>
      <div :class="setType == 'template' ? '' : 'marginTop20'">
        <div class="rightDialogTab" v-if="setType == 'template'">
          <el-row>
            <el-col :span="24">
              <div>
                <el-button-group>
                  <el-button size="mini" @click="selTemplate($event, 1)" :type="templateType == '1' ? 'primary' : ''">{{$t("光效墙模板")}}</el-button>
                  <el-button size="mini" @click="selTemplate($event, 2)" :type="templateType == '2' ? 'primary' : ''">{{$t("自定义编程")}}</el-button>
                </el-button-group>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="rightDialogContent" v-if="setType != 'template'" :style="dialogRightTabStyle">
          <div>
            <el-row :gutter="8">
              <template v-if="setType == 'room'">
                <el-col :span="8" v-for="(item, index) in roomList" :key="index">
                  <div class="item-block" :class="item._checked ? 'item-active' : ''" @click="selBLock($event, item, 'room')">
                    <div class="textCenter">
                      <img src="~/static/img/light.png" class="item-icon"/>
                    </div>
                    <div class="textCenter index-item-title">
                      <label>room</label>
                    </div>
                  </div>
                </el-col>
              </template>

              <template v-if="setType == 'icon'">
                <el-col :span="8" v-for="(item, index) in iconList" :key="index">
                  <div class="item-block" :class="item._checked ? 'item-active' : ''" @click="selBLock($event, item, 'icon')">
                    <div class="textCenter">
                      <img src="~/static/img/light.png" class="item-icon"/>
                    </div>
                    <div class="textCenter index-item-title">
                      <label>icon</label>
                    </div>
                  </div>
                </el-col>
              </template>

            </el-row>
          </div>
        </div>

        <!--模板-->
        <div v-if="setType == 'template'">
          <div v-if="templateType == '1'">
            <div class="rightDialogContent">
              <el-form label-width="80px" ref="formPlain" :model="formPlain">
                <el-form-item label="场景名称" class="netmoon-form-item-dialog">
                  <div class="textRight padding-right5">
                    <el-input :placeholder="$t('请输入任务名称')" v-model="formPlain.name"></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="控制房间" class="netmoon-form-item-dialog">
                  <div class="textRight padding-right5" @click="addChildDialog($event, 'room')">
                    <label>{{formTemplate.room == '' ? $t("请选择") : formTemplate.room}}</label>
                    <label><i class="fa fa-chevron-right"></i></label>
                  </div>
                </el-form-item>
                <el-form-item label="变化速度" class="netmoon-form-item-dialog">
                  <div class="textRight padding-right5" @click="addChildBottomDialog($event, 'change')">
                    <label>{{formTemplate.change == '' ? $t("请选择") : formTemplate.change}}</label>
                    <label><i class="fa fa-chevron-right"></i></label>
                  </div>
                </el-form-item>
                <el-form-item label="执行次数" class="netmoon-form-item-border-dialog">
                  <div class="textRight padding-right5">
                    <el-row>
                      <el-col :span="8">
                        <div class="textLeft">
                          <label class="color-bbbbbb font-size-12">({{$t("0表示无限重复")}})</label>
                        </div>
                      </el-col>
                      <el-col :span="16">
                        <el-input-number size="mini" v-model="formTemplate.setNum" @change="handleChange($event, 'setNum')" :min="0"></el-input-number>
                      </el-col>
                    </el-row>
                  </div>
                </el-form-item>
                <el-form-item label="重复间隔" class="netmoon-form-item-border-dialog">
                  <div class="textRight padding-right5">
                    <el-input-number size="mini" v-model="formTemplate.loop" @change="handleChange($event, 'loop')" :min="0"></el-input-number>
                  </div>
                </el-form-item>
              </el-form>
            </div>

            <div class="marginTop20" style="margin-bottom: 10px">
              <div>
                <el-row>
                  <el-col :span="12">
                    <div>
                      <label class="color-666666">{{$t("灯具列表")}}</label>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="textRight">
                      <el-button size="mini" type="warning" @click="addChildDialog($event, 'light')">{{$t("添加灯具")}}</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="rightDialogContent marginTop10">
                <div class="item-list-child" v-for="n in 20" :key="n">
                  <el-row>
                    <el-col :span="12">
                      <span>1</span>
                      <span class="marginLeft10">xxxx | xxxx</span>
                    </el-col>
                    <el-col :span="12">
                      <div class="textRight">
                        <a href="javascript:;" class="color-warning" @click="addChildDialog($event, 'light')">{{$t("替换")}}</a>
                        <a href="javascript:;" class="color-error" @click="delOpr($event, 'lightCustom')">{{$t("删除")}}</a>
                        <a href="javascript:;" class="color-default">{{$t("上移")}}</a>
                        <a href="javascript:;" class="color-default">{{$t("下移")}}</a>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>

          <div v-if="templateType == '2'">
            <div class="rightDialogContent">
              <el-form class="netmoon-form-dialog" label-width="80px" ref="formPlain" :model="formPlain">
                <el-form-item label="场景名称" v-model="formPlain.name">
                  <div class="textRight padding-right5">
                    <el-input :placeholder="$t('请输入任务名称')" v-model="formPlain.name"></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="控制房间">
                  <div class="textRight padding-right5" @click="addChildDialog($event, 'room')">
                    <label>{{formPlain.room == '' ? $t("请选择") : formPlain.room}}</label>
                    <label><i class="fa fa-chevron-right"></i></label>
                  </div>
                </el-form-item>
              </el-form>
            </div>

            <div class="marginTop20" style="margin-bottom: 10px">
              <div>
                <label class="color-666666">{{$t("灯具列表")}}</label>
              </div>
              <div class="marginTop10">
                <div class="item-list-child rightDialogContent marginBottom10" style="padding: 0px;" v-for="n in 4" :key="n">
                  <div class="item-list-child-main">
                    <el-row>
                      <el-col :span="18">
                        <span><i class="fa fa-circle"></i></span>
                        <span class="marginLeft10">
                          <label v-if="n == 1">灯 | 主卧</label>
                          <label v-if="n == 2">开关 | 主卧</label>
                          <label v-if="n == 3">窗帘 | 主卧</label>
                          <label v-if="n == 4">灯组 | 主卧</label>
                        </span>
                      </el-col>
                      <el-col :span="6">
                        <div class="textRight">
                          <a href="javascript:;" class="color-error padding-lf5" @click="delOpr($event, 'main')"><i class="fa fa-trash"></i></a>
                          <a href="javascript:;" class="color-warning padding-lf5"><i class="fa fa-copy"></i></a>
                          <!--模拟用-->
                          <a href="javascript:;" class="color-success padding-lf5" v-if="n == 1" @click="addChildBottomDialog($event, 'lightSub')"><i class="fa fa-plus-circle"></i></a>
                          <a href="javascript:;" class="color-success padding-lf5" v-if="n == 2" @click="addChildBottomDialog($event, 'switchSub')"><i class="fa fa-plus-circle"></i></a>
                          <a href="javascript:;" class="color-success padding-lf5" v-if="n == 3" @click="addChildBottomDialog($event, 'curtainsSub')"><i class="fa fa-plus-circle"></i></a>
                          <a href="javascript:;" class="color-success padding-lf5" v-if="n == 4" @click="addChildBottomDialog($event, 'lightGroupSub')"><i class="fa fa-plus-circle"></i></a>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="padding-lf15">
                    <div class="item-list-child-sub" v-for="n in 2">
                      <el-row>
                        <el-col :span="8">
                          <div>
                            <span>{{n}}</span>
                            <span>开灯</span>
                            <span>#202020</span>
                          </div>
                        </el-col>
                        <el-col :span="16">
                          <div class="textRight">
                            <span>
                              <el-tag type="success" size="mini">
                                {{$t("延时")}} 666
                              </el-tag>
                              <el-tag type="warning" size="mini">
                                {{$t("渐变")}} 866
                              </el-tag>
                            </span>
                            <span>
                              <span>时刻</span>
                              <span>00:00:001</span>
                              <el-popover
                                placement="bottom"
                                width="100"
                                popper-class="pop-custom"
                                trigger="click">
                                  <div class="textCenter">
                                    <div class="index-pop-item">
                                      <a href="javascript:;" class="color-success font-size-12">{{$t("修改")}}</a>
                                    </div>
                                    <div class="index-pop-item">
                                      <a href="javascript:;" class="color-error font-size-12" @click="delOpr($event, 'lightSub')">{{$t("删除")}}</a>
                                    </div><div class="index-pop-item">
                                      <a href="javascript:;" class="color-default font-size-12">{{$t("上方插入")}}</a>
                                    </div><div class="index-pop-item">
                                      <a href="javascript:;" class="color-default font-size-12">{{$t("下发插入")}}</a>
                                    </div>
                                  </div>
                                  <a slot="reference" href="javascript:;" class="color-warning padding-lf5"><i class="fa fa-cog"></i></a>
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
          </div>
        </div>

        <!--模版操作-->
        <el-drawer
          custom-class="drawer-right-bottom"
          title="我是标题"
          :size="drawerRightChildWidth"
          :append-to-body="true"
          :show-close="false"
          :visible.sync="drawerChild"
          :direction="directionDevice"
          @closed="closeChildDrawer">
          <div class="drawerRightHeader" slot="title">
            <el-row>
              <el-col :span="4">
                <div class="drawerHeaderDiv">
                  <a href="javascript:;" class="color-success" @click="saveRoomBlock">保存</a>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="drawerHeaderDiv">
                  <span v-if="setChildType == 'room'">{{$t("房间列表")}}</span>
                  <span v-if="setChildType == 'icon'">{{$t("图标列表")}}</span>
                  <span v-if="setChildType == 'template'">{{$t("模版列表")}}</span>
                  <span v-if="setChildType == 'light'">{{$t("灯具列表")}}</span>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="drawerHeaderDiv">
                  <a href="javascript:;" class="drawerHeaderBtn primary-color" @click="cancelChildDrawer">关闭</a>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="setChildType != 'light' ？'marginTop20' : ''">
            <div v-if="setChildType != 'light'" class="rightDialogContent" :style="dialogRightChildTabStyle">
              <div>
                <el-row :gutter="8">
                  <el-col :span="8" v-for="(item, index) in roomList" :key="index">
                    <div class="item-block" :class="item._checked ? 'item-active' : ''" @click="selBLock($event, item, 'room')">
                      <div class="textCenter">
                        <img src="~/static/img/light.png" class="item-icon"/>
                      </div>
                      <div class="textCenter index-item-title">
                        <label>room</label>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>

            <div v-if="setChildType == 'light'">
              <div class="rightDialogTab">
                <el-button size="mini">{{$t("全部房间")}}</el-button>
              </div>

              <div class="rightDialogContent" :style="dialogRightTabStyle">
                <div class="item-list-child" v-for="(item, index) in 50">
                  <el-row>
                    <el-col :span="18">
                      <div>
                          <span>
                            1
                          </span>
                        <span>
                            xxxx | xxxx
                          </span>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="textRight">
                        <el-button size="mini">{{$t("查找")}}</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </el-drawer>

        <!--底部弹出-->
        <!--<div class="mask" v-show="drawerBottomDialogVisible" @click="cancelChildBottomDrawer"></div>-->
        <div class="mask" v-show="drawerBottomDialogVisible"></div>
        <transition :name="screenOrientation == 'landscape' ? 'myboxV' : 'mybox'">
          <div :class="screenOrientation == 'landscape' ? 'drawerBottomDialogV' : 'drawerBottomDialog'" class="share" v-show="drawerBottomDialogVisible"
               :style="{
            'width': (screenOrientation == 'landscape' && appType == 'app') ? '90% !important' : '100% !important',
            'margin-left': (screenOrientation == 'landscape' && appType == 'app') ? '5% !important' : ''
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
                <div v-if="setChildBottomType == 'lightSub' || setChildBottomType == 'lightGroup'" >
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
                            <div v-if="setChildBottomType != 'lightGroup'" class="index-pop-item" @click="changeCustomBottomType($event, 7)">
                              <span>{{$t("循环操作")}}</span>
                            </div>
                            <div class="index-pop-item" @click="changeCustomBottomType($event, 8)">
                              <span>{{$t("电源控制(勿与循环操作一起使用)")}}</span>
                            </div>
                            <div class="index-pop-item" @click="changeCustomBottomType($event, 5)">
                              <span>{{$t("场景调用(勿使用2级以上嵌套)")}}</span>
                            </div>
                            <div class="index-pop-item" @click="changeCustomBottomType($event, 6)">
                              <span>{{$t("延时")}}</span>
                            </div>
                          </div>
                          <span slot="reference" size="mini">
                          <label>{{formOrder.type == '' ? $t("请选择") : formOrder.type}}</label>
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
                            <div class="index-pop-item" @click="changeCustomBottomOpen($event, 2)">
                              <span>{{$t("关灯")}}</span>
                            </div>
                          </div>
                          <span slot="reference" size="mini">
                          <label>{{formOrder.open == '' ? $t("请选择") : formOrder.open}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                        </el-popover>
                      </div>
                    </el-form-item>
                    <el-form-item v-if="customBottomType == 7" label="循环起始" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <el-popover
                          placement="left"
                          width="240"
                          popper-class="pop-custom"
                          trigger="click"
                          v-model="customBottomOpenVisible">
                          <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                            <div class="index-pop-item" v-for="n in 10">
                              <el-row>
                                <el-col :span="20">
                                  <div class="textLeft">
                                    <span>xxxxxxxxxx</span>
                                  </div>
                                </el-col>
                                <el-col :span="4">
                                  <div class="textRight">
                                    <span v-if="n == 2"><i class="fa fa-check-circle color-success"></i></span>
                                  </div>
                                </el-col>
                              </el-row>
                            </div>
                          </div>
                          <span slot="reference" size="mini">
                          <label>{{formOrder.startOrder == '' ? $t("请选择") : formOrder.startOrder}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                        </el-popover>
                      </div>
                    </el-form-item>
                    <el-form-item v-if="customBottomType == 2" label="亮度" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <el-slider v-model="formOrder.light" :min="0" :max="100" @change="handleChange($event, 'light')"></el-slider>
                      </div>
                    </el-form-item>
                    <el-form-item v-if="customBottomType == 3" label="色温" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <el-slider v-model="formOrder.temp" :min="2700" :max="6500" @change="handleChange($event, 'temp')"></el-slider>
                      </div>
                    </el-form-item>
                    <el-form-item v-if="customBottomType == 4" label="色彩" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <el-color-picker v-model="formOrder.color"></el-color-picker>
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
                            <div class="index-pop-item" v-for="n in 10">
                              <el-row>
                                <el-col :span="20">
                                  <div class="textLeft">
                                    <span>xxxxxxxxxx</span>
                                  </div>
                                </el-col>
                                <el-col :span="4">
                                  <div class="textRight">
                                    <span v-if="n == 2"><i class="fa fa-check-circle color-success"></i></span>
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
                    <el-form-item v-if="customBottomType != 5 && customBottomType != 6 && customBottomType != 7 && customBottomType != 8" label="渐变时间" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <el-input-number size="mini" v-model="formOrder.changeTime" @change="handleChange($event, 'changeTime')" :min="0"></el-input-number>
                      </div>
                    </el-form-item>
                    <el-form-item label="延时时间" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <el-input-number size="mini" v-model="formOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="0"></el-input-number>
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
                            <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 1)">
                              <span>{{$t("行程控制")}}</span>
                            </div>
                            <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 2)">
                              <span>{{$t("循环操作")}}</span>
                            </div>
                            <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 3)">
                              <span>{{$t("场景调用(勿使用2级以上嵌套)")}}</span>
                            </div>
                            <div class="index-pop-item" @click="changeCustomBottomCurtainsType($event, 4)">
                              <span>{{$t("延时")}}</span>
                            </div>
                          </div>
                          <span slot="reference" size="mini">
                          <label>{{formCurtainsOrder.type == '' ? $t("请选择") : formCurtainsOrder.type}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                        </el-popover>
                      </div>
                    </el-form-item>
                    <el-form-item v-if="customBottomType == 1" label="开合百分比" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <el-slider v-model="formCurtainsOrder.curtainsOpenClose" :min="0" :max="100" @change="handleChange($event, 'curtainsOpenClose')"></el-slider>
                      </div>
                    </el-form-item>
                    <el-form-item v-if="customBottomType == 2" label="循环起始" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <el-popover
                          placement="left"
                          width="240"
                          popper-class="pop-custom"
                          trigger="click"
                          v-model="customBottomOpenVisible">
                          <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                            <div class="index-pop-item" v-for="n in 10">
                              <el-row>
                                <el-col :span="20">
                                  <div class="textLeft">
                                    <span>xxxxxxxxxx</span>
                                  </div>
                                </el-col>
                                <el-col :span="4">
                                  <div class="textRight">
                                    <span v-if="n == 2"><i class="fa fa-check-circle color-success"></i></span>
                                  </div>
                                </el-col>
                              </el-row>
                            </div>
                          </div>
                          <span slot="reference" size="mini">
                            <label>{{formOrder.startOrder == '' ? $t("请选择") : formOrder.startOrder}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                        </el-popover>
                      </div>
                    </el-form-item>
                    <el-form-item v-if="customBottomType == 2" label="重复次数" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <el-input-number size="mini" v-model="formCurtainsOrder.startLoop" @change="handleChange($event, 'startLoop')" :min="0"></el-input-number>
                      </div>
                    </el-form-item>
                    <el-form-item v-if="customBottomType == 3" label="场景名称" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <el-popover
                          placement="left"
                          width="240"
                          popper-class="pop-custom"
                          trigger="click"
                          v-model="customBottomOpenVisible">
                          <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                            <div class="index-pop-item" v-for="n in 10">
                              <el-row>
                                <el-col :span="20">
                                  <div class="textLeft">
                                    <span>xxxxxxxxxx</span>
                                  </div>
                                </el-col>
                                <el-col :span="4">
                                  <div class="textRight">
                                    <span v-if="n == 2"><i class="fa fa-check-circle color-success"></i></span>
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
                    <el-form-item label="延时时间" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <el-input-number size="mini" v-model="formCurtainsOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="0"></el-input-number>
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
                            <div class="index-pop-item" @click="changeCustomBottomSwitchType($event, 1)">
                              <span>{{$t("按键操作")}}</span>
                            </div>
                            <div class="index-pop-item" @click="changeCustomBottomSwitchType($event, 2)">
                              <span>{{$t("延时")}}</span>
                            </div>
                          </div>
                          <span slot="reference" size="mini">
                          <label>{{formSwitchOrder.type == '' ? $t("请选择") : formSwitchOrder.type}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                        </el-popover>
                      </div>
                    </el-form-item>
                    <el-form-item v-if="customBottomType == 1" label="按键" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <div class="textRight color-666666">
                          <el-popover
                            placement="left"
                            width="240"
                            popper-class="pop-custom"
                            trigger="click"
                            v-model="customBottomKeyVisible">
                            <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                              <div class="index-pop-item" v-for="n in 10">
                                <el-row>
                                  <el-col :span="20">
                                    <div class="textLeft">
                                      <span>xxxxxxxxxx</span>
                                    </div>
                                  </el-col>
                                  <el-col :span="4">
                                    <div class="textRight">
                                      <span v-if="n == 2"><i class="fa fa-check-circle color-success"></i></span>
                                    </div>
                                  </el-col>
                                </el-row>
                              </div>
                            </div>
                            <span slot="reference" size="mini">
                            <label>{{formSwitchOrder.key == '' ? $t("请选择") : formOrder.key}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                          </el-popover>
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item v-if="customBottomType == 1" label="按键操作" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <el-popover
                          placement="left"
                          width="240"
                          popper-class="pop-custom"
                          trigger="click"
                          v-model="customBottomKeyOprVisible">
                          <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                            <div class="index-pop-item" @click="changeCustomBottomSwitchKeyOprType($event, 1)">
                              <el-row>
                                <el-col :span="20">
                                  <div class="textLeft">
                                    <span>{{$t("打开")}}</span>
                                  </div>
                                </el-col>
                                <el-col :span="4">
                                  <div class="textRight">
                                    <span><i class="fa fa-check-circle color-success"></i></span>
                                  </div>
                                </el-col>
                              </el-row>
                            </div>
                            <div class="index-pop-item" @click="changeCustomBottomSwitchKeyOprType($event, 1)">
                              <el-row>
                                <el-col :span="20">
                                  <div class="textLeft">
                                    <span>{{$t("关闭")}}</span>
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
                            <label>{{formSwitchOrder.keyOpr == '' ? $t("请选择") : formSwitchOrder.keyOpr}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                        </el-popover>
                      </div>
                    </el-form-item>
                    <el-form-item label="延时时间" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <el-input-number size="mini" v-model="formCurtainsOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="0"></el-input-number>
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
                            <div class="index-pop-item" @click="changeCustomBottomSwitchType($event, 1)">
                              <span>{{$t("按键操作")}}</span>
                            </div>
                            <div class="index-pop-item" @click="changeCustomBottomSwitchType($event, 2)">
                              <span>{{$t("延时")}}</span>
                            </div>
                          </div>
                          <span slot="reference" size="mini">
                          <label>{{formSwitchOrder.type == '' ? $t("请选择") : formSwitchOrder.type}}</label>
                          <label><i class="fa fa-chevron-right"></i></label>
                        </span>
                        </el-popover>
                      </div>
                    </el-form-item>
                    <el-form-item v-if="customBottomType == 1" label="按键" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <div class="textRight color-666666">
                          <el-popover
                            placement="left"
                            width="240"
                            popper-class="pop-custom"
                            trigger="click"
                            v-model="customBottomKeyVisible">
                            <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                              <div class="index-pop-item" v-for="n in 10">
                                <el-row>
                                  <el-col :span="20">
                                    <div class="textLeft">
                                      <span>xxxxxxxxxx</span>
                                    </div>
                                  </el-col>
                                  <el-col :span="4">
                                    <div class="textRight">
                                      <span v-if="n == 2"><i class="fa fa-check-circle color-success"></i></span>
                                    </div>
                                  </el-col>
                                </el-row>
                              </div>
                            </div>
                            <span slot="reference" size="mini">
                            <label>{{formSwitchOrder.key == '' ? $t("请选择") : formOrder.key}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                          </el-popover>
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item v-if="customBottomType == 1" label="按键操作" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <el-popover
                          placement="left"
                          width="240"
                          popper-class="pop-custom"
                          trigger="click"
                          v-model="customBottomKeyOprVisible">
                          <div class="textCenter" style="max-height: 260px; overflow-y: auto">
                            <div class="index-pop-item" @click="changeCustomBottomSwitchKeyOprType($event, 1)">
                              <el-row>
                                <el-col :span="20">
                                  <div class="textLeft">
                                    <span>{{$t("打开")}}</span>
                                  </div>
                                </el-col>
                                <el-col :span="4">
                                  <div class="textRight">
                                    <span><i class="fa fa-check-circle color-success"></i></span>
                                  </div>
                                </el-col>
                              </el-row>
                            </div>
                            <div class="index-pop-item" @click="changeCustomBottomSwitchKeyOprType($event, 1)">
                              <el-row>
                                <el-col :span="20">
                                  <div class="textLeft">
                                    <span>{{$t("关闭")}}</span>
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
                            <label>{{formSwitchOrder.keyOpr == '' ? $t("请选择") : formSwitchOrder.keyOpr}}</label>
                            <label><i class="fa fa-chevron-right"></i></label>
                          </span>
                        </el-popover>
                      </div>
                    </el-form-item>
                    <el-form-item label="延时时间" class="netmoon-form-item-border-dialog">
                      <div class="textRight color-666666">
                        <el-input-number size="mini" v-model="formCurtainsOrder.waitTime" @change="handleChange($event, 'waitTime')" :min="0"></el-input-number>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import mixins from '/mixins/mixins';
import {MessageWarning} from "../utils/utils";
export default {
  mixins: [mixins],
  data(){
    return {
      popvisible: false,
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
      drawer: false,
      drawerDevice: false,
      dialogVisible: false,
      drawerChild: false,
      drawerChildBottom: false,
      drawerBottomDialogVisible: false,
      customBottomVisible:false,
      customBottomOpenVisible: false,
      customBottomKeyOprVisible: false,
      customBottomKeyVisible: false,
      dialogHeight: '50%',
      drawerRightWidth: '90%',
      drawerRightChildWidth: '90%',
      direction: 'btt',
      directionDevice: 'rtl',
      screenArrow: '',
      setType: '',
      setChildType: '',
      setChildBottomType: '',
      templateType: '1',
      repetLoop: '无限重复',
      alertMessageTips: '',
      customBottomType: '1',
      customBottomOpen: '2',
      customBottomKeyOpr: '',
      speed: '',
      divStyle: {
        'height': '0px',
        'overflow-y': 'auto',
      },
      dialogRightTabStyle:{
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
        type: '开/关灯控制',
        light: 0,
        color: '',
        temp: 2700,
        waitTime: 0,
        changeTime: 0,
        sence: '',
        open: '关灯',
        startLoop: 0,
        startOrder: ''
      },
      formCurtainsOrder: {
        type: '行程控制',
        waitTime: 0,
        sence: '',
        curtainsOpenClose: 0
      },
      formSwitchOrder: {
        type: '按键操作',
        key: '',
        keyOpr: '',
        waitTime: 0
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
    // 监听窗口大小
    window.addEventListener( 'resize', () => (this.checkIndexOrient())
    );

    this.init();
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
    this.checkIndexOrient();
    this.initRoom();
    this.initDevice();
    this.initICon();
  },
  methods:{
    init(){
      this.dataList = [];
      this.ruleList = [];
      for (let i = 0; i < 3; i++){
        let dataObj = {
          name: i,
          list: []
        };
        this.ruleCount = 0;
        for (let j = 0; j < 30; j++){
          let aNumber = (5 - 1) * Math.random() + 1;
          let result = Math.floor(aNumber);
          this.ruleCount += result;
          dataObj.list.push({
            sec: result,
            popVisible: false
          });
        }
        this.ruleList.push(this.ruleCount);
        this.dataList.push(dataObj);
      }
      let ruleMax = Math.max(...this.ruleList);
      this.ruleMax = ruleMax;
      //this.handleScrollTop()
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
    format(seconds) {
      let hour = Math.floor(seconds / 3600) >= 10 ? Math.floor(seconds / 3600) : '0' + Math.floor(seconds / 3600);
      seconds -= 3600 * hour;
      let min = Math.floor(seconds / 60) >= 10 ? Math.floor(seconds / 60) : '0' + Math.floor(seconds / 60);
      seconds -= 60 * min;
      let sec = seconds >= 10 ? seconds : '0' + seconds;
      return hour + ':' + min + ':' + sec;
    },
    hhIndex(type){
      if (process.browser) {
        //this.divStyle.height = window.innerHeight-40-60 + 'px';
        let height = this.setType == 'template' ? window.innerHeight-45-60-30 : window.innerHeight-45-60;
        let heightChild = window.innerHeight-45-60;
        let heightBottomChild = type == 'landscape' ? window.innerHeight * 0.7-45 : window.innerHeight * 0.5-45;
        this.$set(this.divStyle,'height', window.innerHeight-40-60 + 'px');
        this.$set(this.dialogRightTabStyle,'height', height + 'px');
        this.$set(this.dialogRightChildTabStyle,'height', heightChild + 'px');
        this.$set(this.drawerBottomDialogStyle,'height', heightBottomChild + 'px');
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
    handleScroll() {
      this.scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      this.hidePopVisible();
    },
    handleScrollTop(){
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
    selBlock(event, item, index, itemBlock, indexBlock){
      //console.log(index, indexBlock);
      this.drawer = true;
      for (let i = 0; i < this.dataList.length; i++){
        for (let j = 0; j < this.dataList[i].list.length; j++){
          if (i == index && indexBlock == j){
            this.dataList[i].list[j].popVisible = !this.dataList[i].list[j].popVisible;
          }else {
            this.dataList[i].list[j].popVisible = false;
          }
        }
      }
    },
    mousedown(){
      console.log(111);
    },
    hidePopVisible(){
      for (let i = 0; i < this.dataList.length; i++){
        for (let j = 0; j < this.dataList[i].list.length; j++){
          this.dataList[i].list[j].popVisible = false;
        }
      }
    },
    setSence(event, item, index){
      this.drawer = true;
    },
    okConfirm(){
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
      this.drawerBottomDialogVisible = false;
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
    addChildBottomDialog(event, type){
      //this.drawerChildBottom = true;
      if (type == "change"){
        this.setChildBottomType = type;
      }else if(type == "lightSub"){
        this.setChildBottomType = type;
      }else if(type == "curtainsSub"){
        this.setChildBottomType = type;
      }else if(type == "switchSub"){
        this.setChildBottomType = type;
      }else if(type == "lightGroup"){
        this.setChildBottomType = type;
      }
      this.drawerBottomDialogVisible = true;
    },
    selTemplate(event, type){
      this.templateType = type;
    },
    closeDrawer(){
      this.templateType = 1;
      this.drawerBottomDialogVisible = false;
      this.customBottomType = 1;
      this.customBottomOpen = 2;
      this.setDialogWidth(this.setType);
    },
    closeChildDrawer(){
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
      }else if (type == 'light'){
        this.formOrder.light = data;
      }else if (type == 'temp'){
        this.formOrder.temp = data;
      }else if (type == 'startLoop'){
        this.formOrder.startLoop = data;
      }else if (type == 'curtainsOpenClose'){
        this.formCurtainsOrder.curtainsOpenClose = data;
      }
    },
    closeDialog(){
      //this.selMenuData = "";
    },
    delOpr(event, type){
      this.alertMessageTips = this.$t("确定删除该数据吗？");
      this.dialogVisible = true;
    },
    changeCustomBottomType(event, type){
      this.formOrder.type = event.target.innerText;
      this.customBottomType = type;
      this.customBottomVisible = false;
    },
    changeCustomBottomSwitchType(event, type){
      this.formSwitchOrder.type = event.target.innerText;
      this.customBottomType = type;
      this.customBottomVisible = false;
    },
    changeCustomBottomCurtainsType(event, type){
      this.formCurtainsOrder.type = event.target.innerText;
      this.customBottomType = type;
      this.customBottomVisible = false;
    },
    changeCustomBottomOpen(event, type){
      this.formOrder.open = event.target.innerText;
      this.customBottomOpen = type;
      this.customBottomOpenVisible = false;
    },
    changeCustomBottomSwitchKeyOprType(event, type){
      this.formSwitchOrder.keyOpr = event.target.innerText;
      this.customBottomKeyOpr = type;
      this.customBottomKeyOprVisible = false;
    },
    selBLock(event, item, type){
      if (type == "room"){
        for (let i = 0; i < this.roomList.length; i++){
          this.roomList[i]._checked = false;
          if (item.name == this.roomList[i].name){
            this.roomList[i]._checked = true;
          }
        }
      }else if (type == "icon"){
        for (let i = 0; i < this.iconList.length; i++){
          this.iconList[i]._checked = false;
          if (item.name == this.iconList[i].name){
            this.iconList[i]._checked = true;
          }
        }
      }
    },
    saveRoomBlock(event){
      this.drawerChild = false;
    },
    saveDeviceBlock(event){
      this.drawerDevice = false;
    },
    selSpeed(item, index){
      this.speed = index;
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
  .demoRuleChildClass{
    display: inline-block;
    min-width: 70px;
    height: 45px;
  }
  .rule-class {
    min-width: 70px;
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
    box-shadow: 0px 0px 10px #000000;
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
</style>

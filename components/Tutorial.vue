<!-- Please remove this file from your project -->
<template>
<!--  <div style="width: 100%" v-finger:pinch="pinchHandler" :style="{'transform': 'translate('+ posX + 'px,' + posY + 'px) translateZ(0px) scale(' + dis + ')  rotate(' + angle + 'deg)'}">-->
<!--    <div>-->
<!--      {{testStr}}-->
<!--    </div>-->
<!--    <img-->
<!--      v-finger:rotate="rotateHandler"-->
<!--      src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00011-2072.jpg"-->
<!--      class="pic"-->
<!--      id="pic"-->
<!--      style="height: 200px;width: 200px"-->

<!--    />-->
<!--    <el-button @click="test">alert</el-button>-->
<!--    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>-->

<!--    <div>-->
<!--      <p v-for="n in 10" :key="n">{{n}}</p>-->
<!--    </div>-->

<!--    <el-dialog-->
<!--      title="提示"-->
<!--      :visible.sync="dialogVisible"-->
<!--      width="80%"-->
<!--      :before-close="handleClose">-->
<!--      <span>这是一段信息</span>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
<!--  </div>-->

<!--  <div id="testId" style="height: 100%; width: 100%;white-space: nowrap;">-->
<!--    <div v-for="n in 3" :key="n" style="margin-bottom: 10px">-->
<!--      <span v-for="n in 30" :key="n" class="line-block-class" :style="{'background': n % 2 == 0 ? '#dddddd' : '#f00', 'width':'100px', 'height':'30px'}">-->

<!--      </span>-->
<!--    </div>-->
<!--  </div>-->

<!--  <div class="demoRule">-->
<!--    <div style="position: relative;height: 35px">-->
<!--      <div v-for="(itemNum, indexNum) in 12" :key="indexNum" class="rule-class">-->
<!--        <div class="num">{{(itemNum-1) * 50}}</div>-->
<!--        <div class="ver-line"></div>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div v-for="n in 1">-->
<!--      <div v-for="n in 12" :key="n" class="line-block-class" :style="{'background': n % 2 == 0 ? '#dddddd' : '#f00', 'width':'100px', 'height':'30px'}">-->

<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <div>
    <div class="demoRuleClass" :style="{'width': 20 * 100+'px'}">
      <div class="demoRuleFixedClass" :style="{'width': 20 * 100+'px', 'left': -scrollLeft+0 + 'px'}">
        <div v-for="(itemNum, indexNum) in 20" :key="indexNum" class="rule-class">
          <div class="num">{{(itemNum-1) * 50}}</div>
          <div class="ver-line"></div>
        </div>
      </div>
      <div class="demoRuleContentClass" :style="{'padding-bottom': paddingMainBottom}">
        <div v-for="(item, index) in 1">
          <div @click="clickDrawer" class="demoRuleChildClass" v-for="n in 20" :style="{'background': n % 2 == 0 ? '#00f' : '#f00', 'width':'100px', 'height':'40px'}">

          </div>
        </div>
        <div style="margin-left: 200px">

        </div>
      </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      custom-class="alert-class"
      width="300px">
      <div slot="title">
        <div class="alertHeader">
          <div class="alertTitle">
            <span>title</span>
          </div>
        </div>
      </div>
      <div class="alertContent">
        <div>这是一段信息</div>
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

    <el-drawer
      title="我是标题"
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
                title
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
        <p v-for="n in 30">{{n}}</p>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        screenOrientation: 'portrait',
        loading: false,
        scrollLeft: 0,
        testStr: 'test str',
        appType: 'app',
        dialogVisible: false,
        dialogHeight: '50%',
        posX: 0,
        posY: 0,
        dis: 1,
        angle: 0,
        drawer: false,
        dialogVisible: false,
        direction: 'btt',
        screenArrow: '',
        paddingBottom: '0px',
        paddingMainBottom: '0px',
        colorData: {
          1: "#aad494",
          2: "#aab6dc",
          3: "#faf5b3",
          4: "#c5acd3",
          5: "#faa5a5",
          6: "#faacc4",
        },
        duiData: [
          {
            duoData: [
              {
                width: "5%",
                right: "0%",
                color: "1",
                content: "爽肤水",
              },
              {
                width: "8%",
                right: "26%",
                color: "2",
                content: "康师傅",
              }, {
                width: "6%",
                right: "75%",
                color: "3",
                content: "电风扇",
              }, {
                width: "6%",
                right: "75%",
                color: "3",
                content: "电风扇",
              }, {
                width: "6%",
                right: "75%",
                color: "3",
                content: "电风扇",
              }
            ],
            faReData: [
              { right: "3%", },
              { right: "36%", },
              { right: "86%", }
            ],
          }
        ],
      }
    },
    mounted() {
      //window.getAppConfig = this.getAppConfig;
      window.addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
    },
    beforeMount() {
      window.addEventListener('orientationchange', (e) => {
        this.screenArrow = this.checkOrient();
      })
    },
    created() {
      if (process.brower){

      }
      //this.screenOrientation = 'landscape';
      //this.dialogHeight = '80%';
      this.appType = this.$route.query.appType;
      this.appType == 'app' ? this.paddingMainBottom = '104px' : this.paddingMainBottom = '0px';
      this.appType == 'app' ? this.paddingBottom = '84px' : this.paddingBottom = '0px';
    },
    methods: {
      checkOrient() {
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
        return this.screenOrientation;
      },
      swipeHandler(e){
        console.log("swipe" + e.direction);
      },
      pinchHandler(evt) {
        console.log(evt.scale);
        console.log('onPinch');
        this.testStr = "pinch tab";
        this.dis = evt.zoom;
      },
      doubleTapHandler(evt) {
        //双击屏幕触发
        console.log('double tab');
        this.testStr = "double tab";
      },
      rotateHandler(evt) {
        //evt.angle代表两个手指旋转的角度
        var rotateImg = document.getElementById("rotateImg");
        //Transform(rotateImg);
        //rotateImg.rotateZ += evt.angle;
        //console.log(evt.angle);
        this.testStr = evt.angle;
        this.angle += evt.angle;
      },
      test(){
        let _self = this;
        this.testStr = "name=" + this.$route.query.name + "&pwd=" + this.$route.query.pwd;
        //alert(this.$route.query.name);
        this.setupWebViewJavascriptBridge(function(bridge) {

          /* Initialize your app here */
          // OC 调用 JS
          // 在 JS 中可以注册让 OC 调用的方法
          bridge.registerHandler('JS Echo', function(data, responseCallback) {
            alert("JS Echo called with:", data)
            responseCallback(data)
          })
          //JS 调用 OC 的方法，方法名就是 OC 中提前注册的方法
          bridge.callHandler('ObjC Echo', {'key':'value'}, function responseCallback(responseData) {
            alert("JS received response:", responseData);
            _self.testStr = responseData;
          });
        })
      },
      okConfirm(){
        this.dialogVisible = true;
      },
      getAppConfig(data) {
        this.testStr = "oc init";
      },
      clickDrawer(){
        this.drawer = true;
      },
      cancelDrawer(){
        this.drawer = false;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleScroll() {
        this.scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
      },
      setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
      }
    }
  }
</script>

<style scoped>
  body,html{
    margin: 0;
    padding: 0px;
  }
  .line-class{
    height: 30px;
    line-height: 30px;
  }
  .line-block-class{
    display: inline-block;
  }
  .demoRule {
    height: 200px;
    white-space: nowrap;
    padding: 0px 0px;
  }
  .demoRuleClass{
    padding: 0px 10px;
    overflow-x: auto;
  }
  .demoRuleFixedClass{
    position: fixed;
    top:0px;
    z-index:1;
    height: 35px;
    background: #ffffff;
    padding:0px 10px;
  }
  .demoRuleContentClass{
    position: relative;
    margin-top: 35px;
  }
  .drawer-bottom .el-drawer__body{
    padding: 0px 20px 0px 20px;
  }
  .demoRuleChildClass{
    display: inline-block;
    width: 100px;
    height: 30px;
  }
  .main {
    height: 95%;
    margin: 0px auto;
    margin-top: 1%;
    padding: 10px;
    border: 1px solid #eaeaea;
    position: relative;
    /*background: white;*/
  }
  .rightBorder {
    position: absolute;
    width: 1.5px;
    height: calc(100% - 20px);
    background: #c3c3c3;
    top: 10px;
    right: calc(2% + 7px);
    z-index: 100;
  }

  .ruleF {
    width: 100%;
    font-size: 12px;
    color: #909399;
  }
  .content {
    overflow: hidden;
    position: relative;
    width: 96%;
    margin-left: 2%;
    height: calc(100% - 30px);
    border-left: 1.5px solid #777777;
    background: #ffffff;
    /*border-right: 1.5px solid #777777;*/
  }
  .faRe {
    z-index: 101;
    position: absolute;
    color: red;
    top: 5px;
  }
  .boxes {
    z-index: 1;
    height: 100%;
    position: absolute;
    top: 0px;
    color: #0a2731;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    font-weight: bold;
  }
  .rule-class {
    width: 100px;
    height: 30px;
    display: inline-block;
  }
  .ver-line{
    height: 12px;
    width: 1px;
    background: #dddddd;
    position: relative;
    bottom: 0px;
  }
  .ruleBody {
    width: 100px;
    height: 30px;
    background-size: 100% 100%;
    /*background: url("static/rule.png");*/
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: inline-block;
  }
  .num {
    position: relative;
    z-index: 100;
    margin-top: 0px;
    color: #bbbbbb;
  }
  .ruler {
    margin: 0px 0px 0px 0px;
    border: solid 1px #ffffff;
    width: 15.125em;
    height: 30px;
    /*box-shadow: 0 0 0 1px #A67336, -0.375em 0.375em 0.5em rgba(51, 51, 51, 0.7);*/
    background-image:
      repeating-linear-gradient(90deg, #825723 0, #825723 0.125em, transparent 0, transparent 2.5em),
      repeating-linear-gradient(90deg, #825723 0, #825723 0.125em, transparent 0, transparent 1.25em),
      repeating-linear-gradient(90deg, #825723 0, #825723 0.125em, transparent 0, transparent 0.25em),
      linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2)),
      radial-gradient(circle at 0% 0%, #ffffff 0%, #ffffff 0%);
    background-position: 1.25em 100%, 1.25em 100%, 1.25em 100%, 0 0, 0 0;
    background-size: 12.625em 1em, 12.625em 0.5em, 12.625em 0.25em, 100% 100%, 100% 100%;
    background-repeat: no-repeat;
    color: #825723;
    font: 12px verdana, sans-serif;
    letter-spacing: 1.775em;
    text-indent: 1em;
  }
  .drawer-bottom{
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .drawer-bottom .el-drawer__header{
    align-items: center;
    color: #72767b;
    display: flex;
    margin-bottom: 0px;
    padding: 0px 0px 0;
  }
  .drawerHeader{
    height: 45px;
    line-height: 45px;
    background: #dddddd;
  }
  .drawerHeaderDiv{
    text-align: center;
  }
  .drawerHeaderBtn{
    text-decoration: none;
    font-size: 12px;
    color: #333333;
  }
  .error-color{
    color: #f56c6c
  }
  .primary-color{
    color: #409eff
  }
  .drawerHeaderContent{

  }
  .alertHeader{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eeeeee;
  }
  .alertTitle{
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    text-align: center;
  }
  .alert-class .el-dialog__header{
    padding: 0px;
  }
  .alert-class .el-dialog__headerbtn{
    top: 12px;
  }
  .alert-class .el-dialog__footer{
    padding: 0px;
  }
  .alertContent{
    text-align: center;
    font-size: 12px;
  }
  .alertFooterClass{
    text-align: center;
    border-top: 1px solid #eeeeee;
  }
  .alertFooterSpan{
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #409eff;
    cursor: default;
  }
  .alertFooterSpanRightBorder{
    border-right: 1px solid #eeeeee;
  }
</style>

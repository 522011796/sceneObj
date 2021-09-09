<template>
    <div>
      <div>
        <div class="layout-main-left" :style="mainStyle" style="position: relative">
          <div class="moon-left-menu-tag">
            <div class="moon-left-menu-tag-container">
              <div class="moon-left-menu-tag_indicator" @click="isCollapse == true ? toggleLeftMenu($event) : toggleRightMenu($event)">
                <i class="fa fa-chevron-left" :class="isCollapse == true ? 'icon-class-left' : 'icon-class-right'"></i>
              </div>
            </div>
          </div>
          <div>
            <div class="layout-menu-header">
              <span v-if="isCollapse == true">{{$t("任务列表")}}</span>
            </div>

            <div :style="menuStyle" ref="menuRef" @scroll="handleDefaultScrollTop">
              <div class="layout-menu-list moon-ellipsis-class" v-for="(item, index) in menuList">
                <div @click="selMenu($event, item, index)" class="moon-ellipsis-class" :class="item.selected == true ? 'menu-active' : ''">
                  <span :class="mainStyle.width == '30px' ? 'index-number-collase-min-class' : 'index-number-collase-max-class'" v-if="isCollapse == false">{{index+1}}</span>
                  <span>
                    <span v-if="isCollapse == true">
                      <img src="~/static/img/light.png" class="layout-menu-icon"/>
                    </span>
                    <span class="layout-menu-title" v-if="isCollapse == true">
                      任务任务任务任务{{index}}
                    </span>
                  </span>
                </div>
              </div>
              <div class="layout-menu-add" v-show="showMenuAdd == false" :style="showMenuAdd == false ? {'height': '40px','line-height': '40px'} : {'height': '0px','line-height': '0px'}">
                <el-button type="warning" size="mini" icon="el-icon-plus">{{$t("添加任务")}}</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="layout-main-right" :style="contentStyle">
          <nuxt ref="childRef"></nuxt>
        </div>
        <div class="clearfix"></div>
      </div>

      <div class="layout-main-footer">
        <div class="layout-main-footer-left" :style="footerLeftStyle">
          <div v-show="showMenuAdd == true">
            <div class="layout-menu-add" :style="showMenuAdd == true ? {'height': '60px','line-height': '60px'} : {'height': '0px','line-height': '0px'}">
              <el-button type="warning" size="mini" icon="el-icon-plus">{{$t("添加任务")}}</el-button>
            </div>
          </div>
        </div>
        <div class="layout-main-footer-right" :style="footerRightStyle">
          <el-button size="mini" plain>{{$t("删除")}}</el-button>
          <el-button size="mini" plain>{{$t("修改")}}</el-button>
          <el-button size="mini" plain>{{$t("复制")}}</el-button>
          <el-button size="mini" plain>{{$t("设备")}}</el-button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
</template>

<script>
    import mixins from "/mixins/mixins";
    export default {
      name: "default",
      mixins: [mixins],
      data(){
        return {
          menuToggle: true,
          isCollapse: true,
          scrollTop: 0,
          screenOrientation: 'portrait',
          appType: 'app',
          paddingBottom: '0px',
          paddingMainBottom: '0px',
          dialogHeight: '50%',
          menuList: [],
          showMenuAdd: false,
          contentStyle:{
            'height': '0px',
            'overflow-y': 'auto',
            'margin-left': '100px'
          },
          mainStyle: {
            'width': '100px'
          },
          menuStyle: {
            'height': '0px',
            'overflow-y': 'auto',
          },
          footerLeftStyle:{
            'height': '0px',
            'width': '100px',
          },
          footerRightStyle:{
            'height': '0px',
            'margin-left': '100px'
          }
        }
      },
      mounted() {
       //window.addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
        // 监听窗口大小
        window.onresize = () => {
          this.checkOrient();
        };
        this.initMenu();
      },
      beforeMount() {
        window.addEventListener('orientationchange', (e) => {
          this.checkOrient();
        })
      },
      destroyed() {
        //window.removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
      },
      created() {
        this.checkOrient();
      },
      methods:{
        hh(){
          if (process.browser) {
            let screenWidth = window.innerWidth;
            this.contentStyle.height = window.innerHeight-60 + 'px';
            this.appType = this.$route.query.appType;
            if (this.appType == 'app'){
              if (screenWidth < 550){
                this.mainStyle.width = this.isCollapse == false ? '30px' : '100px';
                this.footerLeftStyle.width = '100px';
                this.contentStyle["margin-left"] = this.isCollapse == false ? '30px' : '105px';
                this.footerRightStyle["margin-left"] = '105px';
              }else{
                this.mainStyle.width = this.isCollapse == false ? '8%' : '15%';
                this.footerLeftStyle.width = '15%';
                this.contentStyle["margin-left"] = this.isCollapse == false ? '8.5%' :'15.5%';
                this.footerRightStyle["margin-left"] = '15.5%';
              }
            }else {
              if (screenWidth < 550){
                this.mainStyle.width = this.isCollapse == false ? '30px' : '100px';
                this.footerLeftStyle.width = '100px';
                this.contentStyle["margin-left"] = this.isCollapse == false ? '30px' : '105px';
                this.footerRightStyle["margin-left"] = '105px';
              }else{
                console.log(this.isCollapse);
                this.mainStyle.width = this.isCollapse == false ? '8%' : '15%';
                this.footerLeftStyle.width = '15%';
                this.contentStyle["margin-left"] = this.isCollapse == false ? '8.5%' :'15.5%';
                this.footerRightStyle["margin-left"] = '15.5%';
              }
            }
            this.menuStyle.height = window.innerHeight-40-60 + 'px';
          }
        },
        initMenu(){
          this.menuList = [];
          for (let i = 0; i < 3; i++){
            this.menuList.push({
              selected: false,
              name: i
            });
          }
          this.setMenuAdd();
          //this.handleDefaultScrollTop();
        },
        setMenuAdd(){
          let menuListCount = this.menuList.length;
          if (process.browser) {
            let menuHeight = window.innerHeight - 60 - 40;
            this.showMenuAdd = false;
            if (menuListCount * 40 + 40 >= menuHeight){
              this.showMenuAdd = true;
            }
          }
        },
        toggleLeftMenu(event){
          this.showMenuAdd = true;
          this.isCollapse = false;
          this.menuToggle = false;
          this.contentStyle["margin-left"] = "0px";
          this.mainStyle.width = "0px";
          //this.toggleTag['left'] = "0px";
          this.hh();
        },
        toggleRightMenu(event){
          //this.showMenuAdd = false;
          this.isCollapse = true;
          this.menuToggle = true;
          this.contentStyle["margin-left"] = "100px";
          this.mainStyle.width = "100px";
          //this.toggleTag['left'] = "220px";
          this.hh();
          this.setMenuAdd();
        },
        selMenu(event, item, index){
          for (let i = 0; i < this.menuList.length; i++){
            this.menuList[i].selected = false;
            if (i == index) {
              this.menuList[i].selected = true;
            }
          }
          console.log(this.menuList);
        },
        checkOrient() {
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
            this.hh();
            return this.screenOrientation;
          }
        },
        handleDefaultScrollTop(){
          this.changeFlag(false);
          if (!this.minxinsScroll) {
            this.$refs.childRef.$children[0].$refs.wrapper.scrollTop = this.$refs.menuRef.scrollTop;
          }
        }
      }
    }
</script>

<style scoped>
.layout-main-left{
  background: #595959;
  float: left;
  width: 100px;
  border-right: 1px solid #454545;
  box-shadow: 2px 0px 4px #454545;
  position: relative;
  background-image: linear-gradient(to bottom, #555555 , #555555);
  position: relative;
  transition: all .2s ease-in-out;
  user-select: none;
}
.layout-main-right{
  background: #595959;
  margin-left: 105px;
  position: relative;
}
.layout-main-footer-left{
  float: left;
  width: 100px;
}
.layout-main-footer-right{
  margin-left: 105px;
}
.layout-main-footer{
  height: 60px;
  line-height: 60px;
  background: #454545;
  text-align: right;
  padding: 0px 25px 0px 0px;
}
.layout-menu-header{
  color: #cccccc;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.layout-menu-list{
  color: #999999;
  text-align: center;
  height: 40px;
  line-height: 40px;
  padding: 0px 5px;
  font-size: 12px;
  margin-bottom: 10px;
  position: relative;
}
.layout-menu-icon{
  width: 18px;
  height: 18px;
  position: relative;
  top: 5px;
}
.layout-menu-title{
  position: relative;
  top: 0px;
}
.layout-menu-add{
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.moon-left-menu-tag{
  position: absolute;
  top: 0;
  bottom: 0;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  right: -15px;
  transition: all .2s ease-in-out;
  z-index: 99;
}
.moon-left-menu-tag .moon-left-menu-tag-container {
  width: 100%;
  height: 100%;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
}
.moon-left-menu-tag .moon-left-menu-tag_indicator {
  margin-top: -44.5px;
  width: 100%;
  height: 30px;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #454545;
  border-radius: 0 4px 4px 0;
  border: 1px solid #454545;
  border-left-color: transparent;
  opacity: 0.85;
  /*transition-property: background-color,opacity;*/
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
  color: #dddddd;
  padding-right: 2px;
}
.moon-left-menu-tag_indicator:hover{
  background-color: #454545;
  color: #FFFFFF;
}
.icon-class-left{
  color: #dddddd;
  transform: rotate(0deg);
}
.icon-class-right{
  transform: rotate(180deg);
}
.index-number-class{
  padding: 0px 4px;
  background: #353535;
  position: absolute;
  left: 0px;
  font-size: 12px;
}
.index-number-collase-max-class{
  padding: 5px 8px;
  background: #353535;
  font-size: 12px;
}
.index-number-collase-min-class{
  padding: 5px 4px;
  background: #353535;
  font-size: 12px;
}
.menu-active{
  background: #825723;
}
.menu-active span{
  background: #825723;
}
</style>

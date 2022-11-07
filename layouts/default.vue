<template>
    <div class="default-block-class">

    </div>
</template>

<script>
import {MessageCommonTips, MessageSuccess, MessageWarning, planType} from "../utils/utils";
    import mixins from "../mixins/mixins";
    export default {
      name: "default",
      mixins: [mixins],
      data(){
        return {

        }
      },
      mounted() {

      },
      beforeMount() {

      },
      destroyed() {
        //window.removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
      },
      created() {

      },
      methods:{

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
  padding: 0px 20px 0px 0px;
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
  z-index: 9;
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
.checkedICon{
  font-size: 14px;
  position: relative;
  top: -5px;
  padding: 0px 0px;
  width: 20px;
  height: 20px;
  display: inline-block;
  text-align: center;
}
.block-plane{
  padding: 0px;
  border-radius: 5px;
  border: 1px solid #dddddd;
}
</style>

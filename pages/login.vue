<template>
  <div>
    <div class="login-logo">
      <img :src="logo" style="height: 60px; width: 60px;">
    </div>
    <div class="login-title">
      {{ name }}
    </div>
    <div class="login-main padding-lf15">
      <el-form ref="form" :model="form" label-width="0px" class="marginTop10">
        <el-form-item class="textCenter">
          <el-input v-model="form.username" style="width: 90%" placeholder="请输入账号/手机号">
            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
          </el-input>
        </el-form-item>
        <el-form-item class="textCenter">
          <el-input v-model="form.password" type="password" style="width: 90%" placeholder="请输入密码">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item v-show="imageCodeAuth == true" class="textCenter">
          <el-input v-model="form.imageCode" style="width: 90%" placeholder="请输入验证码">
            <i slot="prefix" class="el-input__icon el-icon-picture-outline-round"></i>
            <template slot="append">
              <img :src="imageCode" style="height: 30px;width: 80px" @click="getImageCode">
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="textCenter marginTop10">
        <el-button type="success" size="large" :loading="loading" style="width: 90%" @click="isNeedImageCode">{{$t("登录")}}</el-button>
      </div>
    </div>

    <el-drawer
      custom-class="drawer-sub-list"
      :show-close="true"
      :with-header="false"
      :modal="checked"
      :size="dialogSize"
      :wrapperClosable="false"
      :visible.sync="drawerTipsVisible"
      :direction="direction">
      <div class="marginTop10" style="color:#535353;width: 90%;margin:0 auto;">
        <div>
          <div style="margin-top: 20%">
            <span class="font-size-15 fontBold">亲爱的用户：</span>
          </div>
          <div class="marginTop20">
            <span class="font-size-15">请确认你有{{name}}账号，并成功添加以配置已配置过的设备。</span>
          </div>
          <div class="marginTop5">
            <span class="font-size-15">在使用过程中，我们会严格保护的你的个人信息，以确保不会泄漏</span>
          </div>
        </div>

        <div style="position: absolute;bottom: 20px;width: 100%;left: 0px;">
          <div style="width: 100%;" class="padding-lf20">
            <el-checkbox v-model="checked">
              <span class="color-disabled font-size-12">已在APP中添加支持的设备</span>
            </el-checkbox>
          </div>
          <div class="textCenter marginTop10 padding-lf20">
            <el-button type="success" size="large" :loading="loading" style="width: 100%" @click="gotoLogin">{{$t("前往登录")}}</el-button>
          </div>
        </div>
      </div>
    </el-drawer>

    <el-drawer
      title="场景设置"
      custom-class="drawer-sub-list"
      :show-close="true"
      :modal="true"
      :size="dialogSize"
      :wrapperClosable="false"
      :visible.sync="drawerVisible"
      :direction="direction">

      <div slot="title">
        <div class="block-list-sub-header">
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
          <div v-for="(item, index) in envListData" :key="index" class="block-list-content-item marginBottom10" @click="selEnv($event, item)">
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
  </div>
</template>

<script>
import {
  MessageSuccess,
  MessageWarning,
  MessageError, MessageCommonTips
} from "../utils/utils";
import {common, commonConfig} from "../utils/api/url";
export default {
  layout: 'defaultFull',
  components: { },
  data(){
    return {
      cb: '',
      checkNum: 0,
      restaurants: [],
      restaurantsTemp: [],
      loading: false,
      drawerVisible: false,
      drawerTipsVisible: true,
      checked: false,
      direction: 'rtl',
      dialogSize: '100%',
      sessionId: '',
      userKey: '',
      imageCodeAuth: false,
      imageCode: '',
      envListData: [],
      redirect_uri: '',
      client_id: '',
      state: '',
      userid:'',
      platform: '',
      manufacturer: '',
      logo: '',
      domain: '',
      name: '',
      form:{
        username: '',
        password: '',
        imageCode: '',
        url: ''
      }
    }
  },
  created() {
    if (process.client){
      this.redirect_uri = this.$route.query.redirect_uri;
      this.client_id = this.$route.query.client_id;
      this.state = this.$route.query.state;
      this.manufacturer = this.$route.query.manufacturer;

      this.initInfo();
    }
  },
  methods:{
    async initInfo(){
      await this.getManufacturer();
      if (!this.redirect_uri){
        this.getStateCode();
      }
      this.getImageCode();
    },
    async getManufacturer(){
      await this.$axios.get('/json/manufacturer.json').then(res => {
        if (!this.manufacturer) {
          this.manufacturer = res.data.default;
        }
        let manufacturerList = res.data['manufacturer-list'];
        for (let item in manufacturerList) {
          if (item == this.manufacturer){
            var dataList = manufacturerList[item];
            this.name = dataList.name;
            this.logo = dataList.logo;
            this.domain = dataList.domain;
            this.manufacturer = dataList.manufacturer;
          }
        }
      })
    },
    getStateCode(){
      let params = {
        state: this.state
      };
      params = this.$qs.stringify(params);
      this.$axios.post(this.domain+'/auth/decodeState', params,{loading: false}).then(res => {
        if (res.data.code == 200){
          this.userid = res.data.data.userid;
          this.platform = res.data.data.platform;
        }
      });
    },
    getImageCode(){
      this.imageCode = this.domain + common.sendImageCode + "?radom=" + Math.random();
      //return commonConfig.baseUrl + common.sendImageCode + "?radom=" + Math.random();
    },
    async isNeedImageCode(){
      if (this.form.username == "" || this.form.password == ""){
        MessageCommonTips(this, this.$t("请输入账号信息！"), 'warning');
        return;
      }
      let params = {
        opType: 5
      };
      this.loading = true;
      this.imageCodeAuth = false;
      await this.$axios.get(this.domain + common.isNeedImageCode, {params: params, loading: false}).then(res => {
        if (res.data.code == 200){
          //console.log(res.data.data.imageCode);
          if (res.data.data.imageCode == false){
            this.imageCodeAuth = res.data.data.imageCode;
            this.loginType();
          }else {
            this.imageCodeAuth = res.data.data.imageCode;
            this.loginType();
          }
        }else {
          MessageCommonTips(this, res.data.msg, 'error');
        }
        this.loading = false;
      });
    },
    loginType(){
      if (this.imageCodeAuth == false){
        let paramsLogin = {
          username: this.form.username,
          password: this.form.password,
          manufacturer: this.manufacturer,
          needMqtt: false
        };
        this.login(paramsLogin);
      }else {
        if (this.form.imageCode != ""){
          let paramsLogin = {
            username: this.form.username,
            password: this.form.password,
            imageCode: this.form.imageCode,
            manufacturer: this.manufacturer,
            needMqtt: false
          };
          this.login(paramsLogin);
        }else {
          MessageCommonTips(this, this.$t("请输入验证码！"), 'warning');
        }
      }
    },
    login(params){
      params = this.$qs.stringify(params);
      this.loading = true;
      this.$axios.post(this.domain + common.login, params, {loading: false}).then(res => {
        if (res.data.code == 200){
          this.sessionId = res.data.data.sessionId;
          this.userKey = res.data.data.userInfo.userKey;
          this.envList();

          //验证权限
          let authorities = res.data.data.userInfo.authorities;
          localStorage.removeItem("accountRole");
          for (let i = 0; i < authorities.length; i++){
            if (authorities[i].authority == 'ROLE_ADMIN'){
              localStorage.setItem("accountRole", 'ROLE_ADMIN');
            }
          }

          if (this.restaurants.length == 0){
            this.restaurants.push({
              value: this.form.username,
              password: this.form.password
            });
            localStorage.setItem("account", JSON.stringify(this.restaurants));
          }else {
            if (this.restaurantsTemp.indexOf(this.form.username) == -1){
              this.restaurants.push({
                value: this.form.username,
                password: this.form.password
              });
            }
            localStorage.setItem("account", JSON.stringify(this.restaurants));
          }
        }else {
          MessageCommonTips(this, res.data.msg, 'error');
          this.getImageCode();
        }
        this.loading = false;
      });
    },
    envList(){
      let params = {

      };
      this.$axios.get(this.domain + common.envList, {params: params,sessionId: this.sessionId, userKey: this.userKey}).then(res => {
        if (res.data.code == 200){
          this.envListData = res.data.data;
          this.drawerVisible = true;
        }else {
          MessageCommonTips(this, res.data.msg, 'error');
        }
      });
    },
    selEnv(event, item){
      localStorage.setItem("envKey", item.envKey);
      localStorage.setItem("sessionId", this.sessionId);
      localStorage.setItem("userKey", this.userKey);

      let url = common.generalAuthorizeCode;

      let params = {
        redirect_uri: this.redirect_uri,
        env_key: item.envKey,
        client_id: this.client_id
      };

      if (!this.redirect_uri){
        params = {
          env_key: item.envKey,
          userid: this.userid,
          platform: this.platform
        };
        url = common.saveSession;
      }

      params = this.$qs.stringify(params);
      this.$axios.post(commonConfig.baseUrl + url, params, {loading: false}).then(res => {
        if (res.data.code == 200) {
          let url = "";

          if (!this.redirect_uri){
            window.location.href="linglong://open?openAuthResult=1";
          }else {
            if (this.redirect_uri.indexOf("?") > -1){
              url = this.redirect_uri + "&code=" + res.data.data.code + "&state=" + this.state;
            }else{
              url = this.redirect_uri + "?code=" + res.data.data.code + "&state=" + this.state;
            }
            window.location.href = url;
          }
        } else {
          MessageCommonTips(this, res.data.msg, 'error');
        }
        this.loading = false;
      });
    },
    querySearch(queryString, cb) {
      this.cb = cb;
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString) === 0);
      };
    },
    gotoLogin(){
      if (!this.checked){
        MessageWarning("请确认已经添加支持的设备");
        return;
      }
      this.drawerTipsVisible = false;
    },
    handleSelect(item) {
      this.form.username = item.value;
      this.form.password = item.password;
    },
    removeAccount(event, item){
      for (let i = 0; i < this.restaurants.length; i++){
        //console.log(item.value ,this.restaurants[i].value);
        if (item.value == this.restaurants[i].value){

          this.restaurants.splice(i, 1);
        }
      }
      localStorage.setItem("account", JSON.stringify(this.restaurants));
      this.querySearch('', this.cb);
    }
  }
}
</script>

<style scoped>
.login-logo{
  margin-top: 25%;
  text-align: center;
}
.login-title{
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #535353;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
}
.login-main{
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px;
}
.block-list-content-item:hover{
  box-shadow: 1px 1px 2px #000000;
}
</style>

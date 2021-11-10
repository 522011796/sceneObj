<script>
import {common, commonConfig} from "../utils/api/url";
import {MessageError, MessageWarning, orderValue} from "../utils/utils";

    export default {
      name: "mixins",
      data(){
        return {
          minxinsScroll: false,
          baseUrl: '',
          envKey: '',
          sessionId: '',
          appType: '',
          dataDeviceList: [],
          globalRoomList: [],
          globalLightGroupList: [],
          globalCurtainsGroupList: [],
          globalRoomObj: {},
          globalEnvList: []
        }
      },
      created() {
        this.getUrl();
        this.getRoomList();
        this.getCurtainsGroupList();
        this.getLightGroupList();
      },
      methods: {
        logout(){
          this.$axios.get(this.baseUrl + common.logout, {sessionId: this.sessionId}).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/login");
            }
          });
        },
        orderGetAndSet(value, type){
          return orderValue(type, value);
        },
        changeFlag(flag) {
          this.minxinsScroll = flag;
        },
        getUrl(){
          this.baseUrl = commonConfig.baseUrl;
          this.envKey = this.$route.query.envKey;
          this.sessionId = this.$route.query.sessionId;
          this.appType = this.$route.query.appType;
        },
        getRoomList(){
          let params = {
            envKey: this.envKey,
            pageNum: 1,
            pageSize: 99999
          };
          this.globalRoomObj = {};
          this.$axios.get(this.baseUrl + common.roomList, {params: params, sessionId: this.sessionId}).then(res => {
            if (res.data.code == 200) {
              this.globalRoomList = res.data.data;
              for (let i = 0; i < this.globalRoomList.length; i++){
                this.globalRoomObj[this.globalRoomList[i].id] = this.globalRoomList[i].name;
              }
            }
          });
        },
        getGlobalRoomObj(val){
          return this.globalRoomObj[val];
        },
        getLightGroupList(){
          let params = {
            envKey: this.envKey,
            pageNum: 1,
            pageSize: 99999
          };
          this.$axios.get(this.baseUrl + common.lightGrouplist, {params: params, sessionId: this.sessionId}).then(res => {
            if (res.data.code == 200) {
              console.log("lightgroup", res.data.data);
              this.globalLightGroupList = res.data.data;
            }
          });
        },
        getCurtainsGroupList(){
          let params = {
            envKey: this.envKey,
            pageNum: 1,
            pageSize: 99999
          };
          this.$axios.get(this.baseUrl + common.curtainsGrouplist, {params: params, sessionId: this.sessionId}).then(res => {
            if (res.data.code == 200) {
              this.globalCurtainsGroupList = res.data.data;
            }
          });
        },
        getDeviceList(type){
          let data = [];
          let params = {
            envKey: this.envKey,
            pageNum: 1,
            pageSize: 99999
          };
          this.$axios.get(this.baseUrl + common.deviceList, {params: params, sessionId: this.sessionId}).then(res => {
            if (res.data.code == 200) {
              let list = res.data.data.list;
              //console.log("device",list);
              let listArr = [];
              //type不为空，过滤掉非type设备
              if (type || type === 0){
                for (let i =0; i < list.length; i++){
                  if (list[i].devType === type){
                    listArr.push(list[i]);
                  }
                }
                list = listArr;
              }
              let subGroupArr = [];
              let subRoomArr = [];
              let roomArr = [];
              let roomChild = [];
              let att = [];
              //将分组的字段单独保存到数组中
              list.map((e) => {
                if (e['subgroup']) {
                  subGroupArr.push(e['subgroup']);
                }
                roomArr.push(e['room']);
              });
              //数组去重
              subGroupArr = subGroupArr.filter((e, i, self) => {
                return self.indexOf(e) == i
              });
              roomArr = roomArr.filter((e, i, self) => {
                return self.indexOf(e) == i
              });
              for (let j = 0; j < roomArr.length; j++) {
                //过滤出匹配到的数据
                let arr = list.filter((e) => {
                  e['label'] = e.name;
                  return e.room == roomArr[j];
                });

                let room = arr[0].room;
                let roomName = "";
                //匹配房间名称
                this.globalRoomList.filter(function (item, index) {
                  if (item.id == room){
                    roomName = item.name;
                  }
                });
                if (room == 0){
                  roomName = this.$t("全屋");
                }

                att.push({
                  type: 'room',
                  label: roomName,
                  room: room,
                  children: []
                });

                let arrTemp;
                for(let i = 0;i < arr.length;i++) {
                  //过滤出匹配到的数据
                  if (arr[i].subgroup != null){
                    arrTemp = arr.filter((e) => {
                      let subGroupName = "";
                      //匹配设备组名称
                      if (e.devType == 1){
                        this.globalLightGroupList.filter(function (item, index) {
                          if (item.id == e.subgroup){
                            subGroupName = item.name;
                          }
                        });
                      }else if (e.devType == 3){
                        this.globalCurtainsGroupList.filter(function (item, index) {
                          if (item.id == e.subgroup){
                            subGroupName = item.name;
                          }
                        });
                      }

                      e['label'] = subGroupName;
                      e['subGroupName'] = subGroupName;
                      e['devType'] = e.devType,
                      e['type'] = 'device';
                      return e.subgroup == arr[i].subgroup;
                    });

                    let child = {
                      type: 'subGroup',
                      label: arrTemp[0].subGroupName,
                      subGroup: arrTemp[0].subgroup,
                      children: arrTemp
                    };

                    att[j]['children'].push(child);
                  }else {
                    let child = {
                      type: 'device',
                      label: arr[i].name,
                      sn: arr[i].sn,
                      devType: arr[i].devType,
                      subGroup: arr[i].subgroup
                    };

                    att[j]['children'].push(child);
                  }
                }
              }
              console.log(111,att);
              this.dataDeviceList = att;
            }
          });
        },
        getEnvList(){
          let params = {

          };
          this.$axios.get(commonConfig.baseUrl + common.envList, {params: params,sessionId: this.sessionId}).then(res => {
            if (res.data.code == 200){
              this.globalEnvList = res.data.data;
            }
          });
        },
        compareArray(a, b) {
          if (a.length !== b.length) {
            return false;
          }
          const length = a.length;
          for (let i = 0; i < length; i++) {
            if (!this.compare(a[i], b[i])) {
              return false;
            }
          }
          return true;
        },
        compareObject(a, b) {
          const keya = Object.keys(a);
          const keyb = Object.keys(b);

          if (keya.length !== keyb.length) {
            return false;
          }

          return keya.every(key => {
            if (!this.compare(a[key], b[key])) {
              return false;
            }
            return true;
          });
        },
        compare(a, b) {
          if (a === b) {
            return true;
          }

          if (typeof a !== typeof b || a === null || b === null) {
            return false;
          }

          if (Array.isArray(a)) {
            if (!Array.isArray(b)) {
              return false;
            }
            return this.compareArray(a, b);
          }

          if (typeof a === "object") {
            return this.compareObject(a, b);
          }

          return false;
        }
      }
    }
</script>

<style scoped>

</style>

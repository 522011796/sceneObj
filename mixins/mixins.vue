<script>
    import {common} from "../utils/api/url";
    import {MessageWarning, orderValue} from "../utils/utils";

    export default {
      name: "mixins",
      data(){
        return {
          minxinsScroll: false,
          baseUrl: '',
          envKey: '',
          sessionId: '',
          dataDeviceList: [],
          globalRoomList: [],
          globalLightGroupList: [],
          globalCurtainsGroupList: [],
        }
      },
      created() {
        this.getUrl();
        this.getRoomList();
        this.getCurtainsGroupList();
        this.getLightGroupList();
      },
      methods: {
        orderGetAndSet(value, type){
          return orderValue(type, value);
        },
        changeFlag(flag) {
          this.minxinsScroll = flag;
        },
        getUrl(){
          this.baseUrl = this.$route.query.url;
          this.envKey = this.$route.query.envKey;
          this.sessionId = this.$route.query.sessionId;
        },
        getRoomList(){
          let params = {
            envKey: this.envKey,
            pageNum: 1,
            pageSize: 99999
          };
          this.$axios.get(this.baseUrl + common.roomList, {params: params, sessionId: this.sessionId}).then(res => {
            if (res.data.code == 200) {
              this.globalRoomList = res.data.data;
            }
          });
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
              console.log("device",list);
              let listArr = [];
              //type不为空，过滤掉非type设备
              // if (type || type === 0){
              //   for (let i =0; i < list.length; i++){
              //     if (list[i].devType === type){
              //       listArr.push(list[i]);
              //     }
              //   }
              //   list = listArr;
              // }
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
        }
      }
    }
</script>

<style scoped>

</style>

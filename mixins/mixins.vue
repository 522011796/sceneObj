<script>
    import {common} from "../utils/api/url";

    export default {
      name: "mixins",
      data(){
        return {
          minxinsScroll: false,
          baseUrl: '',
          envKey: '',
          sessionId: '',
          dataDeviceList: []
        }
      },
      created() {
        this.getUrl();
      },
      methods: {
        changeFlag(flag) {
          this.minxinsScroll = flag;
        },
        getUrl(){
          this.baseUrl = this.$route.query.url;
          this.envKey = this.$route.query.envKey;
          this.sessionId = this.$route.query.sessionId;
        },
        getDeviceList(){
          let data = [];
          let params = {
            envKey: this.envKey,
            pageNum: 1,
            pageSize: 99999
          };
          this.$axios.get(this.baseUrl + common.deviceList, {params: params, sessionId: this.sessionId}).then(res => {
            if (res.data.code == 200) {
              let list = res.data.data.list;
              let subGroupArr = [];
              let subRoomArr = [];
              let roomArr = [];
              let roomChild = [];
              let att = [];
              //将分组的字段单独保存到数组中
              list.map((e) => {
                if (e['subGroup']) {
                  subGroupArr.push(e['subGroup']);
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
                att.push({
                  type: 'room',
                  label: this.$t("房间") + room,
                  room: room,
                  children: []
                });

                let arrTemp;
                for(let i = 0;i < arr.length;i++) {
                  //过滤出匹配到的数据
                  if (arr[i].subGroup != null){
                    arrTemp = arr.filter((e) => {
                      e['label'] = e.name;
                      return e.subGroup == arr[i].subGroup;
                    });

                    let child = {
                      type: 'subGroup',
                      label: this.$t("设备组") + arrTemp[0].subGroup,
                      subGroup: arrTemp[0].subGroup,
                      children: arrTemp
                    };

                    att[j]['children'].push(child);
                  }else {
                    let child = {
                      type: 'subGroup',
                      label: arr[i].name,
                      subGroup: arr[i].subGroup
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
        getDeviceListBak(){
          let data = [];
          let params = {
            envKey: this.envKey,
            pageNum: 1,
            pageSize: 99999
          };
          this.$axios.get(this.baseUrl + common.deviceList, {params: params, sessionId: this.sessionId}).then(res => {
            if (res.data.code == 200) {
              let list = res.data.data.list;
              let subGroupArr = [];
              let subRoomArr = [];
              let roomArr = [];
              let roomChild = [];
              let att = [];
              //将分组的字段单独保存到数组中
              list.map((e)=>{
                if (e['subGroup']){
                  subGroupArr.push(e['subGroup']);
                }
                if (!e['subGroup']){
                  roomArr.push(e['room'])
                }
              });
              //数组去重
              subGroupArr = subGroupArr.filter((e,i,self)=>{
                return self.indexOf(e) == i
              });
              roomArr = roomArr.filter((e,i,self)=>{
                return self.indexOf(e) == i
              });

              for(let j = 0;j < subGroupArr.length;j++){
                //过滤出匹配到的数据
                let arr = list.filter((e)=>{
                  e['label'] = e.name;
                  return e.subGroup == subGroupArr[j];
                });

                let subGroup = arr[0].subGroup;
                att.push({
                  type: 'subGroup',
                  label: this.$t("设备组") + subGroup,
                  subGroup: subGroup,
                  children: []
                });

                for(let i = 0;i < arr.length;i++) {
                  //过滤出匹配到的数据
                  let arrTemp = arr.filter((e) => {
                    e['label'] = e.name;
                    return e.room == arr[i].room;
                  });

                  let child = {
                    type: 'roomGroup',
                    label: this.$t("房间") + arrTemp[0].room,
                    room: arrTemp[0].room,
                    children: arrTemp
                  };

                  att[j]['children'].push(child);
                }
              }

              for(let j = 0;j < roomArr.length;j++){
                //过滤出匹配到的数据
                let arr = list.filter((e)=>{
                  if (!e.subGroup){
                    e['label'] = e.name;
                    return e.room == roomArr[j];
                  }
                });
                let room = arr[0].room;
                att.push({
                  type: 'room',
                  label: this.$t("房间") + room,
                  room: room,
                  children: arr
                });
              }
              this.dataDeviceList = att;
            }
          });
        }
      }
    }
</script>

<style scoped>

</style>

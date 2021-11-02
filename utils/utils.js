import { Message } from 'element-ui'

export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

export function MessageError(text = '失败',) {
  Message({
    message: text,
    type: 'error',
    duration: 3 * 1000
  })
}
export function MessageInfo(text = '消息') {
  Message({
    message: text,
    type: 'info',
    duration: 3 * 1000
  })
}
export function MessageSuccess(text = '成功') {
  Message({
    message: text,
    type: 'success',
    duration: 3 * 1000
  })
}

export function MessageWarning(text = '警告') {
  Message({
    message: text,
    type: 'warning',
    duration: 3 * 1000
  })
}

export function getLength (str) {
  var realLength = 0, len = str.length, charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128)
      realLength += 1;
    else
      realLength += 2;
  }
  return realLength;
}

export function clearData (data, isSerialize) {
  if (data) {
    if (isSerialize) {
      var newData = {};
      for (var i = 0, length = data.length; i < length; i++) {
        if (trim(data[i].value) != '' && trim(data[i].value) != 'null') {
          newData[data[i].name] = $.trim(data[i].value);
        }
      }
      return newData;
    } else {
      for (var key in data) {
        if (data[key] === '' || data[key] == 'null' || data[key] == null) {
          delete data[key];
        }
      };
      return data;
    }
  }
}

export function trim (str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

export function outTypeObj(type){
  //外部指令类型type对比
  let typeOutObj = {
    1 : 6,
    2 : 7,
    3 : 8,
    4 : 9,
    5 : 4,
    6 : 2,
    7 : 3,
    8 : 5,
    9 : 1,
    10 : 10,
    11 : 11,
    12 : 12,
    13 : 13,
    14 : 14,
    15 : 15,
    16 : 16,
    17 : 17,
  };
  return typeOutObj[type];
}

export function orderValue(type, str){
  let orderValue = {
    "1": "空闲指令",
    "2": "延时指令",
    "3": "循环指令",
    "4": "场景嵌套调⽤",
    "5": "电源控制",
    "6": "开/关灯控制",
    "7": "亮度控制",
    "8": "色温控制",
    "9": "色彩控制",
    "10": "行程控制",
    "11": "按键控制",
    "12":"音量量控制",
    "13":"播放控制",
    "14":"暂停控制",
    "15":"时间跳转控制",
    "16":"点状灯效",
    "17":"线状灯效"
  };
  if (str && type == 'set') {
    return orderValue[str];
  }
  if (!str && type == 'get'){
    return orderValue;
  }
}

export function planType(type, str){
  let planType = {
    "0": "场景",
    "1": "灯",
    "2": "开关",
    "3": "窗帘⽤用",
    "4": "音乐"
  };
  if (str && type == 'set') {
    return planType[str];
  }
  if (!str && type == 'get'){
    return planType;
  }
}

export function keyType(type){
  let keyType = {
    "1": "按下",
    "0": "释放"
  };
  console.log(type);
  return keyType[type];
}

export function inArray(search,array,tag){
  for(var i in array){
    if (tag){
      if(array[i][tag] == search[tag]){
        return i;
      }
    }else {
      if(array[i] == search){
        return i;
      }
    }
  }
  return -1;
}

export function paddingChecked(src,des,tag,desTag){
  for (let j = 0; j < src.length; j++){
    if (src[j] == des[tag]){
      des[desTag] = true;
    }
  }
}

export function secondsFormat(min) {
  if(min || min == 0){
    var seconds = min * 60;
    var day = Math.floor( seconds/ (24*3600) ); // Math.floor()向下取整
    var hour = Math.floor( (seconds - day*24*3600) / 3600);
    var minute = Math.floor( (seconds - day*24*3600 - hour*3600) /60 );
    var second = seconds - day*24*3600 - hour*3600 - minute*60;
    return day + "天"  + hour + "时" + minute + "分" + second + "秒";
  }else{
    return '--';
  }
}

export function decodeUTF8(str){
  if(str){
    return decodeURIComponent(str);
  }else {
    return '';
  }
}

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

export function courseProperties(type, str){
  let courseProperties = {
    "1": "必修",
    "2": "限选",
    "3": "任选",
    "4": "辅修",
    "5": "实践",
    "6": "双必",
    "7": "双选",
    "8": "通选",
    "9": "其他"
  };
  if (str && type == 'set') {
    return courseProperties[str];
  }
  if (!str && type == 'get'){
    return courseProperties;
  }
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

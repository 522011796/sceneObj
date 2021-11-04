/**
 * 公共接口地址
 * @type {{session_url: string}}
 */
export const common = {
  login_url: 'proxy/user/login', //登录
  senceList: '/scene/querySceneList',//场所列表
  deviceList: '/device/getDevicePageByEnvKey',//设备列表
  roomList: '/device/getRoomInfoList',//房间列表
  lightGrouplist: '/device/getLightSubgroupInfoList',//灯组列表
  curtainsGrouplist: '/device/getCurtainSubgroupInfoList',//窗帘组列表
};

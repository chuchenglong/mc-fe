import Vue from 'vue'

const post = (uri, params) => {
  const u = '/api' + uri
  const p = Vue.prototype.$http.handleParams(params)
  return Vue.prototype.$http.post(u, p)
}

export default {
  loginIn: params => post('/login/in', params),
  loginOut: params => post('/login/out', params),

  getVerificationCode: params => post('/user/getVerificationCode', params),
  checkVerificationCode: params => post('/user/checkVerificationCode', params),
  register: params => post('/user/register', params),
  getHomeData: params => post('/user/getHomeData', params),
  getUserDetail: params => post('/user/getUserDetail', params),
  userUpdate: params => post('/user/update', params),
  updatePassword: params => post('/user/updatePassword', params),
  getUserPageList: params => post('/user/getUserPageList', params),



  getCertType: params => post('/selector/getCertType', params),
  getRace: params => post('/selector/getRace', params),
  getNationality: params => post('/selector/getNationality', params),
  getGender: params => post('/selector/getGender', params),
  getMarital: params => post('/selector/getMarital', params),
  getWhiteType: params => post('/selector/getWhiteType', params),
  getConfigType: params => post('/selector/getConfigType', params),
  getBizType: params => post('/selector/getBizType', params),
  getConfigMark: params => post('/selector/getConfigMark', params),
  getConfigStatus: params => post('/selector/getConfigStatus', params),
  getServerType: params => post('/selector/getServerType', params),
  getServerMark: params => post('/selector/getServerMark', params),
  getServerStatus: params => post('/selector/getServerStatus', params),
  getUserStatus: params => post('/selector/getUserStatus', params),
  getOptStatus: params => post('/selector/getOptStatus', params),

  getWhiteList: params => post('/white/list', params),
  addWhiteList: params => post('/white/add', params),
  deleteWhiteList: params => post('/white/delete', params),

  getConfigList: params => post('/config/list', params),
  addConfig: params => post('/config/add', params),
  deleteConfig: params => post('/config/delete', params),
  updateConfig: params => post('/config/update', params),
  getConfigDetail: params => post('/config/detail', params),
  updateConfigStatus: params => post('/config/updateStatus', params),

  getServerList: params => post('/server/list', params),
  addServer: params => post('/server/add', params),
  deleteServer: params => post('/server/delete', params),
  updateServer: params => post('/server/update', params),
  getServerDetail: params => post('/server/detail', params),
  updateServerStatus: params => post('/server/updateStatus', params),

  getOptList: params => post('/opt/getOptList', params),

  uploadSingleUserImage: params => post('/file/uploadSingleUserImage', params)

}

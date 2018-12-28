import {formatDate} from '@/util/date'

export function ftDate(value, format) {
  if (value == null || value == '') {
    return ''
  }
  return formatDate(value, format)
}

export function ftCertType(value) {
  if (value == 'cert_100') {
    return '身份证'
  } else if (value == 'cert_101') {
    return '护照'
  }
  return value
}

export function ftRace(value) {

}

export function ftNationality(value) {

}

export function ftGender(value) {

}

export function ftMarital(value) {

}

export function ftWhiteType(value) {

}

export function ftConfigType(value) {
  if (value == 'ct_100')
    return '数据'
  else if (value == 'ct_101')
    return '开关'
  return value

}

export function ftBizType(value) {
  if (value == 'bt_100')
    return 'mc'
  return value

}

export function ftConfigMark(value) {
  if (value == 'cm_100')
    return '--'
  return value
}

export function ftConfigStatus(value) {
  if (value == 'cs_100') {
    return '正常'
  } else if (value == 'cs_101') {
    return '停用'
  }
  return value

}

export function ftServerType(value) {
  if (value == 'st_100')
    return 'token类'
  else if (value == 'st_101')
    return '无token类'
  return value

}

export function ftServerMark(value) {
  if (value == 'sm_100')
    return '--'
  return value
}

export function ftServerStatus(value) {
  if (value == 'ss_100') {
    return '正常'
  } else if (value == 'ss_101') {
    return '停用'
  }
  return value

}

export function ftUserStatus(value) {
  if (value == 'us_100') {
    return '正常'
  } else if (value == 'us_101') {
    return '锁定'
  } else if (value == 'us_102') {
    return '冻结'
  } else if (value == 'us_103') {
    return '休眠'
  }
  return value

}

export function ftOptStatus(value) {

}

export function ftAccountType(value) {
  if (value == 'at_100') {
    return '游戏'
  } else if (value == 'at_101') {
    return '工作'
  }
  return value
}

export function ftAccountMark(value) {
  if (value == 'am_100') {
    return '--'
  }
  return value
}

export function ftRelAccountId(value) {
  if (value == null || value == '') {
    return '否'
  }
  return '是'
}

export function ftNumber(value) {
  if (value == 0 || value == null) {
    return ''
  }
  return value
}

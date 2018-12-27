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

}

export function ftBizType(value) {

}

export function ftConfigMark(value) {

}

export function ftConfigStatus(value) {

}

export function ftServerType(value) {

}

export function ftServerMark(value) {

}


export function ftServerStatus(value) {

}

export function ftUserStatus(value) {

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


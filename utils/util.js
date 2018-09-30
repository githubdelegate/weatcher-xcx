const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


let formatDate = (nDate, date) => {
  if (isNaN(nDate.getTime())) {
    return '--'
  }

  let o = {
    'M+': nDate.getMonth() + 1,
    'd+': nDate.getDate(),
    'h+': nDate.getHours(),
    'm+': nDate.getMinutes(),
    's+': nDate.getSeconds(),
    'q+': Math.floor((nDate.getMonth + 3) / 3),
    'S': nDate.getMilliseconds()
  }

  if (/(y+)/.test(date)) {
    date = date.replace(RegExp.$1, (nDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(date)) {
      date = date.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return date
}

let random = (min, max) => {
  return Math.floor(Math.random() * Math .floor(max));
}


let pm = (value) => {
  if (value > 0 && value <= 50) {
    return {
      val: value,
      desc: '优',
      detail: '',
    }
  } else if (value > 50 && value <= 100) {
    return {
      val: value,
      desc: '良',
      detail: '',
    }
  } else if (value > 100 && value <= 150) {
    return {
      val: value,
      desc: '轻度污染',
      detail: '对敏感人群不健康',
    }
  } else if (value > 150 && value <= 200) {
    return {
      val: value,
      desc: '中度污染',
      detail: '不健康',
    }
  } else if (value > 200 && value <= 300) {
    return {
      val: value,
      desc: '重度污染',
      detail: '非常不健康',
    }
  } else if (value > 300 && value <= 500) {
    return {
      val: value,
      desc: '严重污染',
      detail: '有毒物',
    }
  } else if (value > 500) {
    return {
      val: value,
      desc: '爆表',
      detail: '能出来的都是条汉子',
    }
  }
}

module.exports = {
  formatTime: formatTime,
  formatDate,
  pm,
  random
}
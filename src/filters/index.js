// 全局filter
function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export const dateFilter = (value, hasTime) => {
  const split = '-'
  if (value) {
    if (typeof value === 'string') {
      value = parseInt(value)
    }
    const d = new Date(value)
    const date = {
      Y: d.getFullYear(),
      M: d.getMonth() > 8 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1),
      D: d.getDate() > 9 ? d.getDate() : '0' + d.getDate(),
      h: d.getHours() > 9 ? d.getHours() : '0' + d.getHours(),
      m: d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes(),
      s: d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds()
    }
    const day = `${date.Y}${split}${date.M}${split}${date.D}`
    if (hasTime) {
      return `${day} ${date.h}:${date.m}:${date.s}`
    } else {
      return day
    }
  }
  return ''
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function replaceTime (time) {
  console.log(time)
  if (!time) {
    return '- -'
  }
  if (typeof time === 'object') {
    time = parseTime(time, '{y}-{m}-{d} {h}:{i}:{s}')
  } else {
    let endTime = time.replace('/Date(', '')
    endTime = endTime.replace(')/', '')
    time = parseTime(endTime, '{y}-{m}-{d} {h}:{i}:{s}')
  }
  return time
}

// 不要时分秒的时间转换
export function replaceTimeNoH (time) {
  if (!time) {
    return '- -'
  }
  if (typeof time === 'object') {
    time = parseTime(time, '{y}-{m}-{d}')
  } else {
    let endTime = time.replace('/Date(', '')
    endTime = endTime.replace(')/', '')
    time = parseTime(endTime, '{y}-{m}-{d}')
  }
  return time
}

// 不要日期的时间转换
export function replaceTimeNoY (time) {
  if (!time) {
    return '- -'
  }
  if (typeof time === 'object') {
    time = parseTime(time, '{h}:{i}')
  } else {
    let endTime = time.replace('/Date(', '')
    endTime = endTime.replace(')/', '')
    time = parseTime(endTime, '{h}:{i}')
  }
  return time
}

export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/* 数字 格式化 */
export function nFormatter (num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function html2Text (val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toThousandslsFilter (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

// 讲电话中间4位变成*号
export function disposePhone (tel) {
  tel = '' + tel
  const reg = /(\d{3})\d{4}(\d{4})/
  return tel.replace(reg, '$1****$2')
}

export function formatWeek (week) {
  switch (week) {
    case 'Mon':
      return '星期一'
    case 'Tue':
      return '星期二'
    case 'Wed':
      return '星期三'
    case 'Thu':
      return '星期四'
    case 'Fri':
      return '星期五'
    case 'Sat':
      return '星期六'
    case 'Sun':
      return '星期日'
  }
}

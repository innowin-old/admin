export function isEmailValid (email) {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (typeof email === 'object') {
    return true
  }
  return re.test(email)
}

export function isMobileValid (mobile) {
  const re = /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/
  if (typeof mobile === 'object') {
    return true
  }
  return re.test(mobile)
}

export function isPhoneValid (phone) {
  const re = /^\+\d{1,3}\d{2,3}\d{3,14}$/
  if (typeof phone === 'object') {
    return true
  }
  return re.test(phone)
}

export function isNumerice (value) {
  if (typeof value === 'object') {
    return true
  }
  return !isNaN(parseFloat(value)) && isFinite(value)
}

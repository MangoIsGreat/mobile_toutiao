// 封装操作localStorage的方法：

function getLocal (key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function setLocal (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function removeLocal (key) {
  window.localStorage.removeItem(key)
}

// 暴露方法：
export {
  getLocal,
  setLocal,
  removeLocal
}

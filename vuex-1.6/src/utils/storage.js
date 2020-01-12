//
// 一个专门操作本地存储的工具模块
//
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    // 尝试把data转为JavaScript对象
    // 如果转换成功 一定意味着数据是一个json格式字符串
    // 如果data不是json格式字符串，那就失败报错，进入catch
    return JSON.parse(data)
  } catch (err) {
    // 在这里直接原样返回
    return data
  }
}
export const removeItem = name => {
  window.localStorage.removeItem(name)
}

// 04

/** 字典工具，待实现 */
import store from '@/store'

export const dict = {
  /**
   * 获取字典标签（label）
   * @param {*} type 字典类别
   * @param {*} value 字典值
   * @param {*} defaultValue 默认值
   */
  getDictLabel (type, value, defaultValue = '') {
    const dictList = dict.getDictList()
    if (dictList && dictList.length) {
      const temp = dictList.find(e => e.type === type && e.value === value)
      if (temp) {
        return temp.label
      }
    }
    return defaultValue
  },

  /**
   * 获取字典标签（多个label）
   * @param {*} type 字典类别
   * @param {*} values 字典值（多个）
   * @param {*} defaultValue 默认值
   */
  getDictLabels (type, defaultValue = '', ...values) {
    const dictList = dict.getDictList()
    if (dictList) {
      return dictList.filter(e => e.type === type && values.includes(e.value)).map(({label}) => label)
    }
    return Array(values.length).fill(defaultValue)
  },

  /**
   * 获取字典值（value）
   * @param {*} type 字典类别
   * @param {*} label 字典标签（label）
   * @param {*} defaultValue 默认值
   */
  getDictValue (type, label, defaultValue = '') {
    const dictList = dict.getDictList()
    if (dictList && dictList.length) {
      const temp = dictList.find(e => e.type === type && e.label === label)
      if (temp) {
        return temp.value
      }
    }
    return defaultValue
  },

  /**
   * 获取字典对象列表
   * @param {*} type 字典类别
   */
  getDictList (type = null) {
    const list = store.getters.dict
    if (type == null) {
      return list
    }
    if (list && list.length) {
      return list.filter(e => e.type === type)
    }
    return []
  }
}

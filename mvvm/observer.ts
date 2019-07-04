
/**
 * 观察者
 *
 * @class Observer
 */
class Observer {
  data: any
  constructor(data: Object) {
    if (typeof data === 'object') {
      this.data = data
      this.observe()
    } 
  }
  /**
   * 进行数据劫持
   * 利用 Object.defineProperty 进行数据劫持来监听改变
   * 采用循环遍历 data 的所有数据
   * 如果是对象的话那就继续添加
   */
  observe() {
    for (let key in this.data) {
      let val = this.data[key]
      /**
       * 这里如果val是个对象的话还需要进行进一步的数据劫持
       */
      new Observer(val)
      Object.defineProperty(this.data, key, {
        enumerable: true, //可以枚举
        get() {
          return val
        },
        set(newVal) {
          if (val === newVal) return  // 值不改变直接返回
          val = newVal
          /**
           * 新值有可能是一个对象 继续对新对象添加数据劫持
           */
          new Observer(val)
        }
      })
    }
  }
}
export default Observer
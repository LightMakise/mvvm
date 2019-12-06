
import Dep from './dep';
let dep = new Dep()
/**
 * 观察者
 *
 * @class Observer
 */
class Observer {
  data: any
  constructor(data: Object) {
    this.data = data
    this.observe()
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
      // new Observer(val)
      Object.defineProperty(this.data, key, {
        enumerable: true, //可以枚举
        get() {
          /**
           * Dep.target就是一个Watch
           * 当Watch被创建(new)的时候会生成一个
           * 添加订阅者 在调度中心
           */
          Dep.target && dep.addSub(Dep.target)
          return val
        },
        set(newVal) {
          if (val === newVal) return  // 值不改变直接返回
          val = newVal
          /**
           * 当被赋予新值的时候实则上修改了vm的值
           * 利用发布订阅模式 来通知订阅者进行数据更新
           * 实则就是更新视图的数据
           */
          dep.notify()
          /**
           * 新值有可能是一个对象 继续对新对象添加数据劫持
           */
          if (typeof val === 'object') {
            new Observer(val)
          }
        }
      })
    }
  }
}
export default Observer
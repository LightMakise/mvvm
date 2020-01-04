import Dep from './dep';
/**
 * 发布订阅模式
 * 订阅者
 * 每个订阅者应该一个update方法来进行数据更新
 * 在视图创建的时候 每当遍历到 {{}} 时候就会创建一个 订阅者
 * 
 * @class Watch
 */
class Watch {
  vm: object
  exp: any
  listener: Function
  constructor(vm:object, exp:any,listener:Function) {
    this.vm = vm
    this.exp = exp 
    this.listener = listener
    Dep.target = this // Watch 即为 Dep.target
    this.getNewVal()
    Dep.target = null
  }
  /**
   * 获取新的值
   * 这里的 this.vm 一般是数据变化的后的新值 比如原来的vm = {a:1} 通过修改 vm.a = 2
   * 即 vm = {a:2} 在 update 方法中会用到这个新的值来更新视图
   * val = val[i] 的时候会触发 观察者中的set和get方法
   *
   ** 此时会进行数据绑定操作 也就是observer真正生效的时候 触发get 
   ** 由于此时 Dep.target 存在 就会在Dep池中添加属性对应的watch回调方法 进行绑定
   * 
   * 这就是为什么在构造函数中先调用一次的原因
   */
  getNewVal() {
    let val = this.vm
    let arr:[] = this.exp.split('.')
    arr.forEach(i => {
      val = val[i]
    })
    return val
  }
  /**
   * 更新事件
   */
  update() {
    this.listener(this.getNewVal())
  }
}
export default Watch
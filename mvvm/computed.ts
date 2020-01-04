/**
 * Computed 计算属性实现
 */
class Computed {
  computeds: Object | any
  vm: Object
  constructor(computeds: any, vm: Object) {
    this.vm = vm
    this.computeds = computeds
    this.initComputed()
  }
  initComputed() {
    /**
     * 遍历 computeds 中的所有对象
     * 绑定在vm.data上
     * 如果计算属性是函数的话 就直接执行
     * 是对象话 直接调用get方法来触发
     * data上的属性变化时候会触发视图更新 同时计算属性也会随之更新
     */
    Object.keys(this.computeds).forEach((key) => {
      Object.defineProperty(this.vm, key, {
        get: this.isFunction(this.computeds[key]) ? this.computeds[key] : this.computeds[key].get
      })
    })
  }
  /**
   * 是否为函数
   */
  isFunction(o: any) {
    return Object.prototype.toString.call(o) === '[object Function]'
  }
}
export default Computed
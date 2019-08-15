
/**
 * 发布订阅模式
 * subs 调度中心
 * Watch 订阅者
 * notify 发布者 
 * @class Dep
 */
class Dep {
  static target:any = null
  subs: any[] = []
  constructor() {

  }
  /**
   * 添加订阅者
   * @param sub 
   */
  addSub(sub: any) {
    this.subs.push(sub)
  }
  /**
   * 发出通知
   * @param sub 
   */
  notify() {
    this.subs.forEach(sub => {
      // 每一个sub都应该有一个update方法
      sub.update()
    })
  }
}
export default Dep
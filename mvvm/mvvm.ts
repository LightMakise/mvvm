import Observer from './observer';
import Compile from './compile';
import Computed from './computed';
interface Option {
  data: any,
  el: string,
  computeds: Object
}
class Mvvm {
  $option: Option
  $data: Object = Object.create(null)
  constructor(option: Option) {
    this.$option = option // 挂载option
    this.$data = this.$option.data // 挂载 data 到 $data
    this.observe()
    // 实现computeds 计算属性
    new Computed(this.$option.computeds, this.$data)
    this.dataAgent(this.$data)
    new Compile(this.$option.el, this.$data)
  }
  /**
   * 给数据添加观察者
   */
  observe() {
    new Observer(this.$data)
  }
  /**
   * 数据代理
   * 使 this.$data 的数据可以直接通过 this. 访问
   */
  dataAgent(data:any) {
    for(let key in data) {
      Object.defineProperty( this , key , {
        enumerable: true,
        get() {
          return data[key]
        },
        set(newVal) {
          data[key] = newVal
          // 深层代理
          if (typeof newVal === 'object') {
            this.dataAgent(newVal)
          }
        }
      })
    }
  }
}
export default Mvvm
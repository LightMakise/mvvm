import Observer from './observer';
import Compile from './compile';
interface Option {
  data: any,
  el: string,
}
class Mvvm {
  $option: Option
  $data: Object = Object.create(null)
  constructor(option: Option) {
    this.$option = option // 挂载option
    this.$data = this.$option.data // 挂载 data 到 $datas
    this.observe()
    this.dataAgent()
    new Compile(this.$option.el, this.$data)
  }
  /**
   * 给数据添加观察者
   */
  observe() {
    return new Observer(this.$data)
  }
  
  /**
   * 数据代理
   * 使 this.$data 的数据可以直接通过 this. 访问
   */
  dataAgent() {
    for(let key in this.$data) {
      Object.defineProperty( this , key , {
        enumerable: true,
        get() {
          return this.$data[key]
        },
        set(newVal) {
          this.$data[key] = newVal
        }
      })
    }
  }
}
export default Mvvm
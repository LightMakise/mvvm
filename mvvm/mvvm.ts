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
          if (typeof newVal === 'object') {
            this.dataAgent(newVal)
          }
        }
      })
    }
  }
}
export default Mvvm
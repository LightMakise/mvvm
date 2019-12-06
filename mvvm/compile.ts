import Watch from './watcher';
class Compile {
  $el: any
  $vm: any
  fragment: any
  constructor(el: string, vm: any) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    // this.$el.style.display = 'none'
    console.log('$el', this.$el.firstChild);
    this.createdFrament()
    this.replace()
    this.$el.appendChild(this.fragment)
  }
  /**
   * 先创建虚拟节点 保存在内存当中
   */
  createdFrament() {
    this.fragment = document.createDocumentFragment()
    let chlid = null
    while (chlid = this.$el.firstChild) {
      this.fragment.appendChild(chlid)
    }
  }
  /**
   * 遍历所有虚拟节点 查找 {{}} 替换变量为真实数值
   * 并添加一个 Watch 订阅者
   */
  replace() {
    let reg = /\{\{(.*)\}\}/
    Array.from(this.fragment.childNodes).forEach((node: any) => {
      let text = node.textContent
      if (node.nodeType === 1 && reg.test(text)) {
        console.log(RegExp.$1)
        let arr = RegExp.$1.split('.')  // '{{a.b}}' => [a,b]
        let val = this.$vm;
        // val 层层遍历
        arr.forEach(i => {
          val = val[i]
        }) // val 为 a.b 的值
        // TODO newVal & val 需要处理非字符串时候的情况  
        new Watch(this.$vm, RegExp.$1, (newVal:any) => {
          console.log('newVal', newVal);
          node.textContent = text.replace(reg, newVal)
        })
        node.textContent = text.replace(reg, val)
      }
    })
  }
}
export default Compile
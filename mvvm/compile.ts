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
    this.replace(this.fragment.childNodes)
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
  replace(nodes: Object[]) {
    let reg = /\{\{(.*)\}\}/
    Array.from(nodes).forEach((node: any) => {
      /**
       * input框v-model双向绑定
       */
      if (node.nodeType === 1) {
        if (node.tagName && node.tagName === 'INPUT'){
          Array.from(node.attributes).forEach((attr: any) => {
            if (attr.name === 'v-model' && node.type === 'text') {
              let val = this.$vm;
              let arr = attr.value.split('.') // a.b => [a,b]
              // val 层层遍历
              arr.forEach((i:string) => {
                val = val[i]
              }) // val 为 a.b 的值
              new Watch(this.$vm,attr.value, (newVal: any) => {
                // console.log('newVal', newVal);
                node.value = newVal
              })
              node.oninput = ()=> { 
                let val = this.$vm;
                let arr = attr.value.split('.')
                arr.forEach((i:string) => {
                  if (typeof val[i] === 'object') {
                    val = val[i]
                  } else {
                    val[i] = node.value
                  }
                })
              }
              node.value = val
            }
          })
        } else {
          this.replace(node.childNodes)
        }
      }
      if (node.nodeType === 3) {
        let text = node.textContent
        if (reg.test(text)) {
          let arr = RegExp.$1.split('.')  // '{{a.b}}' => [a,b]
          let val = this.$vm;
          // val 层层遍历
          arr.forEach((i:string) => {
            val = val[i]
          }) // val 为 a.b 的值
          new Watch(this.$vm, RegExp.$1, (newVal: any) => {
            // console.log('newVal', newVal);
            node.textContent = text.replace(reg, newVal)
          })
          node.textContent = text.replace(reg, val)
        }
       
      }
    })
  }
}
export default Compile
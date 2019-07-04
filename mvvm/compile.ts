class Compile {
  $el: any
  $vm: any
  fragment: any
  constructor(el:string, vm:any) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    console.log('$el', this.$el.firstChild);
    this.createdFrament()
    this.replace() 
  }
  
  createdFrament () {
    this.fragment = document.createDocumentFragment()
    let chlid = null 
    while(chlid = this.$el.firstChild) {
      this.fragment.appendChild(chlid)
    }    
  }
  replace() {
    let reg = /\{\{(.*)\}\}/
    Array.from(this.fragment.childNodes).forEach( (node:any) => {
      let text = node.textContent
      if(node.nodeType === 1 && reg.test(text)) {
        console.log(RegExp.$1)
        let arr = RegExp.$1.split('.')
        let val = this.$vm;
        arr.map(i=>{
          val = val[i]
        })
        console.log(val);
        node.textContent = text.replace(reg,val)
      }
    })
    this.$el.appendChild(this.fragment)
  }
}
export default Compile
import Mvvm from '../mvvm/mvvm';
var mvvm = new Mvvm({
  el: '#app',
  data: {
    a: {
      a: 4
    },
    b: 2,
    c: 5
  },
  computeds: {
    d() {
      return this.a.a + this.b
    }
  }
})

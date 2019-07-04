import Mvvm from '../mvvm/mvvm';
var mvvm = new Mvvm({
  el: '#app',
  data: {
    a: {
      a: 4
    },
    b: 2
  }
})
window.mvvm = mvvm
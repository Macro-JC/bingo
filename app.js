const { createApp } = Vue;

createApp({
  data: function () {
    return {
      bingos: [],
      leters: {},
      nums: [],
      numbers: []
    };
  },
  methods: {
    checkNum(num) {
      return this.nums.includes(num)
    },

    chunk(arr) {
      arr =  arr.reduce((all, one, i) => {
        const ch = Math.floor(i / 5);
        all[ch] = [].concat(all[ch] || [], one);
        return all;
      }, []);

      arr = arr[0].map((_, colIndex) => arr.map(row => row[colIndex]))

      return arr
    },
    addNum(n){
      this.nums.push(n)
    },
    back(){
      this.numbers = []
    },
    showNumbers(l){
      this.numbers =  this.leters[l];
    }
  },
  computed: {
    
  },
  mounted() {
    const range = (size, start) =>
      Array(size)
        .fill(start)
        .map((x, y) => x + y);
    
    this.leters = {
      B: range(15, 1),
      I: range(15, 16),
      N: range(15, 31),
      G: range(15, 46),
      O: range(15, 61),
    };

    fetch("./data.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.bingos = data.map(b=>{
          b.numbers = this.chunk(b.numbers)
          return b
        })
      })
      .catch((err) => {
        // Do something for an error here
      });
  },
}).mount("#app");

// document.addEventListener('DOMContentLoaded',() => {
//     const range = (size,start) => Array(size).fill(start).map((x, y) => x + y)
//     const myModal = document.getElementById('createModal')
//     const numbers = {
//         'B':range(15,1),
//         'I':range(15,16),
//         'N':range(15,31),
//         'G':range(15,46),
//         'O':range(15,61),
//     }

//     console.log(numbers);
//     myModal.addEventListener('shown.bs.modal', (e) => {
//         let data = {
//             'B':[]
//         }
//         // myModal.querySelector('.modal-body')
//         // debugger;
//     })
// })

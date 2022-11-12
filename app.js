const { createApp } = Vue;

createApp({
  data: function () {
    return {
      bingos: [],
      leters: {},
      nums: [],
      numbers: [],
      block: false,
    };
  },
  methods: {
    checkNum(num) {
      return this.nums.includes(parseInt(num))
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
      if(!this.checkNum(n)){
        this.nums.push(n)
      }else{
        this.nums.splice(this.nums.indexOf(n),1)
      }
      this.saveLocal()
    },
    back(){
      this.numbers = []
    },
    showNumbers(l){
      this.numbers =  this.leters[l];
    },
    classNumber(n){
      let numExist = this.checkNum(n);
      return {
        'btn-primary':numExist,
        'btn-outline-secondary':!numExist,
      }
    },
    saveLocal(){
      localStorage.setItem('nums',JSON.stringify(this.nums))
    },
    sort(){
      return this.bingos
          .map(({numbers},idx)=>{
            let nums = numbers.flat(1).filter(Boolean).map(n=>parseInt(n))
            return {
              idx, 
              size: new Set([...nums, ...this.nums]).size,
              completed: this.checker(nums)
          }
        })
          .sort((a,b)=>a.size-b.size)
    },
    checker(arr){
      let nums = Object.values(this.nums)
      return arr.every(v=>nums.includes(v))
    }
  },
  watch: {
    nums:{
      handler: function(val, oldVal){
        this.sort()
      },
      deep: true
    }
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
        let localNums = localStorage.getItem('nums')
        if(localNums){
          this.nums = JSON.parse(localNums)
        }
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

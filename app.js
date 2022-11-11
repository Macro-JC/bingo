const { createApp } = Vue;

createApp({
  data: function () {
    return {
      bingos: [],
      message: "Hello sVuse!",
      numbers: {},
      nums: ['14','40','54','46','70'],
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
  },
  computed: {
    
  },
  mounted() {
    const range = (size, start) =>
      Array(size)
        .fill(start)
        .map((x, y) => x + y);
    
    this.numbers = {
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
        this.bingos = data;
        debugger
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

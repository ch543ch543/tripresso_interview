<template>
    <div class="pagination">
     <div class="pagination-row">
            <button class="pagination-botton"> &lt; </button>
         <span v-for= "(item, index) in new Array(10)" :key="index">
            <button class="pagination-botton" @click="page(index)">{{ index+1 }}</button>
         </span>
            <button class="pagination-botton"> &gt; </button>
     </div>
    </div>
  </template>
  
  <script>
  
  
  export default {
    name: "pagination",
    data(){
        return{
            pageNumber: 1,
        }
    },
    methods:{
        page(num) {
            this.pageNumber = num+1
            console.log(this.pageNumber)
        }
    }
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  .pagination-botton{
      margin: 3px;
      padding: 6px;
      border-radius: 3px;
      border-style: none;
      cursor: pointer;
  }
  </style>
  
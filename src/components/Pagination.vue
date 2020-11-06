<template>
    <div class="pagination">
        <div class="pagination-row">
            <!-- previous page button -->
            <button class="btn btn-light" @click = "resetpage(pageNumber + 1)"> &lt; </button>
            <!-- pagination button --> 
            <span v-for= "(item, index) in new Array(10)" :key="index">
                <button class="btn btn-light"  @click = "resetpage(index + 1)">{{ index+1 }}</button>
            </span> 
            <!-- next page button -->
            <button class="btn btn-light" @click = "resetpage(pageNumber - 1)"> &gt; </button>
        </div>
    </div>
</template>
  
<script>
  export default {
    name: "pagination",
    props: {
        pageNumber:{ 
            type: Number,
        }
    },
    methods: {
        resetpage(page) {
            this.pageNumber = page;
            //use 'update:"props-name"' to emit a update event, and pass the change value.
            this.$emit('update:pageNumber', this.pageNumber); //子元件與父元件雙向綁定
        }
    }
  };
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
    .pagination-row {
        margin-left: auto;
        margin-right: auto;
    }

    .pagination-row button {
        margin: 10px 2px;
        cursor: pointer;
    }

  </style>
  

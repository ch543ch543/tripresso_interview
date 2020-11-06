<template>
    <div class="sortbar">
        <nav class="navbar navbar-expand navbar-light bg-light" style="width:100%; margin: auto;"> 
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  價格：{{ pricesort }}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item btn" @click="sortmethod('price_desc', '高至低', '')" href="#">高至低</a>
                  <a class="dropdown-item btn" @click="sortmethod('price_asc', '低至高', '')" href="#">低至高</a>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  評分：{{ratingsort}}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item btn" @click="sortmethod('rating_desc', '', '高至低')" href="#">高至低</a>
                  <a class="dropdown-item btn" @click="sortmethod('rating_asc', '', '低至高')" href="#">低至高</a>
                </div>
              </li>
            </ul>
          </div>
        </nav> 
    </div>
</template>
  
<script>
export default {
  name: "sortbar",
  props: {
    sort: {
      type: String,
    }
  },
  data() {
    return{
      pricesort: '低至高',
      ratingsort: ''
    }
  },
  methods: {
    sortmethod(sort, pricesort, ratingsort){
      this.sort = sort;
      this.pricesort = pricesort
      this.ratingsort = ratingsort
      //use 'update:"props-name"' to emit a update event, and pass the change value.
      this.$emit('update:sort', this.sort); //子元件與父元件雙向綁定
    }
  }
};
</script>

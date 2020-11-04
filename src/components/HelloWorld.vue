<template>
  <div class="hello">
    <div class="container">
      <nav class="navbar navbar-expand navbar-light bg-light" style="width:100%; margin: auto;"> 
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                價格：{{pricesort}}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item btn" @click="price_desc" href="#">高至低</a>
                <a class="dropdown-item btn" @click="price_asc" href="#">低至高</a>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                評分：{{ratingsort}}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item btn" @click="rating_desc" href="#">高至低</a>
                <a class="dropdown-item btn" @click="rating_asc" href="#">低至高</a>
              </div>
            </li>
          </ul>
        </div>
      </nav> 
      <div  v-for = "(item, index) in data" :key="index">
        <div class = "cards" style="display: flex; align-items: left; justify-content: center;">
          <div class = 'img' style="width: 25%; height: 100%">
            <img :src="item.image_url" style="width:100%; 
            height:100%; 
            object-fit:cover; ">
          </div>
          <div class='info' style="width: 75%">
            <h5 class = 'agency' v-if="item.rating==5">
              {{ item.agency }} ★ ★ ★ ★ ★
            </h5>
            <h5 class = 'agency' v-if="item.rating==4">
              {{ item.agency }} ★ ★ ★ ★ ☆
            </h5>
            <h5 class = 'agency' v-if="item.rating==3">
              {{ item.agency }} ★ ★ ★ ☆ ☆
            </h5>
            <h5 class = 'agency' v-if="item.rating==2">
              {{ item.agency }} ★ ★ ☆ ☆ ☆
            </h5>
            <h5 class = 'agency' v-if="item.rating==1">
              {{ item.agency }} ★ ☆ ☆ ☆ ☆
            </h5>
            <h5 class = 'title'>
              {{ item.title }}
            </h5>
            <div style="display: flex; padding-left: 20px;">
              <div v-for = "(tag, index) in item.tags" :key="index">
                <button class='tags'>{{ tag }}</button>
              </div>
            </div>
            <hr style="margin: 5px 0px;">
            <div class='timeandnum' style="display: flex; align-items: center; padding-left: 20px;">
              <div style="width: 75%; display: flex; align-items: center;">
                <div v-for = "(option, index) in item.group" :key="index" style="margin-right: 10px;">
                  <h5 class='date'>{{ option.date | date }} ( {{ option.date | day}} )</h5>
                  <button class='num'> 可售{{ option.quantity }}位</button>
                </div>
              </div>
              <div style="width: 25%;  margin-left: 20px;">
                <h5 style="color:rgb(253, 163, 60); font-size: 1.8em; display: inline; font-weight: bold;">{{ item.tour_days }}</h5>
                <h5 style="font-size: 1em; display: inline;">天</h5>
                <h5 style="color:rgb(253, 163, 60); font-size: 1.8em; display: inline; font-weight: bold;">{{ item.min_price | currency }}</h5>
                <h5 style="font-size: 1em; display: inline;">元起</h5>
              </div>    
            </div>
          </div>
        </div>
      </div>
      <div class="pagination-row">
        <button class="btn btn-light"  @click = 'previous'> &lt; </button>
          <span v-for= "(item, index) in new Array(10)" :key="index">
              <button class="btn btn-light"  @click = "page(index)">{{ index+1 }}</button>
          </span>
          <button class="btn btn-light"  @click = "next"> &gt; </button>
      </div> 
    </div>
    <div>
      <loading :active.sync="isloading"></loading>
    </div>
  </div>
</template>

<script>
import axios from "../apis/api";

export default {
  name: "HelloWorld",
  
  data() {
    return {
      isloading: false,
      data: [],
      pageNumber: 1,
      sort: 'price_asc',
      pricesort: '低至高',
      ratingsort: ''
    } 
  },
  created() {
    this.getdata(1,10,'price_asc');
  },
  methods: {
    async getdata(page,rpp,sort) {
      try{
      this.data = [];
      this.isloading = true;
      let tourdata = await axios
      .get(`http://interview.tripresso.com/tour/search?page=${page}&row_per_page=${rpp}&sort=${sort}`)
      this.data = tourdata.data.data.tour_list;
      console.log(new Date (this.data[0].group[0].date))
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        this.isloading = false
        },500)
    }
    ;  
    },

    price_desc(){
      this.sort = 'price_desc';
      this.pricesort = '高至低'
      this.ratingsort = ''
      this.getdata(this.pageNumber,10,this.sort)
    },

    price_asc(){
      this.sort = 'price_asc';
      this.pricesort = '低至高'
      this.ratingsort = ''
      this.getdata(this.pageNumber,10,this.sort)
    },

    rating_desc(){
      this.sort = 'rating_desc';
      this.ratingsort = '高至低'
      this.pricesort = ''
      this.getdata(this.pageNumber,10,this.sort)
    },

    rating_asc(){
      this.sort = 'rating_asc'
      this.ratingsort = '低至高'
      this.pricesort = ''
      this.getdata(this.pageNumber,10,this.sort)
    },

    page(num) {
      this.pageNumber = num + 1
      console.log(this.pageNumber)
      this.getdata(this.pageNumber,10,this.sort)
    },

    previous() {
      if( this.pageNumber > 1 ) {
        this.pageNumber--;
        this.getdata(this.pageNumber,10,this.sort)
      } 
    },

    next() {
      if( this.pageNumber < 10 ) {
        this.pageNumber++;
        this.getdata(this.pageNumber,10,this.sort)
      } 
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  width: 80%
}
.pagination-row button {
  margin: 10px 2px;
}
.cards {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: white;
  padding-left: 0px;
  padding-right: 0px;
  height: 220px;
}
h5 {
  margin: 0px;
}

h5.agency  {
  color:gray;
  text-align: left;
  font-size: 1rem;
  padding-left: 20px;
  padding-top: 20px;
}

h5.title  {
  color:black;
  text-align: left;
  font-size: 1.2rem;
  padding: 10px 20px;
  height: 67px;
}

h5.date  {
  color:rgb(73, 180, 216);
  text-align: left;
  font-size: 0.8rem;
  padding-top: 10px;
  padding-right: 20px;
}

button.num  {
  background-color:rgb(58, 165, 201);
  color:white;
  text-align: left;
  font-size: 0.8rem;
  margin-right: 20px;
  border-style: solid;
  border-radius: 3px;
  border-color: transparent;
  border-width: 1px;
}

button.tags  {
  color:rgb(73, 180, 216);
  text-align: left;
  font-size: 0.8rem;
  margin: 10px 5px;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  border-color: rgb(73, 180, 216);
  background-color: white;
}




</style>

<template>
    <div class="groupdata">
      <div class="container">
        <!-- use `.sync` decorator to declare the counter is a two way binding props. -->
        <!-- 引入Sortbar裡的sort變數 -->
        <Sortbar :sort.sync="sort"></Sortbar>
          <!-- tour groups card -->
          <div class = "cards" v-for = "(item, index) in data" :key="index">
            <!-- tour groups img -->
            <div class = 'img' style="width: 25%; height: 100%">
              <img :src="item.image_url" style="width:100%; 
              height:100%; 
              object-fit:cover; ">
            </div>
            <!-- tour groups detail -->
            <div class='info' style="width: 75%; margin: auto;">
              <h5 class = 'agency'>
                {{ item.agency }} {{ item.rating | rating }}
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
              <div class='timeandnum'>
                <div style="width: 75%; display: flex; align-items: center;">
                  <div v-for = "(option, index) in item.group" :key="index" style="margin-right: 10px;">
                    <p class='date'>{{ option.date | date }} ( {{ option.date | day}} )</p>
                    <button class='num'> 可售{{ option.quantity }}位</button>
                  </div>
                </div>
                <div style="width: 25%;  margin-left: 20px;">
                  <p style="color:rgb(253, 163, 60); font-size: 1.8em; display: inline; font-weight: bold;">{{ item.tour_days }}</p>
                  <p style="font-size: 1em; display: inline;">天</p>
                  <p style="color:rgb(253, 163, 60); font-size: 1.8em; display: inline; font-weight: bold;">{{ item.min_price | currency }}</p>
                  <p style="font-size: 1em; display: inline;">元起</p>
                </div>    
              </div>
            </div>
          </div>
        <Pagination :pageNumber.sync="pageNumber"></Pagination>
      </div>
      <loading :active.sync="isloading"></loading>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Pagination from "../components/Pagination"
  import Sortbar from "../components/Sortbar"
  
  export default {
    name: "groupdata",
    components: {
      Pagination, Sortbar
    },
    data() {
      return {
        isloading: false,
        data: [],
        sort: 'price_desc',
        pageNumber: 1
      } 
    },
    //用watch監聽pageNumber或sort被更新的時候執行function
    watch: {
      pageNumber: function(){
        this.getdata(this.pageNumber,10, this.sort)
      },
      sort: function(){
        this.getdata(1,10, this.sort);
        this.pageNumber = 1;
      }
    },
    created() {
      this.getdata(this.pageNumber,10, this.sort);
    },
    methods: {
      async getdata(page,rpp,sort) {
        try{
        this.isloading = true;
        this.data = [];
        const cors = 'https://cors-anywhere.herokuapp.com/' //引入代理request server cors anywhere
        let tourdata = await axios
          .get(`${cors}http://interview.tripresso.com/tour/search?page=${page}&row_per_page=${rpp}&sort=${sort}`)
          this.data = tourdata.data.data.tour_list;
        } catch (error) {
          console.log(error);
        } finally {
          setTimeout(() => {
            this.isloading = false
          },500)
        };  
      },
    }
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  .container {
    width: 80%
  }
  
  .cards {
    display: flex; 
    align-items: left; 
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: white;
    padding-left: 0px;
    padding-right: 0px;
    height: 220px;
  }
  
  h5 {
    margin: 0px;
    text-align: left;
    padding: 3px 20px;
  }
  
  h5.title  {
    color:black;
    text-align: left;
    font-size: 1.2rem;
    height: 55px;
  }
  
  .timeandnum {
    display: flex; 
    align-items: center; 
    padding-left: 20px;
   }
  
   p.date  {
    color:rgb(73, 180, 216);
    text-align: left;
    font-size: 0.8rem;
    padding-top: 10px;
    padding-right: 20px;
    margin-bottom: 0px;
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
    margin: 5px 5px;
    border-style: solid;
    border-width: 1px;
    border-radius: 10px;
    border-color: rgb(73, 180, 216);
    background-color: white;
  }
  </style>
  
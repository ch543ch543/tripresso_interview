<template>
    <div class="groupdata">
      <div class="container">
        <Sortbar :sort.sync="sort"></Sortbar> <!-- 引入Sortbar裡的sort變數 -->
          <!-- tour groups card -->
          <div class = "cards" v-for = "(item, index) in data" :key="index">
            
            <div class = 'img'> <!-- tour groups img -->
              <img :src="item.image_url">
            </div>
            
            <div class='info'> <!-- tour groups detail -->
              <div class="infocontent"> 
                <h5 class = 'agency'> <!-- agency name and rating -->
                  {{ item.agency }} {{ item.rating | rating }}
                </h5>

                <h5 class = 'title'> <!-- product -->
                  {{ item.title }}
                </h5>

                <div class = 'tags'>
                  <div v-for = "(tag, index) in item.tags" :key="index">
                    <button class='tag'>{{ tag }}</button>
                  </div>
                </div>

                <hr style="margin: 5px 0px;">

                <div class='timenumprice'>
                  <div class='timeandnum'>
                    <div v-for = "(option, index) in item.group" :key="index" style="margin-right: 10px;">
                      <p class='date'>{{ option.date | date }} ( {{ option.date | day}} )</p>
                      <button class='num'> 可售{{ option.quantity }}位</button>
                    </div>
                  </div>  

                  <div style="width: 25%; text-align: right">
                    <p class="bigfont">{{ item.tour_days }}</p>
                    <p class="normalfont">天</p>
                    <p class="bigfont">{{ item.min_price | currency }}</p>
                    <p class="normalfont">元起</p>
                  </div>   
                </div>
              </div>
            </div>
          </div>
        <Pagination :pageNumber.sync="pageNumber"></Pagination> <!-- page component -->
        <p>第{{pageNumber}}頁</p>
      </div>
      <loading :active.sync="isloading"></loading> <!-- loding effect before getting response -->
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
        sort: 'price_asc',
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
        const url = `http://interview.tripresso.com/tour/search?page=${page}&row_per_page=${rpp}&sort=${sort}`
        let tourdata = await axios
          .get(`${cors}${url}`)
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
  
  <style scoped lang="scss">
  @import "../assets/scss/groupdata.scss";
  </style>
  
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Loading from 'vue-loading-overlay' //component
import 'vue-loading-overlay/dist/vue-loading.css' //style
import 'jquery';
import "popper.js"; 
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


Vue.config.productionTip = false;
Vue.component('Loading', Loading)

/// filter ///
Vue.filter('currency',function(value){
  return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
});

Vue.filter('date',function(value){
  let date = new Date (value)
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return month + "/" + day
});

Vue.filter('day',function(value){
  let day = new Date (value)
  return "日一二三四五六".charAt(day.getDay())
});

Vue.filter('rating',function(value){
  return "★".repeat(value)+"☆".repeat(5-value);
});
//////////

new Vue({
  router,
  store,
  data () {
    return {
      info: null
    }
  },
  render: h => h(App)
}).$mount("#app");

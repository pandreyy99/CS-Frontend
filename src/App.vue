<template>
  <div id="app">
    <header>
       <div id="container" class="shadow p-3 bg-white rounded">
          <h5 id="name"><b>MYStore</b></h5>
          <h5 id="counter">Currently showing <span style="display:inline; color:red;">{{data.length}}</span> products</h5>
        </div>
    </header>
    <main>
      <div id="filter-container" class="d-flex flex-row-reverse">
        <b-form-select v-model="selected" :options="options" id="filter" class="shadow-sm"></b-form-select>
      </div>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import JQuery from 'jquery'
let $ = JQuery
export default {
  name: 'app',
  data () {
    return {
      data: {},
      numberOfPictures: 8,
      selected: null,
      options: [
        { value: null, text: 'Filter by' },
        { value: 'a', text: 'Price' },
        { value: 'b', text: 'Date' },
        { value: 'c', text: 'Rating' }
      ]
    }
  },
  mounted () {
    const url = 'http://localhost:8000/api/items'
    // const { data } = await axios.get(url)
    axios.get(url, {'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      withCredentials: true})
      .then(response => { this.data = response.data })
      .then(status => console.log(JSON.stringify(status)))
      .catch(error => console.log(JSON.stringify(error)))

    this.$eventBus.$emit('data-export', this.data)

    // $.ajax({
    //   type: 'GET',
    //   url: url,
    //   // headers: {
    //   //   'Access-Control-Allow-Origin': 'http://localhost:8080'
    //   // },
    //   contentType: 'application/json',
    //   dataType: 'json',
    //   success: function (response) {
    //     this.data = response
    //   },
    //   error: function (error) {
    //     console.log(JSON.stringify(error))
    //   }
    // })
  },
  methods: {
    changeItemsNumber: function () {
      const number = $('img').length
      this.numberOfPictures = number
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


main {
  text-align: center;
  margin-top: 30px;
}

header {
  margin: 0;
  height: 26spx;
  padding: 0 16px 0 24px;
  background-color: #ffffff;
  color: #35495E;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

#container {
  display: flex;
  justify-content: space-between;
}

#filter-container {
  margin-right: 11%;
  height: 7vh;
}

#filter {
  width: 20%;
}
</style>

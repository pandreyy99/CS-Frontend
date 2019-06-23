<template>
  <div class="hello">
    <b-container class="bv-example-row">
      <b-row v-for="i in rows">
        <b-col v-for="j in 4">
          <div v-if="(i-1) * 4 + j <= 8" class="card active mb-1 mt-1" >
            <div class="product">
              <h6 class="product text-center mb-2 mt-2">{{items[(i - 1)*4 + j - 1].name}}</h6>
            </div>
            <img v-bind:src="items[(i - 1)*4 + j - 1].picture" alt="Picture" class="card-img-top"/>
            <div class="price">
              <h6 class="price text-center mb-2 mt-2">&dollar;{{items[(i - 1)*4 + j - 1].price}}</h6>
            </div>
          </div>
          <div v-else class="card hidden mb-1 mt-1">
            <div class="product">
              <h6 class="product text-center mb-2 mt-2">{{items[(i - 1)*4 + j - 1].name}}</h6>
            </div>
            <img v-bind:src="items[(i - 1)*4 + j - 1].picture" alt="Picture" class="card-img-top"/>
            <div class="price">
              <h6 class="price text-center mb-2 mt-2">&dollar;{{items[(i - 1)*4 + j - 1].price}}</h6>
            </div>
          </div>
        </b-col>
      </b-row>
      
      <b-row>
        <b-col v-for="j in cols">
          <div class="card hidden mb-1 mt-1">
            <div class="product">
              <h6 class="product text-center mb-2 mt-2">{{items[items.length - j - 1].name}}</h6>
            </div>
            <img v-bind:src="items[items.length - j].picture" alt="Picture" class="card-img-top"/>
            <div class="price">
              <h6 class="price text-center mb-2 mt-2">&dollar;{{items[items.length - j - 1].price}}</h6>
            </div>
          </div>
        </b-col>
        <b-col class="col-6"></b-col>
      </b-row>
    </b-container>
    
    <b-button id="button">LOAD MORE</b-button>
  </div>
</template>

<script>
import axios from 'axios'
import JQuery from 'jquery'
let $ = JQuery

$(document).ready(function () {
  $('#button').click(function (event) {
    event.preventDefault()
    let hiddenElements = $('.hidden')
    console.log(hiddenElements.length)
    const numberOfElementsToAppear = Math.min(8, hiddenElements.length)
    for (let i = 0; i < numberOfElementsToAppear; i++) {
      hiddenElements[i].classList.remove('hidden')
      hiddenElements[i].classList.add('active')
      hiddenElements[i].style.display = 'block'
    }
    $('span')[0].innerHTML = $('.active').length
  })
})

export default {
  name: 'Hello',
  data () {
    return {
      items: {},
      rows: 0,
      cols: 0
    }
  },
  mounted () {
    const url = 'http://localhost:8000/api/items'
    // const { data } = await axios.get(url)
    axios.get(url, {'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      withCredentials: true})
      .then(response => { this.items = response.data; this.rows = parseInt(response.data.length / 4, 10); this.cols = response.data.length - (this.rows * 4) })
      .then(status => console.log(JSON.stringify(status)))
      .catch(error => console.log(JSON.stringify(error)))

    // this.$eventBus.$on('data-export', this.updateData)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hello {
    margin-top: 2vh; 
    height: 90vh;
    display: block;
    justify-content: center;
    text-align: center;
  }
  .card {
    width: 100%;
    padding: 0%;
  }
  .hidden {
    display: none;
  }
  .product {
    height: 2rem;
    background: #484848;
    color: #ffffff;
    margin: 0%;
    width: 100%;
  }
  .price {
    background: #484848;
    color: #ffffff;
    margin: 0%;
    width: 100%;
  }
  .card:hover .product{
    background-color: #ffffff;
    color: #585858;
  }
  .card:hover .price{
    background-color: #ffffff;
    color: #FF8484;
  }
  #button {
    background: #F87C7C;
    color: #FFFFFF;
    margin-top: 3vh;
    width: 40%;
  }
</style>

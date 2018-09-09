<template>
  <div class="container">
    <users-main/>
    <Search/>
  </div>
</template>

<script>
  import  Search from './components/Search'
  import  Main from './components/Main'

  export default {
    components:{
      UsersMain:Main,
      Search
    }
  }
</script>

<style scoped>

</style>

<template>
  <div>
    <!--3、使用组件标签-->
    <img class="logo" src="./assets/logo.png" alt="logo"/>
    <HelloWord></HelloWord>
  </div>
</template>
<script>
    //1、引入组件
  import HelloWord from './components/HelloWord'
  export default {
    //2、映射组件标签
    components:{
      HelloWord
    }
  }

</script>

<style>
  .logo{
    width: 200px;
    height: 200px;
  }
</style>

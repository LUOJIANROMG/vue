<template>
  <div>
    <p class="msgs" >{{msgs}}</p>
  </div>
</template>

<script>
  export default {  //配置对象.与vue一致
    data() {  //必须写函数
      return {
        msgs: 'I LOVE YOU'
      }
    },
  }

</script>

<style>
  .msgs{
    color: rebeccapurple;
    font-size: 30px;
  }
</style>

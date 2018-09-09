<template>
  <div>
    <div v-if="!repoUrl">loading</div>
    <div v-else>most star repo is <a :hrfe="repoUrl"> {{repoName}}</a></div>
  </div>
</template>

<script>

  export default {
    data(){
      return{
        repoUrl: '',
        repoName: ''
      }
    },
    mounted(){
      //发ajax请求获取数据
      const url = 'https://api.github.com/search/repositories?q=v&sort=stars'
      this.$http.get(url).then(
        response => {
          //成功
          const result = response.data
          const mostRepo = result.items[0]
          this.repoUrl = mostRepo.html_url
          this.repoName = mostRepo.name
        },
        reponse => {
          //失败
          alert('请求失败 ')
        }
      )
    }
  }
</script>

<style scoped>

</style>

<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!--<TodoHeader @addTodo="addTodo"/>-->
      <TodoHeader ref="header"/>
      <TodoList :todos="todos" />
      <TodoFooter :todos="todos" :deleteCompleteTodos="deleteCompleteTodos" :selectAllTodos="selectAllTodos"/>
      <todo-footer>
        <input type="checkbox" v-model="isAllCheck" slot="checkAll"/>
        <span slot="count">已完成{{completeSize}}</span> / 全部{{todos.length}}
        <button class="btn btn-danger" v-show="completeSize" @click="deleteCompleteTodos" slot="delete"> 清除已完成任务</button>
      </todo-footer>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import TodoHeader from './components/TodoHeader.vue'
  import TodoFooter from './components/TodoFooter.vue'
  import TodoList from './components/TodoList.vue'
  import storageUtil from './util/StorageUtil'

  export default {

    data(){
      return{
        //从localStorage读取todos
       // todos: JSON.parse(window.localStorage.getItem('todos_key')||'[]')
        todos: storageUtil.readTodos()
      }
    },
    computed:{
      completeSize(){
        return this.todos.reduce((preTotal,todo) => preTotal + (todo.complete?1:0),0)
      },
      isAllCheck:{
        get(){
          return this.completeSize===this.todos.length && this.completeSize>0
        },
        set(value){
          this.selectAllTodos(value)
        }
      }
    },

    mounted(){ //执行异步代码
    //给<TodoHeader/>绑定事件监听
      // this.$on('addTodo',this.addTodo)
      this.$refs.header.$on('addTodo',this.addTodo)

      //订阅消息
      PubSub.subscribe('deleteTodo', (msg,index)=> {
       this.deleteTodo(index)
      })
    },
    methods:{
      addTodo(todo){
        this.todos.unshift(todo)
      },
      deleteTodo(index){
        this.todos.splice(index,1)
      },
      //删除所有选中的
      deleteCompleteTodos(){
       this.todos = this.todos.filter(todo => !todo.complete)
      },
      //全选/全不选
      selectAllTodos(check){
        this.todos.forEach(todo =>todo.complete = check)
      }

    },

    watch:{  //监视
      todos:{
        deep: true, //深度监视
        // handler: function (value) {
        //   //将todos最新的值的json数据，保存到localStorage中
        //  // window.localStorage.setItem('todos_key',JSON.stringify(value))
        //   storageUtil.saveTodos(value)
        // }

        // handler:function (todos) {
        //   window.localStorage.setItem(TODOS-KEY,JSON.stringify(todos))
        // },
        handler:storageUtil.saveTodos
      }
    },

    components:{
      TodoHeader,
      TodoList,
      TodoFooter
    }
  }
</script>

<style scoped>
  /*app*/
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>

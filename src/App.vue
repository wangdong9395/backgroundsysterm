<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below lalalalla
      </p>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
<<<<<<< HEAD
    <h1>这是dev02添加的代码</h1>
=======
    <h1>我是dev01提交的代码</h1>
>>>>>>> 6879ef5e2ddabed8dc84b582f54d755ec0ea970b
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
export default {
    name: 'App',
    components:{
        NavBar
    }
}
</script>

<style>
*{
    margin:0;
    padding: 0;
    box-sizing:border-box; 
}
#app {
    display: flex;
    flex-flow: column;
    align-items: center;  
}
</style>

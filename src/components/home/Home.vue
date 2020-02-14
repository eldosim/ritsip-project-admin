<template>
  <div class="home-wrapper">
    <div class="home-header">
      <img src="@/assets/images/logo.jpg" alt="">
      <span class="minipro">Mini program background management system</span>
      <span class="log-out">退出<i class="el-icon-key"></i></span>
    </div>
    
    <el-menu :router="true" :default-active="'/home/index'" active-text-color="#1D9C73" text-color="#000" 
    class="el-menu-demo home-nav" mode="horizontal" @select="handleSelect">
  <el-menu-item index="/home/index">首页</el-menu-item>
  <el-menu-item index="/home/add">写文章</el-menu-item>  
   <el-submenu index="3">
    <template slot="title">文章管理</template>
    <el-menu-item index="/home/all">所有文章</el-menu-item>
    <el-menu-item index="/home/pays">付费文章</el-menu-item>  
  </el-submenu>
  <el-menu-item index="/home/category">分类管理</el-menu-item>  
  <el-menu-item index="/home/users">用户管理</el-menu-item>
  <el-menu-item index="/home/banner">轮播图管理</el-menu-item>

</el-menu>
<div class="line" ></div>

  <router-view/>

  </div>
</template>

<script>
export default {
  methods:{
    handleSelect(e){
      console.log(e)
    }
  }
}
</script>

<style>

  .home-wrapper{
    height: 100%;
    background-color: #fff;
  }
  

  .home-header{
    height: 60px;
    background-color: #1D9C73;
    color: #fff;
    font-size: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
  }
  .home-header span{
 white-space: nowrap;
  padding-left: 6px;   
  }
  .home-header .minipro{
 white-space: nowrap;
    overflow: hidden;
  }
  .home-header .log-out{
    font-size: 16px;
  }
  .home-header img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .home-nav{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>

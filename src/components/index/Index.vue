<template>
  <div class="index-wrapper">
    <div class="main-top">
        <h1>One Belt, One Road</h1>
        <p>Ritsip, health and ideas</p>
        <p><a role="button">写文章</a></p>
      </div>

  <div class="main-bottom">
    <div class="sum first">
      <p>1024篇文章</p>
      <p>28个分类</p>
      <p>利益:1000元</p>
    </div>

    <div class="sum">
      <p>10000个用户</p>
      <p>10000个访问量</p>
    </div>

    <div class="sum">
      <p>24个商品</p>
      <p>1000个订单</p>
      <p>交易总额：1000元</p>
    </div>
  </div>


  </div>
</template>

<script>
export default {

}
</script>

<style>
  .index-wrapper{
  }

  .main-top{
     box-sizing: border-box;
    margin-top: 10px;
    height: 220px;
    padding: 20px;
    background-color: #EEEEEE;
    color: rgb(51, 68, 83);
    border-radius: 10px;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    white-space: nowrap;    
  }
  .main-top h1{
    font-size: 50px;
    margin: 0;
    
  }

  .main-top a{
    display: block;
    width: 88px;
    height: 44px;
    background-color: #1D9C73;
    color: #fff;
    text-align: center;
    line-height: 44px;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;
     font-weight: bold;
    
    
  }
   .main-top a:hover{
     
     background-color: rgb(27, 128, 96);
   }

   .main-bottom{
     width: 100%;
     justify-content: space-around;
     box-sizing: border-box;
     display: flex;
     padding: 30px 20px;
     background-color: #F8F9FB;
     flex-wrap: wrap;
   }

   .main-bottom .sum{
     -moz-box-shadow:4px 3px 5px #333333; -webkit-box-shadow:4px 3px 5px #333333; box-shadow:4px 3px 5px #333333;
     color: #fff;
     background-color: #1D9C73;
     text-align: center;
     width: 300px;
     height: 140px;
     border-radius: 10px;
     font-weight: bold;
   }
</style>

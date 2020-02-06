<template>

<div class="users-wrapper">
        <div class="users-top">

            <span class="users-left" style="float:left">
            <span class="sum-cate">共有<span style="color:red">10000</span> 个用户 </span>                       
          </span>
          
          <div  style="margin: 8px;float:right">
             <el-input
                 placeholder="请输入要查的用户ID"
                 prefix-icon="el-icon-search"
                 v-model="userid">
             </el-input>
          </div>
        
        </div>

       <el-table
       class="category-table"
    :data="tableData"
    stripe
    border
    style="width: 100%;">
    <el-table-column
      prop="id"
      label="用户ID"
      width="100">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
       width="400">
    </el-table-column>



     <el-table-column
      prop="pays"
      label="付费文章"
      width="320"
      >
    </el-table-column>

       <el-table-column
      prop="pays"
      label="收藏文章"
      width="320"
      >
    </el-table-column>
   

    
  </el-table>
  
  </div>
</template>

<script>
export default {
  data () {
    return {
      userid:'',
      tableData: [{
          id: '1024',
          username: 'blueblueblue',
          pays:80
        },{
          id: '1024',
          username: 'blueblueblue',
          pays:80
        },{
          id: '1024',
          username: 'blueblueblue',
          pays:80
        },{
          id: '1024',
          username: 'blueblueblue',
          pays:80
        },]
    }
  },
  methods:{
   
  }
}
</script>

<style>
.users-wrapper{
  padding: 10px 40px;
}
.category-reorder{
  height: 30px;
  padding: 10px 20px;
}




</style>

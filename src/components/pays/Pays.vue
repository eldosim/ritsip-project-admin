<template>
  <div class="pays-wrapper">
        <div class="pays-reorder">

          <el-button size="mini" type="success" plain>按时间排序</el-button>
          <el-button size="mini" type="danger" plain>按热度排序</el-button>
          <el-button size="mini" type="primary" plain>按购买量排序</el-button>

          <span class="statistic">
            <span class="sum-article">已售出: <span style="color:red">1000</span> 篇文章 </span>
            <span class="sum-article">交易总金额: <span style="color:red">1000</span> 元 </span>
            <span class="sum-article">赞赏总金额: <span style="color:red">1000</span> 元 </span>            
            
          </span>
        </div>

       <el-table
       class="all-table"
    :data="tableData"
    border
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="70">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
       width="370">
    </el-table-column>
    <el-table-column
      prop="category"
      label="分类"
      width="230"
      >
    </el-table-column>
    <el-table-column
      prop="time"
      label="日期"
      width="98"
      >
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格"
      width="88"
      >
    </el-table-column>
    <el-table-column
      prop="haspay"
      label="已售"
      width="88"
      >
    </el-table-column>
    <el-table-column
      prop="hot"
      label="热度"
      width="88"
      >
    </el-table-column>

     <el-table-column
      prop="collect"
      label="收藏"
      width="70"
      >
    </el-table-column>


    <el-table-column
      label="推荐"
      width="60"
      >
       <template slot-scope="scope">
         <el-switch
          v-model="scope.row.isrec"
          active-color="#13ce66"
          inactive-color="#ccc"
          >
        </el-switch>
       </template>
    </el-table-column>

   

     <el-table-column
     width="150"
      label="操作">
      <template slot-scope="scope">
          <!-- @click="handleEdit(scope.$index, scope.row)"         -->
        <el-button
          size="mini"
          type="primary"
          >编辑</el-button>
        <el-button
          size="mini"
          type="danger"
         >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
          id: '1024',
          title: 'مەن بولسام بىر ناھايىتى ئۇزۇن بولغان بىر ماۋزۇ',
          category: ' چاچ چۈشۈش كىسەللىكىلىرى',
          time:'2020-1-31',
          price:'5.00',
          haspay:'×10',
          hot:'1020032',
          isrec:true,
          collect:'1000'
        },{
          id: '1024',
          title: 'مەن بولسام بىر ناھايىتى ئۇزۇن بولغان بىر ماۋزۇ',
          category: ' چاچ چۈشۈش كىسەللىكىلىرى',
          time:'2020-1-31',
          price:'5.00',
          haspay:'×10',
          hot:'1020032',
          isrec:true,
          collect:'1000'
        },{
          id: '1024',
          title: 'مەن بولسام بىر ناھايىتى ئۇزۇن بولغان بىر ماۋزۇ',
          category: ' چاچ چۈشۈش كىسەللىكىلىرى',
          time:'2020-1-31',
          price:'5.00',
          haspay:'×10',
          hot:'1020032',
          isrec:true,
          collect:'1000'
        },]
    }
  }
}
</script>

<style>
.pays-wrapper{
  
}
.all-table{
  border-radius: 10px;
}
.pays-wrapper .pays-reorder{
  padding: 10px;
}

.statistic{
  float: right;
}
.statistic .sum-article{
  padding:0 8px;
  color: #999;
  font-size: 14px;
}
</style>

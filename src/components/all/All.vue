<template>
  <div class="all-wrapper">
    <div class="all-aside">
      <el-menu
      default-active="1"
      class="el-menu-vertical-demo cate"
      background-color="#1D9C73"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <i class="el-icon-s-grid"></i>
        <span>بارلىق مەزمۇنلار1000</span>
      </el-menu-item>

            <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق 100</span>
      </el-menu-item>

            <el-menu-item index="3">
        <i class="el-icon-copy-document"></i>
        <span>ساغلاملىق 50</span>
      </el-menu-item>


            <el-menu-item index="4">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>

            <el-menu-item index="5">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>


            <el-menu-item index="6">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>


            <el-menu-item index="7">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>


            <el-menu-item index="8">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>


            <el-menu-item index="9">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>


            <el-menu-item index="10">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>

            <el-menu-item index="11">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>

            <el-menu-item index="12">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>

            <el-menu-item index="13">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>

            <el-menu-item index="14">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>

            <el-menu-item index="15">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>

            <el-menu-item index="16">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>

            <el-menu-item index="17">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>

            <el-menu-item index="18">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>

            <el-menu-item index="19">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>

            <el-menu-item index="20">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>

            <el-menu-item index="21">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>

            <el-menu-item index="22">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>

            <el-menu-item index="23">
        <i class="el-icon-menu"></i>
        <span>ساغلاملىق</span>
      </el-menu-item>
      
    </el-menu>
    </div>


    <div class="all-main">
        <div class="all-reorder">
          <el-button size="mini" type="success" plain>按时间排序</el-button>
          <el-button size="mini" type="danger" plain>按热度排序</el-button>
          <el-button size="mini" type="warning" plain>按收藏排序</el-button>          
          <el-button class="add-btn" size="mini" type="primary" plain>推荐文章</el-button>

          <div style="margin: 8px;" class="search-input" >
            <el-input placeholder="请输入搜索内容" v-model="input3" class="input-with-select">
              <el-select style="width:90px" v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="关键词" value="1"></el-option>
                <el-option label="id" value="2"></el-option>
              </el-select>
              <el-button 
               slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
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
      width="66">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
       width="360">
    </el-table-column>
    <el-table-column
      prop="category"
      label="分类"
      width="220"
      >
    </el-table-column>
    <el-table-column
      prop="time"
      label="日期"
      width="98"
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
  </div>
</template>

<script>
export default {
 data() {
      return {
        select:"",
        input3:"",
        tableData: [{
          id: '1024',
          title: 'مەن بولسام بىر ناھايىتى ئۇزۇن بولغان بىر ماۋزۇ',
          category: ' چاچ چۈشۈش كىسەللىكىلىرى',
          time:'2020-1-31',
          hot:'1020032',
          isrec:true,
          collect:'1000'
        },{
          id: '1024',
          title: 'مەن بولسام بىر ناھايىتى ئۇزۇن بولغان بىر ماۋزۇ',
          category: ' چاچ چۈشۈش كىسەللىكىلىرى',
          time:'2020-1-31',
          hot:'1020032',
          isrec:true,
          collect:'1000'
        },{
          id: '1024',
          title: 'مەن بولسام بىر ناھايىتى ئۇزۇن بولغان بىر ماۋزۇ',
          category: ' چاچ چۈشۈش كىسەللىكىلىرى',
          time:'2020-1-31',
          hot:'1020032',
          isrec:true,
          collect:'1000'
        },{
          id: '1024',
          title: 'مەن بولسام بىر ناھايىتى ئۇزۇن بولغان بىر ماۋزۇ',
          category: ' چاچ چۈشۈش كىسەللىكىلىرى',
          time:'2020-1-31',
          hot:'1020032',
          isrec:true,
          collect:'1000'
        },{
          id: '1024',
          title: 'مەن بولسام بىر ناھايىتى ئۇزۇن بولغان بىر ماۋزۇ',
          category: ' چاچ چۈشۈش كىسەللىكىلىرى',
          time:'2020-1-31',
          hot:'1020032',
          isrec:true,
          collect:'1000'
        },
        
        ]
      }
    },
    methods:{
    getImgUrl(icon){
      return require("@/assets/"+icon);
    }
    }
}
</script>

<style>
.all-wrapper{

  background-color: #F8F9FB;
  display: flex;
}

.all-wrapper .all-main{
  padding:0 20px;
  flex: 1;
}
.img{
  width: 60px;
  height: 60px;
  border-radius: 10px;
}

.all-reorder button{
  margin-top: 18px;
}
.search-input{
  width: 400px;
  float: right;
 
}


</style>

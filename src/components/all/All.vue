<template>
  <div class="all-wrapper">
    <div class="all-aside">
      <el-menu
      :default-active="activeindex"
      class="el-menu-vertical-demo cate"
      background-color="#1D9C73"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item @click="changecate('all')" index="all">
        <i class="el-icon-s-grid"></i>
        <span>بارلىق مەزمۇنلار{{allCount}}</span>
      </el-menu-item>

      <el-menu-item @click="changecate(item._id)" v-for="item in cates" :key="item._id"  :index="item._id">
        <i class="el-icon-menu"></i>
        <span>{{item.sum}} {{item.catename}}</span>
      </el-menu-item>
      
    </el-menu>
    </div>


    <div class="all-main">
        <div class="all-reorder">
          <el-button @click="sortby('time')" size="mini" type="success" plain>按时间排序</el-button>
          <el-button @click="sortby('hot')" size="mini" type="danger" plain>按热度排序</el-button>
          <el-button @click="sortby('keep')" size="mini" type="warning" plain>按收藏排序</el-button>          
          <el-button @click="sortby('rec')" class="add-btn" size="mini" type="primary" plain>推荐文章({{recCount}})</el-button>

          <div style="margin: 8px;" class="search-input" >
            <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
              <el-select style="width:90px" v-model="select" slot="prepend" placeholder="结果">
                <el-option value="1" :label="keyResult?'有'+keyResult+'条结果':'无数据'" disabled></el-option>
              </el-select>

              <el-button 
               slot="append" @click="submitKey" icon="el-icon-search"></el-button>
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
      align="center"          
      type="index"
      width="38">
    </el-table-column>
    <el-table-column
      align="center"                 
      prop="artname"
      label="标题"
       width="360">
    </el-table-column>
    <el-table-column
      align="center"
      :formatter="formatCate"    
      prop="artcateid"
      label="分类"
      width="200"
      >
    </el-table-column>
    <el-table-column
      align="center"    
      prop="arttime"
      label="日期"
      width="84"
      :formatter="formatTime"
      >
    </el-table-column>


    <el-table-column
      align="center"        
      prop="arthot"
      label="热度"
      width="80"
      >
    </el-table-column>

     <el-table-column
      align="center"             
      prop="artkeep"
      label="收藏"
      width="60"
      >
    </el-table-column>

    
    <el-table-column
      align="center"                 
      label="付费"
      width="61"
      >
       <template slot-scope="scope">
         <el-switch
          v-model="scope.row.ispay"
          active-color="#13ce66"
          inactive-color="#ccc"
          disabled
          >
        </el-switch>
       </template>
    </el-table-column>

    <el-table-column
      align="center"                 
      label="推荐"
      width="61"
      >
       <template slot-scope="scope">
         <el-switch
          :disabled="recDis"
          @change="recart(scope.row._id)"
          v-model="scope.row.isrec"
          >
        </el-switch>
       </template>
    </el-table-column>

   

     <el-table-column
      align="center"               
     width="150"
      label="操作">
      <template slot-scope="scope">
          <!-- @click="handleEdit(scope.$index, scope.row)"         -->
        <el-button
          @click="editBtn(scope.row._id)"
          size="mini"
          type="primary"
          >编辑</el-button>
        <el-button
          @click="delart(scope.row._id,scope.row.artcateid)"
          :disabled="delDis"
          size="mini"
          type="danger"
         >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>

    <!-- ========================编辑文章========================== -->

<el-dialog :title="'正在编辑: '+addForm.artname+'('+addForm._id+')'" :visible.sync="editFormVisible" width="94%" @close="closeEvent">
  <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
   <el-form label-width="80px" :rules="addrules" :model="addForm" ref="addForm" 
   class="demo-ruleForm add-wrapper">
  
    <el-form-item prop="arttext" class="textarea">
      <el-input 
        style="text-align:right;"
        :autosize="{ minRows: 10}"
         type="textarea"
         placeholder="请输入正文"
         v-model="addForm.arttext">
      </el-input>
    </el-form-item >
    <div class="formarea">
      <el-form-item  label="标题" prop="artname">
        <el-input v-model="addForm.artname" placeholder="请输入文章标题"></el-input>
      </el-form-item>

      <el-form-item label="文章封面" prop="arturl">
        <el-input disabled width="100px" v-model="addForm.arturl" placeholder="请上传图片"></el-input>
      </el-form-item>

       <el-upload
      ref="artupload"
      :on-remove="removepic"
      style="textAlign:left;marginLeft:80px;marginBottom:10px"
      :limit='1'
      class="avatar-uploader"
      action="http://localhost:8888/api/upload/artpic"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

       <el-form-item label="分类" prop="artcateid">
          <el-select label="" v-model="addForm.artcateid" placeholder="请选择文章分类">
            <el-option v-for="item in cates" :key="item._id"
             :label="item.catename" :value="item._id" ></el-option>
             <!-- @change="selectGetId" -->
          </el-select>
      </el-form-item>

      <el-form-item label="推荐文章">
        <el-switch v-model="addForm.isrec"></el-switch>
      </el-form-item>
      
      <el-form-item label="付费">
        <el-switch v-model="addForm.ispay"></el-switch>
      </el-form-item>
 <!-- :required="addForm.ispay"  -->
        <el-form-item label="付费金额" prop="artprice"
         :rules="addForm.ispay?[
         { required: true, message: '开启付费状态时，额度不能为空' },
          { type: 'number',min:1, message: '额度必须为数字值'}]:
         [{ required: false }]"
        >
      <el-input :disabled="!addForm.ispay"  v-model.number="addForm.artprice"
       placeholder="请输入文章金额"  clearable :maxlength="32"></el-input>
       </el-form-item>

    </div>
    </el-form>
  <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
  <div slot="footer" class="dialog-footer">
    <el-button @click="editFormVisible = false">取 消</el-button>
    <el-button @click="resetForm">重置</el-button>
    <el-button type="primary" @click="submitForm" :disabled="submitbtn">提交</el-button>
  </div>

</el-dialog>
    <!-- ========================编辑文章========================== -->

  </div>
</template>

<script>
export default {
 data() {
      return {
        // 以下是编辑文章对话框数据
        ifdelete:'',
        imageUrl:'',
        addForm: {
          artname: '',
          artcateid:'',
          arturl:'',
          arttext:'',
          isrec:false,          
          ispay:false,
          artprice:''
        },
        addrules: {
          artname: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { min: 3, max: 68, message: '长度在 4 到 64 个字符', trigger: 'blur' }
          ],
          arturl:[
            { required: true, message: '请上传图片', trigger: 'blur' }
          ],
           arttext:[
            { required: true, message: '正文不能为空', trigger: 'blur' }
          ],        
           artcateid:[
            { required: true, message: '请选择文章分类', trigger: 'blur' }
          ]
        },
        submitbtn:false ,
        editFormVisible:false,
        // 以下是文章页数据
        recDis:false,
        delDis:false,
        recCount:'',
        allCount:'',
        sort:'time',
        activecateid:'all',
        activeindex:'all',
        cates:[],
        select:"",
        search:'',
        keyResult:'',
        tableData: [],
        
      }
    },
    created(){
      this.getAllcates()
      this.getArticles()
    },
    methods:{
    // =====================methods===========================
    // 编辑文章-----------------------------------------
    async editBtn(id){
      this.editFormVisible=true
      var res = await this.$http.get('/getoneart',{params:{id:id}})
      if(res.data.status==200){
        console.log(res)
        this.addForm = res.data.data
        this.imageUrl = res.data.data.arturl
      }else{
        this.$message({
          message:res.data.data,
          type:"error"
        })
      }

    },
     // 提交表单
      submitForm(){
         this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.submitbtn=true            
            this.$http.post(`/updateart/${this.addForm._id}`,this.addForm)
            .then(res => {
              console.log(res)
              if(res.data.status==200){                 
                  this.$message({
                  message: res.data.msg,
                  type: 'success'
                })      
                 this.getAllcates()           
                 this.$refs.artupload.clearFiles();
                 this.$refs.addForm.resetFields();
                 this.addForm.artprice='';                               
                 this.addForm._id='';                               
                 this.imageUrl=''
                 this.ifdelete=''
                 this.submitbtn=false
                 this.editFormVisible=false
                 this.getArticles('update')
               }else{
                  this.$message({
                    message: res.data.msg,
                    type: 'error'
                 })
                 this.submitbtn=false                 
               }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 重置表单
      closeEvent(){
         this.$refs.addForm.resetFields();
         this.$refs.artupload.clearFiles();
         this.addForm.isrec=false;
         this.addForm.ispay=false;
         this.imageUrl=''
         this.ifdelete=''
      },
       resetForm() {
          this.$confirm('正文也会重置的哦！确定重置表单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs.addForm.resetFields();
          this.$refs.artupload.clearFiles();
          this.addForm.isrec=false;
          this.addForm.ispay=false;
          this.imageUrl=''
          this.ifdelete=''
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });          
        });
      },
      // 删除图片时调用
      async removepic() {
      // var ifdelete=this.ifdelete
      const res = await this.$http.get('/deletepic', {
        params: {
          picurl: this.ifdelete
        }
      })
      this.ifdelete=''
      this.addForm.arturl=''
      this.imageUrl=''

      
    },
      // 上传图片后调用====================
      handleAvatarSuccess(res, file){
        console.log(res)
        if(res.status==200){
          this.addForm.arturl=res.data
          this.ifdelete=res.ifdelete
          this.imageUrl = URL.createObjectURL(file.raw);
        }else{
          this.$message({
             message:"上传图片失败！",
             type:"error"
           })
        }
      },
      //上传图片前调用========================
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 
        file.type === 'image/png' || file.type === 'image/x-png' || file.type === 'image/pjpeg';
        console.log(file.size)
        const isLt2M = file.size / 1024 / 1024 < 1; 
        if (!isJPG) {
          this.$message.error('上传图片格式错误!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 1MB!');
        }
        return isJPG && isLt2M;
      },
    //更换推荐状态 ----------------------------------------------------------
    async recart(id){
      this.recDis = true
       var res = await this.$http.get('/delrecarticle',{
          params:{id:id,how:'rec'}
       })

       if(res.data.status == '200'){
            this.$message({
             message: res.data.msg,
             type: 'success'
            })
            this.recCount = res.data.count
          }else{
            this.$message({
             message: res.data.msg,
             type: 'error'
            }) 
        }
          this.recDis = false                 
    },
    // 删除文章（参数： id ,cateid ）
    async delart(id,cateid){
      this.delDis = true
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () =>{
          var res = await this.$http.get('/delrecarticle',{
          params:{id:id,how:'del',cateid:cateid}
          })
          if(res.data.status == '200'){
            this.$message({
             message: res.data.msg,
             type: 'success'
            })
            var index = this.tableData.findIndex(item => item._id == id)
            this.tableData.splice(index,1)
            var cateindex = this.cates.findIndex(item => item._id == cateid)
            this.cates[cateindex].sum = res.data.count
          }else{
            this.$message({
             message: res.data.msg,
             type: 'error'
            })          
          }
          this.delDis = false
          }).catch(()=>{
            this.$message({
              message:"已取消删除",
              type:'error'
            })
          this.delDis = false
          })
      
         
    },
    // 根据activeindex获取分类id并发送请求
    changecate(id){
      if(this.sort == 'rec'){
        this.sort = 'time'
      }
      if(this.sort == 'key'){
        this.sort = 'time'
      }
      this.activecateid=id
      this.activeindex=id
      this.getArticles()    
      this.select=""
      this.search=''
      this.keyResult=''  
    },
    // 提交关键字
    submitKey(){
      if(!this.search){
        this.$message({
           message: "请输入关键字",
           type: 'error'
        })
        return
      }
      this.sort = 'key'
      this.activecateid = 'all'
      this.activeindex = 'all'
      this.getArticles('key')
      this.select="结果"
    },
    // 根据参数改排序方式并发请求
    sortby(how){
      if(how == 'rec'){
        this.activecateid = 'all'
        this.activeindex = 'all'
      }
      this.sort=how
      this.getArticles(how)    
      
      this.select=""
      this.search=''
      this.keyResult=''
    },
    // 获取文章数据(根据分类和排序方式)
    async getArticles(how){
      if(how == 'update'){
        this.sort='time'
        this.activecateid = 'all'
        this.activeindex = 'all'

      }
      var res = await this.$http.get('/getarticles',{
        params:{
          sort:this.sort,
          cateid:this.activecateid,
          search:this.search
        }
      })
      this.tableData = res.data.data
      this.allCount = res.data.allcount
      if(how=='rec'){
        this.recCount = res.data.curcount
      }
      if(how=='key'){
        this.keyResult = res.data.curcount
      }
      console.log(res)
    },
    // 获取侧边分类
    async getAllcates(){
      var res = await this.$http.get("/getcates")
      if(res.data.status=="200"){
        this.cates=res.data.data
      }else{
      console.log(res.data.err)        
      }
    },
    // 格式化日期时间
    formatTime(row, column) {
        const date = new Date(row[column.property])
        return date.getFullYear() + '-' +
          date.getMonth() + '-' +
          date.getDate() //+ '- ' +
          // date.getHours() + ':' +
          // date.getMinutes()
    },
    // 格式化分类名称
    formatCate(row, column){
      var id = row[column.property]
      var cate = this.cates.find(item => item._id == id)
      return cate.catename
    }
    // =====================methods===========================
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
/* ----------------------------- */
.add-wrapper{
    background-color: #F8F9FB;
    display: flex;
    margin-top:10px;
    flex-wrap: wrap;
  }

  .textarea,
  .formarea{
    flex:1;
    box-sizing: border-box;
  }
  .textarea{
    padding: 40px 20px 40px 40px;
  }
  .textarea .el-form-item__content{
    margin: 0 !important;

  }
  .formarea{
    padding: 40px 0;
    padding-right: 40px;
    
  }

  .base-img{
    width: 90px;
    height: 90px;
    margin-left:80px;
  }

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }

</style>

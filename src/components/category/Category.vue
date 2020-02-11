<template>

<div class="category-wrapper" align="center">
        <div class="category-reorder">

            <span class="cate-top" style="float:left">
            <span class="sum-cate">共有 <span style="color:red">{{catesCount}}</span> 个分类 </span>                       
          </span>
          <el-button style="float:right" @click="addCate" size="mini" type="primary" plain>添加分类</el-button>
        
        </div>

       <el-table
       class="category-table"
    :data="tableData"
    stripe
    style="width: 100%;">
    <el-table-column
        align="center"          
      type="index"
      width="100">
    </el-table-column>
    <el-table-column
      prop="catename"
      label="分类名称"
       width="320">
    </el-table-column>

      <el-table-column
      label="封面"
      width="140"
      >
       <template slot-scope="scope">
         <img class="img" :src="scope.row.cateurl" alt="">
       </template>
    </el-table-column>

    <el-table-column
        align="center"      
      prop="sum"
      label="文章总量"
      width="180"
      >
    </el-table-column>


    <el-table-column
        align="center"          
      prop="cateindex"
      label="层次"
      width="180"
      >
    </el-table-column>


     <el-table-column
        align="center"           
     width="300"
      label="操作">
      <template slot-scope="scope">
          <!-- @click="handleEdit(scope.$index, scope.row)"         -->
        <el-button
          :disabled="scope.row.catename=='ساغلاملىق'"
          size="mini"
          type="primary"
          @click="editCate(scope.row._id)"
          >编辑</el-button>
         <el-button
         :disabled="scope.row.catename=='ساغلاملىق'"
          size="mini"
          type="danger"
          @click="delCate(scope.row._id)"
         >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  

<el-dialog title="添加分类" :visible.sync="addFormVisible" @close="closeEvent">

  <el-form :model="cateAddform" :rules="cateAddrules" ref="cateAddform">
    <el-form-item label="分类名称" label-width="120px" prop="catename">
      <el-input placeholder="请输入分类名称" v-model="cateAddform.catename" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item  label="层次" label-width="120px" prop="cateindex">
      <el-input placeholder="请输入分类层次数（数字越小，层次越高!）" type="number" v-model="cateAddform.cateindex" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="分类封面Url" label-width="120px" prop="cateurl">
      <el-input disabled v-model="cateAddform.cateurl" autocomplete="off"></el-input>
    </el-form-item>

    <el-upload
      ref="cateupload"
      :on-remove="removepic"
      style="textAlign:left;marginLeft:120px"
      :limit='1'
      class="avatar-uploader"
      action="http://localhost:8888/api/upload/catpic"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>



  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitNewcate">添加</el-button>
  </div>
</el-dialog>


<el-dialog title="编辑分类" :visible.sync="editFormVisible" @close="editcloseEvent">

  <el-form :model="cateEditform" :rules="cateEditrules" ref="cateEditform">
    <el-form-item label="分类" label-width="120px" prop="catename">
      <el-input placeholder="请输入分类名称" v-model="cateEditform.catename" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item  label="层次" label-width="120px" prop="cateindex">
      <el-input placeholder="请输入分类层次数（数字越小，层次越高!）" type="number"
       v-model="cateEditform.cateindex" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="分类封面Url" label-width="120px" prop="cateurl">
      <el-input disabled v-model="cateEditform.cateurl" autocomplete="off"></el-input>
    </el-form-item>

    <el-upload
      ref="cateEditupload"
      :on-remove="removepic"
      style="textAlign:left;marginLeft:120px"
      :limit='1'
      class="avatar-uploader"
      action="http://localhost:8888/api/upload/catpic"
      :on-success="EditAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>



  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitEditcate">确定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      catesCount:'',
      addFormVisible:false,
      imageUrl: '',
      ifdelete:'',
      cateAddform: {
          catename: '',
          cateindex:'',
          cateurl:''
        },
      cateAddrules: {
         cateurl:[
        {required:true,message:"请上传图片",trigger: 'blur'}
        ],
        catename: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 3, max:30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        cateindex: [
          { required: true, message: '请输入分类index数字！', trigger: 'blur' },
          { min: 1, max:2, message: '必须是1到99之间的数字', trigger: 'blur' }
        ]
     
      },
      editFormVisible:false,
       cateEditform: {
          catename:'',
          cateindex:'',
          cateurl:'',
          _id:''
        },
      cateEditrules: {
         cateurl:[
        {required:true,message:"请上传图片",trigger: 'blur'}
        ],
        catename: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 3, max:30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        cateindex: [
          { required: true, message: '请输入分类index数字！', trigger: 'blur' },
          { min: 1, max:2, message: '必须是1到99之间的数字', trigger: 'blur' }
        ]
     
      },
      tableData: []
    }
  },
  created(){
    this.getAllcates()

  },
  methods:{
    async getAllcates(){
      var res = await this.$http.get("/getcates")
      if(res.data.status=="200"){
        this.tableData=res.data.data
        this.catesCount=res.data.data.length
      }else{
      console.log(res.data.err)        
      }
      // console.log(res)
    },
    getImg(url){
      return require("@/assets/"+url)
    },
    async editCate(id){
      this.editFormVisible=true  
      var res = await this.$http.get('/getonecate',{
        params:{
          id:id
        }
      })
      if(res.data.status=="200"){
      // console.log(res.data.data[0])        
       this.cateEditform = res.data.data[0]   
       this.imageUrl = res.data.data[0].cateurl
      }else{
      console.log("获取数据失败")        
      }
    },
      delCate(id){

      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.get('/delcate',{
              params:{
                id:id
              }
            })
            .then(res => {
               if(res.data.status==200){
               this.$message({
                  message: res.data.msg,
                  type: 'success'
               })
               this.getAllcates();        
               }else{
               this.$message({
                  message: res.data.msg,
                  type: 'error'
               })
             }
            })
            
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   

    },

    async removepic() {
      // var ifdelete=this.ifdelete
      const res = await this.$http.get('/deletepic', {
        params: {
          picurl: this.ifdelete
        }
      })
      this.ifdelete=''
      this.cateAddform.cateurl=''
      this.cateEditform.cateurl=''
      this.imageUrl=''

      
    },

    addCate(){
      this.addFormVisible=true      
    },
    editcloseEvent(){
      this.$refs.cateEditupload.clearFiles();
      this.$refs.cateEditform.resetFields();
      this.ifdelete=''
      this.imageUrl=''
    },
    closeEvent(){
      this.$refs.cateupload.clearFiles();
      this.$refs.cateAddform.resetFields();
      this.ifdelete=''
      this.imageUrl=''
    },
    submitEditcate(){
      this.$refs.cateEditform.validate(valid => {

             if (valid) {
                 this.$http.get(`/updatecate/${this.cateEditform._id}`,{
                   params :{
                     catename:this.cateEditform.catename,
                     cateurl:this.cateEditform.cateurl,
                     cateindex:this.cateEditform.cateindex
                   }
                   }).then(res => {
                     if(res.data.status==200){                 
                        this.$message({
                        message: res.data.msg,
                        type: 'success'
                      })
                      this.getAllcates()
                      this.editFormVisible=false
                     }else{
                        this.$message({
                          message: res.data.msg,
                          type: 'error'
                       })
                     }
                   })
             } else {
               // 校验失败
               console.log("校验失败")
               return false
             }
           })
    },
    submitNewcate(){
      // ref 用在组件中，就表示当前组件
      // this.$refs.loginForm
      this.$refs.cateAddform.validate(valid => {
        // valid 表示是否校验成功，如果成功就为：true
        // 如果失败就为：false
        if (valid) {
            this.$http.get('/addcate',{
              params :{
                catename:this.cateAddform.catename,
                cateurl:this.cateAddform.cateurl,
                cateindex:this.cateAddform.cateindex
              }
              }).then(res => {
                if(res.data.status==200){                 
                   this.$message({
                   message: res.data.msg,
                   type: 'success'
                 })
                 this.getAllcates()
                 this.addFormVisible=false
                }else{
                   this.$message({
                     message: res.data.msg,
                     type: 'error'
                  })
                }
              })
        } else {
          // 校验失败
          console.log("校验失败")
          return false
        }
      })
  
    },
    EditAvatarSuccess(res,file){
     console.log(res,file)
        if(res.status==200){
          this.cateEditform.cateurl=res.data
          this.ifdelete=res.ifdelete
          this.imageUrl = URL.createObjectURL(file.raw);
        }else{
           this.$message({
             message:"上传图片失败！",
             type:"error"
           })
        }
       
    },
    handleAvatarSuccess(res, file) {
        console.log(res,file)
        if(res.status==200){
          this.cateAddform.cateurl=res.data
          this.ifdelete=res.ifdelete
          this.imageUrl = URL.createObjectURL(file.raw);
        }else{
          this.$message({
             message:"上传图片失败！",
             type:"error"
           })
        }
       
      },
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
      }
    
  }
}
</script>

<style>
.category-wrapper{
  padding: 10px 40px;
}
.category-reorder{
  height: 30px;
  padding: 10px 20px;
}
.category-table{
  border-radius: 10px;
}

.img{
  width: 70px;
  height: 70px;
  border-radius: 50%;
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

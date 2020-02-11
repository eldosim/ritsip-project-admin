<template>
  <div class="pays-wrapper">
        <div class="pays-reorder">

          <el-button @click="getAllpays('time')" size="mini" type="success" plain>按时间排序</el-button>
          <el-button @click="getAllpays('hot')" size="mini" type="danger" plain>按热度排序</el-button>
          <el-button @click="getAllpays('sold')" size="mini" type="primary" plain>按购买量排序</el-button>

          <span class="statistic">
            <span class="sum-article">有 <span style="color:red">{{soldartCount}}</span> 篇付费文章 </span>            
            <span class="sum-article">已售出: <span style="color:red">1000</span> 篇文章 </span>
            <span class="sum-article">交易总金额: <span style="color:red">1000</span> 元 </span>
            
          </span>
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
       width="380">
    </el-table-column>

    <el-table-column
      align="center"
      :formatter="formatCate"    
      prop="artcateid"
      label="分类"
      width="202"
      >
    </el-table-column>

    <el-table-column
      align="center"    
      prop="arttime"
      label="日期"
      width="100"
      :formatter="formatTime"
      >
    </el-table-column>

    <el-table-column
      align="center"        
     :formatter="formatYuan"
      prop="artprice"
      label="价格"
      width="86"
      >
    </el-table-column>
    <el-table-column
     :formatter="formatSold"
      align="center"        
      prop="artsold"
      label="已售"
      width="86"
      >
    </el-table-column>
    <el-table-column
      align="center"            
      prop="arthot"
      label="热度"
      width="86"
      >
    </el-table-column>

     <el-table-column
      align="center"                 
      prop="artkeep"
      label="收藏"
      width="70"
      >
    </el-table-column>

    <el-table-column
      align="center"                
      label="付费"
      width="66"
      >
       <template slot-scope="scope">
         <el-switch
          :disabled="payDis"
          v-model="scope.row.ispay"
          active-color="#13ce66"
          inactive-color="#ccc"
          >
        </el-switch>
       </template>
    </el-table-column>

    <el-table-column
      align="center"                
      label="推荐"
      width="66"
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
     width="140"
      label="操作">
      <template slot-scope="scope">
          <!-- @click="handleEdit(scope.$index, scope.row)"         -->
        <el-button
          @click="editBtn(scope.row._id)"
          size="mini"
          type="danger"
          >编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- ============================================================================ -->
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
  data () {
    return {
     cates:[],
      ifdelete:'',
      imageUrl:'',
      addForm: {
        artname: '',
        artcateid:'',
        arturl:'',
        arttext:'',
        isrec:false,          
        ispay:true,
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
      // ===============================
      tableData: [],
      soldartCount:0,
      payDis:true,
      recDis:false
    }
  },
  created(){
    this.getAllpays('time')
  },
  methods:{
    // ===================methods======================
     // 编辑文章-----------------------------------------
    async editBtn(id){
      this.getcateidname()
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
                 this.getAllpays('time')           
                 this.$refs.artupload.clearFiles();
                 this.$refs.addForm.resetFields();
                 this.addForm.artprice='';                               
                 this.addForm._id='';                               
                 this.imageUrl=''
                 this.ifdelete=''
                 this.submitbtn=false
                 this.editFormVisible=false
                 
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
         this.addForm.ispay=true;
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
      // 获取选择的分类id
      async getcateidname(){
        var res = await this.$http.get('/cateidname')
        this.cates = res.data.data
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
    // ----------------------------------------------------编辑完成
    // 获取所有文章(参数：time，hot，sold)
    async getAllpays(how){
      var res = await this.$http.get(`/getsoldart/${how}`)
      this.tableData=res.data.data
      this.soldartCount=res.data.count
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
    // 格式化分类名称
    formatCate(row, column){
      return row[column.property].catename
    },
    // 格式化单位
    formatYuan(row, column){
      return row[column.property]+'元'
    },
    // 格式化够量
    formatSold(row,column){
      return row[column.property]+'×1'      
    }
    // ===================methods======================
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

<template>

  <div class="banner-wrapper">
    <div class="art-banner">
      <div class="banner-title">首页轮播图</div>
       <div class="banner-main">
          <el-form :inline="true" label-position="left" ref="artForm" :model="artWrapper" >
            <div class="banner-item" v-for="(item,index) in artWrapper.artForm" :key="item.picurl">
              <div class="banner-img">
                <img :src="item.picurl" alt="">
                <div class="bannerIndex">{{index+1}}</div>
              </div>
              <div style="width:300px">
              <el-form-item style="position:relative;top:10px" label="URL地址" :prop="'artForm.'+index+'.url'" 
              :rules="[{ required: true, message: 'URL地址不能为空', trigger: 'blur' }]">
                <el-input v-model="item.url" placeholder="请输入轮播图要连接的url地址"></el-input>
                 <el-button
                  :disabled="delDis"
                  @click="artDelbtn(index)"
                  class="delBannerBtn"
                  size="mini"
                  type="danger"
                 >删除</el-button>
              </el-form-item> 
              </div>
            </div>
          </el-form>
          <el-upload
           :show-file-list="false"
           ref="artBannerupload"
            class="upload-demo"
            drag
            :on-success="ArtUploadChange"
            :before-upload="beforeAvatarUpload"
            action="http://localhost:8888/api/upload/banner"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1m</div>
          </el-upload>
          <div class="saveBtn">
                 <el-button
                  :disabled="saveDis"                 
                  size="medium"
                  type="primary"
                  @click="artBannerSubmit('art')"
                 >保存</el-button>
                 <el-button
                  @click="resetArt"
                  :disabled="saveDis"
                  size="medium"
                 >重置</el-button>
          </div>
       </div>
     </div>
    
    
    <!-- =============================================================================== -->
    
    
    
    
    <div class="pro-banner">
      <div class="banner-title">商品页轮播图</div>
      <!-- <!-=================================--> 
       <div class="banner-main">
          <el-form :inline="true" label-position="left" ref="proForm" :model="proWrapper" >
            <div class="banner-item" v-for="(item,index) in proWrapper.proForm" :key="item.picurl">
              <div class="banner-img">
                <img :src="item.picurl" alt="">
                <div class="bannerIndex">{{index+1}}</div>
              </div>
              <div style="width:300px">
              <el-form-item style="position:relative;top:10px" label="URL地址" :prop="'proForm.'+index+'.url'" 
              :rules="[{ required: true, message: 'URL地址不能为空', trigger: 'blur' }]">
                <el-input v-model="item.url" placeholder="请输入轮播图要连接的url地址"></el-input>
                 <el-button
                  :disabled="delDis"
                  @click="proDelbtn(index)"
                  class="delBannerBtn"
                  size="mini"
                  type="danger"
                 >删除</el-button>
              </el-form-item> 
              </div>
            </div>
          </el-form>
          <el-upload
           :show-file-list="false"
           ref="proBannerupload"
            class="upload-demo"
            drag
            :on-success="ProUploadChange"
            :before-upload="beforeAvatarUpload"
            action="http://localhost:8888/api/upload/banner"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1m</div>
          </el-upload>
          <div class="saveBtn">
                 <el-button
                  :disabled="saveDis"                 
                  size="medium"
                  type="primary"
                  @click="proBannerSubmit()"
                 >保存</el-button>
                 <el-button
                  @click="resetPro"
                  :disabled="saveDis"
                  size="medium"
                 >重置</el-button>
          </div>
       </div>
      <!-- ====================================== -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
     return {
       delDis:false,
       saveDis:false,
       artWrapper:{
        artForm:[]
       },
       proWrapper:{
        proForm:[]
       }
     
     }
  },
  created(){
    this.getArtBanner()
    this.getProBanner()
  },
  methods: {
    // ==========methods===================
     //上传图片前调用========================public
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 
      file.type === 'image/png' || file.type === 'image/x-png' || file.type === 'image/pjpeg';
      const isLt2M = file.size / 1024 / 1024 < 1; 
      if (!isJPG) {
        this.$message.error('上传图片格式错误!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 1MB!');
      }
      return isJPG && isLt2M;
    },
    // 商品轮播图===================================
     resetPro(){
      this.getProBanner()
      this.$message({
        message:"已重新获取轮播图最新数据！",
        type:"success"
      })
    },
    proDelbtn(index){
      this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
        confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(async () => {
        this.delDis=true        
        await this.$http.get('/deletepic',{params:{
        picurl:this.proWrapper.proForm[index].ifdelete
        }})
        this.proWrapper.proForm.splice(index,1)     
        await this.$http.post(`/upbanner/pro`,{info:this.proWrapper.proForm}) 
        this.$message({
          message:"删除成功！",
          type:"success"
        })
        this.delDis=false         
      }).catch(()=>{
        this.$message({
          message:"已取消操作",
          type:'error'
        })
        this.delDis=false        
      })

    },
    async getProBanner(){
      var res = await this.$http.get(`/getbanner/pro`)
      this.proWrapper.proForm = res.data.data
    },
    ProUploadChange(file,fileList){
      if(file.status==200){
        this.$message({
          message:"图片上传成功！已添加一项",
          type:'success'
        })
        this.proWrapper.proForm.push({
          picurl:file.data,
          ifdelete:file.ifdelete,
          url:''
        })

          this.$refs.proBannerupload.clearFiles();      

      }else{
        this.$message({
          message:"图片上传失败！请重试",
          type:'error'
        })
        this.$refs.proBannerupload.clearFiles();  
      }
    },
    async proBannerSubmit(){
      if(this.proWrapper.proForm.length==0){
        this.$message({
          message:"请添加轮播图！（至少一项）",
          type:"error"
        })
        return
      }
    this.saveDis=true
    this.$refs.proForm.validate(async valid => {
      if(valid){
        var res = await this.$http.post(`/upbanner/pro`,{info:this.proWrapper.proForm})
        if(res.data.status==200){
          this.$message({
            message:res.data.msg,
            type:'success'
          })
        }else{
           this.$message({
            message:res.data.msg,
            type:'error'
          })
        }
        this.saveDis=false 
      }else{
          this.saveDis=false
      }
      this.saveDis=false
    })
      
    },
    // ====================边界线=========================
    // 文章页轮播图====================
    resetArt(){
      this.getArtBanner()
      this.$message({
        message:"已重新获取轮播图最新数据！",
        type:"success"
      })
    },
    artDelbtn(index){
      this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
        confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(async () => {
        this.delDis=true        
        await this.$http.get('/deletepic',{params:{
        picurl:this.artWrapper.artForm[index].ifdelete
        }})
        this.artWrapper.artForm.splice(index,1)     
        await this.$http.post(`/upbanner/art`,{info:this.artWrapper.artForm}) 
        this.$message({
          message:"删除成功！",
          type:"success"
        })
        this.delDis=false         
      }).catch(()=>{
        this.$message({
          message:"已取消操作",
          type:'error'
        })
        this.delDis=false        
      })

    },
    async getArtBanner(){
      var res = await this.$http.get(`/getbanner/art`)
      this.artWrapper.artForm = res.data.data
    },
    ArtUploadChange(file,fileList){
      if(file.status==200){
        this.$message({
          message:"图片上传成功！已添加一项",
          type:'success'
        })
        this.artWrapper.artForm.push({
          picurl:file.data,
          ifdelete:file.ifdelete,
          url:''
        })

          this.$refs.artBannerupload.clearFiles();      

      }else{
        this.$message({
          message:"图片上传失败！请重试",
          type:'error'
        })
        this.$refs.artBannerupload.clearFiles();  
      }
      console.log('-----------------')
      console.log(fileList)
    },
    async artBannerSubmit(){
      if(this.artWrapper.artForm.length==0){
        this.$message({
          message:"请添加轮播图！（至少一项）",
          type:"error"
        })
        return
      }
    this.saveDis=true
    this.$refs.artForm.validate(async valid => {
      if(valid){
        var res = await this.$http.post(`/upbanner/art`,{info:this.artWrapper.artForm})
        if(res.data.status==200){
          this.$message({
            message:res.data.msg,
            type:'success'
          })
        }else{
           this.$message({
            message:res.data.msg,
            type:'error'
          })
        }
        this.saveDis=false 
      }else{
          this.saveDis=false
      }
      this.saveDis=false
    })
      

   
    
    }
    // ==========methods===================    
  }
} 
</script>

<style>
  .banner-wrapper{
    display: flex;
    justify-content: space-around;
    background-color: #F8F9FB;
  }

  .art-banner,
  .pro-banner{
    height: 90%;
    width: 48%;
    background-color: rgb(254, 254, 254);
    /* border:1px solid #1D9C73; */
    -moz-box-shadow:2px 2px 5px #1D9C73, 2px 2px 5px #1D9C73, 2px 2px 5px #1D9C73;
    -webkit-box-shadow:2px 2px 5px #1D9C73, 2px 2px 5px #1D9C73, 2px 2px 5px #1D9C73;
    box-shadow:2px 2px 5px #1D9C73, 2px 2px 5px #1D9C73, 2px 2px 5px #1D9C73;
    border-radius: 10px;
    margin: 20px;
    margin-bottom:200px;
  }
  .banner-title{
    text-align: center;
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #1D9C73;
    text-shadow:2px 2px 5px rgb(108, 239, 249);

  }
  .banner-main{
   height: 100%;
   position: relative;
  }
  
  .banner-item{
    display: flex;
    justify-content: space-around;
    margin:16px 0;
    padding-bottom: 20px;
    border-bottom: 1px solid #1D9C73;

    

  }


  .banner-img{
    width:300px;
    height: 140px;
    border-radius: 10px;
    position:relative;
  }
  .banner-img img{
    width: 100%;
    border-radius: 10px;    
    height: 100%;
  }
  .el-form-item__label{
    font-weight: bold;
    color:#1D9C73;
  }
  .bannerIndex{
    position: absolute;
    left:0;
    top:0;
    width: 20px;
    height: 20px;
    color: #fff;
    font-size: 14px;
    background-color: rgba(238, 35, 38, 0.8);
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
  }

  .delBannerBtn{
    position: absolute;
    right: 10px;
    bottom: -80px;
  }
  .saveBtn{
    position: absolute;
    right: 50px;
    bottom:100px;

  }
 
</style>

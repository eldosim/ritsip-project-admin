<template>
  <div class="login-wrapper">
    <!-- 登录
    <el-button type="primary">成功按钮</el-button> -->

    <!--
      el-form
        label-position="top" 设置label的位置
        :model 用来给表单设置数据模型（对象）
        :rules 用来设置表单验证规则的
        ref 用来引用当前的表单组件

      el-form-item
        label 当前表单项的名称
        prop 它的值是 model 对象中的一个属性
          当使用 表单验证 或者 表单重置 功能时，必须要提供该属性

      el-input
        v-model 实现双向数据绑定
     -->

     <!-- row 表示一行 -->
     <el-row type="flex" class="loginForm" justify="center" align="middle">
       <!-- col 表示一列 span 表示占用几份（共24份） -->
      <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4" class="login-content">
        <el-form label-position="top" :model="loginForm" :rules="loginrules" ref="loginForm">
        <el-form-item label="ئىسىم" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="مەخپىي نۇمۇر" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" style="backgroundColor:#1D9C73;color:#fff">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      </el-col>
    </el-row>
    <div class="login-text">Mini program background management system</div>
  </div>
</template>

<script>
// 导入axios
 
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginrules: {
        username: [
          // required 是否为必填项
          // message 当前规则校验失败时的提示
          // trigger 表单验证的触发实际，blur表示失去焦点时触发
          { required: true, message: '用户名为必填项', trigger: 'blur' },
          // min 最小长度
          // max 最大长度
          {
            min: 3,
            max: 6,
            message: '用户名长度在 3 到 6 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          {
            min: 3,
            max: 6,
            message: '密码长度在 3 到 6 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods:{
  
    submitForm(){
       console.log("hhh")
     },

    resetForm(){
      this.$refs.loginForm.resetFields()
    }
  
  }
 
}
</script>

<style>
.login-wrapper,
.loginForm {
  height: 100%;
}

.loginForm {
    background-color: #1D9C73;
}

.login-content {
  min-width: 240px;
  padding: 20px 35px;
  border-radius: 10px;
  background-color: #fff;
}
.login-text{
  color: #fff;
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 50px;
  left: 0;
  top:80px;
}
</style>



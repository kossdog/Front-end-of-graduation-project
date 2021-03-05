<template>
  <div class="login_container">
    <div class="login_box">
      <div>
        <img src="../assets/yiqing.png" alt="" class="logo" />
      </div>
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/redten.jpg" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-xingming"
            placeholder="请输入用户名"
          >
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-lock"
            placeholder="请输入密码"
            type="password"
          >
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item label-width="0px" class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reg">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="logo_buttom">
      ©All Rights Reserved
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //这是登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },

      //这是表单的验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: "请输入登录用户名", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    //点击登录按钮事件,验证表单；回调函数返回结果
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        //验证表单输入是否合法
        if (!valid) return this.$message.error("请正确填写登录信息！");
        //通过Axios发送post请求，并将返回结果从promise使用 async await 过滤
        const { data: res } = await this.$http.post(
          "getUserModelByUserlogin",
          this.loginForm
        );
        //验证登录

        if (res.eroCode !== 200) return this.$message.error(res.mess);
        this.$message.success("登录成功>_<");
        //1.将登录成功之后的token，保存到客户端的 sessionStorage 中
        //  1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
        //  1.2 token 只在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        window.sessionStorage.setItem("token", res.tokenVo[0].token);
        return this.$router.push("/new");
        // 2.通过编程式导航跳转到后台主页面，路由地址是 /home
        // if(res)  return this.$router.push("/home")+this.$message.success('登录成功！');
        // else return this.$message.error('登录失败！');
      });
    },

    reg() {
      this.$router.push("/res");
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  // background-color: #b8e5f8;
  background-image: url(../assets/xuedi.jpg);
  height: 100%;
}

.logo {
  position: absolute;
  height: 100px;
  width: 400px;
  left: 50%;

  transform: translate(-50%, -205%);
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fcfcfc;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  left: 15%;
  right: 15%;
  top: 30%;

  .btns {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
}

.logo_buttom {
  width: 271.3px;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
}
.img_logo {
  height: 40px;
}
</style>
<template>
  <div class="forget_container">
    <div class="forget_box">
      <!-- 注册表单区域 -->
      <el-form
        ref="forgetFormRef"
        :model="forgetForm"
        :rules="forgetFormRules"
        label-width="0px"
        class="forget_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="forgetForm.username"
            prefix-icon="iconfont icon-xingming"
            placeholder="请输入需要修改密码的用户名"
          >
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="forgetForm.password"
            prefix-icon="iconfont icon-lock"
            placeholder="请输入新密码"
            type="password"
          >
          </el-input>
        </el-form-item>

        <!--再次确认密码-->
        <el-form-item prop="pass">
          <el-input
            v-model="forgetForm.pass"
            prefix-icon="iconfont icon-lock"
            placeholder="请确认新密码"
            type="password"
          >
          </el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item label-width="0px" class="btns">
          <el-button type="primary" @click="edit">修改</el-button>
          <el-button type="info" @click="exit">返回登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: "userlogin",

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.forgetForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      //这是登录表单的数据绑定对象
      forgetForm: {
        username: "",
        password: "",
        pass: "",
      },

      //这是表单的验证规则对象
      forgetFormRules: {
        id: [
          { required: true, message: "请输入ID", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个数字",
            trigger: "blur",
          },
          { pattern: /^[1-9]\d*$/, message: "请输入数字" },
        ],
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
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        pass: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: validatePass },
        ],
 
      },

    };
  },
  components: {
  },
  created() {
     this.getUsersList();
  },

  methods: {

    //获取全部用户信息
    async getUsersList() {
      this.$http.get("/getAllUser").then((res) => {
        this.tableData = res.data;
        console.log(this.tableData)
      });
    },
    edit(){
         this.$refs.forgetFormRef.validate(async (valid) => {
        //验证表单输入是否合法
        if (!valid) return this.$message.error("请正确填写信息!");
        //通过Axios发送post请求，并将返回结果从promise使用 async await 过滤
        const { data: res } = await this.$http.post("/updateUser", this.forgetForm);
        if (!res) return this.$message.error("用户不存在！");
        this.$message.success("修改成功>-<");
        this.exit();
      });
    },
    exit() {
      this.$router.push("/login");
    },

   
  },
};
</script>

<style lang="less" scoped>
.forget_container {
  background-image: url(../assets/xuedi.jpg);
  // background: url(../assets/login_bg.png);
  height: 100%;
}

.forget_box {
  width: 450px;
  height: 300px;
  background-color: #fcfcfc;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -45%);

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

.forget_form {
  position: absolute;
  left: 15%;
  right: 15%;
  top: 15%;

  .btns {
    position: absolute;
    left: 40%;
    transform: translate(-30%);
  }
}

.logo_buttom {
  width: 271.3px;
  height: 50px;
  position: absolute;
  bottom: 0;
  transform: translate(-120%, 100%);
}
.img_logo {
  height: 40px;
}
</style>
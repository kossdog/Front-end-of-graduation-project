<template>
  <div class="register_container">
    <div class="register_box">
      <!-- 头像区域 -->
      <!-- 登录表单区域 -->
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerFormRules"
        label-width="0px"
        class="register_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            prefix-icon="iconfont icon-xingming"
            placeholder="请输入用户名"
          >
          </el-input>
        </el-form-item>
        <!-- 真实姓名 -->
        <el-form-item prop="realname">
          <el-input
            v-model="registerForm.realname"
            prefix-icon="iconfont icon-xingming"
            placeholder="请输入真实姓名"
          >
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            prefix-icon="iconfont icon-lock"
            placeholder="请输入密码"
            type="password"
          >
          </el-input>
        </el-form-item>

        <!--再次确认密码-->
        <el-form-item prop="pass">
          <el-input
            v-model="registerForm.pass"
            prefix-icon="iconfont icon-lock"
            placeholder="请确认密码"
            type="password"
          >
          </el-input>
        </el-form-item>

        <!-- 性别 -->
        <el-form-item prop="sex">
          <el-radio-group v-model="registerForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 随机验证码 输入框 -->
        <el-form-item prop="verifycode">
          <el-input
            v-model="registerForm.verifycode"
            placeholder="请输入验证码"
            class="identifyinput"
          ></el-input>
        </el-form-item>
        <!-- 随机验证码 -->
        <el-form-item>
          <div class="identifybox">
            <div @click="refreshCode">
              <s-identify :identifyCode="identifyCode"></s-identify>
            </div>
            <!-- 刷新验证码 -->
            <el-button @click="refreshCode" type="text" class="textbtn"
              >看不清，换一张</el-button
            >
          </div>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item label-width="0px" class="btns">
          <el-button type="primary" @click="res">注册</el-button>
          <el-button type="info" @click="exit">返回登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import SIdentify from "./RandomCode.vue";

export default {
  name: "userlogin",

  data() {
    // 自定义验证规则：验证码验证规则
    const validateVerifycode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value !== this.identifyCode) {
        console.log("validateVerifycode:", value);
        callback(new Error("验证码不正确"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      //这是登录表单的数据绑定对象
      registerForm: {
        username: "",
        realname: "",
        password: "",
        pass: "",
        sex: "男",
        verifycode: "",
      },

      //这是表单的验证规则对象
      registerFormRules: {
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
        realname: [
          { required: true, message: "请输入真实性名", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
          { pattern: /^[\u4e00-\u9fa5]+$/, message: "请输入中文" },
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
        pass: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { validator: validatePass },
        ],
        verifycode: [
          { required: true, trigger: "blur", validator: validateVerifycode },
        ],
      },

      //     loginForm: {
      // 	verifycode: ''
      // },
      identifyCodes: "1234567890",
      identifyCode: "",
    };
  },
  components: {
    // 注册绘制随机验证码的组件
    SIdentify,
  },
  created() {
    this.refreshCode();
  },

  methods: {
    res() {
      this.$refs.registerFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error("请正确填写注册信息！");
        const { data: res } = await this.$http.post(
          "/register",
          this.registerForm
        );
        if (res.eroCode !== 200) return this.$message.error(res.mess);
        this.$message.success("注册成功>_<");
        this.$router.push("/login");
      });
    },

    exit() {
      this.$router.push("/login");
    },

    // 生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 切换验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    // 生成四位随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    },
  },
};
</script>

<style lang="less" scoped>
.register_container {
  background-image: linear-gradient(rgb(150, 248, 248), #fff);
  // background: url(../assets/login_bg.png);
  height: 100%;
}

.logo {
  height: 100px;
  width: 400px;
  position: absolute;
  left: 460px;
  transform: translate(0, -80%);
}

.register_box {
  width: 450px;
  height: 570px;
  background-color: #fcfcfc;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 40%;
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

.register_form {
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
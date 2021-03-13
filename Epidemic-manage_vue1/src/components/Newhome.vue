<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header style="height: 50px">
      <img>
      <span>疫情信息管理系统</span>
      <el-button type="text" @click="logout"> 退出 </el-button>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <el-aside width="200px">
        <el-menu
         :uniqueOpened="true"
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
           <el-menu-item index="1" @click="openIndex">
        <i class="el-icon-menu"></i>
        <span>患者信息</span>
      </el-menu-item>
      <el-menu-item index="2" @click="openDoctor">
        <i class="el-icon-menu"></i>
        <span>医生信息</span>
      </el-menu-item>
      <el-menu-item index="3" @click="openInpa">
        <i class="el-icon-menu"></i>
        <span>病房信息</span>
      </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    //退出功能，先清除 token，然后跳转到 login 页面
    logout() {
      //清除token
      window.sessionStorage.clear();
      this.$message.success("退出成功>-<");
      this.$router.push("/login");
    },
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      openIndex(){
        this.$router.push("/index");
      },
      openDoctor(){
        this.$router.push("/doctor");
      },
      openInpa(){
        this.$router.push("/inpa");
      }
  },
};
</script>

<style lang="less">

.home-container {
  height: 100%;
  background: url(../assets/menglong.jpg) no-repeat;
  background-size: 100%;
}

.el-header {
  background-color: #adb4b6;
  display:flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  >div{
    display: flex;
    align-items: center;
    span{
      margin-left: 15px;
    }
  }
}
.el-aside{
  background-color:#545c64;
}

.iconfont {
  margin-right: 10px;
}
/deep/ .el-main{
  padding: 0;
  width: 1300px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

</style>
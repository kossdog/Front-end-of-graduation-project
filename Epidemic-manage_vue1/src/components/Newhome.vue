<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header style="height: 50px">
      <div>
        <img src="../assets/yiqing.png" alt="" />
      </div>
      <el-button type="text" @click="logout"> 退出 </el-button>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
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
      window.sessionStorage.clear();
      this.$message.success("退出成功>-<");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  background: url(../assets/menglong.jpg) no-repeat;
  background-size: 100%;
}

.el-header {
  margin-left: 8%;
  margin-right: 7.5%;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: rgb(26, 22, 22);
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
}

.el-header img {
  margin-top: 20px;
  height: 100px;
  width: 480px;
}

.iconfont {
  margin-right: 10px;
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
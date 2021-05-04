<template>
  <!-- 页面主体 -->
  <div class="page-index">
    <!-- 查询 -->
    <div class="find">
      <el-form
        ref="formFind"
        :model="form_find"
        :rules="rules"
        class="demo-form"
        label-position="left"
      >
        <el-form-item label="" class="in" prop="text">
          <el-input
            v-model="form_find.text"
            style="width: 200px"
            placeholder="搜索"
          ></el-input>
          <el-button @click="find" type="primary" >查询</el-button>
          <el-button @click="find_exit" type="warning">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--展示主表格-->
    <el-table
      :data="tableData"
      height="500"
      :header-cell-style="{ color: '#000' }"
      style="width: 100%"
      class="query-table"
    >
      <!--ID-->
      <el-table-column prop="id" label="ID" width="100" v-if="show"> </el-table-column>
      <!--名字-->
      <el-table-column label="姓名" width="120">
        <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top">
          <template #default>
            <p prop="name">姓名: {{ scope.row.name }}</p>
            <p prop="room">病房: {{ scope.row.room }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium" prop="name">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
         </el-table-column>
      <!--性别-->
      <el-table-column prop="sex" label="性别" width="100"> </el-table-column>
      <!--年龄-->
      <el-table-column prop="age" label="年龄" width="100"> </el-table-column>
      <!--来源地-->
      <el-table-column prop="comefrom" label="来源地" width="150">
      </el-table-column>
      <!--确诊时间-->
      <el-table-column prop="time" label="确诊时间" width="110">
      </el-table-column>
      <!--症状-->
      <el-table-column prop="level" label="症状" width="110"> </el-table-column>
      <!--主治医生-->
      <el-table-column prop="doctor" label="主治医生" width="110"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" >
          <el-button
            size="mini"
            type="danger"
            @click="
              handleDelete(scope.$index, scope.row), (dialogVisible = true)
            "
            >删除信息</el-button
          >
          <!--删除信息-->
          <el-dialog
            :show-close="false"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleDelete"
          >
            <span class="di-text">删除信息不可恢复，请确认是否删除</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">否</el-button>
              <el-button type="primary" @click="del(), (dialogVisible = false)"
                >是</el-button
              >
            </span>
          </el-dialog>
          <!--修改信息-->
          <el-button
            size="mini"
            style="margin-left: 10px"
            @click="handleEdit(scope.$index, scope.row), (dialogEdit = true)"
            >修改信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页导航栏 -->
    <el-pagination
      class="pag"
      background
      layout="prev, pager, next"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      @current-change="handleCurrentPage"
      :total="total"
    >
    </el-pagination>

    <!--添加信息-->
    <el-button
      type="success"
      @click="dialog = true"
      class="button_add"
      >新增</el-button
    >
    <!-- 导出数据 -->
    <el-button
      @click="dialog_excel = true"
      class="button_out"
      icon="el-icon-upload2"
      >导出</el-button
    >


    <!--患者添加抽屉-->
    <el-dialog
      title="添加患者信息"
      :before-close="handleClose"
      :visible.sync="dialog"
      ref="drawer"
      :show-close="false"
    >
      <div class="add-form">
        <el-form
          ref="formRef"
          :model="form"
          label-width="80px"
          :rules="rules"
          class="demo-form"
          label-position="left"
          size="mini"
        >
          <!--名字-->
          <el-form-item label="名字" class="in" prop="name">
            <el-input
              v-model="form.name"
              style="width: 270px"
              placeholder="请输入患者名字"
            ></el-input>
          </el-form-item>
          <!--性别-->
          <el-form-item label="性别" class="in" prop="sex">
            <el-select
              v-model="form.sex"
              style="width: 270px"
              placeholder="请选择性别"
              ><el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <!--年龄-->
          <el-form-item label="年龄" class="in" prop="age">
            <el-input
              v-model="form.age"
              style="width: 270px"
              placeholder="请输入患者年龄"
            ></el-input>
          </el-form-item>
          <!--来源地-->
          <el-form-item label="来源地" class="in" prop="comefrom">
            <el-input
              v-model="form.comefrom"
              style="width: 270px"
              placeholder="请输入来源地"
            ></el-input>
          </el-form-item>
          <!--确诊时间-->
          <el-form-item label="确诊时间" class="in" prop="time">
            <el-date-picker
              type="date"
              v-model="form.time"
              style="width: 270px"
              placeholder="请输入确诊时间"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <!--病症-->
          <el-form-item label="病症" class="in" prop="level">
            <el-select
              v-model="form.level"
              style="width: 270px"
              placeholder="请选择症状"
              ><el-option label="无症状" value="无症状"></el-option>
              <el-option label="轻症" value="轻症"></el-option>
              <el-option label="重症" value="重症"></el-option>
            </el-select>
          </el-form-item>
          <!--主治医生-->
          <el-form-item label="主治医生" class="in" prop="doctor">
            <el-select
              v-model="form.doctor"
              style="width: 270px"
              placeholder="请选择主治医生"
              ><el-option v-for="item in tableDataDoc"
                :key="item.id"
                :label="item.docname"
                :value="item.docname"
              ></el-option>
            </el-select>
          </el-form-item>
          <!--病房-->
          <el-form-item label="病房" class="in" prop="room">
            <el-select
              v-model="form.room"
              style="width: 270px"
              placeholder="请选择病房"
              ><el-option v-for="item in tableRoomState"
                :key="item.id"
                :label="item.num"
                :value="item.num"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="onAdd">添加</el-button>
        </div>
      </div>
    </el-dialog>

    <!--患者修改抽屉-->
    <el-dialog
      title="修改患者信息"
      :before-close="handleClose2"
      :visible.sync="dialogEdit"
      ref="drawer2"
      :show-close="false"
    >
      <div class="add-form">
        <el-form
          ref="formRef2"
          :model="form2"
          label-width="80px"
          :rules="rules"
          class="demo-form"
          label-position="left"
          size="mini"
        >
          <!--名字-->
          <el-form-item label="名字" class="in" prop="name">
            <el-input
              v-model="form2.name"
              style="width: 270px"
              placeholder="请输入患者名字"
            ></el-input>
          </el-form-item>
          <!--性别-->
          <el-form-item label="性别" class="in" prop="sex">
            <el-select
              v-model="form2.sex"
              style="width: 270px"
              placeholder="请选择性别"
              ><el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <!--年龄-->
          <el-form-item label="年龄" class="in" prop="age">
            <el-input
              v-model="form2.age"
              style="width: 270px"
              placeholder="请输入患者年龄"
            ></el-input>
          </el-form-item>
          <!--来源地-->
          <el-form-item label="来源地" class="in" prop="comefrom">
            <el-input
              v-model="form2.comefrom"
              style="width: 270px"
              placeholder="请输入来源地"
            ></el-input>
          </el-form-item>
          <!--确诊时间-->
          <el-form-item label="确诊时间" class="in" prop="time">
            <el-date-picker
              type="date"
              v-model="form2.time"
              style="width: 270px"
              placeholder="请输入确诊时间"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <!--病症-->
          <el-form-item label="病症" class="in" prop="level">
            <el-select
              v-model="form2.level"
              style="width: 270px"
              placeholder="请选择症状"
              ><el-option label="无症状" value="无症状"></el-option>
              <el-option label="轻症" value="轻症"></el-option>
              <el-option label="重症" value="重症"></el-option>
            </el-select>
          </el-form-item>
          <!--主治医生-->
          <el-form-item label="主治医生" class="in" prop="doctor">
            <el-select
              v-model="form2.doctor"
              style="width: 270px"
              placeholder="请选择主治医生"
              ><el-option v-for="item in tableDataDoc"
                :key="item.id"
                :label="item.docname"
                :value="item.docname"
              ></el-option>
            </el-select>
          </el-form-item>
          <!--病房-->
          <el-form-item label="病房" class="in" prop="room">
            <el-select
              v-model="form2.room"
              style="width: 270px"
              placeholder="请选择病房"
              ><el-option v-for="item in tableRoomState"
                :key="item.id"
                :label="item.num"
                :value="item.num"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div class="demo-drawer__footer">
          <el-button @click="cancelForm2">取 消</el-button>
          <el-button type="primary" @click="onEdit">修改</el-button>
        </div>
      </div>
    </el-dialog>

    <!--统计表格按钮-->
    <div class="button_tj">
      <el-button @click="dialogFun2" type="primary"
        >症状统计饼图</el-button
      >
    </div>

    <!--统计展示表格对话框-->
    <el-dialog :visible.sync="dialogFun" width="650px">
      <div
        id="myChart"
        :style="{ width: '500px', height: '400px', margin: '0 auto' }"
      ></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFun = false">取 消</el-button>
      </span>
    </el-dialog>

    <!--导出全部数据弹窗-->
    <el-dialog
      title="导出全部患者信息到Excel"
      :before-close="handleClose_excel"
      :visible.sync="dialog_excel"
      ref="drawer"
      :show-close="false"
    >
      <div class="add-form">
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm_excel">取 消</el-button>
          <el-button type="primary" @click="onAdd_excel">导出</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //不显示id
      show:false,
      //删除患者信息方法参数
      dialogVisible: false,
      dialogFromVisible: false,

      //主展示表格数据
      tableData: [],
      //医生的数据
      tableDataDoc:[],
      //病房数据
      tableDataRoom:[],
      //闲置
      tableRoomState:[],
      //添加患者信息弹窗参数
      dialog: false,
      loading: false,
      //删除患者信息弹窗参数
      dialogEdit: false,
      loading2: false,
      //导出全部弹窗参数
      dialog_excel: false,
      loading_excel: false,
      //导出本页弹窗参数
      dialog_excel_part: false,
      loading_excel_part: false,
      //统计弹窗参数
      dialogFun: false,

      //导航栏参数
      total: 8,
      currentPage: 1,
      pageSize: 8,

      //导航栏数据
      form3: {
        page: 1,
        size: 8,
      },

      //修改患者信息数据
      form2: {
        id: "",
        name: "",
        sex:"",
        age: "",
        comefrom: "",
        time: "",
        level: "",
        doctor: "",
        room:""
      },

      //添加患者信息数据
      form: {
        id: "",
        name: "",
        sex:"",
        age: "",
        comefrom: "",
        time: "",
        level: "",
        doctor:"",
        room:""
      },

      //搜索框数据
      form_find: {
        text: "",
      },

      formLabelWidth: "80px",
      timer: null,

      rules: {
        name: [
          { required: true, message: "请输入患者姓名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        comefrom: [
          { required: true, message: "请输入来源地", trigger: "blur" },
        ],
        time: [{ required: true, message: "请选择确诊时间", trigger: "blur" }],
        age: [
          { required: true, message: "请输入患者年龄", trigger: "blur" },
          { pattern: /^[1-9]\d*$/, message: "请输入一个大于0的数字" },
        ],
        level: [{ required: true, message: "请选择症状", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        doctor: [{ required: true, message: "请选择主治医生", trigger: "blur" }],
        room: [{ required: true, message: "请选择病房", trigger: "blur" }],
      },
    };
  },

  created() {
    this.getUsersList();
    this.onePage();
    this.getDoctorsList();
    this.getRoomsList();
    this.getRoomState();
  },

  methods: {
    
    //修改患者信息
    handleEdit(index, row) {
      // console.log(index, row);
      this.form2 = row;
      // console.log(this.form2.id);
    },
    //删除患者信息
    handleDelete(index, row) {
      // console.log(index, row);
      console.log(row.id);
      this.id = row.id;
    },
    //分页方法
    handleCurrentPage(current) {
      this.form3.page = current;
      this.$http.post("/getEmpByPage", this.form3).then((res) => {
        console.log(res.data);
        this.tableData = res.data.rows;
        // console.log(res.page)
      });
      // console.log(current)
    },
    //获取全部患者信息
    async getUsersList() {
      this.$http.get("/getAllEmployee").then((res) => {
        this.tableData = res.data;
        //  console.log(this.tableData)
      });
    },
    // //获取全部医生信息
    async getDoctorsList() {
      this.$http.get("/getAllDoctor").then((res) => {
        this.tableDataDoc = res.data;
      });
    },
    // //获取病房
    async getRoomsList() {
      this.$http.get("/getAllRoom").then((res) => {
        this.tableDataRoom = res.data;
      });
    },
    // //获取闲置病房
    async getRoomState() {
      this.$http.get("/getRoomState").then((res) => {
        this.tableRoomState = res.data;
      });
    },
    //患者信息删除方法
    del() {
      this.$http.delete("/delEmpById/" + this.id).then((ret) => {
        if (ret.data) this.onePage() + this.$message.success("删除成功！");
        else return this.$message.error("删除失败！");
      });
    },

    //添加弹窗打开关闭方法
    handleClose() {
      if (this.loading) {
        return;
      }
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      this.$refs.formRef.resetFields();
      clearTimeout(this.timer);
    },
    //添加患者信息方法
    onAdd() {
      // let url="/addEmploy";
      // this.$http.post(url,this.form).then(res=>{
      //   console.log("response...",res)
      //   this.$message.success("添加成功>-<")

      // }).catch(err=>{console.log("error...",err); this.$message.error('添加失败！')});
      this.$refs.formRef.validate(async (valid) => {
        if (!valid) return this.$message.error("请正确填写！");
        const { data: res } = await this.$http.post("/addEmploy", this.form);
        if (!res) return this.$message.error("添加失败！");
        this.$message.success("添加成功>-<");
        this.onePage();
        // this.handleCurrentPage(1);
        this.cancelForm();
        this.$refs.formRef.resetFields();
      });
    },
    //患者信息修改方法
    onEdit() {
      this.$refs.formRef2.validate(async (valid) => {
        //验证表单输入是否合法
        if (!valid) return this.$message.error("请正确填写信息!");
        //通过Axios发送post请求，并将返回结果从promise使用 async await 过滤
        const { data: res } = await this.$http.post("/updateEmp", this.form2);
        if (!res) return this.$message.error("修改失败！");
        this.$message.success("修改成功>-<");
        this.onePage();
        this.cancelForm2();
      });
      // this.$http.get('/updateEmp',{
      //   params:  {
      //     id:this.id
      //   }
      // }).then(ret=>{
      //     console.log(ret.data)
      //     if(ret.data) return this.$router.push("/home");
      //         else return this.$message.error('删除失败！');
      // })
    },
    //搜索患者信息方法
    find() {
      this.$refs.formFind.validate(async (valid) => {
        //验证表单输入是否合法
        if (!valid) return this.$message.error("搜索不能为空！");
        //     //通过Axios发送post请求，并将返回结果从promise使用 async await 过滤
        const { data: res } = await this.$http.get(
          "/findEmp/" + this.form_find.text
        );
        console.log(res);
        this.tableData = res;
        //      if (!res) return this.$message.error('修改失败！');
        // this.$message.success('修改成功>-<');
        // this.getUsersList();
        // this.cancelForm2();
      });
    },
    //退出搜索，返回首页
    find_exit() {
      this.onePage();
      this.$refs.formFind.resetFields();
    },

    //修改弹窗打开关闭方法
    handleClose2() {
      if (this.loading2) {
        return;
      }
    },
    cancelForm2() {
      this.loading2 = false;
      this.dialogEdit = false;
      clearTimeout(this.timer);
      this.onePage();
    },

    //导出全部弹窗开启关闭
    handleClose_excel() {
      if (this.loading_excel) {
        return;
      }
    },
    cancelForm_excel() {
      this.loading_excel = false;
      this.dialog_excel = false;
      clearTimeout(this.timer);
      this.onePage();
    },

    //导出全部患者信息方法
    onAdd_excel() {
      this.$http.get("/export").then((res) => {
        console.log(res.data);
      });
      window.location.href = "http://localhost:8080/export";
      this.cancelForm_excel();
    },

    cancelForm_excel_part() {
      this.loading_excel_part = false;
      this.dialog_excel_part = false;
      clearTimeout(this.timer);
      this.onePage();
    },


    //首页方法
    onePage() {
      this.form.page = 1;
      this.$http
        .post("/getEmpByPage", {
          page: 1,
          size: 8,
        })
        .then((res) => {
          console.log(res.data);
          this.currentPage = 1;
          this.tableData = res.data.rows;
          this.total = res.data.total;
          // console.log(res.page)
        });
      // console.log(current)
    },
    // thisPage(page) {
    //   page = this.form3.page;
    //   this.handleCurrentPage(page);

    //   //  console.log(res.data);
    // },
    dialogFun2() {
      this.getUsersList();
      this.dialogFun = true;
      setTimeout(() => {
        this.drawLine2();
      }, 500);
    },
    //统计图数据
    drawLine2() {

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      var low = 0;
      var mid = 0;
      var high = 0;
      var count = 0;
      var count1 = 0;
      var count2 = 0;
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].level == "无症状" ) {
          count++;
        } else if (this.tableData[i].level == "轻症") {
          count1++;
        } else 
         {
          count2++;
        } 
      }
      low = low + count;
      mid = mid + count1;
      high = high + count2;
      myChart.setOption({
        title: {
          text: "病症分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
        orient: 'vertical',
        left: 'left',
    },

        series: [
          {
            name: "访问来源",
            type: "pie",
            top: "10%",
            radius: "75%",
            center: ["50%", "50%"],
            data: [
              { value: low, name: "无症状" },
              { value: mid, name: "轻症" },
              { value: high, name: "重症" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    
  },
};
</script>

<style lang="less" scoped>
// 搜索框
.find {
  width: 500px;
  margin-top: 22px;

}
//主表格
.page-index {
  position: absolute;
  top: 50px;
  left: 300px;
  width: 1000px;
}
/deep/ .el-table thead,
.el-table {
  color: black;
}
/*最外层透明*/
/deep/ .el-table,
/deep/ .el-table__expanded-cell {
  background-color: transparent;
  color: #000;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color: transparent;
}
/* 删除表格下最底层的横线 */
.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

.di-text {
  display: block;
  text-align: center;
}
.add-info {
  position: absolute;
  top: 500px;
  left: 400px;
}

.el-pagination {
  text-align: center;
}

.button_add {
  position: absolute;
  left: 36%;
  top: 22px;
}
.button_out{
  position: absolute;
  right: 13%;
  top: 22px;
}
.button_tj {
  position: absolute;
  left: 88%;
  top: 22px;
}

.add-form {
  margin-left: 25px;
}

/deep/ .el-dialog {
  width: 450px;
}

.demo-drawer__footer {
  margin-left: 190px;
  padding-right: 0px;
  margin-right: 0px;

  .button {
    padding-right: 5px;
  }
}
</style>
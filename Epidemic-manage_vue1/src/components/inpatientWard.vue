<template>
  <!-- 页面主体 -->
  <div class="page-index">
    <!--展示主表格-->
    <el-table
      :data="tableData"
      height="500"
      :header-cell-style="{ color: '#000' }"
      style="width: 800px"
      class="query-table"
    >
      <!--ID-->
      <el-table-column prop="id" label="ID" width="180" v-if="show"> </el-table-column>
      <!--名字-->
      <el-table-column prop="num" label="病房号" width="180"> </el-table-column>
      <!--名字-->
      <el-table-column prop="type" label="病房类型" width="180"> </el-table-column>
      <!--名字-->
      <el-table-column prop="state" label="病房状态" width="180"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
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

    <!--病房添加抽屉-->
    <el-dialog
      title="添加病房信息"
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
        >
          <!--病房号码-->
          <el-form-item label="病房号码" class="in" prop="num">
            <el-input
              v-model="form.num"
              style="width: 270px"
              placeholder="请输入病房号码"
            ></el-input>
          </el-form-item>
          <!--病房类型-->
          <el-form-item label="病房类型" class="in" prop="type">
            <el-select
              v-model="form.type"
              style="width: 270px"
              placeholder="请选择病房类型"
              ><el-option label="普通病房" value="普通病房"></el-option>
              <el-option label="重症病房" value="重症病房"></el-option>
            </el-select>
          </el-form-item>
          <!--病房状态-->
          <el-form-item label="病房状态" class="in" prop="state">
            <el-select
              v-model="form.state"
              style="width: 270px"
              placeholder="请选择病房状态"
              ><el-option label="闲置" value="闲置"></el-option>
              <el-option label="使用中" value="使用中"></el-option>
            </el-select>
          </el-form-item>

        </el-form>

        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="onAdd">添加</el-button>
        </div>
      </div>
    </el-dialog>

     <!--病房修改抽屉-->
    <el-dialog
      title="修改病房信息"
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
        >
          <!--病房号码-->
          <el-form-item label="病房号码" class="in" prop="num">
            <el-input
              v-model="form2.num"
              style="width: 270px"
              placeholder="请输入病房号码"
              disabled
            ></el-input>
          </el-form-item>
          <!--病房类型-->
          <el-form-item label="病房类型" class="in" prop="type">
            <el-select
              v-model="form2.type"
              style="width: 270px"
              placeholder="请选择病房类型"
              disabled
              ><el-option label="普通病房" value="普通病房"></el-option>
              <el-option label="重症病房" value="重症病房"></el-option>
            </el-select>
          </el-form-item>
          <!--病房状态-->
          <el-form-item label="病房状态" class="in" prop="state">
            <el-select
              v-model="form2.state"
              style="width: 270px"
              placeholder="请选择病房状态"
              ><el-option label="闲置" value="闲置"></el-option>
              <el-option label="使用中" value="使用中"></el-option>
            </el-select>
          </el-form-item>
        
        </el-form>

        <div class="demo-drawer__footer">
          <el-button @click="cancelForm2">取 消</el-button>
          <el-button type="primary" @click="onEdit">修改</el-button>
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
      //删除病房信息方法参数
      dialogVisible: false,
      dialogFromVisible: false,

      //主展示表格数据
      tableData: [],

      //添病房信息弹窗参数
      dialog: false,
      loading: false,
      //删除病房信息弹窗参数
      dialogEdit: false,
      loading2: false,

      //导航栏参数
      total: 8,
      currentPage: 1,
      pageSize: 8,

      //导航栏数据
      form3: {
        page: 1,
        size: 8,
      },

      //修改病房信息数据
      form2: {
        id: "",
        num: "",
        type:"",
        state: "",
      },

      //添加病房信息数据
      form: {
        id: "",
        num: "",
        type:"",
        state: "",
      },


      formLabelWidth: "80px",
      timer: null,

      rules: {
        num: [{ required: true, message: "请输入病房号", trigger: "blur" },],
        type: [{ required: true, message: "请选择病房类型", trigger: "blur" }],
        state: [{ required: true, message: "请选择病房状态", trigger: "blur" }],
      },
    };
  },

  created() {
    this.getDoctorsList();
    this.onePage();
  },

  methods: {
    //修改病房信息
    handleEdit(index, row) {
      // console.log(index, row);
      this.form2 = row;
      // console.log(this.form2.id);
    },
    //删除病房信息
    handleDelete(index, row) {
      // console.log(index, row);
      console.log(row.id);
      this.id = row.id;
    },
    //分页方法
    handleCurrentPage(current) {
      this.form3.page = current;
      this.$http.post("/getRoomByPage", this.form3).then((res) => {
        console.log(res.data);
        this.tableData = res.data.rows;

        // console.log(res.page)
      });
      // console.log(current)
    },
    //获取全部病房信息
    async getDoctorsList() {
      this.$http.get("/getAllRoom").then((res) => {
        this.tableData = res.data;
        // console.log(this.tableData1)
      });
    },
    //病房信息删除方法
    del() {
      console.log(this.id);
      this.$http.delete("/delRoomById/" + this.id).then((res) => {
        console.log(res.data);
        if (res.data) this.onePage() + this.$message.success("删除成功！");
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
    //添加病房信息方法
    onAdd() {
      this.$refs.formRef.validate(async (valid) => {
        if (!valid) return this.$message.error("请正确填写！");
        const { data: res } = await this.$http.post("/addRoom", this.form);
        if (!res) return this.$message.error("添加失败！");
        this.$message.success("添加成功>-<");
        this.onePage();
        // this.handleCurrentPage(1);
        this.cancelForm();
        this.$refs.formRef.resetFields();
      });
    },
    //病房信息修改方法
    onEdit() {
      console.log(this.form2);
      this.$refs.formRef2.validate(async (valid) => {
        //验证表单输入是否合法
        if (!valid) return this.$message.error("请正确填写信息!");
        //通过Axios发送post请求，并将返回结果从promise使用 async await 过滤
        const { data: res } = await this.$http.post("/updateRoom", this.form2);
        if (!res) return this.$message.error("修改失败！");
        this.$message.success("修改成功>-<");
        this.onePage();
        this.cancelForm2();
      });
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

    //首页方法
    onePage() {
      this.form.page = 1;
      this.$http
        .post("/getRoomByPage", {
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
    
  },
};
</script>

<style lang="less" scoped>
//主表格
.page-index {
  position: absolute;
  top: 120px;
  left: 320px;
  width: 1000px;
}
.query-table{
  position: relative;
  left: 150px;
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
  right: 5%;
}

.button_tj {
  position: absolute;
  width: 500px;
  left: 75%;
  bottom: 1%;
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
    padding-right: 0px;
  }
}
</style>
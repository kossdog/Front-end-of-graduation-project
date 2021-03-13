<template>
  <!-- 页面主体 -->
  <div class="page-index">
    <!--展示主表格-->
    <el-table
      :data="tableData"
      height="500"
      :header-cell-style="{ color: '#000' }"
      style="width: 100%"
      class="query-table"
    >
      <!--ID-->
      <el-table-column prop="id" label="ID" width="180" v-if="show"> </el-table-column>
      <!--名字-->
      <el-table-column prop="docname" label="姓名" width="180"> </el-table-column>
      <!--性别-->
      <el-table-column prop="docsex" label="性别" width="180"> </el-table-column>
      <!--年龄-->
      <el-table-column prop="docage" label="年龄" width="180"> </el-table-column>
      <!--职阶-->
      <el-table-column prop="doclevel" label="职位" width="180"> </el-table-column>
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

    <!--医生添加抽屉-->
    <el-dialog
      title="添加医生信息"
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
          <!--名字-->
          <el-form-item label="名字" class="in" prop="docname">
            <el-input
              v-model="form.docname"
              style="width: 270px"
              placeholder="请输入医生名字"
            ></el-input>
          </el-form-item>
          <!--性别-->
          <el-form-item label="性别" class="in" prop="docsex">
            <el-select
              v-model="form.docsex"
              style="width: 270px"
              placeholder="请选择性别"
              ><el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <!--年龄-->
          <el-form-item label="年龄" class="in" prop="docage">
            <el-input
              v-model="form.docage"
              style="width: 270px"
              placeholder="请输入年龄"
            ></el-input>
          </el-form-item>
          <!--病症-->
          <el-form-item label="病症" class="in" prop="doclevel">
            <el-select
              v-model="form.doclevel"
              style="width: 270px"
              placeholder="请选择职称"
              ><el-option label="主任" value="主任"></el-option>
              <el-option label="副主任" value="副主任"></el-option>
              <el-option label="住院医师" value="住院医师"></el-option>
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
        >
          <!--名字-->
          <el-form-item label="名字" class="in" prop="docname">
            <el-input
              v-model="form2.docname"
              style="width: 270px"
              placeholder="请输入医生名字"
            ></el-input>
          </el-form-item>
          <!--性别-->
          <el-form-item label="性别" class="in" prop="docsex">
            <el-select
              v-model="form2.docsex"
              style="width: 270px"
              placeholder="请选择性别"
              ><el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <!--年龄-->
          <el-form-item label="年龄" class="in" prop="docage">
            <el-input
              v-model="form2.docage"
              style="width: 270px"
              placeholder="请输入患者年龄"
            ></el-input>
          </el-form-item>
          <!--职称-->
          <el-form-item label="职称" class="in" prop="doclevel">
            <el-select
              v-model="form2.doclevel"
              style="width: 270px"
              placeholder="请选择职称"
              ><el-option label="主任" value="主任"></el-option>
              <el-option label="副主任" value="副主任"></el-option>
              <el-option label="住院医师" value="住院医师"></el-option>
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
      //删除医生信息方法参数
      dialogVisible: false,
      dialogFromVisible: false,

      //主展示表格数据
      tableData: [],

      //添医生信息弹窗参数
      dialog: false,
      loading: false,
      //删除医生信息弹窗参数
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

      //修改医生信息数据
      form2: {
        id: "",
        docname: "",
        docsex:"",
        docage: "",
        doclevel: "",
      },

      //添加医生信息数据
      form: {
        id: "",
        docname: "",
        docsex:"",
        docage: "",
        doclevel: "",
      },


      formLabelWidth: "80px",
      timer: null,

      rules: {
        docname: [
          { required: true, message: "请输入医生姓名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        docage: [
          { required: true, message: "请输入医生年龄", trigger: "blur" },
          { pattern: /^[1-9]\d*$/, message: "请输入一个大于0的数字" },
        ],
        doclevel: [{ required: true, message: "请选择症状", trigger: "blur" }],
        docsex: [{ required: true, message: "请选择性别", trigger: "blur" }],
      },
    };
  },

  created() {
    this.getDoctorsList();
    this.onePage();
  },

  methods: {
    //修改医生信息
    handleEdit(index, row) {
      // console.log(index, row);
      this.form2 = row;
      // console.log(this.form2.id);
    },
    //删除医生信息
    handleDelete(index, row) {
      // console.log(index, row);
      console.log(row.id);
      this.id = row.id;
    },
    //分页方法
    handleCurrentPage(current) {
      this.form3.page = current;
      this.$http.post("/getDocByPage", this.form3).then((res) => {
        console.log(res.data);
        this.tableData = res.data.rows;

        // console.log(res.page)
      });
      // console.log(current)
    },
    //获取全部医生信息
    async getDoctorsList() {
      this.$http.get("/getAllDoctor").then((res) => {
        this.tableData = res.data;
        // console.log(this.tableData1)
      });
    },
    //医生信息删除方法
    del() {
      console.log(this.id);
      this.$http.delete("/delDocById/" + this.id).then((res) => {
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
    //添加医生信息方法
    onAdd() {
      this.$refs.formRef.validate(async (valid) => {
        if (!valid) return this.$message.error("请正确填写！");
        const { data: res } = await this.$http.post("/addDoctor", this.form);
        if (!res) return this.$message.error("添加失败！");
        this.$message.success("添加成功>-<");
        this.onePage();
        // this.handleCurrentPage(1);
        this.cancelForm();
        this.$refs.formRef.resetFields();
      });
    },
    //医生信息修改方法
    onEdit() {
      console.log(this.form2);
      this.$refs.formRef2.validate(async (valid) => {
        //验证表单输入是否合法
        if (!valid) return this.$message.error("请正确填写信息!");
        //通过Axios发送post请求，并将返回结果从promise使用 async await 过滤
        const { data: res } = await this.$http.post("/updateDoc", this.form2);
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
        .post("/getDocByPage", {
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
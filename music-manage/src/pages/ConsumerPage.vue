<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="medium" @click="delAll">批量删除</el-button>
        <el-button type="primary" size="medium" @click="centerDialogVisible =true">添加新用户</el-button>
        <el-input v-model="select_word" size="medium" placeholder="       请输入用户名" class="handle-input"></el-input>
        <el-button type="primary" size="medium" class="handle-getButton" @click="getUser">查询</el-button>
      </div>
    </div>
    <el-table size="medium" ref="multipleTable" border style="width:100%" height="680px" :data="data" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column label="用户图片" width="110" align="center">
        <template slot-scope="scope">
          <div class="singer-img">
            <img :src="getUrl(scope.row.avator)" style="width: 100%"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="username" width="200" align="center"></el-table-column>
      <el-table-column label="性别" width="100" align="center">
        <template slot-scope="scope">
          {{changeSex(scope.row.sex)}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop="phoneNum" width="200" align="center"></el-table-column>
      <el-table-column label="电子邮箱" prop="email" width="280" align="center"></el-table-column>
      <el-table-column width="180px" label="出生日期" align="center">
        <template slot-scope="scope">
          {{attachBirthday(scope.row.birth)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button size="medium" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="medium" type="danger" @click="handleDelete(scope.row.id)" class="button-space">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background layout="total,prev,pager,next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="tableData.length"
        @current-change="handleCurrentChange"
      >

      </el-pagination>
    </div>
    <el-dialog title="添加新用户" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form :model="registerForm" ref="registerForm" label-width="80px":rules="rules">
        <el-form-item prop="username" label="用户名" size="mini" >
          <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" size="mini">
          <el-input type="password" v-model="registerForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
            <input type="radio" name="sex" value="0" v-model="registerForm.sex">&nbsp;女&nbsp;&nbsp;
            <input type="radio" name="sex" value="1" v-model="registerForm.sex">&nbsp;男
        </el-form-item>
        <el-form-item prop="phoneNum" label="手机号" size="mini">
          <el-input v-model="registerForm.phoneNum" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="电子邮箱" size="mini">
          <el-input v-model="registerForm.email" placeholder="电子邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="birth" label="生日" size="mini">
          <el-date-picker type="date" v-model="registerForm.birth" placeholder="选择日期"
                          style="width: 100%"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="medium" @click="addConsumer">确定</el-button>
        <el-button size="medium" @click="centerDialogVisible=false">取消</el-button>  
     </span>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="editVisible" width="400px" center>
      <el-form :model="editForm" ref="editForm" label-width="80px":rules="rules">
        <el-form-item prop="username" label="用户名" size="mini">
          <el-input v-model="editForm.username" placeholder="用户名" ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" size="mini">
          <el-input type="password" v-model="editForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <input type="radio" name="sex" value="0" v-model="editForm.sex">&nbsp;女&nbsp;&nbsp;
          <input type="radio" name="sex" value="1" v-model="editForm.sex">&nbsp;男
        </el-form-item>
        <el-form-item prop="phoneNum" label="手机号" size="mini">
          <el-input v-model="editForm.phoneNum" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="电子邮箱" size="mini">
          <el-input v-model="editForm.email" placeholder="电子邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="birth" label="生日" size="mini">
          <el-date-picker type="date" v-model="editForm.birth" placeholder="选择日期"
                          style="width: 100%"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="medium" @click="editSave">确定</el-button>
        <el-button size="medium" @click="editVisible=false">取消</el-button>
     </span>
    </el-dialog>


    <el-dialog title="删除用户" :visible.sync="delVisible" width="400px" center>
      <div align="center">删除不可恢复，是否确定删除</div>
      <span slot="footer">
        <el-button size="mini" @click="delRow">确定</el-button>
        <el-button size="mini" @click="delVisible=false">取消</el-button>
     </span>
    </el-dialog>


  </div>
</template>

<script>
  import {getAllConsumer,setConsumer,updateConsumer,delConsumer} from '../api/index'
  import {mixin} from '../mixins'

  export default {
    name: 'ConsumerPage',
    mixins: [mixin],
    data () {

      return {
        centerDialogVisible: false,
        editVisible: false,
        delVisible: false,
        registerForm: {
          username: '',
          password:'',
          sex: '1',
          phoneNum:'',
          email:'',
          birth: '',
          introduction: '',
          location: '',

        },
        editForm: {
          id:'',
          username: '',
          password:'',
          sex: '',
          phoneNum:'',
          email:'',
          birth: '',
          introduction: '',
          location: '',
        },

        tableData: [],
        tempData: [],
        select_word: '',
        pageSize: '5',
        currentPage: '1',
        idx: -1,
        multipleSelection: [] ,
        rules:{
          username: [
            {required: true,message: '请输入用户名',trigger: 'blur'}
          ],
          password: [
            {required: true,message: '请输入密码',trigger: 'blur'}
          ],
          phoneNum: [
            {required: true,message: '请输入手机号',trigger: 'blur'}
          ],
          email: [
            {required: true,message: '请输入电子邮箱',trigger: 'blur'},
            {type: 'email',message:'请输入正确的电子邮箱地址',trigger:['blur','change']}
          ],
          introduction: [
            {required: true,message: '请输入签名',trigger: 'blur'}
          ],
          location: [
            {required: true,message: '请输入地区',trigger: 'blur'}
          ]

        }
      }

    },
    computed: {
      data () {
        return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getUser () {
        if (this.select_word == '') {
          this.tableData = this.tempData
        } else {
          this.tableData = []
          for (let item of this.tempData) {
            if (item.username.includes(this.select_word)) {
              this.tableData.push(item)
            }
          }
        }
      },
      //获取当前页
      handleCurrentChange (val) {
        this.currentPage = val
      },
      //查询所有用户
      getData () {
        this.tableData = []
        this.tempData = []
        getAllConsumer().then(res => {
          this.tableData = res
          this.tempData = res

        })
      },
      //弹出编辑页面
      handleEdit (row) {
        this.editVisible = true
        this.editForm = {
          id: row.id,
          username: row.username,
          password: row.password,
          sex: row.sex,
          phoneNum: row.phoneNum,
          email: row.email,
          birth: row.birth,
          introduction: row.introduction,
          location: row.location,
        }
      },
      // 保存编辑页面修改的数据
      editSave () {
        this.$refs['editForm'].validate(valid =>{
          if(valid){
            let d = new Date(this.editForm.birth);
            let datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            let params = new URLSearchParams()
            params.append('id', this.editForm.id)
            params.append('username', this.editForm.username)
            params.append('password', this.editForm.password)
            params.append('sex', this.editForm.sex)
            params.append('phoneNum', this.editForm.phoneNum)
            params.append('email', this.editForm.email)
            params.append('birth', datetime)
            params.append('introduction', this.editForm.introduction)
            params.append('location', this.editForm.location)

            updateConsumer(params)
              .then(res => {
                if (res.code == 1) {
                  this.getData()
                  this.notify('修改成功', 'success')
                } else {
                  this.notify('修改失败', 'error')
                }
              })
              .catch(err => {
                console.log(err)
              })
            this.editVisible = false
          }
        })

      },
      //添加用户
      addConsumer(){
        this.$refs['registerForm'].validate(valid =>{
          if(valid){
            let d = this.registerForm.birth;
            let datetime = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
            let params = new URLSearchParams();
            params.append('username',this.registerForm.username);
            params.append('password',this.registerForm.password);
            params.append('sex',this.registerForm.sex);
            params.append('phoneNum',this.registerForm.phoneNum);
            params.append('email',this.registerForm.email);
            params.append('birth',datetime);
            params.append('introduction',this.registerForm.introduction);
            params.append('location',this.registerForm.location);
            params.append('avator','/img/user.jpg');
            setConsumer(params)
              .then(res => {
                if(res.code == 1){
                  this.getData();
                  this.notify("添加成功","success");
                }else{
                  this.notify("添加失败","error");
                }
              })
              .catch(err => {
                console.log(err);
              });
            this.centerDialogVisible = false;
          }
        })

      },
      //删除一名用户
      delRow () {
        delConsumer(this.idx)
          .then(res => {
            if (res) {
              this.getData()
              this.notify('删除成功', 'success')
            } else {
              this.notify('删除失败', 'error')
            }
          })
          .catch(err => {
            console.log(err)
          })
        this.delVisible = false
      }
    }

  }
</script>

<style scoped>

  .button-space{
    margin-left: 30px;
    display: inline-block;
  }

  .handle-box {
    margin-bottom: 0;
  }

  .singer-img {
    width: 100%;
    height: 80px;
    border-radius: 5px;
    margin-bottom: 5px;
    overflow: hidden;
  }

  .handle-input {
    margin-left: 30px;
    width: 180px;
    display: inline-block;
  }

  .handle-getButton{
    margin-left: 10px;
    display: inline-block;
  }

  .pagination {
    display: flex;
    justify-content: center;
  }
</style>

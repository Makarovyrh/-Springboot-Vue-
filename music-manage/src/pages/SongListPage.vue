<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="medium" @click="delAll">批量删除</el-button>
        <el-button type="primary" size="medium" @click="centerDialogVisible =true">添加歌单</el-button>
        <!-- <el-input v-model="select_word" size="medium" placeholder="筛选关键字" class="handle-input"></el-input> -->
        <el-input v-model="select_word" size="medium" placeholder="        请输入关键字" class="handle-input"></el-input>
        <el-button type="primary" size="medium" class="handle-getButton" @click="getSingList">查询</el-button>
      </div>
    </div>
    <el-table size="medium" ref="multipleTable" border style="width:100%" height="680px" :data="data"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column label="歌单图片" width="110" align="center">
        <template slot-scope="scope">
          <div class="songList-img">
            <img :src="getUrl(scope.row.pic)" style="width: 100%"/>
          </div>
          <!-- <el-upload :action="uploadUrl(scope.row.id)" :before-upload="beforeAvatorUpload"
                     :on-success="handleAvatorSuccess">
            <el-button size="medium">更新图片</el-button>
          </el-upload> -->
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title" width="120" align="center"></el-table-column>
      <el-table-column label="简介" width="520" align="center">
        <template slot-scope="scope">
          <p style="height: 100px;overflow:scroll">{{scope.row.introduction}}</p>
        </template>
      </el-table-column>
      <el-table-column label="风格" prop="style" width="120" align="center"></el-table-column>
      <el-table-column label="歌曲管理" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="medium" @click="songEdit(scope.row.id)" width="320">歌曲管理</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column label="评论" width="90" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="getComment(scope.row.id)">评论</el-button>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="300" align="center">
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
    <el-dialog title="添加歌单" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form :model="registerForm" ref="registerForm" label-width="80px">
        <el-form-item prop="title" label="标题" size="mini">
          <el-input v-model="registerForm.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="简介" size="mini">
          <el-input v-model="registerForm.introduction" placeholder="简介" type="textarea"></el-input>
        </el-form-item>
        <el-form-item prop="style" label="风格" size="mini">
          <el-input v-model="registerForm.style" placeholder="风格"></el-input>
        </el-form-item>


      </el-form>
      <span slot="footer">
        <el-button size="medium" @click="addSongList">确定</el-button>
        <el-button size="medium" @click="centerDialogVisible=false">取消</el-button>
     </span>
    </el-dialog>

    <el-dialog title="编辑歌单" :visible.sync="editVisible" width="400px" center>
      <el-form :model="editForm" ref="editForm" label-width="80px">
        <el-form-item prop="title" label="标题" size="mini">
          <el-input v-model="editForm.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="简介" size="mini">
          <el-input v-model="editForm.introduction" placeholder="简介" type="textarea"></el-input>
        </el-form-item>
        <el-form-item prop="style" label="风格" size="mini">
          <el-input v-model="editForm.style" placeholder="风格"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="medium" @click="editSave">确定</el-button>
        <el-button size="medium" @click="editVisible=false">取消</el-button>
     </span>
    </el-dialog>


    <el-dialog title="删除歌手" :visible.sync="delVisible" width="400px" center>
      <div align="center">删除不可恢复，是否确定删除</div>
      <span slot="footer">
        <el-button size="medium" @click="delRow">确定</el-button>
        <el-button size="medium" @click="delVisible=false">取消</el-button>
     </span>
    </el-dialog>


  </div>
</template>

<script>
  import {getAllSongList, setSongList, updateSongList, delSongList} from '../api/index'
  import {mixin} from '../mixins'

  export default {
    name: 'SongListPage',
    mixins: [mixin],
    data () {

      return {
        centerDialogVisible: false,
        editVisible: false,
        delVisible: false,
        registerForm: {
          id: '',
          title: '',
          introduction: '',
          style: ''
        },
        editForm: {
          id: '',
          title: '',
          introduction: '',
          style: ''
        },

        tableData: [],
        tempData: [],
        select_word: '',
        pageSize: 5,
        currentPage: 1,
        idx: -1,
        multipleSelection: []
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
      getSingList () {
        if (this.select_word == '') {
          this.tableData = this.tempData
        } else {
          this.tableData = []
          for (let item of this.tempData) {
            if (item.title.includes(this.select_word)) {
              this.tableData.push(item)
            }
          }
        }
      },
      //获取当前页
      handleCurrentChange (val) {
        this.currentPage = val
      },
      //查询所有歌单
      getData () {
        this.tableData = []
        this.tempData = []
        getAllSongList().then(res => {
          this.tableData = res
          this.tempData = res
          this.currentPage = 1;
        })
      },
      //弹出编辑页面
      handleEdit (row) {
        this.editVisible = true
        this.editForm = {
          id: row.id,
          title:row.title,
          introduction: row.introduction,
          style:row.style,
        }
      },
      // 保存编辑页面修改的数据
      editSave () {
        let params = new URLSearchParams()
        params.append('id', this.editForm.id)
        params.append('title', this.editForm.title)
        params.append('introduction', this.editForm.introduction)
        params.append('style', this.editForm.style)

        updateSongList(params)
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
      },
      //添加歌单
      addSongList () {
        let params = new URLSearchParams()
        params.append('title', this.registerForm.title)
        params.append('pic', '/img/songListPic/123.jpg')
        params.append('introduction', this.registerForm.introduction)
        params.append('style', this.registerForm.style)

        setSongList(params)
          .then(res => {
            if (res.code == 1) {
              this.getData()
              this.notify('添加成功', 'success')
            } else {
              this.notify('添加失败', 'error')
            }
          })
          .catch(err => {
            console.log(err)
          })
        this.centerDialogVisible = false
      },
      //删除一名歌手
      delRow () {
        delSongList(this.idx)
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
      },
      //转向歌曲管理页面
      songEdit (id, name) {
        this.$router.push({path: `/ListSong`, query: {id}})
      },
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

  .songList-img {
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


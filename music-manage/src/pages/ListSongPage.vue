<template>
  <div class="table">
    <div class="crumbs">
      <font>歌曲信息</font>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="medium" @click="delAll">批量删除</el-button>
        <el-button type="primary" size="medium" @click="centerDialogVisible =true">添加歌曲</el-button>
        <el-input v-model="select_word" size="medium" placeholder="请输入歌曲名" class="handle-input"></el-input>
        <el-button type="primary" size="medium" class="handle-getButton" @click="getSongList">查询</el-button>
      </div>
    </div>
    <el-table size="medium" ref="multipleTable" border style="width:100%" height="680px" :data="tableData"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column label="歌手-歌名" prop="name" align="center"></el-table-column>

      <el-table-column label="操作" width="350" align="center">
        <template slot-scope="scope">
          <el-button size="medium" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  <el-dialog title="添加歌曲" :visible.sync="centerDialogVisible" width="400px" center>
    <el-form :model="registerForm" ref="registerForm" label-width="80px" action="" id="tf">
      <el-form-item prop="singerName" label="歌手名字" size="medium">
        <el-input v-model="registerForm.singerName" placeholder="歌手名字"></el-input>
      </el-form-item>
      <el-form-item prop="songName" label="歌曲名字" size="medium">
        <el-input v-model="registerForm.songName" placeholder="歌曲名字"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button size="medium" @click="getSongId">确定</el-button>
      <el-button size="medium" @click="centerDialogVisible=false">取消</el-button>
     </span>
  </el-dialog>

  <el-dialog title="删除歌曲" :visible.sync="delVisible" width="400px" center>
    <div align="center">删除不可恢复，是否确定删除</div>
    <span slot="footer">
      <el-button size="medium" @click="delRow">确定</el-button>
      <el-button size="medium" @click="delVisible=false">取消</el-button>
     </span>
  </el-dialog>

</div>
</template>

<script>
  import {listSongDetail,songOfSongId,songOfSongName,listSongAdd,delListSong} from '../api/index'
  import {mixin} from '../mixins'

  export default {
    name: 'SingerPage',
    mixins: [mixin],
    data () {

      return {
        centerDialogVisible: false,
        delVisible: false,
        registerForm: {
          singerName: '',
          songName: '',
        },
        tableData: [],
        tempData: [],
        select_word: '',
        idx: -1,
        multipleSelection: [],
        songListId: ''
      }

    },
    created(){
      this.songListId = this.$route.query.id;
      this.getData();
    },
    methods: {
      getSongList () {
        if (this.select_word == '') {
          this.tableData = this.tempData
        } else {
          this.tableData = []
          for (let item of this.tempData) {
            if (item.name.includes(this.select_word)) {
              this.tableData.push(item)
            }
          }
        }
      },
      //查询所有歌手
      getData () {
        this.tempData = [];
        this.tableData = [];
        listSongDetail(this.songListId).then(res => {
          for (let item of res) {
            this.getSong(item.songId);
          }
        })
      },
      
      getSong(id) {
        songOfSongId(id)
          .then(res => {
            this.tempData.push(res);
            this.tableData.push(res);
          })

          .catch(err => {
            console.log(err)
          });
    },

      getSongId(){
        let _this = this;
        var songOfName = _this.registerForm.singerName+"-"+_this.registerForm.songName;
        songOfSongName(songOfName).then(
          res => {
            _this.addSong(res[0].id)
          }
        )
      },

      addSong(songId){
        let _this = this;
        let params = new URLSearchParams();
        params.append('songId',songId);
        params.append('songListId',this.songListId);

        listSongAdd(params)
          .then(res => {
            console.log(res.code)
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
        _this.centerDialogVisible = false;
      },

      delRow(){
        delListSong(this.idx,this.songListId)
          .then(res => {
            if(res){
              this.getData();
              this.notify("删除成功","success");
            }else{
              this.notify("删除失败","error");
            }
          })
          .catch(err => {
            console.log(err);
          });
        this.delVisible = false;
      }
    }

  }
</script>

<style scoped>

  .handle-box {
    margin-bottom: 0;
  }

  .song-img {
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

  .play {
    position: absolute;
    z-index: 100;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    top: 18px;
    left: 15px;
  }

  .icon {
    width: 2em;
    height: 2em;
    color: darkseagreen;
    fill: currentColor;
    overflow: hidden;
  }
</style>

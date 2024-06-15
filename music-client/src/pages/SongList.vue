<template>
    <div class="song-list">
        <ul class="song-list-header">
            <li v-for="(item,index) in songStyle" :key="index" @click="handleChangeView(item.name)"
                :class="{active:item.name==activeName}">
                {{item.name}}
            </li>
        </ul>
        <div>
            <content-list :contentList="data"></content-list>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" background layout="total,prev,pager,next"
                               :current-page="currentPage" :page-size="pageSize" :total="albumDatas.length">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import ContentList from '../components/ContentList';
    import {getAllSongList, getSongListOfLikeStyle} from '../api/index';
    import {mixin} from "../mixins";
    import {songStyle} from '../assets/data/songList';

    export default {
        name: "songList",
        components: {
            ContentList
        },
        data() {
            return {
                albumDatas: [],      //歌单数据
                pageSize: 15,        //页面大小，一页有15条数据
                currentPage: 1,      //当前页，默认第一页
                songStyle: [],           //风格
                activeName: '全部歌单'    //当前风格
            }
        },
        computed: {
            //计算当前表格中的数据
            data() {
                return this.albumDatas.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
            }
        },
        mounted() {
            this.songStyle = songStyle;
            this.getSongList();
        },

        methods: {
            getSongList() {
                getAllSongList()
                    .then(res => {
                        this.currentPage = 1;
                        this.albumDatas = res;
                    })
            },
            //获取当前页
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            //根据style显示对应的歌单
            handleChangeView(name) {
                this.activeName = name;
                this.albumDatas = [];
                if (name == '全部歌单') {
                    this.getSongList();
                } else {
                    this.goSongListOfStyle(name)
                }
            },
            //根据style查询对应的歌单
            goSongListOfStyle(style) {
                getSongListOfLikeStyle(style)
                    .then(res => {
                        this.currentPage = 1;
                        this.albumDatas = res;
                    })
            },

        }
    }
</script>

<style scoped>
    .song-list {
        margin: 30px 150px;
        margin-top: 90px;
        padding-bottom: 50px;
        min-width: 800px;
        background-color: white;
    }

    .song-list-header {
        width: 100%;
        padding: 0 40px;
    }

    .song-list-header li {
        display: inline-block;
        line-height: 40px;
        margin: 40px 20px 15px 20px;
        font-size: 20px;
        font-weight: 400;
        color: #67757f;
        border-bottom: none;
        cursor: pointer;
    }

    .song-list-header li.active {
        color: black;
        font-weight: 600;
        border-bottom: 4px solid black;
    }

    .pagination {
        justify-content: flex-start;
        align-items: stretch;
        flex-direction: row;
        flex-wrap: nowrap;
        display: flex;
        margin-left: 530px;
    }
</style>

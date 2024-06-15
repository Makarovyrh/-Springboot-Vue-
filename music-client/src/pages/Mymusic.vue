<template>
    <div class="my-music">
        <div class="album-slide">
            <div class="album-img">
                <img :src="attachImageUrl(avator)">
            </div>
            <ul class="album-info">
                <li>昵称: {{username}}</li>
                <li>性别: {{userSex}}</li>
                <li>生日：{{birth}}</li>
                <li>故乡：{{location}}</li>
            </ul>
        </div>
        <div class="album-content">
            <div class="album-title">
                个性签名：{{introduction}}
            </div>
            <div class="songs-body">
                <album-content :songList="collectList">
                    <template slot="title">我的收藏</template>
                </album-content>
            </div>
        </div>
    </div>
</template>

<script>
    import {mixin} from '../mixins';
    import {mapGetters} from 'vuex';
    import {getUserOfId, getCollectOfUserId, songOfSongId} from '../api/index';
    import AlbumContent from "../components/AlbumContent";

    export default {
        name: "Mymusic",
        mixins: [mixin],
        components: {
            AlbumContent
        },
        data() {
            return {
                avator: '',       //用户头像
                username: '',     //昵称
                userSex: '',      //性别
                birth: '',        //生日
                location: '',     //故乡
                introduction: '', //签名
                collection: [],     //收藏的歌曲列表
                collectList: [],    //收藏的歌曲列表（带歌曲详情）
            }
        },
        computed: {
            ...mapGetters([
                'listOfSongs',      //当前播放列表
                'userId',           //当前登录用户id
            ])
        },
        mounted() {
            this.getMsg(this.userId);
            this.getCollection(this.userId);
        },
        methods: {
            getMsg(userId) {
                getUserOfId(userId)
                    .then(res => {
                        this.avator = res.avator;
                        this.username = res.username;
                        if (res.sex == 0) {
                            this.userSex = '女';
                        } else if (res.sex == 1) {
                            this.userSex = '男';
                        }
                        this.birth = this.attachBirth(res.birth);
                        this.location = res.location;
                        this.introduction = res.introduction;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
/*            //获取我的收藏列表
            getCollection(userId) {
                getCollectOfUserId(userId)
                    .then(res => {
                        this.collection = res;
                        //通过歌曲id获取歌曲信息
                        for (let item of this.collection) {
                            this.getSongsOfIds(item.songId);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            //通过歌曲id获取歌曲信息
            getSongsOfIds(id) {
                songOfSongId(id)
                    .then(res => {
                        this.collectList.push(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }*/
        }
    }
</script>

<style scoped>
    .my-music {
        margin-top: -100px;
        padding-top: 150px;
      background-color: #67757f;
    }

    .my-music:before {
        /*背景*/
        content: "";
        background-color: #30a4fc;
        position: absolute;
        top: 0;
        width: 100%;
        height: 150px;
    }
    /*左侧*/
    .album-slide {
        float: left;
        width: 400px;
    }

     /*图片*/
       .album-img {
           height: 200px;
           width: 200px;
           display: inline-block;
           position: relative;
           top: -100px;
           left: 50px;
           border-radius: 50%;
           overflow: hidden;
           border: 5px solid white;
       }
    img {
        width: 100%;
    }
    /*信息*/
    .album-info {
        color: black;
        width: 500px;
        font-size: 20px;
        font-weight: 500;
        margin-top: -100px;
        margin-left: 100px;
        padding: 30px 30px;
    }
   .album-info li{
       list-style: none;
        width: 100%;
        line-height: 40px;
   }
    /*歌单内容*/
    .album-content {
        margin-left: 300px;
        padding: 40px 100px;
    }
    /*歌单题目*/
    .album-title {
        font-size: 30px;
        font-weight: 600;
    }

    .songs-body {
        margin-top: 50px;
    }
</style>

<template>
    <div class="song-list-album">
        <div class="album-slide">
            <div class="album-img">
                <img :src="attachImageUrl(tempList.pic)">
            </div>
            <div class="album-info">
                <h2>简介：</h2>
                <span>
                    {{tempList.introduction}}
                </span>
            </div>
        </div>
        <div class="album-content">
            <div class="album-title">
                <p>{{tempList.title}}</p>
            </div>
            <div class="songs-body">
                <album-content :songList="listOfSongs">
                    <template slot="title">歌单</template>
                </album-content>
                <comment :playId="songListId" :type="1"></comment>
            </div>
        </div>

    </div>
</template>

<script>
    import {mixin} from '../mixins';
    import {mapGetters} from 'vuex';
    import {listSongDetail, songOfSongId, setRank, getRankOfSongListId} from '../api/index';
    import AlbumContent from "../components/AlbumContent";

    export default {
        name: "song-list-album",
        mixins: [mixin],
        components: {
            AlbumContent,
        },
        data() {
            return {
                songLists: [],      //当前页面需要展示的歌曲列表
                songListId: '',    //前面传来的歌单id
            }
        },
        computed: {
            ...mapGetters([
                'listOfSongs',      //当前播放列表
                'tempList',         //当前歌单对象
                'loginIn',            //用户是否已经登录
                'userId',            //当前登录用户id
            ])
        },
        created() {
            this.songListId = this.$route.params.id;
            this.getSongId();
            this.getRank(this.songListId);
        },
        methods: {
            //获取当前歌单的歌曲列表
            getSongId() {
                listSongDetail(this.songListId)
                    .then(res => {
                        for (let item of res) {
                            this.getSongList(item.songId);
                        }
                        this.$store.commit('setListOfSongs', this.songLists);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            //根据歌曲id获取歌曲信息
            getSongList(id) {
                songOfSongId(id)
                    .then(res => {
                        this.songLists.push(res);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },

        }
    }
</script>

<style scoped>
    .song-list-album {
        margin-top: -30px;
        padding-top: 100px;
      background-color: #67757f;
    }

    .song-list-album:before {
        content: "";
        background-color: #30a4fc;
        position: absolute;
        top: 0;
        width: 100%;
        height: 140px;
    }

    .album-slide {
        float: left;
        width: 400px;
    }

    .album-img {
        position: relative;
        display: inline-block;
        height: 300px;
        width: 300px;
        top: -100px;
        left: 50px;
        border-radius: 10%;
        overflow: hidden;
        border: 5px solid white;
        background-color: white;
    }

    .album-img img {
        width: 100%;
    }

    .album-info {
        color: black;
        font-size: 20px;
        font-weight: 500;
        margin-top: -120px;
        padding: 30px 40px 30px 60px;
    }

    .album-info span {
        color: rgba(0, 0, 0, 0.5);
    }

    .album-content {
        margin-left: 300px;
        padding: 40px 100px;
    }

    .album-title {
        font-size: 30px;
        font-weight: 600;
    }

    .songs-body {
        background-color: white;
        border-radius: 12px;
        padding: 0 40px 50px 40px;
        min-width: 700px;
    }

    .album-score {
        display: flex;
        align-items: center;
        margin: 50px;
    }

    .album-score > div {
        margin-left: 100px;
    }

    .album-score span {
        font-size: 60px;
    }

    .album-score h3 {
        margin: 10px 0;
    }

</style>

<template>
    <div class="home">
        <Swiper/>
        <div class="section" v-for="(item,index) in songsList" :key="index">
            <div class="section-title">{{item.name}}</div>
            <ContentList :contentList="item.list"></ContentList>
        </div>
    </div>
</template>

<script>
    import Swiper from "../components/Swiper";
    import {getAllSongList, getAllSinger} from "../api";
    import ContentList from "../components/ContentList";

    export default {
        name: 'home',
        components: {
            ContentList,
            Swiper
        },
        data() {
            return {
              songsList: [
                {name: "歌单", list: []},
                {name: "歌手", list: []},
              ]
            }
        },
        created() {
            this.getSongList();
            this.getSinger();
        },
        methods: {
            getSongList() {                      //获取前十条歌单
                getAllSongList().then((res) => {
                    this.songsList[0].list = res.slice(0, 10);
                }).catch((err) => {
                    console.log(err);
                })
            },
            getSinger() {                      //获取前十名歌手
                getAllSinger().then((res) => {
                    this.songsList[1].list = res.slice(0, 10);
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>
    .home {
        margin-top: 60px;
    }

    .section {
        width: 100%;
        margin-top: 20px;
        box-sizing: border-box;
        background-color: white;
        padding: 0 120px 50px 120px;;
    }
  .section-title{
    height: 60px;
      font-weight: 600;
    line-height: 60px;
    padding-top: 50px;
    margin-bottom: 50px;
    font-size: 28px;
    text-align: center;
    color: black;
    box-sizing: border-box;
  }
</style>

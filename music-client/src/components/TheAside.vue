<template>
<transition name="slide-fade">
    <div class="the-aside" v-if="showAside">
     <h2 class="title">播放列表</h2>
        <ul class="menus">
            <li v-for="(item,index) in listOfSongs" :key="index" :class="{'is-play': id == item.id}" @click="toplay(item.id,item.url,item.pic,item.index,item.name)">
                {{replaceFName(item.name)}}
            </li>
        </ul>
    </div>
</transition>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getCollectOfUserId} from "../api";
    export default {
        name: "TheAside",
        computed:{
            ...mapGetters([
                'showAside'  ,          //是否显示播放中的歌曲列表
                'listOfSongs'  ,         //当前歌曲列表
                'id' ,                  //播放中的音乐id
                'loginIn',               //判断用户是否登录
                'userId'  ,               //当前用户登录的id
                'isActive',               //当前播放的歌曲是否已经收藏
            ])
        },
        mounted() {
            let _this=this;
            document.addEventListener('click',function () {
                _this.$store.commit('setShowAside',false)
            },true)
        },
        methods:{
            //获取名字前半部分-歌手名
            replaceLName(str){
                let arr=str.split('-');
                return arr[0];
            },
            //获取名字后半部分-歌名
            replaceFName(str){
                let arr=str.split('-');
                return arr[1];
            },
            //播放
            toplay:function (id,url,pic,index,name ) {
                this.$store.commit('setId',id)
                this.$store.commit('setUrl',this.$store.state.configure.HOST+url)
                this.$store.commit('setPicUrl',this.$store.state.configure.HOST+pic)
                this.$store.commit('setListIndex',index)
                this.$store.commit('setTitle',this.replaceFName(name))
                this.$store.commit('setArtist',this.replaceLName(name))
                this.$store.commit('setIsActive',false);
                if(this.loginIn){
                    getCollectOfUserId(this.userId)
                        .then(res =>{
                            for(let item of res){
                                if(item.songId == id){
                                    this.$store.commit('setIsActive',true);
                                    break;
                                }
                            }
                        })
                }
            },
        }
    }
</script>

<style scoped>

    slide-fade-enter-active {
        transition: all .3s ease;
    }

    slide-fade-leave-active {
        transition: all .2s ease;
    }

    slide-fade-enter, slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }

    .the-aside {
        font-size: 14px;
        width: 250px;
        height: 370px;
        position: fixed;
        right: 0;
        top: 150px;
        z-index: 99;
        background-color: white;
        -webkit-box-shadow:1px 1px 10px rgba(0, 0, 0, 0.4);
        -moz-box-shadow:1px 1px 10px rgba(0, 0, 0, 0.4);
        box-shadow:1px 1px 10px rgba(0, 0, 0, 0.4);
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        overflow: hidden;
    }

    .title {
        padding-left: 20px;
        margin: 10px 0;
        box-sizing: border-box;
    }
    .menus {
        background-color: white;
        width: 100%;
        height: calc(100% - 19px);
        cursor: pointer;
        z-index: 100;
        overflow: scroll;
        white-space: nowrap;
    }
.menus li{
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    box-sizing: border-box;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
}
.menus li:hover{
  background-color: #95d2f6;
    color: white;
}
    .is-play{
        font-weight: bold;
        background-color: #30a4fc;
    }

</style>

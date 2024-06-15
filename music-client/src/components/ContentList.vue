<template>
    <div class="content-list">
        <ul class="section-content">
            <li class="content-item" v-for="(item,index) in contentList" :key="index">
                <div class="kuo" @click="goAlbum(item,item.name)">
                    <img class="item-img" :src="attachImageUrl(item.pic)">
                    <div class="mask">
                        <svg class="icon">
                            <use xlink:href="#icon-bofang"></use>
                        </svg>
                    </div>
                </div>
                <p class="item-name">{{item.name||item.title}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mixin} from "../mixins";

    export default {
        name: "ContentList",
        mixins: [mixin],
        props: ['contentList']
        ,
        methods:{
            goAlbum(item,type){
             this.$store.commit('setTempList',item);
             if (type){//歌手
                 this.$router.push({path:`singer-album/${item.id}`});
             }else{    //歌单
                 this.$router.push({path:`song-list-album/${item.id}`});
             }

            }
        }
    }
</script>

<style scoped>
    .content-list {
        min-height: 500px;
        padding: 0 20px;
    }

    .section-content {
        justify-content: flex-start;
        align-items: stretch;
        flex-direction: row;
        flex-wrap: wrap;

    }

    .content-item {
        float: left;
        width: 18%;
        margin: 20px 1%;
        overflow: hidden;
        border-radius: 4px;
        position: relative;
        -webkit-box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    }

    .content-item:hover {
        -webkit-box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
    }

    .item-name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin: 10px 8px;
    }

    .item-img {
        width: 100%;
        transition: all 0.4s ease;
    }
    .item-img:hover {
        transform: scale(1.1);
    }

    .kuo,.mask{
        width: 100%;
        padding-bottom: 100%;
        height: 0;
        overflow: hidden;
    }

    .mask {
        position: absolute;
        top: 0;
        background-color: rgba(52, 47, 41, 0.4);
        transition: all 0.3s ease-in-out;
        opacity: 0;
        justify-content: center;
        align-items: stretch;
    flex-direction: row;
    flex-wrap: nowrap;
        display: flex;
    }
    .icon {
        position: absolute;
        top: 40%;
        width: 2em;
        height: 2em;
        font-size: 2em;
        fill: currentColor;
        overflow: hidden;
        margin-left: 20px;
        color: rgba(240, 240, 240, 1);

    }

    .mask:hover {
        opacity: 1;
        cursor: pointer;
    }

</style>

<template>
    <div class="content">
        <h1 class="title">
            <slot name="title"></slot>
            <hr/>
        </h1>
        <ul>
            <li>
                <div class="song-item">
                    <span class="item-index"></span>
                    <span class="item-title">歌曲名</span>
                    <span class="item-name">歌手</span>
                    <span class="item-intro">专辑</span>
                </div>
            </li>
            <li v-for="(item,index) in songList" :key="index">
                <div class="song-item" @click="toplay(item.id,item.url,item.pic,index,item.name)">
                    <span class="item-index">{{index+1}}</span>
                    <span class="item-title">{{replaceFName(item.name)}}</span>
                    <span class="item-name">{{replaceLName(item.name)}}</span>
                    <span class="item-intro">{{item.introduction}}</span>
                </div>
            </li>

        </ul>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mixin} from "../mixins";

    export default {
        name: "AlbumContent",
        mixins: [mixin],
        props: ['songList']
    }
</script>

<style scoped>
    .content {
        background-color: white;
        border-radius: 12px;
        padding: 20px 40px;
        min-width: 700px;
    }

    .title {
        text-align: center;
    }

    ul {
        width: 100%;
        padding-bottom: 50px;
    }

    li {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        display: block;
        height: 50px;
        line-height: 50px;
        text-indent: 20px;
        cursor: pointer;
    }

    .song-item {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        flex-direction: row;
        flex-wrap: nowrap;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;

    }

    .item-index {
        width: 5%;
    }

    .item-title {
        width: 30%;
    }

    .item-name {
        width: 25%;
    }

    .item-intro {
        width: 40%;
    }
</style>

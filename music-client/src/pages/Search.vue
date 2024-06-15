<template>
<div class="search">
    <nav class="searchList-nav" ref="change">
        <span :class="{'isActive': toggle=='Songs'}" @click="handleChangeView('Songs')">歌曲</span>
        <span :class="{isActive: toggle=='SongLists'}" @click="handleChangeView('SongLists')">歌单</span>
    </nav>
    <component :is="currentView"></component>
</div>
</template>

<script>
    import SearchSongLists from "../components/search/SearchSongLists";
    import SearchSongs from "../components/search/SearchSongs";
    export default {
        name: "Search",
        components:{
            SearchSongLists,
            SearchSongs
        },
        data(){
            return{
                toggle:'Songs',
                currentView:'SearchSongs'
            }
        },
        methods:{
            //切换组件
            handleChangeView(component){
                this.currentView='Search'+component;
                this.toggle=component;
            }
        }
    }
</script>

<style scoped>
.search{
    margin: auto;
    margin-top:70px;
    border-radius: 12px;
    width: 900px;
    position: relative;
    background-color: rgba(240, 240, 240, 1);
}
.searchList-nav{
    margin-top: 20px;
    font-size: 1.5rem;
    color: black;
    justify-content:space-around;
}
.searchList-nav span{
    line-height: 50px;
    margin: 200px;
    cursor: pointer;
}
.isActive {
    font-weight: 600;
    border-bottom:5px solid black;
}

</style>

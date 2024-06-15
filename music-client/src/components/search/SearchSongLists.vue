<template>
    <div class="search-song-Lists">
        <content-list :contentList="albumDatas"></content-list>
    </div>
</template>

<script>
    import ContentList from '../ContentList';
    import {getSongListOfLikeTitle} from '../../api/index';
    export default {
        name: "SearchSongList",
        components:{
            ContentList
        },
        data(){
            return{
                albumDatas: []
            }
        },
        mounted(){
            this.getSearchList();
        },
        methods:{
            getSearchList(){
                if(!this.$route.query.keywords){
                    this.notify('您输入的内容为空','warning')
                }else{
                    getSongListOfLikeTitle(this.$route.query.keywords)
                        .then(res =>{
                            if(res){
                                this.albumDatas = res
                            }else{
                                this.notify('暂无该歌曲内容','warning')
                            }
                        })
                }
            }
        }
    }
</script>

<style scoped>

    .search-song-Lists{
        min-height: 300px;
        margin-top: 50px;
    }

</style>

import {likeSongOfName,getCollectOfUserId} from "../api";
import {mapGetters} from 'vuex'
export const mixin = {
    computed:{
        ...mapGetters([
            'loginIn',               //判断用户是否登录
            'userId'  ,               //当前用户登录的id
        ])
    },
    methods: {
        //提示信息
        notify(title,type){
          this.$notify({
           title:title,
              type:type
          })
        },
        //获取图片地址
        attachImageUrl (srcUrl) {
            return srcUrl? this.$store.state.configure.HOST+srcUrl : this.$store.state.configure.HOST+ '/img/user.jpg';
        },
        //根据歌手名字模糊查询歌曲
        getSong(){
            if(!this.$route.query.keywords){
                this.$store.commit('setListOfSongs',[]);
                this.notify('您输入的内容为空','warning');
            }else {
                likeSongOfName(this.$route.query.keywords).then(res=>{
                    if(!res.length){
                        this.$store.commit('setListOfSongs',[])
                        this.notify('系统暂无符合条件的歌曲','warning');
                    }else {
                this.$store.commit('setListOfSongs',res)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
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
        toplay:function (id,url,pic,index,name) {
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
        //获取生日
        attachBirth(val){
            return val.substr(0,10);
        }

    }
}

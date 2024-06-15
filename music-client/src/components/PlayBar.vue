<template>
    <div class="play-bar" :class="{show:!toggle}">
<!--        <div @click="toggle=!toggle" class="item-up" :class="{turn: toggle}">
            <svg class="icon">
                <use xlink:href="#icon-jiantou-xia-cuxiantiao"></use>
            </svg>
        </div>-->
        <div class="kongjian">
            <!-- 上一首 -->
            <div class="item">
                <svg class="icon">
                    <use xlink:href="#icon-ziyuanldpi" @click="prev"></use>
                </svg>
            </div>
            <!-- 播放 -->
            <div class="item" @click="togglePlay">
                <svg class="icon">
                    <use :xlink:href="playButtonUrl"></use>
                </svg>
            </div>
            <!-- 下一首 -->
            <div class="item">
                <svg class="icon">
                    <use xlink:href="#icon-ziyuanldpi1" @click="next"></use>
                </svg>
            </div>
            <!-- 播放进度 -->
            <div class="playing-speed">
                <!-- 播放开始时间 -->
                <div class="current-time">{{nowTime}}</div>
                <div class="progress-box">
                    <div class="item-song-title">
                        <div>{{this.title}}</div>
                        <div>{{this.artist}}</div>
                    </div>
                    <div ref="progress" class="progress" @mousemove="mousemove">
                        <!-- 进度条 -->
                        <div ref="bg" class="bg" @click="updatemove">
                            <div ref="curProgress" class="cur-progress" :style="{width:curLength+'%'}"></div>
                        </div>
                        <!-- 拖动的点点 -->
                        <div ref="idot" class="idot" :style="{left:curLength+'%'}" @mousedown="mousedown"
                             @mouseup="mouseup"></div>
                    </div>
                </div>
                <!-- 播放结束时间 -->
                <div class="left-time">{{songTime}}</div>
                <!-- 音量 -->
                <div class="item item-volume">
                    <svg v-if="volume == 0" class="icon">
                        <use xlink:href="#icon-yinliangjingyinheix"></use>
                    </svg>
                    <svg v-else class="icon">
                        <use xlink:href="#icon-yinliang1"></use>
                    </svg>
                    <el-slider class="volume" v-model="volume" :vertical="true"></el-slider>
                </div>
                <!-- 下载 -->
                <div class="item" @click="download">
                    <svg class="icon">
                        <use xlink:href="#icon-xiazai"></use>
                    </svg>
                </div>
                <!-- 当前播放的歌曲列表 -->
                <div class="item">
                    <svg  class="icon" >
                        <use xlink:href="#icon-liebiao" @click="changeAside"></use>
                    </svg>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import {download,setCollect,getCollectOfUserId} from "../api";

    export default {
        name: 'play-bar',
        data() {
            return {
                nowTime: '00:00',        //当前播放进度的时间
                songTime: '00:00',        //当前歌曲总时间
                curLength: 0,            //进度条的位置
                progressLength: 0,      //进度条的总长度
                mouseStartX: 0,      //拖拽开始位置
                tag: false,             //拖拽开始结束的标志，当开始拖拽，它的值才会变成true
                volume: 50,             //音量，默认一半
                toggle:true             //显示隐藏播放器页面
            }
        },
        computed: {
            ...mapGetters([
                'id',               //歌曲id
                'url',              //歌曲地址
                'isPlay',           //播放状态
                'playButtonUrl',   //播放状态的图标
                'picUrl',            //正在播放的音乐的图片
                'title',                  //歌名
                'artist',                 //歌手名
                'duration',                //音乐时长
                'curTime',                //当前音乐的播放位置
                'showAside',             //是否显示播放中的歌曲列表
                'listIndex',             //当前歌曲在歌单中的位置
                'listOfSongs',            //当前歌单列表
                'autoNext',              //自动播放下一首
                'loginIn',               //判断用户是否登录
                'userId'  ,               //当前用户登录的id
                'isActive',               //当前播放的歌曲是否已经收藏
            ])
        },
        watch: {
            //切换播放状态的图标
            isPlay() {
                if (this.isPlay) {
                    this.$store.commit('setPlayButtonUrl', '#icon-zanting');
                } else {
                    this.$store.commit('setPlayButtonUrl', '#icon-bofang');
                }
            },
            curTime() {
                this.nowTime = this.formatSeconds(this.curTime);
                this.songTime = this.formatSeconds(this.duration);
                this.curLength = (this.curTime / this.duration) * 100;
            },
            //音量变化
            volume() {
                this.$store.commit('setVolume', this.volume / 100);
            },
            //自动播放下一首
            autoNext(){
              this.next();
            },
        },
        mounted() {
            this.progressLength = this.$refs.progress.getBoundingClientRect().width;
            document.querySelector('.item-volume').addEventListener('click', function (e) {
                document.querySelector('.volume').classList.add('show-volume');
                e.stopPropagation();
            }, false);
            document.querySelector('.volume').addEventListener('click', function (e) {
                e.stopPropagation();
            }, false);
            document.addEventListener('click', function () {
                document.querySelector('.volume').classList.remove('show-volume');
            }, false);
        },
        methods: {
            //提示信息
            notify(title,type) {
                this.$notify({
                    title: title,
                    type: type
                })
            },
            //控制音乐播放、暂停
            togglePlay() {
                if (this.isPlay) {
                    this.$store.commit('setIsPlay', false);
                } else {
                    this.$store.commit('setIsPlay', true);
                }
            },
            //解析时间
            formatSeconds(value) {
                let theTime = parseInt(value);
                let result = '';    //返回值
                let hour = parseInt(theTime / 3600);    //小时
                let minute = parseInt((theTime / 60) % 60); //分钟
                let second = parseInt(theTime % 60);        //秒
                if (hour > 0) {
                    if (hour < 10) {
                        result = '0' + hour + ":";
                    } else {
                        result = hour + ":";
                    }
                }
                if (minute > 0) {
                    if (minute < 10) {
                        result += "0" + minute + ":";
                    } else {
                        result += minute + ":";
                    }
                } else {
                    result += "00:";
                }
                if (second > 0) {
                    if (second < 10) {
                        result += "0" + second;
                    } else {
                        result += second;
                    }
                } else {
                    result += "00";
                }
                return result;
            },
            //拖拽开始
            mousedown(e) {
                this.mouseStartX = e.clientX;
                this.tag = true;
            },
            //拖拽结束
            mouseup() {
                this.tag = false;
            },
            //拖拽中
            mousemove(e) {
                if (!this.duration) {
                    return false;
                }
                if (this.tag) {
                    let movementX = e.clientX - this.mouseStartX;       //点点移动的距离
                    let curLength = this.$refs.curProgress.getBoundingClientRect().width;
                    let newPercent = ((movementX + curLength) / this.progressLength) * 100;
                    if (newPercent > 100) {
                        newPercent = 100;
                    }
                    this.curLength = newPercent;
                    this.mouseStartX = e.clientX;
                    this.changeTime(newPercent);
                }
            },
            //更改歌曲进度
            changeTime(percent) {
                let newCurTime = (percent * 0.01) * this.duration;
                this.$store.commit('setChangeTime', newCurTime);
            },
            //点击播放条切换播放进度
            updatemove(e) {
                if (!this.tag) {
                    //进度条的左侧坐标
                    let curLength = this.$refs.bg.offsetLeft;
                    let newPercent = ((e.clientX - curLength) / this.progressLength) * 100;
                    if (newPercent > 100) {
                        newPercent = 100;
                    } else if (newPercent < 0) {
                        newPercent = 0;
                    }
                    this.curLength = newPercent;
                    this.changeTime(newPercent);
                }
            },
            //显示播放中的歌曲列表
            changeAside() {
                this.$store.commit('setShowAside', true);
            },
            //上一首
            prev() {
                if (this.listIndex != -1 && this.listOfSongs.length > 1) {    //当前处于不可能状态或者只有只有一首音乐的时候不执行）
                    if (this.listIndex > 0) {                                 //不是第一首音乐
                        this.$store.commit('setListIndex', this.listIndex - 1);  //直接返回上一首
                    } else {                                                  //当前是第一首音乐
                        this.$store.commit('setListIndex', this.listOfSongs.length - 1);  //切换到倒数第一首
                    }
                    this.toplay(this.listOfSongs[this.listIndex].url);
                }
            },
            //下一首
            next() {
                if (this.listIndex != -1 && this.listOfSongs.length > 1) {    //当前处于不可能状态或者只有只有一首音乐的时候不执行）
                    if (this.listIndex < this.listOfSongs.length - 1) {                                 //不是最后一首音乐
                        this.$store.commit('setListIndex', this.listIndex + 1);  //直接返回下一首
                    } else {                                                      //当前是最后一首音乐
                        this.$store.commit('setListIndex', 0);  //切换到第一首
                    }
                    this.toplay(this.listOfSongs[this.listIndex].url);
                }
            },
            //播放音乐
            toplay: function (url,id) {
                if (url && url != this.url) {
                    this.$store.commit('setId', this.listOfSongs[this.listIndex].id);
                    this.$store.commit('setUrl', this.$store.state.configure.HOST + url);
                    this.$store.commit('setPicUrl', this.$store.state.configure.HOST + this.listOfSongs[this.listIndex].pic);
                    this.$store.commit('setTitle', this.replaceFName(this.listOfSongs[this.listIndex].name));
                    this.$store.commit('setArtist', this.replaceLName(this.listOfSongs[this.listIndex].name));
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
                }
            },
            //获取名字前半部分--歌手名
            replaceLName(str) {
                let arr = str.split('-');
                return arr[0];
            },
            //获取名字后半部分--歌名
            replaceFName(str) {
                let arr = str.split('-');
                return arr[1];
            },

            //下载音乐
            download() {
                download(this.url)
                    .then(res=>{
                        let content = res.data;
                        let eleLink = document.createElement('a');
                        eleLink.download = `${this.artist}-${this.title}.mp3`;
                        eleLink.style.display = 'none';
                        //把字符内容转换成blob地址
                        let blob = new Blob([content]);
                        eleLink.href = URL.createObjectURL(blob);
                        //把链接地址加到document里
                        document.body.appendChild(eleLink);
                        //触发点击
                        eleLink.click();
                        //然后移除掉这个新加的控件
                        document.body.removeChild(eleLink);
                    })
                    .catch(err =>{
                        console.log(err);
                    })
            },

        }
    }
</script>

<style scoped>
    .play-bar {
        position: fixed;
        bottom: 0;
        width: 100%;
        transition: all 0.5s;
        -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    }

    .item-up {
        position: absolute;
        bottom: 70px;
        left: 20px;
        cursor: pointer;
    }

    .kongjian {
        display: flex;
        bottom: 0;
        width: 100%;
        min-width: 1000px;
        background-color: #fefefe;
        height: 60px;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap
    }

    .item {
        position: relative;
        width: 80px;
        height: 50px;
        line-height: 60px;
        text-align: center;
        cursor: pointer;
    }

    .icon.active {
        color: red !important;
    }

    .volume {
        position: absolute;
        display: none;
        height: 100px;
        top: -110px;
        right: 22px;
    }

    .show-volume {
        display: block;
    }

    .item-img {
        width: 60px;
        height: 60px;
    }

    .item-img img {
        width: 100%;
    }

    .playing-speed {
        height: 50px;
        width: 900px;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        display: flex;
    }

    .current-time, .left-time {
        width: 70px;
        text-align: center;
        font-size: 13px;
        color: black;
        font-weight: 500;
        top: -10px;
    }

    .progress-box {
        flex: 1;
    }

    .item-song-title {
        height: 20px;
        line-height: 10px;
        justify-content: space-between;
        align-items: stretch;
        flex-direction: row;
        flex-wrap: nowrap;
        display: flex;
      ;

    }

    .progress {
        width: 100%;
        background: #a9dbf9;
        height: 6px;
    }

    .bg {
        height: 100%;
    }

    .cur-progress {
        height: 100%;
        background: #30a4fc;
    }

    .idot {
        width: 16px;
        height: 16px;
        position: relative;
        border-radius: 50%;
        background-color: black;
        top: -11px;
        vertical-align: middle;
    }

    .turn {
        transform: rotate(180deg);
    }

    .show {
        bottom: -60px;
    }

    .icon {
        width: 1.2em;
        height: 1.2em;
        font-size: 1.2em;
        color: black;
        fill: currentColor;
        overflow: hidden;
        position: relative;
    }

</style>



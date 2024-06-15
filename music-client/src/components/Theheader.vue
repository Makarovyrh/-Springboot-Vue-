<template>
    <div class="the-header">
        <div class="header-logo" @click="goHome">
            <span>用户端</span>
        </div>
        <ul class="navbar">
            <li :class="{active: item.name == activeName}" v-for="item in navMsg" :key="item.path"
                @click="goPage(item.path,item.name)">
                {{item.name}}
            </li>
            <li>
                <div class="header-search">
                    <input type="text" placeholder="搜索音乐" @keyup.enter="goSearch()" v-model="keywords"></input>
                    <div class="search-btn" @click="goSearch()">
                        <svg class="seicon">
                            <use xlink:href="#icon-sousuo"></use>
                        </svg>
                    </div>
                </div>
            </li>

            <li v-show="!loginIn" :class="{active: item.name == activeName}" v-for="item in loginMsg" :key="item.path"
                @click="goPage(item.path,item.name)">
                {{item.name}}
            </li>
        </ul>
        <div class="header-right" v-show="loginIn">
            <div id='user'>
                <img :src='attachImageUrl(avator)'>
            </div>
            <ul class="menu">
                <li v-for="(item,index) in menuList" :key="index" @click="goMenuList(item.path)">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {navMsg, loginMsg, menuList,} from "../assets/data/header";
    import {mapGetters} from 'vuex'

    export default {
        name: "Theheader",
        data() {
            return {
                navMsg: [],   //左侧导航栏
                keywords: '',  //搜索关键字
                loginMsg: [],   //右侧导航栏
                menuList: [], //用户下拉菜单
            }
        },
        computed: {
            ...mapGetters([
                'activeName',
                'loginIn',
                'avator'
            ])
        },
        created() {
            this.navMsg = navMsg;
            this.loginMsg = loginMsg;
            this.menuList = menuList;
        },
        mounted() {
            document.querySelector('#user').addEventListener('click', function (e) {
                document.querySelector('.menu').classList.add("show");
                e.stopPropagation()           //关键在于阻止冒泡
            }, false);
            document.querySelector('.menu').addEventListener('click', function (e) {
                e.stopPropagation()           //点击菜单内部时，阻止时间冒泡，这样，点击内部时，菜单不会关闭
            }, false);
            document.addEventListener('click', function () {
                document.querySelector('.menu').classList.remove('show');
            }, false);
        },
        methods: {
            //提示信息
            notify(title,type){
                this.$notify({
                    title:title,
                    type:type
                })
            },
            goHome() {
                this.$router.push({path: ""})
            },
            goPage(path, name) {
                if (!this.loginIn && path=='/my-music'){
                   alert('请先登录');
                }else{
                    this.$store.commit('setActiveName', name);
                    this.$router.push({path: path});
                }

            },
            goSearch() {
                this.$router.push({path: '/search', query: {keywords: this.keywords}})
            },
            //获取图片地址
            attachImageUrl(srcUrl) {
                return srcUrl ? this.$store.state.configure.HOST + srcUrl : '../assets/img/user.jpg';
            },
            goMenuList(path) {
                if (path == 0) {
                    this.$store.commit('setLoginIn', false);
                    this.$store.commit('setIsActive', false);
                    this.$router.go(0);
                } else {
                    this.$router.push({path: path});
                }
            },
        }
    }

</script>

<style scoped>
    .the-header {
        justify-content: flex-start;
        align-items: stretch;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        height: 70px;
        line-height: 70px;
        padding: 0 80px;
        margin: 0;
        background-color: #fefefe;
        box-sizing: border-box;
        z-index: 100;
        -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    }

    .header-logo {
        margin: 0 10px;
        font-size: 26px;
        font-weight: bold;
        white-space: nowrap;
        cursor: pointer;
    }

    .icon {
        vertical-align: middle;
        width: 50px;
        height: 50px;
        font-size: 50px;
        color: #000000;
        fill: currentColor;
        overflow: hidden;
        position: relative;
    }

    .navbar {
        white-space: nowrap;
        height: 70px;
        margin-top: -70px;
        margin-left: 200px;
    }

    .navbar li {
        list-style: none;
        float: left;
        font-size: 18px;
        color: #67757f;
        padding: 0 10px;
        margin: 0 10px;
        text-align: center;
        border-bottom: none;
        box-sizing: border-box;
        cursor: pointer;
    }


    .header-search {
        border-radius: 5px;
    }

    .header-search input {
        height: 35px;
        width: 270px;
        font-size: 14px;
        background-color: #ebeef0;
        border: 0;
        text-indent: 10px;
    }

    .search-btn {
        background-color: #30a4fc;
        width: 60px;
        height: 35px;
        cursor: pointer;
        margin-left: 340px;
        margin-top: -50px;
    }

    .seicon {
        padding-bottom: 10px;
        width: 1.2em;
        height: 1.2em;
        font-size: 1.2em;
        color: white;
        fill: currentColor;
        overflow: hidden;

    }

    .header-right {
        position: relative;

        flex-direction: row;
        flex-wrap: nowrap;
        margin-top: -70px;
        padding-left: -200px;
        display: flex;
    }

    #user {
        overflow: hidden;
        width: 46px;
        width: 46px;
        margin: 0 25px;
        cursor: pointer;
    }

    #user img {
        width: 100%;
        border-radius: 50%;
    }

    .menu {
        display: none;
        line-height: 0px;
        position: absolute;
        background-color: white;
        -webkit-box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
        width: 150px;
        padding: 7px 0px;
        border-radius: 4px;
        top: 45px;
        right: 280px;
        z-index: 5;
        text-align: center;
        cursor: pointer;
    }

    .menu li {
        display: inline-block;
        width: 100%;
        height: 40px;
        line-height: 40px;
    }

    .menu li:hover {
        background-color: #95d2f6;
        color: white;
    }

    .menu:nth-child(1):before {
        content: " ";
        display: block; /*独占一行*/
        position: absolute;
        right: 45px;
        top: -5px; /*果断的露出上半部分*/
        width: 10px;
        height: 10px;
        background-color: white;
        /*一个正方形倾斜四十五度就是三角了但是要把下半部分藏起来*/
        transform: rotate(45deg);
    }

    .show {
        display: block;
    }
</style>

<template>
    <div class="setting">
        <div class="leftCol">
            <div class="settingsMainHeader">设置</div>
            <ul class="setting-aside">
                <li v-for="(item,index) in settingList" :key="index" :class="{activeColor: activeName==item.name}"
                    @click="handleClick(item)">
                    {{item.name}}
                </li>
            </ul>
        </div>
        <div class="contentCol">
            <component :is="componentSrc"></component>
        </div>
    </div>
</template>

<script>
    import Info from '../components/Info';

    export default {
        name: "Setting",
        components: {
            Info
        },
        data() {
            return {
                settingList: [
                    {name: '个人信息', path: 'Info'}
                ],
                activeName: '个人信息',
                componentSrc: 'Info'
            }
        },
        methods: {
            handleClick(item) {
                this.activeName = item.name;
                this.componentSrc = item.path;
            }
        }
    }
</script>

<style scoped>
    .setting {
        margin: 30px 10%;
        margin-top: 90px;
        min-height: 65vh;
        justify-content: flex-start;
        align-items: stretch;
        flex-direction: row;
        flex-wrap: nowrap;
        background-color: #d0edff;
        border-radius: 12px;
        display: flex;
    }

    /* 左侧导航栏 */
    .leftCol {
        margin-top: 10px;
        padding: 0 20px;
        box-sizing: border-box;
        width: 200px;
        margin-right: 50px;
    }

    .settingsMainHeader {
        height: 60px;
        line-height: 60px;
        font-size: 22px;
        font-weight: 500;
    }
    .setting-aside {
        width: 100%;
    }
    .setting-aside li{
        display: block;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        padding: 0 10px;
        box-sizing: border-box;
        border-radius: 5px;
        margin-right: 2px;
        cursor: pointer;
    }
    .setting-aside li:hover{
      background-color: #30a4fc;
     color: white;
    }
    .setting-aside li:active{
      background-color: #a9dbf9;
    }
    .activeColor {
        background-color: #a9dbf9 !important;
        color: white;
    }

    /* 右边内容 */
    .contentCol {
        flex: 1;
        padding-top: 20px;
    }
</style>

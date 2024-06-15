import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Singer from "../pages/Singer";
import SongList from "../pages/SongList";
import Search from "../pages/Search";
import LoginIn from "../pages/LoginIn";
import Register from "../pages/Register";
import Setting from "../pages/Setting";
import SingerAlbum from "../pages/SingerAlbum";
import SongListAlbum from "../pages/SongListAlbum";
import Mymusic from "@/pages/Mymusic.vue";

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'home',
      component: Home

    },
    {
      path: '/my-music',
      name: 'my-music',
      component: Mymusic
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer
    },
    {
      path: '/song-list',
      name: 'song-list',
      component: SongList
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path:'/login-in',
      name:'LoginIn',
      component:LoginIn
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/singer-album/:id',
      name: 'SingerAlbum',
      component: SingerAlbum
    },
    {
      path: '/song-list-album/:id',
      name: 'SongListAlbum',
      component: SongListAlbum
    },
  ],

})


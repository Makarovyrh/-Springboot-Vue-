<template>
  <div id="app">

    <TheHeader/>
    <router-view class="music-content"></router-view>
    <SongAudio/>
    <PlayBar/>
    <TheAside/>
    <TheFooter/>
  </div>
</template>

<script>
  import TheHeader from "./components/Theheader";
  import TheFooter from "./components/TheFooter";
  import SongAudio from "./components/SongAudio";
  import PlayBar from "./components/PlayBar";
  import TheAside from "./components/TheAside";

  export default {
    name:'App',
    components: {TheAside, PlayBar, SongAudio, TheFooter, TheHeader}
  }
</script>

<style>
  #app{
    justify-content: flex-start;
    align-items: stretch;
    flex-direction:column;
  }
.music-content{
  flex: 1;

}

</style>

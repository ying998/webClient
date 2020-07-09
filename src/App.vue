<template>
  <div id="app" >
  
    <router-view/>
    <div :style="{height:allheight}" class="skin">
      
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        allheight:0,

      }
    },
    computed: {
      listenshowpage1() {
        return this.$store.state.flag;
      }
    },
    watch:{
      listenshowpage1:function(old,newd){
        console.log(old,newd)
        if(old){
          this.allheight = document.documentElement.clientHeight+'px'//遮挡框高度
        }else{

          this.allheight = 0
        }
      }
    },
    mounted(){
      this.$store.commit('changeFlag',false)    
    }
  }
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
body
  margin:0
  background-color:#d9d9d9
  height:100%
a
  color:#000
  text-decoration:none
.mintui-back:before
  color:#fff
.mint-indicator-wrapper {
    z-index: 1000 !important;
  }
 
  .mint-indicator-mask {
    z-index: 1000 !important;
  }
.skin
  background-color:#000;
  position:fixed;
  opacity:0.4;
  width:100%;
  top:0;
  left:0;
  pointer-events: none;
  z-index:10000
</style>

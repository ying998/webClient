<template>
  <div class="home">
    <!-- 头部 -->
    <mt-header title="看点新闻" fixed>
        <mt-button class="icon-ali icon-aliicon-test2" slot="left" @click="leftPop"></mt-button>
      <mt-button icon="more" slot="right"@click="rightVisible=true;leftVisible=false"></mt-button>
    </mt-header>
    <!-- 登录 -->
    <mt-popup v-if="!this.$cookie.get('username')" v-model="loginVisible" style="width:80%;padding:20px;text-align:center">
      <p>您还未登录</p>
      <div style="width:50%;margin:0 auto;display:flex;justify-content:space-between">
        <router-link to="/login"><mt-button type="primary" size="small">登录</mt-button></router-link>
        <router-link to="/register"><mt-button type="primary" size="small">注册</mt-button></router-link>
      </div>
    </mt-popup>
    <!-- 左侧弹层 -->
    <mt-popup v-if="this.username" position="left" popup-transition="popup-fade" v-model="leftVisible" :modal="false" style="width:50%;box-shadow: 5px 5px 5px #888888">
      <div style="background-color:#fff">
        <div style="text-align:center;padding:10px 0;">
          <span class="portrait"><img :src="'http://localhost:3000/public/uploads/'+this.$cookie.get('portrait')" height="50" width="50"></span>
          <span>{{this.$cookie.get('username')}}</span>
        </div>
        <mt-cell title="我的资料" to="/info">
          <i slot="icon" class="icon-ali icon-aliicon-test9" ></i>
        </mt-cell>
        <mt-cell title="修改密码" to="/modifypsw">
          <i slot="icon" class="icon-ali icon-alibianji" ></i>
        </mt-cell>
        <mt-cell title="我的文章" to="/article">
          <i slot="icon" class="icon-ali icon-aliicon-test6" ></i>
        </mt-cell>
        <mt-cell title="我的收藏" to="/collect">
          <i slot="icon" class="icon-ali icon-aliicon-test4" ></i>
        </mt-cell>
        <mt-cell title="我的反馈" to="/back">
          <i slot="icon" class="icon-ali icon-aliicon-test7" ></i>
        </mt-cell>
        <mt-cell title="退出登录" @click.native="out">
          <i slot="icon" class="icon-ali icon-aliicon-test8" ></i>
        </mt-cell>

      </div>
    </mt-popup>
    <!-- 右侧弹层 -->
    <mt-popup position="right" popup-transition="popup-fade" v-model="rightVisible" :modal="false" style="width:30%;box-shadow: 5px 5px 5px #888888">
      <div style="background-color:#fff">
        <mt-cell title="发布文章" @click.native="publish">
          <i slot="icon" class="icon-ali icon-alizengjia" ></i>
        </mt-cell>
        <mt-cell title="用户反馈"  @click.native="back">
          <i slot="icon" class="icon-ali icon-aliicon-test12" ></i>
        </mt-cell>
        <mt-cell :title="colorName" @click.native="colorModel">
          <i slot="icon" class="icon-ali icon-alitishi" ></i>
        </mt-cell>
      </div>
    </mt-popup>
    <div  @click="leftVisible = false;rightVisible = false">

      <!-- 导航栏 -->
      <div style="padding:10px;box-sizing:border-border;margin-top:40px">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">头条</mt-tab-item>
          <mt-tab-item id="2">社会</mt-tab-item>
          <mt-tab-item id="3">文章</mt-tab-item>
        </mt-navbar>
        <!-- 头条、社会、文章 -->
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <News :type="'头条'"></News>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <!-- <News :type="'社会'"></News> -->
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <News :type="'文章'"></News>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <!-- 置顶标志 -->
      <div class="toTop" v-back="10">
        <span class="icon-ali icon-aliicon-test1"></span>
      </div>
    </div>
    
  </div>
</template>

<script>

import News from '@/components/News.vue'

export default {
  name: 'Index',
  data(){
    return{
      username:this.$cookie.get('username'),
      id:this.$cookie.get('id'),
      selected:"1",//导航栏选中面板
      leftVisible:false,//左侧弹层
      rightVisible:false,
      loginVisible:false,
      flag:true,//判断是否登录
      backValue:'',//反馈内容
      count:0,//记录点击的模式
      colorName:'夜间模式'
    }
  },
  components:{
    News
  },
  mounted(){
    
  },
  methods:{
    //左侧面板
    leftPop(){
      console.log(this.$cookie.get('username'))
      if(!this.$cookie.get('username')){
        this.loginVisible = true
        this.rightVisible=false;
      }else{
        this.leftVisible=true;
        this.rightVisible=false
      }
      
    },
   
    //退出登录
    out(){
      this.$cookie.remove('username')
      this.leftVisible=false
      this.$toast({
        message: '已退出登录',
        duration:1000
      });
    },
    //发布文章
    publish(){
      //判断是否处于登录状态
      if(this.$cookie.get('username')){
        this.$router.push({path:'/publish'})
      }else{
        this.rightVisible = false
        this.loginVisible = true
      }
    },
    //用户反馈
    back(){
      //判断是否处于登录状态
      if(!this.$cookie.get('username')){
        this.loginVisible = true
        this.rightVisible = false
        return ;
      }
       this.$messagebox.prompt(' ','反馈内容')
        .then(res => {
          if (res.action === 'confirm') {
             this.rightVisible=false

            //判断提交的是否为空
            if(res.value==null){
              this.$toast({
                message: '反馈失败，内容为空',
                iconClass: 'icon-ali icon-aliwarning',
                duration:2000,
              });
              return ;
            }

            this.$axios.post('/api/back/add',{
              backname:this.id,
              content:res.value
            }).then(result=>{
              this.$toast({
                message: result.data.msg,
                iconClass: 'icon-ali icon-aliright',
                duration:2000,
              }); 
            })
              
          }
        }).catch(err=>{
          console.log(err)
          this.rightVisible=false
        })
    },
    //模式切换
    colorModel(){
      
      if(this.count%2==1){
        this.colorName = '夜间模式'
        this.$store.commit('changeFlag',false)
      }else{
        this.colorName = '日间模式'
        this.$store.commit('changeFlag',true)
      }
      this.count++
      console.log(this.count,this.$store.state.flag)
    }
  }
}
</script>
<style lang="stylus" scoped>
.mint-search
  height:100%;
  z-index:-1
ul
  list-style:none
  display:flex
  margin:0
  padding:0
  justify-content:space-between
ul li
  width:30%
ul li img
  width:100%
  height:100%
  box-shadow:5px 5px 5px #888888;
.newslist
  box-shadow: 0 0 15px #888888;
  background-color:#fff
  padding:10px
  border:1px solid grey
h4
  margin: 0px
  margin-bottom: 5px

//置顶
.toTop
  background-color:red
  width:40px;
  height:40px;
  position:fixed
  z-index:100
  bottom:10px
  right:10px
  color:#fff
  border-radius:20px
  text-align:center
  padding-top: 10px;
  box-sizing: border-box;
.toTop span
  align-self:center

//弹窗
.mint-popup-left
  top:228px
.mint-popup-right
  top:111px
//头像
.portrait
  display:block
  width:50px
  height:50px
  border-radius:25px
  overflow:hidden
  margin:0 auto
.mint-toast
  font-size:30px

</style>

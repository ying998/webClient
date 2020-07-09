<!-- 新闻获取 -->
<template>
  <div class="home">
      <div v-if="type!='文章'&&this.list.length"  class="newslist"  v-for="item in list" @click="newsDetail(item)">
          <h4>{{item.title}}</h4>
          <ul>
            <li>
              <img v-lazy="item.hasOwnProperty('thumbnail_pic_s')?item.thumbnail_pic_s:url">
            </li> 
            <li>
              <img v-lazy="item.hasOwnProperty('thumbnail_pic_s02')?item.thumbnail_pic_s02:url">
            </li>
            <li>
              <img v-lazy="item.hasOwnProperty('thumbnail_pic_s03')?item.thumbnail_pic_s03:url">
            </li>
          </ul>
      </div>
      <div v-if="type=='文章'" class="newslist"  v-for="item in list" @click="articleDetail(item._id)">
          <h4>{{item.title}}</h4>
          <ul>
            <li v-if="item.photos.length!=0" v-for="img in item.photos">
              <img v-lazy="'http://localhost:3000/public/articleImgs/'+img">
            </li> 
          </ul>
      </div>
      <div v-if="!this.list.length" style="text-align:center">
        <p>{{tip}}</p>
        <p >暂无新闻~~</p>
      </div>
        
  </div>
</template>

<script>

export default {
  name: 'News',
  data(){
    return{
      list:[],
      url:"http://localhost:3000/public/articleImgs/default.jpg",
      tip:''
    }
  },
  mounted(){
    this.getnews();
  },
  methods:{
    getnews(){
      console.log(this.type)
      if(this.type =='文章'){
           //获取w文章
          this.$axios.get('/api/article/list')
          .then(res=>{
            console.log(res)
            this.list = res.data.result
          })
      }else{
         //获取头条信息
        this.$axios.get('/news/index',{
          params:{
            key:'d2f47f5d5981c66091cfa284cecfd781',
            type:this.type
          }
        }).then(res=>{
          console.log(res)
          if(res.data.resultcode=='112'){
            this.tip = res.data.reason
          }else{
            this.list = res.data.result.data
          }
          
        })
      }
     
    },
    //新闻详情
    newsDetail(item){
      // this.$router.push({path:'/newsDetail'})
      this.$router.push({path:'/indexDetail'})

      this.$store.commit('changeNews',{
            url:item.url,//新闻地址
            uniquekey:item.uniquekey,//新闻key
            photo:item.thumbnail_pic_s,//新闻图片
            title:item.title
        })
      this.$store.commit('changeBackName','/')
    },
    //文章详情
    articleDetail(id){
       this.$router.push({
          path: `/articleDetail/${id}`,
      })
      this.$store.commit('changeBackName','/')
    }
    
  },
  props:["type"]
}
</script>
<style lang="stylus" scoped>
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
  border:0.5px solid grey
h4
  margin: 0px;
  margin-bottom: 5px;
</style>

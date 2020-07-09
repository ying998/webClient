<template>
	<div>
		<mt-header title="我的收藏">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		  <mt-button  slot="right"v-if="!flag&&this.list.length" @click="delCollect">删除</mt-button>
		</mt-header>
		<div style="padding:10px">
			<div style="background-color:#fff;margin-bottom:10px;display:flex;align-items:center;padding:0 5px" v-for="item in list">
				<input v-if="!flag" type="checkbox" ref="box" value="" :data-index="item._id">
        <img v-if="item.url" class="portrait" :src="item.photo">
				<img v-if="!item.url"class="portrait" :src="'http://localhost:3000/public/articleImgs/'+item.article.photos[0]">
        <div  v-if="item.url" style="padding-left:10px" @click="toNewsDetail(item)">
          <h5>{{item.title}}</h5>
          <p>{{$moment(item.colletDate).format('YYYY-MM-DD HH:mm')}}</p>
        </div>
				<div v-if="!item.url" style="padding-left:10px" @click="toDetail(item.article._id)">
					<h5>{{item.article.title}}</h5>
					<p>{{$moment(item.colletDate).format('YYYY-MM-DD HH:mm')}}</p>
				</div>
			</div>
		</div>
		 <!-- 是否编辑标志 -->
  	<div class="toTop" @click="edit">
    	<span v-if="flag"class="icon-ali icon-alibianji"></span>
    	<span v-if="!flag" style="font-size:11px">取消</span>
  	</div>
    <p v-if="!this.list.length" style="text-align:center">暂无收藏~~</p>
	</div>
</template>
<script>
export default{
	name:'Collect',
	data(){
		return{
			id:this.$cookie.get('id'),
			value:'',
			flag:true,
			count:0,
      list:[]
		}
	},
  mounted(){
    this.getCollect()
  },
	methods:{
		//控制选中框的出现
		edit(){
			this.count++
			if(this.count%2==1){
				this.flag=false
			}else{
				this.flag=true
			}
			
		},
     //获取收藏
    getCollect(){
      this.$axios.get('/api/collect/list',{
        params:{
          user:this.id
        }
      }).then(res=>{
        console.log(res)
        if(res.data.isSuccess){
          this.list = res.data.result
        }
      })
    },
     //删除收藏
    delCollect(){
      let dellist = []
      //获取选中的_id
      this.$refs.box.forEach(item=>{
        if(item.checked){
          dellist.push(item.dataset.index)
        }
      })
      //判断是否有选中
      if(dellist.length==0){
        this.$toast({
              message:'请选择要删除的数据',
              duration:1000
          })
        return ;
      }
      this.$messagebox.confirm(`确定删除${dellist.length}条记录吗？`)
        .then(action=>{
          console.log(action)
          if(action == 'confirm'){
            this.$axios.post('/api/collect/del',{
              list:dellist
            }).then(res=>{
              console.log(res)
              if(res.data.isSuccess){
                this.getCollect()
                
              }
              this.$toast({
                  message:res.data.msg,
                  duration:1000
              })
              
            })
            this.flag = true
            
          }
        });
    },
    //文章详情
    toDetail(id){
      this.$router.push({
          path: `/articleDetail/${id}`,
      })
      this.$store.commit('changeBackName','/collect')
    },
    //新闻详情
    toNewsDetail(item){
       this.$router.push({
            path: '/newsDetail'
        })
        this.$store.commit('changeNews',{
            url:item.url,//新闻地址
            uniquekey:item.uniquekey,//新闻key
            // photo:item.thumbnail_pic_s,//新闻图片
            // title:item.title
        })
        this.$store.commit('changeBackName','/collect')
    }

	}
}
</script>
<style lang="stylus" scoped>
 //文章图片
.portrait
  display:block
  width:50px
  height:50px
  border-radius:25px
  overflow:hidden
 //置顶
.toTop
  background-color:red
  width:40px;
  height:40px;
  position:fixed
  z-index:100
  bottom:10px
  right:20px
  color:#fff
  border-radius:20px
  text-align:center
  padding-top: 10px;
  box-sizing: border-box;
.toTop span
  align-self:center
 
//复选框样式
input[type="checkbox"] 
    -webkit-appearance: none;
    appearance: none;
    display: inline-block;
    // margin: 0 2px 2px 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
    outline: none;
    vertical-align: middle;
    border: 1px solid #e2e2e2;
    border-radius:100%
    box-sizing:border-box
input:checked
    border: 1px solid #26a2ff;
input:checked::before
    content: "";
    display: block;
    position: relative;
    width: 3px;
    height: 6px;
    left: 35%;
    top: 20%;
    border-right: 1px solid #26a2ff;
    border-bottom: 1px solid #26a2ff;
    transform: rotate(45deg);
    background: none;
</style>
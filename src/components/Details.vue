<template>
	<div>
		<mt-header :title="list.title">
		  <router-link :to="this.$store.state.backName" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div class="content">
			<h4>{{list.title}}</h4>
			<span>{{$moment(list.punishDate).format('YYYY-MM-DD HH:mm')}}</span>
			<span v-if="list.author">来源:{{list.author.username}}</span>
			<hr>
			<div v-html="list.url">
				{{list.url}}
			</div>
		</div>
		
		<div style="display:flex;justify-content:space-between;background:#fff;padding:10px;position:fixed;bottom:0;width:100%;box-sizing:border-box;height:40px;box-shadow:-3px -3px 3px #888888;">
			<span>感谢观看</span>
			<span>
				<span :class="flag?'icon-ali icon-aliicon-test5 full':'icon-ali icon-aliicon-test4 '" @click="collect"></span>
				<span class="icon-ali icon-aliicon-test" style="margin:0 20px"></span>
			</span>
		</div>

		</div>
	</div>
</template>
<script>
export default{
	name:'Detail',
	data(){
		return{
			list:{},
			flag:false,//记录是否收藏的标志
		}
	},
	mounted(){
		this.getArticle()
		this.getCollect()
		console.log(this.id)
	},
	
	methods:{
		//获取收藏
		getArticle(){
          this.$axios.get('/api/article/list',{
            params:{
              _id:this.id
            }
          }).then(res=>{
            
            if(res.data.isSuccess){
              this.list = res.data.result[0]
              console.log(this.list)
            }
          })
        },
        //判断是否收藏
        getCollect(){
        	this.$axios.get('/api/collect/list',{
        		params:{
        			article:this.id
        		}
        	}).then(res=>{
        		console.log(res)
        		if(res.data.result.length!=0){
        			this.flag = true
        		}else{
        			this.flag = false
        		}
        	})
        },
        //收藏和取消
		collect(){
			if(this.flag){
				this.$axios.post('/api/collect/cancel',{
					article:this.id
				}).then(res=>{
					console.log(res)
					if(res.data.isSuccess){
						this.flag = false
					}
					this.$toast({
			              message:res.data.msg,
			              duration:1000
			        })
				})
			}else{
				this.$axios.post('/api/collect/add',{
					user:this.$cookie.get('id'),
					article:this.id
				}).then(res=>{
					console.log(res)
					if(res.data.isSuccess){
						this.flag = true
					}
					this.$toast({
			              message:res.data.msg,
			              duration:1000
			        })
				})
			}
			
			
		},
		//分享
		share(){

		}
	},
	props:["id"]
}
</script>
<style lang="stylus" scoped>
.content
	background-color:#fff;
	margin:10px;
	padding:10px
.content span
	color:grey;
	font-size:13px;
	margin-right:20px
.content hr
	border:0.2px solid #888888
.collect
	background-color:#fff
h4
	margin:10px
.full
	color:red
</style>
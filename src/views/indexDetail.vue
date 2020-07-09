<template>
	<div>
		<mt-header title="看点新闻" fixed>
		  <router-link :to="this.$store.state.backName" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<iframe :src="url" width="100%" height="100%" ref="el"  style="border:none;margin:40px 0 40px 0"></iframe> 
		<div style="display:flex;justify-content:space-between;background:#fff;padding:10px;position:fixed;bottom:0;width:100%;box-sizing:border-box;height:40px;overflow-x:hidden">
			<span>感谢观看</span>
			<span>
				<span :class="flag?'icon-ali icon-aliicon-test5 full':'icon-ali icon-aliicon-test4 '" @click="collect"></span>
				<span class="icon-ali icon-aliicon-test" style="margin:0 20px"></span>
			</span>
		</div>
	</div>
</template>
<script>
export default{
	name:'indexDetail',
	data(){
		return{
			flag:false,//记录是否收藏的标志
			url:this.$store.state.news.url
		}
	},
	
	  mounted(){
		
		this.$refs.el.height = document.documentElement.clientHeight

		this.getCollect()
	},
	
	methods:{
		
		//判断是否收藏
        getCollect(){
        	this.$axios.get('/api/collect/list',{
        		params:{
        			uniquekey:this.$store.state.news.uniquekey
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
					uniquekey:this.$store.state.news.uniquekey
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
					uniquekey:this.$store.state.news.uniquekey,
					url:this.$store.state.news.url,
					photo:this.$store.state.news.photo,
					title:this.$store.state.news.title
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
	}
}
</script>
<style lang="stylus" scoped>
.full
	color:red
</style>


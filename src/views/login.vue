<template>
	<div style="padding:10px">
		<mt-header title="用户登录">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div style="margin-top:10px">
			<mt-field label="账号" placeholder="请输入登录账号" v-model="username"></mt-field>
			<mt-field label="密码" placeholder="请输入登录密码" type="password" v-model="password"></mt-field>
			<mt-button type="primary"size="large" style="margin-top:20px" @click="login">登录</mt-button>
			<p style="text-align:right">
				<span>还没有账号？</span>
				<router-link to="/register"><mt-button type="primary"size="small" >注册一个</mt-button></router-link>
			</p>
		</div>

	</div>
</template>
<script>
export default{
	name:'Login',
	data(){
		return{
			username:'yingzi',
			password:'123456'
		}
	},
	methods:{
		login(){
			if(this.username==null||this.password==null){
				this.$toast('注册信息不完整');
				return;
			}
			this.$axios.post('/api/login',{
				username:this.username,
				password:this.password
			}).then(res=>{
				console.log(res)
				if(res.data.isSuccess){
					this.$router.push({path:'/'})
					this.$cookie.set('username',res.data.result.username)
					this.$cookie.set('portrait',res.data.result.portrait)
					this.$cookie.set('id',res.data.result._id)
				}
				this.$toast({
	                message: res.data.msg,
	                duration:2000
	            });
			})
		}
	}
}
</script>
<style scoped lang="stylus">
.portrait
  display:inline-block
  width:50px
  height:50px
  border-radius:25px
  overflow:hidden
</style>
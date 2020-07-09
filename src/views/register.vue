<template>
	<div style="padding:10px">
		<mt-header title="用户注册">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div style="margin-top:10px">
			<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
			<mt-field label="密码" placeholder="请输入登录密码" type="password" v-model="password"></mt-field>
			<mt-field label="确认密码" placeholder="请确认登录密码" type="password" v-model="confirmpsw"></mt-field>
			<!-- <div style="margin-top:20px;text-align:center" >
				<input type="button" name="" :value="'倒计时'+time+'s'" :disabled="disabled" @click="changeTime">
			</div> -->
			
			<mt-button type="primary"size="large" style="margin-top:20px" @click="register">注册</mt-button>
		</div>

	</div>
</template>
<script>
export default{
	name:'Register',
	data(){
		return{
			username:'yingzi',
			password:'123456',
			confirmpsw:'123456',
			disabled:false,
			time:3
		}
	},
	methods:{
		// changeTime(){
		// 	this.disabled = true
		// 	var inner = setInterval(()=>{
  //              this.time--
  //              if(this.time < 0){
		// 			this.time = 3
		// 			this.disabled = false
		//            	clearInterval(inner)
		//         }
		// 	}, 1000)
			
		// },
		register(){
			if(this.username==null||this.password==null||this.confirmpsw == null){
				this.$toast('注册信息不完整');
				return;
			}else if(this.password!=this.confirmpsw){
				this.$toast('密码不一致');
				return;
			}
			this.$axios.post('/api/register',{
				username:this.username,
				password:this.password
			}).then(res=>{
				console.log(res)
				this.$toast({
	                message: res.data.msg,
	                duration:2000
	            });
				if(res.data.isSuccess){
					this.$router.push({path:'/login'})
				}
				
			})
			// this.$axios.post('/api/login',{
			// 	username:this.username,
			// 	password:this.password
			// }).then(res=>{
			// 	console.log(res)
			// })
			
			// this.$axios.get('/api/article',{
			// 	params:{
			// 		username:this.username,
			// 		password:this.password
			// 	}
				
			// }).then(res=>{
			// 	console.log(res)
			// })
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
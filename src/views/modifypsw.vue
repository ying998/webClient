<template>
	<div style="padding:10px">
		<mt-header title="修改密码">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div style="margin-top:10px">
			<mt-field label="原密码" placeholder="请输入原密码" type="password" v-model="oldpsw"></mt-field>
			<mt-field label="新密码" placeholder="请输入新密码" type="password" v-model="newpsw"></mt-field>
			<mt-field label="确认密码" placeholder="请确认新密码" type="password" v-model="confirmpsw"></mt-field>
			<mt-button type="primary"size="large" style="margin-top:20px" @click="modify">修改</mt-button>
		</div>

	</div>
</template>
<script>
export default{
	name:'Modifypsw',
	data(){
		return{
			oldpsw:'123456',
			newpsw:'123456',
			confirmpsw:'123456'
		}
	},
	methods:{
		modify(){
			console.log(this.newpsw)
			if(this.oldpsw === ""||this.newpsw === ""||this.confirmpsw === ""){
				this.$toast('信息不完整');
				return;
			}else if(this.newpsw!=this.confirmpsw){
				this.$toast('新密码不一致');
				return;
			}else if(this.newpsw === this.oldpsw){
				this.$toast('修改成功');
				return;
			}

			this.$axios.post('/api/modifyPsw',{
				username:this.$cookie.get('username'),
				newpsw:this.newpsw,
				oldpsw:this.oldpsw
			}).then(res=>{
				console.log(res)
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
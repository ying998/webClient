<!-- 文章详情 -->
<template>
	<div>
		<Adetails :id="this.$route.params.id"></Adetails>
	</div>
</template>
<script>
import Adetails from '@/components/Details.vue'
export default{
	name:'articleDetail',
	data(){
		return{
			
		}
	},
	mounted(){
		
	},
	components:{
	    Adetails
	  },
	methods:{
		
	}
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
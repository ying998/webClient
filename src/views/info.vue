<template>
    <div>
        <mt-header title="个人资料">
          <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
        <div style="padding:10px">
            <mt-cell title="头像" >
              <img :src="imgUrl" height="50" width="50" class="img">
              <input type="file" ref="portrait" class="portrait" multiple accept="image/gif, image/jpeg, image/png" @change="photoChange">
            </mt-cell>
            <mt-field label="账号" placeholder="请输入账号" v-model="list.username" disabled>
            </mt-field>
            <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="list.email"></mt-field>
            <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="list.phone"></mt-field>
            <!-- <mt-field label="性别" placeholder="请输入手机号" type="text" v-model="list.sex"></mt-field> -->
            <mt-cell title="性别" :value="list.sex" @click.native="sexVisible = true"></mt-cell>
            <mt-field label="生日" placeholder="请选择生日" type="date" v-model="list.birthday"></mt-field>
            <mt-field label="自我介绍" placeholder="请输入自我介绍" type="textarea" rows="1" v-model="list.introduction"></mt-field>
            <mt-button type="primary"size="large" style="margin-top:20px" @click="modify" >修改</mt-button>
            <!-- 性别选择 -->
            <mt-popup
              v-model="sexVisible"
              position="bottom" style="width:100%">
                <mt-picker :slots="slots" @change="onValuesChange" ></mt-picker>

            </mt-popup>
        </div>
        
    </div>
</template>
<script>
import utils from '../../public/util.js'
export default{
    name:'Info',
    data(){
        return{
            sexVisible:false,
            imgUrl:'',
             slots: [
                {
                  values: ['男', '女'],
                  textAlign: 'center'
                }
              ],
            list:{
                portrait:'',
                username:'',
                email:'',
                phone:'',
                birthday:'',
                introduction:'',
                sex:''
            },
            old:{},//记录一开始的个人信息
            
        }
    },
    mounted(){
        this.getInfo()
    },
    methods:{
        //获取图片
        photoChange(e){
            var file = e.target.files[0];
            if(file){
                var src = window.URL.createObjectURL(file);
                this.imgUrl = src
                this.list.portrait = file
            }
        },
        //获取个人信息
        getInfo(){
            this.$axios.get('/api/info',{
                params:{
                    username:this.$cookie.get('username')
                }
            }).then(res=>{
                console.log(res)
                if(res.data.isSuccess){
                    this.list = res.data.result
                    this.list.birthday = this.$moment(this.list.birthday).format('YYYY-MM-DD')
                    // this.list.portrait = this.list.portrait.replace(/\\/g,'\/')
                    this.imgUrl = "http://localhost:3000/public/uploads/"+this.list.portrait
                    this.old = {...this.list}
                    this.$cookie.set('portrait',this.list.portrait)
                }else{
                    this.$toast({
                        message:res.data.msg,
                        duration:1000
                    })
                }

            })
        },
        onValuesChange(picker, values) {
            this.list.sex = values[0]
        },
        //修改个人信息
        modify(){
            
            if(utils.isEqual(this.old,this.list)){
                this.$toast({
                    message:'个人信息无修改',
                    duration:1000
                })
                return ;
            }
            var formdata = new FormData();
            for (var key in this.list) {  //读取data中所要上传的内容循环append到fordata中
                if (key) {
                    formdata.append(key, this.list[key])
                }
            }
            if(this.list.portrait==this.old.portrait){
                formdata.delete('portrait');
            }

            this.$axios.post('/api/modifyInfo',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(res=>{
                console.log(res)
                if(res.data.isSuccess){
                    this.getInfo()
                }
                this.$toast({
                    message:res.data.msg,
                    duration:1000
                })
                
            })
            
        },
        
        
    }
}
</script>
<style lang="stylus" scoped>
/deep/.mint-field-core
    text-align:right!important
    background-color:#fff
.portrait,.img
    display:block
    width:50px
    height:50px
    border-radius:25px
    margin:5px 0
.portrait
    position:absolute
    opacity:0
</style>
<template>
    <!-- 封面未写好 -->
    <div>
        <mt-header title="修改文章">
          <router-link to="/article" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
        <div style="padding:5px">
            <mt-field  placeholder="请输入文章标题" v-model="articlename"></mt-field>
            <div style="background-color:#fff;margin:5px 0;padding:10px">
                <label>文章封面</label>
                <ul>
                    <li v-for="(item,index) in imgUrl" :key="index">
                        <img v-if="item.src" :src="item.src" width="100%" height="100%">
                        <span :class="item.id"></span>
                        <input type="file" multiple accept="image/gif, image/jpeg, image/png" :data-index="index" @change="photoChange">
                    </li>
                    
                </ul>
            </div>
            <div id="editorElem" style="text-align:left;border:none"></div>
            <mt-button type="primary"size="large" style="margin-top:20px" @click="publish">修改</mt-button>
        </div>
    </div>
</template>
<script>
import E from 'wangeditor';
export default{
    name:'modifyArticle',
    data(){
        return{
            id:this.$route.params.id,//获取路由传过来的文章参数_id
            articlename:'',
            editorContent:'',
            imgUrl:[ 
                {
                    src:'',
                    id:'add icon-aliadd'
                },{
                   src:'',
                    id:'add icon-aliadd'
                },{
                    src:'',
                    id:'add icon-aliadd'
                }
            ],
            imgfile:[],
            editor:'',
        }
    },
    mounted() {
         this.editor = new E('#editorElem');
         this.editor.customConfig.onchange = (html) => {
            this.editorContent = html
         };
         this.editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
         //this.editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
         this.editor.create()
         this.getArticle()
         // this.editorContent = '<p>111</p>'
         console.log(this.editorContent)
    },
    methods:{
        getArticle(){
          this.$axios.get('/api/article/list',{
            params:{
              _id:this.id
            }
          }).then(res=>{
            console.log(res)
            if(res.data.isSuccess){
              let list = res.data.result[0]
              this.articlename = list.title
              list.photos.forEach((item,index)=>{
                if(item!='default.jpg'){
                    this.imgUrl[index].src = 'http://localhost:3000/public/articleImgs/'+item
                    this.imgUrl[index].id = 'add icon-aliadd hide'
                    this.imgfile[index] = item
                }
                this.editorContent = list.url
                this.editor.txt.html(this.editorContent)

              })
              
              this.editorContent = list.url
            }
          })
        },
        //获取图片
        photoChange(e){
            let index = e.target.dataset.index
            var file = e.target.files[0];
            if(file){
                var src = window.URL.createObjectURL(file);
                this.imgUrl[index].src = src
                this.imgUrl[index].id = 'add icon-aliadd hide'
                this.imgfile[index] = file
            }
        },
        publish(){
            console.log(this.articlename);
            if(this.articlename == ''){
                this.$toast({
                    message:'文章标题不能为空',
                    duration:100000,
                })
                return ;
            }
            var formdata = new FormData();
            formdata.append('id',this.id)
            formdata.append('title',this.articlename)
            formdata.append('author',this.$cookie.get('id'))
            formdata.append('url',this.editorContent)
             for(let i in this.imgfile){
                formdata.append('photos',this.imgfile[i])
            }
            this.$axios.post('/api/article/modify',formdata,{
               headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(res=>{
                console.log(res)
                 this.$toast({
                    message:res.data.msg,
                    duration:2000
                })
            })
        }

    }
}
</script>
<style lang="stylus" scoped>
/deep/.w-e-toolbar
    flex-wrap:wrap!important
// /deep/.w-e-text
//     background-color:#fff
//     z-index:-1
ul
    margin:0
    margin-top:10px
    padding:0
    list-style:none
    display:flex
    justify-content:space-between
ul li
    width:100px;
    border:1px solid #888888
    height:100px
    overflow:hidden
.add,input
    width:100px
    height:100px
    display:block
    text-align:center
    vertical-align:middle
    position:absolute
    font-size: 100px;
    font-weight: 100;
    color: #888;
.add
    opacity: 0.5
.hide,input
    opacity:0

img
    position:absolute
    width:100px
    height:100px

</style>
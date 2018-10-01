<template>
  <div id="User">
    <div class="container">
      <div class="Nav">
        <div class="navbar">
          <div class="icon">
            <router-link :to="{ path: '/', params: {} }">主页 </router-link>/
            <span>发布话题</span>
          </div>
        </div>
        <div class="content">
          <div class="template">
            选择版块：
            <el-select v-model="value" placeholder="请选择" size=small @blur="select = ''">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span v-if="value != ''&&value != 'dev'">*个人练习做的小项目，为了避免污染社区，请选择发布在客户端测试区</span>
            <span v-if="select">*请选择模板</span>
          </div>
          <div class="title">
            <input type="text" name="" placeholder="标题字数 10 字以上" v-model="title" @blur="titleBlur">
            <span v-show="title1">*请输入标题</span>
            <span v-show="title2">*标题字数必须10字以上</span>
          </div>
          <div class="text">
            <div id="editor" style="text-align:left"></div>
          </div>
          <div class="footbar">
            <div class="tips"><span v-show="tips">*请输入内容</span></div>
            <div class="btn" @click="submit">提&nbsp;&nbsp;交</div>
          </div>
        </div>
      </div>
    </div>

    <div class="banner">

    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name:'User',
  components:{

  },
  data () {
    return {
      options: [{
          value: 'share',
          label: '分享'
        }, {
          value: 'ask',
          label: '问答'
        }, {
          value: 'job',
          label: '招聘'
        }, {
          value: 'dev',
          label: '客户端测试'
        }],
        accesstoken:'',
        value: '',
        title:'',
        title1:'',
        title2:'',
        editorContent:'',
        select:'',
        tips:'',
    }
  },
  methods:{
    titleBlur:function(){
      if(this.title == ''){
        this.title1 = true;
        this.title2 = '';
      }else if(this.title.length <10&&this.title){
        this.title1 = '';
        this.title2 = true;
      }else {
        this.title1 = '';
        this.title2 = '';
      }
    },
    submit:function(){
      if (this.value =='') {
        console.log(this.value)
        this.select = true;
      };
      if (this.title == '') {
        this.title1 = true;
        this.title2 = '';
      };
      if (this.editorContent == '') {
        this.tips = true;
      };
      if (this.value=='dev'&&this.title.length>9&&this.editorContent != '') {
        this.axios({
          method:"POST",
          url:"https://cnodejs.org/api/v1/topics",
          data:{
            accesstoken:this.accesstoken,
            title:this.title,
            tab:'dev',
            content:this.editorContent
          }
        })
        .then((res)=>{
          console.log(res)
          let id = res.data.topic_id;
          this.$router.push({path:'/topic/'+id})
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    }
  },
  mounted(){
    this.accesstoken = this.util.getCookie('accesstoken');
    let editor = new E('#editor')
    this.editor = editor
    editor.customConfig.onchange = (html) => {
      this.editorContent = html;
      this.tips = '';
    }
    editor.create()
  },
}
</script>


<style lang="less">
#User{
  margin: 0 auto;
  padding: 20px 0;
  width: 1200px;
  display: flex;
  .container{
    width: 900px;
    .Nav{

      .navbar{
        height: 40px;
        background-color: #f6f6f6;
        display: flex;
        align-items: center;
        border-radius: 5px 5px 0 0;
        border-bottom: 1px solid #e5e5e5;
        .icon{
          color: #ccc;
          margin: 0 10px;
          font-size: 14px;
          padding: 3px;
          border-radius: 3px;
          a{
            text-decoration: none;
            color: #80bd01;
          }
        }
      }
      .content{
        padding: 8px;
        border-radius:0 0 5px 5px;
        background-color: #fff;
        .template,.title,.text{
          margin: 15px 0;
        }
        .template{

          span{
            color: red;
            font-size: 14px;
          }
        }
        .title{
          height: 53px;
          input{
            width: 100%;
            padding: 6px 10px;
            font-size: 16px;
            box-sizing: border-box;
            border-radius: 5px;
            border: 1px solid #dedede;
            color: #999;
          }
          span{
            color: red;
            font-size: 14px;
          }
        }
        .text{

        }
        .footbar{
          padding: 10px;
          background-color: #fff;
          .tips{
            color: red;
            font-size: 14px;
            height: 20px;
            margin-bottom: 10px;
          }
          .btn{
            padding: 5px 10px;
            border-radius: 5px;
            background-color: #0088cc;
            color: #fff;
            display: inline-block;
            cursor: pointer;
          }
        }
      }
    }
  }
  .banner{
    flex: 1;
    margin-left: 20px;

  }
}
.el-select-dropdown{
  z-index: 99999999 !important;
}
</style>

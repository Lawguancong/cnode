<template>
  <div id="Topic">
    <div class="body">
      <div class="topic">
        <div class="head">
          <div class="text">
            <div class="title">
              <span v-if="dataList.top">置顶</span>
              <span v-if="dataList.good">精华</span>
              <b>{{dataList.title}}</b>
            </div>
            <div class="info">
              <span>&nbsp;发布于 {{releaseTime}}&nbsp;</span>
              <span>&nbsp;作者 {{authorName}}</span>
              <span>&nbsp;{{dataList.visit_count}} 次浏览&nbsp;</span>
              <span>&nbsp;来自 {{tab}}&nbsp;</span>
            </div>
          </div>
          <div class="cancel" v-if="this.is_collect" @click="cancel">取消收藏</div>
          <div class="collection" v-else @click="collection">收藏</div>
        </div>

        <div class="content" v-html="dataList.content"></div>
      </div>

      <div class="reply" v-if="replyList.length!==0">
        <div class="bar">回复</div>
        <div class="replyList" v-for="(reply,index) in replyList">
          <div class="img">
            <router-link :to="{ path: '/user/'+reply.author.loginname, params: {} }">
              <img :src="reply.author.avatar_url">
            </router-link>
          </div>
          <div class="content">
            <div class="userBar">
              <div class="user">
                <router-link :to="{ path: '/user/'+reply.author.loginname, params: {} }">
                  {{reply.author.loginname}}
                </router-link>
                {{index+1}}楼
                <span>{{replyTime[index]}}</span>
                <span class="author" v-if="reply.author.loginname==authorName"> 作者</span>
              </div>
              <div class="icon">
                <div class="fabulous" :class="{display:reply.ups.length==0}">
                  <span class="iconfont icon-dianzan1" @click="fabulous(reply)" :class="{red:reply.is_uped}"></span>
                  <span v-if="reply.ups.length!=0">{{reply.ups.length}}</span>
                </div>
                <router-link :to="{ name: '', params: {} }">
                  <i class="el-icon-edit"></i>
                </router-link>
              </div>
            </div>
            <div class="text" v-html="reply.content"></div>
          </div>
        </div>
      </div>

      <div class="write">
        <div class="topbar">
          添加回复
        </div>
        <div id="editorElem" style="text-align:left"></div>
        <div class="footbar">
          <div class="btn" @click="getContent">回&nbsp;&nbsp;复</div>
        </div>
      </div>
    </div>

    <div class="banner">
      <UserInfo :user="user" title="作者"></UserInfo>
      <div class="found" v-if="otherTopic.length!=0">
        <div class="navbar">
          <span>作者其他话题</span>
        </div>
        <div class="content">
          <div class="topic" v-for='(item,index) in otherTopic'>
            <div class="title" :title="item.title">
              <router-link :to="{ path: '/topic/'+item.id, params: {} }">
                {{item.title}}
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <NoReply></NoReply>
    </div>

    <GoTop></GoTop>

  </div>
</template>

<script>
import UserInfo from '@/components/common/UserInfo'
import NoReply from '@/components/common/NoReply'
import GoTop from '@/components/common/GoTop'
import E from 'wangeditor'
export default {
  name:'Topic',
  components:{
    UserInfo,
    NoReply,
    GoTop,
  },
  data () {
    return {
      dataList:'',
      releaseTime:'',
      lastReplyTime:'',
      authorName:'',
      replyList:'',
      replyTime:[],
      tab:'',
      accesstoken:'',
      is_collect:'',
      user:'',
      otherTopic:[],
      editorContent: '',
      editor:'',
    }
  },
  watch: {
		'$route' (to, from) {
			this.init();
      this.editor.txt.clear()
		},
	},
  methods:{
    getContent: function () {
      this.axios({
        method:"POST",
        url:"https://cnodejs.org/api/v1/topic/"+this.$route.params.id+"/replies",
        data:{
          accesstoken:this.accesstoken,
          content :this.editorContent,
          reply_id :'',
        }
      })
      .then((res)=>{
        this.editor.txt.clear()
        this.axios({
          method:"GET",
          url:"https://cnodejs.org/api/v1/topic/"+this.$route.params.id,
          params:{
            accesstoken:this.accesstoken,
          }
        })
        .then((res)=>{
          let data = res.data.data;
          this.dataList = data;
          this.releaseTime = this.util.formTimeToData(data.create_at);
          this.lastReplyTime = this.util.formTimeToData(data.last_reply_at);
          let replyList = data.replies;
          this.replyList = replyList;
        })
        .catch((err)=>{

        })
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    fabulous:function(data){
      this.axios({
        method:"POST",
        url:"https://cnodejs.org/api/v1/reply/"+data.id+"/ups",
        data:{
          accesstoken:this.accesstoken,
        }
      })
      .then((res)=>{
        this.axios({
          method:"GET",
          url:"https://cnodejs.org/api/v1/topic/"+this.$route.params.id,
          params:{
            accesstoken:this.accesstoken,
          }
        })
        .then((res)=>{
          let data = res.data.data;
          this.replyList = data.replies;
          data.is_uped = !data.is_uped;
        })
        .catch((err)=>{

        })
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    cancel:function(){
      this.axios({
        method:"POST",
        url:"https://cnodejs.org/api/v1/topic_collect/de_collect",
        data:{
          accesstoken:this.accesstoken,
          topic_id:this.dataList.id,
        }
      })
      .then((res)=>{
        this.is_collect = !res.data.success;
      })
      .catch((err)=>{
        console.log(err )
      })
    },
    collection:function(){
      this.axios({
        method:"POST",
        url:"https://cnodejs.org/api/v1/topic_collect/collect",
        data:{
          accesstoken:this.accesstoken,
          topic_id:this.dataList.id,
        }
      })
      .then((res)=>{
        this.is_collect = res.data.success;
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    init:function(){
      this.axios({
        method:"GET",
        url:"https://cnodejs.org/api/v1/topic/"+this.$route.params.id,
        params:{
          accesstoken:this.accesstoken,
        }
      })
      .then((res)=>{
        let data = res.data.data;
        this.dataList = data;
        this.releaseTime = this.util.formTimeToData(data.create_at);
        this.lastReplyTime = this.util.formTimeToData(data.last_reply_at);
        this.authorName = data.author.loginname;
        let replyList = data.replies;
        this.replyList = replyList;
        this.is_collect = data.is_collect;
        for (var i = 0; i < replyList.length; i++) {
          this.replyTime[i] = this.util.formTimeToData(replyList[i].create_at)
        }
        if (data.tab=='good') {
          this.tab = '精华'
        }else if (data.tab=='share') {
          this.tab = '分享'
        }else if (data.tab=='ask') {
          this.tab = '问答'
        }else if (data.tab=='job') {
          this.tab = '招聘'
        }else if (data.tab=='dev') {
          this.tab = '测试'
        };
        this.axios({
          method:"GET",
          url:"https://cnodejs.org/api/v1/user/"+this.authorName,
          params:{

          }
        })
        .then((res)=>{
          let data = res.data.data;
          this.user = data;
          for (var i = 0; this.otherTopic.length<5&&i<data.recent_topics.length; i++) {
            if (data.recent_topics[i].id != this.$route.params.id) {
              this.otherTopic.push(data.recent_topics[i]);
            }
          }
        })
        .catch((err)=>{

        })
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  mounted(){
    this.accesstoken = this.util.getCookie('accesstoken');
    this.init();
    let editor = new E('#editorElem')
    this.editor = editor
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.create()
  },
}
</script>


<style lang="less">
#Topic{
  margin: 0 auto;
  padding: 20px 0;
  width: 1200px;
  display: flex;
  .red{
    color: red;
  }
  .body{
    width: 900px;
    .topic{
      background-color: #fff;
      border-radius: 5px;
      .head{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 10px;
        border-bottom: 1px solid #e5e5e5;
        .text{
          width: 750px;
          .title{
            font-size: 22px;
            span{
              padding: 2px 4px;
              background-color: #80bd01;
              color: #999;
              border-radius: 2px;
              font-size: 14px;
              color: #fff;
            }
          }
          .info{
            font-size: 12px;
            color: #838383;
            margin: 8px 0;
            span::before{
              content: "•";
            }
          }
        }
        .collection{
          background-color: #80bd01;
          color: #fff;
          padding: 5px 10px;
          border-radius: 3px;
          cursor: pointer;
        }
        .cancel{
          background-color: #909090;
          color: #fff;
          padding: 5px 10px;
          border-radius: 3px;
          cursor: pointer;
        }
      }
      .content{
        padding: 10px;
        font-size: 15px;
        line-height: 25px;
        h3,h4{
          border-bottom: 1px solid #eee;
        }
        img{
          display: inline-block;
          max-width: 100%;
        }
      }
    }
    .reply{
      background-color: #fff;
      margin: 10px 0;
      border-radius: 5px;
      .bar{
        padding: 10px;
        border-bottom: 1px solid #eee;
        background-color: #f6f6f6;
      }
      .replyList{
        padding: 10px;
        display: flex;
        border-bottom: 1px solid #eee;
        .img{
          margin-right: 10px;
          img{
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 3px;
          }
        }
        .content{
          flex: 1;
          .userBar{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .user{
              font-size: 12px;
              span::before:first-child{
                content: "•";
              }
              a{
                text-decoration: none;
                color: #666;
              }
              .author{
                background-color: #6ba44e;
                color: #fff;
                padding: 2px;
              }
            }
            .icon{
              font-size: 16px;
              .fabulous{
                display: inline-block;
                span:first-child{
                  cursor: pointer;
                }
              }
              .display{
                display: none;
              }
            }
          }
          .text{
            font-size: 14px;
            line-height: 24px;
            img{
              display: inline-block;
              max-width: 100%;
            }
          }
        }
      }
      .replyList:hover .content .userBar .icon .fabulous{
        display: inline-block;
      }
    }
    .write{
      margin: 10px 0;
      .topbar{
        color: #333;
        padding: 10px;
        background-color: #f6f6f6;
        font-size: 16 px;
        line-height: 20px;
      }
      #editorElem{
        .w-e-toolbar{
          background-color: #fff !important;
        }
        .w-e-text-container{
          background-color: #fff !important;
          height: 200px !important;
        }
      }
      .footbar{
        padding: 10px;
        background-color: #fff;
        .btn{
          padding: 5px 10px;
          border-radius: 5px;
          background-color: #0088cc;
          color: #fff;
          display: inline-block;
        }
      }
    }
  }
  .banner{
    flex: 1;
    margin-left: 20px;
    .found{
      margin: 20px 0;
      .navbar{
        height: 30px;
        background-color: #f6f6f6;
        display: flex;
        align-items: center;
        border-radius: 5px 5px 0 0;
        border-bottom: 1px solid #e5e5e5;
        padding: 0 10px;
        font-size: 14px;
      }
      .content{
        border-radius:0 0 5px 5px;
        background-color: #fff;
        .topic{
          height: 30px;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          font-size: 14px;
          width: 260px;
          .title{
            font-size: 16px;
            padding: 0 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            a{
              color: #778087;
              text-decoration: none;
              font-size: 14px;
            }
            a:hover{
              text-decoration: underline;
            }
          }
        }
        .topic:hover{
          background-color: #f5f5f5;
        }
      }
    }
  }
}
</style>

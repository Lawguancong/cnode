<template>
  <div id="Collection">
    <div class="Nav">
      <div class="navbar">
        <div class="icon">
          <router-link :to="{ path: '/', params: {} }">主页</router-link>
          <span>{{user.loginname}} /  收藏的话题</span>
        </div>
      </div>

      <div class="content">
        <div class="topic" v-for='(item,index) in itemList'>
          <div class="img">
            <router-link :to="{ path: '/user/'+item.author.loginname, params: {} }">
              <img :src="item.author.avatar_url" :title="item.author.loginname">
            </router-link>
          </div>
          <div class="num">
            <span title="回复数">{{item.reply_count}}</span>/
            <span title="点击数">{{item.visit_count}}</span>
          </div>
          <div class="type" :class="{active:item.top||item.good,display:tab=='all'||tab==''}">
            {{item.tab}}
          </div>
          <div class="title" :title="item.title">
            <router-link :to="{ path: '/topic/'+item.id, params: {} }">
              {{item.title}}
            </router-link>
          </div>
          <div class="answer">
            <router-link :to="{ name: '', params: {} }">
              <span>{{time[index]}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="banner">
      <UserInfo :user="user" title="个人信息"></UserInfo>
      <CreateTopic></CreateTopic>
    </div>
  </div>
</template>

<script>
import UserInfo from '@/components/common/UserInfo'
import CreateTopic from '@/components/common/CreateTopic'
export default {
  name:'Collection',
  components:{
    UserInfo,
    CreateTopic,
  },
  data () {
    return {
      isActive:'',
      topic:'',
      itemList:'',
      tab:this.$route.query.tab?this.$route.query.tab:'',
      time:[],
      accesstoken:'',
      user:'',
      score:'',
      loginname:'',
    }
  },
  methods:{
    choseTopics:function(data){
      this.tab = data.name;
      this.$router.push({
        path:'/',
        query:{tab:data.name},
      });
      this.init()
    },
    init:function(){
      this.itemList = '';
      this.axios({
        method:"GET",
        url:"https://cnodejs.org/api/v1/topic_collect/"+this.$route.params.id,
        params:{
          page:"",
          tab:this.$route.query.tab?this.$route.query.tab:'',
          limit:"0",
          mdrender:"",
        }
      })
      .then((res)=>{
        let data = res.data.data
        this.isActive = this.$route.query.tab?this.$route.query.tab:'all';
        for (var i = 0; i < data.length; i++) {
          this.time[i] = this.util.formTimeToData(data[i].last_reply_at)
          if (data[i].top) {
            data[i].tab = '置顶'
          }else if(data[i].good){
            data[i].tab = '精华'
          }else {
            if (data[i].tab=='good') {
              data[i].tab = '精华'
            }else if (data[i].tab=='share') {
              data[i].tab = '分享'
            }else if (data[i].tab=='ask') {
              data[i].tab = '问答'
            }else if (data[i].tab=='job') {
              data[i].tab = '招聘'
            }else if (data[i].tab=='dev') {
              data[i].tab = '测试'
            }
          }
        }
        this.itemList = data;
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  mounted(){
    this.init();

    this.axios({
      method:"GET",
      url:"https://cnodejs.org/api/v1/user/"+this.$route.params.id,
      params:{

      }
    })
    .then((res)=>{
      console.log(res)
      let data = res.data.data;
      this.user = data;
      this.score = res.data.data.score;
    })
    .catch((err)=>{

    })
  },
}
</script>


<style lang="less">
#Collection{
  margin: 0 auto;
  padding: 20px 0;
  width: 1200px;
  display: flex;
  .Nav{
    width: 900px;
    .navbar{
      height: 40px;
      background-color: #f6f6f6;
      display: flex;
      align-items: center;
      border-radius: 5px 5px 0 0;
      .icon{
        color: #999;
        margin: 0 10px;
        font-size: 14px;
        padding: 3px;
        border-radius: 3px;
        a{
          text-decoration: none;
          color: #80bd01;
        }
        &.active{
          background-color: #80bd01;
          color: #fff;
        }
      }
    }
    .content{
      border-radius:0 0 5px 5px;
      background-color: #fff;
      .topic{
        height: 50px;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        align-items: center;
        padding: 0 10px;
        font-size: 14px;
        .img{
          width: 30px;
          height: 30px;
          img{
            display: block;
            background-color: #666;
            width: 100%;
            height: 100%;
          }
        }
        .num{
          width: 100px;
          text-align: center;
          span:first-child{
            color:#9e78c0;
          }
          span:last-child{
            color: #b4b4b4;
          }
        }
        .type{
          padding: 2px 4px;
          background-color: #e5e5e5;
          color: #999;
          border-radius: 2px;
          display: none;
          &.active{
            background-color: #80bd01;
            color: #fff;
            display: block;
          }
          &.display{
            display: block;
          }
        }
        .title{
          font-size: 16px;
          flex:1;
          padding: 0 10px;
          a{
            color: #333;
            text-decoration: none;
            font-size: 16px;
          }
          a:hover{
            text-decoration: underline;
          }
        }
        .answer{

          a{
            text-decoration: none;
            text-align: right;
            display: flex;
            align-items: center;
            color: #333;
            img{
              display: inline-block;
              width: 18px;
              height: 18px;
              background-color: #eee;
              margin-right: 6px;
            }
            span{
              text-align: right;
            }
          }
        }
      }
      .topic:hover{
        background-color: #f5f5f5;
      }
    }
  }
  .banner{
    flex: 1;
    margin-left: 20px;

  }
}
</style>

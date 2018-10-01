<template>
  <div id="User">
    <div class="container">
      <div class="Nav">
        <div class="navbar">
          <div class="icon">
            <router-link :to="{ path: '/', params: {} }">主页</router-link>/
          </div>
        </div>
        <div class="content">
          <p>
            <img :src="user.avatar_url">
            <router-link :to="{ name: '', params: {} }">{{user.loginname}}</router-link>
          </p>
          <p>积分 : {{user.score}}</p>
          <p v-if="collection!==0">
            <router-link :to="{ path: user.loginname+'/collections', params: {} }">
              {{collection}}个收藏话题
            </router-link>
          </p>
          <p v-else>该用户没有收藏的话题</p>
          <p v-if="user.githubUsername">github地址：<a :href="github" target="_blank">@{{user.githubUsername}}</a></p>
          <p>注册时间: {{registrationTime}}</p>
        </div>
      </div>

      <div class="found">
        <div class="navbar">
          <span>最近创建的话题</span>
        </div>
        <div class="content">
          <div class="topic" v-for='(item,index) in found'>
            <div class="img">
              <router-link :to="{ path: '/user/'+item.author.loginname, params: {} }">
                <img :src="item.author.avatar_url" :title="item.author.loginname">
              </router-link>
            </div>
            <div class="type">
              {{item.tab}}
            </div>
            <div class="title" :title="item.title">
              <router-link :to="{ path: '/topic/'+item.id, params: {} }">
                {{item.title}}
              </router-link>
            </div>
          </div>
          <div class="more">
            <router-link :to="{ path: user.loginname+'/topic', params: {} }">查看更多»</router-link>
          </div>
        </div>
      </div>

      <div class="found">
        <div class="navbar">
          <span>最近参与的话题</span>
        </div>
        <div class="content">
          <div class="topic" v-for='(item,index) in join'>
            <div class="img">
              <router-link :to="{ path: '/user/'+item.author.loginname, params: {} }">
                <img :src="item.author.avatar_url" :title="item.author.loginname">
              </router-link>
            </div>
            <div class="type">
              {{item.tab}}
            </div>
            <div class="title" :title="item.title">
              <router-link :to="{ path: '/topic/'+item.id, params: {} }">
                {{item.title}}
              </router-link>
            </div>
          </div>
          <div class="more">
            <router-link :to="{ path: user.loginname+'/replies', params: {} }">查看更多»</router-link>
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
  name:'User',
  components:{
    UserInfo,
    CreateTopic,
  },
  data () {
    return {
      user:'',
      github:'',
      registrationTime:'',
      found:[],
      join:[],
      collection:'',
    }
  },
  methods:{
    init:function(){
      this.axios({
        method:"GET",
        url:"https://cnodejs.org/api/v1/user/"+this.$route.params.id,
        params:{

        }
      })
      .then((res)=>{
        let data = res.data.data;
        this.user = data;
        this.github = "https://github.com/"+data.githubUsername;
        this.registrationTime = this.util.formTimeToData(data.create_at);
        for (var i = 0; i < 5&&i<data.recent_topics.length; i++) {
          this.found[i] = data.recent_topics[i];
        };
        for (var i = 0; i < 5&&i<data.recent_replies.length; i++) {
          this.join[i] = data.recent_replies[i];
        };
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
      url:"https://cnodejs.org/api/v1/topic_collect/"+this.$route.params.id,
      params:{

      }
    })
    .then((res)=>{
      console.log(res)
      this.collection = res.data.data.length;
    })
    .catch((err)=>{
      console.log(err)
    })
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
        p{
          display: flex;
          align-items: center;
          img{
            display: inline-block;
            width: 48px;
            height: 48px;
            border-radius: 3px;
            margin-right: 10px;
          }
          a{
            color: #778087;
            text-decoration: none;
          }
        }
      }
    }
    .found{
      margin: 20px 0;
      .navbar{
        height: 40px;
        background-color: #f6f6f6;
        display: flex;
        align-items: center;
        border-radius: 5px 5px 0 0;
        border-bottom: 1px solid #e5e5e5;
        padding: 0 10px;
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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            a{
              color: #333;
              text-decoration: none;
              font-size: 16px;
            }
            a:hover{
              text-decoration: underline;
            }
          }
        }
        .topic:hover{
          background-color: #f5f5f5;
        }
        .more{
          padding: 0 10px;
          height: 40px;
          display: flex;
          align-items: center;
          border-radius:0 0 5px 5px;
          a{
            text-decoration: none;
            color: #666;
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
</style>

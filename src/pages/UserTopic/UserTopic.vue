<template>
  <div id="UserTopic">
    <div class="container">
      <div class="Nav">
        <div class="navbar">
          <div class="icon">
            <router-link :to="{ path: '/', params: {} }">主页</router-link> /
            <router-link :to="{ path: '/user/'+user.loginname, params: {} }">{{user.loginname}}的主页</router-link>
          </div>
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
  name:'UserTopic',
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
        console.log(res)
        let data = res.data.data;
        this.user = data;
        this.github = "https://github.com/"+data.githubUsername;
        this.registrationTime = this.util.formTimeToData(data.create_at);
        this.found = data.recent_topics;
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  mounted(){
    this.init();
  },
}
</script>


<style lang="less">
#UserTopic{
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
      }
    }
  }
  .banner{
    flex: 1;
    margin-left: 20px;

  }
}
</style>

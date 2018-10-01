<template>
  <div id="UserInfo">
    <div class="userInfo">
      <div class="bar">
        <span>
          {{title}}
        </span>
      </div>
      <div class="content">
        <p>
          <img :src="user.avatar_url">
          <router-link :to="{ path: '/user/'+user.loginname, params: {} }">
            {{ user.loginname }}
          </router-link></p>
        <p>积分:{{user.score}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'UserInfo',
  props:['user','title'],
  components:{

  },
  data () {
    return {

    }
  },
  methods:{

  },
  mounted(){

  },
}
</script>


<style lang="less">
#UserInfo{

    .userInfo{
      background-color: #fff;
      border-radius: 5px;
      .bar{
        height: 40px;
        background-color: #f6f6f6;
        display: flex;
        align-items: center;
        border-radius: 5px 5px 0 0;
        font-size: 14px;
        box-sizing: border-box;
        text-indent: 8px;
      }
      .content{
        padding: 8px;
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

}
</style>

<template>
  <div id="NoReply">
    <div class="found">
      <div class="navbar">
        <span>无人回复的话题</span>
      </div>
      <div class="content">
        <div class="topic" v-for='(item,index) in replies'>
          <div class="title" :title="item.title">
            <router-link :to="{ path: '/topic/'+item.id, params: {} }">
              {{item.title}}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'NoReply',
  components:{

  },
  data () {
    return {
      replies:[],
      num:1,
    }
  },
  methods:{

  },
  mounted(){
      this.axios({
        method:"GET",
        url:"https://cnodejs.org/api/v1/topics",
        params:{
          page:'',
          tab:'',
          limit:"100",
          mdrender:"",
        }
      })
      .then((res)=>{
        let data = res.data.data;
        for (var i = 0; i < data.length; i++) {
          if (this.replies.length<5) {
            if (data[i].reply_count==0) {
              this.replies.push(data[i])
            }
          }else {
            return
          }
        }
      })
      .catch((err)=>{

      })
  },
}
</script>


<style lang="less">
#NoReply{

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
</style>

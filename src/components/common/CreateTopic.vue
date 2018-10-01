<template>
  <div id="CreateTopic">
    <div class="CreateTopic">
      <div class="btn">
        <router-link :to="{ path: '/createtopic', params: {} }">发布话题</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'CreateTopic',
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
#CreateTopic{

  .CreateTopic{
    margin: 10px 0;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    .btn{
      padding: 8px;
      background-color: #80bd01;
      display: inline-block;
      border-radius: 3px;
      cursor: pointer;
      transition: background-color 0.4s;
      a{
        color: #fff;
        text-decoration: none;
        font-size: 14px;
      }
    }
    .btn:hover{
      background-color: #6ba44e;
    }
  }
}
</style>

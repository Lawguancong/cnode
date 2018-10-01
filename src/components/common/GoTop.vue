<template>
  <div id="GoTop">
    <div class="gotop" @click="goTop" :class="{show:Top>300}">
      返回顶部
    </div>
  </div>
</template>

<script>
export default {
  name:'GoTop',
  components:{

  },
  data () {
    return {
      Top:'',
    }
  },
  methods:{
    scrollTop:function(){
      this.Top = document.documentElement.scrollTop;
    },
    goTop:function(){
      var timer = null;
      clearInterval(timer);
      timer = setInterval(function(){
        var osTop = document.documentElement.scrollTop;
        var spd = Math.floor((-osTop) / 30);

        document.documentElement.scrollTop = osTop + spd;

        if(osTop == 0){
        	clearInterval(timer);
        }
      },1);
    },
  },
  mounted(){
    window.addEventListener('scroll', this.scrollTop)
  },
}
</script>


<style lang="less">
#GoTop{

  .gotop{
    width: 16px;
    font-size: 16px;
    padding: 10px;
    position: fixed;
    border-radius: 5px 0 0 5px;
    color: #fff;
    right: -40px;;
    top: 70%;
    background-color: rgba(0,0,0,.5);
    transition: right .5s;
  }
  .show{
    right: 0;
  }
}
</style>

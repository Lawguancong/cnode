<!-- 公共方法 -->
<script type="text/javascript">
const util = {
	setCookie: function (name, value, days) { //存储cookie
		let d = new Date;
		let ds = ds ? ds : 0.5;
		let vs = value;
		d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * ds);
		if (typeof value == 'object') vs = JSON.stringify(value)
		window.document.cookie = name + "=" + vs + ";path=/;expires=" + d.toGMTString();
	},

	getCookie: function(name){ //获取cookie
		let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		let vs = v ? v[2] : null;
		if(typeof vs == 'string'){
			try {
				let obj = JSON.parse(vs);
				if (typeof obj == 'object' && obj) {
					return obj;
				}else {
					return vs;
				}
			}catch(e){
				return vs;
			}
		}
	},

	deleteCookie:function(name) { //清除cookie
		this.setCookie(name, '', -1);
	},



	formTimeToData:function(time){//计算时长
		let ot = Date.parse(time)/1000;
		let nt = new Date().getTime()/1000;
		let t = nt - ot;
		if (t<60) {
			let s = t;
			return parseInt(s)+"秒前";
		}else if (t>=60&&t<3600) {
			let m = parseInt(t/60);
			return m+" 分钟前";
		}else if (t>=3600&&t<86400) {
			let h = parseInt(t/3600);
			return h+"小时前";
		}else if (t>=86400&&t<2592000) {
			let d = parseInt(t/3600/24);
			return d+"天前";
		}else if (t>=2592000&&t<31104000) {
			let m = parseInt(t/3600/24/30);
			return m+"个月前";
		}else if (t>=31104000) {
			let y = parseInt(t/3600/24/30/12);
			return y+"年前";
		}
	},


}

export default util;
</script>

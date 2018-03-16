<script type="text/javascript">
 
  //const www = "http://www.hhwall.com/";
  //const www = "http://test.www.hhwall.com/";
  const www = "";
  const v = "2.0";
  const app_key = "13971568273";
  var identify = "";
  const app = "hhk"
  const app_secret = "kuGvoMCfAbNt6ezpi4ugPzmbnoc4HSy3";
  const regular={
    body:Object,
    reg_phone:/^1[34578]{1}[0-9]{9}$/, 					//验证手机号
    reg_num:/^[0-9A-Za-z]{6,20}$/,     					//验证密码
    reg_email:/^\w+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/i,    //验证邮箱
    reg_bank:/^\d{16,21}$/                        //验证银行卡号
  };
  function getSign(arr,obj){
    var str = "";
  //console.log(arr);
    arr.sort();
    //console.log(arr);
    for(var i in arr){
      for(var j in obj){
        if(arr[i] == j){
          if(i==0){
            str += arr[i]+"="+obj[j].toString();
          }else{
            str += "&"+arr[i]+"="+obj[j].toString();
          }
        }
      }
    }
    str += app_secret;
    str = $.md5(str).toUpperCase();
    //console.log(str);
    return str;
  }
  function getOption(obj){
    var str = "";
    var t = 0;
    for(var i in obj){
      if(t==0){
        str += i+"="+obj[i].toString();
        t++;
      }else{
        str += "&"+i+"="+obj[i].toString();
      }
    }
    return str;
  }
  function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      return true;
    }else{
      return false;
    }
  }
export default
  {
    www,
    app_key,
    getSign,
    v,
    app,
    identify,
    getOption,
    regular,
    isWeiXin
  }
</script>
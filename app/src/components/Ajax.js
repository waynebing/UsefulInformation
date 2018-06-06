// 封装一个Ajax
class Ajax{
    constructor(url,fn){
        var ajax=new XMLHttpRequest();
        ajax.open('get',url);
        ajax.onreadystatechange=function(data){
            if(ajax.readyState==4 && ajax.status==200){
                var data=JSON.parse(ajax.responseText);
                // 数据在回调函数内返回给组件外
                fn(data);
            }
        }
        
        ajax.send();
    }
}

export default Ajax;
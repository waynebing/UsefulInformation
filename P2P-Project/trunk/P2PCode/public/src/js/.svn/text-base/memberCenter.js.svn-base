$(function(){
    $('.list-group-item').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
    })

    // iphone6plus适配
    // if($('body').css('max-width','414px')){
    //     $('.accountInformation a').removeClass('btn-lg').addClass('btn-xs');
    // }
    // 点击切换效果
    $('#btnToggle').on('click',function(){
        //alert('123');
        
        $('#MemberMain').toggleClass('active');
    })


    

    // 滑动切换效果
    var x1=x2=0;
    $(document).on('touchstart',function(e){
        // 获取开始坐标
        x1=e.changedTouches[0].clientX; 
    });
    $(document).on('touchend',function(e){
        // 获取开始坐标
        x2=e.changedTouches[0].clientX; 
        var distance=Math.abs(x2-x1);
        // 如果滑动距离大于50，那么就切换active效果
        if(distance>50){
            $('#MemberMain').toggleClass('active');
        };
    });
    



})
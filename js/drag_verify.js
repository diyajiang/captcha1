window.onload=function(){
    (function(){
        // 获取滑块控件容器，灰色背景
        var drag =document.getElementById("drag");
        //获取滑块左侧背景
        var dragbg =document.getElementById("dragbg");
        //获取滑动验证文本
        var dragtext =document.getElementById("dragtext");
        //获取滑块
        var draghandler =document.getElementById("draghandler");
        //获取滑块的最大偏移量=滑块验证容器文本长度-滑块长度
        var maxhandleoffset =drag.clientWidth-draghandler.clientWidth;
        //是否验证成功的标记
        var isVertifysucc=false;
        //drag左边框位置
        var dragRect = document.getElementById("drag").getBoundingClientRect();

        initDrag();
        function initDrag(){
            //滑动验证容器文本中写入“拖动滑块验证”
            dragtext.textContent="拖动滑块验证";
            //给滑块添加鼠标按下监听
            draghandler.addEventListener("mousedown",onDraghandlerMouseDown);
        }
        //选中滑块
        function onDraghandlerMouseDown(){
            //鼠标移动监听
            document.addEventListener("mousemove",onDraghandlerMouseMove);
            //鼠标松开监听
            document.addEventListener("mouseup",onDraghandlerMouseUp);
        }
        //滑块移动
        function onDraghandlerMouseMove(){
            //HTML不存在width属性，只有clientWidth属性
            //offsetX是相对当前元素 clientX和pageX是相对父元素的
            //滑块移动量
            var left=event.clientX-dragRect.left;
            if(left<0){
                left=0;
                //如果滑块移动量大于滑块的最大量，调用验证成功的函数
            }
            else if(left>maxhandleoffset){
                left=maxhandleoffset;
            }
            //滑块移动量
            draghandler.style.left=left+"px";
            //棕色背景长度
            dragbg.style.width=draghandler.style.left;
        }
        //松开滑块函数
        function onDraghandlerMouseUp(){
            //移除鼠标移动监听
            document.removeEventListener("mousemove",onDraghandlerMouseMove);
            //移除鼠标松开监听
            document.removeEventListener("mouseup",onDraghandlerMouseUp);
            var left=event.clientX-dragRect.left;//非常重要，注意是相对于父盒子的边框
            if(left >maxhandleoffset){
                left=maxhandleoffset;
                verifysucc();
            }else{
                //初始化滑块移动量
                draghandler.style.left=0;
                dragbg.style.width=0;
            }
        }
        
        function getIsVertifySucc(){
            return isVertifysucc;
        }
        //验证成功
        function verifysucc(){
            //成功标记 不可回弹
            isVertifysucc=true;
            //文本的文字改为白色“验证通过”
            dragtext.textContent="验证通过";
            dragtext.style.color="white";
            //验证通过的滑块背景
            draghandler.setAttribute("class","draghandlerokbg");
             //移除鼠标按下监听
             draghandler.removeEventListener("mousedown",onDraghandlerMouseDown);
             //移除鼠标移动监听
             document.removeEventListener("mousemove",onDraghandlerMouseMove);
             //移除鼠标松开监听
             document.removeEventListener("mouseup",onDraghandlerMouseUp);
             //匹配成功进行跳转
             //width.location.href="成功页面"
        }
     })();
}
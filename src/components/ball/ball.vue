<template>
  <div class="ball-container">
    <div class="ball"
         @mouseenter="mouseEnter()"
         @mousedown="mousedown($event)"
         @mouseover="mouseover($event)"
         :style="{left:dx + 'px',top:dy + 'px',cursor:cursorStyle}"
    > + </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        edgeDirection:'',
        dx: 0,
        dy: 0,
        cursorStyle: 'pointer',
        time:10,//定时器用10s后向边沿滑动
        handler:0 //定时器句柄
      }
    },
    methods: {
      mouseEnter: function () {
        this.cursorStyle = 'move'
      },
      mousedown: function (event) {
        let e = event || window.event
        let self = this
        let element = e.target
        element.classList.remove("transition")
        //e.page 是鼠标距离屏幕左侧的宽度 element.offsetLeft ball距离屏幕左侧的宽度
        let mouseOffsetX = e.pageX - element.offsetLeft //鼠标距ball左侧的宽度
        let mouseOffsetY = e.pageY - element.offsetTop
        let pageWidth = document.documentElement.clientWidth
        let pageHeight = document.documentElement.clientHeight
        let elementWidth = element.clientWidth
        let elementHeight = element.clientHeight
        if(self.handler){
          clearInterval(self.handler)
        }
        document.onmousemove = function(event){
          let e = event || window.event
          let mouseX = e.pageX
          let mouseY = e.pageY
          let moveX= mouseX - mouseOffsetX
          let moveY = mouseY - mouseOffsetY
          let maxX = pageWidth - element.offsetWidth
          let maxY = pageHeight - element.offsetHeight
          self.dx = Math.min(maxX, Math.max(0,moveX))
          self.dy = Math.min(maxY, Math.max(0,moveY))
        }
        document.onmouseup = function (e) {
          let intervalTime = self.time
          document.onmousemove = null;
          document.onmouseup = null;
          self.handler = setInterval(function(){
            if(intervalTime > 0 ){
              intervalTime--
            }else{
              clearInterval(self.handler)
              let elementOffsetRight = pageWidth - element.offsetLeft - elementWidth
              let elementOffsetBottom = pageHeight - element.offsetTop - elementHeight
              self.slide2edge(element, element.offsetLeft,elementOffsetRight,element.offsetTop,elementOffsetBottom)
            }
          },1000)
        }
      },
      slide2edge:function(element,left,right,top,bottom){
        element.classList.add("transition")
        if(left <= right && left < top && left < bottom){
          this.dx = 0 - element.clientWidth/2
          this.edgeDirection = "left"
        }
        if(top <= left && top <= right && top <= bottom){
          this.dy = 0 -element.clientHeight/2
          this.edgeDirection = "top"
        }
        if(right < left && right < top && right < bottom){
          this.dx = document.documentElement.clientWidth - element.clientWidth/2
          this.edgeDirection = "right"
        }
        if(bottom <= left && bottom < top && bottom <= right){
          this.dy = document.documentElement.clientHeight - element.clientHeight/2
          this.edgeDirection = "bottom"
        }
      },
      mouseover:function(event){
        let e = event || window.event
        let element = e.target
        if(element.classList.contains("transition")){
          switch(this.edgeDirection){
            case "left":
              this.dx += element.clientWidth/2
                  break;
            case "right":
              this.dx -= element.clientWidth/2
                  break;
            case "top":
              this.dy += element.clientHeight/2
                  break;
            case "bottom":
              this.dy -= element.clientHeight/2
              break;
          }
        }
      }
    }
  }
</script>
<style scoped>
  .ball-container {
    position: relative;
  }
  .ball {
    position: absolute;
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 50px;
    padding: 10px;
    text-align: center;
    font-size: 40px;
    font-weight: bolder;
    color: #fff;
    background-color: #409eff;
    cursor: pointer;
  }
  .ball.transition{
    transition: all 0.3s ease-in-out;
  }
</style>

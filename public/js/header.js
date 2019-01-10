/**
 * Created by 94326 on 2019/01/10.
 */
$(function(){
  //头部鼠标滚轮和滚动事件
  $(window).on('scroll',() => {
    //当滚轮滚动到一定的距离,头部从上往下显示,成固定定位
    const distance = $('.navs').height()
    let top = $(window).scrollTop()
    if (top >= distance) {
      $('.maskHide').slideDown()
    }else if (top < distance) {
      $('.maskHide').css('display','none')
    }
  })

})
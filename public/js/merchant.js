/**
 * Created by 94326 on 2019/01/10.
 */
$(function(){
  $('.Header').load('./header.html',() => {
    //导航中首页拥有active类名
    $('.Header .navs li .server').addClass('active')
    $('.Header .navs li .shoye').parent().click(function(){
      window.location.href = './home.html';
    })
  })
  //头部navs绑定点击事件,实现跳转页面


  //动态创建服务商
  $.getJSON('../data/service.json',(data) => {
    data.forEach((item,index) => {
      const liNode = $('<li class="serve"></li>')
      const childNode = `<img class="bigImg" data-original=${item.imgUrl} alt=""><p class="title"><img class="smallImg" data-original="https://www.daoway.cn/pcimages/home1.png" />${item.title}</p><p class="text"><span>已接单${item.orderCount}单</span><i>好评率${item.positiveRate}</i></p>`
      liNode.html(childNode)
      $('.s-c-left').append(liNode)
    })

    //给每个服务商绑定事件
    $('.s-c-left').find('li').each(function() {
      $(this).click(() => {
        window.location.href = './server.html'
      })
    })

    //图片懒加载
    $("img").lazyload({
      effect: "fadeIn",
      placeholder : "./img/loading.gif",
      failurelimit : 10
    });
  })

})
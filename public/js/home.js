/**
 * Created by 94326 on 2019/01/08.
 */
$(function() {
  //加载头部
  $('.Header').load('./header.html',() => {
    //导航中首页拥有active类名
    $('.Header .navs li .shoye').addClass('active')
    $('.Header .navs li .server').parent().click(function(){
      window.location.href = './merchant.html';
    })
  })

  //轮播图
  const mySwiper = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    pagination: {
      el: '.swiper-pagination',
    }
  })

  //动态创建menu菜单
  $.getJSON('../data/index.json',function(data){
    data.forEach((item,index) => {
      const liNode = $('<li class="myLi"></li>')
      const iconNode = $('<img src="https://www.daoway.cn/pcimages/right.png"/>')
      const triangleNode = $('<img src="https://www.daoway.cn/pcimages/icon1.png" class="triangle"/>')
      liNode.text(item.serviceIndex)
      liNode.append(iconNode)
      liNode.append(triangleNode)
      $('.menu').append(liNode)
      let ilists = $('<ul></ul>')
      item.shopList.forEach((i,index) => {
        const iNode = $('<li></li>')
        iNode.text(i.serviceName)
        ilists.append(iNode)
        if (index === item.shopList.length-1) {
          $('.mask').append(ilists)
        }
      })
      liNode.hover(() => {
        ilists.css('display','block')
        liNode.css('background','#000')
        iconNode.css('display','none')
        triangleNode.css('display','block')
      },() => {
        ilists.css('display','none')
        liNode.css('background','#757881')
        iconNode.css('display','inline-block')
        triangleNode.css('display','none')
      })
    })
  })

  //动态创建内容列表
  $.getJSON('../data/index.json',function(data){
    data.forEach((item,index) => {
      //创建每一个模块
      const liNode = $('<li class="module"></li>')
      const divNode = $('<div class="servicebody"></div>')
      const headerDivNode = createHeaderDivNode(item.serviceIndex,item.serviceType)
      const contentDivNode = $('<ul class="content"></ul> ')
      item.shopList.forEach(i => {
        const {imgUrl,serviceName,description,price} = i
        const cLiNode = createLiNode(imgUrl,serviceName,description,price)
        contentDivNode.append(cLiNode)
      })
      divNode.append(headerDivNode)
      divNode.append(contentDivNode)


      const textNode = createTextNode ()
      liNode.append(divNode)
      liNode.append(textNode)
      $('.lists').append(liNode)

      $("img").lazyload({
        effect: "fadeIn",
        placeholder : "./img/loading.gif",
        failurelimit : 10
      });

    })
  })

  //封装动态生成内容列表底部文字区的方法
  function createTextNode () {
    const textNode = $('<div class="fws"></div>')
    $.getJSON('../data/service.json',function(data){
      data.forEach(item => {
        const aNode = $('<a></a>')
        aNode.text(item.title)
        textNode.append(aNode)
      })
    })
    return textNode
  }
  //封装动态生成内容列表头部的方法
  function createHeaderDivNode (title,serviceType) {
    const headerDivNode = $('<div></div>')
    const titleNode = $('<h2 class="title"></h2>')
    titleNode.text(title)
    const ulNode = $('<ul class="serviceType"></ul>')
    serviceType.forEach((item,index) => {
      const liNode = $('<li></li>')
      liNode.text(item)
      ulNode.append(liNode)
    })
    const spanNode = $('<span class="lookMore">更多服务></span>')
    headerDivNode.append(titleNode)
    headerDivNode.append(ulNode)
    headerDivNode.append(spanNode)
    return headerDivNode
  }
  //封装动态生成每一个服务项的方法
  function createLiNode (imgUrl,serviceName,description,price) {
    const liNode = $('<li></li>')
    const imgNode = $('<img/>')
    imgNode.attr('data-original',imgUrl)
    const titleNode = $('<h3 class="title"></h3>')
    titleNode.text(serviceName)
    const desNode = $('<div class="drc"></div>')
    desNode.text(description)
    const footerNode = $('<div class="price"></div>')
    footerNode.text(`${price}元/小时`)
    const btnNode = $('<span class="btn">查看详情</span>')
    footerNode.append(btnNode)
    liNode.append(imgNode)
    liNode.append(titleNode)
    liNode.append(desNode)
    liNode.append(footerNode)
    return liNode
  }


})
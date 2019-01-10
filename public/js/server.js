/**
 * Created by 94326 on 2019/01/10.
 */
$(function() {
  //加载头部区域
  $('.Header').load('./header.html',() => {
    //绑定头部跳转事件
    $('.Header .navs li .shoye').parent().click(function(){
      window.location.href = './home.html';
    })
    $('.Header .navs li .server').parent().click(function(){
      window.location.href = './merchant.html';
    })
  })




  $.getJSON('../data/item.json',(data) => {
    data.forEach((item,index) => {
      //动态创建服务商信息
      const leftDivNode = `<div class="h-left">
                              <b>${item.name}</b>
                              <span>营业时间：<em>${item.seredate}</em></span>
                              <span>最近可预约时间：<em>${item.servedatalately}</em></span>
                            </div>`
      const rightDivNode = `<div class="h-right">
                                <ul>
                                  <li><span>${item.soldCount}</span>成功接单<em>|</em></li>
                                  <li><span>${item.accept}</span>接单率<em>|</em></li>
                                  <li><span>${item.praise}</span>好评率</li>
                                </ul>
                              </div>`
      $('.htit .inner').append(leftDivNode)
      $('.htit .inner').append(rightDivNode)

      //动态创建服务项目信息
      const boxDivNode = `<div class="c-l-top">
                              <img class="pic" src=${item.imgUrl}>
                              <div class="text">
                                <span class="color">${item.title}</span>
                                <span style="color: #929292">${item.servedes}</span>
                                <span class="price">
                                  <b>${item.price}<em>元/小时</em></b>
                                  <b class="oldpic">原价<em>${item.oldPrice}</em></b>
                                </span>
                              </div>
                              <p class="spf">已售<span>${item.soldCount}</span></p>
                            </div>`
      $('.boxTab').append(boxDivNode)

      //动态创建商家信息介绍
      const pNode = `<p>${item.business}</p>`
      $('.c-left .info').append(pNode)
    })

  })

  $.getJSON('../data/comments.json',(data) => {
    data.forEach((item,index) => {
      //动态创建用户评论信息
      const sDivNode = $('<div class="noColor"></div>')
      let imgNode = ''
      for (let i = 0; i < item.star; i++) {
        imgNode += '<img src="https://www.daoway.cn/pcimages/red_star.png" width="10px" height="auto" />'
      }
      const ratingNode = `<div class="conmentss">
                              <img class="touxiang" src=${item.iconUrl} width="40" height="40">
                              <ul>
                                <li>${item.nick}</li>
                                <li class="goods">
                                  <span id="star" style="width: 70px; margin-left: 0">${imgNode}</span>
                                  <em style="margin-left: 10px"></em>
                                </li>
                                <li class="commentdetail">${item.comment}</li>
                                <li class="commentimg">
                                </li>
                                <li class="commentposition"><img src="https://www.daoway.cn/pcimages/position.jpg" width="9" height="11">${item.city} ${item.area}</li>
                              </ul>
                            </div>`
      $('.ratings').append(ratingNode)
      const dateStr = getMyDate(item.createtime)
      $('.goods em').text(dateStr)
    })

    //分页效果实现
    tabPage({
      pageMain: $('.ratings'),
      pageNav: $('.pageNav'),
      pre: $('.pre'),
      next: $('.next'),
      num: 10,
      activeClass: 'active',
    })
  })



  //封装格式化事件的函数
  function getMyDate(str){
    var oDate = new Date(str),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth()+1,
      oDay = oDate.getDate(),
      oHour = oDate.getHours(),
      oMin = oDate.getMinutes(),
      oSen = oDate.getSeconds(),
      oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间
    return oTime;
  }
  //补0操作
  function getzf(num){
    if(parseInt(num) < 10){
      num = '0'+num;
    }
    return num;
  }

  //封装一个分页的函数
  function tabPage (opt) {
    //需要分页的区域容器 分页 上一页 下一页
    const {pageMain,pageNav,pre,next} = opt

    //每一页显示的数量
    const num = opt.num


    //定义一个变量接受pageMain所有的子元素
    const conmentss = pageMain.find('.conmentss')
    //分页的页数
    const pageNums = Math.ceil(conmentss.length/num)

    //生成页码
    let page = ''
    //当前索引值
    let index = 0
    //页面需要自动滚动到距离
    const top = $('.r-title').offset().top - $('.Header').height()

    //动态生成分页的所有页码
    for (let i = 0; i < pageNums; i++) {
      index++
      page += `<a href="javascript:;">${index}</a>`
    }
    pageNav.html(page)

    //第一页有特定样式 动态的active
    pageNav.find("a:first").addClass(opt.activeClass);


    //给每一个页码绑定点击事件
    pageNav.find('a').each(function(){
      $(this).click(() => {
        //排他,变化active
        pageNav.find("a").removeClass(opt.activeClass);
        $(this).addClass(opt.activeClass);

        //点击页码,页面显示对应的内容
        //获取页码当前的索引
        index = $(this).index()
        conmentss.hide()
        for (let i = ($(this).html() - 1) * num; i < ($(this).html()) * num; i++) {
          conmentss.eq(i).show()
        }

        //点击后,回到页首
        $('html, body').scrollTop(0).animate({scrollTop: top});
      })
    })

    //页面初始化
    conmentss.hide()
    for (let i = 0; i < 1*num; i++) {
      conmentss.eq(i).show()
    }
    index = 0

    //上一页的点击事件
    pre.click(() => {
      if (index <= 0) {
        return
      }else{
        pageNav.find("a").removeClass(opt.activeClass);
        pageNav.find("a").eq(index-1).addClass(opt.activeClass);
        conmentss.hide()
        for (let i = (index - 1) * num; i < index * num; i++) {
          conmentss.eq(i).show()
        }
        index --
        //点击后,回到页首
        $('html, body').scrollTop(0).animate({scrollTop: top});
      }
    })

    //下一页的点击事件
    next.click(() => {
      if (index >= pageNums-1) {
        return
      }else{
        pageNav.find("a").removeClass(opt.activeClass);
        pageNav.find("a").eq(index+1).addClass(opt.activeClass);
        conmentss.hide()
        for (let i = (index + 1) * num; i < (index+2) * num; i++) {
          conmentss.eq(i).show()
        }
        index ++
        //点击后,回到页首
        $('html, body').scrollTop(0).animate({scrollTop: top});
      }
    })




  }

})
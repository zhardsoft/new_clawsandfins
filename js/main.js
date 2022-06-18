var svgInjectElements=[];
var tt=0;
  
SVGInject.setOptions({
  useCache: false, // no caching
  copyAttributes: false, // do not copy attributes from `<img>` to `<svg>`
  makeIdsUnique: false, // do not make ids used within the SVG unique
  afterInject: function(img, svg) {
    svgInjectElements[parseInt($(img).attr('img-arc'))]=svg;

    if(tt > $('.img-arc').length){
      svgInjectElements.forEach(function(svg){
        loadSVGInject(svg);
      })
    }
    tt++;

  },
});

function loadSVGInject(svg){
  var svgElm=$(svg);
  var parentSection=svgElm.parents('.section');
  var prevSection=svgElm.parents('.section').prev();
  // svgElm.parents('section').find('svg #pattern_bottom').wrap('<defs></defs>').wrap('<clipPath id="my-clip" clipPathUnits="objectBoundingBox"></clipPath>');
  var clipID=parentSection.attr('data-clip-id');
  var prevClipID=prevSection.attr('data-clip-id');

  parentSection.find('svg #pattern_bottom_clip').attr('id','pattern_bottom_clip_'+clipID);
  parentSection.find('svg #pattern_top_clip').attr('id','pattern_top_clip_'+clipID);

  var svgHeight=svgElm.height();
  parentSection.css({'background-position-y':'-'+svgHeight+'px'});
  
  parentSection.find('svg').css({'top':'-'+(svgHeight-1)+'px',});

  if(prevSection.find('.pattern-prev-clip').length<=0){
    parentSection.find('svg #pattern_top').attr('transform','scale('+(1/svgElm[0].viewBox.baseVal.width)+','+(1/svgElm[0].viewBox.baseVal.height)+')');
    var bgPrev=prevSection.css('background-image');
    var patternPrevClip=document.createElement('div');
        $(patternPrevClip).addClass('pattern-prev-clip').css({'-webkit-clip-path': 'url(#pattern_top_clip_'+clipID+')','clip-path': 'url(#pattern_top_clip_'+clipID+')'});
        // $(patternPrevClip).addClass('pattern-prev-clip').css('background-image', bgPrev);
    prevSection.append(patternPrevClip);

    var blockContent=document.createElement('div');
        $(blockContent).addClass('block-content');
    $(patternPrevClip).before(blockContent);
  }


  var baseHeight=svgElm.height()/svgElm[0].viewBox.baseVal.height;
  // console.log(svgElm.height()+" - "+svgElm[0].viewBox.baseVal.height);
  var ppcHeightTop=parseInt(parentSection.find('svg #pattern_top')[0].getAttribute('height'))*baseHeight;
  var ppcHeightBottom=parseInt(parentSection.find('svg #pattern_bottom')[0].getAttribute('height'))*baseHeight;

  if(prevSection.find('svg').length>0){
    var basePrevHeight=prevSection.find('svg').height()/prevSection.find('svg')[0].viewBox.baseVal.height;
    var ppcPrevHeightBottom=parseInt(prevSection.find('svg #pattern_bottom')[0].getAttribute('height'))*basePrevHeight;
  }

  
  // parentSection.css({'top':(svgElm.height()-ppcHeightTop)+'px'});
  prevSection.find('.pattern-prev-clip').css({'height':svgHeight+'px','top':'-'+(svgHeight-1)+'px'}).attr('height',svgHeight);

  if(parentSection.find('.pattern-bottom-clip').length<=0){
    parentSection.find('svg #pattern_bottom').attr('transform','scale('+(1/svgElm[0].viewBox.baseVal.width)+','+(1/svgElm[0].viewBox.baseVal.height)+')');
    var bg=parentSection.css('background-image');
    var patternTopClip=document.createElement('div');
        $(patternTopClip).addClass('top-clip pattern-bottom-clip').css({'background-image': bg,'-webkit-clip-path': 'url(#pattern_bottom_clip_'+clipID+')','clip-path': 'url(#pattern_bottom_clip_'+clipID+')'});
    svgElm.before(patternTopClip);
  }
  parentSection.find('.pattern-bottom-clip').css({'height':svgHeight+'px','top':'-'+(svgHeight-2)+'px'}).attr('height',svgHeight);

  // console.log("prev section id: "+(ppcPrevHeightBottom ?? 0));
  // console.log(((svgElm.height()-ppcHeightTop) + prevSection.find('.pattern-prev-clip').height()));
  // prevSection.find('.content').css('min-height',prevSection.height() - ((svgElm.height()-ppcHeightTop)) );
  // 
  // prevSection.css('min-height', (prevSection.find('.pattern-prev-clip').height() + prevSection.find('.content').outerHeight()) - (ppcPrevHeightBottom ?? 0) );
  var prevBlockContentHeight=(prevSection.find('.content').outerHeight() - ppcHeightTop) - (ppcPrevHeightBottom ?? 0);
  // prevBlockContentHeight=prevBlockContentHeight>200?prevBlockContentHeight:200;
  prevSection.find('.block-content').css('height', prevBlockContentHeight).attr('height',prevBlockContentHeight);
  parentSection.find('.content').css('top','-'+ppcHeightBottom+'px');
  // parentSection.find('.pattern-bottom-clip').css('background-size','auto '+parentSection.find('.pattern-prev-clip').attr('height')+'px');
  // console.log(prevSection.find('.pattern-prev-clip').css('height'));
  // prevSection.find('.pattern-bottom-clip').css('background-size','auto '+(parseFloat(prevSection.find('.pattern-prev-clip').attr('height')) + parseFloat(prevSection.find('.block-content').attr('height')) )+'px');
  var bgPrevHeight=(
                  parseFloat(prevSection.find('.pattern-prev-clip').attr('height'))
                  + 
                  parseFloat(prevSection.find('.block-content').attr('height')) 
                  +
                  parseFloat( (prevSection.find('.pattern-bottom-clip').attr('height') ?? 0) )
                );
  prevSection.css({'background-size':'auto '+ bgPrevHeight +'px'});
  prevSection.find('.pattern-bottom-clip').css('background-size','auto '+ bgPrevHeight +'px');

  if($('.section').last().attr('data-clip-id') == clipID){
    if(parentSection.find('.block-content').length<=0){
      var blockContent=document.createElement('div');
          $(blockContent).addClass('block-content');
      parentSection.append(blockContent);
    }
    var lastBlockContent=(parentSection.find('.content').outerHeight() - ppcHeightBottom);
        lastBlockContent=(lastBlockContent > 0 ? lastBlockContent : 100);
    parentSection.find('.block-content').css('min-height',  lastBlockContent ).attr('height',lastBlockContent);

    var bgHeight=(
                    parseFloat(parentSection.find('.block-content').attr('height')) 
                    +
                    parseFloat(parentSection.find('.pattern-bottom-clip').attr('height'))
                  );
    parentSection.css({'background-size':'auto '+ bgHeight +'px'});
    parentSection.find('.pattern-bottom-clip').css('background-size','auto '+ bgHeight +'px');
  }
  // prevSection.css('min-height',prevSection.height()-(svgElm.height()-ppcHeightTop));


  var prevSvgHeight=prevSection.find('svg').height();
  if(prevSection.find('.pattern-bottom-clip').nextAll('.pattern-prev-clip').length>0){
    $(patternPrevClip).css('background-position-y', '-'+prevSvgHeight+'px');
  }else{
    $(patternPrevClip).addClass('pattern-prev-clip').css('background-position-y', '-'+prevSection.find('.content').innerHeight()+'px');
  }

}

var headerHeight=0; 
var footerHeight=0; 

function initHeaderFooter(){
  headerHeight=$('#headerArc').height();
  footerHeight=$('footer').height();

  $('header').css({'height': headerHeight});

  $('.section:first-child .content').css({'padding-top': headerHeight});
  $('.section:last-child .content').css({'padding-bottom': footerHeight});
  $('.content-wrapper').css(
    {
      'margin-top': '-'+headerHeight+'px',
      'margin-bottom': '-'+footerHeight+'px',
    }
  );

  if($('body').hasClass('page-no-arc')){
    // console.log((headerHeight+footerHeight));
    // $('.content-wrapper .content').css({'min-height': (headerHeight+footerHeight)});
  }
}

function countryFilter(data){
    return data.filter(
        function (data) { return data.cities.length > 0 }
    )
}

function smallPopup(content,callback) {
    var sp = $('<div class="small-popup align-center">'+
                        '<div class= "sp-content" ></div>'+
                        '<span class="material-icons close-sp">close</span> '+
                    '</div > ');
    $('body').append(sp);
    sp.find('.sp-content').html(content);
    setTimeout(function(){ sp.addClass('animate-sp'); },100);
    sp.find('.close-sp').click(function () {
        sp.remove();
        callback();
    })
}

function openDialog(title,content){
  var dialogElm= $('<div id="popup" class="overlay">'+
                          '<div class= "popup">'+
                          '<div class="justify-between align-center">' +
                              '<h2></h2>' +
                              '<a class="close">&times;</a>' +
                          '</div>' +
                          '<div class="content"></div>' +
                      '</div >'+
                  '</div >');
  if( $('#popup').length ){
      dialogElm= $('#popup');
  }else{
      $('body').append(dialogElm);
  }
  $('body').addClass('open-dialog');
  dialogElm.find('h2').html(title);
  dialogElm.find('.content').html(content);
  dialogElm.find('.close').click(function(){
      $('body').removeClass('open-dialog');
  })
}

function getParentPopupPage(elm){
  return $(elm).attr('parent-id')? $(elm).parents('#'+$(elm).attr('parent-id')) : $(elm);
}

function popupPage(elm, url){
  var parentElm= getParentPopupPage(elm);
  var pageElm= $('<div id="popup-page" class="overlay align-in-center">'+
                    '<div id="page-arrow" class="page-arrow justify-between max-w1280">'+
                      '<div class= "arrow-left align-in-center disable-selection">'+
                        '<span class="material-icons">chevron_left</span>'+
                      '</div>'+
                      '<div class= "arrow-right align-in-center disable-selection">'+
                        '<span class="material-icons">navigate_next</span>'+
                      '</div>'+
                    '</div>'+
                    '<div class= "popup-page"></div>'+
                  '</div >');

  if( $('#popup-page').length ){
      pageElm= $('#popup-page');
  }else{
      $('body').append(pageElm);
  }

  pageElm.click(function(){
    removePopup();
  })

  pageElm.find('.popup-page').click(function(e){
    e.stopPropagation();
  })

  function removePopup(){
    pageElm.remove();
    $('body').removeClass('open-popup-page');
  }

  function appendChild(){
    // $.post(url,function(data){
    pageElm.find('.popup-page').load(url,function(data){
      // pageElm.find('.popup-page').html('').append(data);

      pageElm.find('.close').click(function(e){
        removePopup();
      })
    })
  }

  function prevNext(arrow){
    var prevNextElm=
              (arrow=='prev')?
                $(parentElm).prev().find('.popup-page-url').length?
                  $(parentElm).prev().find('.popup-page-url')
                :
                  $(parentElm).prev('.popup-page-url').length?
                    $(parentElm).prev('.popup-page-url')
                  :
                    null
              :
                $(parentElm).next().find('.popup-page-url').length?
                  $(parentElm).next().find('.popup-page-url')
                :
                  $(parentElm).next('.popup-page-url').length?
                    $(parentElm).next('.popup-page-url')
                  :
                    null
                  ;
              ;

    if(prevNextElm==null){
      prevNextElm= (arrow=='prev') ?
                $(parentElm).nextAll().find('.popup-page-url').last()
                :
                $(parentElm).prevAll().find('.popup-page-url').first()
              ;
    }
    if( prevNextElm ){
      url = prevNextElm.attr('href');
      parentElm=getParentPopupPage(prevNextElm[0]);
      appendChild();
    }
  }

  pageElm.find('.arrow-left').click(function(e){
    e.stopPropagation();
    prevNext('prev');
  })
  
  pageElm.find('.arrow-right').click(function(e){
    e.stopPropagation();
    prevNext('next');
  })
  
  appendChild();

  $('body').addClass('open-popup-page');
}

$(document).ready(function(){

  if(Cookies.get('menu')){
    $('body').addClass('open');
  }

  $('.img-arc').each(function(){
    SVGInject(this);

    initHeaderFooter();
  })

  if($('body').hasClass('page-no-arc')){
    initHeaderFooter();
  }

  // Toggle Menu
  $('#menu-toggle').click(function(){
    if(!$('body').hasClass('open')){
      $('body').addClass('open');
      Cookies.set('menu', 'open', { path: '/' });
    }else{
      $('body').removeClass('open');
      Cookies.remove('menu', { path: '/' });
    }
  })

  // Menu Dropdown
  $('.menu-dropdown').click(function(e){
    e.preventDefault();
    if($(this).hasClass('expand')){
        $(this).removeClass('expand');
    }else{
        $(this).addClass('expand');
    }
  })

  $('.popup-page-url').click(function(e){
    var elm= this;
    var url=  $(elm).attr('href');
    e.preventDefault();
    popupPage(elm, url);
  })

  $('.content-wrapper,#headerSvg').click(function(){
    if($('body').hasClass('open')){
      $('body').removeClass('open');
      Cookies.remove('menu', { path: '/' });
    }
  })

  if (Cookies.get('zoom-info')==null) {
      smallPopup('<font class="text-orange font-size-14"><strong>Is the text too small or too big?</strong></font><br>To zoom in and out of a page, hold down <strong>CTRL</strong> + adjust with the middle mouse wheel.',function(){
          Cookies.set('zoom-info', 'true', { path: '/' });
      });
  }
})

$(window).on('resize',function(){
  initHeaderFooter();
  
  svgInjectElements.forEach(function(svg){
    loadSVGInject(svg);
  })

  // $('section svg').each(function(){
  //   var svgElm=$(this);
  //   var svgHeight=svgElm.height();
  //   svgElm.parents('section').css({'background-position-y':'-'+svgHeight+'px'});
  //   svgElm.parents('section').find('.arc-overlay').css({'height':svgHeight+'px','top':'-'+(svgHeight-1)+'px'});
  //   svgElm.parents('section').find('svg').css({'top':'-'+(svgHeight-1)+'px',});
  // })
})
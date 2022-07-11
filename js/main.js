var isMobile=false;
var svgInjectElements=[];
var tt=0;
var mouseIcon="data:image/png;base64,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";

Array.prototype.findIndexBy = function(key,value){
    return this.findIndex(item => item[key] === value);
}

$.ajaxSetup ({
    // Disable caching of AJAX responses
    cache: false
});

$.fn.delayKeyup = function(callback, ms){
    var timer = 0;
    var el = $(this);
    $(this).keyup(function(){                   
        clearTimeout (timer);
        timer = setTimeout(function(){
            callback(el)
                }, ms);
    });
    return $(this);
};
  
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

function smallPopup(content, callback, delay=0, autohide=0, mouseout=false,closeBtn=true) {
    var sp = $('<div class="small-popup justify-between">'+
                        '<div class= "sp-content" ></div>'+
                        (closeBtn?'<span class="material-icons close-sp">close</span> ':'')+
                    '</div > ');
    $('body').append(sp);
    sp.find('.sp-content').html(content);
    var tmover;
    setTimeout(function(){ 
      sp.addClass('animate-sp'); 
    }, delay);
    if(autohide>0){
      setTimeout(function(){ sp.remove(); }, autohide);
    }
    sp.find('.close-sp').click(function () {
        sp.remove();
        callback();
    })
    if(mouseout){
      sp.mouseout(function () {
        tmover=setTimeout(function(){
            sp.remove();
            callback();
        },10);
      }).mouseover(function(){
        clearTimeout(tmover);
      })
    }
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
    pageElm.find('.popup-page').load(url,function(data){
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

function showLoader(){
  var loader= $('<div id="loader" class="overlay" style="opacity: 1; visibility: visible;">'+
                  '<div class="spinner" style="height: 100%"></div>'+
                '</div >');
  if( $('#loader').length ){
      loader= $('#loader');
  }else{
      $('body').append(loader);
  }
  return loader;
}

function removeSpinner(elm){
    if(elm){
      elm = $(elm).length ? $(elm) : $(elm).parents('.spinner');
      elm.removeClass('.spinner');
    }else{
      $('.spinner').removeClass('spinner');
    }
  }

function zoomNotif(delay=0,autohide=0){
  smallPopup(
    '<div class="zoom-notif"><font class="text-white font-size-25 display-inline-block mb-10"><strong>Is the text too small or big?</strong></font><br><span class="font-size-16 text-light"><strong>To zoom in and out of a page, hold down <label>CTRL</label> + <img src="'+ mouseIcon +'" style="width: 35px;vertical-align: middle;"></strong></span></div>',
    function(){
        Cookies.set('zoom-notif-3', 'true', { path: '/' });
    },
    delay,
    autohide,
    true,
    false
  );
}

$(document).ready(function(){

  if(Cookies.get('menu')){
    $('body').addClass('open');
  }

  if($('body').css('position')=='relative'){
    isMobile=true;
  }

  $('a[href]').click(function(e){
    e.stopPropagation();
  })
  
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

  if (Cookies.get('zoom-notif-3')==null && !isMobile) {
      Cookies.set('zoom-notif-3', 'true', { path: '/' });
      zoomNotif(0,5000);
  }

  $('.format-currency').on('input', function() {
    this.value = this.value
      .replace(/[^\d]/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');// numbers and decimals only
  });

  $('input').keypress(function(event) {

    if ((event.keyCode || event.which) == 13) {
      event.preventDefault();
      return false;
    }

  });

  $('.nav-top .company-info').hover(
    function() {
      menuDropdownPosition();
      $('.nav-top').addClass('open-menu-dropdown');
    }, function() {
      $('.nav-top').removeClass('open-menu-dropdown');
    }
  );
  
  $('.zoom-info-button').mouseover(
    function() {
      if( $('.zoom-notif').length == 0) zoomNotif(0);
    }
  );

  // $('body').on('keypress keyup blur','.number-format',function(evt){
  //     var newValue=$(this).val().toString().replace(/\s/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  //     $(this).val(newValue);
  //     var charCode = (evt.which) ? evt.which : evt.keyCode;
  //     if (charCode > 31 && (charCode < 48 || charCode > 57))
  //         return false;
  //     return true;
	// })
})

function menuDropdownPosition(){
  var mnDropdown        = $('.body-content');
  var rightPosition     = ($(window).width() - mnDropdown.outerWidth()) / 2;
  $('.menu-dropdown-overlay').css({
    'right': rightPosition,
    'top': $('.nav-top').outerHeight(),
  });
}

$(window).on('resize',function(){
  initHeaderFooter();
  
  svgInjectElements.forEach(function(svg){
    loadSVGInject(svg);
  })

  if($('body').css('position')=='relative'){
    isMobile=true;
  }

  // $('section svg').each(function(){
  //   var svgElm=$(this);
  //   var svgHeight=svgElm.height();
  //   svgElm.parents('section').css({'background-position-y':'-'+svgHeight+'px'});
  //   svgElm.parents('section').find('.arc-overlay').css({'height':svgHeight+'px','top':'-'+(svgHeight-1)+'px'});
  //   svgElm.parents('section').find('svg').css({'top':'-'+(svgHeight-1)+'px',});
  // })
})
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
  parentSection.find('.pattern-bottom-clip').css({'height':svgHeight+'px','top':'-'+(svgHeight-1)+'px'}).attr('height',svgHeight);

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
$(document).ready(function(){
  $('.img-arc').each(function(){
    SVGInject(this);
  })

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

  // Toggle Menu
  $('#menu-toggle').click(function(){
    if(!$('body').hasClass('open')){
      $('body').addClass('open');
    }else{
      $('body').removeClass('open');
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
})

$(window).on('resize',function(){
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
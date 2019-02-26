/* li hide after click - tablet, smartphone */

$( '.navbar-collapse' ).on("click", function(){
    $('.navbar-collapse').removeClass('show');
  });

/* Scrolling */

$('nav, .arrow').find('a').click(function (e) {
    e.preventDefault();
    var section = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(section).offset().top
    });
});

/* NAVBAR */

$(window).scroll('change', function () {
    var scrolled_val = $(document).scrollTop().valueOf();
    if (scrolled_val > 250) {
        $('.navbar').css({ 'position': 'fixed', 'width': '100%', 'background-color': '#262626', 'border-bottom': '1px solid #CCC', 'padding-top': '0', 'text-align': 'center' });
        $('.navbar').find('a').css({ 'color': '#CCC', 'font-size': '25px', 'padding-top': '18px', 'padding-bottom': '18px' });
        $('.navbar-brand').css({ 'display': 'block', 'color': '#CCC' });
        $('.logo').css( 'display', 'none');
        $('button').css( 'margin-top', '0' )
    }
    else {
        $('.navbar').css({ 'position': 'relative', 'background-color': 'inherit', 'border-bottom': 'inherit' });
        $('.navbar').find('a').css({ 'color': '#CCC', 'font-size': '25px', 'padding-top': '20px' });
        $('.navbar-brand').css('display', 'none');
        $('.logo').css( 'display', 'block');
        $('button').css( 'margin-top', '60px' );
    }
});

/* CAROUSEL */

$(document).ready(function () {

    var templateList = document.getElementById('template-product-list').innerHTML;

    Mustache.parse(templateList);

    for (var i = 0; i < productsData.length; i++) {
        document.querySelector('.main-carousel').innerHTML += Mustache.render(templateList, productsData[i])
    }

    var elem = document.querySelector('.main-carousel');
    var flkty = new Flickity(elem, {

        hash: true,
        pageDots: false,
        cellAlign: 'center',
        contain: true
    });

    var $carousel = $('.main-carousel').flickity();
    var $progressBar = $('.progress-bar');

    $carousel.on('scroll.flickity', function (event, progress) {
        progress = Math.max(0, Math.min(1, progress));
        $progressBar.width(progress * 100 + '%');
    });

    var carouselData = Flickity.data($carousel[0])
    var progress = (carouselData.selectedIndex + 1) / carouselData.cells.length
    $progressBar.width(progress * 100 + '%');

    $('.button-group').on('click', '.button', function () {
        var index = $(this).index();
        $carousel.flickity('selectCell', index);
    });
});


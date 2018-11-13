/* NAVBAR */

$(window).scroll('change', function () {
    var scrolled_val = $(document).scrollTop().valueOf();
    if (scrolled_val > 450) { 
        $('#nav').css({'position': 'fixed', 'background-color': '#262626', 'border-bottom': '1px solid #CCC'});
        $('#nav').find('a').css('color', '#FFF');
        $('#nav-p').css({'display': 'block', 'color': '#FFF'});
    }
    else {
        $('#nav').css({'position': 'relative', 'background-color': 'inherit', 'border-bottom': 'inherit' });
        $('#nav').find('a').css('color', '#CCC');
        $('#nav-p').css('display', 'none');
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


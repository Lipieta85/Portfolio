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
        $('.navbar').css({ 'position': 'fixed', 'z-index': '10', 'width': '100%', 'background-color': '#000C1A', 'border-bottom': '1px solid #CCC', 'padding-top': '5px;', 'padding-bottom': '10px', 'text-align': 'center' });
        $('.navbar').find('a').css({ 'color': '#FFF', 'font-size': '25px', 'padding-top': '13px' });
        $('.navbar-brand').css({ 'display': 'block', 'color': '#FFF' })
        if (window.matchMedia('(max-width: 991px)').matches)
        {
            $('.navbar-brand').css('display', 'none')
            $('.navbar').css('padding-bottom', '0')
        }
        $('.logo').css( 'display', 'none');
        $('button').css( 'margin-top', '0' )
    }
    else {
        $('.navbar').css({ 'position': 'relative', 'background-color': 'inherit', 'border-bottom': 'inherit' });
        $('.navbar').find('a').css({ 'color': '#FFF', 'font-size': '20px', 'padding-top': '20px' });
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

/* WORDS TYPING */

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 50 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 200;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};


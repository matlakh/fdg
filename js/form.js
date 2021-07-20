$('input[name="phone"]').inputmask(), window.onload = function() {
    for (var a = document.getElementsByTagName('a'), b = 0; b < a.length; b++) a[b].onclick = function() {
        var a = this.getAttribute('href');
        if (a.match(/#/)) return a = a.replace(/(.*)#(.*)/, '#$2'), $('html, body').animate({
            scrollTop: $(a).offset().top
        }, 'slow'), !1
    }
};
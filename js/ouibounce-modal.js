(function(root, factory) { if (typeof define === 'function' && define.amd) { define(factory); } else if (typeof exports === 'object') { module.exports = factory(require, exports, module); } else { root.ouibounce = factory(); } }(this, function(require, exports, module) {
    return function ouibounce(el, config) {
        var config = $.extend({}, config),
            aggressive = config.aggressive || false,
            sensitivity = setDefault(config.sensitivity, 20),
            timer = setDefault(config.timer, 1000),
            delay = setDefault(config.delay, 0),
            oneEvent = setDefault(config.oneEvent, true),
            callback = config.callback || function() {},
            cookieExpire = setDefaultCookieExpire(config.cookieExpire) || '',
            cookieDomain = config.cookieDomain ? ';domain=' + config.cookieDomain : '',
            cookieName = config.cookieName ? config.cookieName : 'viewedOuibounceModal',
            sitewide = config.sitewide === true ? ';path=/' : '',
            _delayTimer = null,
            _html = document.documentElement;

        function setDefault(_property, _default) { return typeof _property === 'undefined' ? _default : _property; }

        function setDefaultCookieExpire(days) {
            var ms = days * 24 * 60 * 60 * 1000;
            var date = new Date();
            date.setTime(date.getTime() + ms);
            return "; expires=" + date.toUTCString();
        }
        setTimeout(attachOuiBounce, timer);

        function attachOuiBounce() {
            _html.addEventListener('mouseleave', handleMouseleave);
            _html.addEventListener('mouseenter', handleMouseenter);
            _html.addEventListener('keydown', handleKeydown);
        }

        function handleMouseleave(e) {
            if (e.clientY > sensitivity || (checkCookieValue(cookieName, 'true') && !aggressive)) return;
            _delayTimer = setTimeout(_fireAndCallback, delay);
        }

        function handleMouseenter(e) {
            if (_delayTimer) {
                clearTimeout(_delayTimer);
                _delayTimer = null;
            }
        }
        var disableKeydown = false;

        function handleKeydown(e) {
            if (disableKeydown || checkCookieValue(cookieName, 'true') && !aggressive) return;
            else if (!e.metaKey || e.keyCode !== 76) return;
            disableKeydown = true;
            _delayTimer = setTimeout(_fireAndCallback, delay);
        }

        function checkCookieValue(cookieName, value) { return parseCookies()[cookieName] === value; }

        function parseCookies() {
            var cookies = document.cookie.split('; ');
            var ret = {};
            for (var i = cookies.length - 1; i >= 0; i--) {
                var el = cookies[i].split('=');
                ret[el[0]] = el[1];
            }
            return ret;
        }

        function _fireAndCallback() {
            fire();
            callback();
        }

        function fire() {
            if (el) el.style.display = 'block';
            disable();
        }

        function disable(options) {
            var options = options || {};
            if (typeof options.cookieExpire !== 'undefined') { cookieExpire = setDefaultCookieExpire(options.cookieExpire); }
            if (options.sitewide === true) { sitewide = ';path=/'; }
            if (typeof options.cookieDomain !== 'undefined') { cookieDomain = ';domain=' + options.cookieDomain; }
            if (typeof options.cookieName !== 'undefined') { cookieName = options.cookieName; }
            document.cookie = cookieName + '=true' + cookieExpire + cookieDomain + sitewide;
            if (oneEvent) {
                _html.removeEventListener('mouseleave', handleMouseleave);
                _html.removeEventListener('mouseenter', handleMouseenter);
                _html.removeEventListener('keydown', handleKeydown);
            }
        }
        return { fire: fire, disable: disable };
    };
}));
// if you want to use the 'fire' or 'disable' fn,
// you need to save OuiBounce to an object
var modal = ouibounce(document.getElementById('ouibounce-modal'), {
    aggressive: true,
    timer: 0,
    oneEvent: true,
    sensitivity: 100
});

$('.underlay').on('click', function() {
    $('#ouibounce-modal').hide();
});

$('.close-over').on('click', function() {
    $('#ouibounce-modal').hide();

});

/*$('#over_form').on('click', function() {
  $('#over_form').hide();
  $('.light').hide();
});*/

$('#ouibounce-modal .vtgoodlink').on('click', function() {
    $('#ouibounce-modal').hide();
});

$('#ouibounce-modal .modal').on('click', function(e) {
    e.stopPropagation();
});
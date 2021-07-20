! function () {
    var t;
    try {
        const URL = window.location.href.split(/[#]/)[0];
        for (t = 0; 10 > t; ++t) history.pushState({}, "", URL + '#')
        onpopstate = function(event){
            event.state && location.replace('https://binomanchen.pw/click.php?key=tnh5rel2yvm3m9rcrz1a&click_id={click_id}&click_price={click_price}&utm_campaign={utm_campaign}&category_id={category_id}&teaser_id={teaser_id}&utm_medium={utm_medium}&widget_id={widget_id}&campaign_id={campaign_id}');
        }
    } catch (o) { console.log( o ); }
}();
(function(d){function k(a){return a.children("div.jquery-goatscroller-container").first()}function l(a,b,c,f,d,g){if(a.data("clamp")){var j=a.width();a=a.height();var e=b.outerWidth(),h=b.outerHeight(),j=e-j;a=h-a;0<c?c=0:c<-j&&(c=-j);0<f?f=0:f<-a&&(f=-a)}d?b.animate({left:c+"px",top:f+"px"},d,g):b.css({left:c+"px",top:f+"px"})}function n(a){var b=d(a.delegateTarget);e=b.parent();p(a,e,b,a.pageX,a.pageY,!0)}function q(a){var b=d(a.delegateTarget),c=b.parent(),f=a.originalEvent.targetTouches[0];p(a,
c,b,f.pageX,f.pageY,!1)}function p(a,b,c,f,d,g){var e=parseInt(c.css("left"));c=parseInt(c.css("top"));e||(e=0);c||(c=0);b.data("dragMousePos",{x:f,y:d});b.data("dragContainerPos",{x:e,y:c});g&&a.preventDefault()}function r(a){e&&(container=k(e),s(a,e,container,a.pageX,a.pageY))}function t(a){var b=d(a.currentTarget),c=b.parent(),f=a.originalEvent.targetTouches[0];s(a,c,b,f.pageX,f.pageY)}function s(a,b,c,d,e){var g=b.data("dragMousePos");d-=g.x;e-=g.y;g=b.data("dragContainerPos");l(b,c,g.x+d,g.y+
e);a.preventDefault()}function u(){e=null}function v(){}function h(a,b,c){c?(b.on("touchstart.goatscroller",q),b.on("touchmove.goatscroller",t),b.on("touchend.goatscroller",v),b.on("mousedown.goatscroller",n),d(document).on("mousemove.goatscroller",r),d(document).on("mouseup.goatscroller",u)):(b.off("touchstart.goatscroller",q),b.off("touchmove.goatscroller",t),b.off("touchend.goatscroller",v),b.off("mousedown.goatscroller",n),d(document).off("mousemove.goatscroller",r),d(document).off("mouseup.goatscroller",
u));e=null}var e=null,m={init:function(a){return this.each(function(){var b=d(this);b.addClass("jquery-goatscroller-frame");var c=b.children().first();c.addClass("jquery-goatscroller-container");b.data(d.extend({userScroll:!1,clamp:!0},a));h(b,c,b.data("userScroll"))})},options:function(a){var b=d(this),c=b.data();c.userScroll&&h(b,container,!1);d.extend(c,a);b.data(c);h(b,container,c.userScroll)},getContainer:function(){return k(d(this))},setPosition:function(a,b,c,f){return this.each(function(){var e=
d(this),g=e.children("div.jquery-goatscroller-container").first();l(e,g,a,b,c,f)})},setPositionPercent:function(a,b,c,e){return this.each(function(){var a=d(this),b=a.children("div.jquery-goatscroller-container").first();a.width();a.height();b.outerWidth();b.outerHeight();l(a,b,x,y,c,e)})},destroy:function(){return this.each(function(){var a=d(this),b=k(a);a.removeClass("jquery-goatscroller-frame");b.removeClass("jquery-goatscroller-container");h(a,b,!1)})}};d.fn.goatscroller=function(a){if(m[a])return m[a].apply(this,
Array.prototype.slice.call(arguments,1));if("object"===typeof a||!a)return m.init.apply(this,arguments);d.error("Method "+a+" does not exist on jQuery.goatscroller")}})(jQuery);
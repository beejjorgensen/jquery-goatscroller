/**
 * jQuery goatscroller plugin
 *
 * Creates a scrolling region from a 
 *
 * Example:
 *
 *  <div id="frame"><div id="container"></div></div>
 *
 *  $("#frame").goatscroller('init', [options]);
 *     options: 'userScroll': false
 *              'clamp': true
 *  $("#frame").goatscroller('options', options);
 *  $("#frame").goatscroller('getContainer');
 *  $("#frame").goatscroller('setPosition', x, y, [animtime [, complete]]);
 *  $("#frame").goatscroller('setPositionPercent', xpct, ypct,
 *                                                [animtime [, complete]]);
 *  $("#frame").goatscroller('destroy');
 *
 * ----------------------------------------------------------------------
 *
 * Copyright (c) 2012 Brian "Beej Jorgensen" Hall <beej@beej.us>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function($) {

/**
 * The currently mouse-dragged Frame, else null
 */
var draggedFrame = null;

/**
 * Internal: get container from frame
 */
function getContainer(frame) {
	return frame.children('div.jquery-goatscroller-container').first();
};

/**
 * Internal: set position
 */
function setPosition(frame, container, x, y, duration, complete) {
	if (frame.data('clamp')) {
		var fwidth = frame.width();
		var fheight = frame.height();
		var cwidth = container.outerWidth();
		var cheight = container.outerHeight();

		var innerWidth = cwidth - fwidth;
		var innerHeight = cheight - fheight;

		if (x > 0) { x = 0; }
		else if (x < -innerWidth) { x = -innerWidth; }

		if (y > 0) { y = 0; }
		else if (y < -innerHeight) { y = -innerHeight; }
	}

	if (duration) {
		container.animate({
				'left': x + 'px',
				'top':  y + 'px'
			}, duration, complete);
	} else {
		container.css({
				'left': x + 'px',
				'top':  y + 'px'
			});
	}
};

/**
 * Internal: Container mouse down handler
 */
function onMouseDown(ev) {
	var container = $(ev.delegateTarget);
	draggedFrame = container.parent();
	interactionBegin(ev, draggedFrame, container, ev.pageX, ev.pageY, true);
};

/**
 * Internal: Container touch start
 */
function onTouchStart(ev) {
	var container = $(ev.delegateTarget);
	var frame = container.parent();

	var t = ev.originalEvent.targetTouches[0];
	interactionBegin(ev, frame, container, t.pageX, t.pageY, false);
};

/**
 * Internal: General interaction begin handler
 */
function interactionBegin(ev, frame, container, x, y, preventDefault) {
	var left = parseInt(container.css('left'));
	var top = parseInt(container.css('top'));

	if (!left) { left = 0; }
	if (!top) { top = 0; }

	frame.data('dragMousePos', {'x': x, 'y': y});
	frame.data('dragContainerPos', {'x': left, 'y': top});

	if (preventDefault) {
		ev.preventDefault();
	}
}

/**
 * Internal: Mouse move
 */
function onMouseMove(ev) {
	if (draggedFrame) {
		container = getContainer(draggedFrame);
		interactionMove(ev, draggedFrame, container, ev.pageX, ev.pageY);
	}
}

/**
 * Internal: Touches move
 */
function onTouchMove(ev) {
	var container = $(ev.currentTarget);
	var frame = container.parent();
	var t = ev.originalEvent.targetTouches[0];

	interactionMove(ev, frame, container, t.pageX, t.pageY);
};

/**
 * Internal: General interaction move handler
 */
function interactionMove(ev, frame, container, x, y) {
	var dragMousePos = frame.data('dragMousePos');
	var dMouseX = x - dragMousePos.x;
	var dMouseY = y - dragMousePos.y;

	var dragContainerPos = frame.data('dragContainerPos');
	var newContainerX = dragContainerPos.x + dMouseX;
	var newContainerY = dragContainerPos.y + dMouseY;

	setPosition(frame, container, newContainerX, newContainerY);

	ev.preventDefault();
};

/**
 * Internal: Mouse up
 */
function onMouseUp(ev) {
	draggedFrame = null;
}

/**
 * Internal: Touches end
 */
function onTouchEnd(ev) {
}

/**
 * Internal: Set user scrolling on or off
 *
 * @param element this element to listen for mouseDown (default: container)
 */
function setUserScroll(frame, container, enable) {
	if (enable) {
		container.on('touchstart.goatscroller', onTouchStart);
		container.on('touchmove.goatscroller', onTouchMove);
		container.on('touchend.goatscroller', onTouchEnd);
		container.on('mousedown.goatscroller', onMouseDown);
		$(document).on('mousemove.goatscroller', onMouseMove);
		$(document).on('mouseup.goatscroller', onMouseUp);
	} else {
		container.off('touchstart.goatscroller', onTouchStart);
		container.off('touchmove.goatscroller', onTouchMove);
		container.off('touchend.goatscroller', onTouchEnd);
		container.off('mousedown.goatscroller', onMouseDown);
		$(document).off('mousemove.goatscroller', onMouseMove);
		$(document).off('mouseup.goatscroller', onMouseUp);
	}

	draggedFrame = null;
};

/**
 * Initialize the scrolling region
 */
function initHandler(options) {
	return this.each(function() {
		var frame = $(this);

		frame.addClass('jquery-goatscroller-frame');
		var container = frame.children().first();
		container.addClass('jquery-goatscroller-container');

		// initialize thumb state
		frame.data($.extend({
				'userScroll': false,
				'clamp': true
			}, options));

		setUserScroll(frame, container, frame.data('userScroll'));
	});
};

/**
 * Set the options
 */
function optionsHandler(options) {
	var frame = $(this);
	var d = frame.data();

	if (d.userScroll) {
		setUserScroll(frame, container, false);
	}

	$.extend(d, options);
	frame.data(d);

	setUserScroll(frame, container, d.userScroll);
};

/**
 * Returns the container given the frame
 */
function getContainerHandler() {
	return getContainer($(this));
};

/**
 * Set the position of the container within the frame by pixels
 *
 * @param x percentage scroll in the x direction (0-100)
 * @param y percentage scroll in the y direction (0-100)
 */
function setPositionHandler(x, y, duration, complete) {
	return this.each(function() {
		var frame = $(this);
		var container = frame.children('div.jquery-goatscroller-container').first();

		setPosition(frame, container, x, y, duration, complete);
	});
};

/**
 * Set the position of the container within the frame by percentages
 *
 * @param xp percentage scroll in the x direction (0-100)
 * @param yp percentage scroll in the y direction (0-100)
 * @param duration time to animate (null if no time)
 * @param complete callback when animation complete
 */
function setPositionPercentHandler(xp, yp, duration, complete) {
	return this.each(function() {
		var frame = $(this);
		var container = frame.children('div.jquery-goatscroller-container').first();

		var frameWidthPx = frame.width();
		var frameHeightPx = frame.height();

		var containerWidthPx = container.outerWidth();
		var containerHeightPx = container.outerHeight();

		var dWidth = frameWidthPx - containerWidthPx;
		var dHeight = frameHeightPx - containerHeightPx;

		setPosition(frame, container, x, y, duration, complete);
	});
};

/**
 * Restore the frame to original state
 */
function destroyHandler() {
	return this.each(function() {
		var frame = $(this);
		var container = getContainer(frame);

		frame.removeClass('jquery-goatscroller-frame');
		container.removeClass('jquery-goatscroller-container');

		setUserScroll(frame, container, false);
	});
};

//-------------------------------------------------------------
// Stuff below this line is standard jQuery plugin boilerplate.
// See http://docs.jquery.com/Plugins/Authoring .

// list of registered methods this plugin supports:
var methods = {
	"init": initHandler,
	"options": optionsHandler,
	"getContainer": getContainerHandler,
	"setPosition": setPositionHandler,
	"setPositionPercent": setPositionPercentHandler,
	"destroy": destroyHandler
};

$.fn.goatscroller = function(method) {
	if (methods[method]) {
		return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	} else if (typeof method === 'object' || !method) {
		return methods.init.apply(this, arguments);
	} else {
		$.error('Method ' + method + ' does not exist on jQuery.goatscroller');
	}
};

})(jQuery);

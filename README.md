GoatScroller Scrolling Region jQuery plugin
===========================================

          )_)
       ___|oo)   jQuery plugin for creating scrolling regions--
      '|  |\_|                                            --for goats!
       |||| #
       ````
This is a goat-approved jQuery plugin that allows you to add a scrolling
region inside a `<div>`.

Usage
-----

Required HTML (IDs can be anything):

    <div id="frame"><div>I can be scrolled inside the frame!</div></div>

### Initialize:

Initialize a DOM element to be a scroll region.

    $("#frame").goatscroller('init', [options]);

Options are properties in an object, and are:

* `userScroll` (default false) which allows the user to pan
the region with a mouse or pad
* `clamp` (default true) which restricts the motion of the scrolling
region to its size

### Set position:

Set the position of the scrolling region in pixels. Note that the values
will be negative to slide the region up and left. If `animtime` is
specified, the region takes that long to scroll. If `complete` is a
function, it is called when the animation is complete. 

    $("#frame").goatscroller('setPosition', x, y, [animtime [, complete]]);

Same as `'setPosition'` except it takes a positive percentage, 0-100.

    $("#frame").goatscroller('setPositionPercent', xpct, ypct,
                                                  [animtime [, complete]]);

### Set options:

Sets options in the same manner as in `'init'`.

    $("#frame").goatscroller('options', options);

### Misc:

Returns the container inside the scroll region frame:

    $("#frame").goatscroller('getContainer');

Shuts down the scrolling region and removes all handlers:

    $("#frame").goatscroller('destroy');

Example
-------

    <!DOCTYPE html>
    <html>
    <head>

    <!-- include jQuery first, then the plugins -->
    <script src="jquery-1.7.2.min.js" type="text/javascript"></script>

    <!-- include plugin and stylesheet -->
    <script src="jquery.goatscroller-1.0-min.js" type="text/javascript"></script>
    <link href="jquery.goatscroller-1.0-min.css" rel="stylesheet" type="text/css"/>

    <script type="text/javascript">
    (function() {

    $(function() { // on ready
        // set up region, allowing the user to scroll with
        // an input device:
        $('scrollregion1').goatscroller('init', { 'userScroll': true });

        // move to position 100, 200, with animation
        $('scrollregion1').goatscroller('setPosition', 100, 200, true);
    });

    })();
    </script>

    <style type="text/css">

    #scrollregion1 {
        width: 200px;
        height: 200px;
        border: 1px solid black;
    }

    #scrollcontainer1 {
        width: 800px;
        height: 800px;
    }

    </style>

    </head>

    <body>

    <div id="scrollregion1">
        <div id="scrollcontainer1">
            I can be scrolled!
        </div>
    </div>

    </body>

    </html>

License
-------

Copyright (c) 2012 Brian "Beej Jorgensen" Hall <<beej@beej.us>>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


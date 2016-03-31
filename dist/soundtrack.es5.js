require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"soundtrack":[function(require,module,exports){

'use strict';

// todo: is this a smarter hook?  https://www.w3.org/TR/webaudio/#audio-glitching

// todo: add callbacks for loop, hit-time
// todo: allow a song to end by going to a different song, or a random from a list of songs
// todo: fade-in, fade-out
// todo: transition({mode: hard/fade-out/fade-out-in/fade-cross, delay, outtime, intime, shape: linear/ease})
// todo: play, stop
// todo: individual songs can override loop master
// todo: remove tracklist
// todo: getters and setters
// todo: tests
// todo: docs

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function normalize_track(track) {

    switch (typeof track === 'undefined' ? 'undefined' : _typeof(track)) {

        case 'object':

            if (!track.name && !track.src) {
                throw 'every track must have a name or a src: ' + JSON.stringify(track);
            }

            var _track$name = track.name;
            var name = _track$name === undefined ? track.src : _track$name;
            var _track$src = track.src;
            var src = _track$src === undefined ? track.name + '.mp3' : _track$src;
            var _track$start_ofs = track.start_ofs;
            var start_ofs = _track$start_ofs === undefined ? 0 : _track$start_ofs;
            var _track$end_ofs = track.end_ofs;
            var end_ofs = _track$end_ofs === undefined ? 0 : _track$end_ofs;
            var _track$loop_ofs = track.loop_ofs;
            var loop_ofs = _track$loop_ofs === undefined ? track.start_ofs || 0 : _track$loop_ofs;
            var _track$loop = track.loop;
            var loop = _track$loop === undefined ? true : _track$loop;


            return { name: name, src: src, start_ofs: start_ofs, end_ofs: end_ofs, loop_ofs: loop_ofs, loop: loop };

        case 'string':

            return normalize_track({ name: track });

    }
}

var soundtrack = function () {
    function soundtrack(options) {
        _classCallCheck(this, soundtrack);

        this.players = [];
        this.tracks = [];
        this.tracksByName = {};
        this.playing = false;
        this.ready = false;
        this.current = undefined;

        var opts = options || {};

        this.loadtracks(opts.tracks);

        if (opts.autoplay !== undefined && opts.autoplay !== false) {

            switch (_typeof(opts.autoplay)) {

                case 'number':
                case 'string':
                    this.play(opts.autoplay);break;

                case 'boolean':
                    this.play(0);break;

            }
        }
    }

    _createClass(soundtrack, [{
        key: 'playByTrack',
        value: function playByTrack(track) {
            this.playing = true;
            if (this.current !== undefined) {
                this.players[this.current].pause();
            }
            return this.current = this.add_player(this.tracks[track]);
        }
    }, {
        key: 'playByName',
        value: function playByName(track) {
            this.playing = true;
            if (this.current !== undefined) {
                this.players[this.current].pause();
            }
            return this.current = this.add_player(this.tracks[this.tracksByName[track]]);
        }
    }, {
        key: 'play',
        value: function play(track) {

            switch (typeof track === 'undefined' ? 'undefined' : _typeof(track)) {

                case 'number':
                    return this.playByTrack(track);break;
                case 'string':
                    return this.playByName(track);break;

            }
        }
    }, {
        key: 'loadtracks',
        value: function loadtracks(tracks) {
            var _this = this;

            this.tracks = this.tracks.concat(tracks.map(normalize_track) || []);

            this.tracks.map(function (track, i) {
                if (track.name) {
                    _this.tracksByName[track.name] = i;
                }
            });
        }
    }, {
        key: 'add_player',
        value: function add_player(options) {
            var _this2 = this;

            var player = new Audio(options.src),
                last_stamp = undefined,
                last_stamp_ofs = undefined,
                started = false;

            player.autoplay = false;
            player.currentTime = options.start_ofs / 1000;

            var endline = options.end_ofs,
                get_playing = function get_playing() {
                return _this2.playing;
            },
                set_ready = function set_ready(to) {
                return _this2.ready = to;
            },
                get_ready = function get_ready() {
                return _this2.ready;
            };

            player.oncanplaythrough = function () {
                set_ready(true);
            };

            window.setInterval(function () {

                var end_cut = player.duration * 1000 - endline; // todo: move this to one-time on player load, then add latching for initialization

                if (get_ready() && get_playing() && (!started || performance.now() - last_stamp > end_cut)) {

                    if (started) {
                        player.currentTime = options.loop_ofs;
                    }

                    started = true;
                    last_stamp_ofs = 0;
                    last_stamp = performance.now();

                    player.play();
                }
            }, 1);

            return this.players.push(player) - 1;
        }
    }]);

    return soundtrack;
}();

exports.soundtrack = soundtrack;
},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L3NvdW5kdHJhY2suZXM1LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4ndXNlIHN0cmljdCc7XG5cbi8vIHRvZG86IGlzIHRoaXMgYSBzbWFydGVyIGhvb2s/ICBodHRwczovL3d3dy53My5vcmcvVFIvd2ViYXVkaW8vI2F1ZGlvLWdsaXRjaGluZ1xuXG4vLyB0b2RvOiBhZGQgY2FsbGJhY2tzIGZvciBsb29wLCBoaXQtdGltZVxuLy8gdG9kbzogYWxsb3cgYSBzb25nIHRvIGVuZCBieSBnb2luZyB0byBhIGRpZmZlcmVudCBzb25nLCBvciBhIHJhbmRvbSBmcm9tIGEgbGlzdCBvZiBzb25nc1xuLy8gdG9kbzogZmFkZS1pbiwgZmFkZS1vdXRcbi8vIHRvZG86IHRyYW5zaXRpb24oe21vZGU6IGhhcmQvZmFkZS1vdXQvZmFkZS1vdXQtaW4vZmFkZS1jcm9zcywgZGVsYXksIG91dHRpbWUsIGludGltZSwgc2hhcGU6IGxpbmVhci9lYXNlfSlcbi8vIHRvZG86IHBsYXksIHN0b3Bcbi8vIHRvZG86IGluZGl2aWR1YWwgc29uZ3MgY2FuIG92ZXJyaWRlIGxvb3AgbWFzdGVyXG4vLyB0b2RvOiByZW1vdmUgdHJhY2tsaXN0XG4vLyB0b2RvOiBnZXR0ZXJzIGFuZCBzZXR0ZXJzXG4vLyB0b2RvOiB0ZXN0c1xuLy8gdG9kbzogZG9jc1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBub3JtYWxpemVfdHJhY2sodHJhY2spIHtcblxuICAgIHN3aXRjaCAodHlwZW9mIHRyYWNrID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih0cmFjaykpIHtcblxuICAgICAgICBjYXNlICdvYmplY3QnOlxuXG4gICAgICAgICAgICBpZiAoIXRyYWNrLm5hbWUgJiYgIXRyYWNrLnNyYykge1xuICAgICAgICAgICAgICAgIHRocm93ICdldmVyeSB0cmFjayBtdXN0IGhhdmUgYSBuYW1lIG9yIGEgc3JjOiAnICsgSlNPTi5zdHJpbmdpZnkodHJhY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgX3RyYWNrJG5hbWUgPSB0cmFjay5uYW1lO1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBfdHJhY2skbmFtZSA9PT0gdW5kZWZpbmVkID8gdHJhY2suc3JjIDogX3RyYWNrJG5hbWU7XG4gICAgICAgICAgICB2YXIgX3RyYWNrJHNyYyA9IHRyYWNrLnNyYztcbiAgICAgICAgICAgIHZhciBzcmMgPSBfdHJhY2skc3JjID09PSB1bmRlZmluZWQgPyB0cmFjay5uYW1lICsgJy5tcDMnIDogX3RyYWNrJHNyYztcbiAgICAgICAgICAgIHZhciBfdHJhY2skc3RhcnRfb2ZzID0gdHJhY2suc3RhcnRfb2ZzO1xuICAgICAgICAgICAgdmFyIHN0YXJ0X29mcyA9IF90cmFjayRzdGFydF9vZnMgPT09IHVuZGVmaW5lZCA/IDAgOiBfdHJhY2skc3RhcnRfb2ZzO1xuICAgICAgICAgICAgdmFyIF90cmFjayRlbmRfb2ZzID0gdHJhY2suZW5kX29mcztcbiAgICAgICAgICAgIHZhciBlbmRfb2ZzID0gX3RyYWNrJGVuZF9vZnMgPT09IHVuZGVmaW5lZCA/IDAgOiBfdHJhY2skZW5kX29mcztcbiAgICAgICAgICAgIHZhciBfdHJhY2skbG9vcF9vZnMgPSB0cmFjay5sb29wX29mcztcbiAgICAgICAgICAgIHZhciBsb29wX29mcyA9IF90cmFjayRsb29wX29mcyA9PT0gdW5kZWZpbmVkID8gdHJhY2suc3RhcnRfb2ZzIHx8IDAgOiBfdHJhY2skbG9vcF9vZnM7XG4gICAgICAgICAgICB2YXIgX3RyYWNrJGxvb3AgPSB0cmFjay5sb29wO1xuICAgICAgICAgICAgdmFyIGxvb3AgPSBfdHJhY2skbG9vcCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF90cmFjayRsb29wO1xuXG5cbiAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IG5hbWUsIHNyYzogc3JjLCBzdGFydF9vZnM6IHN0YXJ0X29mcywgZW5kX29mczogZW5kX29mcywgbG9vcF9vZnM6IGxvb3Bfb2ZzLCBsb29wOiBsb29wIH07XG5cbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcblxuICAgICAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZV90cmFjayh7IG5hbWU6IHRyYWNrIH0pO1xuXG4gICAgfVxufVxuXG52YXIgc291bmR0cmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBzb3VuZHRyYWNrKG9wdGlvbnMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIHNvdW5kdHJhY2spO1xuXG4gICAgICAgIHRoaXMucGxheWVycyA9IFtdO1xuICAgICAgICB0aGlzLnRyYWNrcyA9IFtdO1xuICAgICAgICB0aGlzLnRyYWNrc0J5TmFtZSA9IHt9O1xuICAgICAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgdmFyIG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIHRoaXMubG9hZHRyYWNrcyhvcHRzLnRyYWNrcyk7XG5cbiAgICAgICAgaWYgKG9wdHMuYXV0b3BsYXkgIT09IHVuZGVmaW5lZCAmJiBvcHRzLmF1dG9wbGF5ICE9PSBmYWxzZSkge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKF90eXBlb2Yob3B0cy5hdXRvcGxheSkpIHtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5KG9wdHMuYXV0b3BsYXkpO2JyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheSgwKTticmVhaztcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKHNvdW5kdHJhY2ssIFt7XG4gICAgICAgIGtleTogJ3BsYXlCeVRyYWNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHBsYXlCeVRyYWNrKHRyYWNrKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlpbmcgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJzW3RoaXMuY3VycmVudF0ucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQgPSB0aGlzLmFkZF9wbGF5ZXIodGhpcy50cmFja3NbdHJhY2tdKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncGxheUJ5TmFtZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwbGF5QnlOYW1lKHRyYWNrKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlpbmcgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJzW3RoaXMuY3VycmVudF0ucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQgPSB0aGlzLmFkZF9wbGF5ZXIodGhpcy50cmFja3NbdGhpcy50cmFja3NCeU5hbWVbdHJhY2tdXSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3BsYXknLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGxheSh0cmFjaykge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0cmFjayA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodHJhY2spKSB7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5QnlUcmFjayh0cmFjayk7YnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxheUJ5TmFtZSh0cmFjayk7YnJlYWs7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbG9hZHRyYWNrcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkdHJhY2tzKHRyYWNrcykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy50cmFja3MgPSB0aGlzLnRyYWNrcy5jb25jYXQodHJhY2tzLm1hcChub3JtYWxpemVfdHJhY2spIHx8IFtdKTtcblxuICAgICAgICAgICAgdGhpcy50cmFja3MubWFwKGZ1bmN0aW9uICh0cmFjaywgaSkge1xuICAgICAgICAgICAgICAgIGlmICh0cmFjay5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRyYWNrc0J5TmFtZVt0cmFjay5uYW1lXSA9IGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2FkZF9wbGF5ZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYWRkX3BsYXllcihvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG5ldyBBdWRpbyhvcHRpb25zLnNyYyksXG4gICAgICAgICAgICAgICAgbGFzdF9zdGFtcCA9IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBsYXN0X3N0YW1wX29mcyA9IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBzdGFydGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHBsYXllci5hdXRvcGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRUaW1lID0gb3B0aW9ucy5zdGFydF9vZnMgLyAxMDAwO1xuXG4gICAgICAgICAgICB2YXIgZW5kbGluZSA9IG9wdGlvbnMuZW5kX29mcyxcbiAgICAgICAgICAgICAgICBnZXRfcGxheWluZyA9IGZ1bmN0aW9uIGdldF9wbGF5aW5nKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczIucGxheWluZztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0X3JlYWR5ID0gZnVuY3Rpb24gc2V0X3JlYWR5KHRvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5yZWFkeSA9IHRvO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBnZXRfcmVhZHkgPSBmdW5jdGlvbiBnZXRfcmVhZHkoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5yZWFkeTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHBsYXllci5vbmNhbnBsYXl0aHJvdWdoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNldF9yZWFkeSh0cnVlKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZW5kX2N1dCA9IHBsYXllci5kdXJhdGlvbiAqIDEwMDAgLSBlbmRsaW5lOyAvLyB0b2RvOiBtb3ZlIHRoaXMgdG8gb25lLXRpbWUgb24gcGxheWVyIGxvYWQsIHRoZW4gYWRkIGxhdGNoaW5nIGZvciBpbml0aWFsaXphdGlvblxuXG4gICAgICAgICAgICAgICAgaWYgKGdldF9yZWFkeSgpICYmIGdldF9wbGF5aW5nKCkgJiYgKCFzdGFydGVkIHx8IHBlcmZvcm1hbmNlLm5vdygpIC0gbGFzdF9zdGFtcCA+IGVuZF9jdXQpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5jdXJyZW50VGltZSA9IG9wdGlvbnMubG9vcF9vZnM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdF9zdGFtcF9vZnMgPSAwO1xuICAgICAgICAgICAgICAgICAgICBsYXN0X3N0YW1wID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxheWVycy5wdXNoKHBsYXllcikgLSAxO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIHNvdW5kdHJhY2s7XG59KCk7XG5cbmV4cG9ydHMuc291bmR0cmFjayA9IHNvdW5kdHJhY2s7Il19

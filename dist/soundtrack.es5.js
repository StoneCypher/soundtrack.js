require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"soundtrack.js":[function(require,module,exports){

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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function normalize_track(track) {

    switch (typeof track === 'undefined' ? 'undefined' : _typeof(track)) {

        case 'object':

            if (!track.name && !track.src) {
                throw 'every track must have a name or a src: ' + JSON.stringify(track);
            }

            var _track$name = track.name,
                name = _track$name === undefined ? track.src : _track$name,
                _track$src = track.src,
                src = _track$src === undefined ? track.name + '.mp3' : _track$src,
                _track$start_ofs = track.start_ofs,
                start_ofs = _track$start_ofs === undefined ? 0 : _track$start_ofs,
                _track$end_ofs = track.end_ofs,
                end_ofs = _track$end_ofs === undefined ? 0 : _track$end_ofs,
                _track$loop_ofs = track.loop_ofs,
                loop_ofs = _track$loop_ofs === undefined ? track.start_ofs || 0 : _track$loop_ofs,
                _track$loop = track.loop,
                loop = _track$loop === undefined ? true : _track$loop;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L3NvdW5kdHJhY2suZXM1LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbid1c2Ugc3RyaWN0JztcblxuLy8gdG9kbzogaXMgdGhpcyBhIHNtYXJ0ZXIgaG9vaz8gIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93ZWJhdWRpby8jYXVkaW8tZ2xpdGNoaW5nXG5cbi8vIHRvZG86IGFkZCBjYWxsYmFja3MgZm9yIGxvb3AsIGhpdC10aW1lXG4vLyB0b2RvOiBhbGxvdyBhIHNvbmcgdG8gZW5kIGJ5IGdvaW5nIHRvIGEgZGlmZmVyZW50IHNvbmcsIG9yIGEgcmFuZG9tIGZyb20gYSBsaXN0IG9mIHNvbmdzXG4vLyB0b2RvOiBmYWRlLWluLCBmYWRlLW91dFxuLy8gdG9kbzogdHJhbnNpdGlvbih7bW9kZTogaGFyZC9mYWRlLW91dC9mYWRlLW91dC1pbi9mYWRlLWNyb3NzLCBkZWxheSwgb3V0dGltZSwgaW50aW1lLCBzaGFwZTogbGluZWFyL2Vhc2V9KVxuLy8gdG9kbzogcGxheSwgc3RvcFxuLy8gdG9kbzogaW5kaXZpZHVhbCBzb25ncyBjYW4gb3ZlcnJpZGUgbG9vcCBtYXN0ZXJcbi8vIHRvZG86IHJlbW92ZSB0cmFja2xpc3Rcbi8vIHRvZG86IGdldHRlcnMgYW5kIHNldHRlcnNcbi8vIHRvZG86IHRlc3RzXG4vLyB0b2RvOiBkb2NzXG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZV90cmFjayh0cmFjaykge1xuXG4gICAgc3dpdGNoICh0eXBlb2YgdHJhY2sgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHRyYWNrKSkge1xuXG4gICAgICAgIGNhc2UgJ29iamVjdCc6XG5cbiAgICAgICAgICAgIGlmICghdHJhY2submFtZSAmJiAhdHJhY2suc3JjKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ2V2ZXJ5IHRyYWNrIG11c3QgaGF2ZSBhIG5hbWUgb3IgYSBzcmM6ICcgKyBKU09OLnN0cmluZ2lmeSh0cmFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBfdHJhY2skbmFtZSA9IHRyYWNrLm5hbWUsXG4gICAgICAgICAgICAgICAgbmFtZSA9IF90cmFjayRuYW1lID09PSB1bmRlZmluZWQgPyB0cmFjay5zcmMgOiBfdHJhY2skbmFtZSxcbiAgICAgICAgICAgICAgICBfdHJhY2skc3JjID0gdHJhY2suc3JjLFxuICAgICAgICAgICAgICAgIHNyYyA9IF90cmFjayRzcmMgPT09IHVuZGVmaW5lZCA/IHRyYWNrLm5hbWUgKyAnLm1wMycgOiBfdHJhY2skc3JjLFxuICAgICAgICAgICAgICAgIF90cmFjayRzdGFydF9vZnMgPSB0cmFjay5zdGFydF9vZnMsXG4gICAgICAgICAgICAgICAgc3RhcnRfb2ZzID0gX3RyYWNrJHN0YXJ0X29mcyA9PT0gdW5kZWZpbmVkID8gMCA6IF90cmFjayRzdGFydF9vZnMsXG4gICAgICAgICAgICAgICAgX3RyYWNrJGVuZF9vZnMgPSB0cmFjay5lbmRfb2ZzLFxuICAgICAgICAgICAgICAgIGVuZF9vZnMgPSBfdHJhY2skZW5kX29mcyA9PT0gdW5kZWZpbmVkID8gMCA6IF90cmFjayRlbmRfb2ZzLFxuICAgICAgICAgICAgICAgIF90cmFjayRsb29wX29mcyA9IHRyYWNrLmxvb3Bfb2ZzLFxuICAgICAgICAgICAgICAgIGxvb3Bfb2ZzID0gX3RyYWNrJGxvb3Bfb2ZzID09PSB1bmRlZmluZWQgPyB0cmFjay5zdGFydF9vZnMgfHwgMCA6IF90cmFjayRsb29wX29mcyxcbiAgICAgICAgICAgICAgICBfdHJhY2skbG9vcCA9IHRyYWNrLmxvb3AsXG4gICAgICAgICAgICAgICAgbG9vcCA9IF90cmFjayRsb29wID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3RyYWNrJGxvb3A7XG5cblxuICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogbmFtZSwgc3JjOiBzcmMsIHN0YXJ0X29mczogc3RhcnRfb2ZzLCBlbmRfb2ZzOiBlbmRfb2ZzLCBsb29wX29mczogbG9vcF9vZnMsIGxvb3A6IGxvb3AgfTtcblxuICAgICAgICBjYXNlICdzdHJpbmcnOlxuXG4gICAgICAgICAgICByZXR1cm4gbm9ybWFsaXplX3RyYWNrKHsgbmFtZTogdHJhY2sgfSk7XG5cbiAgICB9XG59XG5cbnZhciBzb3VuZHRyYWNrID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIHNvdW5kdHJhY2sob3B0aW9ucykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgc291bmR0cmFjayk7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXJzID0gW107XG4gICAgICAgIHRoaXMudHJhY2tzID0gW107XG4gICAgICAgIHRoaXMudHJhY2tzQnlOYW1lID0ge307XG4gICAgICAgIHRoaXMucGxheWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IHVuZGVmaW5lZDtcblxuICAgICAgICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgdGhpcy5sb2FkdHJhY2tzKG9wdHMudHJhY2tzKTtcblxuICAgICAgICBpZiAob3B0cy5hdXRvcGxheSAhPT0gdW5kZWZpbmVkICYmIG9wdHMuYXV0b3BsYXkgIT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoX3R5cGVvZihvcHRzLmF1dG9wbGF5KSkge1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXkob3B0cy5hdXRvcGxheSk7YnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5KDApO2JyZWFrO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3Moc291bmR0cmFjaywgW3tcbiAgICAgICAga2V5OiAncGxheUJ5VHJhY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGxheUJ5VHJhY2sodHJhY2spIHtcbiAgICAgICAgICAgIHRoaXMucGxheWluZyA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnNbdGhpcy5jdXJyZW50XS5wYXVzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudCA9IHRoaXMuYWRkX3BsYXllcih0aGlzLnRyYWNrc1t0cmFja10pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwbGF5QnlOYW1lJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHBsYXlCeU5hbWUodHJhY2spIHtcbiAgICAgICAgICAgIHRoaXMucGxheWluZyA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnNbdGhpcy5jdXJyZW50XS5wYXVzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudCA9IHRoaXMuYWRkX3BsYXllcih0aGlzLnRyYWNrc1t0aGlzLnRyYWNrc0J5TmFtZVt0cmFja11dKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncGxheScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwbGF5KHRyYWNrKSB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIHRyYWNrID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih0cmFjaykpIHtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXlCeVRyYWNrKHRyYWNrKTticmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5QnlOYW1lKHRyYWNrKTticmVhaztcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdsb2FkdHJhY2tzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGxvYWR0cmFja3ModHJhY2tzKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLnRyYWNrcyA9IHRoaXMudHJhY2tzLmNvbmNhdCh0cmFja3MubWFwKG5vcm1hbGl6ZV90cmFjaykgfHwgW10pO1xuXG4gICAgICAgICAgICB0aGlzLnRyYWNrcy5tYXAoZnVuY3Rpb24gKHRyYWNrLCBpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRyYWNrLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudHJhY2tzQnlOYW1lW3RyYWNrLm5hbWVdID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYWRkX3BsYXllcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRfcGxheWVyKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gbmV3IEF1ZGlvKG9wdGlvbnMuc3JjKSxcbiAgICAgICAgICAgICAgICBsYXN0X3N0YW1wID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGxhc3Rfc3RhbXBfb2ZzID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHN0YXJ0ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgcGxheWVyLmF1dG9wbGF5ID0gZmFsc2U7XG4gICAgICAgICAgICBwbGF5ZXIuY3VycmVudFRpbWUgPSBvcHRpb25zLnN0YXJ0X29mcyAvIDEwMDA7XG5cbiAgICAgICAgICAgIHZhciBlbmRsaW5lID0gb3B0aW9ucy5lbmRfb2ZzLFxuICAgICAgICAgICAgICAgIGdldF9wbGF5aW5nID0gZnVuY3Rpb24gZ2V0X3BsYXlpbmcoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5wbGF5aW5nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXRfcmVhZHkgPSBmdW5jdGlvbiBzZXRfcmVhZHkodG8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLnJlYWR5ID0gdG87XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGdldF9yZWFkeSA9IGZ1bmN0aW9uIGdldF9yZWFkeSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLnJlYWR5O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcGxheWVyLm9uY2FucGxheXRocm91Z2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0X3JlYWR5KHRydWUpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgd2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIHZhciBlbmRfY3V0ID0gcGxheWVyLmR1cmF0aW9uICogMTAwMCAtIGVuZGxpbmU7IC8vIHRvZG86IG1vdmUgdGhpcyB0byBvbmUtdGltZSBvbiBwbGF5ZXIgbG9hZCwgdGhlbiBhZGQgbGF0Y2hpbmcgZm9yIGluaXRpYWxpemF0aW9uXG5cbiAgICAgICAgICAgICAgICBpZiAoZ2V0X3JlYWR5KCkgJiYgZ2V0X3BsYXlpbmcoKSAmJiAoIXN0YXJ0ZWQgfHwgcGVyZm9ybWFuY2Uubm93KCkgLSBsYXN0X3N0YW1wID4gZW5kX2N1dCkpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRUaW1lID0gb3B0aW9ucy5sb29wX29mcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsYXN0X3N0YW1wX29mcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGxhc3Rfc3RhbXAgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIucGxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXJzLnB1c2gocGxheWVyKSAtIDE7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gc291bmR0cmFjaztcbn0oKTtcblxuZXhwb3J0cy5zb3VuZHRyYWNrID0gc291bmR0cmFjazsiXX0=

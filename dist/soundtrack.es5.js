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

        var opts = options || {};

        this.loadtracks(opts.tracks);

        if (opts.autoplay !== undefined && opts.autoplay !== false) {

            this.playing = true;

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
            this.add_player(this.tracks[track]);
        }
    }, {
        key: 'playByName',
        value: function playByName(track) {
            console.log('todo should play ' + track + ' by name: ' + this.tracks[this.tracksByName[track]]);
        }
    }, {
        key: 'play',
        value: function play(track) {

            switch (typeof track === 'undefined' ? 'undefined' : _typeof(track)) {

                case 'number':
                    this.playByTrack(track);break;
                case 'string':
                    this.playByName(track);break;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L3NvdW5kdHJhY2suZXM1LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuJ3VzZSBzdHJpY3QnO1xuXG4vLyB0b2RvOiBpcyB0aGlzIGEgc21hcnRlciBob29rPyAgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYmF1ZGlvLyNhdWRpby1nbGl0Y2hpbmdcblxuLy8gdG9kbzogYWRkIGNhbGxiYWNrcyBmb3IgbG9vcCwgaGl0LXRpbWVcbi8vIHRvZG86IGFsbG93IGEgc29uZyB0byBlbmQgYnkgZ29pbmcgdG8gYSBkaWZmZXJlbnQgc29uZywgb3IgYSByYW5kb20gZnJvbSBhIGxpc3Qgb2Ygc29uZ3Ncbi8vIHRvZG86IGZhZGUtaW4sIGZhZGUtb3V0XG4vLyB0b2RvOiB0cmFuc2l0aW9uKHttb2RlOiBoYXJkL2ZhZGUtb3V0L2ZhZGUtb3V0LWluL2ZhZGUtY3Jvc3MsIGRlbGF5LCBvdXR0aW1lLCBpbnRpbWUsIHNoYXBlOiBsaW5lYXIvZWFzZX0pXG4vLyB0b2RvOiBwbGF5LCBzdG9wXG4vLyB0b2RvOiBpbmRpdmlkdWFsIHNvbmdzIGNhbiBvdmVycmlkZSBsb29wIG1hc3RlclxuLy8gdG9kbzogcmVtb3ZlIHRyYWNrbGlzdFxuLy8gdG9kbzogZ2V0dGVycyBhbmQgc2V0dGVyc1xuLy8gdG9kbzogdGVzdHNcbi8vIHRvZG86IGRvY3NcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gbm9ybWFsaXplX3RyYWNrKHRyYWNrKSB7XG5cbiAgICBzd2l0Y2ggKHR5cGVvZiB0cmFjayA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodHJhY2spKSB7XG5cbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcblxuICAgICAgICAgICAgaWYgKCF0cmFjay5uYW1lICYmICF0cmFjay5zcmMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyAnZXZlcnkgdHJhY2sgbXVzdCBoYXZlIGEgbmFtZSBvciBhIHNyYzogJyArIEpTT04uc3RyaW5naWZ5KHRyYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIF90cmFjayRuYW1lID0gdHJhY2submFtZTtcbiAgICAgICAgICAgIHZhciBuYW1lID0gX3RyYWNrJG5hbWUgPT09IHVuZGVmaW5lZCA/IHRyYWNrLnNyYyA6IF90cmFjayRuYW1lO1xuICAgICAgICAgICAgdmFyIF90cmFjayRzcmMgPSB0cmFjay5zcmM7XG4gICAgICAgICAgICB2YXIgc3JjID0gX3RyYWNrJHNyYyA9PT0gdW5kZWZpbmVkID8gdHJhY2submFtZSArICcubXAzJyA6IF90cmFjayRzcmM7XG4gICAgICAgICAgICB2YXIgX3RyYWNrJHN0YXJ0X29mcyA9IHRyYWNrLnN0YXJ0X29mcztcbiAgICAgICAgICAgIHZhciBzdGFydF9vZnMgPSBfdHJhY2skc3RhcnRfb2ZzID09PSB1bmRlZmluZWQgPyAwIDogX3RyYWNrJHN0YXJ0X29mcztcbiAgICAgICAgICAgIHZhciBfdHJhY2skZW5kX29mcyA9IHRyYWNrLmVuZF9vZnM7XG4gICAgICAgICAgICB2YXIgZW5kX29mcyA9IF90cmFjayRlbmRfb2ZzID09PSB1bmRlZmluZWQgPyAwIDogX3RyYWNrJGVuZF9vZnM7XG4gICAgICAgICAgICB2YXIgX3RyYWNrJGxvb3Bfb2ZzID0gdHJhY2subG9vcF9vZnM7XG4gICAgICAgICAgICB2YXIgbG9vcF9vZnMgPSBfdHJhY2skbG9vcF9vZnMgPT09IHVuZGVmaW5lZCA/IHRyYWNrLnN0YXJ0X29mcyB8fCAwIDogX3RyYWNrJGxvb3Bfb2ZzO1xuICAgICAgICAgICAgdmFyIF90cmFjayRsb29wID0gdHJhY2subG9vcDtcbiAgICAgICAgICAgIHZhciBsb29wID0gX3RyYWNrJGxvb3AgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfdHJhY2skbG9vcDtcblxuXG4gICAgICAgICAgICByZXR1cm4geyBuYW1lOiBuYW1lLCBzcmM6IHNyYywgc3RhcnRfb2ZzOiBzdGFydF9vZnMsIGVuZF9vZnM6IGVuZF9vZnMsIGxvb3Bfb2ZzOiBsb29wX29mcywgbG9vcDogbG9vcCB9O1xuXG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG5cbiAgICAgICAgICAgIHJldHVybiBub3JtYWxpemVfdHJhY2soeyBuYW1lOiB0cmFjayB9KTtcblxuICAgIH1cbn1cblxudmFyIHNvdW5kdHJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gc291bmR0cmFjayhvcHRpb25zKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBzb3VuZHRyYWNrKTtcblxuICAgICAgICB0aGlzLnBsYXllcnMgPSBbXTtcbiAgICAgICAgdGhpcy50cmFja3MgPSBbXTtcbiAgICAgICAgdGhpcy50cmFja3NCeU5hbWUgPSB7fTtcbiAgICAgICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcblxuICAgICAgICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgdGhpcy5sb2FkdHJhY2tzKG9wdHMudHJhY2tzKTtcblxuICAgICAgICBpZiAob3B0cy5hdXRvcGxheSAhPT0gdW5kZWZpbmVkICYmIG9wdHMuYXV0b3BsYXkgIT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIHRoaXMucGxheWluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoX3R5cGVvZihvcHRzLmF1dG9wbGF5KSkge1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXkob3B0cy5hdXRvcGxheSk7YnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5KDApO2JyZWFrO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3Moc291bmR0cmFjaywgW3tcbiAgICAgICAga2V5OiAncGxheUJ5VHJhY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGxheUJ5VHJhY2sodHJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuYWRkX3BsYXllcih0aGlzLnRyYWNrc1t0cmFja10pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwbGF5QnlOYW1lJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHBsYXlCeU5hbWUodHJhY2spIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0b2RvIHNob3VsZCBwbGF5ICcgKyB0cmFjayArICcgYnkgbmFtZTogJyArIHRoaXMudHJhY2tzW3RoaXMudHJhY2tzQnlOYW1lW3RyYWNrXV0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwbGF5JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHBsYXkodHJhY2spIHtcblxuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgdHJhY2sgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHRyYWNrKSkge1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5QnlUcmFjayh0cmFjayk7YnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5QnlOYW1lKHRyYWNrKTticmVhaztcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdsb2FkdHJhY2tzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGxvYWR0cmFja3ModHJhY2tzKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLnRyYWNrcyA9IHRoaXMudHJhY2tzLmNvbmNhdCh0cmFja3MubWFwKG5vcm1hbGl6ZV90cmFjaykgfHwgW10pO1xuXG4gICAgICAgICAgICB0aGlzLnRyYWNrcy5tYXAoZnVuY3Rpb24gKHRyYWNrLCBpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRyYWNrLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudHJhY2tzQnlOYW1lW3RyYWNrLm5hbWVdID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYWRkX3BsYXllcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRfcGxheWVyKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gbmV3IEF1ZGlvKG9wdGlvbnMuc3JjKSxcbiAgICAgICAgICAgICAgICBsYXN0X3N0YW1wID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGxhc3Rfc3RhbXBfb2ZzID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHN0YXJ0ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgcGxheWVyLmF1dG9wbGF5ID0gZmFsc2U7XG4gICAgICAgICAgICBwbGF5ZXIuY3VycmVudFRpbWUgPSBvcHRpb25zLnN0YXJ0X29mcyAvIDEwMDA7XG5cbiAgICAgICAgICAgIHZhciBlbmRsaW5lID0gb3B0aW9ucy5lbmRfb2ZzLFxuICAgICAgICAgICAgICAgIGdldF9wbGF5aW5nID0gZnVuY3Rpb24gZ2V0X3BsYXlpbmcoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5wbGF5aW5nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXRfcmVhZHkgPSBmdW5jdGlvbiBzZXRfcmVhZHkodG8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLnJlYWR5ID0gdG87XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGdldF9yZWFkeSA9IGZ1bmN0aW9uIGdldF9yZWFkeSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLnJlYWR5O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcGxheWVyLm9uY2FucGxheXRocm91Z2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0X3JlYWR5KHRydWUpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgd2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIHZhciBlbmRfY3V0ID0gcGxheWVyLmR1cmF0aW9uICogMTAwMCAtIGVuZGxpbmU7IC8vIHRvZG86IG1vdmUgdGhpcyB0byBvbmUtdGltZSBvbiBwbGF5ZXIgbG9hZCwgdGhlbiBhZGQgbGF0Y2hpbmcgZm9yIGluaXRpYWxpemF0aW9uXG5cbiAgICAgICAgICAgICAgICBpZiAoZ2V0X3JlYWR5KCkgJiYgZ2V0X3BsYXlpbmcoKSAmJiAoIXN0YXJ0ZWQgfHwgcGVyZm9ybWFuY2Uubm93KCkgLSBsYXN0X3N0YW1wID4gZW5kX2N1dCkpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRUaW1lID0gb3B0aW9ucy5sb29wX29mcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsYXN0X3N0YW1wX29mcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGxhc3Rfc3RhbXAgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIucGxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXJzLnB1c2gocGxheWVyKSAtIDE7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gc291bmR0cmFjaztcbn0oKTtcblxuZXhwb3J0cy5zb3VuZHRyYWNrID0gc291bmR0cmFjazsiXX0=

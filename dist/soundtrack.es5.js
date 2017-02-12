
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

        if (Array.isArray(options)) {
            options = { tracks: options };
        }

        this.players = [];
        this.tracks = [];
        this.tracksByName = {};
        this.playing = false;
        this.ready = false;
        this.current = undefined;

        var opts = options || { tracks: [] };

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
exports.normalize_track = normalize_track;
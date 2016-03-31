require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"soundtrack":[function(require,module,exports){

'use strict';

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
      var loop_ofs = _track$loop_ofs === undefined ? 0 : _track$loop_ofs;
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

      var player = new Audio(options.src);
      player.autoplay = true; // todo
      player.currentTime = options.start_ofs;

      if (options.loop) {

        // if we're using offset controls, manage the loop manually
        if (options.end_ofs || options.loop_ofs) {

          var endline = options.end_ofs / 1000;

          // todo: one that runs differently w/o end_ofs to get perfect endcuts
          window.setInterval(function () {

            var end_cut = player.duration - endline; // because that music might come in whenever, and this is less hassle than hooking the event

            console.log((player.currentTime - end_cut).toPrecision(7));

            if (player.currentTime > end_cut) {
              player.currentTime = options.loop_ofs;
              player.play();
            }
          }, 1);

          // otherwise just use the browser looper
        } else {
            player.loop = true;
          }
      }

      return this.players.push(player) - 1;
    }
  }]);

  return soundtrack;
}();

exports.soundtrack = soundtrack;
},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L3NvdW5kdHJhY2suZXM1LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBub3JtYWxpemVfdHJhY2sodHJhY2spIHtcblxuICBzd2l0Y2ggKHR5cGVvZiB0cmFjayA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodHJhY2spKSB7XG5cbiAgICBjYXNlICdvYmplY3QnOlxuXG4gICAgICBpZiAoIXRyYWNrLm5hbWUgJiYgIXRyYWNrLnNyYykge1xuICAgICAgICB0aHJvdyAnZXZlcnkgdHJhY2sgbXVzdCBoYXZlIGEgbmFtZSBvciBhIHNyYzogJyArIEpTT04uc3RyaW5naWZ5KHRyYWNrKTtcbiAgICAgIH1cblxuICAgICAgdmFyIF90cmFjayRuYW1lID0gdHJhY2submFtZTtcbiAgICAgIHZhciBuYW1lID0gX3RyYWNrJG5hbWUgPT09IHVuZGVmaW5lZCA/IHRyYWNrLnNyYyA6IF90cmFjayRuYW1lO1xuICAgICAgdmFyIF90cmFjayRzcmMgPSB0cmFjay5zcmM7XG4gICAgICB2YXIgc3JjID0gX3RyYWNrJHNyYyA9PT0gdW5kZWZpbmVkID8gdHJhY2submFtZSArICcubXAzJyA6IF90cmFjayRzcmM7XG4gICAgICB2YXIgX3RyYWNrJHN0YXJ0X29mcyA9IHRyYWNrLnN0YXJ0X29mcztcbiAgICAgIHZhciBzdGFydF9vZnMgPSBfdHJhY2skc3RhcnRfb2ZzID09PSB1bmRlZmluZWQgPyAwIDogX3RyYWNrJHN0YXJ0X29mcztcbiAgICAgIHZhciBfdHJhY2skZW5kX29mcyA9IHRyYWNrLmVuZF9vZnM7XG4gICAgICB2YXIgZW5kX29mcyA9IF90cmFjayRlbmRfb2ZzID09PSB1bmRlZmluZWQgPyAwIDogX3RyYWNrJGVuZF9vZnM7XG4gICAgICB2YXIgX3RyYWNrJGxvb3Bfb2ZzID0gdHJhY2subG9vcF9vZnM7XG4gICAgICB2YXIgbG9vcF9vZnMgPSBfdHJhY2skbG9vcF9vZnMgPT09IHVuZGVmaW5lZCA/IDAgOiBfdHJhY2skbG9vcF9vZnM7XG4gICAgICB2YXIgX3RyYWNrJGxvb3AgPSB0cmFjay5sb29wO1xuICAgICAgdmFyIGxvb3AgPSBfdHJhY2skbG9vcCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF90cmFjayRsb29wO1xuXG5cbiAgICAgIHJldHVybiB7IG5hbWU6IG5hbWUsIHNyYzogc3JjLCBzdGFydF9vZnM6IHN0YXJ0X29mcywgZW5kX29mczogZW5kX29mcywgbG9vcF9vZnM6IGxvb3Bfb2ZzLCBsb29wOiBsb29wIH07XG5cbiAgICBjYXNlICdzdHJpbmcnOlxuXG4gICAgICByZXR1cm4gbm9ybWFsaXplX3RyYWNrKHsgbmFtZTogdHJhY2sgfSk7XG5cbiAgfVxufVxuXG52YXIgc291bmR0cmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc291bmR0cmFjayhvcHRpb25zKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIHNvdW5kdHJhY2spO1xuXG4gICAgdGhpcy5wbGF5ZXJzID0gW107XG4gICAgdGhpcy50cmFja3MgPSBbXTtcbiAgICB0aGlzLnRyYWNrc0J5TmFtZSA9IHt9O1xuXG4gICAgdmFyIG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgdGhpcy5sb2FkdHJhY2tzKG9wdHMudHJhY2tzKTtcblxuICAgIGlmIChvcHRzLmF1dG9wbGF5ICE9PSB1bmRlZmluZWQgJiYgb3B0cy5hdXRvcGxheSAhPT0gZmFsc2UpIHtcblxuICAgICAgc3dpdGNoIChfdHlwZW9mKG9wdHMuYXV0b3BsYXkpKSB7XG5cbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICB0aGlzLnBsYXkob3B0cy5hdXRvcGxheSk7YnJlYWs7XG5cbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgdGhpcy5wbGF5KDApO2JyZWFrO1xuXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKHNvdW5kdHJhY2ssIFt7XG4gICAga2V5OiAncGxheUJ5VHJhY2snLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwbGF5QnlUcmFjayh0cmFjaykge1xuICAgICAgdGhpcy5hZGRfcGxheWVyKHRoaXMudHJhY2tzW3RyYWNrXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncGxheUJ5TmFtZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBsYXlCeU5hbWUodHJhY2spIHtcbiAgICAgIGNvbnNvbGUubG9nKCd0b2RvIHNob3VsZCBwbGF5ICcgKyB0cmFjayArICcgYnkgbmFtZTogJyArIHRoaXMudHJhY2tzW3RoaXMudHJhY2tzQnlOYW1lW3RyYWNrXV0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3BsYXknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwbGF5KHRyYWNrKSB7XG5cbiAgICAgIHN3aXRjaCAodHlwZW9mIHRyYWNrID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih0cmFjaykpIHtcblxuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgIHRoaXMucGxheUJ5VHJhY2sodHJhY2spO2JyZWFrO1xuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgIHRoaXMucGxheUJ5TmFtZSh0cmFjayk7YnJlYWs7XG5cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdsb2FkdHJhY2tzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbG9hZHRyYWNrcyh0cmFja3MpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHRoaXMudHJhY2tzID0gdGhpcy50cmFja3MuY29uY2F0KHRyYWNrcy5tYXAobm9ybWFsaXplX3RyYWNrKSB8fCBbXSk7XG5cbiAgICAgIHRoaXMudHJhY2tzLm1hcChmdW5jdGlvbiAodHJhY2ssIGkpIHtcbiAgICAgICAgaWYgKHRyYWNrLm5hbWUpIHtcbiAgICAgICAgICBfdGhpcy50cmFja3NCeU5hbWVbdHJhY2submFtZV0gPSBpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdhZGRfcGxheWVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkX3BsYXllcihvcHRpb25zKSB7XG5cbiAgICAgIHZhciBwbGF5ZXIgPSBuZXcgQXVkaW8ob3B0aW9ucy5zcmMpO1xuICAgICAgcGxheWVyLmF1dG9wbGF5ID0gdHJ1ZTsgLy8gdG9kb1xuICAgICAgcGxheWVyLmN1cnJlbnRUaW1lID0gb3B0aW9ucy5zdGFydF9vZnM7XG5cbiAgICAgIGlmIChvcHRpb25zLmxvb3ApIHtcblxuICAgICAgICAvLyBpZiB3ZSdyZSB1c2luZyBvZmZzZXQgY29udHJvbHMsIG1hbmFnZSB0aGUgbG9vcCBtYW51YWxseVxuICAgICAgICBpZiAob3B0aW9ucy5lbmRfb2ZzIHx8IG9wdGlvbnMubG9vcF9vZnMpIHtcblxuICAgICAgICAgIHZhciBlbmRsaW5lID0gb3B0aW9ucy5lbmRfb2ZzIC8gMTAwMDtcblxuICAgICAgICAgIC8vIHRvZG86IG9uZSB0aGF0IHJ1bnMgZGlmZmVyZW50bHkgdy9vIGVuZF9vZnMgdG8gZ2V0IHBlcmZlY3QgZW5kY3V0c1xuICAgICAgICAgIHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHZhciBlbmRfY3V0ID0gcGxheWVyLmR1cmF0aW9uIC0gZW5kbGluZTsgLy8gYmVjYXVzZSB0aGF0IG11c2ljIG1pZ2h0IGNvbWUgaW4gd2hlbmV2ZXIsIGFuZCB0aGlzIGlzIGxlc3MgaGFzc2xlIHRoYW4gaG9va2luZyB0aGUgZXZlbnRcblxuICAgICAgICAgICAgY29uc29sZS5sb2coKHBsYXllci5jdXJyZW50VGltZSAtIGVuZF9jdXQpLnRvUHJlY2lzaW9uKDcpKTtcblxuICAgICAgICAgICAgaWYgKHBsYXllci5jdXJyZW50VGltZSA+IGVuZF9jdXQpIHtcbiAgICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRUaW1lID0gb3B0aW9ucy5sb29wX29mcztcbiAgICAgICAgICAgICAgcGxheWVyLnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAxKTtcblxuICAgICAgICAgIC8vIG90aGVyd2lzZSBqdXN0IHVzZSB0aGUgYnJvd3NlciBsb29wZXJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBsYXllci5sb29wID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnBsYXllcnMucHVzaChwbGF5ZXIpIC0gMTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gc291bmR0cmFjaztcbn0oKTtcblxuZXhwb3J0cy5zb3VuZHRyYWNrID0gc291bmR0cmFjazsiXX0=

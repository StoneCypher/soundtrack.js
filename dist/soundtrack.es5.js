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

      var player = new Audio(options.src),
          last_stamp = undefined,
          last_stamp_ofs = undefined,
          started = false;

      player.autoplay = false; // todo
      player.currentTime = options.start_ofs;

      if (options.loop) {

        // if we're using offset controls, manage the loop manually
        if (options.end_ofs || options.loop_ofs) {

          var endline = options.end_ofs;

          // todo: one that runs differently w/o end_ofs to get perfect endcuts
          window.setInterval(function () {

            var end_cut = player.duration * 1000 - endline; // because that music might come in whenever, and this is less hassle than hooking the event

            console.log('performance now - laststamp : ' + (end_cut - (performance.now() - last_stamp)).toPrecision(9));

            if (!started || performance.now() - last_stamp > end_cut) {
              started = true;
              player.currentTime = options.loop_ofs;
              last_stamp_ofs = 0;
              last_stamp = performance.now();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L3NvdW5kdHJhY2suZXM1LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZV90cmFjayh0cmFjaykge1xuXG4gIHN3aXRjaCAodHlwZW9mIHRyYWNrID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih0cmFjaykpIHtcblxuICAgIGNhc2UgJ29iamVjdCc6XG5cbiAgICAgIGlmICghdHJhY2submFtZSAmJiAhdHJhY2suc3JjKSB7XG4gICAgICAgIHRocm93ICdldmVyeSB0cmFjayBtdXN0IGhhdmUgYSBuYW1lIG9yIGEgc3JjOiAnICsgSlNPTi5zdHJpbmdpZnkodHJhY2spO1xuICAgICAgfVxuXG4gICAgICB2YXIgX3RyYWNrJG5hbWUgPSB0cmFjay5uYW1lO1xuICAgICAgdmFyIG5hbWUgPSBfdHJhY2skbmFtZSA9PT0gdW5kZWZpbmVkID8gdHJhY2suc3JjIDogX3RyYWNrJG5hbWU7XG4gICAgICB2YXIgX3RyYWNrJHNyYyA9IHRyYWNrLnNyYztcbiAgICAgIHZhciBzcmMgPSBfdHJhY2skc3JjID09PSB1bmRlZmluZWQgPyB0cmFjay5uYW1lICsgJy5tcDMnIDogX3RyYWNrJHNyYztcbiAgICAgIHZhciBfdHJhY2skc3RhcnRfb2ZzID0gdHJhY2suc3RhcnRfb2ZzO1xuICAgICAgdmFyIHN0YXJ0X29mcyA9IF90cmFjayRzdGFydF9vZnMgPT09IHVuZGVmaW5lZCA/IDAgOiBfdHJhY2skc3RhcnRfb2ZzO1xuICAgICAgdmFyIF90cmFjayRlbmRfb2ZzID0gdHJhY2suZW5kX29mcztcbiAgICAgIHZhciBlbmRfb2ZzID0gX3RyYWNrJGVuZF9vZnMgPT09IHVuZGVmaW5lZCA/IDAgOiBfdHJhY2skZW5kX29mcztcbiAgICAgIHZhciBfdHJhY2skbG9vcF9vZnMgPSB0cmFjay5sb29wX29mcztcbiAgICAgIHZhciBsb29wX29mcyA9IF90cmFjayRsb29wX29mcyA9PT0gdW5kZWZpbmVkID8gMCA6IF90cmFjayRsb29wX29mcztcbiAgICAgIHZhciBfdHJhY2skbG9vcCA9IHRyYWNrLmxvb3A7XG4gICAgICB2YXIgbG9vcCA9IF90cmFjayRsb29wID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3RyYWNrJGxvb3A7XG5cblxuICAgICAgcmV0dXJuIHsgbmFtZTogbmFtZSwgc3JjOiBzcmMsIHN0YXJ0X29mczogc3RhcnRfb2ZzLCBlbmRfb2ZzOiBlbmRfb2ZzLCBsb29wX29mczogbG9vcF9vZnMsIGxvb3A6IGxvb3AgfTtcblxuICAgIGNhc2UgJ3N0cmluZyc6XG5cbiAgICAgIHJldHVybiBub3JtYWxpemVfdHJhY2soeyBuYW1lOiB0cmFjayB9KTtcblxuICB9XG59XG5cbnZhciBzb3VuZHRyYWNrID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzb3VuZHRyYWNrKG9wdGlvbnMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgc291bmR0cmFjayk7XG5cbiAgICB0aGlzLnBsYXllcnMgPSBbXTtcbiAgICB0aGlzLnRyYWNrcyA9IFtdO1xuICAgIHRoaXMudHJhY2tzQnlOYW1lID0ge307XG5cbiAgICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB0aGlzLmxvYWR0cmFja3Mob3B0cy50cmFja3MpO1xuXG4gICAgaWYgKG9wdHMuYXV0b3BsYXkgIT09IHVuZGVmaW5lZCAmJiBvcHRzLmF1dG9wbGF5ICE9PSBmYWxzZSkge1xuXG4gICAgICBzd2l0Y2ggKF90eXBlb2Yob3B0cy5hdXRvcGxheSkpIHtcblxuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgIHRoaXMucGxheShvcHRzLmF1dG9wbGF5KTticmVhaztcblxuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICB0aGlzLnBsYXkoMCk7YnJlYWs7XG5cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfY3JlYXRlQ2xhc3Moc291bmR0cmFjaywgW3tcbiAgICBrZXk6ICdwbGF5QnlUcmFjaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBsYXlCeVRyYWNrKHRyYWNrKSB7XG4gICAgICB0aGlzLmFkZF9wbGF5ZXIodGhpcy50cmFja3NbdHJhY2tdKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdwbGF5QnlOYW1lJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGxheUJ5TmFtZSh0cmFjaykge1xuICAgICAgY29uc29sZS5sb2coJ3RvZG8gc2hvdWxkIHBsYXkgJyArIHRyYWNrICsgJyBieSBuYW1lOiAnICsgdGhpcy50cmFja3NbdGhpcy50cmFja3NCeU5hbWVbdHJhY2tdXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncGxheScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBsYXkodHJhY2spIHtcblxuICAgICAgc3dpdGNoICh0eXBlb2YgdHJhY2sgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHRyYWNrKSkge1xuXG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgdGhpcy5wbGF5QnlUcmFjayh0cmFjayk7YnJlYWs7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgdGhpcy5wbGF5QnlOYW1lKHRyYWNrKTticmVhaztcblxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2xvYWR0cmFja3MnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkdHJhY2tzKHRyYWNrcykge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdGhpcy50cmFja3MgPSB0aGlzLnRyYWNrcy5jb25jYXQodHJhY2tzLm1hcChub3JtYWxpemVfdHJhY2spIHx8IFtdKTtcblxuICAgICAgdGhpcy50cmFja3MubWFwKGZ1bmN0aW9uICh0cmFjaywgaSkge1xuICAgICAgICBpZiAodHJhY2submFtZSkge1xuICAgICAgICAgIF90aGlzLnRyYWNrc0J5TmFtZVt0cmFjay5uYW1lXSA9IGk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2FkZF9wbGF5ZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRfcGxheWVyKG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHBsYXllciA9IG5ldyBBdWRpbyhvcHRpb25zLnNyYyksXG4gICAgICAgICAgbGFzdF9zdGFtcCA9IHVuZGVmaW5lZCxcbiAgICAgICAgICBsYXN0X3N0YW1wX29mcyA9IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdGFydGVkID0gZmFsc2U7XG5cbiAgICAgIHBsYXllci5hdXRvcGxheSA9IGZhbHNlOyAvLyB0b2RvXG4gICAgICBwbGF5ZXIuY3VycmVudFRpbWUgPSBvcHRpb25zLnN0YXJ0X29mcztcblxuICAgICAgaWYgKG9wdGlvbnMubG9vcCkge1xuXG4gICAgICAgIC8vIGlmIHdlJ3JlIHVzaW5nIG9mZnNldCBjb250cm9scywgbWFuYWdlIHRoZSBsb29wIG1hbnVhbGx5XG4gICAgICAgIGlmIChvcHRpb25zLmVuZF9vZnMgfHwgb3B0aW9ucy5sb29wX29mcykge1xuXG4gICAgICAgICAgdmFyIGVuZGxpbmUgPSBvcHRpb25zLmVuZF9vZnM7XG5cbiAgICAgICAgICAvLyB0b2RvOiBvbmUgdGhhdCBydW5zIGRpZmZlcmVudGx5IHcvbyBlbmRfb2ZzIHRvIGdldCBwZXJmZWN0IGVuZGN1dHNcbiAgICAgICAgICB3aW5kb3cuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgZW5kX2N1dCA9IHBsYXllci5kdXJhdGlvbiAqIDEwMDAgLSBlbmRsaW5lOyAvLyBiZWNhdXNlIHRoYXQgbXVzaWMgbWlnaHQgY29tZSBpbiB3aGVuZXZlciwgYW5kIHRoaXMgaXMgbGVzcyBoYXNzbGUgdGhhbiBob29raW5nIHRoZSBldmVudFxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGVyZm9ybWFuY2Ugbm93IC0gbGFzdHN0YW1wIDogJyArIChlbmRfY3V0IC0gKHBlcmZvcm1hbmNlLm5vdygpIC0gbGFzdF9zdGFtcCkpLnRvUHJlY2lzaW9uKDkpKTtcblxuICAgICAgICAgICAgaWYgKCFzdGFydGVkIHx8IHBlcmZvcm1hbmNlLm5vdygpIC0gbGFzdF9zdGFtcCA+IGVuZF9jdXQpIHtcbiAgICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHBsYXllci5jdXJyZW50VGltZSA9IG9wdGlvbnMubG9vcF9vZnM7XG4gICAgICAgICAgICAgIGxhc3Rfc3RhbXBfb2ZzID0gMDtcbiAgICAgICAgICAgICAgbGFzdF9zdGFtcCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgICBwbGF5ZXIucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDEpO1xuXG4gICAgICAgICAgLy8gb3RoZXJ3aXNlIGp1c3QgdXNlIHRoZSBicm93c2VyIGxvb3BlclxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGxheWVyLmxvb3AgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucGxheWVycy5wdXNoKHBsYXllcikgLSAxO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBzb3VuZHRyYWNrO1xufSgpO1xuXG5leHBvcnRzLnNvdW5kdHJhY2sgPSBzb3VuZHRyYWNrOyJdfQ==

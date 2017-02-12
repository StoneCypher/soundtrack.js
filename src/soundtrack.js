
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





function normalize_track(track) {

  switch(typeof track) {

    case 'object' :

      if ( (!(track.name)) && (!(track.src)) ) {
        throw 'every track must have a name or a src: ' + JSON.stringify(track);
      }

      var {
        name      = track.src,
        src       = track.name + '.mp3',
        start_ofs = 0,
        end_ofs   = 0,
        loop_ofs  = track.start_ofs || 0,
        loop      = true
      } = track;

      return { name, src, start_ofs, end_ofs, loop_ofs, loop };

    case 'string' :

      return normalize_track({ name: track });

  }

}





class soundtrack {



  constructor(options) {

    if (Array.isArray(options)) {
        options = { tracks: options };
    }

    this.players      = [];
    this.tracks       = [];
    this.tracksByName = {};
    this.playing      = false;
    this.ready        = false;
    this.current      = undefined;

    var opts = options || { tracks: [] };

    this.loadtracks(opts.tracks);

    if ((opts.autoplay !== undefined) && (opts.autoplay !== false)) {

      switch(typeof opts.autoplay) {

        case 'number' :
        case 'string'  : this.play(opts.autoplay); break;

        case 'boolean' : this.play(0);             break;

      }

    }

  }



  playByTrack(track) {
    this.playing = true;
    if (this.current !== undefined) { this.players[this.current].pause(); }
    return this.current = this.add_player(this.tracks[track]);
  }

  playByName(track) {
    this.playing = true;
    if (this.current !== undefined) { this.players[this.current].pause(); }
    return this.current = this.add_player(this.tracks[this.tracksByName[track]]);
  }



  play(track) {

    switch(typeof track) {

      case 'number' : return this.playByTrack(track); break;
      case 'string' : return this.playByName(track);  break;

    }

  }



  loadtracks(tracks) {

    this.tracks = this.tracks.concat(tracks.map(normalize_track) || []);

    this.tracks.map( (track,i) => {
        if (track.name) { this.tracksByName[track.name] = i; }
    });

  }



  add_player(options) {

    var player             = new Audio(options.src),
        last_stamp         = undefined,
        last_stamp_ofs     = undefined,
        started            = false;


    player.autoplay    = false;
    player.currentTime = options.start_ofs / 1000;

    var endline     = (options.end_ofs),
        get_playing = () => this.playing,
        set_ready   = to => this.ready = to,
        get_ready   = () => this.ready;

    player.oncanplaythrough = function() { set_ready(true); }


    window.setInterval(function() {

      var end_cut = (player.duration * 1000) - endline;  // todo: move this to one-time on player load, then add latching for initialization

      if ( get_ready() && get_playing() && ( (!started) || ((performance.now() - last_stamp) > end_cut) ) ) {

        if (started) { player.currentTime = options.loop_ofs; }

        started            = true;
        last_stamp_ofs     = 0;
        last_stamp         = performance.now();

        player.play();

      }

    }, 1);

    return this.players.push(player) - 1;

  }



}





export { soundtrack, normalize_track };

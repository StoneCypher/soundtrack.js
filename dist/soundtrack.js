
'use strict';






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
        loop_ofs  = 0,
        loop      = true
      } = track;

      return { name, src, start_ofs, end_ofs, loop_ofs, loop };

    case 'string' : 

      return normalize_track({ name: track });

  }

}





class soundtrack {



  constructor(options) {

    this.players      = [];
    this.tracks       = [];
    this.tracksByName = {};

    var opts = options || {};

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
    this.add_player(this.tracks[track]);
  }

  playByName(track) {
    console.log(`todo should play ${track} by name: ${this.tracks[this.tracksByName[track]]}`);
  }



  play(track) {

    switch(typeof track) {

      case 'number' : this.playByTrack(track); break;
      case 'string' : this.playByName(track);  break;

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

    player.autoplay    = false; // todo
    player.currentTime = options.start_ofs;


    if (options.loop) {

      // if we're using offset controls, manage the loop manually
      if ((options.end_ofs) || (options.loop_ofs)) {

        var endline = (options.end_ofs);

        // todo: one that runs differently w/o end_ofs to get perfect endcuts
        window.setInterval(function() {

          var end_cut = (player.duration * 1000) - endline;  // because that music might come in whenever, and this is less hassle than hooking the event

          console.log(`performance now - laststamp : ${(end_cut - (performance.now() - last_stamp)).toPrecision(9)}`);

          if ( (!started) || ((performance.now() - last_stamp) > end_cut) ) {
            started            = true;
            player.currentTime = options.loop_ofs;
            last_stamp_ofs     = 0;
            last_stamp         = performance.now();
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



}

export {soundtrack};

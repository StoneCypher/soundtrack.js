
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





type TrackDefinition = {

  name           : string,
  src          ? : string  | undefined,
  start_offset ? : number  | undefined,
  end_offset   ? : number  | undefined,
  loop_offset  ? : number  | undefined,
  loop         ? : boolean | undefined

};





type TrackDefsOrNames = (TrackDefinition | string)[];





type ConstructorOptions = {

  autoplay ? : boolean | string | number | undefined,
  tracks     : TrackDefsOrNames

};





class Soundtrack {



  #tracks         : TrackDefinition[];
  #tracks_by_name : Map<string, number>;

  #ready          : boolean;
  #playing        : boolean;
  #paused         : boolean;
  #current        : number | undefined;

  #players        : HTMLAudioElement[];



  constructor(options? : ConstructorOptions) {

    this.#players        = [];
    this.#tracks         = [];
    this.#tracks_by_name = new Map();
    this.#playing        = false;
    this.#paused         = false;
    this.#ready          = false;
    this.#current        = undefined;


    let opts: ConstructorOptions = options || { tracks: [], autoplay: false };

    if (opts.tracks === undefined) {
      opts.tracks = [];
    }

    this.load_tracks(opts.tracks);


    // if the autoplay value isn't amongst [undefined, false]
    if (! ( ([undefined, false] as any[]).includes(opts.autoplay)) ) {

      switch(typeof opts.autoplay) {

        // autoplay can name a specific track to autoplay
        case 'number' :
        case 'string' :
          this.play(opts.autoplay);
          break;

        // or it can just be "true," which plays track zero
        case 'boolean' :
          this.play(0);
          break;

      }

    }


  }





  play_by_track_number(track_number: number) {

    this.#playing = true;

    if (this.#current !== undefined) {

      const this_player = this.#players[this.#current];

      // typescript needs this test, but the branch is unreachable because the test is meaningless
      /* v8 ignore next 3 */
      if (this_player === undefined) {
        throw new Error(`Player ${this_player}, referred to as current, does not exist`)
      }

      this_player.pause();

    }

    const player = this.#players[track_number];

    if (player === undefined) {
      throw new Error(`No such track number ${track_number}`);
    } else {
      player.play();
    }

    return this.#current = track_number;

  }





  play_by_name(track: string) {

    const track_num = this.name_to_track_number(track);

    if (track_num === undefined) {
      throw new Error(`No such track by name: ${track}`);
    }

    return this.play_by_track_number(track_num);

  }





  play(track: number | string) {

    switch(typeof track) {

      case 'number':
        return this.play_by_track_number(track);

      case 'string':
        return this.play_by_name(track);

      // typescript needs this test, but the branch is unreachable because the test is meaningless
      /* v8 ignore next 2 */
      default:
        throw new Error('Attempted to play an unknown type; requires a string or a number');

    }

  }





  stop() {

    const track = this.current_track;

    // typescript needs this test, but the branch is unreachable because the test is meaningless
    /* v8 ignore next 3 */
    if (track === undefined) {
      return;
    }

    const player = this.#players[track];

    // typescript needs this test, but the branch is unreachable because the test is meaningless
    /* v8 ignore next 3 */
    if (player === undefined) {
      throw new Error(`Can't stop: indicated player #${this.current_track} doesn't exist`);
    }

    player.pause();
    player.currentTime = 0;

    this.#playing = false;
    this.#paused  = false;
    this.#current = undefined;

  }





  pause() {

    const track = this.current_track;

    // typescript needs this test, but the branch is unreachable because the test is meaningless
    /* v8 ignore next 3 */
    if (track === undefined) {
      return;
    }

    const player = this.#players[track];

    // typescript needs this test, but the branch is unreachable because the test is meaningless
    /* v8 ignore next 3 */
    if (player === undefined) {
      throw new Error(`Can't stop: indicated player #${this.current_track} doesn't exist`);
    }

    if (this.#paused) {

      player.play();
      this.#paused = false;

    } else {

      player.pause();
      this.#paused = true;

    }

  }





  seek(to_where: number) {

    // there's no sense testing browser features
    /* v8 ignore next 13 */
    const track = this.current_track;

    if (track === undefined) {
      return;
    }

    const player = this.#players[track];

    if (player === undefined) {
      throw new Error(`Can't stop: indicated player #${this.current_track} doesn't exist`);
    }

    player.currentTime = to_where;

  }





  // fade out
  // fade switch
  // play variant with fade in





  load_tracks(tracks: TrackDefsOrNames) {

    // scan once for problems before making changes
    tracks
      .map( this.normalize_track )
      .forEach( (t: TrackDefinition) => {
        if (this.has_track(t.name)) {
          throw new Error(`One or more of the listed tracks is already present: ${t}`);
        }
      }
    );

    // scan again to make changes
    tracks.forEach(t => {

      const norm    = this.normalize_track(t),
            new_idx = this.#tracks.push(norm) - 1;

      this.#tracks_by_name.set(norm.name, new_idx);
      this.#add_player(norm);

    });

  }





  name_to_track_number(name: string) {
    return this.#tracks_by_name.get(name);
  }





  has_track(name: string) {
    return this.#tracks_by_name.has(name);
  }





  get is_playing() {
    return this.#playing;
  }





  get is_paused() {
    return this.#paused;
  }





  get is_ready() {
    return this.#ready;
  }





  get current_track() {
    return this.#current;
  }





  #add_player(options: TrackDefinition) {

    let player               = new Audio(options.src),
        last_stamp : number  = 0,
        started    : boolean = false;


    player.autoplay    = false;

    // typescript needs this test, but the branch is unreachable because the test is meaningless
    /* v8 ignore next 1 */
    player.currentTime = (options.start_offset ?? 0) / 1000;

    let endline   = (options.end_offset),
        // v8 wants coverage of lambdas, but they're impractical to test
        /* v8 ignore next 1 */
        set_ready = (to: boolean) => this.#ready = to;

    // no Audio object, just a shim, so this won't get fired
    /* v8 ignore next 1 */
    player.oncanplaythrough = function() { set_ready(true); }

    const host = this;


    setInterval( () => {

      // typescript needs this test, but the branch is unreachable because the test is meaningless
      /* v8 ignore next 1 */
      let end_cut: number = (player.duration * 1000) - (endline ?? 0);  // todo: move this to one-time on player load, then add latching for initialization

      // testing the implementation of file timing is beyond the scope of this test set
      /* v8 ignore next 18 */
      if ( host.is_ready
        && host.is_playing
        && (
             (!started)
             || ((performance.now() - last_stamp) > end_cut)
           )
        ) {

        if (started) {
          player.currentTime = (options.loop_offset ?? 0);
        }

        started    = true;
        last_stamp = performance.now();

        player.play();

      }

    }, 1);


    return this.#players.push(player) - 1;

  }





  normalize_track(track: TrackDefinition | string): TrackDefinition {

    const u_track = (typeof track === 'object')? track : ({ name: track });

    if (!(u_track.name)) {
      throw new Error(`New track definition missing name in normalize_track/1: ${JSON.stringify(u_track)}`);
    }

    let name         = u_track.name,
        src          = u_track.src          ?? (u_track.name + '.mp3'),
        start_offset = u_track.start_offset ?? 0,
        end_offset   = u_track.end_offset   ?? 0,
        loop_offset  = u_track.loop_offset  ?? 0,
        loop         = u_track.loop         ?? true;

    return { name, src, start_offset, end_offset, loop_offset, loop };

  }



}





export { Soundtrack };

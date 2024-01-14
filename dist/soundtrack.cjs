"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _Soundtrack_instances,_Soundtrack_tracks,_Soundtrack_tracks_by_name,_Soundtrack_ready,_Soundtrack_playing,_Soundtrack_paused,_Soundtrack_current,_Soundtrack_players,_Soundtrack_add_player,commonjsGlobal="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},typescript={},__classPrivateFieldSet=commonjsGlobal&&commonjsGlobal.__classPrivateFieldSet||function(receiver,state,value,kind,f){if("m"===kind)throw new TypeError("Private method is not writable");if("a"===kind&&!f)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof state?receiver!==state||!f:!state.has(receiver))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===kind?f.call(receiver,value):f?f.value=value:state.set(receiver,value),value},__classPrivateFieldGet=commonjsGlobal&&commonjsGlobal.__classPrivateFieldGet||function(receiver,state,kind,f){if("a"===kind&&!f)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof state?receiver!==state||!f:!state.has(receiver))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===kind?f:"a"===kind?f.call(receiver):f?f.value:state.get(receiver)};Object.defineProperty(typescript,"__esModule",{value:!0}),exports.Soundtrack=typescript.Soundtrack=void 0;class Soundtrack{constructor(options){_Soundtrack_instances.add(this),_Soundtrack_tracks.set(this,void 0),_Soundtrack_tracks_by_name.set(this,void 0),_Soundtrack_ready.set(this,void 0),_Soundtrack_playing.set(this,void 0),_Soundtrack_paused.set(this,void 0),_Soundtrack_current.set(this,void 0),_Soundtrack_players.set(this,void 0),__classPrivateFieldSet(this,_Soundtrack_players,[],"f"),__classPrivateFieldSet(this,_Soundtrack_tracks,[],"f"),__classPrivateFieldSet(this,_Soundtrack_tracks_by_name,new Map,"f"),__classPrivateFieldSet(this,_Soundtrack_playing,!1,"f"),__classPrivateFieldSet(this,_Soundtrack_paused,!1,"f"),__classPrivateFieldSet(this,_Soundtrack_ready,!1,"f"),__classPrivateFieldSet(this,_Soundtrack_current,void 0,"f");let opts=options||{tracks:[],autoplay:!1};if(this.load_tracks(opts.tracks),![void 0,!1].includes(opts.autoplay))switch(typeof opts.autoplay){case"number":case"string":this.play(opts.autoplay);break;case"boolean":this.play(0)}}play_by_track_number(track_number){if(__classPrivateFieldSet(this,_Soundtrack_playing,!0,"f"),void 0!==__classPrivateFieldGet(this,_Soundtrack_current,"f")){const this_player=__classPrivateFieldGet(this,_Soundtrack_players,"f")[__classPrivateFieldGet(this,_Soundtrack_current,"f")];if(void 0===this_player)throw new Error(`Player ${this_player}, referred to as current, does not exist`);this_player.pause()}const player=__classPrivateFieldGet(this,_Soundtrack_players,"f")[track_number];if(void 0===player)throw new Error(`No such track number ${track_number}`);return player.play(),__classPrivateFieldSet(this,_Soundtrack_current,track_number,"f")}play_by_name(track){const track_num=this.name_to_track_number(track);if(void 0===track_num)throw new Error(`No such track by name: ${track}`);return this.play_by_track_number(track_num)}play(track){switch(typeof track){case"number":return this.play_by_track_number(track);case"string":return this.play_by_name(track);default:throw new Error("Attempted to play an unknown type; requires a string or a number")}}stop(){const track=this.current_track;if(void 0===track)return;const player=__classPrivateFieldGet(this,_Soundtrack_players,"f")[track];if(void 0===player)throw new Error(`Can't stop: indicated player #${this.current_track} doesn't exist`);player.pause(),player.currentTime=0,__classPrivateFieldSet(this,_Soundtrack_playing,!1,"f"),__classPrivateFieldSet(this,_Soundtrack_paused,!1,"f"),__classPrivateFieldSet(this,_Soundtrack_current,void 0,"f")}pause(){const track=this.current_track;if(void 0===track)return;const player=__classPrivateFieldGet(this,_Soundtrack_players,"f")[track];if(void 0===player)throw new Error(`Can't stop: indicated player #${this.current_track} doesn't exist`);__classPrivateFieldGet(this,_Soundtrack_paused,"f")?(player.play(),__classPrivateFieldSet(this,_Soundtrack_paused,!1,"f")):(player.pause(),__classPrivateFieldSet(this,_Soundtrack_paused,!0,"f"))}seek(to_where){const track=this.current_track;if(void 0===track)return;const player=__classPrivateFieldGet(this,_Soundtrack_players,"f")[track];if(void 0===player)throw new Error(`Can't stop: indicated player #${this.current_track} doesn't exist`);player.currentTime=to_where}load_tracks(tracks){tracks.map(this.normalize_track).forEach((t=>{if(this.has_track(t.name))throw new Error(`One or more of the listed tracks is already present: ${t}`)})),tracks.forEach((t=>{const norm=this.normalize_track(t),new_idx=__classPrivateFieldGet(this,_Soundtrack_tracks,"f").push(norm)-1;__classPrivateFieldGet(this,_Soundtrack_tracks_by_name,"f").set(norm.name,new_idx),__classPrivateFieldGet(this,_Soundtrack_instances,"m",_Soundtrack_add_player).call(this,norm)}))}name_to_track_number(name){return __classPrivateFieldGet(this,_Soundtrack_tracks_by_name,"f").get(name)}has_track(name){return __classPrivateFieldGet(this,_Soundtrack_tracks_by_name,"f").has(name)}get is_playing(){return __classPrivateFieldGet(this,_Soundtrack_playing,"f")}get is_paused(){return __classPrivateFieldGet(this,_Soundtrack_paused,"f")}get is_ready(){return __classPrivateFieldGet(this,_Soundtrack_ready,"f")}get current_track(){return __classPrivateFieldGet(this,_Soundtrack_current,"f")}normalize_track(track){var _a,_b,_c,_d,_e;const u_track="object"==typeof track?track:{name:track};if(!u_track.name)throw new Error(`New track definition missing name in normalize_track/1: ${JSON.stringify(u_track)}`);return{name:u_track.name,src:null!==(_a=u_track.src)&&void 0!==_a?_a:u_track.name+".mp3",start_offset:null!==(_b=u_track.start_offset)&&void 0!==_b?_b:0,end_offset:null!==(_c=u_track.end_offset)&&void 0!==_c?_c:0,loop_offset:null!==(_d=u_track.loop_offset)&&void 0!==_d?_d:0,loop:null===(_e=u_track.loop)||void 0===_e||_e}}}exports.Soundtrack=typescript.Soundtrack=Soundtrack,_Soundtrack_tracks=new WeakMap,_Soundtrack_tracks_by_name=new WeakMap,_Soundtrack_ready=new WeakMap,_Soundtrack_playing=new WeakMap,_Soundtrack_paused=new WeakMap,_Soundtrack_current=new WeakMap,_Soundtrack_players=new WeakMap,_Soundtrack_instances=new WeakSet,_Soundtrack_add_player=function(options){var _a;let player=new Audio(options.src),last_stamp=0,started=!1;player.autoplay=!1,player.currentTime=(null!==(_a=options.start_offset)&&void 0!==_a?_a:0)/1e3;let endline=options.end_offset,set_ready=to=>__classPrivateFieldSet(this,_Soundtrack_ready,to,"f");player.oncanplaythrough=function(){set_ready(!0)};const host=this;return setInterval((()=>{var _a;let end_cut=1e3*player.duration-(null!=endline?endline:0);host.is_ready&&host.is_playing&&(!started||performance.now()-last_stamp>end_cut)&&(started&&(player.currentTime=null!==(_a=options.loop_offset)&&void 0!==_a?_a:0),started=!0,last_stamp=performance.now(),player.play())}),1),__classPrivateFieldGet(this,_Soundtrack_players,"f").push(player)-1},exports.default=typescript;
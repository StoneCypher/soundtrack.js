# soundtrack.js
Make handling the soundtracks to your HTML5/JS games somewhat easier.  ES6/JS2015 with CommonJS bindings.

# TL;DR
```javascript
  var soundtrack = require('soundtrack').soundtrack,
      bg_track   = new soundtrack([ 'song1', 'song2', 'song3' ]);

  bg_track.play('song2');
```

# What's the point?
This library is primarily intended to make soundtracks out of loopable MP3s.

Handling seamless looping music in JavaScript is surprisingly hard, because of the timing situation - 
neither the HTML5 `Audio` object nor WebAudio `AudioContext`'s events fire fast enough to handle seamless looping (the spec allows 15ms to 250ms.)  HTML5 `setInterval`, however, has been set to a floor of 4ms, 
which is satisfactory.

This library wraps up the ho-hum, teaches songs to know whether they loop, provides start, end, and loop
points for songs, offers high resolution (4-6ms in practice, though undefined) callbacks for hitting music
timings, and generally just makes it easier to deal with high resolution audio timing.

Polemic :neckbeard:
-------------------

`soundtrack.js` is MIT licensed, because viral licenses and newspeak language modification are evil.  
Free is ***only*** free when it's free for everyone.
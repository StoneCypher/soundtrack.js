
import { stub_audio } from './AudioObjectStub.speclib';
stub_audio();

import { Soundtrack } from '../index';





describe('Pause', () => {

  const foo = new Soundtrack({ tracks: ['ooga', 'booga'] });


  test('Pausing after playing 1st song by name should work', () => {

    foo.play('ooga');

    expect(foo.is_playing).toBe(true);
    expect(foo.current_track).toBe(0);

    foo.pause();

    expect(foo.is_playing).toBe(true);
    expect(foo.is_paused).toBe(true);

    foo.pause();

    expect(foo.is_paused).toBe(false);

  });


  test('Pausing after playing 1st song by number should work', () => {

    foo.play(0);

    expect(foo.is_playing).toBe(true);
    expect(foo.current_track).toBe(0);

    foo.pause();

    expect(foo.is_playing).toBe(true);
    expect(foo.is_paused).toBe(true);

    foo.pause();

    expect(foo.is_paused).toBe(false);

  });


});

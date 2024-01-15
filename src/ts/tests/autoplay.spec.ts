
import { stub_audio } from './AudioObjectStub.speclib';
stub_audio();

import { Soundtrack } from '../index';





describe('Auto-play', () => {


  test('Off by omission', () => {

    const foo = new Soundtrack({ tracks: ['ooga', 'booga'] });

    expect(foo.is_playing).toBe(false);
    expect(foo.current_track).toBe(undefined);

  });


  test('Off by boolean', () => {

    const foo = new Soundtrack({ tracks: ['ooga', 'booga'], autoplay: false });

    expect(foo.is_playing).toBe(false);
    expect(foo.current_track).toBe(undefined);

  });


  test('On by boolean', () => {

    const foo = new Soundtrack({ tracks: ['ooga', 'booga'], autoplay: true });

    expect(foo.is_playing).toBe(true);
    expect(foo.current_track).toBe(0);

  });


  test('On by string', () => {

    const foo = new Soundtrack({ tracks: ['ooga', 'booga'], autoplay: 'booga' });

    expect(foo.is_playing).toBe(true);
    expect(foo.current_track).toBe(1);

  });


  test('On by number', () => {

    const foo = new Soundtrack({ tracks: ['ooga', 'booga'], autoplay: 1 });

    expect(foo.is_playing).toBe(true);
    expect(foo.current_track).toBe(1);

  });



});

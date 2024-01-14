
import { stub_audio } from './AudioObjectStub.speclib';
stub_audio();

import { Soundtrack } from '../index';





describe('Construction with string-named tracks then playing by number does not throw', () => {

  const foo = new Soundtrack({ tracks: ['ooga', 'booga'] });


  test('Playing 1st song should work', () => {

    foo.play_by_track_number(0);

    expect(foo.is_playing).toBe(true);
    expect(foo.current_track).toBe(0);

  });


  test('Playing 2nd song should work', () => {

    foo.play_by_track_number(1);

    expect(foo.is_playing).toBe(true);
    expect(foo.current_track).toBe(1);

  });


  test('Playing 1st song a second time should work', () => {

    foo.play_by_track_number(0);

    expect(foo.is_playing).toBe(true);
    expect(foo.current_track).toBe(0);

  });


  test('Playing 3rd song should fail (no such song)', () => {
    expect( () => foo.play_by_track_number(2) ).toThrow();
  });


});

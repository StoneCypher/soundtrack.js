
import { stub_audio } from './AudioObjectStub.speclib';
stub_audio();

import { Soundtrack } from '../index';





describe('Construction with string-named tracks then playing by name and number on mixed intro does not throw', () => {

  const foo = new Soundtrack({ tracks: ['ooga', 'booga'] });


  test('Playing 1st song by name should work', () => {

    foo.play('ooga');

    expect(foo.is_playing).toBe(true);
    expect(foo.current_track).toBe(0);

  });


  test('Playing 2nd song by name should work', () => {

    foo.play('booga');

    expect(foo.is_playing).toBe(true);
    expect(foo.current_track).toBe(1);

  });


  test('Playing 3rd song by name should fail (no 3rd song)', () => {
    expect( () => foo.play('grooga') ).toThrow();
  });


  test('Playing 1st song by number should work', () => {

    foo.play(0);

    expect(foo.is_playing).toBe(true);
    expect(foo.current_track).toBe(0);

  });


  test('Playing 2nd song by number should work', () => {

    foo.play(1);

    expect(foo.is_playing).toBe(true);
    expect(foo.current_track).toBe(1);

  });


  test('Playing 3rd song by name should fail (no 3rd song)', () => {
    expect( () => foo.play(2) ).toThrow();
  });


});

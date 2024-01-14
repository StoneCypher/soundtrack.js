
import { stub_audio } from './AudioObjectStub.speclib';
stub_audio();

import { Soundtrack } from '../index';





describe('Normalize track', () => {

  const foo = new Soundtrack({ tracks: ['ooga', 'booga'] });


  test('Normalize a string', () => {
    expect(foo.normalize_track('bar')).toStrictEqual({
      name         : 'bar',
      src          : 'bar.mp3',
      start_offset : 0,
      end_offset   : 0,
      loop_offset  : 0,
      loop         : true
    });
  });


  test('Normalize an object', () => {
    expect(foo.normalize_track({ name: 'bar' })).toStrictEqual({
      name         : 'bar',
      src          : 'bar.mp3',
      start_offset : 0,
      end_offset   : 0,
      loop_offset  : 0,
      loop         : true
    });
  });


  test('Missing name must throw', () => {
    expect( () => foo.normalize_track({}) ).toThrow();
  });


});

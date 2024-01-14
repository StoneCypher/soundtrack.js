
import { stub_audio } from './AudioObjectStub.speclib';
stub_audio();

import { Soundtrack } from '../index';





describe('Load track', () => {

  const foo = new Soundtrack({ tracks: ['ooga', 'booga'] });


  test('Add strings', () => {
    expect(() => foo.load_tracks(['chooga'])).not.toThrow();
    expect(() => foo.load_tracks(['drooga'])).not.toThrow();
  });


  test('Add objects', () => {
    expect(() => foo.load_tracks([{ name: 'kahooga' }])).not.toThrow();
    expect(() => foo.load_tracks([{ name: 'beluga'  }])).not.toThrow();
  });


  test('Re-add string should throw', () => {
    expect(() => foo.load_tracks(['ooga'])).toThrow();    // from original
    expect(() => foo.load_tracks(['chooga'])).toThrow();  // from added
  });


  test('Re-add object should throw', () => {
    expect(() => foo.load_tracks([{ name: 'ooga' }])).toThrow();    // from original
    expect(() => foo.load_tracks([{ name: 'chooga' }])).toThrow();  // from added
  });


});

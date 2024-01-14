
import { stub_audio } from './AudioObjectStub.speclib';
stub_audio();

import { Soundtrack } from '../index';





describe('Seek track', () => {

  const foo = new Soundtrack({ tracks: ['ooga', 'booga'] });


  test('Seek does not throw', () => {
    expect(() => foo.seek(1)).not.toThrow();
  });


});

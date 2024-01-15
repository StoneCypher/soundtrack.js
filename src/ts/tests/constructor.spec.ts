
import { stub_audio } from './AudioObjectStub.speclib';
stub_audio();

import { Soundtrack } from '../index';





test('Construction with two string-named tracks does not throw', () => {

  expect( () => { const foo = new Soundtrack({ tracks: ['ooga', 'booga'] }); } )
    .not.toThrow();

});





test('Construction with no tracks does not throw', () => {

  expect( () => { const foo = new Soundtrack({ tracks: [] }); } )
    .not.toThrow();

});





test('Construction without tracklist does not throw', () => {

  expect( () => { const foo = new Soundtrack({ }); } )
    .not.toThrow();

});





test('Construction without arguments does not throw', () => {

  expect( () => { const foo = new Soundtrack(); } )
    .not.toThrow();

});


import { vi } from 'vitest';





function stub_audio() {

  const AudioMock = vi.fn(
    () => ({
      play        : vi.fn(),
      pause       : vi.fn(),
      currentTime : 0
    })
  );

  vi.stubGlobal('Audio', AudioMock);

}





export { stub_audio };

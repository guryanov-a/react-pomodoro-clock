import { AUDIO_SET, AUDIO_PLAY } from "../constants";

export const audioSet = (newAudio) => ({
  type: AUDIO_SET,
  audio: newAudio,
});

export const audioPlay = () => ({
  type: AUDIO_PLAY,
});
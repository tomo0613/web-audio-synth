import { SoundTrack } from "./SoundTrack";
import { Sound } from "./Sound";

const sound1 = new Sound({ frequency: 110 });
const sound2 = new Sound({ frequency: 880 });

export const testTrack = new SoundTrack([sound1, sound2]);

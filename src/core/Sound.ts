import { context } from "./context";
import { Delay } from "./effect/Delay";
import { Distortion } from "./effect/Distortion";
import { Reverb } from "./effect/Reverb";
import { Unison } from "./effect/Unison";
import { AmpEnvelope } from "./envelope/AmpEnvelope";
import { FilterEnvelope } from "./envelope/FilterEnvelope";
import { PitchEnvelope } from "./envelope/PitchEnvelope";
import { createNoiseSource } from "./noise";
import periodicWave from "./periodicWave/periodicWave";

let i = 0;

interface ISoundProps {
    length?: number;
    frequency?: number;
}

export class Sound {
    id = `Sound_${i++}`;

    envelopes = {
        amp: new AmpEnvelope(),
        pitch: new PitchEnvelope(),
        filter: new FilterEnvelope(),
    };

    effects = {
        delay: new Delay(),
        distortion: new Distortion(),
        reverb: new Reverb(),
        unison: new Unison(),
    };

    length: number;

    frequency: number;

    waveForm: OscillatorType = "sine";

    periodicWaveId: keyof typeof periodicWave = "organ";

    private readonly oscillators: OscillatorNode[] = [];

    private noiseSource: AudioBufferSourceNode | null = null;

    noise = 0;

    constructor(props?: ISoundProps) {
        this.length = props?.length ?? 1;
        this.frequency = props?.frequency ?? 440;
    }

    private init() {
        this.oscillators.forEach((oscillator) => {
            if (this.waveForm === "custom") {
                oscillator.setPeriodicWave(periodicWave[this.periodicWaveId]);
            } else {
                oscillator.type = this.waveForm;
            }
        });
    }

    play(startTime: number, length: number) {
        const ampEnvelopeGain = this.envelopes.amp.init(startTime, length);
        this.effects.unison.init(ampEnvelopeGain, this.oscillators, this.frequency);

        this.envelopes.pitch.init(this.oscillators, startTime);
        this.envelopes.filter.init(ampEnvelopeGain);

        this.effects.distortion.init(ampEnvelopeGain);
        this.effects.delay.init(ampEnvelopeGain);
        this.effects.reverb.init(ampEnvelopeGain);

        this.init();

        if (this.noise > 0) {
            const noiseGain = context.instance.createGain();

            this.noiseSource = createNoiseSource();
            this.noiseSource.connect(noiseGain);
            this.noiseSource.start(startTime);

            noiseGain.gain.value = this.noise;

            noiseGain.connect(ampEnvelopeGain);
        }

        ampEnvelopeGain.connect(context.gainNode);

        this.oscillators.forEach((oscillator) => oscillator.start(startTime));
    }

    stop(stopTime?: number) {
        // ampEnvelopeGain.gain.cancelScheduledValues(stopTime);
        this.oscillators.forEach((oscillator) => oscillator.stop(stopTime));
        this.oscillators.length = 0;

        if (this.noiseSource) {
            this.noiseSource.stop(stopTime);
        }
    }
}

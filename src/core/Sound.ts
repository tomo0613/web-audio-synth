import { context } from "./context";
import { Delay } from "./effect/Delay";
import { Reverb } from "./effect/Reverb";
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
        reverb: new Reverb(),
        delay: new Delay(),
    };

    length: number;

    frequency: number;

    waveForm: OscillatorType = "sine";

    periodicWaveId: keyof typeof periodicWave = "organ";

    private oscillator: OscillatorNode | null = null;

    private noiseSource: AudioBufferSourceNode | null = null;

    noise = 0;

    constructor(props?: ISoundProps) {
        this.length = props?.length ?? 1;
        this.frequency = props?.frequency ?? 440;
    }

    private init() {
        const oscillator = context.instance.createOscillator();

        if (this.waveForm === "custom") {
            oscillator.setPeriodicWave(periodicWave[this.periodicWaveId]);
        } else {
            oscillator.type = this.waveForm;
        }

        this.oscillator = oscillator;
    }

    play(startTime: number, length: number) {
        this.init();

        assertOscillator(this.oscillator);

        const ampEnvelopeGain = this.envelopes.amp.init(startTime, length);

        this.envelopes.pitch.init(this.oscillator, startTime, this.frequency);
        this.envelopes.filter.init(ampEnvelopeGain, context.gainNode);

        this.effects.delay.init(ampEnvelopeGain);
        this.effects.reverb.init(ampEnvelopeGain);

        if (this.noise > 0) {
            const noiseGain = context.instance.createGain();

            this.noiseSource = createNoiseSource();
            this.noiseSource.connect(noiseGain);
            this.noiseSource.start(startTime);

            noiseGain.gain.value = this.noise;

            noiseGain.connect(ampEnvelopeGain);
        }

        this.oscillator.connect(ampEnvelopeGain);
        ampEnvelopeGain.connect(context.gainNode);

        this.oscillator.start(startTime);
    }

    stop(stopTime?: number) {
        assertOscillator(this.oscillator);
        // ampEnvelopeGain.gain.cancelScheduledValues(stopTime);
        this.oscillator.stop(stopTime);

        if (this.noiseSource) {
            this.noiseSource.stop(stopTime);
        }
    }
}

function assertOscillator(oscillator: OscillatorNode | null): asserts oscillator is OscillatorNode {
    if (!oscillator) {
        throw new Error("oscillator is null");
    }
}

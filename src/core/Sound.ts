import { context } from "./context";
import { createNoiseSource } from "./noise";
import { AmpEnvelope, FilterEnvelope, PitchEnvelope } from "./SoundEnvelope";

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

    length: number;

    frequency: number;

    waveForm: OscillatorType = "sine";

    oscillator: OscillatorNode | null = null;

    noiseSource: AudioBufferSourceNode | null = null;

    noise = 0;

    constructor(props?: ISoundProps) {
        this.length = props?.length ?? 1;
        this.frequency = props?.frequency ?? 440;
    }

    private init() {
        const oscillator = context.instance.createOscillator();

        if (this.waveForm === "custom") {
            throw new Error("ToDo implement customWave: PeriodicWave");
            // oscillator.setPeriodicWave(customWave);
        } else {
            oscillator.type = this.waveForm;
        }

        this.oscillator = oscillator;
    }

    play(startTime: number, length: number) {
        const ampEnvelopeGain = context.instance.createGain();
        const noiseGain = context.instance.createGain();

        this.init();

        assertOscillator(this.oscillator);

        this.envelopes.amp.init(ampEnvelopeGain, startTime, length);
        this.envelopes.pitch.init(this.oscillator, startTime, this.frequency);

        if (this.noise > 0) {
            this.noiseSource = createNoiseSource();
            this.noiseSource.connect(noiseGain);
            this.noiseSource.start(startTime);

            noiseGain.gain.value = this.noise;

            noiseGain.connect(ampEnvelopeGain);
        }

        if (this.envelopes.filter.type) {
            const filter = context.instance.createBiquadFilter();

            this.envelopes.filter.init(filter);

            this.oscillator.connect(filter);
            filter.connect(ampEnvelopeGain);
        } else {
            this.oscillator.connect(ampEnvelopeGain);
        }

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

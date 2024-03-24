import { context } from "./context";
import { AmpEnvelope, FilterEnvelope, PitchEnvelope } from "./SoundEnvelope";

let i = 0;

interface ISoundProps {
    length?: number;
    frequency?: number;
    waveForm?: OscillatorType;
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

    oscillator: OscillatorNode | null = null;

    waveForm: OscillatorType;

    constructor({ length = 1, frequency = 440, waveForm = "sine" }: ISoundProps) {
        this.length = length;
        this.frequency = frequency;
        this.waveForm = waveForm;
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

        this.init();

        assertOscillator(this.oscillator);

        this.envelopes.amp.init(ampEnvelopeGain, startTime, length);
        this.envelopes.pitch.init(this.oscillator, startTime, this.frequency);

        if (this.envelopes.filter.enabled) {
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
    }
}

function createNoiseBuffer() {
    const bufferSize = 2 * context.instance.sampleRate;
    const noiseBuffer = context.instance.createBuffer(1, bufferSize, context.instance.sampleRate);
    const channelData = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        channelData[i] = Math.random() * 2 - 1;
    }

    return noiseBuffer;
}

function noise() {
    const noiseSource = context.instance.createBufferSource();
    noiseSource.buffer = createNoiseBuffer();
    noiseSource.loop = true;
    noiseSource.start(0);

    noiseSource.connect(context.instance.destination);
}

function assertOscillator(oscillator: OscillatorNode | null): asserts oscillator is OscillatorNode {
    if (!oscillator) {
        throw new Error("oscillator is null");
    }
}

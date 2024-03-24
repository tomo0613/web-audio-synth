import { context } from "./context";
import { AmpEnvelope, PitchEnvelope } from "./SoundEnvelope";

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

        this.oscillator.connect(ampEnvelopeGain);
        ampEnvelopeGain.connect(context.gainNode);

        this.oscillator.start(startTime);
    }

    stop(stopTime?: number) {
        assertOscillator(this.oscillator);
        // ampEnvelopeGain.gain.cancelScheduledValues(stopTime);
        this.oscillator.stop(stopTime);
    }
}

function assertOscillator(oscillator: OscillatorNode | null): asserts oscillator is OscillatorNode {
    if (!oscillator) {
        throw new Error("oscillator is null");
    }
}

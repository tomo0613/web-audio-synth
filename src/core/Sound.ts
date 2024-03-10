import { AmpEnvelope } from "./SoundEnvelope";
import { context } from "./context";

interface ISoundProps {
    length?: number;
    frequency?: number;
    waveForm?: OscillatorType;
}

export class Sound {
    envelopes = {
        amp: new AmpEnvelope(),
        pitch: null,
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

        if (this.waveForm === 'custom') {
            throw new Error("ToDo implement customWave: PeriodicWave")
            // oscillator.setPeriodicWave(customWave);
        } else {
            oscillator.type = this.waveForm;
        }

        oscillator.frequency.value = this.frequency;

        this.oscillator = oscillator;
    }

    play(startTime: number) {
        this.init();

        const ampEnvelopeGain = this.envelopes.amp.init(startTime, this.length);

        this.oscillator.connect(ampEnvelopeGain);
        ampEnvelopeGain.connect(context.gainNode);
        
        this.oscillator.start(startTime);
    }

    stop() {
        this.oscillator.stop();
    }
}

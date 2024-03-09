import { SoundEnvelope } from "./SoundEnvelope";
import { context } from "./context";

interface ISoundProps {
    length?: number;
    frequency?: number;
    waveForm?: OscillatorType;
}

export class Sound {
    oscillator = context.instance.createOscillator();
    envelopes = [new SoundEnvelope()];
    length: number;
    
    constructor({ length = 0.1, frequency = 440, waveForm = "sine" }: ISoundProps) {
        this.oscillator.connect(context.gainNode);

        this.length = length;
        this.frequency = frequency;
        this.waveForm = waveForm;
    }

    set frequency(value: number) {
        this.oscillator.frequency.value = value;
    }

    get frequency() {
        return this.oscillator.frequency.value;
    }

    set waveForm(waveForm: OscillatorType) {
        if (waveForm === 'custom') {
            throw new Error("ToDo implement customWave: PeriodicWave")
            // this.oscillator.setPeriodicWave(customWave);
        } else {
            this.oscillator.type = waveForm;
        }
    }

    get waveForm() {
        return this.oscillator.type;
    }

    play(startTime: number) {
        
        console.log("play sound", { startTime, l: this.length });
        
        this.envelopes[0].apply(startTime, this.length, context.gainNode);

        this.oscillator.start();
    }

    stop() {
        this.oscillator.stop();
    }
}

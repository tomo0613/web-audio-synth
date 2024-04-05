import { context } from "@core/context";

export class Unison {
    detune = 1;
    blend = 0;
    mode: "linear" | "exponential" | "parabolic" = "linear";
    private _oscillatorCount = 1;

    get oscillatorCount() {
        return this._oscillatorCount;
    }

    set oscillatorCount(value) {
        if (value < 1 || !Number.isInteger(value)) {
            throw new Error(`count: [${value}] is invalid`);
        }

        this._oscillatorCount = value;
    }

    init(output: AudioNode, oscillators: OscillatorNode[], frequency: number) {
        const edge = this.oscillatorCount / 2 - 0.5;

        for (let i = -edge; i <= edge; i++) {
            const oscillator = context.instance.createOscillator();
            let frequencyOffset = i * this.detune;

            if (this.mode === "exponential") {
                frequencyOffset = Math.sign(frequencyOffset) * frequencyOffset ** 2;
            } else if (this.mode === "parabolic") {
                frequencyOffset = 0.1 * (Math.sign(frequencyOffset) * frequencyOffset ** 2);
            }

            oscillator.frequency.value = frequency + frequencyOffset;

            oscillator.connect(output);

            oscillators.push(oscillator);
        }
    }
}

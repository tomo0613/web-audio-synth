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
        let blendGainNode: GainNode | null = null;
        const edge = this.oscillatorCount / 2 - 0.5;

        if (this.blend > 0) {
            blendGainNode = context.instance.createGain();

            blendGainNode.gain.value = 1 - this.blend;
        }

        for (let i = -edge; i <= edge; i++) {
            const oscillator = context.instance.createOscillator();
            let frequencyOffset = i * this.detune;

            if (this.mode === "exponential") {
                frequencyOffset = Math.sign(frequencyOffset) * frequencyOffset ** 2;
            } else if (this.mode === "parabolic") {
                frequencyOffset = 0.1 * (Math.sign(frequencyOffset) * frequencyOffset ** 2);
            }

            oscillator.frequency.value = frequency + frequencyOffset;

            if (blendGainNode && !isCenterIndex(i)) {
                oscillator.connect(blendGainNode);
                blendGainNode.connect(output);
            } else {
                oscillator.connect(output);
            }

            oscillators.push(oscillator);
        }
    }
}

function isCenterIndex(i: number) {
    return i >= -0.5 && i <= 0.5;
}

import { context } from "@core/context";

const distortionCurveCache = {};

function createDistortionCurve(amount: number) {
    const sampleRate = context.instance.sampleRate;
    const curve = new Float32Array(context.instance.sampleRate);
    // const deg = Math.PI / 180;

    // for (let i = 0; i < sampleRate; i++) {
    //     const x = (i * 2) / sampleRate - 1;
    //     curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
    // }
    for (let i = 0; i < sampleRate; ++i) {
        let x = i * 2 / sampleRate - 1;

        curve[i] = (Math.PI + amount) * x / (Math.PI + amount * Math.abs(x));
    }

    return curve;
}

export class Distortion {
    amount = 0;
    overSample: OverSampleType = "4x";

    init(input: AudioNode) {
        if (!(this.amount > 0)) {
            return;
        }

        const waveShaperNode = context.instance.createWaveShaper();

        waveShaperNode.curve = this.createCurve();
        waveShaperNode.oversample = this.overSample;

        input.connect(waveShaperNode);
        waveShaperNode.connect(context.gainNode);
    }

    private createCurve() {
        const cacheKey = `${this.amount}`;

        if (distortionCurveCache[cacheKey]) {
            return distortionCurveCache[cacheKey];
        }

        const curve = createDistortionCurve(this.amount);

        distortionCurveCache[cacheKey] = curve;

        return curve;
    }
}

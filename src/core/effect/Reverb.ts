import { context } from "@core/context";

const bufferCache = {};

function createReverbBuffer(time: number, decay: number, reverse: boolean) {
    const bufferSize = time * context.instance.sampleRate;
    const reverbBuffer = context.instance.createBuffer(2, bufferSize, context.instance.sampleRate);
    const channelLeftData = reverbBuffer.getChannelData(0);
    const channelRightData = reverbBuffer.getChannelData(1);

    for (let i = 0; i < bufferSize; i++) {
        const n = reverse ? bufferSize - i : i;

        channelLeftData[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / bufferSize, decay);
        channelRightData[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / bufferSize, decay);
    }
    return reverbBuffer;
}

export class Reverb {
    time = 0;
    decay = 0;
    reverse = false;

    init(input: AudioNode) {
        if (!(this.time > 0)) {
            return;
        }

        const convolverNode = context.instance.createConvolver();

        convolverNode.buffer = this.createBuffer();
        convolverNode.connect(context.gainNode);
        input.connect(convolverNode);
    }

    private createBuffer() {
        const cacheKey = `${this.time},${this.decay},${this.reverse}`;

        if (bufferCache[cacheKey]) {
            return bufferCache[cacheKey];
        }

        const buffer = createReverbBuffer(this.time, this.decay, this.reverse);

        bufferCache[cacheKey] = buffer;

        return buffer;
    }
}

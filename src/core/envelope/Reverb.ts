import { context } from "@core/context";

export class Reverb {
    time = 0;
    decay = 0;
    reverse = false;

    init(input: AudioNode) {
        if (this.time < Number.EPSILON) {
            return;
        }

        const convolverNode = context.instance.createConvolver();

        const bufferSize = this.time * context.instance.sampleRate;
        const reverbBuffer = context.instance.createBuffer(2, bufferSize, context.instance.sampleRate);
        const channelLeftData = reverbBuffer.getChannelData(0);
        const channelRightData = reverbBuffer.getChannelData(1);

        for (let i = 0; i < bufferSize; i++) {
            const n = this.reverse ? bufferSize - i : i;

            channelLeftData[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / bufferSize, this.decay);
            channelRightData[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / bufferSize, this.decay);
        }

        convolverNode.buffer = reverbBuffer;
        convolverNode.connect(context.instance.destination);
        input.connect(convolverNode);
    }
}

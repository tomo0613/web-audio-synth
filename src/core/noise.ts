import { context } from "./context";

const whiteNoiseBuffer = createNoiseBuffer();

function createNoiseBuffer() {
    const bufferSize = 2 * context.instance.sampleRate;
    const noiseBuffer = context.instance.createBuffer(1, bufferSize, context.instance.sampleRate);
    const channelData = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        channelData[i] = Math.random() * 2 - 1;
    }

    return noiseBuffer;
}

export function createNoiseSource() {
    const noiseSource = context.instance.createBufferSource();
    noiseSource.buffer = whiteNoiseBuffer;
    noiseSource.loop = true;

    return noiseSource;
}

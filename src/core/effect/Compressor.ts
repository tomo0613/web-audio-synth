import { context } from "@core/context";

export class Compressor {
    disabled = true;
    threshold = -24;
    knee = 30;
    ratio = 12;
    attack = 0.003;
    release = 0.25;

    init(input: AudioNode) {
        if (this.disabled) {
            return;
        }

        const compressorNode = context.instance.createDynamicsCompressor();

        compressorNode.threshold.value = this.threshold;
        compressorNode.knee.value = this.knee;
        compressorNode.ratio.value = this.ratio;
        compressorNode.attack.value = this.attack;
        compressorNode.release.value = this.release;

        input.connect(compressorNode);

        return compressorNode;
    }
}

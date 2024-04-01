import { context } from "@core/context";

export class FilterEnvelope {
    type: BiquadFilterType | undefined;
    frequency = 0;
    q = 0;
    detune = 0;

    init(input: AudioNode) {
        if (!this.type) {
            return;
        }

        const filterNode = context.instance.createBiquadFilter();

        filterNode.type = this.type;
        filterNode.frequency.value = this.frequency;
        filterNode.Q.value = this.q;
        filterNode.detune.value = this.detune;

        input.connect(filterNode);

        filterNode.connect(context.gainNode);
    }
}

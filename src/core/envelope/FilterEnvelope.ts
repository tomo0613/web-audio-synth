import { context } from "@core/context";

export class FilterEnvelope {
    type: BiquadFilterType | undefined;
    frequency = 0;
    q = 0;
    detune = 0;
    _24dB = false;

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

        if (this._24dB) {
            const secondFilterNode = context.instance.createBiquadFilter();

            secondFilterNode.type = this.type;
            secondFilterNode.frequency.value = this.frequency;
            secondFilterNode.Q.value = this.q / 2;
            secondFilterNode.detune.value = this.detune;

            filterNode.connect(secondFilterNode);

            secondFilterNode.connect(context.gainNode);
        } else {
            filterNode.connect(context.gainNode);
        }
    }
}

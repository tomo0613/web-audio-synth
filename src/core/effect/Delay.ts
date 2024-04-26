import { context } from "@core/context";

export class Delay {
    time = 0;
    feedback = 0;

    init(input: AudioNode) {
        if (!(this.time > 0)) {
            return;
        }

        const delayNode = context.instance.createDelay();
        const gainNode = context.instance.createGain();

        delayNode.delayTime.value = this.time;
        gainNode.gain.value = this.feedback;

        delayNode.connect(gainNode);
        gainNode.connect(delayNode);
        input.connect(delayNode);

        return delayNode;
    }
}

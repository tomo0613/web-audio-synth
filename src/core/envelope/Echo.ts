import { context } from "@core/context";

export class Echo {
    time = 0;
    feedback = 0;

    init(input: AudioNode) {
        // const delayNode = context.instance.createDelay();
        // const gainNode = context.instance.createGain();

        // delayNode.delayTime.value = this.time;
        // gainNode.gain.value = this.feedback;

        // input.connect(delayNode);
        // delayNode.connect(gainNode);
        // gainNode.connect(delayNode);
    }
}

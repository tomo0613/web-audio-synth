import { context } from "./context";

export class AmpEnvelope {
    attack = 0;

    decay = 0;

    sustain = 1;

    release = 0;

    init(startTime: number, length: number) {
        const gainNode = context.instance.createGain();

        const attackDuration = this.attack; // * MAX_TIME
        const attackEndTime = startTime + attackDuration;
        const decayDuration = this.decay; // * MAX_TIME
        const releaseTime = startTime + length;
        const releaseDuration = this.release; // * MAX_TIME
        const releaseEndTime = releaseTime + releaseDuration;

        // attack
        gainNode.gain.linearRampToValueAtTime(1, attackEndTime);
        // decay
        gainNode.gain.setTargetAtTime(this.sustain, attackEndTime, decayDuration);
        // sustain
        gainNode.gain.setValueAtTime(gainNode.gain.value, releaseTime);
        // release
        gainNode.gain.linearRampToValueAtTime(0, releaseEndTime);

        return gainNode;
    }
}

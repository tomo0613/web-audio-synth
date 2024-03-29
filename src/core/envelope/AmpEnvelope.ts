import { context } from "@core/context";

export class AmpEnvelope {
    attack = 0;
    decay = 0;
    sustain = 1;
    release = 0;

    init(startTime: number, length: number) {
        const attackDuration = this.attack;
        const attackEndTime = startTime + attackDuration;
        const decayDuration = this.decay;
        const releaseTime = startTime + length;
        const releaseDuration = this.release;
        const releaseEndTime = releaseTime + releaseDuration;

        const gainNode = context.instance.createGain();

        gainNode.gain.setValueAtTime(0, startTime);
        // attack
        gainNode.gain.linearRampToValueAtTime(1, attackEndTime);
        // decay
        gainNode.gain.setTargetAtTime(this.sustain, attackEndTime, decayDuration);
        // sustain
        gainNode.gain.setValueAtTime(this.sustain, releaseTime);
        // release
        gainNode.gain.linearRampToValueAtTime(0, releaseEndTime);

        return gainNode;
    }
}

import { context } from "./context";

export class AmpEnvelope {
    attack = 0;
    decay = 0;
    sustain = 1;
    release = 0;

    init(startTime: number, length: number) {
        const gainNode = context.instance.createGain();

        const attackDuration = this.attack;
        const attackEndTime = startTime + attackDuration;
        const decayDuration = this.decay;
        const releaseTime = startTime + length;
        const releaseDuration = this.release;
        const releaseEndTime = releaseTime + releaseDuration;

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

export class PitchEnvelope {
    time = 0;

    init(oscillator: OscillatorNode) {
        // oscillator.frequency.setValueAtTime(0, 0);
    }
}

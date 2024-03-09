export class SoundEnvelope {
    attack = 0;
    decay = 0;
    sustain = 1;
    release = 0;

    apply(startTime: number, length: number, gainNode: GainNode) {
        const attackDuration = this.attack; // * MAX_TIME
        const attackEndTime = startTime + attackDuration;
        const decayDuration = this.decay; // * MAX_TIME
        const releaseTime = startTime + length;
        const releaseDuration = this.release; // * MAX_TIME
        const releaseEndTime = releaseTime + releaseDuration;
        
        gainNode.gain.cancelScheduledValues(startTime);
        gainNode.gain.setValueAtTime(0, startTime);
        // attack
        gainNode.gain.exponentialRampToValueAtTime(1, attackEndTime);
        // decay
        gainNode.gain.setTargetAtTime(this.sustain, attackEndTime, decayDuration);
        // sustain
        gainNode.gain.setValueAtTime(gainNode.gain.value, releaseTime);
        // release
        gainNode.gain.linearRampToValueAtTime(0, releaseEndTime);
    }

}

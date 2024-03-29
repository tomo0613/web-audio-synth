export class AmpEnvelope {
    attack = 0;
    decay = 0;
    sustain = 1;
    release = 0;

    init(gain: GainNode, startTime: number, length: number) {
        const attackDuration = this.attack;
        const attackEndTime = startTime + attackDuration;
        const decayDuration = this.decay;
        const releaseTime = startTime + length;
        const releaseDuration = this.release;
        const releaseEndTime = releaseTime + releaseDuration;

        gain.gain.setValueAtTime(0, startTime);
        // attack
        gain.gain.linearRampToValueAtTime(1, attackEndTime);
        // decay
        gain.gain.setTargetAtTime(this.sustain, attackEndTime, decayDuration);
        // sustain
        gain.gain.setValueAtTime(this.sustain, releaseTime);
        // release
        gain.gain.linearRampToValueAtTime(0, releaseEndTime);
    }
}

export class PitchEnvelope {
    initial = 0;
    end = 0;
    time = 0;

    init(oscillator: OscillatorNode, startTime: number, frequency: number) {
        oscillator.frequency.setValueAtTime(frequency + this.initial, startTime);
        oscillator.frequency.linearRampToValueAtTime(frequency + this.end, startTime + this.time);
    }
}

export class FilterEnvelope {
    type: BiquadFilterType | undefined;
    frequency = 0;
    q = 0;

    init(filter: BiquadFilterNode) {
        if (!this.type) {
            return;
        }

        filter.type = this.type;
        filter.frequency.value = this.frequency;
        filter.Q.value = this.q;
    }
}

export class PitchEnvelope {
    initial = 0;
    end = 0;
    time = 0;

    init(oscillators: OscillatorNode[], startTime: number) {
        oscillators.forEach((oscillatorNode) => {
            const frequency = oscillatorNode.frequency.value;

            oscillatorNode.frequency.setValueAtTime(frequency + this.initial, startTime);
            oscillatorNode.frequency.linearRampToValueAtTime(frequency + this.end, startTime + this.time);
        });
    }
}

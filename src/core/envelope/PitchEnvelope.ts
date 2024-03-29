export class PitchEnvelope {
    initial = 0;
    end = 0;
    time = 0;

    init(oscillatorNode: OscillatorNode, startTime: number, frequency: number) {
        oscillatorNode.frequency.setValueAtTime(frequency + this.initial, startTime);
        oscillatorNode.frequency.linearRampToValueAtTime(frequency + this.end, startTime + this.time);
    }
}

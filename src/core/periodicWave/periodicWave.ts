import { context } from "../context";
import { organ } from "./organWaveForm";

function createPeriodicWave(real: Iterable<number>, imag: Iterable<number>) {
    return context.instance.createPeriodicWave(real, imag);
}

export default {
    sine: createPeriodicWave(
        [0, 1],
        [0, 0],
    ),
    organ: createPeriodicWave(
        Object.values(organ.real),
        Object.values(organ.imag),
    ),
};

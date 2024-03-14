import { context } from "@core/context";
import { Box } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef } from "react";

function initAnalyser(audioContext: AudioContext, gainNode: GainNode) {
    const analyser = audioContext.createAnalyser();
    const analyserDataBuffer = new Uint8Array(analyser.frequencyBinCount);

    analyser.fftSize = 2048;
    analyser.getByteTimeDomainData(analyserDataBuffer);

    gainNode.connect(analyser);

    return {
        analyser,
        analyserDataBuffer,
    };
}

export const AudioAnalyserDisplay = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { analyser, analyserDataBuffer } = useMemo(() => {
        return initAnalyser(context.instance, context.gainNode);
    }, []);

    const draw = useCallback((drawContext: CanvasRenderingContext2D) => {
        analyser.getByteTimeDomainData(analyserDataBuffer);

        drawContext.fillStyle = "rgb(200, 200, 200)";
        drawContext.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        drawContext.lineWidth = 2;
        drawContext.strokeStyle = "rgb(0, 0, 0)";

        drawContext.beginPath();

        const sliceWidth = (canvasRef.current.width * 1.0) / analyserDataBuffer.length;
        let x = 0;

        for (let i = 0; i < analyserDataBuffer.length; i++) {
            const v = analyserDataBuffer[i] / 128.0;
            const y = (v * canvasRef.current.height) / 2;

            if (i === 0) {
                drawContext.moveTo(x, y);
            } else {
                drawContext.lineTo(x, y);
            }

            x += sliceWidth;
        }

        drawContext.lineTo(canvasRef.current.width, canvasRef.current.height / 2);
        drawContext.stroke();
    }, [canvasRef.current]);

    useEffect(() => {
        let animationFrameId: number;
        const drawContext = canvasRef.current.getContext("2d");

        const render = () => {
            draw(drawContext);
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw]);

    return (
        <Box>
            <canvas ref={canvasRef} />
        </Box>
    );
};

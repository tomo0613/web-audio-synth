import { Box, Card, Divider, Slider, Stack, type SxProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useUiContext } from "@ui/context/UiContext";

const cardSx: SxProps = {
    p: 4,
};

export const EchoControl = () => {
    const { selectedSound } = useUiContext();
    const [time, setTime] = useState(0);
    const [feedback, setFeedback] = useState(0);

    useEffect(() => {
        if (!selectedSound) {
            return;
        }

        setTime(selectedSound.envelopes.echo.time);
        setFeedback(selectedSound.envelopes.echo.feedback);
    }, [selectedSound]);

    useEffect(() => {
        if (selectedSound) {
            selectedSound.envelopes.echo.time = time;
        }
    }, [time]);

    useEffect(() => {
        if (selectedSound) {
            selectedSound.envelopes.echo.feedback = feedback;
        }
    }, [feedback]);

    function handleTimeChange(e: Event, value: number) {
        setTime(value);
    }

    function handleFeedbackChange(e: Event, value: number) {
        setFeedback(value);
    }

    return (
        <Card sx={cardSx}>
            <Divider>
                <Typography>
                    Echo
                </Typography>
            </Divider>
            <Stack mt={2} spacing={2}>
                <Box>
                    <Typography>
                        Time [ {time} ]
                    </Typography>
                    <Slider
                        min={0}
                        max={1}
                        step={0.001}
                        value={time}
                        onChange={handleTimeChange}
                        disabled={!selectedSound}
                        sx={{ width: "100px" }}
                    />
                </Box>
                <Box>
                    <Typography>
                        Feedback [ {feedback} ]
                    </Typography>
                    <Slider
                        min={0}
                        max={1}
                        step={0.001}
                        value={feedback}
                        onChange={handleFeedbackChange}
                        disabled={!selectedSound}
                        sx={{ width: "100px" }}
                    />
                </Box>
            </Stack>
        </Card>
    );
};

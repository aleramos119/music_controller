import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function RoomJoinPage() {
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const _handleTextFieldChange = (e) => {
        setRoomCode(e.target.value);
    };

    const _roomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                code: roomCode
            })
        };
        fetch('/api/join-room', requestOptions)
        .then((response) => {
            if(response.ok){
                navigate(`/room/${roomCode}`);
            }else{
                setError("Room not found");
            }
        })
        .catch((error) => {
            console.error('Error joining room:', error);
        });
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField 
                    error={Boolean(error)}
                    label="Code"
                    placeholder="Enter a Room Code. Me cago en ti"
                    value={roomCode}
                    helperText={error}
                    variant="outlined"
                    onChange={_handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={_roomButtonPressed}>Join Room</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
            </Grid>
        </Grid>
    );
}

export default RoomJoinPage;
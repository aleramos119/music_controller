import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { Grid, Button, Typography} from "@mui/material";


// Create a wrapper component to use hooks
function RoomWithParams() {
    const { roomCode } = useParams();
    return <Room roomCode={roomCode} />;
}

function leaveRoom() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    fetch('/api/leave-room', requestOptions)
        .then((_response) => {
            window.location.href = '/';
        })
        .catch((error) => {
            console.error('Error leaving room:', error);
        });
}

function Room() {
    const { roomCode } = useParams();
    const [roomDetails, setRoomDetails] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await fetch(`/api/get-room?code=${roomCode}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch room details');
                    window.location.href = '/';
                }
                const data = await response.json();
                setRoomDetails({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host
                });
            } catch (err) {
                console.error('Error fetching room details:', err);
                setError(err.message);
            }
        };

        fetchRoomDetails();
    }, [roomCode]);

    if (error) {
        return (
            <div>
                <h3>Error: {error}</h3>
                <p>Unable to load room details for room code: {roomCode}</p>
            </div>
        );
    }

    return (
        <Grid container spacing={1} direction="column" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h5">Room Code: {roomCode}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Room Details</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Votes to Skip: {roomDetails.votesToSkip}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Guest Can Pause: {roomDetails.guestCanPause.toString()}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Host: {roomDetails.isHost.toString()}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="secondary" onClick={leaveRoom}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>


        
    );
}


{/* <div>
            <h3>Room Code: {roomCode}</h3>
            <h3>Room Details</h3>
            <p>Votes to Skip: {roomDetails.votesToSkip}</p> 
            <p>Guest Can Pause: {roomDetails.guestCanPause.toString()}</p> 
            <p>Host: {roomDetails.isHost.toString()}</p> 
        </div> */}

export { Room, RoomWithParams as default };
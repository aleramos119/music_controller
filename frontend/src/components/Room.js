import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { Grid, Button, Typography} from "@mui/material";
import CreateRoomPage from "./CreateRoomPage";

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
        showSettings: false
    });
    // Function to set showSettings state to a desired value
    const setShowSettings = (value) => {
        setRoomDetails(prevDetails => ({
            ...prevDetails,
            showSettings: value
        }));
    };
    const [error, setError] = useState(null);

    // Define a callback to refresh room details
    const fetchRoomDetails = async () => {
        try {
            const response = await fetch(`/api/get-room?code=${roomCode}`);
            if (!response.ok) {
                throw new Error('Failed to fetch room details');
                window.location.href = '/';
            }
            const data = await response.json();
            setRoomDetails(prevDetails => ({
                ...prevDetails,
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host
            }));
        } catch (err) {
            console.error('Error fetching room details:', err);
            setError(err.message);
        }
    };

    useEffect(() => {
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

    function renderSettings(){
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage 
                        update={true} 
                        votesToSkip={roomDetails.votesToSkip} 
                        guestCanPause={roomDetails.guestCanPause}
                        roomCode={roomCode} 
                        updateCallback={fetchRoomDetails} // <-- use the local function
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={() => setShowSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        );
    }

    function renderSettingsButton() {
        if (roomDetails.isHost) {
            return (
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={() => setShowSettings(true)}>
                        Settings
                    </Button>
                </Grid>
            );
        }
        return null;
    }

    if (roomDetails.showSettings) {
        return renderSettings();
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
            {roomDetails.isHost && renderSettingsButton()}
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
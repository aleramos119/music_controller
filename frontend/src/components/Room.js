import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function Room() {
    const { roomCode } = useParams();
    const [roomDetails, setRoomDetails] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
        roomCode: roomCode || 'NO_CODE_PROVIDED'
    });

    useEffect(() => {
        fetch(`/api/get-room?code=${roomCode}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Room not found');
                }
                return response.json();
            })
            .then((data) => {
                setRoomDetails({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                    roomCode: roomCode
                });
            })
            .catch((error) => {
                console.error('Error fetching room details:', error);
            });
    }, [roomCode]);

    return (
        <div>
          <h3>Room Code Debug: {roomCode}</h3>
          <h3>🔍 BlaBlaBla Diagnostic Text</h3>
          <p>Votes: {roomDetails.votesToSkip}</p> 
          <p>Guest Can Pause: {roomDetails.guestCanPause.toString()}</p> 
          <p>Host: {roomDetails.isHost.toString()}</p> 
        </div>
    );
}
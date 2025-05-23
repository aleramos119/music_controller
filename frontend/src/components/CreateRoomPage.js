import React, { Component } from "react";
import { Button, Typography, TextField, FormHelperText, 
         FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate, Link } from "react-router-dom";

// Wrapper component to use hooks
function CreateRoomPageWithRouter() {
    const navigate = useNavigate();
    return <CreateRoomPage navigate={navigate} />;
}

class CreateRoomPage extends Component {
    defaultVotes = 2;
    
    constructor(props){
        super(props);
        this.state = {
            votesToSkip: this.defaultVotes,
            guestCanPause: true
        }
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    }

    handleVotesChange  (e){
        this.setState({
            votesToSkip: e.target.value,
        })
    }


    handleGuestCanPauseChange(e){
        this.setState({
            guestCanPause: e.target.value === 'true',
        })
    }


    handleRoomButtonPressed(){
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        };
        fetch('/api/create-room', requestOptions)
        .then((response) => response.json())
        .then((data) => {
            // Use the navigate prop passed from the wrapper component
            this.props.navigate(`/room/${data.code}`);
        })
        .catch((error) => {
            console.error('Error creating room:', error);
        });
    }

    render(){
        return (
            <Grid container spacing={1}>
               <Grid item xs={12} align="center">
                   <Typography variant="h4" component="h4">
                       Create a Room 123
                   </Typography>
               </Grid>
               <Grid item xs={12} align="center">
                   <FormControl component="fieldset">
                       <FormHelperText>
                           <div align="center">
                               Guest Control of Playback State
                           </div>
                        </FormHelperText>
                        <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
                            <FormControlLabel 
                                value="true" 
                                control={<Radio color="primary" />} 
                                label="Play/Pause" 
                                labelPlacement="bottom" 
                            />
                            <FormControlLabel 
                                value="false" 
                                control={<Radio color="secondary" />} 
                                label="No control" 
                                labelPlacement="bottom" 
                            />
                        </RadioGroup>
                   </FormControl>
               </Grid>
               <Grid item xs={12} align="center">
                   <FormControl component="fieldset">
                       <TextField required={true} type="number" 
                       onChange={this.handleVotesChange}
                       defaultValue={this.defaultVotes} 
                       inputProps={{min:1, style:{textAlign:"center"}}}/>
                       <FormHelperText>
                           <div align="center">
                               Votes Required to Skip Song
                           </div>
                        </FormHelperText>
                   </FormControl>
               </Grid>
               <Grid item xs={12} align="center">
                   <Button color="primary" variant="contained" onClick={this.handleRoomButtonPressed}>
                       Create a Room
                   </Button>
               </Grid>
               <Grid item xs={12} align="center">
                   <Button color="secondary" variant="contained" to="/" component={Link} >
                       Back
                   </Button>
               </Grid>
            </Grid>
        );
    }
}

export default CreateRoomPageWithRouter;
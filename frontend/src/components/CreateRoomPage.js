import React, { Component } from "react";
import { Button, Typography, TextField, FormHelperText, 
         FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate, Link } from "react-router-dom";
import { Collapse } from "@mui/material";   


// Wrapper component to use hooks
function CreateRoomPageWithRouter(props) {
    const navigate = useNavigate();
    return <CreateRoomPage {...props} navigate={navigate} />;
}

class CreateRoomPage extends Component {
    defaultVotes = 2;

    static defaultProps = {
        votesToSkip: 2,
        guestCanPause: true,
        update: false,
        roomCode: null,
        updateCallback: () => {},
    };
    
    constructor(props){
        super(props);
        this.state = {
            votesToSkip: this.props.votesToSkip,
            guestCanPause: this.props.guestCanPause,
            errorMsg: "",
            successMsg: "",
        }
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleUpdateButtonPressed  = this.handleUpdateButtonPressed.bind(this);
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


    handleUpdateButtonPressed(){
    const requestOptions = {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            votes_to_skip: this.state.votesToSkip,
            guest_can_pause: this.state.guestCanPause,
            code: this.props.roomCode,
        })
    };
    fetch('/api/update-room', requestOptions)
    .then((response) => {
        if (response.ok) {
           this.setState({
               successMsg: "Room updated successfully!",
           });
           this.props.updateCallback(); // <-- call this on success!
        }
        else {
            this.setState({
               errorMsg: "Failed to update room.",
           });
        }
    })
    .catch((error) => {
        console.error('Error updating room:', error);
        this.props.updateCallback();
    });
}

    renderCreateButtons() {
        return (
            <Grid container spacing={1}>
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

    renderUpdateButtons() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.handleUpdateButtonPressed}>
                        Update Room
                    </Button>
                </Grid>
            </Grid>
        );
    }

    render(){

        const title = this.props.update ? "Update Room" : "Create a Room";

        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                   <Collapse in={this.state.errorMsg !== "" || this.state.successMsg !== ""}>
                       {this.state.successMsg}
                   </Collapse>
               </Grid>
               <Grid item xs={12} align="center">
                   <Typography variant="h4" component="h4">
                       {title}
                   </Typography>
               </Grid>
               <Grid item xs={12} align="center">
                   <FormControl component="fieldset">
                       <FormHelperText>
    <span style={{ display: "block", textAlign: "center" }}>
        Guest Control of Playback State
    </span>
</FormHelperText>
                        <RadioGroup row defaultValue={this.props.guestCanPause.toString()} onChange={this.handleGuestCanPauseChange}>
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
                       defaultValue={this.state.votesToSkip} 
                       inputProps={{min:1, style:{textAlign:"center"}}}/>
                       <FormHelperText>
    <span style={{ display: "block", textAlign: "center" }}>
        Votes Required to Skip Song
    </span>
</FormHelperText>
                   </FormControl>
               </Grid>
               {this.props.update ? this.renderUpdateButtons() : this.renderCreateButtons() }
            </Grid>
        );
    }
}

export default CreateRoomPageWithRouter;
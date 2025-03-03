import React, { Component} from "react";
import { Link, Navigate, Routes, Route } from "react-router-dom";

import {Grid, Button, ButtonGroup, Typography} from '@mui/material';

export default class HomePage extends Component {
    
    constructor(props){
        super(props);
        this.state = {roomCode: null};
    }

    async componentDidMount(){
        fetch('/api/user-in-room')
        .then((response) => response.json())
        .then((data) => {
            this.setState({roomCode: data.code});
        });
    }

    renderHomePage(){
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" component={Link} to='/join'>Join a Room</Button>
                        <Button color="secondary" component={Link} to='/create'>Create a Room</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        )
    }

    render(){
        return (
            <Routes>
                <Route 
                    path="/" 
                    element={this.state.roomCode ? <Navigate to={`/room/${this.state.roomCode}`} /> : this.renderHomePage()}
                />
            </Routes>
        )
    }
}
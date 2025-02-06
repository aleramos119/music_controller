import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { Room } from "./Room";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="center">
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/join" element={<RoomJoinPage />} />
                    <Route path="/create" element={<CreateRoomPage />} />
                    <Route path='/room/:roomCode' element={<Room />} />
                </Routes>
            </Router>
            </div>
            
        );
    }
}
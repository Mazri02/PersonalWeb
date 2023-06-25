import React from 'react';
import Navbar from './Component/Navbar/Navbar.js';
import Homepage from './Component/Project/Project.js';
import SideBio from './Component/SideBio/SideBio.js';
import Skills from './Component/Skills/Skills.js';
import Journey from './Component/Journey/Journey.js';
import Albums from './Component/Albums/Albums.js';
import Contact from './Component/Contact/Contact.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import $ from 'jquery';

class App extends React.Component{
    render() { 
        return <React.Fragment>
                <Navbar/>
                <div className='ProfileContainer'>
                    <div className='biodata'>
                        <SideBio/>    
                    </div>
                    <div className='BioContent'>
                        <Journey/>
                        <Skills/>
                        <Homepage/>
                    </div>
                </div>
                
                <div className='ContactContainer'>    
                    <Contact/>
                </div>
                
                <div className='AlbumContainer'>
                    <Albums/>
                </div>
            </React.Fragment>
        };
    }

export default App;
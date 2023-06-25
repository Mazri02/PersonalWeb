import React from 'react';
import './SideBio.css';
import $ from 'jquery';

class SideBio extends React.Component{
    constructor(props){
        super(props)
    }
    
    render() { 
        return <React.Fragment>
                <div className='BioCont'>
                    <div className='BioPict'>
                        <div className='SideBioDesc'>
                            <div className='PersonalPict'/>
                            <div className='PersonaTitle'><span className='PersonaName'>Muhd Azri Mokhzani</span><br/>FullStack Developer</div>
                            <div className='PersonaDesc'>21 years old graduated from Universiti Teknologi Mara (2023) with a Diploma Of Science Computer. Excited to learn new things and able to adapt to working environment. Has a deep passion in coding and logical thinking</div>
                            <div className='PersonaContact'>
                                <img src='./Picture/whatsapp.png' className='PictIcon'/>+60 10-8332560<br/>
                                <img src='./Picture/gmail.png' className='PictIcon'/>azri.mokhzani@gmail.com<br/>
                                <img src='./Picture/instagram.png' className='PictIcon'/>mazri_02
                            </div>
                            <button className='DownResume'>Download Resume</button>
                        </div>    
                        <div className='BlurredBorder _Bottom'/>
                    </div>
                </div>
            </React.Fragment>
        };
    }

export default SideBio;
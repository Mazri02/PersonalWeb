import React from 'react';
import './Skills.css';
import $ from 'jquery';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Skills extends React.Component{
    constructor(props){
        super(props);
    }
    
    animateProgress(e){
        console.log($(e.target).parent().find('.Basic').children())
        $(e.target).parent().find('.Basic').children().animate({ 
            width: '45%'
        }, 1000);
        
        $(e.target).parent().find('.Average').children().animate({ 
            width: '62%'
        }, 1000);
        
        $(e.target).parent().find('.Excellent').children().animate({ 
            width: '84%'
        }, 1000);
        
        $(e.target).parent().find('.Advanced').children().animate({ 
            width: '100%'
        }, 1000);
    }
    
    deanimateProgress(e){
        $(e.target).parent().find('.Basic').children().animate({ 
            width: '0%'
        }, 300);
        
        $(e.target).parent().find('.Average').children().animate({ 
            width: '0%'
        }, 300);
        
        $(e.target).parent().find('.Excellent').children().animate({ 
            width: '0%'
        }, 300);
        
        $(e.target).parent().find('.Advanced').children().animate({ 
            width: '0%'
        }, 300);
    }
    
    render() {
        return <React.Fragment>
                <div className='BlurredBorder'/>
                <div className='SkillsContent ContrainerSnap' id='Skill'>
                    <div className='SkillHolder' onMouseEnter={(e) => this.animateProgress(e)} onMouseLeave={(e) => this.deanimateProgress(e)}>
                            <div className='SkillDesc'>
                                <div className='SkillDesc_Content'>
                                    <span className='SkillTitle'>Frontend Development</span><br/>
                                        Proficient in HyperText Markup Language, Cascading Style Sheet ver. 6 & Javascript
                                        <div className='ExpertiseStats'>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>HTML v5</div>
                                                <ProgressBar className='progressBar Excellent' now={0} label='Excellent' />  
                                            </div>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>CSS v4.15</div>
                                                <ProgressBar className='progressBar Advanced' now={0} label='Advanced' />  
                                            </div>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>JS ES2019</div>
                                                <ProgressBar className='progressBar Average' now={0} label='Average' />  
                                            </div>
                                        </div>
                                </div>
                            </div>
                            <div className='ExpertiseText'>FRONTEND DEVS</div>
                        <div className='Expertise P1_Content'>
                        </div>
                    </div>
                    <div className='SkillHolder' onMouseEnter={(e) => this.animateProgress(e)} onMouseLeave={(e) => this.deanimateProgress(e)}>
                        <div className='SkillDesc'>
                                <div className='SkillDesc_Content'>
                                    <span className='SkillTitle'>Backend Development</span><br/>
                                        Fluent in HyperText Processor (PHP) & Database Management System (MYSQL) in handling handful amount of data
                                        <div className='ExpertiseStats'>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>PHP v8.2</div>
                                                <ProgressBar className='progressBar Advanced' now={0} label='Advanced' />  
                                            </div>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>MySQL v8.0</div>
                                                <ProgressBar className='progressBar Excellent' now={0} label='Excellent' />  
                                            </div>
                                        </div>
                                </div>
                            </div>
                        <div className='ExpertiseText'>BACKEND DEVS</div>
                        <div className='Expertise P2_Content'></div>
                    </div>
                    <div className='SkillHolder' onMouseEnter={(e) => this.animateProgress(e)} onMouseLeave={(e) => this.deanimateProgress(e)}>
                        <div className='SkillDesc'>
                                <div className='SkillDesc_Content'>
                                    <span className='SkillTitle'>Basic Programming Lang.</span><br/>
                                        Advance knowledge of programming languages such as Java, C++, Python and Prolog 
                                        <div className='ExpertiseStats'>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>Java JDK20</div>
                                                <ProgressBar className='progressBar Excellent' now={0} label='Excellent' />  
                                            </div>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>C++20</div>
                                                <ProgressBar className='progressBar Average' now={0} label='Average' />  
                                            </div>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>Python v3.11</div>
                                                <ProgressBar className='progressBar Basic' now={0} label='Basic' />  
                                            </div>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>Prolog v9.0</div>
                                                <ProgressBar className='progressBar Average' now={0} label='Average' />  
                                            </div>
                                        </div>
                                </div>
                            </div>
                        <div className='ExpertiseText'>BASIC LANGUAGE</div>
                        <div className='Expertise P3_Content'></div>
                    </div>
                    <div className='SkillHolder' onMouseEnter={(e) => this.animateProgress(e)} onMouseLeave={(e) => this.deanimateProgress(e)}>
                        <div className='SkillDesc'>
                                <div className='SkillDesc_Content'>
                                    <span className='SkillTitle'>Fundamental Algorithm</span><br/>
                                        Capable to implements the fundamental algorithm in several programming language 
                                        <div className='ExpertiseStats'>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>Sorting</div>
                                                <ProgressBar className='progressBar Average' now={0} label='Average' />  
                                            </div>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>Obj. Oriented</div>
                                                <ProgressBar className='progressBar Excellent' now={0} label='Excellent' />  
                                            </div>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>Data Structure</div>
                                                <ProgressBar className='progressBar Advanced' now={0} label='Advanced' />  
                                            </div>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>Logic Statement</div>
                                                <ProgressBar className='progressBar Advanced' now={0} label='Advanced' />  
                                            </div>
                                        </div>
                                </div>
                            </div>
                        <div className='ExpertiseText'>COMMON ALGORITHM</div>
                        <div className='Expertise P4_Content'></div>
                    </div>
                    <div className='SkillHolder' onMouseEnter={(e) => this.animateProgress(e)} onMouseLeave={(e) => this.deanimateProgress(e)}>
                        <div className='SkillDesc'> 
                                <div className='SkillDesc_Content'>
                                    <span className='SkillTitle'>Basic Microsoft Apps</span><br/>
                                        Proficient in Microsoft Apps besides possesses expertise in utilizing the advanced features and functionalities
                                        <div className='ExpertiseStats'>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>MS Word</div>
                                                <ProgressBar className='progressBar Advanced' now={0} label='Advanced' />  
                                            </div>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>MS Excel</div>
                                                <ProgressBar className='progressBar Advanced' now={0} label='Advanced' />  
                                            </div>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>MS Powerpoint</div>
                                                <ProgressBar className='progressBar Excellent' now={0} label='Excellent' />  
                                            </div>
                                        </div>
                                </div>
                            </div>
                        <div className='ExpertiseText'>MICROSOFT APPS</div>
                        <div className='Expertise P5_Content'></div>
                    </div> 
                    <div className='SkillHolder' onMouseEnter={(e) => this.animateProgress(e)} onMouseLeave={(e) => this.deanimateProgress(e)}>
                        <div className='SkillDesc'>
                                <div className='SkillDesc_Content'>
                                    <span className='SkillTitle'>Adobe Editing Software</span><br/>
                                        Has basic proficiency in Adobe apps while able to perform simple tasks with some accuracy.
                                        <div className='ExpertiseStats'>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>Photoshop</div>
                                                <ProgressBar className='progressBar Excellent' now={0} label='Excellent' />  
                                            </div>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>Premiere Pro</div>
                                                <ProgressBar className='progressBar Average' now={0} label='Average' />  
                                            </div>
                                            <div className='StatsContent'>
                                                <div className='StatsTitle'>After Effect</div>
                                                <ProgressBar className='progressBar Basic' now={0} label='Basic' />  
                                            </div>
                                        </div>
                                </div>
                            </div>
                        <div className='ExpertiseText LastChild'>ADOBE APPS</div>
                        <div className='Expertise P6_Content'></div>
                    </div>    
                </div>
                <div className='BlurredBorder'/>
            </React.Fragment>
        };
    }

export default Skills;
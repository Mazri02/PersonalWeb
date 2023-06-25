import React from 'react';
import './Journey.css';
import $ from 'jquery';

class Journey extends React.Component{
    constructor(props){
        super(props)
        this.isClicked = false;
        this.state = {
            isHover :false
        }
        
        this.ChangeWidth = this.ChangeWidth.bind(this)
    }
    
    componentDidMount() {
        var ReactObj = this;
        var givenId = 0,currentNumber = 0;
        
        $('.JourneyExpCont').scroll(function(event){
            event.preventDefault()
            var JourneyPosition = $('.picholder').offset()
            var currentWidth = parseInt(((window.innerWidth - JourneyPosition.left)/3)/100);
                        
                if(currentWidth == 1) {
                    $($('.IconJourneyNav').children()[0]).removeClass('FirstChildHover'+givenId).addClass('FirstChildNotHover')
                    givenId = 0
                    $($('.IconJourneyNav').children()[0]).addClass('FirstChildHover'+givenId).removeClass('FirstChildNotHover')
                } else if(currentWidth == 2 || currentWidth == 3) {
                    $($('.IconJourneyNav').children()[0]).removeClass('FirstChildHover'+givenId).addClass('FirstChildNotHover')
                    givenId = 30
                    $($('.IconJourneyNav').children()[0]).addClass('FirstChildHover'+givenId).removeClass('FirstChildNotHover')
                } else if(currentWidth == 3 || currentWidth == 4) {
                    $($('.IconJourneyNav').children()[0]).removeClass('FirstChildHover'+givenId).addClass('FirstChildNotHover')
                    givenId = 70
                    $($('.IconJourneyNav').children()[0]).addClass('FirstChildHover'+givenId).removeClass('FirstChildNotHover')
                }
        })
        
        $('.picholder').hover(function(e){
        })
    }
    
    ChangeWidth(givenId){
        $($('.IconJourneyNav').children()[0]).addClass('FirstChildHover'+givenId).removeClass('FirstChildNotHover')
    }
    
    render() { 
        return <React.Fragment>
                <div className='JourneyContent ContainerSnap' id='Journey'>
                    <div className='JourneyExpCont'>
                        <div className='ContentLow'>
                            <div className='picholder' onMouseEnter={() => this.ChangeWidth('0')} onMouseLeave={
                                () => $($('.IconJourneyNav').children()[0]).removeClass('FirstChildHover0').addClass('FirstChildNotHover')
                                }> 
                                <div className='imgLow'></div>
                                    <div className='expContainer'>
                                        <div className='description'>
                                            <div className='JourneyTitle'>SK Taman Seri Gombak (2008 - 2014)</div>
                                            During my middle school years, I achieved excellent results in the final UPSR examination, scoring 4A 1B. UPSR assesses primary school students' proficiency in various subjects. I excelled academically each grade, participated actively in co-curricular activities, and attended religious KAFA classes in the evenings, showing dedication to both secular and religious education.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='ContentHigh' >
                                <div className='picholder' onMouseEnter={() => this.ChangeWidth('30')} onMouseLeave={
                                        () => $($('.IconJourneyNav').children()[0]).removeClass('FirstChildHover30').addClass('FirstChildNotHover')
                                     }> 
                                    <div className='imgHigh'></div>  
                                        <div className='expContainer'>
                                            <div className='description'>
                                                <div className='JourneyTitle'>SMA Al-Ittifaqiyyah (2014 - 2019)</div>
                                                I enrolled at SMA Ittifaqiyyah Guai in Bera, Pahang after I have finished middle school, I was a committed and ambitious student who actively sought opportunities to improve my education. I was competitive in various regional competitions, engaged in several clubs, and maintained my focus on academic excellence. As a result of my hard work and dedication, I achieved exceptional results in my Sijil Peperiksaan Malaysia (SPM) exams, earning 8A's and 1B in my final year of high school. 
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='ContentKolej' >
                                <div className='picholder' onMouseEnter={() => this.ChangeWidth('70')} onMouseLeave={
                                        () => $($('.IconJourneyNav').children()[0]).removeClass('FirstChildHover70').addClass('FirstChildNotHover')
                                     }> 
                                    <div className='imgUitm'></div>  
                                        <div className='description'>
                                            <div className='JourneyTitle'>UiTM Kampus Raub (2020 - 2023)</div>
                                             After working full-time at a local restaurant for a year, I finally got admission, only for the pandemic to hit, and Malaysia to be placed under lockdown. This meant that I had to adjust to the Open Distance Learning (ODL) system for three semesters. Despite the difficulties, I managed to join a club in my second semester and was appointed as the Head of Multimedia, where I developed my leadership and communication skills. I persevered, and my hard work paid off with a remarkable CGPA of 3.91 upon graduation.
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                                         
                <div className='JourneyIcon'>
                    <ul className='IconJourneyNav'>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </React.Fragment>
        };
    }

export default Journey;
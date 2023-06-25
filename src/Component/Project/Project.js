import React,{useState} from 'react';
import './Project.css';
import $ from 'jquery';
import CodeMirror from '@uiw/react-codemirror';
import {java} from '@codemirror/lang-java';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import axios from 'axios';

class Homepage extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            code : '\n'.repeat(50),
            fontSize : 10,
            zoomLevel : 100,
            hasClicked: false,
            ProjectURL :''
        }
        
        this.ShowPoster = this.ShowPoster.bind(this)
        this.ShowProject = this.ShowProject.bind(this)
        this.ShowDocs = this.ShowDocs.bind(this)
        this.ZoomPicture = this.ZoomPicture.bind(this)
        this.FontSize = this.FontSize.bind(this)
        this.ChangeColourButton = this.ChangeColourButton.bind(this)
    }
    
    ShowPoster(id,size){
        $('.PosterPreview').css('background-image', 'url("./Poster/'+id+'.png")');
        
        if(size == 'S'){
            $('.PosterPreview').css('background-size', '90%');
        } else if(size == 'XS'){
            $('.PosterPreview').css('background-size', '60%');
        } else {
            $('.PosterPreview').css('background-size', '100%');
        }
    }
    
    ZoomPicture(event){
        $('.PosterPreview').css('width',event + '%')
        $('.PosterPreview').css('height',event + '%')
        $('.PosterBackG').css('width',event + '%')
        $('.PosterBackG').css('height',event + '%')
        this.setState({zoomLevel:event})
    }
    
    ChangeColourButton(e) {
        if(this.state.hasClicked){
            $('.HeaderButton button').css('color','white')
            $('.HeaderButton button').removeAttr('disabled')
            $(e.target).css('color','#b4b4b4')
            $(e.target).prop('disabled','true')                                  
            $('.PosterCont').fadeIn(500);                              
            $('.PDFQuestion').fadeIn(500);  
            $('.CodeNote').css('overflow','hidden');
            $('.CodeMirror').hide();
            $('.FontSize').hide();                                 
            $('.ChangeFontSize').hide();                                
            $('.FooterButton').hide();                              
            $('.ChangeZoomPicture').hide();                              
            $('.ZoomLevel').hide();
        }
    }
    
    FontSize(e){
        $('.CodeMirror').css('font-size',e + 'px')
        this.setState({fontSize:e})
    }
    
    ShowProject(event){
        this.setState({code: '\n'.repeat(50)})
        this.ShowDocs(event)
        axios.get('./Project/Algo/'+ event +'.java').then(
            (response) => {
                this.setState({code:response.data})
            }
        )
    }
    
    ShowDocs(source) {
        $('.PDFQuestion').attr('src','./Project/Question/'+source+'.pdf')
    }

    render() { 
      var mouseDown = false;
      var scrollStartPos, scrollPos = 0, scrollStartY = 0, scrollStartX = 0, scrollLeft = 0, scrollTop = 0;

      $(document).on('mousedown', '.ProjectContainer', function(event) {
        mouseDown = true;
        scrollStartPos = event.pageX - $(this).offset().left;
        scrollPos = $(this).scrollLeft();
      }).on('mouseup', function() {
        mouseDown = false;
      }).on('mousemove', '.ProjectContainer', function(event) {
        if (mouseDown) {
          $(this).scrollLeft(scrollPos - (event.pageX - $(this).offset().left - scrollStartPos));
        }
      });
      
    $(document).on('mousedown', '.PosterCont', function(event) {
      mouseDown = true;
      scrollStartX = event.pageX - $(this).offset().left;
      scrollStartY = event.pageY - $(this).offset().top;
      scrollLeft = $(this).scrollLeft();
      scrollTop = $(this).scrollTop();
    }).on('mouseup', function() {
      mouseDown = false;
    }).on('mousemove', '.PosterCont', function(event) {
      if (mouseDown) {
        const scrollX = scrollLeft - (event.pageX - $(this).offset().left - scrollStartX);
        const scrollY = scrollTop - (event.pageY - $(this).offset().top - scrollStartY);
        $(this).scrollLeft(scrollX);
        $(this).scrollTop(scrollY);
      }
    });
        
        return <React.Fragment>
                <div className='HomepageContent ContainerSnap' id='Project'>
                    <div className='ProjectPreview'>
                        <div className='CodeContent'>
                            <div className='CodeTitle'>
                                <div className='ActionButton HeaderButton'>
                                    <button className='Question' onClick={(e) => {  
                                      this.ChangeColourButton(e)   
                                     }
                                    }>Documentation</button>
                                    <button className='SourceCode' onClick={(e) => this.ChangeColourButton(e)} disabled>Source Code</button>
                                    <button className='Multimedia' onClick={(e) => this.ChangeColourButton(e)} disabled>Multimedia</button>
                                </div>
                            </div>
                            <div className='CodeNote'>
                                <CodeMirror className='CodeMirror' theme={okaidia} value={this.state.code}/>
                                <div className='PosterCont'>
                                    <iframe className='PDFQuestion'/>
                                    <div className='PosterPreview'/>
                                    <div className='PosterBackG'>
                                        <span className='DescPoster'>Select a Project to View</span>    
                                    </div>
                                </div>
                                <embed></embed>
                            </div>
                            <div className='CodeFooter'>
                                <div className='sliderFont'>
                                    <input className='ChangeFontSize' type='range' min='9' max='20' value={this.state.fontSize} onChange={(e) => this.FontSize(e.target.value)}/>
                                    <input className='ChangeZoomPicture' type='range' min='100' max='200' value={this.state.zoomLevel} onChange={(e) => this.ZoomPicture(e.target.value)}/>
                                    <span className='FontSize'>{this.state.fontSize}px</span>
                                    <span className='ZoomLevel'>{this.state.zoomLevel}%</span>
                                </div>
                                <div className='ActionButton FooterButton'>
                                    <button className='Copy'>Copy</button>
                                    <button className='Execute'>Run Code</button>
                                </div>
                                <button className='Visit'
                                    onClick={() => window.open(this.state.ProjectURL)}>Visit Webpage</button>
                            </div>
                         </div>
                    </div>
                            
                            
                    <div className='ProjectList'>
                        <div className='ProjectListCont' onClick={() => {
                              this.setState({hasClicked:true})
                              $('.Question').trigger('click')
                              $('.CodeMirror').hide();
                              $('.PosterPreview').hide();
                              $('.CodeNote').css('overflow-y','hidden');
                              $('.PosterBackG').hide();
                              $('.FontSize').hide();                              
                              $('.ChangeFontSize').hide();                              
                              $('.FooterButton').hide();                              
                              $('.Visit').show();                              
                              $('.PDFQuestion').fadeIn(500);                              
                              $('.ChangeZoomPicture').hide();                      
                              $('.ZoomLevel').hide();
                            }
                        }>
                            <div className='ProjectTitle'>Web Development Project</div>                             
                                <div className='ProjectContainer CenterMinor'>
                                    <div className='ProjectItem'>
                                        <div className='ProjectContent'>
                                            <div className='ProjectIcon EventIcon' id='PERMATA' onClick={
                                                (e) => {
                                                    this.ShowDocs(e.target.id);
                                                    this.setState({ProjectURL:'https://csraub.uitm.edu.my/permata/'})
                                                }
                                            }>
                                        </div>
                                        <div className='ProjectDesc'>Event Registration  UiTM</div>
                                    </div> 
                                </div>

                                <div className='ProjectItem'>
                                    <div className='ProjectContent'>
                                        <div className='ProjectIcon MedsIcon' id='Unit Kesihatan' onClick={
                                                (e) => {
                                                    this.ShowDocs(e.target.id);
                                                    this.setState({ProjectURL:'https://csraub.uitm.edu.my/ukmedicare/'})
                                                }
                                            }></div>
                                        <div className='ProjectDesc'>UK Medicine Storage </div>
                                    </div> 
                                </div>  
                            </div> 
                        </div>
                                    
                        <div className='ProjectListCont' onClick={() => {
                              this.setState({hasClicked:true})
                              $('.SourceCode').trigger('click');
                              $('.CodeMirror').fadeIn(500);
                              $('.PosterPreview').hide();
                              $('.CodeNote').css('overflow-y','scroll');
                              $('.PosterCont').hide();
                              $('.PosterBackG').hide();
                              $('.FontSize').show();                              
                              $('.ChangeFontSize').show();                              
                              $('.FooterButton').show();                              
                              $('.Visit').hide();                              
                              $('.ChangeZoomPicture').hide();              
                              $('.Question').removeAttr('disabled')                 
                              $('.ZoomLevel').hide();
                              $('.HeaderButton button').css('color','white')
                              $('.SourceCode').css('color','#b4b4b4')
                              $('.SourceCode').prop('disabled','true')  
                            }
                        }>
                            <div className='ProjectTitle'>Programming Algorithm Project (with Docs)</div>    
                            <div className='ProjectContainer CenterMinor'>
                                <div className='ProjectItem'>
                                    <div className='ProjectContent'>
                                        <div className='ProjectIcon BookIcon' id='Venue Booking System' onClick={(e) => this.ShowProject(e.target.id)}></div>
                                        <div className='ProjectDesc'>Booking System<br/> (2020 Java)</div>
                                    </div> 
                                </div>

                                <div className='ProjectItem'>
                                    <div className='ProjectContent'>
                                        <div className='ProjectIcon DjiksIcon' id='Djikstra Programming' onClick={(e) => this.ShowProject(e.target.id)}></div>
                                        <div className='ProjectDesc'>Djikstra Algo<br/> (2021 Java)</div>
                                    </div> 
                                </div>

                                <div className='ProjectItem'>
                                    <div className='ProjectContent'>
                                        <div className='ProjectIcon CakeIcon' id='Bakery Interface' onClick={(e) => this.ShowProject(e.target.id)}></div>
                                        <div className='ProjectDesc'>E-Bakery Interface<br/> (2021 Java)</div>
                                    </div> 
                                </div> 
                            </div>
                        </div>
                        
                        <div className='ProjectListCont' onClick={() => {
                              $('.Multimedia').trigger('click');
                              $('.DescPoster').hide();
                              $('.PosterPreview').fadeIn(500);
                              $('.PosterCont').fadeIn(500);
                              $('.CodeNote').css('overflow','hidden');
                              $('.CodeMirror').hide();
                              $('.FontSize').hide();                              
                              $('.ChangeFontSize').hide();                                     
                              $('.PDFQuestion').hide();   
                              $('.HeaderButton button').css('color','white')
                              $('.Multimedia').css('color','#b4b4b4')
                              $('.Multimedia').prop('disabled','true')   
                              $('.Question').prop('disabled','true')   
                              $('.FooterButton').hide();                              
                              $('.Visit').hide();                              
                              $('.ChangeZoomPicture').show();                              
                              $('.PosterBackG').show();                              
                              $('.ZoomLevel').show();   
                            }
                        }>
                            <div className='ProjectTitle'>Multimedia Design</div>    
                            <div className='ProjectContainer'>

                                <div className='ProjectItem'>
                                    <div className='ProjectContent'>
                                        <div className='ProjectIcon MoonIcon' id='Maulidur Rasul' onClick={(e) => this.ShowPoster(e.target.id,'S')}></div>
                                        <div className='ProjectDesc'>Maulid Rasul<br/> 2021</div>
                                    </div> 
                                </div>  

                                <div className='ProjectItem'>
                                    <div className='ProjectContent'>
                                        <div className='ProjectIcon MicIcon' id='Live IG Talk' onClick={(e) => this.ShowPoster(e.target.id,'L')}></div>
                                        <div className='ProjectDesc'>Live IG Talk<br/> 2021</div>
                                    </div> 
                                </div>

                                <div className='ProjectItem'>
                                    <div className='ProjectContent'>
                                        <div className='ProjectIcon ExamIcon' id='Final Exam' onClick={(e) => this.ShowPoster(e.target.id,'L')}></div>
                                        <div className='ProjectDesc'>Final Exam<br/> 2022</div>
                                    </div> 
                                </div> 


                                <div className='ProjectItem'>
                                    <div className='ProjectContent'>
                                        <div className='ProjectIcon RamadanIcon' id='Ramadan' onClick={(e) => this.ShowPoster(e.target.id,'L')}></div>
                                        <div className='ProjectDesc'>Ramadhan <br/> 2022</div>
                                    </div> 
                                </div>  

                                <div className='ProjectItem'>
                                    <div className='ProjectContent'>
                                        <div className='ProjectIcon QuranIcon' id='Nuzul Al-Quran' onClick={(e) => this.ShowPoster(e.target.id,'S')}></div>
                                        <div className='ProjectDesc'>Nuzul Quran<br/> 2021</div>
                                    </div> 
                                </div>

                                <div className='ProjectItem'>
                                    <div className='ProjectContent'>
                                        <div className='ProjectIcon ClubIcon' id='Club Flyers' onClick={(e) => this.ShowPoster(e.target.id,'XS')}></div>
                                        <div className='ProjectDesc'>Club Flyers<br/>2022</div>
                                    </div> 
                                </div> 
                            </div>
                        </div>    
                    </div>
                </div>
            </React.Fragment>
        };
    }

export default Homepage;
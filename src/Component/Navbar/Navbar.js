import React from 'react';
import './Navbar.css';
import $ from 'jquery';

class Navbar extends React.Component{
    render() { 
        $(window).scroll(function(){
            var e = $(window).scrollTop();
            
            console.log(e)
            if(e <= 0){
                $('.scroll').css('width','0%')
            } else {
                $('.scroll').css('width','76%')
            }

            if(e >= parseInt($('.ContactContainer').position().top) - 100){
                $('.backgroundNavbar').removeClass('scroll').addClass('streched')
                $('.aboutMe').addClass('streched')
            } else {
                $('.backgroundNavbar').removeClass('streched').addClass('scroll')
                $('.aboutMe').removeClass('streched')
            }
        })
        
        return <React.Fragment>
              <div className='content'>
                  <div className='backgroundNavbar scroll'/>
                  <div className='aboutMe'>
                      <div className='webTitle'>
                        Personal Website Resume
                      </div>
                        
                      <ul className='links'>
                        <li><a href='#Journey'><img src='./Picture/destination.png' className='NavIcon'/><div className='NavTitle'>My Journey</div></a></li>
                        <li><a href='#Skill'><img src='./Picture/pencil.png' className='NavIcon'/><div className='NavTitle'>Skills</div></a></li>
                        <li><a href='#Project'><img src='./Picture/hammer.png' className='NavIcon'/><div className='NavTitle'>Projects</div></a></li>
                        <li><a href='#Contact'><img src='./Picture/telephone.png' className='NavIcon'/><div className='NavTitle'>Contacts</div></a></li>
                        <li><a href='#Fav_Album'><img src='./Picture/headphones.png' className='NavIcon'/><div className='NavTitle'>Fav Album</div></a></li>
                      </ul>
                  </div>
              </div>
            </React.Fragment>
        };
    }

export default Navbar;
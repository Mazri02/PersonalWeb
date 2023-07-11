import React from 'react';
import './Albums.css';
import $ from 'jquery';
import axios from 'axios';

class Albums extends React.Component{
    constructor(props){
        super(props);
        const topArts = [
            {
                name:'Aubrey Drake Graham (Drake)',
                alias: 'Drake',
                desc: 'a Canadian rapper, singer, and songwriter. An influential figure in contemporary popular music, Drake has been credited for popularizing singing and R&B sensibilities in hip hop.',
                profile:'Drake.png',
                collage:'DrakeCollage.png',
                personal:'DrakeProfile.png'
            },
            {
                name:'Kanye Omari West (Ye)',
                alias:'Kanye_West',
                desc: 'American producer, rapper, and fashion designer who parlayed his production success in the late 1990s and early 2000s into a career as a popular, critically acclaimed solo artist.',
                profile:'Kanye.png',
                collage:'KanyeCollage.png',
                personal:'KanyeProfile.png'
            },
            {
                name:'Daniel Dumile (MF Doom)',
                alias:'MF_Doom',
                desc: 'a British-American rapper and record producer. Noted for his intricate wordplay, signature metal mask, and "supervillain" stage persona, Dumile became a major figure of underground hip hop and alternative hip hop in the 2000s.',
                profile:'MFDoom.png',
                collage:'MFDoomCollage.png',
                personal:'MFDoomProfile.png'
            },
            {
                name:'Tyler Gregory Okonma (Tyler The Creator)',
                alias:'Tyler_Creator',
                desc: 'an American rapper and record producer. He is one of the founding members of the music collective Odd Future. Okonma has won two Grammy Awards, three BET Hip Hop Awards, a BRIT Award, and a MTV Video Music Award.',
                profile:'Tyler.png',
                collage:'TylerCollage.png',
                personal:'TylerProfile.png'
            },
            {
                name:'Abel Makkonen Tesfaye (The Weekend)',
                alias:'The_Weekend',
                desc: 'a Canadian singer-songwriter and actor. A prominent figure in contemporary popular music, he is noted for his unconventional music production, artistic reinventions, and his signature use of the falsetto register.',
                profile:'Weekend.png',
                collage:'WeekendCollage.png',
                personal:'WeekendProfile.png'
            },
            {
                name:'Kendrick Lamar Duckworth (Kendrick)',
                alias:'Kendrick_Lamar',
                desc: 'an American rapper and songwriter. Known for his progressive musical styles and socially conscious songwriting, he is often considered one of the most influential hip hop artists of his generation.',
                profile:'Kendrick.png',
                collage:'KendrickCollage.png',
                personal:'KendrickProfile.png'
            },
            {
                name:'Hykeem Jamaal Carter Jr. (Baby Keem)',
                alias:'Baby_Keem',
                desc: 'an American rapper and record producer. He initially gained major recognition following the release of his single "Orange Soda", from his second mixtape Die For My Bitch.',
                profile:'BabyKeem.png',
                collage:'BabyKeemCollage.png',
                personal:'BabyKeemProfile.png'
            },
            {
                name:'Jahseh Dwayne Onfroy (XXXTentacion)',
                alias:'XXXTentacion',
                desc: 'an American rapper and singer-songwriter due to his widely publicized legal troubles, XXXTentacion gained a cult following among his young fanbase during his short career with his depression- and alienation-themed music',
                profile:'XXXTentacion.png',
                collage:'XXXTentacionCollage.png',
                personal:'XXXTentacionProfile.png'
            },
        ];
        
        this.scrollContainerRef = React.createRef();
        this.PauseSong = this.PauseSong.bind(this)
        this.ChangeArtist = this.ChangeArtist.bind(this)
        this.ListAllSong = this.ListAllSong.bind(this)
        this.searchforAlbums = this.searchforAlbums.bind(this)
        this.calculateDuration = this.calculateDuration.bind(this)
        this.previousSong = this.previousSong.bind(this)
        this.nextSong = this.nextSong.bind(this)
        this.previewSong = this.previewSong.bind(this)
        this.state = {
            topArtist : topArts,
            PauseVid : false,
            currentAlbum: [],
            currentArtist:'',
            currentSongIndex: 0,
            currentTimeStamp: '0:00',
            currentTimeFrame: 0,
            currentSong: [],
            intervalID: null,
            clickedAlbum:''
        }
    }
    
    calculateDuration(duration,pause){
        var currentDuration = '';
        var timeMinute = duration.split(':')[0]
        var timeSeconds = duration.split(':')[1]
        var ReactObj = this
        var timerCount = 0;
        timeSeconds = parseInt(timeSeconds) + parseInt(timeMinute*60);
        
        $('.MVTime').attr('max',timeSeconds)
        if(this.state.intervalID !== null){
            clearInterval(this.state.intervalID)
        }
        
        if(pause){
            timerCount = this.state.currentTimeFrame
        } else {
            timerCount = 1
        }
        
        ReactObj.setState({intervalID: 
            setInterval(function(){
                if(parseInt(timeSeconds%60) >= 0) {
                    var min = parseInt((timeSeconds/60))
                    var sec = parseInt(timeSeconds%60)
                    min = min < 10 ? "0" + min : min;
                    sec = sec < 10 ? "0" + sec : sec;

                    currentDuration = min + ":" + sec;
                    ReactObj.setState({currentTimeStamp:currentDuration})
                    ReactObj.setState({currentTimeFrame:timerCount++})
                    timeSeconds--;
                } else {
                    clearInterval(ReactObj.state.intervalID)
                    ReactObj.setState({currentTimeStamp:'0:00'})
                    ReactObj.setState({currentTimeFrame:0})
                    ReactObj.nextSong()
                }
            },1000)
          })
    }
    
    previousSong(){
        if(this.state.currentSongIndex - 1 >= 0 && this.state.currentSongIndex - 1 < this.state.currentSong.length){
            var prevSong = this.state.currentSong[this.state.currentSongIndex - 1];
            $('.MVPreview').attr('src','https://www.youtube.com/embed/'+prevSong.Video_ID+'?controls=0;&version=3;&showInfo=0;&rel=0;&enablejsapi=1;&autoplay=1')
            $('.BlurredPreview').attr('src','https://www.youtube.com/embed/'+prevSong.Video_ID+'?controls=0;&version=3;&showInfo=0;&rel=0;&enablejsapi=1;&autoplay=1;&mute=1')
            
            $('.SongName').html(prevSong.Song_Title)
            $('.SongAlbum').html(this.state.clickedAlbum)
            $('.SongCreator').html(this.state.currentArtist)

            if(!this.state.PauseVid){
                import('../../Images/SongBundle/pause.png').then((k) => {
                    $('.PlaySong').css('background-image','url('+k.default+')')
                })

                $('.MVPreview').each(function(){
                    this.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
                });
                this.setState({PauseVid:true})
            }
            
            this.setState({currentSongIndex: this.state.currentSongIndex - 1})
            setTimeout(this.calculateDuration(prevSong.Duration,false),1500)
        }
    }
    
    nextSong(){
        if(this.state.currentSongIndex + 1 < this.state.currentSong.length && this.state.currentSongIndex + 1 >= 0){
            var nextSong = this.state.currentSong[this.state.currentSongIndex + 1];
            $('.MVPreview').attr('src','https://www.youtube.com/embed/'+nextSong.Video_ID+'?controls=0;&version=3;&showInfo=0;&rel=0;&enablejsapi=1;&autoplay=1')
            $('.BlurredPreview').attr('src','https://www.youtube.com/embed/'+nextSong.Video_ID+'?controls=0;&version=3;&showInfo=0;&rel=0;&enablejsapi=1;&autoplay=1;&mute=1')
            
            $('.SongName').html(nextSong.Song_Title)
            $('.SongAlbum').html(this.state.clickedAlbum)
            $('.SongCreator').html(this.state.currentArtist)

            if(!this.state.PauseVid){
                import('../../Images/SongBundle/pause.png').then((k) => {
                    $('.PlaySong').css('background-image','url('+k.default+')')
                })

                $('.MVPreview').each(function(){
                    this.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
                });
                this.setState({PauseVid:true})
            }

            this.setState({currentSongIndex: this.state.currentSongIndex + 1})
            setTimeout(this.calculateDuration(nextSong.Duration,false),1500)
            
        }
    }
    
    previewSong(videoId,artistName,songTitle,currentSong,duration){
        $('.MVPreview').attr('src','https://www.youtube.com/embed/'+videoId.target.id+'?controls=0;&version=3;&showInfo=0;&rel=0;&enablejsapi=1;&autoplay=1')
        $('.BlurredPreview').attr('src','https://www.youtube.com/embed/'+videoId.target.id+'?controls=0;&version=3;&showInfo=0;&rel=0;&enablejsapi=1;&autoplay=1;&mute=1')
        
        $('.SongName').html(songTitle)
        $('.SongAlbum').html(this.state.clickedAlbum)
        $('.SongCreator').html(this.state.currentArtist)
        
        if(!this.state.PauseVid){
            import('../../Images/SongBundle/pause.png').then((k) => {
                $('.PlaySong').css('background-image','url('+k.default+')')
            })
            
            $('.MVPreview').each(function(){
                this.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
            });
            this.setState({PauseVid:true})
        }
        
        this.setState({currentSongIndex:currentSong})
        setTimeout(this.calculateDuration(duration,false),1500)
    }
    
    ListAllSong(songName){
        this.setState({clickedAlbum: songName})
        import('../../SongAlbum/'+this.state.currentArtist+ '/' +songName+'/'+songName+'.json').then((response) => {
            this.setState({currentSong:response.default})
            
            if(response.default.length < 8){
                $('.MusicCat').css('overflow-y','hidden')
            } else {
                $('.MusicCat').css('overflow-y','scroll')
            }
        })
    }
    
    ChangeArtist(collage,picture,name,desc){
        $('.ArtistProfile').hide();
        $('.ArtistCollage').hide();
        
        import('../../Images/SongBundle/Artist/'+picture+'').then((k) => {
            $('.ArtistProfile').css('background-image','url('+k.default+')')
        })
        
        import('../../Images/SongBundle/Artist/'+collage+'').then((k) => {
            $('.ArtistCollage').css('background-image','url('+k.default+')')
        })
        
        $('.ArtistCollage').fadeIn(300);
        $('.ArtistProfile').fadeIn(600);
        $('.ArtistName').text(name)
        $('.ArtistSmallDesc').text(desc)
    }
    
    searchforAlbums(name){
        axios.get('http://192.168.0.126:3001/SongAlbum', { params: { directoryPath  : name } }).then(response => {  
            this.setState({currentAlbum:response.data});
            this.setState({currentArtist:name})

            const imagePromises = response.data.map(album => {
              const imagePath = `./Album Covers/${album}.png`;
              return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error(`Failed to load image: ${imagePath}`));
                img.src = imagePath;
              });
            });

            Promise.all(imagePromises)
              .then(images => {
                images.forEach((img, i) => {
                  const AlbumPath = response.data[i].split('.png')[0].split(' ').join('_');
                  $('#' + AlbumPath).css('background-image', `url("${img.src}")`);
                });
              })
              .catch(error => {
                console.error('Error preloading images:', error);
              })
          }).catch(error => {
            console.error('Error scanning directory:', error);
          })
        
        setTimeout(function(){
            $('.AlbumNo0').trigger('click')
        },500)
    }
    
    PauseSong(){
        if(!this.state.PauseVid){
            import('../../Images/SongBundle/pause.png').then((k) => {
                $('.PlaySong').css('background-image','url('+k.default+')')
            })
            
            $('.MVPreview').each(function(){
                this.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
            });
            
            this.calculateDuration(this.state.currentTimeStamp,true)
            this.setState({PauseVid:true})
        } else {
            import('../../Images/SongBundle/play-button.png').then((k) => {
                $('.PlaySong').css('background-image','url('+k.default+')')
            })
            
            $('.MVPreview').each(function(){
                this.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
            });
            
            this.setState({PauseVid:false})
            clearInterval(this.state.intervalID)
        }
    }
    
    componentDidMount(){
        this.state.topArtist.forEach(e => {
            import('../../Images/SongBundle/Artist/'+e.personal+'').then((k) => {
                $('.' + e.alias).css('background-image','url('+k.default+')')
            })
        })
        
        $('.Drake').trigger('click')
        setTimeout(function(){
            $('.AlbumNo0').trigger('click')
        },1500)
    }
    
    render() {  
        return <React.Fragment>
            <div className='AlbumCont ContainerSnap' id='Fav_Album'>
                <div className='LeftMusic'>
                    <div className='MusicCat'>
                        {
                            this.state.currentSong.map((e,index) => {
                                return <div className='SongCont' key={e.Video_ID} onClick={(n) => this.previewSong(n,this.state.currentArtist,e.Song_Title,index,e.Duration)}>
                                    <img className='SongPic' id={e.Video_ID} loading='lazy' src={`https://img.youtube.com/vi/${e.Video_ID}/default.jpg`}/>
                                    <div className='SongDesc' id={e.Video_ID}>
                                        <div className='SongTitle' id={e.Video_ID}>{e.Song_Title}</div> 
                                            {e.Duration}<br/>
                                            {this.state.currentArtist}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    
                    <div className='AlignAlbumCat'>
                        <div className='AlbumCat' ref={this.scrollContainerRef}>
                            {
                                this.state.currentAlbum.map((e,index) => (
                                    <div className='AlbumHold' key={index}>
                                        <div className={'AlbumPic AlbumNo'  + index} id={e.split('.png')[0].split(' ').join('_')} onClick={(e) => this.ListAllSong(e.target.id.split("_").join(" "))}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    
                    <div className='AlbumBlurred BlurRight'/>
                </div>
                        
                <div className='MiddleMusic'>
                    <iframe className='MVPreview BlurredPreview' frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="no-referrer-when-downgrade" allowFullScreen></iframe>
                    <iframe className='MVPreview' title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="no-referrer-when-downgrade" allowFullScreen></iframe>
                    <div className='MVTitle'>
                        <div className='SongName'>How to View Music Video?</div>
                        <div className='SongAlbum'>Choose a Song in the Album or </div>
                        <div className='SongCreator'>Select Different Artist to View Other Album</div>
                    </div>
                    
                    <div className='TimeStamp'>
                        <progress className='MVTime' value={this.state.currentTimeFrame} min='0' readOnly/>
                        <div className='CurrentPlaytime'>{this.state.currentTimeStamp}</div>
                    </div>
                        
                    <div className='MVControl'>
                        <button className='PrevSong SongButton' onClick={() => this.previousSong()}/>    
                        <button className='PlaySong SongButton' onClick={() => this.PauseSong()}/>    
                        <button className='NextSong SongButton' onClick={() => this.nextSong()}/>    
                    </div>       
                </div>
                        
                <div className='RightMusic'>
                    <div className='AlbumBlurred BlurLeft'/>
                    <div className='RightContM'>
                        <div className='ArtistList'>
                            <div className='ArtistCat'>
                                {
                                    this.state.topArtist.map((e,index) => (
                                        <div className='ArtistHold' key={index} onClick={() => this.ChangeArtist(e.collage,e.profile,e.name,e.desc)}>
                                            <div className={'ArtistPic ' + e.alias} onClick={() => this.searchforAlbums(e.alias.replace('_'," "))}/>
                                            <div className='ArtistDesc'>
                                                {e.alias.replace('_'," ")}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                                <div className='ArtistExp'/>
                                <div className='ArtistCollage'/>
                                <div className='ArtistProfile'/>
                                <div className='ArtistJourney'>
                                    <div className='ArtistName'></div>
                                    <div className='ArtistSmallDesc'>
                                         an American rapper and record producer. He is one of the founding members of the music collective Odd Future. Okonma has won two Grammy Awards, three BET Hip Hop Awards, a BRIT Award, and a MTV Video Music Award.
                                    </div>
                                </div>
                            </div>
                    </div>
            </div>
        </React.Fragment>
        };
    }

export default Albums;  
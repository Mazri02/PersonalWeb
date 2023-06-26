import React from 'react';
import './Contact.css';
import $ from 'jquery';
import axios from 'axios';

class Contact extends React.Component{
    constructor(props){
        super(props);
        this.ChoosePayment = this.ChoosePayment.bind(this)
        this.sendEmail = this.sendEmail.bind(this)
    }
    
    sendEmail() {
        var inputValue = $('.InspireInput').find('.InputVal');
        var numOfErr = 0;
        var isLoading = false;
        
        for(var j = 0;j < inputValue.length;j++){
            if(inputValue[j].value == '' || inputValue[j].value == undefined){
                numOfErr++;
            }
        }
        
        if(numOfErr > 0) {
            alert('Please Fill In The Form Before Submitting')
        } else {
            var RecepientGmail = inputValue[0].value
            var RecepientPhone = inputValue[1].value
            var RecepientText = inputValue[2].value
            var RecepientName = inputValue[3].value
            
            isLoading = true;
            axios.get('/sendEmail',{
                params : {
                    gmail : RecepientGmail,
                    phone : RecepientPhone,
                    text : RecepientText,
                    name: RecepientName
                }
            }).then((response) => {
                if(response.data.code == 200){
                    alert('Email has been sent')
                    isLoading = false;
                } else {
                    alert('Something went wrong')
                }
            })
            
            if(isLoading) {
                alert('Email is being sent...')
            }
        }
    }
    
    ChoosePayment(e,c){
        import('../../Images/ContactNCoffee/'+e.target.id+'').then((k) => {
            $('.QRCodePay').css('background-image','url('+k.default+')')
            $('.PicLogo').css('filter','drop-shadow(0px 0px 0px transparent)')
            $('.QRCodePay').hide()
            $(e.target).css('filter','drop-shadow(1px 1px 1px black)')
            $('.QRCodePay').fadeIn(500)
        })
    }
    
    render() { 
        return <React.Fragment>
            <div className='ContactCont ContainerSnap' id='Contact'>
                <div className='CenterWord'>OR</div>
                <div className='MessageWriteBack'/>
                <div className='MessageWrite'>
                    <div className='InspireMessage'>
                        <div className='TitleCont'>
                            <div className='InspireTitle'><div className='IdeaIcon'/> Got An Idea?</div> 
                            Contact Me, We can make it come to life.
                        </div>
                        <hr className='LineBreak'/>
                        <div className='InspireInput'>
                            <input type='text' className='EmailnPhone EmailOnly InputVal' placeholder='EmailExample@gmail.com'/>
                            <input type='number' className='EmailnPhone InputVal' placeholder='Enter Phone Number'/><br/>
                            <textarea className='InputVal' id="freeform" rows='8' placeholder='Explain Your Idea Here'/><br/>
                            <input className='InputVal' type='text' placeholder='Insert Your Name Here'/>
                        </div>
                            <button className='ButtonContact' onClick={() => this.sendEmail()}>Send Response</button>
                    </div>
                </div>
                            
                <div className='BuyCoffeeBack'/>
                <div className='BuyCoffee'>
                    <div className='CoffeeCont'>
                        <div className='TitleCont'>
                            <div className='CoffeeTitle'>
                                <div className='CoffeeIcon'/> Buy Me A Coffee</div>
                                Support my work, one cup at a time. Be part of my creative journey!
                            </div>
                        <hr className='LineBreak'/>
                        <section className='ContPay'>
                            <div className='CoffeeCupBod'/>
                            <div className='CoffeeCup'/>
                            <div className='PaymentAlternative'>
                                <div className='CIMB PicLogo' id='cimbQR.png' onClick={(e) => this.ChoosePayment(e,'E52E5F')}/>
                                <div className='TouchNGo PicLogo' id='TouchNGoQR.jpeg' onClick={(e) => this.ChoosePayment(e,'2E5DAA')}/>
                                <div className='FPXPayment PicLogo' id='paypalQR.png' onClick={(e) => this.ChoosePayment(e,'3A70E1')}/>
                            </div>
                            <div className='QRCodePay'/>
                        </section>
                        <div className='BuyCoffeeFooter'>
                            Any donations made to this personal website are voluntary and solely at your discretion. Donations are not mandatory, and there is no obligation to contribute.
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        };
    }

export default Contact;
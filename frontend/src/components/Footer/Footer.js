import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='chaliced-footer'>
        <div className='footer-title'>Chaliced ©</div>
        <div className='footer-tech-links'>
            <div className='footer-tech'>
                <div className='tech-title'>Technologies</div>
                <div className='tech-list'>
                    <div>React</div>
                    <div>Redux</div>
                    <div>Express</div>
                    <div>PostgreSQL</div>
                </div>
            </div>
            <div className='footer-links'>
                <div className='link-title'>Personal Links</div>
                <div className='link-list'>
                    <a href='https://jan-dev.me/'>Portfolio</a>
                    <a href='https://www.linkedin.com/in/jan-michael-jovellanos-b30322242/'>LinkedIn</a>
                    <a href='https://github.com/janjovellanos/'>Github</a>
                </div>
            </div>
        </div>
    </footer>
  )
}

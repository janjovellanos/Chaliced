import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='chaliced-footer'>
        <div className='footer-title'>Chaliced</div>
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
                    <div>Portfolio</div>
                    <div>LinkedIn</div>
                    <div>Github</div>
                </div>
            </div>
        </div>
    </footer>
  )
}

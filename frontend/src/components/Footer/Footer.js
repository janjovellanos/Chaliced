import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='chaliced-footer'>
        <div className='footer-title'>Chaliced</div>
        <div className='footer-tech-links'>
            <div className='footer-tech'>
                <div className='tech-title'>Technologies</div>
                <div>Tech</div>
                <div>Tech</div>
                <div>Tech</div>
                <div>Tech</div>
            </div>
            <div className='footer-links'>
                <div className='link-title'>Personal Links</div>
                <div>Link</div>
                <div>Link</div>
                <div>Link</div>
                <div>Link</div>
            </div>
        </div>
    </footer>
  )
}

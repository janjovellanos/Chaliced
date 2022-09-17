import React from 'react'
import './HomePage.css'

export default function HomePage() {

  return (
    <div className='home-page-container'>
        <div className='featured'>
            <div className='featured-description'>This is a description</div>
            <div className='featured-image'>This is an image</div>
        </div>
        <div className='items-container-scroll'>
            <div className='item-preview'>Item Image</div>
            <div className='item-preview'>Item Image</div>
            <div className='item-preview'>Item Image</div>
            <div className='item-preview'>Item Image</div>
            <div className='item-preview'>Item Image</div>
        </div>
    </div>
  )

}

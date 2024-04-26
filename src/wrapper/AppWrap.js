import React from 'react'
import NavigationDots from '../components/NavigationDots'
import SocialMedia from '../components/SocialMedia'
import { useStateContext } from '../contexts/ContextProvider';

const AppWrap = (Component, idName, classNames) => function HOC() {
  const { testimonials , certificates} = useStateContext();
  

  

  return (
    <div id={idName} className={`app__container ${classNames}
     ${!testimonials.length && idName === 'testimonials' ? 'd-none' : '-'}
      ${!certificates.length && idName === 'certificates' ? 'd-none' : '-'}
     `} >
          <SocialMedia /> 
          <div className='app__wrapper app__flex'>
              <Component />
              <div className='copyright'>
                    <p className='p-text'>@{new Date().getFullYear()} Khaled</p>
                    <p className='p-text'>All rights reserved</p>
              </div>
          </div>
          <NavigationDots active={idName} />
    </div>
  )
}

export default AppWrap

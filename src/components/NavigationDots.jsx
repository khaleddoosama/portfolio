import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';

const NavigationDots = ({ active }) => {
  const { menu } = useStateContext();

  return (
      <div className='app__navigation'>
          {menu.map((item, index) => (
              <a
                  href={`#${item}`}
                  key={item + index}
                  className="app__navigation-dot"
                  style={active === item ? { backgroundColor: '#313BAC'}: {}}
              >
              </a>
          ))}
    </div>
  )
}

export default NavigationDots
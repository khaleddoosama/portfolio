import React from 'react';
import { BsTwitter, BsInstagram, BsLinkedin, BsGithub } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';


const SocialMedia = () => {
      return (
            <div className='app__social'>
                  <div>
                        <a href="https://github.com/khaleddoosama" target="_blank">
                              <BsGithub />
                        </a>
                  </div>
                  <div>
                        <a href="https://www.linkedin.com/in/khaleddoosama/" target="_blank">
                              <BsLinkedin />
                        </a>
                  </div>
                  <div>
                        <a href="https://www.facebook.com/khaleddoosama" target="_blank">
                              <FaFacebookF />
                        </a>
                  </div>
            </div>
      )
}

export default SocialMedia
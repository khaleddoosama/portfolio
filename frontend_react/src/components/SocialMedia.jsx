import React from 'react';
import { BsTwitter, BsInstagram, BsLinkedin, BsGithub } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
// code forces
import { SiCodeforces } from 'react-icons/si';

const SocialMedia = () => {
      return (
            <div className='app__social'>
                  <div>
                        <a href="https://github.com/khaleddoosama" target="_blank" rel="noreferrer">
                              <BsGithub />
                        </a>
                  </div>
                  <div>
                        <a href="https://www.linkedin.com/in/khaleddoosama/" target="_blank" rel="noreferrer">
                              <BsLinkedin />
                        </a>
                  </div>
                  <div>
                        <a href="https://codeforces.com/profile/khaleddoosama" target="_blank" rel="noreferrer">
                              <SiCodeforces />
                        </a>
                  </div>
            </div>
      )
}

export default SocialMedia
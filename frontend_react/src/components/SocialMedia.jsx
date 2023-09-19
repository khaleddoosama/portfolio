import React from 'react';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import { SiCodeforces } from 'react-icons/si';

const SocialMedia = () => {
      return (
            <div className='app__social'>
                  <div>
                        <a href="https://github.com/khaleddoosama" target="_blank" rel="noreferrer" aria-label="Github">
                              <BsGithub />
                        </a>
                  </div>
                  <div>
                        <a href="https://www.linkedin.com/in/khaleddoosama/" target="_blank" rel="noreferrer" aria-label="Linkedin">
                              <BsLinkedin />
                        </a>
                  </div>
                  <div>
                        <a href="https://codeforces.com/profile/khaleddoosama" target="_blank" rel="noreferrer" aria-label="Codeforces">
                              <SiCodeforces />
                        </a>
                  </div>
            </div>
      )
}

export default SocialMedia
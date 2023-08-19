import React, { useEffect, useState } from 'react'
import { images } from '../../constants';
import { motion } from 'framer-motion';
import { FaFileDownload } from "react-icons/fa";
import axios from 'axios';


import './Header.scss';
import { AppWrap } from '../../wrapper';
import { client } from '../../client';

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    }
  }
}


const Header = () => {
  useEffect(() => {
    axios.get('https://api.api-ninjas.com/v1/counter?id=devkhaled', {
      headers: { 'X-Api-Key': 'cHr0J/0OJk2nqWtG2AuhcA==16ndI5fZrxyqTKG2' },
      contentType: 'application/json',
    })
      .then((response) => {
        const count = response.data.value;
        console.log('Old Number of visits: ' + count);
        axios.get('https://api.api-ninjas.com/v1/counter?id=devkhaled&value=' + (count + 1), {
          headers: { 'X-Api-Key': 'cHr0J/0OJk2nqWtG2AuhcA==16ndI5fZrxyqTKG2' },
          contentType: 'application/json',
        })
          .then((response) => {
            console.log('New Number of visits: ' + response.data.value);
          })
          .catch((error) => {
            console.log('error2');
            console.error('Error: ', error.response);
          });
      })
      .catch((error) => {
        console.log('error1');
        console.error('Error: ', error.response);
      });
  }, []);

  const [resume, setResume] = useState([]);


  useEffect(() => {
    const resumeQuery = `*[_type == "resume"][0].resume.asset->url`;

    client.fetch(resumeQuery).then((data) =>
      setResume(data)
    );
  }, []);

  return (
    <div id='home' className='app__header app__flex'>
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className='app__header-badge'>
          <div className='badge-cmp app__flex'>
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className='p-text'>Hello, I am </p>
              <h1 className='head-text'>Khaled</h1>
            </div>
          </div>
          <div className='app__flex tag-cmp'>
            <p className='p-text'>Web Developer </p>
            <p className='p-text'>Freelancer</p>
          </div>
          {resume && (<div className='app__flex tag-cmp'>

            <a href={resume} download>
              <p className='p-text'>Resume <FaFileDownload /> </p>
            </a>

          </div>)}
        </div>
      </motion.div>
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        {/* <img src={images.profile} alt="profile-bg" /> */}
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src={images.circle}
          alt="profile circle"
          className="overlay_circle"
        />
      </motion.div>

      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {[images.flutter, images.redux, images.sass].map((circle, index) => (
          <div className="circle-cmp app__flex" key={`circle-${index}`}>
            <img src={circle} alt="profile_bg" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default AppWrap(Header, 'home');

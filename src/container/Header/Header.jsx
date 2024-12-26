import React, { useEffect, useState } from 'react'
import { images } from '../../constants';
import { motion } from 'framer-motion';
import { FaFileDownload } from "react-icons/fa";


import './Header.scss';
import { AppWrap } from '../../wrapper';
import { client } from '../../client';
import { v4 as uuidv4 } from 'uuid';

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

  //log number of visitors
  useEffect(() => {
    const query = `*[_type == "visitor"]`;
    client.fetch(query)
      .then((result) => {
        console.log(result.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  function generateId() {
    return uuidv4();
  }

  // Effect for handling visitor ID in localStorage
  useEffect(() => {
    const visitorId = localStorage.getItem('VisitorId');
    if (!visitorId) {
      const newVisitor = {
        _type: 'visitor',
        id: generateId(),
        referringUrl: document.referrer,
      };

      client.create(newVisitor)
        .then(result => {
          localStorage.setItem('VisitorId', result.id);
          console.log('New visitor added:', result.id);
        })
        .catch(error => console.error('Error creating new visitor:', error));
    } else {
      const query = `*[_type == "visitor" && id == "${visitorId}"][0]`;
      client.fetch(query)
        .then(result => {
          if (!result) {
            const newVisitor = {
              _type: 'visitor',
              id: generateId(),
              referringUrl: document.referrer,
            };
            client.create(newVisitor)
              .then(result => {
                localStorage.setItem('VisitorId', result.id);
              })
              .catch(error => console.error('Error creating new visitor:', error));
          }
        })
        .catch(error => console.error('Error fetching visitor:', error));
    }
  }, []); // Added 'client' to dependencies


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
            <p className='p-text'>Software Engineer</p>
            <p className='p-text'>Web Developer</p>
          </div>
          {resume && (<div className='app__flex tag-cmp'>

            <a href={resume} download target="_blank" rel="noopener noreferrer">
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
        {[images.laravel, images.rest_api, images.sql].map((circle, index) => (
          <div className="circle-cmp app__flex" key={`circle-${index}`}>
            <img src={circle} alt="profile_bg" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default AppWrap(Header, 'home');

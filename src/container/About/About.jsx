import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
import { client, urlFor } from '../../client';
import { Fragment } from 'react';
import ReactTooltip from 'react-tooltip';


const About = () => {

  const [abouts, setAbouts] = useState([]);
  const [tooltip, showTooltip] = useState(true);

  useEffect(() => {
    const query = '*[_type == "abouts"]'

    client.fetch(query)
      .then((data) => { setAbouts(data); })

  }, [])


  return (
    <>
      <h2 className='head-text'>
        I Know That <span>Good Dev</span><br />means <span>Good Business</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <Fragment key={about.title + index}>
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: 'tween' }}
              className="app__profile-item"
              //key={about.title + index}

              data-for={about.name}
              data-tip={about.description}
              onMouseEnter={() => showTooltip(true)}
              onMouseLeave={() => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 10);
              }}
            >
              <img src={urlFor(about.imgUrl)} alt={about.title} />
              <h2 className='bold-text' style={{ marginTop: 20 }}>{about.title}</h2>
              <p className='p-text' style={{ marginTop: 20 }}>{about.description.substring(0, 150)} ...</p>
            </motion.div>

            {tooltip && <ReactTooltip id={about.name}
              effect="solid"
              arrowColor="#fff"
              className="skills-tooltip"
            />}
          </Fragment>
        ))}
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg'
);
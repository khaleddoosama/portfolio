import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Certificates.scss';


const Certificates = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [certificates, setCertificates] = useState([]);
  const [tooltip, showTooltip] = useState(true);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const certificatesQuery = '*[_type == "certificates"]';

    client.fetch(certificatesQuery).then((data) => {
      setCertificates(data);
    });
  }, []);

  const certificate = certificates[currentIndex];

  return (

    certificates.length ?
      <>
        <motion.div
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, type: 'tween' }}
          className="app__certificate-item app__flex"

          data-tip={certificate.desc}
          onMouseEnter={() => showTooltip(true)}
          onMouseLeave={() => {
            showTooltip(false);
            setTimeout(() => showTooltip(true), 10);
          }}
        >
          <img src={urlFor(certificate.imgurl)} alt="certificate" />

        </motion.div>

        <div className='app__certificate-btns app__flex'>
          <div className='app__flex' onClick={() => handleClick(currentIndex === 0 ? certificates.length - 1 : currentIndex - 1)}>
            <HiChevronLeft />
          </div>
          <div className='app__flex' onClick={() => handleClick(currentIndex === certificates.length - 1 ? 0 : currentIndex + 1)}>
            <HiChevronRight />
          </div>

        </div>


        {tooltip && <ReactTooltip id={certificate.name}
          effect="solid"
          arrowColor="#fff"
          className="skills-tooltip"
        />}
      </>
      : ''


  )
}

export default AppWrap(
  MotionWrap(Certificates, 'app__certificate'),
  'certificates',
  `app__primarybg`
);
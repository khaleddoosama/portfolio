import React, { useEffect, useState } from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';


const initialState = {
  errorName: false,
  errorEmail: false,
  errorMessage: false,
}


const Footer = () => {

  const [formData, setFormData] = useState({name:'',email:'',message:''})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState(initialState)

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }


  const checkInput = () => {
    const one = document.getElementsByName('name');
    const two = document.getElementsByName('email');
    const three = document.getElementsByName('message');
    let mailsRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    if (one[0].value === '') {
      setErrors({ ...initialState, ['errorName']: 'Please enter your name' });
      one[0].focus()
      return 0
    }
    else if (two[0].value === '' || !mailsRe.test(two[0].value))
    {
      if (two[0].value === '')
        setErrors({ ...initialState, ['errorEmail']: "Please enter your email" });
      else
        setErrors({ ...initialState, ['errorEmail']: "Please enter a valid email" });
      
      two[0].focus()
      return 0
    }
    else if (three[0].value === '')
    {
      setErrors({ ...initialState, ['errorMessage']: "Please enter your Message" });
      three[0].focus();
      return 0
    }
    else
      return 1;
    
  }

   


  const handleSubmit = () => {
    if (checkInput()) {
      setLoading(true);

      const contact = {
        _type: 'contact',
        name: name,
        email: email,
        message: message,
      };

      client.create(contact)
        .then(() => {
          setLoading(false);
          setIsFormSubmitted(true);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <h2 className='head-text' > Take a coffe & chat with me</h2>
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt="email" />
          <a href="mailto:khaleddoosama@gmail.com?subject=Contact" className='p-text'>khaleddoosama@gmail.com</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +201095160284" className='p-text'>+201095160284</a>
        </div>
      </div>

      {!isFormSubmitted ?
        <div className='app__footer-form app__flex'>
          <div className='app__flex'>
            <input type="text" className='p-text' placeholder='Your Name' name='name' value={name} onChange={handleChangeInput} />
          </div>
          {errors.errorName &&
            <p className='error'>
              {errors.errorName}
            </p>
          }

          <div className='app__flex'>
            <input type="email" className='p-text' placeholder='Your email' name='email' value={email} onChange={handleChangeInput} />
          </div>
          {errors.errorEmail && <p className='error'>
            {errors.errorEmail}
          </p>
          } 

          <div>
            <textarea className='p-text' placeholder='Your Message'
              value={message} name='message' onChange={handleChangeInput} />
          </div>
          {errors.errorMessage &&
            <p className='error'>
              {errors.errorMessage}
            </p>
          }

          <button type='button' className='p-text' onClick={handleSubmit}>{loading ? 'Sending' : 'Send Message'}</button>
        </div>
        : <div>
          <h3 className='head-text'> thank you for getting in touch</h3>
        </div>
      }
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);
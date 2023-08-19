import './App.scss';
import { About, Footer, Header, Skills, Testimonial, Work, Certificates } from './container';
import { Navbar } from './components'
import { useStateContext } from './contexts/ContextProvider';
import { useEffect } from 'react';



function App() {
  const { getTestimonialsData, setMenu, testimonials, getCertificatesData, certificates, menu } = useStateContext();
  useEffect(() => {
    getTestimonialsData();
    getCertificatesData();
  }, [])

  useEffect(() => {
    if (testimonials.length && certificates.length) {
      setMenu(['home', 'about', 'work', 'skills', 'testimonials', 'certificates', 'contact'])
    }
    else if (testimonials.length) {
      setMenu(['home', 'about', 'work', 'skills', 'testimonials', 'contact'])
    }
    else if (certificates.length) {
      setMenu(['home', 'about', 'work', 'skills', 'certificates', 'contact'])
    }
    else {
      setMenu(['home', 'about', 'work', 'skills', 'contact'])
    }


  }, [certificates, setMenu, testimonials])

  return (
    <div className='app'>
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Certificates />
      <Footer />

    </div>
  );
}

export default App; 
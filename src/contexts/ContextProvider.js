import React, { createContext, useCallback, useContext, useState } from 'react'
import { client } from '../client';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [menu, setMenu] = useState([]);

    const [testimonials, setTestimonials] = useState([]);
    const [certificates, setCertificates] = useState([]);


    const getTestimonialsData = useCallback(() => {
        const query = `*[_type == "testimonials"]`;

        client.fetch(query).then((data) => {
            setTestimonials(data);
        });
    }, []);

    const getCertificatesData = useCallback(() => {
        const query = `*[_type == "certificates"]`;

        client.fetch(query).then((data) => {
            setCertificates(data);
        });
    }, []);



    return (
        <StateContext.Provider value={{
            menu, setMenu,
            testimonials, setTestimonials, getTestimonialsData,
            certificates, setCertificates, getCertificatesData
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)

import SanityClient from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';

export const client = SanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-02-01',
    useCdn: true,
    token:process.env.REACT_APP_SANITY_TOKEN,
})


const builder = imageUrlBuilder(client); // this is the image builder function from sanity client library

export const urlFor = (source) => builder.image(source); // this is the function that will be used to generate the url for the image

# React Gallery Component with Unsplash API

This project is a React-based gallery component, built using Vite. It features a dynamic image gallery with scrolling and image enlargement capabilities. The images are sourced from [Unsplash](https://unsplash.com), a platform for high-resolution photos.

## Features

- Dynamic loading of images from Unsplash.
- Advanced image navigation: switch images using both buttons and mouse clicks on side enlarged previews.
- Includes a spinner for loading states.

## Technologies
- React
- Vite
- Unsplash API for images

## Deployment
The gallery component is deployed and can be viewed live at [Vercel](https://react-gallery-sigma.vercel.app/)

## Setup and Installation
To get the project up and running on your local machine, follow these steps:

1. **Clone the Repository:** 
   ```sh
   git clone git@github.com:stasikrus/react-gallery.git

2. **Install Dependencies:**
   
   Navigate to the project directory and run:
   ```sh
   npm install
3. **Environment Variables:**
   
   You need to obtain an API key from Unsplash and set it as an environment variable:
   ```sh
   VITE_UNSPLASH_ACCESS_KEY=your_access_key
4. **Development Server:**
   
   To start the development server, run:
    ```sh
    npm run dev

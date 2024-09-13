import React from 'react';
import { product_list } from '../assets/asset.js';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

const Skincare = () => {
  const cleanser = product_list.slice(0, 5); 
  const moisturizer = product_list.slice(5, 10);     
  const serums = product_list.slice(10, 15);
  const sunscreen = product_list.slice(20, 25);

  // Debugging logs
  console.log('Cleanser:', cleanser);
  console.log('Moisturizer:', moisturizer);
  console.log('Serums:', serums);
  console.log('sunscreen:', sunscreen);

  return (
  
    <div className="home">
      <Header />
      <h4 className="main-heading">Cleansers</h4>
      <div className="image-gallery row">
        {cleanser.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <figure className="figure">
              <img
                src={product.product_image}
                alt={product.product_name}
                className="figure-img img-fluid rounded animate-img"
              />
              <figcaption className="figure-caption text-center">
                {product.product_name}
              </figcaption>
            </figure>
          </div>
        ))}
      </div>

      <h4 className="main-heading">Moisturizer</h4>
      <div className="image-gallery row">
        {moisturizer.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <figure className="figure">
              <img
                src={product.product_image}
                alt={product.product_name}
                className="figure-img img-fluid rounded animate-img"
              />
              <figcaption className="figure-caption text-center">
                {product.product_name}
              </figcaption>
            </figure>
          </div>
        ))}
      </div>

      <h4 className="main-heading">Serums</h4>
      <div className="image-gallery row">
        {serums.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <figure className="figure">
              <img
                src={product.product_image}
                alt={product.product_name}
                className="figure-img img-fluid rounded animate-img"
              />
              <figcaption className="figure-caption text-center">
                {product.product_name}
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
      <h4 className="main-heading">Sunscreen</h4>
        <div className="image-gallery row">
          {sunscreen.map((product, index) => (
            <div key={index} className="col-md-4 mb-4">
              <figure className="figure">
                <img
                  src={product.product_image}
                  alt={product.product_name}
                  className="figure-img img-fluid rounded animate-img"
                />
                <figcaption className="figure-caption text-center">
                  {product.product_name}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
        <Footer />
    </div>
  );
};

export default Skincare;
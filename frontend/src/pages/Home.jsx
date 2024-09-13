import React from 'react';
import { product_list } from '../assets/asset.js';
import homeimage from '../assets/homeimage.png';
import './Home.css';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

const Home = () => {
  // Split products into categories
  const bestsellers = product_list.slice(0, 5);
  const cleanser = product_list.slice(0, 5); 
  const moisturizer = product_list.slice(5, 10);     
  const serums = product_list.slice(10, 15);     
  const eyecream = product_list.slice(15, 20);     
  const sunscreen = product_list.slice(20, 25);     
  const bodywash = product_list.slice(25, 30);     
  const shampoo = product_list.slice(30, 35);     
  const facemask = product_list.slice(35, 40);     
  const scrub = product_list.slice(45, 50);     
  const toner = product_list.slice(55, 60);     
  const combokit = product_list.slice(60, 65);     
  const combokits = product_list.slice(65, 70);     

  return (
    <div className="home">
      <Header /> 
      <h1 className="main-heading">Welcome to Our Store - Clesa</h1>
      <img src={homeimage} className='homeimage' alt="Home" />
      <div className="container">
        <h4 className="main-heading">Bestsellers</h4>
        <div className="image-gallery row">
          {bestsellers.map((product, index) => (
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

        <h4 className="main-heading">Eyecream</h4>
        <div className="image-gallery row">
          {eyecream.map((product, index) => (
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

        <h4 className="main-heading">Bodywash</h4>
        <div className="image-gallery row">
          {bodywash.map((product, index) => (
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

        <h4 className="main-heading">Shampoo</h4>
        <div className="image-gallery row">
          {shampoo.map((product, index) => (
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

        <h4 className="main-heading">Facemask</h4>
        <div className="image-gallery row">
          {facemask.map((product, index) => (
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
        <h4 className="main-heading">Scrub</h4>
        <div className="image-gallery row">
          {scrub.map((product, index) => (
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

        <h4 className="main-heading">Toner</h4>
        <div className="image-gallery row">
          {toner.map((product, index) => (
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

        <h4 className="main-heading">Combo Kit</h4>
        <div className="image-gallery row">
          {combokit.map((product, index) => (
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

        <h4 className="main-heading">Combo Kits</h4>
        <div className="image-gallery row">
          {combokits.map((product, index) => (
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
      </div>
      <Footer />
    </div>
  );
}

export default Home;

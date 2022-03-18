import React, { useState } from 'react';
import './image-slider.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useHistory } from "react-router-dom";

const ImageSlider = ({ slides, showOptionsFunc }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const history = useHistory();

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  const mintPage = () => {
    let path = '/mint/monkeyBusiness'
    history.push(path);
    showOptionsFunc(false)

  }

  return (
    <section className='slider'>
      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <>
                <FaAngleLeft className='left-arrow' onClick={prevSlide} />
                <FaAngleRight className='right-arrow' onClick={nextSlide} />
                <img src={slide} alt='travel image' className='image' onClick={() => mintPage()}/>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
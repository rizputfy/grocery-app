import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CarouselContainer, CarouselImageLink, GalleryContainer, Card, CardImage, CardLink } from './StyledHero';

import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';

const HeroCarousel = () => {
  const carouselItems = [
    { href: 'https://example.com/banner1', src: banner1, alt: 'Banner 1' },
    { href: 'https://example.com/banner2', src: banner2, alt: 'Banner 2' },
    { href: 'https://example.com/banner3', src: banner3, alt: 'Banner 3' }
  ];

  const cardItems = [
    { href: 'https://example.com/image1', src: image1, alt: 'Festival Buah Nusantara' },
    { href: 'https://example.com/image2', src: image2, alt: 'Gratis Ongkir' },
    { href: 'https://example.com/image3', src: image3, alt: 'The World\'s Best Organic Tea' }
  ];

  return (
    <>
      <CarouselContainer>
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
          {carouselItems.map((item, index) => (
            <div key={index}>
              <CarouselImageLink href={item.href} target="_blank" rel="noopener noreferrer">
                <img src={item.src} alt={item.alt} />
              </CarouselImageLink>
            </div>
          ))}
        </Carousel>
      </CarouselContainer>

      <GalleryContainer>
        {cardItems.map((item, index) => (
          <Card key={index}>
            <CardLink href={item.href} target="_blank" rel="noopener noreferrer">
              <CardImage src={item.src} alt={item.alt} />
            </CardLink>
          </Card>
        ))}
      </GalleryContainer>
    </>
  );
};

export default HeroCarousel;

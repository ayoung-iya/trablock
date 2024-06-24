/* eslint-disable */
'use client';

import { type EmblaOptionsType as CarouselOptions } from 'embla-carousel';
import React from 'react';
import { StaticImageData } from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

type PropType = {
  slides: StaticImageData[];
  options?: CarouselOptions;
};
export default function Carousel(props: PropType) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

  return (
    <div className="embla xl:-mx-[calc((100vw-1280px)*0.5)]" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((slide, index) => (
          <div className="embla__slide" key={index}>
            <Image src={slide} alt={`Slide ${index}`} layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

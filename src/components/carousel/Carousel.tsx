/* eslint-disable */
'use client';

import ImageBox from '@/components/common/ImageBox';
import { type EmblaOptionsType as CarouselOptions } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { StaticImageData } from 'next/image';

type PropType = {
  slides: StaticImageData[];
  options?: CarouselOptions;
};
export default function Carousel(props: PropType) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((slide, index) => (
          <div className="embla__slide" key={index}>
            <ImageBox className="h-full" src={slide} alt={`Slide ${index}`} width={1920} height={1080} />
          </div>
        ))}
      </div>
    </div>
  );
}

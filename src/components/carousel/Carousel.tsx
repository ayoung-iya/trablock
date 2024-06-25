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
    <div className="h-auto w-full overflow-hidden md:h-96" ref={emblaRef}>
      <div className="flex-col-center h-60 md:h-96">
        {slides.map((slide, index) => (
          <div className="relative h-60 w-full flex-none md:h-96" key={index}>
            <ImageBox className="h-full" src={slide} alt={`Slide ${index}`} width={1920} height={1080} />
          </div>
        ))}
      </div>
    </div>
  );
}

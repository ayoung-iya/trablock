'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

import luggage from '@/images/luggage.svg?url';
import map from '@/images/map.svg?url';
import plain from '@/images/plain.svg?url';

const SLIDES = [
  {
    id: crypto.randomUUID(),
    background: 'bg-gradient-to-b from-[#EBF2FF] to-[#CDE1FF]',
    title: '소중한 여행 계획,$트래블록으로 완성하세요',
    description: '관광지, 식당, 숙소 등 다양한 블록을 조합해보세요',
    imageURL: plain.src,
    imageAlt: '비행기가 지구본을 돌고 있는 모습'
  },
  {
    id: crypto.randomUUID(),
    background: 'bg-gradient-to-b from-[#F0F9F5] to-[#C1E3CD]',
    title: '지도와 함께 편리하게$여행 계획을 세워보세요',
    description: '지도를 보면서 편리하게 계획을 짤 수 있어요',
    imageURL: map.src,
    imageAlt: '핀이 꼽힌 지도'
  },
  {
    id: crypto.randomUUID(),
    background: 'bg-gradient-to-b from-[#FFF8EA] to-[#FFE9B1]',
    title: '함께 만드는 여행의 즐거움',
    description: '다른 여행자들의 생생한 후기와 계획을 살펴보세요',
    imageURL: luggage.src,
    imageAlt: '캐리어에서 여행 용품이 나오는 모습'
  }
];

export default function Carousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

  return (
    <div className="embla xl:-mx-[calc((100vw-1024px)*0.5)]" ref={emblaRef}>
      <div className="embla__container min-w-[360px]">
        {SLIDES.map((slide) => (
          <div className={`embla__slide flex items-center justify-center ${slide.background}`} key={slide.id}>
            <div className="flex w-[440px] items-center justify-between md:w-[600px] lg:w-[800px]">
              <div>
                <h3 className="mb-2 text-xl font-bold md:text-2xl lg:mb-3 lg:text-3xl">
                  {slide.title.split('$').map((splitTitle) => (
                    <p key={splitTitle}>{splitTitle}</p>
                  ))}
                </h3>
                <p className="text-sm text-black-03 md:text-base lg:text-xl">{slide.description}</p>
              </div>
              <div className="relative h-[100px] w-[112px] md:h-[256px] md:w-[220px] lg:w-[270px] xl:h-[330px]">
                <Image src={slide.imageURL} alt={slide.imageAlt} fill priority />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

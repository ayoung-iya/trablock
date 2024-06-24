'use client';

import { EmblaOptionsType } from 'embla-carousel';

import Carousel from '@/components/carousel/Carousel';
import heroL1 from '@/images/heroL1.png';
import heroL2 from '@/images/heroL2.png';
import heroL3 from '@/images/heroL3.png';
import heroM1 from '@/images/heroM1.png';
import heroM2 from '@/images/heroM2.png';
import heroM3 from '@/images/heroM3.png';
import heroS1 from '@/images/heroS1.png';
import heroS2 from '@/images/heroS2.png';
import heroS3 from '@/images/heroS3.png';
import useMediaQuery from '@/libs/hooks/useMediaQuery';

const OPTIONS: EmblaOptionsType = { loop: true };

export default function Home() {
  let SLIDES = [heroL1, heroL2, heroL3];
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = !isTablet && !isDesktop;
  if (isTablet) {
    SLIDES = [heroM1, heroM2, heroM3];
  }
  if (isMobile) {
    SLIDES = [heroS1, heroS2, heroS3];
  }

  return <Carousel slides={SLIDES} options={OPTIONS} />;
}

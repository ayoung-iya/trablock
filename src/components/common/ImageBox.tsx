import Image, { ImageProps } from 'next/image';

interface ImageBoxProps extends ImageProps {
  className?: string;
  width: number;
  height: number;
}

/**
 * div로 감싸진 Image 컴포넌트입니다.
 * overflow-hidden, image-cover, width*4, height*4 가 적용되어 있습니다.
 * @param className string; div className
 * @param src string; Image src
 * @param alt string; Image alt
 * @param width number; Image width
 * @param height number; Image height
 */

export default function ImageBox({ className, src, alt, width, height, ...restImageProps }: ImageBoxProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <Image src={src} alt={alt} width={width * 4} height={height * 4} className="image-cover" {...restImageProps} />
    </div>
  );
}

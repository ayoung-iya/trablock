import BlockDetailModalContentPlace from '@/components/modal/modalList/BlockDetailModalContentPlace';
import BlockDetailModalContentTransport from '@/components/modal/modalList/BlockDetailModalContentTransport';
import { EtcBlockDetailData, PlaceBlockDetailData, TransportBlockDetailData } from '@/components/modal/modalList/type';
import { CATEGORY } from '@/libs/constants/modal';
import { GoogleMapsApiReturn } from '@/libs/hooks/useGoogleMapsApi';

/* eslint-disable no-undef */
interface BlockDetailModalContentProps extends GoogleMapsApiReturn {
  blockData: PlaceBlockDetailData | TransportBlockDetailData | EtcBlockDetailData;
}

export default function BlockDetailModalContent({ blockData, isLoaded }: BlockDetailModalContentProps) {
  if (blockData.category === CATEGORY.기타) return null;
  if (blockData.category === CATEGORY.교통)
    return <BlockDetailModalContentTransport isLoaded={isLoaded} blockData={blockData as TransportBlockDetailData} />;
  return <BlockDetailModalContentPlace isLoaded={isLoaded} blockData={blockData as PlaceBlockDetailData} />;
}

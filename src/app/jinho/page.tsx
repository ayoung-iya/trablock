/* eslint-disable max-len */

import CoreBlock from '@/components/travelBlock/CoreBlock';

export default function Jinho() {
  return (
    <CoreBlock name="블록 이름" tag="태그" route={{ start: '출발지', end: '도착지' }} memo="메모입니다.">
      <div>추가 요소</div>
    </CoreBlock>
  );
}

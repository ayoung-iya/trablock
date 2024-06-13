'use client';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import handleShareByKakao from '@/libs/utils/handleShareByKakao';

export default function ShareModal() {
  const mockData = {
    // 추후 fetch 데이터로 변경
    title: '피렌체 가쟈',
    description: '빵빵이와 옥지의 여행!',
    imageUrl: 'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
    link: {
      mobileWebUrl: 'https://trablock-git-develop-codeit6.vercel.app',
      webUrl: 'https://trablock-git-develop-codeit6.vercel.app'
    },
    buttons: {
      link: {
        mobileWebUrl: 'https://trablock-git-develop-codeit6.vercel.app',
        webUrl: 'https://trablock-git-develop-codeit6.vercel.app'
      }
    }
  };
  // 추후 div 대신 modal 로 교체해야 합니다. / button 도 버튼 컴포넌트로 교체
  return (
    <div className="h-1/4 w-1/4 bg-red-200">
      <h1>인원 초대하기</h1>
      <h2>{mockData.title}</h2>
      <p>{mockData.description}</p>
      <button type="button" onClick={() => handleShareByKakao(mockData)}>
        카카오톡 공유하기
      </button>
      <br />
      {/* eslint-disable-next-line no-alert */}
      <CopyToClipboard text={mockData.link.webUrl} onCopy={() => alert('링크가 복사되었습니다.')}>
        <button type="button">링크 복사하기</button>
      </CopyToClipboard>
    </div>
  );
}

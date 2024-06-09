'use client';

export default function gaeun() {
  interface handleShareByKakaoProps {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
    buttons: {
      link: {
        mobileWebUrl: string;
        webUrl: string;
      };
    };
  }

  const mockData = {
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
  const handleShareByKakao = (shareData: handleShareByKakaoProps) => {
    const { Kakao } = window;

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: shareData.title,
        description: shareData.description,
        imageUrl: shareData.imageUrl,
        link: {
          mobileWebUrl: shareData.link.mobileWebUrl,
          webUrl: shareData.link.webUrl
        }
      },

      buttons: [
        {
          title: '계획 보러가기',
          link: {
            mobileWebUrl: shareData.link.mobileWebUrl,
            webUrl: shareData.link.webUrl
          }
        }
      ]
    });

    return undefined;
  };

  return (
    <p>
      <button type="button" onClick={() => handleShareByKakao(mockData)}>
        카카오톡 공유하기
      </button>
    </p>
  );
}

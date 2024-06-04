import loadable from '@loadable/component';

// Loading 컴포넌트 정의
function Loading() {
  return <div>Loading...</div>;
}

const modalList = {
  Modal: loadable(() => import('@/components/modal/Modal'), {
    fallback: <Loading />
  })
  // 여기에 다른 모달 컴포넌트를 추가할 수 있습니다
};

export default modalList;

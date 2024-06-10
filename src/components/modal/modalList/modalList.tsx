import loadable from '@loadable/component';

import { ModalProps } from '@/components/modal/Modal';

// Loading 컴포넌트 정의
function Loading() {
  return <div>Loading...</div>;
}

const importList = {
  Modal: loadable(() => import('@/components/modal/Modal'), {
    fallback: <Loading />
  })
  // 여기에 다른 모달 컴포넌트를 추가할 수 있습니다
};

const modalList = {
  Modal: (props: ModalProps) => {
    return { component: importList.Modal, props };
  }
};

export default modalList;

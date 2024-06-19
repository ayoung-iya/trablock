import loadable from '@loadable/component';

import { ModalProps } from '@/components/modal/Modal';
import { BlockDetailModalProps } from '@/components/modal/modalList/BlockDetailModal';
import { CreateBlockModalProps } from '@/components/modal/modalList/CreateBlockModal';

// Loading 컴포넌트 정의
function Loading() {
  return <div>Loading...</div>;
}

const importList = {
  Modal: loadable(() => import('@/components/modal/Modal'), {
    fallback: <Loading />
  }),
  CreateBlock: loadable(() => import('@/components/modal/modalList/CreateBlockModal'), {
    fallback: <Loading />
  }),
  BlockDetail: loadable(() => import('@/components/modal/modalList/BlockDetailModal'), {
    fallback: <Loading />
  })
};

const modalList = {
  Modal: (props: ModalProps) => {
    return { component: importList.Modal, props };
  },
  CreateBlock: (props: CreateBlockModalProps) => {
    return { component: importList.CreateBlock, props };
  },
  BlockDetail: (props: BlockDetailModalProps) => {
    return { component: importList.BlockDetail, props };
  }
};

export default modalList;

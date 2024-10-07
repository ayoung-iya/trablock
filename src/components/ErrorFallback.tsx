import { FallbackProps } from 'react-error-boundary';

import NotificationMessage from '@/components/common/NotificationMessage';

export default function ErrorFallback({ error }: FallbackProps) {
  return <NotificationMessage>{`${error.code} : ${error.localMessage}`}</NotificationMessage>;
}

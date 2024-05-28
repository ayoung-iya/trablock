import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import {
  GetExampleRes,
  PostExamplePayload,
  PostExampleRes,
  PutExamplePayload,
  PutExampleRes
} from '@/apis/example/example.type';
import queryOptions from '@/apis/example/queries';
import { selectData } from '@/apis/utils';

/**
 * description
 * @param
 * @returns
 */

export function usePostExample(options: any, payload: PostExamplePayload) {
  // const [isError, setIsError] = useState(false);
  const res = useMutation(queryOptions.postExample(options, payload));
  return selectData<PostExampleRes>(res);
}

/**
 * description
 * @param
 * @returns
 */

export function useGetExample(options: any) {
  const res = useSuspenseQuery(queryOptions.getExample(options));
  return selectData<GetExampleRes>(res);
}

/**
 * description
 * @param
 * @returns
 */

export function usePutExample(options: any, payload: PutExamplePayload) {
  const res = useMutation(queryOptions.putExample(options, payload));
  return selectData<PutExampleRes>(res);
}

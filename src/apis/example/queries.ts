import ExampleService from '@/apis/example/example.service';

const queryKeys = {
  postExample: (options: any, payload: any) => ['postExample', options, payload] as const,
  getExample: (options: any) => ['getExample', options] as const,
  putExample: (options: any, payload: any) => ['putExample', options, payload] as const
};

const queryOptions = {
  postExample: (options: any, payload: any) => ({
    mutationKey: queryKeys.postExample(options, payload),
    mutationFn: (postPayload: any) => ExampleService.postExample(options, postPayload)
  }),
  getExample: (options: any) => ({
    queryKey: queryKeys.getExample(options),
    queryFn: () => ExampleService.getExample(options)
  }),
  putExample: (options: any, payload: any) => ({
    mutationKey: queryKeys.putExample(options, payload),
    mutationFn: (putPayload: any) => ExampleService.putExample(options, putPayload)
  })
};

export default queryOptions;

/* eslint-disable class-methods-use-this */

import { apiRequestor } from '@/apis/requestor';

class ExampleService {
  postExample(options: any, payload: any) {
    return apiRequestor.post(`/example/${options}`, payload);
  }

  getExample(options: any) {
    return apiRequestor.post(`/example/${options}`);
  }

  putExample(options: any, payload: any) {
    return apiRequestor.post(`/example/${options}`, payload);
  }
}

export default new ExampleService();

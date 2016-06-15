export * from './login';
export * from './device';

import api from './api';
import codePush from './codePush';

export default {
  ...api,
  ...codePush
}

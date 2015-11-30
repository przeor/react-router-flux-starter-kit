import Api from '../utils/api';

var EntityActions = {
  getEntityData(entityId) {
    Api.getEntityData(entityId);
  },
}

export default EntityActions;

import { Dispatcher } from 'flux';

class DispatcherClass extends Dispatcher {
  handleViewAction(action) {
    console.log("*****start handleViewAction******");
    console.log(action);
    console.log("*****end handleViewAction******");
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    })
  }
  handleRequestAction(action) {
    console.log("*****start handleRequestAction******");
    console.log(action);
    console.log("*****end handleRequestAction******");
    this.dispatch({
      source: 'WEB_API_ACTION',
      action: action
    })
  }
  handleRequestFbOauth(action) {
    console.log("FACEBOOK handleRequestFbOauth");
    console.log(action);
    console.log("FACEBOOK handleRequestFbOauth");
    this.dispatch({
      source: 'FB_OAUTH_ACTION',
      action: action
    })
  }
}

const AppDispatcher = new DispatcherClass();

export default AppDispatcher;

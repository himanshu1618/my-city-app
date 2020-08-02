import Promise from 'promise-polyfill';

// Service call wrapper
// returns 'thunk' function that wraps service calls with fetch notifications (init, success, failure)
// Handles traditionally caught errors as well as apisauce 'problems'
// 'action_type' is used to generate init, success, and failure action types
export const wrapCall = (promise, action_type, init_args={}) => {
  return dispatch => {
    const {init, success, fail} = actionTypes(action_type);
    dispatch({type: init, promise, ...init_args});
    return promise
      .then(resp => {
        // check for valid response
        if (resp && resp.ok) {
          dispatch({type: success, data: resp.data, headers: resp.headers, ...init_args});
          return Promise.resolve({data: resp.data});

          //suppress notification on 404 errors, which are expected from the API
        } else if (resp && resp.status === 404) {
          dispatch({type: fail, data: resp.data, error: resp.problem, headers: resp.headers, ...init_args});
          return Promise.reject({data: resp.problem, error: resp.problem});

          //all other errors get reported
        } else {
          // Unified apisauce errors flow through here
          dispatch({type: fail, data: (resp && resp.data), error: (resp && resp.problem), headers: (resp && resp.headers), ...init_args});
          return Promise.reject({data: (resp && resp.data), error: (resp && resp.problem)});
        }
      })
      .catch(error => {
        if (error instanceof Error) {
          // eslint-disable-next-line no-console
          console.error(error);
          // redux and other errors come here
          dispatch({type: fail, error: error, ...init_args});
        }

        return Promise.reject(error);
      });
  };
};

// async action type template
// ex: const { init , success, fail } = actionTypes('TEST')
export const actionTypes = (prefix = 'fetch_data') => {
  prefix = prefix.toUpperCase();
  return {
    init: prefix,
    success: prefix + '_SUCCESS',
    fail: prefix + '_FAILURE'
  };
};

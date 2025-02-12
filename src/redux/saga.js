import { call, put, takeEvery } from 'redux-saga/effects'
import {generateDog} from './api'

function* fetchDog(action) {
   try {
      const user = yield call(generateDog, action.payload.userId);
      yield put({type: "DOG_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "DOG_FETCH_FAILED", message: e.message});
   }
}


export default function* rootSaga() {
    yield takeEvery('GENERATE_DOG', fetchDog)
  }

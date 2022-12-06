import * as api from '../api/api';
import { handleActions } from 'redux-actions';

// 하나의 요청 당 세개의 액션
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

// thunk 함수
// 시작했을 때, 성공했을 때, 실패했을 때 다른 액션을 디스패치함
export const getPost = (id) => async (dispatch) => {
	dispatch({ type: GET_POST }); // 요청 시작 알림
	try {
		const response = await api.getPost(id);
		dispatch({
			type: GET_POST_SUCCESS,
			payload: response.data,
		}); // 요청 성공 알림
	} catch (e) {
		dispatch({
			type: GET_POST_FAILURE,
			payload: e,
			error: true,
		}); // 요청 실패 알림
		throw e; // 추후 컴포넌트단에서 에러를 조회할 수 있게 해줌
	}
};

export const getUsers = () => async (dispatch) => {
	dispatch({ type: GET_USERS }); // 요청 시작 알림
	try {
		const response = await api.getUsers();
		dispatch({
			type: GET_USERS_SUCCESS,
			payload: response.data,
		}); // 요청 성공 알림
	} catch (e) {
		dispatch({
			type: GET_USERS_FAILURE,
			payload: e,
			error: true,
		}); // 요청 실패 알림
		throw e; // 추후 컴포넌트단에서 에러를 조회할 수 있게 해줌
	}
};

// 초기 상태
const initialState = {
	loading: {
		GET_POST: false,
		GET_USERS: false,
	},
	post: null,
	users: null,
};

const sample = handleActions(
	{
		[GET_POST]: (state) => ({
			...state,
			loading: {
				...state.loading,
				GET_POST: true, // 요청 시작
			},
		}),
		[GET_POST_SUCCESS]: (state, action) => ({
			...state,
			loading: {
				...state.loading,
				GET_POST: false, // 요청 완료
			},
			post: action.payload,
		}),
		[GET_POST_FAILURE]: (state) => ({
			...state,
			loading: {
				...state.loading,
				GET_POST: false,
			},
		}),
		[GET_USERS]: (state) => ({
			...state,
			loading: {
				...state.loading,
				GET_USERS: true, // 요청 시작
			},
		}),
		[GET_USERS_SUCCESS]: (state, actions) => ({
			...state,
			loading: {
				...state.loading,
				GET_USERS: false, // 요청 완료
			},
			users: actions.payload,
		}),
		[GET_USERS_FAILURE]: (state) => ({
			...state,
			loading: {
				...state.loading,
				GET_USERS: false,
			},
		}),
	},
	initialState,
);

export default sample;
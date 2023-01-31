//subreadits reducer

//imports
import { csrfFetch } from "./csrf";

//----------------------------------------------

//types crud - subreadits
const READ_SUBREADITS = `subreadits/READ`;
const READ_SUBREADIT_DETAILS = `subreadit/READ_DETAILS`;
const CREATE_SUBREADIT = `subreadits/CREATE`;
const UPDATE_SUBREADIT = `subreadits/UPDATE`;
const DELETE_SUBREADIT = `subreadits/DELETE`;
const RESET_SUBREADIT = "subreadits/resetState";

//----------------------------------------------

//regular actions
//read
const actionReadSubreadits = (subreadits) => ({
	type: READ_SUBREADITS,
	subreadits,
});

//read subreadit details
const actionReadSubreaditDetails = (subreadit) => ({
	type: READ_SUBREADIT_DETAILS,
	subreadit,
});

//create
const actionCreateSubreadit = (subreadit) => ({
	type: CREATE_SUBREADIT,
	subreadit,
});

//update
const actionUpdateSubreadit = (subreadit) => ({
	type: UPDATE_SUBREADIT,
	subreadit,
});

//delete
const actionDeleteSubreadit = (subreadit) => ({
	type: DELETE_SUBREADIT,
	subreadit,
});

//reset
export const actionResetSubreadits = () => ({
	type: RESET_SUBREADIT,
});

//----------------------------------------------

//thunk actions

// GET: Get All Subreadits Route: /api/sub
export const thunkReadSubreadits = () => async (dispatch) => {
	let response = await csrfFetch(`/api/sub`);

	// console.log(`thunk>>> response: `, response);

	if (response.ok) {
		const subs = await response.json();
		dispatch(actionReadSubreadits(subs));
		return subs;
	}
};

// GET: Get Subreadit Details Route: /api/sub/:subId
export const thunkReadSubreaditDetails = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/sub/${payload.subId}`);

	// console.log(`thunk>>> response: `, response);
	if (response.ok) {
		const subs = await response.json();
		dispatch(actionReadSubreaditDetails(subs));
		return subs;
	}
};

// POST: Create a Group Route: /api/sub
export const thunkCreateSubreadit = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/sub`, {
		method: `POST`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const subs = await response.json();
		dispatch(actionCreateSubreadit(subs));
		return subs;
	}
};

// PUT: Edit a Subreadit Route: /api/sub/:subId
export const thunkUpdateSubreadit = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/sub/${payload.id}`, {
		method: `PUT`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const subs = await response.json();
		dispatch(actionUpdateSubreadit(subs));
		return subs;
	}
};

// DELETE: Delete Subreadit Route: /api/sub/:subId
export const thunkDeleteSubreadit = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/sub/${payload.subId}`, {
		method: `DELETE`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	// console.log(`group id in THUNK>>>>>>>`,response);
	if (response.ok) {
		const subs = await response.json();
		dispatch(actionDeleteSubreadit(subs));
		return subs;
	}
};

//----------------------------------------------

//reducer

function defaultState() {
	const initialState = {};
	return initialState;
}

const subreaditsReducer = (state = defaultState(), action) => {
	switch (action.type) {
		case READ_SUBREADITS: {
			// console.log(`reducer>>> ACTION: `, action);

			const newSubs = action.subreadits.reduce((acc, sub) => {
				acc[sub.id] = sub;
				return acc;
			}, {});
			return {
				...state,
				...newSubs,
			};
		}

		case READ_SUBREADIT_DETAILS: {
			// console.log(`reducer>>> ACTION: `, action.subreadit);
			const newSub = { ...action.subreadit };
			return {
				...state,
				[action.subreadit.id]: newSub,
			};
		}

		case CREATE_SUBREADIT: {
			const newState = {
				...state,
<<<<<<< HEAD
				[action.group.id]: action.group,
=======
				[action.subreadit.id]: action.subreadit,
>>>>>>> 395a787217efe3aacf666ee5a950d8327df79fc6
			};
			return newState;
		}

		case UPDATE_SUBREADIT: {
<<<<<<< HEAD
			return { ...state, ...(state[action.group.id] = action.group) };
=======
			return { ...state, ...(state[action.subreadit.id] = action.subreadit) };
>>>>>>> 395a787217efe3aacf666ee5a950d8327df79fc6
		}

		case DELETE_SUBREADIT: {
			const newState = { ...state };
<<<<<<< HEAD
			delete newState[action.group.id];
=======
			delete newState[action.subreadit.id];
>>>>>>> 395a787217efe3aacf666ee5a950d8327df79fc6
			return newState;
		}

		case RESET_SUBREADIT:
			return defaultState();

		default:
			return state;
	}
};

export default subreaditsReducer;

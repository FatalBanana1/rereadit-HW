//subreadits reducer

//imports
import { csrfFetch } from "./csrf";

//----------------------------------------------

//types crud - subreadits
const READ_COMMENTS = `comments/READ`;
const READ_COMMENT_DETAILS = `comment/READ_DETAILS`;
const CREATE_COMMENT = `comments/CREATE`;
const UPDATE_COMMENT = `comments/UPDATE`;
const DELETE_COMMENT = `comments/DELETE`;
const RESET_COMMENTS = "comments/resetState";

//----------------------------------------------

//regular actions
//read
const actionReadComments = (comments) => ({
	type: READ_COMMENTS,
	comments,
});

//read subreadit details
const actionReadCommentDetails = (comment) => ({
	type: READ_COMMENT_DETAILS,
	comment,
});

//create
const actionCreateComment = (comment) => ({
	type: CREATE_COMMENT,
	comment,
});

//update
const actionUpdateComment = (comment) => ({
	type: UPDATE_COMMENT,
	comment,
});

//delete
const actionDeleteComment = (comment) => ({
	type: DELETE_COMMENT,
	comment,
});

//reset
export const actionResetComments = () => ({
	type: RESET_COMMENTS,
});

//----------------------------------------------

//thunk actions

// GET: Get All Comments by Post
// Route: /api/posts/:postId/comments
export const thunkReadComments = (payload) => async (dispatch) => {
	let response = await csrfFetch(`/api/posts/${payload.postId}/comments`);

	// console.log(`thunk>>> response: `, response);

	if (response.ok) {
		const comments = await response.json();
		dispatch(actionReadComments(comments));
		return comments;
	}
};

// POST: Create a Comment
// Route: /api/posts/:postId/comments
export const thunkCreateComment = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/sub`, {
		method: `POST`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const comments = await response.json();
		dispatch(actionCreateComment(comments));
		return comments;
	}
};

// PUT: Edit a Comment
// Route: /api/comments/:commentId
export const thunkUpdateComment = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/sub/${payload.id}`, {
		method: `PUT`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const comments = await response.json();
		dispatch(actionUpdateComment(comments));
		return comments;
	}
};

// DELETE: Delete a Comment
// Route: /api/posts/:postId/comments
export const thunkDeleteComment = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/sub/${payload.subId}`, {
		method: `DELETE`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	// console.log(`group id in THUNK>>>>>>>`,response);
	if (response.ok) {
		const comments = await response.json();
		dispatch(actionDeleteComment(comments));
		return comments;
	}
};

//----------------------------------------------

//reducer

function defaultState() {
	const initialState = {};
	return initialState;
}

const commentsReducer = (state = defaultState(), action) => {
	switch (action.type) {
		case READ_COMMENTS: {
			// console.log(`reducer>>> ACTION: `, action);
			const newSubs = action.comments.reduce((acc, comm) => {
				acc[comm.id] = comm;
				return acc;
			}, {});
			return {
				...newSubs,
			};
		}

		case CREATE_COMMENT: {
			const newState = {
				...state,
				[action.comment.id]: action.comment,
			};
			return newState;
		}

		case UPDATE_COMMENT: {
			return {
				...state,
				...(state[action.comment.id] = action.comment),
			};
		}

		case DELETE_COMMENT: {
			const newState = { ...state };
			delete newState[action.comment.id];
			return newState;
		}

		case RESET_COMMENTS: {
			return defaultState();
		}

		default:
			return state;
	}
};

export default commentsReducer;

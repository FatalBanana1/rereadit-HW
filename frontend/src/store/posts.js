//posts reducer

//imports
import { csrfFetch } from "./csrf";

//----------------------------------------------

//types crud - posts
const READ_POSTS = `posts/READ`;
const READ_POST_DETAILS = `post/READ_DETAILS`;
const CREATE_POST = `posts/CREATE`;
const UPDATE_POST = `posts/UPDATE`;
const DELETE_POST = `posts/DELETE`;
const RESET_POST = "posts/RESET_POSTS";

//----------------------------------------------

//regular actions
//read
const actionReadPosts = (posts) => ({
	type: READ_POSTS,
	posts,
});

//read post details
const actionReadPostDetails = (post) => ({
	type: READ_POST_DETAILS,
	post,
});

//create
const actionCreatePost = (post) => ({
	type: CREATE_POST,
	post,
});

//update
const actionUpdatePost = (post) => ({
	type: UPDATE_POST,
	post,
});

//delete
const actionDeletePost = (post) => ({
	type: DELETE_POST,
	post,
});

//reset
export const actionResetPosts = () => ({
	type: RESET_POST,
});

//----------------------------------------------

//thunk actions

// GET: Get All Posts by Subreadit
// Route: /api/sub/:subid/posts
export const thunkReadPosts = (payload) => async (dispatch) => {
	let response = await csrfFetch(`/api/sub/${payload.subId}/posts`);
	if (response.ok) {
		const posts = await response.json();
		dispatch(actionReadPosts(posts));
		// console.log(`thunk>>> response: `, posts);
		return posts;
	}
};

// GET: Get Post Details
// Route: /api/posts/:postId
export const thunkReadPostDetails = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/posts/${payload.postId}`);

	// console.log(`thunk>>> response: `, response);
	if (response.ok) {
		const posts = await response.json();
		dispatch(actionReadPostDetails(posts));
		return posts;
	}
};

// POST: Create a Post
// Route: /api/sub/:subId/posts
export const thunkCreatePost = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/sub/${payload.subId}/posts`, {
		method: `POST`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const posts = await response.json();
		dispatch(actionCreatePost(posts));
		return posts;
	}
};

// PUT: Edit a Post
// Route: /api/posts/:postId
export const thunkUpdatePost = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/posts/${payload.postId}`, {
		method: `PUT`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const posts = await response.json();
		dispatch(actionUpdatePost(posts));
		return posts;
	}
};

// DELETE: Delete a Post
// Route: /api/posts/:postId
export const thunkDeletePost = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/posts/${payload.postId}`, {
		method: `DELETE`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	// console.log(`group id in THUNK>>>>>>>`,response);
	if (response.ok) {
		const posts = await response.json();
		dispatch(actionDeletePost(posts));
		return posts;
	}
};

//----------------------------------------------

//reducer

function defaultState() {
	const initialState = {};
	return initialState;
}

const postsReducer = (state = defaultState(), action) => {
	switch (action.type) {
		case READ_POSTS: {
			// console.log(`reducer>>> ACTION: `, action);

			const newSubs = action.posts.reduce((acc, sub) => {
				acc[sub.id] = sub;
				return acc;
			}, {});
			return {
				...newSubs,
			};
		}

		case READ_POST_DETAILS: {
			// console.log(`reducer>>> ACTION: `, action.subreadit);
			const newSub = { ...action.post };
			return {
				...state,
				[action.post.id]: newSub,
			};
		}

		case CREATE_POST: {
			const newState = {
				...state,
				[action.post.id]: action.post,
			};
			return newState;
		}

		case UPDATE_POST: {
			return { ...state, ...(state[action.post.id] = action.post) };
		}

		case DELETE_POST: {
			const newState = { ...state };
			delete newState[action.post.id];
			return newState;
		}

		case RESET_POST: {
			console.log(`REDUCER RESET POSTS-------2:`);
			return defaultState();
		}

		default:
			return state;
	}
};

export default postsReducer;

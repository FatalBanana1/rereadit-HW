// subreadit index

//imports
// import React, { useEffect, useState } from "react";
// import * as sessionActions from "../../../store/session";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink, useHistory } from "react-router-dom";
// import { actionResetPosts, thunkReadPosts } from "../../../store/posts";

//main
const ReadComment = ({ comment }) => {
	let {
		id,
		postId,
		parentId,
		text,
		createdAt,
		User,
		PostComments,
		childComments,
	} = comment;

	//dates
	let date = new Date(createdAt).toString().split(" ");
	let month = date[1];
	let day = date[2];
	let year = date[3];


};

export default ReadComment;

/*

{
id,
postId,
parentId,
text,
createdAt,
User { id, username},
PostComments { id, subId, userId},
childComments
}

*/

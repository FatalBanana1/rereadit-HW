// subreadit index

//imports
import React, { useEffect, useState } from "react";
// import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
// import { NavLink, useHistory } from "react-router-dom";
// import { actionResetPosts, thunkReadPosts } from "../../../store/posts";

//main
const ReadComment = ({ comment }) => {
	console.log(`COMMENT ID ---`, comment);
	// let allComments = useSelector((state) => state.comments);
	console.log(`COMMENT>>>`, comment.childComments);
	// let curr = allComments[comment.id];

	if (comment && comment.User) {
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

		// console.log(`COMMENT>>>`, comment);

		return (
			<div className="read-comments">
				<div className="about-post">{`${User.username}: ${text}`}</div>
				<div>{`Posted ${month} ${day}, ${year}`}</div>

				{/* {curr && curr.childComments.length > 0 ? (
					<ReadComment
						key={curr.id}
						comment={[allComments[curr.childComments[0].id]]}
					/>
				) : null} */}

				{comment && childComments[0] ? (
					<ReadComment key={comment.id} comment={childComments[0]} />
				) : null}
			</div>
		);
	} else return null;
	// return (
	// 	<div className="readpost-container" id={comment.id}>
	// 		<div className="about-post">{`About: ${text}`}</div>
	// 		<div>{`Created by: ${User.username}`}</div>
	// 		<div>{`Posted ${month} ${day}, ${year}`}</div>
	// 	</div>
	// );
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

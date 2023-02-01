// subreadit index

//imports
// import React, { useEffect, useState } from "react";
// import * as sessionActions from "../../../store/session";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink, useHistory } from "react-router-dom";
// import { actionResetPosts, thunkReadPosts } from "../../../store/posts";

//main
const ReadComment = ({ comment }) => {
	// let {
	// 	CommentCount,
	// 	Subreadit,
	// 	User,
	// 	id,
	// 	linkUrl,
	// 	picUrl,
	// 	text,
	// 	title,
	// 	createdAt,
	// } = post;
	// //dates
	// let date = new Date(createdAt).toString().split(" ");
	// let month = date[1];
	// let day = date[2];
	// let year = date[3];

	return (
		<>
			<div>Read Comment!</div>
		</>
	);

	//return
	// if (post) {
	// 	return (
	// 		<div className="readpost-container">
	// 			<h4>{`${title}`}</h4>
	// 			<div className="about-post">{`About: ${text}`}</div>
	// 			{linkUrl ? (
	// 				<div target="_blank">{`Link: ${linkUrl}`}</div>
	// 			) : null}
	// 			<div>{`Created by: ${User.username}`}</div>
	// 			<div>{`${CommentCount} Comments`}</div>
	// 			<div>{`Posted ${month} ${day}, ${year}`}</div>
	// 			<div>{`From ${Subreadit.name}`}</div>
	// 		</div>
	// 	);
	// } else return null;
};

export default ReadComment;

/*

{

}

*/

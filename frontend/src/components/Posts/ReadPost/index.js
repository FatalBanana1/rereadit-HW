// subreadit index

//imports
// import React, { useEffect, useState } from "react";
// import * as sessionActions from "../../../store/session";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink, useHistory } from "react-router-dom";
// import { actionResetPosts, thunkReadPosts } from "../../../store/posts";

//main
const ReadPost = ({ post }) => {
	let {
		CommentCount,
		Subreadit,
		User,
		// id,
		linkUrl,
		// picUrl,
		text,
		title,
		createdAt,
	} = post;
	//dates
	let date = new Date(createdAt).toString().split(" ");
	let month = date[1];
	let day = date[2];
	let year = date[3];

	//return
	if (post) {
		return (
			<div className="readpost-container">
				<h4>{`${title}`}</h4>
				<div className="about-post">{`About: ${text}`}</div>
				{linkUrl ? (
					<div target="_blank">{`Link: ${linkUrl}`}</div>
				) : null}
				<div className="spacing">{`Created by: ${User.username}`}</div>
				<div className="spacing">{`${CommentCount} Comments`}</div>
				<div className="spacing">{`Posted ${month} ${day}, ${year}`}</div>
				<div className="spacing">{`From ${Subreadit.name}`}</div>
			</div>
		);
	} else return null;
};

export default ReadPost;

/*

let {
	CommentCount,
	Subreadit,
	User {id, username},
	id,
	linkUrl,
	picUrl,
	text,
	title
	} = post


*/

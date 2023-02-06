"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Comments";
		return queryInterface.bulkInsert(
			options,
			[
				// {
				// 	postId: 1,
				// 	userId: 2,
				// 	parentId: null,
				// 	text: "I don't even know why I'm commenting.",
				// },
				// {
				// 	postId: 1,
				// 	userId: 3,
				// 	parentId: 1,
				// 	text: "I don't know why you are either",
				// },
				// {
				// 	postId: 1,
				// 	userId: 1,
				// 	parentId: null,
				// 	text: "I started this subreadit",
				// },
				// {
				// 	postId: 1,
				// 	userId: 2,
				// 	parentId: 3,
				// 	text: "Nobody cares.",
				// },
				{
					userId: 1,
					postId: 1,
					text: "Attempting to learn python as my first programming language.. would like to create a simple trading bot on quantconnect but still learning the very basics. I used to joke that I couldn’t code my way out of a box, but now I can at least print(“Help! I’m stuck in a cardboard box!”) Baby steps I guess",
					parentId: null,
				},
				{
					userId: 3,
					postId: 1,
					text: "Hahahaha",
					parentId: 1,
				},
				{
					userId: 4,
					postId: 1,
					text: "Using python to connect to my 3D printers in my print farm so I can be sent updates when one of them needs attention. Using a pi3 connected to all printers CIA usb,sending to Mqtt brocker which is read by my home assistant install.",
					parentId: null,
				},
				{
					userId: 5,
					postId: 1,
					text: "Attempting to make a file explorer using tkinter",
					parentId: null,
				},
				{
					userId: 6,
					postId: 1,
					text: "That looks pretty cool",
					parentId: 4,
				},
				{
					userId: 5,
					postId: 1,
					text: "Thank you!",
					parentId: 5,
				},
				{
					userId: 3,
					postId: 2,
					text: "I'm unusually excited about this release! Let's rage! Some great shit in here! Type expressions, better bulk operation and returning support, lots of performance improvements.",
					parentId: null,
				},
				{
					userId: 4,
					postId: 2,
					text: "80% of the friction I've seen from implementating mypy has been lack of type support here. Will be incredible.",
					parentId: 7,
				},
				{
					userId: 5,
					postId: 2,
					text: "Hope it's good. Maybe I'm an idiot but I found it impossible to get the stub file to work with vs code",
					parentId: 7,
				},
				{
					userId: 1,
					postId: 2,
					text: "I have to say, I love this release. The type support is incredible. And I just updated a project's dependencies from 1.4 to 2.0 without changing any code, let's see what minimal changes I have to make to make them compatible.",
					parentId: null,
				},
				{
					userId: 2,
					postId: 2,
					text: "The 2.0 syntax has been around for a while so if you're using that it should be plain sailing. Others might be still using the 1.4 syntax so changes would be required there as 2.0 drops support for that I think.",
					parentId: 10,
				},
				{
					userId: 6,
					postId: 2,
					text: "You're right. I didn't have to make any changes at all.",
					parentId: 11,
				},
				{
					userId: 3,
					postId: 2,
					text: "Is there any support for something like sqlalchemy-filters?",
					parentId: null,
				},
				{
					userId: 3,
					postId: 2,
					text: "You can dynamically create a list of filters and then pass it to SQLAlchemy.",
					parentId: 12,
				},
				{
					userId: 3,
					postId: 2,
					text: "I like the support for dataclasses and attrs",
					parentId: null,
				},
				{
					userId: 7,
					postId: 2,
					text: "I could be wrong, but the built-in SQLAlchemy filter methods require you to already have all of the columns declared and imported or whatever whereas the filters package I linked to let's you pass in free text columns names which is better for my use case.",
					parentId: 14,
				},
				{
					userId: 7,
					postId: 3,
					text: "I could be wrong, but the built-in SQLAlchemy filter methods require you to already have all of the columns declared and imported or whatever whereas the filters package I linked to let's you pass in free text columns names which is better for my use case.",
					parentId: null,
				},
				{
					userId: 5,
					postId: 3,
					text: "ChatGPT's response: ChatGPT is a language model that can generate human-like text based on the input it receives. It is not designed to replace programmers or any specific profession. However, it can be used to automate certain tasks, such as code generation or documentation creation, which could potentially make some aspects of programming more efficient. However, it would not make javascript programmers obsolete as chatgpt is a model and it requires human to operate and make decisions.",
					parentId: null,
				},
				{
					userId: 2,
					postId: 3,
					text: "Please god make these posts stop. I'll do anything for it to stop, just make it go away",
					parentId: null,
				},
				{
					userId: 2,
					postId: 3,
					text: "I've never been one of those people on reddit who got upset about seeing the same question or post all the time, but something about seeing this question every other day in my feed is killing me slowly.",
					parentId: 18,
				},
				{
					userId: 4,
					postId: 3,
					text: "ChatGpt is google on steroids, learn to use it. We are in one of the fastest changing industries and if anything it should excite us at the possibilities. With it one developer can now do more go farther and build better things",
					parentId: null,
				},
				{
					userId: 3,
					postId: 3,
					text: "I can't help wondering if ChatGPT wrote this question ",
					parentId: null,
				},
				{
					userId: 3,
					postId: 4,
					text: "Funny enough this has been the case for the last 1000 points he has scored. In 400 points he will be the only one who has scored a certain amount.",
					parentId: null,
				},
				{
					userId: 1,
					postId: 4,
					text: "I’m actually more impressed by Kareem holding this record for such a long time. Now the question is, how long will Lebron hold it? That may be the measure by which we gauge the greatest scorer of all time.",
					parentId: null,
				},
				{
					userId: 6,
					postId: 4,
					text: "Kareem played 10 seasons with the 3-point shot available... and went 1-for-18. I don't think his scoring total would have increased by much if the 3-point line had been around for his first 10 seasons.",
					parentId: 23,
				},
				{
					userId: 6,
					postId: 1,
					text: "Your Welcome!!!",
					parentId: 6,
				},
				{
					userId: 2,
					postId: 1,
					text: "I’ve made a simple long range shooting calculator for sport shooting events. It takes some thumb rules and uses the inputs to give corrections. 					Feedback would be appreciated as I’m pretty new to creating stuff on my own.",
					parentId: null,
				},
				{
					userId: 3,
					postId: 1,
					text: "nice code, clean, easy to read. didn't get much into details, but I would say that it might be better to handle user interface logic in UI elements. i.e. instead of handling ValueError in distance_in_yards, a try/except block could be introduced in distance_to_target function in main file around distance_in_yards function call. this approach is usually called separation of concerns",
					parentId: 27,
				},
				{
					userId: 4,
					postId: 1,
					text: "Nice, thank you! I’ll have to read up about separation of concerns. I’ll definitely fix it in the short term though. That makes sense to import them all explicitly. A bit of laziness on my part if I’m honest.",
					parentId: 28,
				},
				{
					userId: 5,
					postId: 1,
					text: "import * is good when you want to do something fast and lazy, but it pollutes the namespace, so generally should not be used, although I see some libraries documentations suggesting importing like this",
					parentId: 29,
				},
				{
					userId: 6,
					postId: 1,
					text: "This is cool. I had a similar idea, but it was a website that would give you exact directions for getting the zero for your rifle that you want based on barrel length and carriage ballistics, ect.",
					parentId: 27,
				},
				{
					userId: 7,
					postId: 1,
					text: "That would be really cool. I hope to see it someday! Working on adding in some zero range calculations based on some ballistics tables I got from Hornady.",
					parentId: 31,
				},
				{
					userId: 2,
					postId: 1,
					text: "Can u more tell about this?It's like ml vision?",
					parentId: 27,
				},
				{
					userId: 2,
					postId: 1,
					text: "Not at all, it's simpler than that. Basically, the script reads the Excel file and looks for a specific keyword, chosen by the user. Let's say the keyword is price. The script will find it and then parse the whole column.",
					parentId: 33,
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Comments";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				postId: {
					[Op.gte]: 0,
				},
			},
			{}
		);
	},
};

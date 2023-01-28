import "./Home.css";
export default function Home() {
	return (
		<>
			<div id="page-top">
				<div id="page-top-banner"></div>
				<div id="page-top-strip">
					<div id="page-top-title">
						<h1>Hello from python</h1>
					</div>
				</div>
			</div>
			<div id="content-container">
				<div id="left-content-container">
					<div id="create-post-container">
						<form>
							<label htmlFor="create-post">
								Create new post
								<input id="create-post" type="text" />
							</label>
						</form>
					</div>
					<div id="post-card-container">
						{/* Map post links */}
						<div id="post-card">
							<h3>I am an individual post</h3>
							<p>I am a preview of the post's content...</p>
						</div>
						<div id="post-card">
							<h3>I am an individual post</h3>
							<p>I am a preview of the post's content...</p>
						</div>
						<div id="post-card">
							<h3>I am an individual post</h3>
							<p>I am a preview of the post's content...</p>
						</div>
						<div id="post-card">
							<h3>I am an individual post</h3>
							<p>I am a preview of the post's content...</p>
						</div>
					</div>
				</div>

				<div id="right-content-container">
					<div id="about-card">
						<h3>I am an about card</h3>
					</div>
				</div>
			</div>
		</>
	);
}

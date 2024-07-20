import { Client, Account} from "appwrite";
import React, { useState } from "react";



export default function Login() {



	

	
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const client = new Client()
			.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) 
			.setProject(import.meta.env.VITE_APPWRITE_PROJECT);
		
			const account = new Account(client);
			const promise = account.createEmailPasswordSession(email, password);

			promise.then(function (response) {
				console.log(response); // Success
			}, function (error) {
				console.log(error); // Failure
			});
		} catch (error) {
			setError("An error occurred");
		}
		setLoading(false);
	};
	return  <form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button type="submit" disabled={loading}>
				{loading ? "Loading..." : "Login"}
			</button>
			{error && <div>{error}</div>}
		</form>;
}

import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from '../utils/supabase'
import { Session } from '@supabase/supabase-js'
import useToken from '../utils/useToken'



export default function App() {
  const [session, setSession] = useState<Session|null>(null)

  const [mail, setMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const {setToken} = useToken();


  useEffect(() => {
	supabase.auth.getSession().then(({ data: { session } }) => {
		setSession(session)
	})

	const {
		data: { subscription },
	} = supabase.auth.onAuthStateChange((_event, session) => {
		setSession(session)
	})

	return () => subscription.unsubscribe()
  }, [])


  
  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();
	const { data, error } = await supabase.auth.signInWithPassword({
		email: mail,
		password: password,
	})
	console.log(data, error);
	if (data) {
		setToken(JSON.stringify(data));
	}
	
	
	
  }

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	const { name, value } = e.target
	if (name === 'email') {
		setMail(value)
	} else if (name === 'password') {
		setPassword(value)
	}

  }

  if (!session) {
	return (
		<form onSubmit={formSubmit}>
			<label htmlFor="email">Email</label>
			<input type="email" name="email" id="email" onChange={inputChange}/>
			<label htmlFor="password">Password</label>
			<input type="password" name="password" id="password" onChange={inputChange}/>
			<button type="submit">Login</button>
		</form>
	)
  }
  else {
	return (<div>Logged in!</div>)
  }
}
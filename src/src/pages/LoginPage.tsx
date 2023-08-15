import { signInWithEmailAndPassword } from 'firebase/auth';
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { fb } from "../lib/firebase";

export const LoginPage = () => {

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(fb.auth, credentials.email, credentials.password);
            const idToken = await userCredential.user.getIdToken();
            
            await fetch(`${import.meta.env.VITE_API_URL}/user`, {
                method: "POST",
                body: JSON.stringify({ idToken })
            });

        } catch (err: any) {
            console.error(err);
        }
    }

    return (
        <main>
            <h1>Login</h1>

            <form id="loginForm" onSubmit={e => handleSubmit(e)}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={credentials.email} onChange={e => setCredentials({...credentials, email: e.target.value})} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={credentials.password} onChange={e => setCredentials({...credentials, password: e.target.value})} />

                <button type="submit">Login</button>
            </form>

            {/* Login with 3rd party provider */}
            <Link to="/signup" title="Create Account">Don't have an account?</Link>

        </main>
    )
}
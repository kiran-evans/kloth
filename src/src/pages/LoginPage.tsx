import { Google } from '@mui/icons-material';
import { passwordStrength } from 'check-password-strength';
import { createUserWithEmailAndPassword, getRedirectResult, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';
import { FormEvent, useState } from "react";
import { fb } from "../lib/firebase";

export const LoginPage = () => {
    const [isNewUser, setIsNewUser] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isFetching, setIsFetching] = useState(false);

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    });

    // Login handlers
    // Third-party login handlers also double as sign up handlers as they automatically login the Firebase Auth user after successful sign up
    const handleLoginWithEmail = async (e: FormEvent) => {
        e.preventDefault();
            
        setIsFetching(true);
        
        try {
            // Sign in Firebase Auth user with email and password
            await signInWithEmailAndPassword(fb.auth, credentials.email, credentials.password);            

        } catch (err: any) {
            setErrorMsg(String(err));
        }
        
        setIsFetching(false);
    }

    const handleLoginWithGoogle = async () => {            
        setIsFetching(true);

        try {
            await signInWithRedirect(fb.auth, fb.google);

            const userCredential = await getRedirectResult(fb.auth);
            if (!userCredential) throw "Failed to get redirect result from Google.";

        } catch (err: any) {
            setErrorMsg(String(err));
        }
        
        setIsFetching(false);
    }

    // Sign up handlers
    const handleSignUpWithEmail = async (e: FormEvent) => {
        e.preventDefault();
        if (credentials.password !== credentials.repeatPassword) return setErrorMsg("Passwords do not match.");

        const passwordAnalysis = passwordStrength(credentials.password);
        if (passwordAnalysis.length < 10) return setErrorMsg("Password must be at least 10 characters long.");
        if (!passwordAnalysis.contains.includes('lowercase')) return setErrorMsg("Password must contain a lowercase letter.");
        if (!passwordAnalysis.contains.includes('uppercase')) return setErrorMsg("Password must contain an uppercase letter.");
        if (!passwordAnalysis.contains.includes('symbol')) return setErrorMsg("Password must contain a special character.");
        if (!passwordAnalysis.contains.includes('number')) return setErrorMsg("Password must contain a number.");
            
        setIsFetching(true);

        try {
            // Create new Firebase Auth user (this also establishes a session)
            const userCredential = await createUserWithEmailAndPassword(fb.auth, credentials.email, credentials.password);

            // Get an id token and pass it to the server to be used to create PGDB entry
            const idToken = await userCredential.user.getIdToken();            
            await fetch(`${import.meta.env.VITE_API_URL}/user`, {
                method: "POST",
                body: JSON.stringify({ idToken })
            });

        } catch (err: any) {
            setErrorMsg(String(err));
        }
        
        setIsFetching(false);
    }

    return (
        <main>
            {isNewUser ?
                <>
                    <h1>Sign Up</h1>

                    <form id="loginForm" onSubmit={e => handleSignUpWithEmail(e)}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={credentials.email} onChange={e => setCredentials({...credentials, email: e.target.value})} />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={credentials.password} minLength={10} onChange={e => setCredentials({...credentials, password: e.target.value})} />

                        <label htmlFor="repeatPassword">Repeat password</label>
                        <input type="password" id="repeatPassword" value={credentials.repeatPassword} minLength={10} onChange={e => setCredentials({...credentials, repeatPassword: e.target.value})} />

                        <button type="submit" disabled={isFetching}>Submit</button>
                        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                    </form>

                    {/* Login with 3rd party provider */}
                    {<>
                        <button disabled={isFetching} onClick={() => handleLoginWithGoogle()}><Google />&nbsp;Sign Up with Google</button>
                    </>}
                    <a title="Login" onClick={() => setIsNewUser(false)}>Already have an account?</a>
                </>
                :
                <>
                    <h1>Login</h1>

                    <form id="loginForm" onSubmit={e => handleLoginWithEmail(e)}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={credentials.email} onChange={e => setCredentials({...credentials, email: e.target.value})} />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={credentials.password} onChange={e => setCredentials({...credentials, password: e.target.value})} />

                        <button type="submit">Login</button>
                    </form>

                    {/* Login with 3rd party provider */}
                    {<>
                        <button disabled={isFetching} onClick={() => handleLoginWithGoogle()}><Google />&nbsp;Login with Google</button>
                    </>}
                    <a title="Sign Up" onClick={() => setIsNewUser(true)}>Don't have an account?</a>
                </>            
            }

        </main>
    )
}
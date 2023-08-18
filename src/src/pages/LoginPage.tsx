import { Google } from '@mui/icons-material';
import { passwordStrength } from 'check-password-strength';
import { EmailAuthProvider, GoogleAuthProvider, getRedirectResult, linkWithCredential, signInWithRedirect } from 'firebase/auth';
import { FormEvent, useContext, useState } from "react";
import { AppContext } from '../components/ContextProvider';
import { fb } from "../lib/firebase";

export const LoginPage = () => {
    const [isNewUser, setIsNewUser] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isFetching, setIsFetching] = useState(false);

    const { state } = useContext(AppContext);

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    });

    // Login handlers

    /*
        When the user logs in, the handling of the Firebase Auth user is performed automatically by the Firebase SDK.
        The Firebase SDK simply provides the linkWithCredential() method which is the only thing performed on this page.
        Calling linkWithCredential() automatically triggers the onAuthStateChange() method which is managed by ContextProvider.tsx.
        The user's data in the app state and in the database are handled by the onAuthStateChange() callback,
            meaning no calls to the server need to happen on this page (thanks to the Firebase SDK automatically updating the Auth State).
    */

    const handleLoginWithEmail = async (e: FormEvent) => {
        e.preventDefault();
            
        setIsFetching(true);
        
        try {
            // Sign in Firebase Auth user with email and password
            const credential = EmailAuthProvider.credential(credentials.email, credentials.password);

            // Upgrade anonymous user to auth user
            await linkWithCredential(state.user, credential);

        } catch (err: any) {
            setErrorMsg(String(err));
        }
        
        setIsFetching(false);
    }

    // Third-party login handlers also double as sign up handlers as they automatically login the Firebase Auth user after successful sign up
    const handleLoginWithGoogle = async () => {            
        setIsFetching(true);

        try {
            // Sign in Firebase Auth user with Google
            await signInWithRedirect(fb.auth, fb.google);

            const userCredential = await getRedirectResult(fb.auth);
            if (!userCredential) throw "Failed to get redirect result from Google.";

            const credential = GoogleAuthProvider.credentialFromResult(userCredential);
            if (!credential) throw "Failed to get credential from result.";

            // Upgrade anonymous user to auth user
            await linkWithCredential(state.user, credential);

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
            
        handleLoginWithEmail(e);
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
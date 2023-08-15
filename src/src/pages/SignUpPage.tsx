import { Google } from '@mui/icons-material';
import { passwordStrength } from 'check-password-strength';
import { createUserWithEmailAndPassword, getRedirectResult, signInWithRedirect } from 'firebase/auth';
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { fb } from '../lib/firebase';

export const SignUpPage = () => {

    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [isFetching, setIsFetching] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formValues.password !== formValues.repeatPassword) return setErrorMsg("Passwords do not match.");

        const passwordAnalysis = passwordStrength(formValues.password);
        if (passwordAnalysis.length < 10) return setErrorMsg("Password must be at least 10 characters long.");
        if (!passwordAnalysis.contains.includes('lowercase')) return setErrorMsg("Password must contain a lowercase letter.");
        if (!passwordAnalysis.contains.includes('uppercase')) return setErrorMsg("Password must contain an uppercase letter.");
        if (!passwordAnalysis.contains.includes('symbol')) return setErrorMsg("Password must contain a special character.");
        if (!passwordAnalysis.contains.includes('number')) return setErrorMsg("Password must contain a number.");
            
        setIsFetching(true);

        try {
            // Create new Firebase Auth user (this also establishes a session)
            const userCredential = await createUserWithEmailAndPassword(fb.auth, formValues.email, formValues.password);

            // Get an id token and pass it to the server to be used to create PGDB entry
            const idToken = await userCredential.user.getIdToken();
            console.log(idToken);
            
            await fetch(`${import.meta.env.VITE_API_URL}/user`, {
                method: "POST",
                body: JSON.stringify({ idToken: idToken }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

        } catch (err: any) {
            setErrorMsg(String(err));
        }
        
        setIsFetching(false);
    }

    const handleSignInWithGoogle = async () => {            
        setIsFetching(true);

        try {
            await signInWithRedirect(fb.auth, fb.google);

            const userCredential = await getRedirectResult(fb.auth);
            if (!userCredential) throw "Failed to get redirect result from Google.";

            // Get an id token and pass it to the server to be used to create PGDB entry
            const idToken = await userCredential.user.getIdToken();
            console.log(idToken);
            
            await fetch(`${import.meta.env.VITE_API_URL}/user`, {
                method: "POST",
                body: JSON.stringify({ idToken: idToken }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

        } catch (err: any) {
            setErrorMsg(String(err));
        }
        
        setIsFetching(false);
    }

    return (
        <main>
            <h1>Create Account</h1>

            <form id="loginForm" onSubmit={e => handleSubmit(e)}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={formValues.email} onChange={e => setFormValues({...formValues, email: e.target.value})} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={formValues.password} minLength={10} onChange={e => setFormValues({...formValues, password: e.target.value})} />

                <label htmlFor="repeatPassword">Repeat password</label>
                <input type="password" id="repeatPassword" value={formValues.repeatPassword} minLength={10} onChange={e => setFormValues({...formValues, repeatPassword: e.target.value})} />

                <button type="submit" disabled={isFetching}>Submit</button>
                {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            </form>

            {/* Login with 3rd party provider */}
            {<>
                <button disabled={isFetching} onClick={() => handleSignInWithGoogle()}><Google />&nbsp;Sign Up with Google</button>
            </>}
            <Link to="/login" title="Login">Already have an account?</Link>

        </main>
    )
}
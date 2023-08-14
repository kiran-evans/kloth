import { passwordStrength } from 'check-password-strength';
import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../components/ContextProvider";

export const SignUpPage = () => {

    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const { dispatch } = useContext(AppContext);

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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
                method: "POST",
                body: JSON.stringify(formValues)
            });
            dispatch({ type: 'SET_USER', payload: res.json() });
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
            </>}
            <Link to="/login" title="Login">Already have an account?</Link>

        </main>
    )
}
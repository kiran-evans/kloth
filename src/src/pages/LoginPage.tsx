export const LoginPage = () => {
    return (
        <main>
            <h1>Login</h1>

            <form id="loginForm">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" />

                <button type="submit">Login</button>
            </form>

            {/* Login with 3rd party provider */}
            {/* Link to sign up */}

        </main>
    )
}
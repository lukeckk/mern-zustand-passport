export default function Login() {
  const submitLogin = () => {

  }

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={submitLogin}>
        <label>Username</label>
        <input type="text" name="username" required />

        <label>Password</label>
        <input type="password" name="password" required />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default function Login() {
  const submitLogin = () => {

  }

  return (
    <div>
      <h1>Log In Page</h1>
      <form onSubmit={submitLogin}>
        <label>Email</label>
        <input type="text" name="email" required />

        <label>Password</label>
        <input type="password" name="password" required />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
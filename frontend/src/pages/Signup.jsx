export default function Signup() {
  const submitSignup = () => {

  }

  return (
    <div>
      <h1>Sign Up Page</h1>
      <form onSubmit={submitSignup}>
        <label>Username</label>
        <input type="text" name="usename" required />

        <label>Email</label>
        <input type="text" name="email" required />

        <label>Password</label>
        <input type="password" name="password" required />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
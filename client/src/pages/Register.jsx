function Register() {
  return (
    <div>
      <h1>Register Page</h1>
      <form>
        <input type="text" placeholder="Name" />
        <br /><br />
        <input type="email" placeholder="Email" />
        <br /><br />
        <input type="password" placeholder="Password" />
        <br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
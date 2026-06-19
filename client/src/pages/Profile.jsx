function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return <h2>Please Login</h2>;
  }

  return (
    <div className="container mt-5">
      <h2>My Profile</h2>

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default Profile;
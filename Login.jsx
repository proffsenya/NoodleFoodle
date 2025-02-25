const handleLogin = (e) => {
  e.preventDefault();
  if (email === testAccount.email && password === testAccount.password) {
    setIsLoggedIn(true);
    navigate("/profile");
  } else {
    setError("Invalid email or password");
  }
};

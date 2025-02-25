return (
  <div className="min-h-screen bg-white flex flex-col">
    <Header />
    <div className="flex-grow flex items-center my-20 pt-10 justify-center">
      <LoginSection
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        error={error}
      />
    </div>
    <Footer />
  </div>
);

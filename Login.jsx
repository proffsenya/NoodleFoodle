function LoginSection({ email, setEmail, password, setPassword, handleLogin, error }) {
  return (
    <section id="login" className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h1 className="mb-4 text-4xl font-bold text-center text-gray-800">Авторизация</h1>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block mb-2 text-lg text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите ваш email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-lg text-gray-700">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите ваш пароль"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <button
          type="submit"
          className="w-full px-6 py-3 text-white bg-black rounded-md hover:bg-gray-800"
        >
          Войти
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-lg text-gray-700">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </section>
  );
}

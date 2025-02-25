const handleSubmit = (e) => {
  e.preventDefault();
  if (validate()) {
    alert("Регистрация успешна!");
  }
};

// Update the JSX to display errors
<div>
  <label htmlFor="cardNumber" className="block mb-2 text-lg text-gray-700">
    Номер карты
  </label>
  <input
    type="text"
    id="cardNumber"
    name="cardNumber"
    placeholder="Введите номер вашей карты"
    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
      errors.cardNumber ? "ring-red-500" : "ring-blue-500"
    }`}
    value={formData.cardNumber}
    onChange={handleChange}
    required
  />
  {errors.cardNumber && (
    <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
  )}
</div>
<div>
  <label htmlFor="email" className="block mb-2 text-lg text-gray-700">
    Email
  </label>
  <input
    type="email"
    id="email"
    name="email"
    placeholder="Введите ваш email"
    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
      errors.email ? "ring-red-500" : "ring-blue-500"
    }`}
    value={formData.email}
    onChange={handleChange}
    required
  />
  {errors.email && (
    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
  )}
</div>

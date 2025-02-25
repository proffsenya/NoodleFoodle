const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cardNumberPattern = /^\d{16}$/;

  if (!formData.email.match(emailPattern)) {
    newErrors.email = "Введите корректный email";
  }

  if (!formData.cardNumber.match(cardNumberPattern)) {
    newErrors.cardNumber = "Введите корректный номер карты (16 цифр)";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

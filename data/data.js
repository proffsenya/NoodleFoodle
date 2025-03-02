export const whychoose = [
    {
        name: "Рецепты",
        photoname: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80",
        description: "Традиционные рецепты, передаваемые из поколения в поколение",
    },
    {
        name: "Быстрая доставка",
        photoname: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&q=80",
        description: "Горячая и свежая лапша с доставкой к вашей двери",
    },
    {
        name: "Свежие ингредиенты",
        photoname: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80",
        description: "В каждом блюде только лучшие ингредиенты",
    },
  ];

export const dishes = 
[
  {
    id: 1,
    name: "Конструктор блюд",
    price: "",
    image: "../img/constructor.png",
    description: "Это удобный инструмент для создания индивидуальных сочетаний ингредиентов, позволяющий собрать идеальное блюдо по своему вкусу.",
    weight: "",
    ingredients: []
  },
  {
    id: 2,
    name: "Вьетнамский рамен",
    price: "670₽",
    image:
      "../img/vietnam.jpg",
    description: "Насыщенный куриный бульон с добавлением вьетнамского соуса на основе соевого соуса.",
    weight: "600g",
    ingredients: ["Лапша рамен", "Яйцо маринованное", "Водоросли нори", "Лук зеленый", "Ростки сои", "Шпинат", "Красный лук", "Кинза", "Говяжий бульон фо-бо", "Шиитаке"]
  },
  {
    id: 3,
    name: "Сырный рамен",
    price: "670₽",
    image:
      "../img/cheese.jpg",
    description: "Один из видов японских раменов, ставший популярным благодаря сырному вкусу в сочетании классического куриного бульона с добавлением японского соуса сёю",
    weight: "490g",
    ingredients: ["Лапша рамен", "Яйцо маринованное", "Лук зеленый", "Водоросли нори", "Сыр", "Ростки сои", "Шпинат", "Кукуруза", "Шиитаке"]
  },
  {
    id: 4,
    name: "Сингапурский суп лакса",
    price: "690₽",
    image:
      "../img/laksa.jpg",
    description: "Острый Суп с кокосовым молоком и сливками с добавлением карри",
    weight: "500g",
    ingredients: ["Кокосовое молоко", "Сливки", "Лапша рамен", "Карри", "Бульон том ям", "Креветки", "Лук зеленый"]
  },
  {
    id: 5,
    name: "Том ям королевский с морепродуктами",
    price: "750₽",
    image:
      "../img/royal.jpg",
    description: "это роскошный тайский суп с королевскими морепродуктами, включая креветки, лосось и мидии, приготовленный на основе креветочного бульона и ароматных специй, таких как имбирь, красный лук и перец чилиx",
    weight: "500g",
    ingredients: ["Креветки", "Вешенки", "Кальмары", "Мидии голубые", "Рис", "Лайм", "Кинза", "Чили перец"]
  },
  {
    id: 6,
    name: "Том ям классический с морепродуктами",
    price: "690₽",
    image:
      "../img/classic.jpg",
    description: "Это самый популярный вариант среди туристов. Острота чили смягчается сладковато-сливочным кокосом, позволяя другим вкусам лучше раскрыться.",
    weight: "450g",
    ingredients: ["Тайский бульон", "Вешенки", "Креветки", "Кальмары", "Лайм", "Кинза", "Чили перец", "Рис", "Кунжут", "Мидии голубые"]
  }
]

export const populardishes = [
  {
    id: 2,
    name: "Вьетнамский рамен",
    price: "670₽",
    image:
      "../img/vietnam.jpg",
    description: "Насыщенный куриный бульон с добавлением вьетнамского соуса на основе соевого соуса. Рамен вьетнамский - это рамен, ставший популярным благодаря легкому и яркому сочетанию топпингов",
    weight: "600g",
    ingredients: ["Лапша рамен", "Яйцо маринованное", "Водоросли нори", "Лук зеленый", "Ростки сои", "Шпинат", "Красный лук", "Кинза", "Говяжий бульон фо-бо", "Шиитаке"]
  },
  {
    id: 3,
    name: "Сырный рамен",
    price: "670₽",
    image:
      "../img/cheese.jpg",
    description: "Один из видов японских раменов, ставший популярным благодаря сырному вкусу в сочетании классического куриного бульона с добавлением японского соуса сёю",
    weight: "490g",
    ingredients: ["Лапша рамен", "Яйцо маринованное", "Лук зеленый", "Водоросли нори", "Сыр", "Ростки сои", "Шпинат", "Кукуруза", "Шиитаке"]
  },
  {
    id: 4,
    name: "Сингапурский суп лакса",
    price: "690₽",
    image:
      "../img/laksa.jpg",
    description: "Острый Суп с кокосовым молоком и сливками с добавлением карри",
    weight: "500g",
    ingredients: ["Кокосовое молоко", "Сливки", "Лапша рамен", "Карри", "Бульон том ям", "Креветки", "Зелень", "Проростки бобов"]
  },
]

export const ingredientsData = [
  { name: "Лапша рамен", type: "noodles", price: 60, weight: 150, image: "../img/cheese.jpg" },
  { name: "Лапша рамен", type: "noodles", price: 60, weight: 150, image: "../img/cheese.jpg" },
  { name: "Рис", type: "noodles", price: 50, weight: 120, image: "../img/cheese.jpg" },
  { name: "Говяжий бульон фо-бо", type: "broth", price: 90, weight: 300, image: "../img/cheese.jpg" },
  { name: "Бульон том ям", type: "broth", price: 100, weight: 300, image: "../img/cheese.jpg" },
  { name: "Тайский бульон", type: "broth", price: 110, weight: 300, image: "../img/cheese.jpg" },
  { name: "Свинина", type: "broth", price: 120, weight: 100, image: "../img/cheese.jpg" },
  { name: "Курица", type: "broth", price: 90, weight: 100, image: "../img/cheese.jpg" },
  { name: "Говядина", type: "broth", price: 150, weight: 100, image: "../img/cheese.jpg" },
  { name: "Креветки", type: "broth", price: 180, weight: 80, image: "../img/cheese.jpg" },
  { name: "Кальмары", type: "broth", price: 140, weight: 80, image: "../img/cheese.jpg" },
  { name: "Мидии голубые", type: "broth", price: 140, weight: 80, image: "../img/cheese.jpg" },
  { name: "Тофу", type: "broth", price: 70, weight: 100, image: "../img/cheese.jpg" },
  { name: "Яйцо маринованное", type: "topping", price: 40, weight: 50, image: "../img/cheese.jpg" },
  { name: "Ростки сои", type: "topping", price: 25, weight: 50, image: "../img/cheese.jpg" },
  { name: "Шпинат", type: "topping", price: 30, weight: 50, image: "../img/cheese.jpg" },
  { name: "Красный лук", type: "topping", price: 35, weight: 40, image: "../img/cheese.jpg" },
  { name: "Кинза", type: "topping", price: 20, weight: 15, image: "../img/cheese.jpg" },
  { name: "Лук зеленый", type: "topping", price: 20, weight: 30, image: "../img/cheese.jpg" },
  { name: "Капуста", type: "topping", price: 30, weight: 50, image: "../img/cheese.jpg" },
  { name: "Шампиньоны", type: "topping", price: 50, weight: 50, image: "../img/cheese.jpg" },
  { name: "Кимчи", type: "topping", price: 60, weight: 50, image: "../img/cheese.jpg" },
  { name: "Кукуруза", type: "topping", price: 40, weight: 50, image: "../img/cheese.jpg" },
  { name: "Сыр", type: "topping", price: 40, weight: 50, image: "../img/cheese.jpg" },
  { name: "Шиитаке", type: "topping", price: 60, weight: 50, image: "../img/cheese.jpg" },
  { name: "Вешенки", type: "topping", price: 55, weight: 50, image: "../img/cheese.jpg" },
  { name: "Кокосовое молоко", type: "extra", price: 80, weight: 100, image: "../img/cheese.jpg" },
  { name: "Сливки", type: "extra", price: 50, weight: 50, image: "../img/cheese.jpg" },
  { name: "Карри", type: "extra", price: 30, weight: 20, image: "../img/cheese.jpg" },
  { name: "Лайм", type: "extra", price: 25, weight: 30, image: "../img/cheese.jpg" },
  { name: "Чили перец", type: "extra", price: 20, weight: 10, image: "../img/cheese.jpg" },
  { name: "Водоросли нори", type: "extra", price: 50, weight: 10, image: "../img/cheese.jpg" },
  { name: "Кунжут", type: "extra", price: 15, weight: 5, image: "../img/cheese.jpg" },
  { name: "Маринованный имбирь", type: "extra", price: 30, weight: 20, image: "../img/cheese.jpg" },
  { name: "Чили масло", type: "extra", price: 25, weight: 10, image: "../img/cheese.jpg" },
  { name: "Соус тэрияки", type: "extra", price: 35, weight: 15, image: "../img/cheese.jpg" },
];
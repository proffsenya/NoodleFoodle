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
    description: "Насыщенный куриный бульон с добавлением вьетнамского соуса на основе соевого соуса. Рамен вьетнамский - это рамен, ставший популярным благодаря легкому и яркому сочетанию топпингов",
    weight: "600g",
    ingredients: ["лапша рамен", "яйцо маринованное", "водоросли нори", "лук зеленый", "ростки сои", "шпинат", "красный лук", "кинза", "говяжий бульон фо-бо", "шиитаке"]
  },
  {
    id: 3,
    name: "Сырный рамен",
    price: "670₽",
    image:
      "../img/cheese.jpg",
    description: "Один из видов японских раменов, ставший популярным благодаря сырному вкусу в сочетании классического куриного бульона с добавлением японского соуса сёю",
    weight: "490g",
    ingredients: ["лапша рамен", "яйцо маринованное", "лук зеленый", "водоросли нори", "сыр", "ростки сои", "шпинат", "кукуруза", "шиитаке"]
  },
  {
    id: 4,
    name: "Сингапурский суп лакса",
    price: "690₽",
    image:
      "../img/laksa.jpg",
    description: "Острый Суп с кокосовым молоком и сливками с добавлением карри",
    weight: "500g",
    ingredients: ["кокосовое молоко", "сливки", "лапша", "карри", "бульон том ям", "креветки", "зелень", "проростки бобов"]
  },
  {
    id: 5,
    name: "Том ям королевский с морепродуктами",
    price: "750₽",
    image:
      "../img/royal.jpg",
    description: "это роскошный тайский суп с королевскими морепродуктами, включая креветки, лосось и мидии, приготовленный на основе креветочного бульона и ароматных специй, таких как имбирь, красный лук и перец чилиx",
    weight: "500g",
    ingredients: ["Креветки", "грибы вешенки", "кальмар", "мидии голубые", "рис", "лайм", "кинза", "чили перец"]
  },
  {
    id: 6,
    name: "Том ям классический с морепродуктами",
    price: "690₽",
    image:
      "../img/classic.jpg",
    description: "Это самый популярный вариант среди туристов. Острота чили смягчается сладковато-сливочным кокосом, позволяя другим вкусам лучше раскрыться.",
    weight: "450g",
    ingredients: ["Тайский бульон", "вешенки", "креветки", "кальмар", "лайм", "кинза", "чили", "рис", "кунжут", "мидии"]
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
    ingredients: ["лапша рамен", "яйцо маринованное", "водоросли нори", "лук зеленый", "ростки сои", "шпинат", "красный лук", "кинза", "говяжий бульон фо-бо", "шиитаке"]
  },
  {
    id: 3,
    name: "Сырный рамен",
    price: "670₽",
    image:
      "../img/cheese.jpg",
    description: "Один из видов японских раменов, ставший популярным благодаря сырному вкусу в сочетании классического куриного бульона с добавлением японского соуса сёю",
    weight: "490g",
    ingredients: ["лапша рамен", "яйцо маринованное", "лук зеленый", "водоросли нори", "сыр", "ростки сои", "шпинат", "кукуруза", "шиитаке"]
  },
  {
    id: 4,
    name: "Сингапурский суп лакса",
    price: "690₽",
    image:
      "../img/laksa.jpg",
    description: "Острый Суп с кокосовым молоком и сливками с добавлением карри",
    weight: "500g",
    ingredients: ["кокосовое молоко", "сливки", "лапша", "карри", "бульон том ям", "креветки", "зелень", "проростки бобов"]
  },
]

export const ingredientsData = [
  { name: "Thick Noodles", type: "noodles", price: 3.99, weight: 200 },
  { name: "Thin Wheat Noodles", type: "noodles", price: 3.99, weight: 200 },
  { name: "Rice Noodles", type: "noodles", price: 3.99, weight: 200 },
  { name: "Tonkotsu", type: "broth", price: 4.99, weight: 300 },
  { name: "Miso", type: "broth", price: 4.99, weight: 300 },
  { name: "Shoyu", type: "broth", price: 4.99, weight: 300 },
  { name: "Chashu Pork", type: "topping", price: 3.99, weight: 50 },
  { name: "Soft-Boiled Egg", type: "topping", price: 1.99, weight: 30 },
  { name: "Green Onions", type: "topping", price: 0.99, weight: 20 },
  { name: "Bamboo Shoots", type: "topping", price: 1.99, weight: 40 },
  { name: "Nori", type: "topping", price: 0.99, weight: 10 },
  { name: "Spicy Sauce", type: "extra", price: 0.99, weight: 20 },
  { name: "Garlic Oil", type: "extra", price: 0.99, weight: 20 },
  { name: "Thick Noodles", type: "noodles", price: 3.99, weight: 200 },
  { name: "Thin Wheat Noodles", type: "noodles", price: 3.99, weight: 200 },
  { name: "Rice Noodles", type: "noodles", price: 3.99, weight: 200 },
  { name: "Tonkotsu", type: "broth", price: 4.99, weight: 300 },
  { name: "Miso", type: "broth", price: 4.99, weight: 300 },
  { name: "Shoyu", type: "broth", price: 4.99, weight: 300 },
  { name: "Chashu Pork", type: "topping", price: 3.99, weight: 50 },
  { name: "Soft-Boiled Egg", type: "topping", price: 1.99, weight: 30 },
  { name: "Green Onions", type: "topping", price: 0.99, weight: 20 },
  { name: "Bamboo Shoots", type: "topping", price: 1.99, weight: 40 },
  { name: "Nori", type: "topping", price: 0.99, weight: 10 },
  { name: "Spicy Sauce", type: "extra", price: 0.99, weight: 20 },
  { name: "Garlic Oil", type: "extra", price: 0.99, weight: 20 }
];
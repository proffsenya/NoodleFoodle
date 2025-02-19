// Menu items data
const menuItems = [
    {
        name: "Classic Ramen",
        price: "$12.99",
        description: "Fresh noodles in savory broth with traditional toppings",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80"
    },
    {
        name: "Spicy Miso",
        price: "$13.99",
        description: "Spicy miso broth with tender chashu pork",
        image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&q=80"
    },
    {
        name: "Vegetarian Delight",
        price: "$11.99",
        description: "Plant-based broth with seasonal vegetables",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80"
    }
];

// Populate menu items
function populateMenu() {
    const menuGrid = document.getElementById('menuGrid');
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-item-footer">
                    <span class="price">${item.price}</span>
                    <button class="btn-primary">Order Now</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}

// Handle contact form submission
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send this data to your server
    console.log('Form submitted:', { name, email, message });
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    populateMenu();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('Recommended');

  // Check if device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const categories = [
    { id: 1, name: 'All', icon: 'fa-utensils' },
    { id: 2, name: 'Pizza', icon: 'fa-pizza-slice' },
    { id: 3, name: 'Burgers', icon: 'fa-hamburger' },
    { id: 4, name: 'Sushi', icon: 'fa-fish' },
    { id: 5, name: 'Italian', icon: 'fa-cheese' },
    { id: 6, name: 'Chinese', icon: 'fa-bowl-rice' },
    { id: 7, name: 'Mexican', icon: 'fa-pepper-hot' },
    { id: 8, name: 'Indian', icon: 'fa-mortar-pestle' },
    { id: 9, name: 'Desserts', icon: 'fa-ice-cream' },
    { id: 10, name: 'Drinks', icon: 'fa-mug-hot' },
  ];

  const restaurants = [
    {
      id: 1,
      name: 'Gourmet Haven',
      image: 'https://readdy.ai/api/search-image?query=A%20modern%20restaurant%20interior%20with%20elegant%20table%20settings%2C%20ambient%20lighting%2C%20and%20stylish%20decor.%20The%20atmosphere%20is%20sophisticated%20yet%20welcoming%2C%20with%20a%20minimalist%20aesthetic%20featuring%20neutral%20tones%20and%20wooden%20elements.%20The%20image%20captures%20the%20dining%20area%20with%20perfectly%20arranged%20tables%20and%20comfortable%20seating&width=600&height=400&seq=1&orientation=landscape',
      rating: 4.8,
      reviews: 342,
      cuisine: 'Italian, Mediterranean',
      deliveryTime: '25-35',
      minOrder: '$15',
      featured: true
    },
    {
      id: 2,
      name: 'Spice Fusion',
      image: 'https://readdy.ai/api/search-image?query=A%20vibrant%20Indian%20restaurant%20with%20colorful%20decor%2C%20featuring%20traditional%20ornaments%20and%20warm%20lighting.%20The%20interior%20showcases%20rich%20textiles%2C%20wooden%20furniture%2C%20and%20authentic%20artwork.%20The%20ambiance%20is%20cozy%20and%20inviting%20with%20aromatic%20spices%20visible%20in%20the%20background.%20The%20setting%20highlights%20the%20cultural%20richness%20of%20Indian%20cuisine&width=600&height=400&seq=2&orientation=landscape',
      rating: 4.6,
      reviews: 218,
      cuisine: 'Indian, Asian',
      deliveryTime: '30-40',
      minOrder: '$20',
      featured: false
    },
    {
      id: 3,
      name: 'Burger Boulevard',
      image: 'https://readdy.ai/api/search-image?query=A%20modern%20burger%20restaurant%20with%20industrial-chic%20decor%20featuring%20exposed%20brick%20walls%2C%20metal%20fixtures%2C%20and%20wooden%20tables.%20The%20atmosphere%20is%20casual%20and%20energetic%20with%20subtle%20lighting.%20The%20space%20has%20a%20contemporary%20urban%20feel%20with%20minimalist%20design%20elements%20and%20a%20clean%20aesthetic%20that%20highlights%20the%20food&width=600&height=400&seq=3&orientation=landscape',
      rating: 4.5,
      reviews: 512,
      cuisine: 'American, Fast Food',
      deliveryTime: '15-25',
      minOrder: '$10',
      featured: true
    },
    {
      id: 4,
      name: 'Sushi Paradise',
      image: 'https://readdy.ai/api/search-image?query=A%20sleek%20Japanese%20sushi%20restaurant%20with%20minimalist%20design%2C%20featuring%20clean%20lines%20and%20natural%20materials.%20The%20interior%20has%20a%20zen-like%20atmosphere%20with%20subtle%20lighting%2C%20bamboo%20elements%2C%20and%20traditional%20Japanese%20accents.%20The%20sushi%20bar%20is%20visible%20with%20chefs%20preparing%20fresh%20dishes.%20The%20space%20conveys%20elegance%20and%20authenticity&width=600&height=400&seq=4&orientation=landscape',
      rating: 4.9,
      reviews: 287,
      cuisine: 'Japanese, Sushi',
      deliveryTime: '25-40',
      minOrder: '$25',
      featured: false
    },
    {
      id: 5,
      name: 'Pizza Perfection',
      image: 'https://readdy.ai/api/search-image?query=A%20rustic%20Italian%20pizzeria%20with%20a%20wood-fired%20oven%20visible%20in%20the%20background.%20The%20interior%20features%20warm%20terracotta%20colors%2C%20wooden%20tables%2C%20and%20vintage%20Italian%20decor.%20The%20atmosphere%20is%20cozy%20and%20authentic%20with%20soft%20lighting%20and%20the%20aroma%20of%20fresh%20pizza.%20The%20space%20has%20a%20traditional%20Mediterranean%20charm%20with%20modern%20touches&width=600&height=400&seq=5&orientation=landscape',
      rating: 4.7,
      reviews: 426,
      cuisine: 'Italian, Pizza',
      deliveryTime: '20-30',
      minOrder: '$12',
      featured: false
    },
    {
      id: 6,
      name: 'Taco Fiesta',
      image: 'https://readdy.ai/api/search-image?query=A%20colorful%20Mexican%20restaurant%20with%20vibrant%20wall%20murals%2C%20festive%20decorations%2C%20and%20traditional%20elements.%20The%20space%20features%20wooden%20furniture%2C%20terracotta%20accents%2C%20and%20authentic%20Mexican%20artwork.%20The%20atmosphere%20is%20lively%20and%20welcoming%20with%20warm%20lighting%20and%20cultural%20touches%20throughout.%20The%20setting%20captures%20the%20essence%20of%20Mexican%20dining%20culture&width=600&height=400&seq=6&orientation=landscape',
      rating: 4.4,
      reviews: 189,
      cuisine: 'Mexican, Latin',
      deliveryTime: '20-35',
      minOrder: '$15',
      featured: true
    },
    {
      id: 7,
      name: 'Noodle House',
      image: 'https://readdy.ai/api/search-image?query=An%20Asian%20noodle%20restaurant%20with%20contemporary%20design%20featuring%20bamboo%20elements%2C%20paper%20lanterns%2C%20and%20minimalist%20decor.%20The%20interior%20has%20a%20clean%20aesthetic%20with%20natural%20materials%20and%20subtle%20Asian%20influences.%20The%20open%20kitchen%20allows%20diners%20to%20see%20noodles%20being%20prepared.%20The%20atmosphere%20is%20casual%20yet%20refined%20with%20thoughtful%20lighting&width=600&height=400&seq=7&orientation=landscape',
      rating: 4.6,
      reviews: 312,
      cuisine: 'Chinese, Thai',
      deliveryTime: '25-35',
      minOrder: '$18',
      featured: false
    },
    {
      id: 8,
      name: 'Seafood Harbor',
      image: 'https://readdy.ai/api/search-image?query=A%20coastal%20seafood%20restaurant%20with%20nautical%20decor%2C%20featuring%20blue%20and%20white%20color%20scheme%2C%20wooden%20elements%2C%20and%20maritime%20accents.%20The%20interior%20has%20large%20windows%20overlooking%20water%2C%20fishing%20nets%20as%20decorations%2C%20and%20comfortable%20seating.%20The%20atmosphere%20is%20fresh%20and%20airy%20with%20subtle%20lighting%20that%20creates%20a%20relaxed%20dining%20experience&width=600&height=400&seq=8&orientation=landscape',
      rating: 4.8,
      reviews: 245,
      cuisine: 'Seafood, Mediterranean',
      deliveryTime: '30-45',
      minOrder: '$30',
      featured: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4 text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            <div className="flex items-center">
              <i className="fas fa-utensils text-orange-500 text-2xl mr-2"></i>
              <h1 className="text-xl font-bold text-gray-800">FoodExpress</h1>
            </div>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search for restaurants or dishes..." 
                className="w-full py-2 px-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <button className="p-2 text-gray-700 hover:text-orange-500 cursor-pointer !rounded-button whitespace-nowrap">
              <i className="fas fa-shopping-cart text-xl"></i>
              <span className="ml-1 hidden md:inline">Cart</span>
            </button>
            <button className="p-2 ml-3 text-gray-700 hover:text-orange-500 cursor-pointer !rounded-button whitespace-nowrap">
              <i className="fas fa-user-circle text-xl"></i>
              <span className="ml-1 hidden md:inline">Profile</span>
            </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for restaurants or dishes..." 
              className="w-full py-2 px-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer !rounded-button whitespace-nowrap">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute w-full z-50">
            <div className="container mx-auto px-4 py-3">
              <ul className="space-y-3">
                <li><a href="#" className="block py-2 text-gray-700 hover:text-orange-500">Home</a></li>
                <li><a href="#" className="block py-2 text-gray-700 hover:text-orange-500">Restaurants</a></li>
                <li><a href="#" className="block py-2 text-gray-700 hover:text-orange-500">Offers</a></li>
                <li><a href="#" className="block py-2 text-gray-700 hover:text-orange-500">My Orders</a></li>
                <li><a href="#" className="block py-2 text-gray-700 hover:text-orange-500">Help</a></li>
              </ul>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative">
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ 
                backgroundImage: `url('https://readdy.ai/api/search-image?query=A%20stunning%20food%20spread%20on%20a%20dark%20wooden%20table%20with%20various%20gourmet%20dishes%20beautifully%20arranged.%20The%20left%20side%20has%20a%20gradient%20dark%20background%20that%20transitions%20smoothly%20to%20the%20right%20where%20colorful%20food%20is%20displayed.%20The%20lighting%20is%20professional%20with%20soft%20highlights%20on%20the%20dishes.%20The%20composition%20is%20perfect%20for%20text%20overlay%20on%20the%20left%20side%20while%20maintaining%20visual%20interest%20on%20the%20right&width=1440&height=500&seq=9&orientation=landscape')` 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
            </div>
            <div className="container mx-auto px-4 h-full flex items-center relative z-10">
              <div className="max-w-lg text-white">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Delicious Food Delivered To Your Door</h2>
                <p className="text-lg md:text-xl mb-6">Order from your favorite restaurants with just a few clicks</p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 cursor-pointer !rounded-button whitespace-nowrap">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Category Navigation */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Explore Categories</h2>
            <div className="overflow-x-auto pb-4 md:overflow-visible">
              <div className="flex md:flex-wrap md:grid md:grid-cols-5 gap-4 min-w-max md:min-w-0">
                {categories.map(category => (
                  <div 
                    key={category.id}
                    onClick={() => setActiveCategory(category.name)}
                    className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all ${
                      activeCategory === category.name 
                        ? 'bg-orange-500 text-white shadow-md' 
                        : 'bg-white text-gray-700 hover:bg-orange-100 shadow'
                    }`}
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 mb-2">
                      <i className={`fas ${category.icon} text-orange-500 text-xl`}></i>
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Filters and Sorting */}
        <section className="sticky top-[72px] z-40 bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="py-3 flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center mb-3 md:mb-0">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center mr-4 text-gray-700 hover:text-orange-500 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-filter mr-2"></i>
                  <span>Filters</span>
                </button>
                
                <div className="relative">
                  <button 
                    className="flex items-center text-gray-700 hover:text-orange-500 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-sort mr-2"></i>
                    <span>{sortOption}</span>
                    <i className="fas fa-chevron-down ml-2 text-xs"></i>
                  </button>
                  
                  <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg hidden">
                    <div className="py-1">
                      {['Recommended', 'Rating', 'Delivery Time', 'Cost: Low to High', 'Cost: High to Low'].map((option) => (
                        <button
                          key={option}
                          onClick={() => setSortOption(option)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 cursor-pointer !rounded-button whitespace-nowrap"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                  <span>Fast Delivery</span>
                  <i className="fas fa-times-circle ml-2"></i>
                </button>
                <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                  <span>4.5+</span>
                  <i className="fas fa-times-circle ml-2"></i>
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                  <span>Clear All</span>
                </button>
              </div>
            </div>
            
            {/* Filter Panel */}
            {isFilterOpen && (
              <div className="py-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Cuisines</h3>
                    <div className="space-y-2">
                      {['Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese'].map((cuisine) => (
                        <label key={cuisine} className="flex items-center cursor-pointer">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500" />
                          <span className="ml-2 text-gray-700">{cuisine}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <div className="space-y-2">
                      {['$', '$$', '$$$', '$$$$'].map((price) => (
                        <label key={price} className="flex items-center cursor-pointer">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500" />
                          <span className="ml-2 text-gray-700">{price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Dietary</h3>
                    <div className="space-y-2">
                      {['Vegetarian', 'Vegan', 'Gluten-Free', 'Organic', 'Halal'].map((diet) => (
                        <label key={diet} className="flex items-center cursor-pointer">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500" />
                          <span className="ml-2 text-gray-700">{diet}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mr-3 cursor-pointer !rounded-button whitespace-nowrap">
                    Reset
                  </button>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Restaurant Listing */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Popular Restaurants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {restaurants.map(restaurant => (
                <div key={restaurant.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <div className="relative">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name} 
                      className="w-full h-48 object-cover object-top"
                    />
                    {restaurant.featured && (
                      <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        Featured
                      </div>
                    )}
                    <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow text-gray-700 hover:text-orange-500 cursor-pointer !rounded-button whitespace-nowrap">
                      <i className="fas fa-heart"></i>
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-gray-800">{restaurant.name}</h3>
                      <div className="flex items-center bg-green-100 px-2 py-1 rounded text-sm">
                        <span className="text-green-700 font-medium">{restaurant.rating}</span>
                        <i className="fas fa-star text-yellow-400 ml-1 text-xs"></i>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mt-1">{restaurant.cuisine}</p>
                    
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <div className="flex items-center mr-4">
                        <i className="fas fa-clock text-orange-400 mr-1"></i>
                        <span>{restaurant.deliveryTime} min</span>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-tag text-orange-400 mr-1"></i>
                        <span>Min {restaurant.minOrder}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs text-gray-500">{restaurant.reviews} reviews</span>
                      <button className="bg-orange-100 hover:bg-orange-200 text-orange-600 px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <button className="bg-white border border-orange-500 text-orange-500 hover:bg-orange-50 font-medium px-6 py-3 rounded-full cursor-pointer !rounded-button whitespace-nowrap">
                Load More Restaurants
              </button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <i className="fas fa-utensils text-orange-500 text-2xl mr-2"></i>
                <h2 className="text-xl font-bold">FoodExpress</h2>
              </div>
              <p className="text-gray-400 mb-6">Delicious food delivered to your doorstep. Order now from your favorite local restaurants.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <i className="fab fa-youtube text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Restaurants</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Promotions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Partner With Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for exclusive offers and updates.</p>
              <div className="flex mb-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow py-2 px-3 rounded-l-lg text-gray-800 border-none focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-r-lg cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Download Our App</h4>
                <div className="flex space-x-3">
                  <a href="#" className="bg-black text-white px-3 py-2 rounded-lg flex items-center cursor-pointer">
                    <i className="fab fa-apple text-2xl mr-2"></i>
                    <div className="text-xs">
                      <div>Download on the</div>
                      <div className="font-semibold">App Store</div>
                    </div>
                  </a>
                  <a href="#" className="bg-black text-white px-3 py-2 rounded-lg flex items-center cursor-pointer">
                    <i className="fab fa-google-play text-2xl mr-2"></i>
                    <div className="text-xs">
                      <div>Get it on</div>
                      <div className="font-semibold">Google Play</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>&copy; 2025 FoodExpress. All rights reserved.</p>
            <div className="mt-4 flex justify-center space-x-6">
              <i className="fab fa-cc-visa text-2xl"></i>
              <i className="fab fa-cc-mastercard text-2xl"></i>
              <i className="fab fa-cc-amex text-2xl"></i>
              <i className="fab fa-cc-paypal text-2xl"></i>
              <i className="fab fa-cc-apple-pay text-2xl"></i>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
          <div className="flex justify-around">
            <a href="#" className="flex flex-col items-center py-2 text-orange-500">
              <i className="fas fa-home text-xl"></i>
              <span className="text-xs mt-1">Home</span>
            </a>
            <a href="#" className="flex flex-col items-center py-2 text-gray-600">
              <i className="fas fa-search text-xl"></i>
              <span className="text-xs mt-1">Search</span>
            </a>
            <a href="#" className="flex flex-col items-center py-2 text-gray-600">
              <i className="fas fa-shopping-cart text-xl"></i>
              <span className="text-xs mt-1">Cart</span>
            </a>
            <a href="#" className="flex flex-col items-center py-2 text-gray-600">
              <i className="fas fa-user text-xl"></i>
              <span className="text-xs mt-1">Profile</span>
            </a>
          </div>
        </div>
      )}
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 bg-orange-500 text-white p-3 rounded-full shadow-lg cursor-pointer !rounded-button whitespace-nowrap"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
};

export default App;

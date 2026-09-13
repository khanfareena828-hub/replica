// TastyTube 20 Cooking Videos Data
// Easily replace any of the YouTube URLs below with your own YouTube video links!

const YOUTUBE_COOKING_VIDEOS = [
  {
    id: 1,
    url: "https://youtu.be/y1_Do44I0bo?si=ZgVLWI-PA3OLllYR",
    title: "Authentic Restaurant-Style Butter Chicken (Murgh Makhani)",
    chef: "Chef Ranveer Brar",
    category: "Indian"
  },
  {
    id: 2,
    url: "https://youtu.be/oU_RZonA1yE?si=DsO1F_6NqPLTNFjp",
    title: "Classic Italian Creamy Pasta Carbonara (No Cream Traditional Recipe)",
    chef: "Chef Antonio Rossi",
    category: "Italian"
  },
  {
    id: 3,
    url: "https://youtu.be/oA6HnoqOXkI?si=iw6QcGzUCQyZM9hx",
    title: "Crispy Garlic Chilli Veg Momos & Fiery Street Dipping Sauce",
    chef: "Street Food Secrets",
    category: "Street Food"
  },
  {
    id: 4,
    url: "https://youtu.be/XP41Huw-5H0?si=NonwAoCeI6ZftN38",
    title: "Decadent Molten Chocolate Lava Cake with Gooey Center",
    chef: "Sweet Tooth Bakehouse",
    category: "Desserts"
  },
  {
    id: 5,
    url: "https://youtu.be/LLWqK4cgki8?si=bnD7SwFgi17QGZCJ",
    title: "Wok Hei Szechuan Kung Pao Chicken with Crunchy Peanuts",
    chef: "Wok Master Chen",
    category: "Chinese"
  },
  {
    id: 6,
    url: "https://youtu.be/7oq9LjhEhSQ?si=xY4_7CfzFGVxNCcq",
    title: "Golden Fluffy Buttermilk Pancakes with Warm Maple Butter",
    chef: "Morning Kitchen Studio",
    category: "Breakfast"
  },
  {
    id: 7,
    url: "https://youtu.be/6_FCqXwKIQY?si=2iTT0J3OKk2kUV05",
    title: "Crispy Golden Vegetable Spring Rolls with Plum Dip",
    chef: "Asian Street Kitchen",
    category: "Snacks"
  },
  {
    id: 8,
    url: "https://youtu.be/JzhZxCQpM5A?si=zjjz8g5t4V3K6DvF",
    title: "Mediterranean Quinoa Power Bowl with Lemon Tahini Dressing",
    chef: "Green & Clean Gourmet",
    category: "Healthy"
  },
  {
    id: 9,
    url: "https://youtu.be/dU4FV2A_ZTM?si=QMInE85dYnN_OqaK",
    title: "Hyderabadi Dum Biryani with Fragrant Saffron Basmati Rice",
    chef: "Royal Dastarkhwan",
    category: "Indian"
  },
  {
    id: 10,
    url: "https://youtu.be/dQ3YKj12hHI?si=4HfUngoUHNV5kQ3r",
    title: "Authentic Neapolitan Pizza Margherita (72-Hour Fermented Dough)",
    chef: "Napoli Pizza Lab",
    category: "Italian"
  },
  {
    id: 11,
    url: "https://youtu.be/QwlY01atpsg?si=tFN1Vm8xLejjWJvq",
    title: "Restaurant Style Shahi Paneer with Soft Butter Garlic Naan",
    chef: "Chef Ranveer Brar",
    category: "Vegetarian"
  },
  {
    id: 12,
    url: "https://youtu.be/pAmemTkFkgk?si=ztTUbosTX4t25xPC",
    title: "Bangkok Night Market Pad Thai with Giant Prawns & Crispy Tofu",
    chef: "Wok Master Chen",
    category: "Chinese"
  },
  {
    id: 13,
    url: "https://youtu.be/iNyHzjxsdgk?si=MpNRb9JudqF4Ut_5",
    title: "Mumbai Vada Pav & Spicy Dry Garlic Chutney (The Street Burger)",
    chef: "Street Food Secrets",
    category: "Street Food"
  },
  {
    id: 14,
    url: "https://youtu.be/fQfc5NTqWMA?si=Gxvy1z2GDPdOr1_o",
    title: "Easy 15-Minute Sourdough Avocado Toast with Poached Eggs",
    chef: "Morning Kitchen Studio",
    category: "Breakfast"
  },
  {
    id: 15,
    url: "https://youtu.be/NrYmeJSNmVU?si=3w-3kEjnC7luJKFU",
    title: "Classic Italian Tiramisu (Original Treviso Recipe with Espresso)",
    chef: "Chef Antonio Rossi",
    category: "Desserts"
  },
  {
    id: 16,
    url: "https://youtu.be/YmKxog6RR9U?si=x6KKuUytwqKx-p_k",
    title: "Spicy Mexican Birria Tacos with Rich Slow-Cooked Consomé",
    chef: "Street Food Secrets",
    category: "Non-Vegetarian"
  },
  {
    id: 17,
    url: "https://youtu.be/eZN8--v11QE?si=L3fMUptm1TFP4hUw",
    title: "Creamy Tuscan Garlic Butter Salmon with Sun-Dried Tomatoes",
    chef: "Green & Clean Gourmet",
    category: "Healthy"
  },
  {
    id: 18,
    url: "https://youtu.be/hP5u2bUHTSQ?si=aO6b4HjrNbLYJi94",
    title: "Crunchy Samosas with Spiced Potato Green Pea Filling",
    chef: "Royal Dastarkhwan",
    category: "Snacks"
  },
  {
    id: 19,
    url: "https://youtu.be/T4YB1996guA?si=D-IcTrsijlcqyynU",
    title: "Authentic Japanese Tokyo Shoyu Ramen with Chashu Pork",
    chef: "Wok Master Chen",
    category: "Chinese"
  },
  {
    id: 20,
    url: "https://youtu.be/SMa-s-gZvgg?si=x2hMXrOYwSzHO9ge",
    title: "Creamy Garlic Butter Mushroom Risotto with Aged Parmesan",
    chef: "Chef Antonio Rossi",
    category: "Italian"
  }
];

// Helper to extract YouTube ID
function getYouTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : '';
}

// Helper to get thumbnail image
function getThumbnail(url) {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
}

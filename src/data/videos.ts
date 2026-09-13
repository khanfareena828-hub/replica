import { CategoryType, Chef, CookingVideo } from '../types';

/**
 * Utility function to extract the 11-character YouTube video ID from various YouTube URL formats.
 * Handles youtu.be, youtube.com/watch?v=, youtube.com/embed/, etc.
 */
export function extractYouTubeId(url: string): string {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    return match[1];
  }
  // Fallback if raw ID was passed
  if (url.trim().length === 11) {
    return url.trim();
  }
  return '';
}

/**
 * Generates official high-quality YouTube thumbnail from video ID.
 */
export function getYouTubeThumbnail(videoId: string): string {
  if (!videoId) return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

/**
 * Generates maxres thumbnail with fallback
 */
export function getYouTubeMaxThumbnail(videoId: string): string {
  if (!videoId) return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

/**
 * Generates clean YouTube embed URL with performance parameters
 */
export function getYouTubeEmbedUrl(videoId: string, autoplay: boolean = false): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1`;
}

/* =========================================================================
   20 COOKING VIDEOS DATA
   You can easily replace any of the YouTube URLs below with your own links.
   The video ID and thumbnail will automatically generate from the URL!
   ========================================================================= */

export const INITIAL_VIDEOS: CookingVideo[] = [
  {
    id: 'vid-1',
    youtubeUrl: 'https://youtu.be/y1_Do44I0bo?si=ZgVLWI-PA3OLllYR',
    youtubeId: extractYouTubeId('https://youtu.be/y1_Do44I0bo?si=ZgVLWI-PA3OLllYR'),
    title: 'Authentic Restaurant-Style Butter Chicken (Murgh Makhani)',
    channelName: 'Chef Ranveer Brar',
    channelAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=150&q=80',
    views: '1.8M views',
    numericViews: 1840000,
    uploadTime: '2 days ago',
    duration: '14:22',
    category: 'Indian',
    foodType: 'Non-Vegetarian',
    difficulty: 'Medium',
    prepTime: '20 mins',
    cookTime: '30 mins',
    servings: '4 servings',
    description: 'Learn the secret to making rich, velvety butter chicken with smoky tandoori chicken pieces simmered in a silky tomato and cashew nut gravy enriched with fragrant kasuri methi.',
    ingredients: [
      '800g boneless chicken thigh pieces',
      '1 cup Greek yogurt or thick curd',
      '4 large ripe tomatoes (pureed)',
      '50g unsalted butter & 2 tbsp fresh cream',
      '15-20 whole cashews (soaked and ground)',
      '1 tbsp ginger-garlic paste',
      '1 tbsp Kashmiri red chili powder',
      '1 tsp garam masala & 1 tsp crushed kasuri methi',
      'Salt to taste and fresh coriander for garnish'
    ],
    instructions: [
      'Marinate chicken with yogurt, ginger-garlic paste, red chili, and salt for at least 30 minutes.',
      'Pan-sear or grill the marinated chicken on high flame until nicely charred on all sides.',
      'In a heavy-bottomed pot, melt butter and sauté whole spices until aromatic.',
      'Add pureed tomatoes and cashew paste; simmer on medium flame until oil separates.',
      'Add cooked chicken pieces, adjust seasoning, and simmer gently for 10 minutes.',
      'Finish with warm fresh cream, roasted kasuri methi, and an extra pat of butter.'
    ],
    tags: ['ButterChicken', 'IndianCurry', 'RestaurantStyle', 'NonVegDelight'],
    likesCount: 54200,
    isTrending: true,
    isSpecial: true
  },
  {
    id: 'vid-2',
    youtubeUrl: 'https://youtu.be/oU_RZonA1yE?si=DsO1F_6NqPLTNFjp',
    youtubeId: extractYouTubeId('https://youtu.be/oU_RZonA1yE?si=DsO1F_6NqPLTNFjp'),
    title: 'Classic Italian Creamy Pasta Carbonara (No Cream Traditional Recipe)',
    channelName: 'Chef Antonio Rossi',
    channelAvatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=150&q=80',
    views: '950K views',
    numericViews: 950000,
    uploadTime: '4 days ago',
    duration: '11:45',
    category: 'Italian',
    foodType: 'Non-Vegetarian',
    difficulty: 'Medium',
    prepTime: '10 mins',
    cookTime: '15 mins',
    servings: '2 servings',
    description: 'The real Roman Pasta Carbonara made strictly without heavy cream. Learn the emulsion technique pairing crispy guanciale, pecorino romano, fresh egg yolks, and coarse black pepper.',
    ingredients: [
      '350g Spaghetti or Rigatoni',
      '150g Guanciale or thick-cut Pancetta',
      '4 fresh egg yolks + 1 whole egg',
      '80g freshly grated Pecorino Romano cheese',
      'Coarsely cracked whole black peppercorns',
      'Coarse sea salt for pasta water'
    ],
    instructions: [
      'Bring a large pot of salted water to a rolling boil and drop the pasta.',
      'Cut guanciale into bite-sized strips and render gently in a cold pan until crisp and golden.',
      'Whisk egg yolks, whole egg, grated Pecorino, and abundant black pepper in a bowl to form a thick paste.',
      'Transfer al-dente pasta directly into the warm guanciale pan off the heat.',
      'Pour in egg-cheese mixture along with a ladle of starchy pasta water, tossing vigorously to emulsify.',
      'Serve immediately with extra Pecorino and cracked black pepper.'
    ],
    tags: ['Carbonara', 'ItalianFood', 'AuthenticPasta', 'RomanClassic'],
    likesCount: 42100,
    isTrending: true,
    isQuick: true
  },
  {
    id: 'vid-3',
    youtubeUrl: 'https://youtu.be/oA6HnoqOXkI?si=iw6QcGzUCQyZM9hx',
    youtubeId: extractYouTubeId('https://youtu.be/oA6HnoqOXkI?si=iw6QcGzUCQyZM9hx'),
    title: 'Crispy Garlic Chilli Veg Momos & Fiery Street Dipping Sauce',
    channelName: 'Street Food Secrets',
    channelAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    views: '620K views',
    numericViews: 620000,
    uploadTime: '1 week ago',
    duration: '16:08',
    category: 'Street Food',
    foodType: 'Vegetarian',
    difficulty: 'Medium',
    prepTime: '25 mins',
    cookTime: '15 mins',
    servings: '3-4 servings',
    description: 'Crispy pan-fried dumplings filled with seasoned cabbage, carrots, bell peppers, and scallions served alongside the famous fiery garlic chili red chutney.',
    ingredients: [
      '2 cups all-purpose flour & water to knead',
      '2 cups finely shredded cabbage',
      '1 cup grated carrots and sweet corn',
      '4 scallions (chopped)',
      '1 tbsp dark soy sauce & 1 tsp sesame oil',
      '6 dry red chilies & 8 garlic cloves for chutney',
      '2 ripe tomatoes (charred) for spicy dip'
    ],
    instructions: [
      'Knead flour with water and pinch of salt into a smooth, pliable dough. Rest for 20 mins.',
      'Squeeze out excess moisture from cabbage and carrots, then toss with soy sauce and aromatics.',
      'Roll dough into thin round wrappers, fill with veg mixture, and pleat into crescents.',
      'Steam for 10 minutes until translucent, then pan-sear base with garlic oil for extra crunch.',
      'Blend boiled red chilies, garlic, and charred tomatoes into spicy momo chutney.'
    ],
    tags: ['StreetFood', 'CrispyMomos', 'Dumplings', 'VegetarianSnacks'],
    likesCount: 31200,
    isTrending: false,
    isQuick: false
  },
  {
    id: 'vid-4',
    youtubeUrl: 'https://youtu.be/XP41Huw-5H0?si=NonwAoCeI6ZftN38',
    youtubeId: extractYouTubeId('https://youtu.be/XP41Huw-5H0?si=NonwAoCeI6ZftN38'),
    title: 'Decadent Molten Chocolate Lava Cake with Gooey Center',
    channelName: 'Sweet Tooth Bakehouse',
    channelAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    views: '1.2M views',
    numericViews: 1200000,
    uploadTime: '3 days ago',
    duration: '09:50',
    category: 'Desserts',
    foodType: 'Vegetarian',
    difficulty: 'Easy',
    prepTime: '10 mins',
    cookTime: '12 mins',
    servings: '2 servings',
    description: 'Foolproof molten chocolate lava cakes with warm flowing chocolate centers. Prepared with simple pantry ingredients in under 25 minutes total.',
    ingredients: [
      '120g good quality bittersweet dark chocolate (60-70%)',
      '100g unsalted butter',
      '2 whole eggs + 2 egg yolks',
      '1/3 cup granulated sugar',
      '2 tbsp all-purpose flour',
      '1 tsp vanilla extract & pinch of sea salt',
      'Vanilla bean ice cream & powdered sugar for serving'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Butter and dust 2 ramekins with unsweetened cocoa powder.',
      'Melt dark chocolate and butter together over a water bath or in gentle microwave bursts.',
      'Whisk eggs, egg yolks, sugar, and vanilla until pale and slightly frothy.',
      'Fold in the melted chocolate mixture, then gently sift in the flour and salt.',
      'Divide batter between prepared ramekins. Bake for exactly 11-12 minutes.',
      'Let sit for 1 minute, invert onto dessert plates, and serve with vanilla ice cream.'
    ],
    tags: ['LavaCake', 'ChocolateLovers', 'DessertTime', 'BakingMagic'],
    likesCount: 78500,
    isTrending: true,
    isQuick: true
  },
  {
    id: 'vid-5',
    youtubeUrl: 'https://youtu.be/LLWqK4cgki8?si=bnD7SwFgi17QGZCJ',
    youtubeId: extractYouTubeId('https://youtu.be/LLWqK4cgki8?si=bnD7SwFgi17QGZCJ'),
    title: 'Wok Hei Szechuan Kung Pao Chicken with Crunchy Peanuts',
    channelName: 'Wok Master Chen',
    channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    views: '480K views',
    numericViews: 480000,
    uploadTime: '5 days ago',
    duration: '13:15',
    category: 'Chinese',
    foodType: 'Non-Vegetarian',
    difficulty: 'Medium',
    prepTime: '15 mins',
    cookTime: '10 mins',
    servings: '3 servings',
    description: 'Master the high-heat wok toss for authentic Kung Pao chicken featuring tender velveted chicken cubes, fragrant Szechuan peppercorns, dried chilies, and roasted peanuts.',
    ingredients: [
      '500g chicken breasts (cut into 1-inch dice)',
      '1/2 cup roasted unsalted peanuts',
      '10 whole dried red chilies (halved)',
      '1 tsp Szechuan peppercorns',
      '3 scallions (cut into batons) & 4 cloves garlic',
      'Sauce: 2 tbsp Chinkiang black vinegar, 2 tbsp light soy, 1 tbsp dark soy, 1 tbsp sugar, 1 tsp cornstarch'
    ],
    instructions: [
      'Velvet chicken in egg white, 1 tsp soy sauce, cornstarch, and Shaoxing cooking wine for 15 mins.',
      'Mix the Kung Pao sauce ingredients in a bowl and set next to the stove.',
      'Heat peanut oil in a wok until shimmering; flash fry chicken until 80% done, then remove.',
      'Add chilies and Szechuan peppercorns until fragrant and spicy oils release.',
      'Return chicken to wok with garlic, ginger, scallions, peanuts, and pour in sauce.',
      'Toss vigorously on maximum flame for 60 seconds until sauce glazes the chicken perfectly.'
    ],
    tags: ['KungPaoChicken', 'SzechuanFood', 'WokCooking', 'ChineseRecipes'],
    likesCount: 26400,
    isTrending: false,
    isQuick: true
  },
  {
    id: 'vid-6',
    youtubeUrl: 'https://youtu.be/7oq9LjhEhSQ?si=xY4_7CfzFGVxNCcq',
    youtubeId: extractYouTubeId('https://youtu.be/7oq9LjhEhSQ?si=xY4_7CfzFGVxNCcq'),
    title: 'Golden Fluffy Buttermilk Pancakes with Warm Maple Butter',
    channelName: 'Morning Kitchen Studio',
    channelAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    views: '830K views',
    numericViews: 830000,
    uploadTime: '6 days ago',
    duration: '08:40',
    category: 'Breakfast',
    foodType: 'Vegetarian',
    difficulty: 'Easy',
    prepTime: '10 mins',
    cookTime: '10 mins',
    servings: '4 servings',
    description: 'The ultimate fluffy breakfast pancake recipe with tall, cloud-soft interior, golden crispy edges, and served with whipped maple cinnamon butter and fresh berries.',
    ingredients: [
      '2 cups all-purpose flour',
      '2 tbsp granulated sugar & 2 tsp baking powder',
      '1/2 tsp baking soda & 1/2 tsp fine sea salt',
      '2 cups full-fat buttermilk',
      '2 large eggs (room temp)',
      '4 tbsp unsalted butter (melted and cooled)',
      'Pure maple syrup and fresh blueberries'
    ],
    instructions: [
      'Whisk dry ingredients in a large mixing bowl to aerate.',
      'In a separate jug, whisk buttermilk, eggs, and melted butter.',
      'Pour wet mixture into dry and gently fold just until combined (small lumps are good!).',
      'Heat a flat cast-iron griddle over medium-low heat and grease with butter.',
      'Pour 1/3 cup batter per pancake. Flip when bubbles pop and surface turns matte.',
      'Cook for another 1-2 minutes until golden brown; stack high and crown with butter.'
    ],
    tags: ['Pancakes', 'FluffyPancakes', 'SundayBreakfast', 'BrunchVibes'],
    likesCount: 51200,
    isTrending: true,
    isQuick: true
  },
  {
    id: 'vid-7',
    youtubeUrl: 'https://youtu.be/6_FCqXwKIQY?si=2iTT0J3OKk2kUV05',
    youtubeId: extractYouTubeId('https://youtu.be/6_FCqXwKIQY?si=2iTT0J3OKk2kUV05'),
    title: 'Crispy Golden Vegetable Spring Rolls with Sweet Plum Dip',
    channelName: 'Asian Street Kitchen',
    channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    views: '410K views',
    numericViews: 410000,
    uploadTime: '1 week ago',
    duration: '12:30',
    category: 'Snacks',
    foodType: 'Vegetarian',
    difficulty: 'Medium',
    prepTime: '20 mins',
    cookTime: '15 mins',
    servings: '4 servings',
    description: 'Ultra-crispy restaurant-style spring rolls stuffed with glass noodles, crunchy vegetables, and wood-ear mushrooms, wrapped in delicate thin sheets.',
    ingredients: [
      '15 spring roll pastry sheets',
      '100g glass noodles (soaked and snipped)',
      '2 cups shredded cabbage & 1 cup julienned carrots',
      '1 cup bean sprouts & 3 cloves minced garlic',
      '2 tbsp light soy sauce & 1 tsp sesame oil',
      'Oil for deep or air frying'
    ],
    instructions: [
      'Flash stir-fry veggies and glass noodles on high heat with seasonings; cool completely.',
      'Place a spring roll wrapper diamond-shape, fill with 2 tbsp stuffing, fold sides and roll tightly.',
      'Seal edges with a flour-water slurry.',
      'Fry in medium-hot oil (350°F / 175°C) for 4-5 minutes until blistered and golden.',
      'Drain on wire rack and slice diagonally for immediate crunchy serving.'
    ],
    tags: ['SpringRolls', 'CrispySnacks', 'AsianAppetizers', 'VeggieDelight'],
    likesCount: 22800,
    isTrending: false,
    isQuick: false
  },
  {
    id: 'vid-8',
    youtubeUrl: 'https://youtu.be/JzhZxCQpM5A?si=zjjz8g5t4V3K6DvF',
    youtubeId: extractYouTubeId('https://youtu.be/JzhZxCQpM5A?si=zjjz8g5t4V3K6DvF'),
    title: 'Mediterranean Quinoa Power Bowl with Lemon Tahini Dressing',
    channelName: 'Green & Clean Gourmet',
    channelAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    views: '530K views',
    numericViews: 530000,
    uploadTime: '3 days ago',
    duration: '10:15',
    category: 'Healthy',
    foodType: 'Vegetarian',
    difficulty: 'Easy',
    prepTime: '15 mins',
    cookTime: '15 mins',
    servings: '2 bowls',
    description: 'Vibrant, nutrient-dense Mediterranean quinoa bowl loaded with crispy spiced chickpeas, cucumbers, cherry tomatoes, kalamata olives, avocado, and creamy lemon-tahini dressing.',
    ingredients: [
      '1 cup tricolor quinoa (rinsed and cooked)',
      '1 can chickpeas (drained, tossed in cumin & paprika)',
      '1 English cucumber (diced) & 1 cup halved cherry tomatoes',
      '1/2 cup Kalamata olives & 1 ripe Hass avocado',
      'Dressing: 3 tbsp tahini, 2 tbsp fresh lemon juice, 1 clove garlic, warm water to thin',
      'Fresh mint and parsley leaves'
    ],
    instructions: [
      'Roast spiced chickpeas at 400°F (200°C) for 20 minutes until crisp.',
      'Cook quinoa in vegetable broth with a pinch of salt until fluffy.',
      'Whisk tahini with lemon juice, minced garlic, salt, and water until silky smooth.',
      'Assemble bowls with warm quinoa base, crisp chickpeas, diced vegetables, and avocado.',
      'Drizzle generously with tahini dressing and garnish with chopped fresh herbs.'
    ],
    tags: ['HealthyEating', 'QuinoaBowl', 'MediterraneanDiet', 'PlantBasedPower'],
    likesCount: 39700,
    isTrending: false,
    isQuick: true
  },
  {
    id: 'vid-9',
    youtubeUrl: 'https://youtu.be/dU4FV2A_ZTM?si=QMInE85dYnN_OqaK',
    youtubeId: extractYouTubeId('https://youtu.be/dU4FV2A_ZTM?si=QMInE85dYnN_OqaK'),
    title: 'Hyderabadi Dum Biryani with Fragrant Saffron Basmati Rice',
    channelName: 'Royal Dastarkhwan',
    channelAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    views: '2.4M views',
    numericViews: 2400000,
    uploadTime: '1 week ago',
    duration: '22:10',
    category: 'Indian',
    foodType: 'Non-Vegetarian',
    difficulty: 'Advanced',
    prepTime: '40 mins',
    cookTime: '45 mins',
    servings: '6 servings',
    description: 'Experience the royal culinary art of slow-cooked Hyderabadi Dum Biryani. Marinated meat sealed under layers of saffron-infused long grain basmati rice and caramelized onions.',
    ingredients: [
      '1 kg chicken or mutton pieces (bone-in)',
      '750g Aged Basmati Rice',
      '1 cup golden fried onions (Birista)',
      '1 cup thick hung curd',
      '1/4 cup warm milk with saffron strands',
      '2 tbsp homemade Biryani Masala & whole spices',
      'Fresh mint, coriander, and desi ghee'
    ],
    instructions: [
      'Marinate meat with fried onions, ginger-garlic paste, curd, biryani masala, and spices for 4 hours.',
      'Parboil soaked basmati rice in whole-spiced boiling water until 70% cooked; drain.',
      'In a heavy handi, spread the raw marinated meat evenly across the bottom.',
      'Layer the 70% cooked rice over the meat; drizzle saffron milk, rose water, and pure ghee.',
      'Seal lid tightly with wheat flour dough or heavy foil.',
      'Cook on high heat for 10 mins, then place on a tawa on low heat for 35 mins dum.'
    ],
    tags: ['DumBiryani', 'HyderabadiBiryani', 'RoyalFeast', 'RiceLovers'],
    likesCount: 142000,
    isTrending: true,
    isSpecial: true
  },
  {
    id: 'vid-10',
    youtubeUrl: 'https://youtu.be/dQ3YKj12hHI?si=4HfUngoUHNV5kQ3r',
    youtubeId: extractYouTubeId('https://youtu.be/dQ3YKj12hHI?si=4HfUngoUHNV5kQ3r'),
    title: 'Authentic Neapolitan Pizza Margherita (72-Hour Fermented Dough)',
    channelName: 'Napoli Pizza Lab',
    channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    views: '1.5M views',
    numericViews: 1500000,
    uploadTime: '4 days ago',
    duration: '18:40',
    category: 'Italian',
    foodType: 'Vegetarian',
    difficulty: 'Medium',
    prepTime: '30 mins',
    cookTime: '5 mins',
    servings: '4 pizzas',
    description: 'Achieve pizza perfection with leopard-spotted crusts, hand-crushed San Marzano tomatoes, fresh buffalo mozzarella, and fragrant sweet basil leaves baked on baking steel.',
    ingredients: [
      '500g Tipo 00 Italian flour',
      '325ml cold water (65% hydration)',
      '1.5g dry yeast & 12g fine sea salt',
      '1 can San Marzano tomatoes (DOP)',
      '250g Fresh Mozzarella di Bufala (torn)',
      'Fresh basil leaves & extra virgin olive oil'
    ],
    instructions: [
      'Mix flour, water, yeast, and salt. Knead for 10 minutes until supple, then cold ferment 48-72h.',
      'Divide into 250g dough balls and proof for 3-4 hours at room temperature.',
      'Gently stretch dough by hand from the center outward, leaving a puffed cornicione rim.',
      'Spread crushed San Marzano tomato sauce, fresh mozzarella chunks, and torn basil.',
      'Bake on preheated pizza steel at maximum oven temperature (500°F / 260°C+) for 4-6 minutes.'
    ],
    tags: ['NeapolitanPizza', 'PizzaMargherita', 'WoodfiredVibe', 'ItalianCooking'],
    likesCount: 89300,
    isTrending: true
  },
  {
    id: 'vid-11',
    youtubeUrl: 'https://youtu.be/QwlY01atpsg?si=tFN1Vm8xLejjWJvq',
    youtubeId: extractYouTubeId('https://youtu.be/QwlY01atpsg?si=tFN1Vm8xLejjWJvq'),
    title: 'Restaurant Style Shahi Paneer with Soft Butter Garlic Naan',
    channelName: 'Chef Ranveer Brar',
    channelAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=150&q=80',
    views: '780K views',
    numericViews: 780000,
    uploadTime: '5 days ago',
    duration: '15:20',
    category: 'Vegetarian',
    foodType: 'Vegetarian',
    difficulty: 'Medium',
    prepTime: '15 mins',
    cookTime: '20 mins',
    servings: '4 servings',
    description: 'Velvety cottage cheese cubes bathed in an aromatic royal cashew, melon seed, and onion-tomato gravy with delicate saffron undertones and warm spices.',
    ingredients: [
      '400g fresh paneer (cut into cubes)',
      '15 cashews & 1 tbsp melon seeds (boiled and ground)',
      '2 medium onions & 3 tomatoes (pureed)',
      '1/2 cup fresh malai or heavy cream',
      '1 tsp shahi garam masala, cardamom powder, and kasuri methi',
      'Desi ghee and butter'
    ],
    instructions: [
      'Soak paneer cubes in warm salted water to keep them cloud-soft.',
      'Sauté onions, tomatoes, and soaked nuts; blend into a silky smooth paste.',
      'Cook paste in fragrant desi ghee until gloss appears on surface.',
      'Add spices, simmer gently, then slip in paneer cubes and fresh cream.',
      'Serve warm with charred butter garlic naan straight from the cast iron skillet.'
    ],
    tags: ['ShahiPaneer', 'PaneerLove', 'NorthIndianFood', 'VegetarianCurry'],
    likesCount: 46200,
    isTrending: false
  },
  {
    id: 'vid-12',
    youtubeUrl: 'https://youtu.be/pAmemTkFkgk?si=ztTUbosTX4t25xPC',
    youtubeId: extractYouTubeId('https://youtu.be/pAmemTkFkgk?si=ztTUbosTX4t25xPC'),
    title: 'Bangkok Night Market Pad Thai with Giant Prawns & Crispy Tofu',
    channelName: 'Wok Master Chen',
    channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    views: '670K views',
    numericViews: 670000,
    uploadTime: '1 week ago',
    duration: '11:55',
    category: 'Chinese',
    foodType: 'Non-Vegetarian',
    difficulty: 'Medium',
    prepTime: '15 mins',
    cookTime: '10 mins',
    servings: '2 servings',
    description: 'Learn the genuine sweet, sour, and savory tamarind balancing act for legendary Thai street noodles stir-fried with firm pressed tofu, eggs, dried shrimp, and plump prawns.',
    ingredients: [
      '200g flat rice noodles (soaked in warm water)',
      '8 large tiger prawns (peeled and deveined)',
      '100g firm pressed yellow tofu (cubed)',
      '2 eggs, 1 cup garlic chives, 1 cup bean sprouts',
      'Pad Thai Sauce: 3 tbsp tamarind paste, 3 tbsp palm sugar, 3 tbsp fish sauce',
      'Crushed roasted peanuts and fresh lime wedges'
    ],
    instructions: [
      'Simmer tamarind paste, palm sugar, and fish sauce until sugar dissolves; set aside.',
      'Sear prawns and tofu in hot wok oil until prawns turn pink; push to the side.',
      'Crack eggs into empty center of wok, scramble lightly, then fold into noodles.',
      'Add soaked noodles and spoon sauce across; toss vigorously until noodles absorb sauce.',
      'Fold in garlic chives and bean sprouts for 30 seconds; plate with crushed peanuts and lime.'
    ],
    tags: ['PadThai', 'ThaiStreetFood', 'NoodleLovers', 'AsianWok'],
    likesCount: 38400,
    isTrending: false,
    isQuick: true
  },
  {
    id: 'vid-13',
    youtubeUrl: 'https://youtu.be/iNyHzjxsdgk?si=MpNRb9JudqF4Ut_5',
    youtubeId: extractYouTubeId('https://youtu.be/iNyHzjxsdgk?si=MpNRb9JudqF4Ut_5'),
    title: 'Mumbai Vada Pav & Spicy Dry Garlic Chutney (The Ultimate Street Burger)',
    channelName: 'Street Food Secrets',
    channelAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    views: '1.1M views',
    numericViews: 1100000,
    uploadTime: '2 weeks ago',
    duration: '14:05',
    category: 'Street Food',
    foodType: 'Vegetarian',
    difficulty: 'Medium',
    prepTime: '20 mins',
    cookTime: '15 mins',
    servings: '6 vada pavs',
    description: 'Crispy spiced potato patties deep fried in seasoned chickpea batter, stuffed inside pillowy pav bread with green mint chutney and signature dry red garlic coconut chutney.',
    ingredients: [
      '4 large boiled potatoes (mashed)',
      '1.5 cups besan (gram flour) with turmeric & pinch of hing',
      'Tempering: Mustard seeds, curry leaves, green chilies, ginger-garlic paste',
      'Dry Garlic Chutney: Fried besan crumbs (chura), garlic cloves, Kashmiri red chili, dry coconut',
      '6 fresh ladi pavs & salted fried green chilies'
    ],
    instructions: [
      'Temper spices in hot oil, add mashed potatoes, turmeric, fresh coriander, and salt. Shape into balls.',
      'Whisk besan with water, salt, and baking soda into a thick dipping consistency.',
      'Dip potato balls into batter and deep fry in hot oil until golden and crisp.',
      'Fry remaining droplets of batter to make crunchy chura, then blend with garlic and chili.',
      'Slit pav, smear with spicy garlic chutney, insert hot batata vada, and serve with fried chili.'
    ],
    tags: ['VadaPav', 'MumbaiFood', 'StreetFoodIndia', 'DesiBurger'],
    likesCount: 65100,
    isTrending: false
  },
  {
    id: 'vid-14',
    youtubeUrl: 'https://youtu.be/fQfc5NTqWMA?si=Gxvy1z2GDPdOr1_o',
    youtubeId: extractYouTubeId('https://youtu.be/fQfc5NTqWMA?si=Gxvy1z2GDPdOr1_o'),
    title: 'Easy 15-Minute Sourdough Avocado Toast with Poached Eggs & Chili Oil',
    channelName: 'Morning Kitchen Studio',
    channelAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    views: '390K views',
    numericViews: 390000,
    uploadTime: '1 week ago',
    duration: '07:30',
    category: 'Breakfast',
    foodType: 'Vegetarian',
    difficulty: 'Easy',
    prepTime: '5 mins',
    cookTime: '8 mins',
    servings: '2 servings',
    description: 'Elevate your morning with thick grilled artisanal sourdough, crushed ripe Haas avocado with lemon juice and flake salt, topped with perfectly runny poached eggs and crispy chili crunch.',
    ingredients: [
      '2 thick slices rustic artisan sourdough bread',
      '2 ripe Hass avocados',
      '2 fresh free-range pasture eggs',
      '1 tbsp fresh lime juice & flaky sea salt (Maldon)',
      '1 tbsp crunchy chili oil / chili crisp',
      'Microgreens or fresh cilantro for garnish'
    ],
    instructions: [
      'Toast sourdough slices in olive oil on a skillet until deeply golden and crunchy.',
      'Mash avocado roughly with a fork, leaving texture, and fold in lime juice and salt.',
      'Poach eggs in simmering water with a drop of vinegar for exactly 3 minutes.',
      'Spread avocado generously over warm sourdough.',
      'Top with poached egg, drizzle chili oil, and sprinkle flaky sea salt.'
    ],
    tags: ['AvocadoToast', 'HealthyBreakfast', 'QuickRecipes', 'PoachedEggs'],
    likesCount: 34100,
    isTrending: false,
    isQuick: true
  },
  {
    id: 'vid-15',
    youtubeUrl: 'https://youtu.be/NrYmeJSNmVU?si=3w-3kEjnC7luJKFU',
    youtubeId: extractYouTubeId('https://youtu.be/NrYmeJSNmVU?si=3w-3kEjnC7luJKFU'),
    title: 'Classic Italian Tiramisu (Original Treviso Recipe with Espresso & Mascarpone)',
    channelName: 'Chef Antonio Rossi',
    channelAvatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=150&q=80',
    views: '890K views',
    numericViews: 890000,
    uploadTime: '2 weeks ago',
    duration: '11:15',
    category: 'Desserts',
    foodType: 'Vegetarian',
    difficulty: 'Medium',
    prepTime: '25 mins',
    cookTime: '0 mins',
    servings: '6-8 servings',
    description: 'The definitive Italian dessert: ladyfinger biscuits dipped in strong Italian espresso, layered with cloud-like mascarpone zabaione cream, and dusted with dark Dutch-process cocoa.',
    ingredients: [
      '300g Italian Savoiardi ladyfinger cookies',
      '500g authentic Italian Mascarpone cheese (chilled)',
      '4 fresh egg yolks & 100g caster sugar',
      '1.5 cups freshly brewed dark espresso (cooled)',
      '2 tbsp Marsala wine or Amaretto (optional)',
      'Unsweetened Dutch-process cocoa powder'
    ],
    instructions: [
      'Whisk egg yolks and sugar until thick, pale, and ribbon-like.',
      'Gently fold chilled mascarpone into the egg mixture until silky smooth and homogenous.',
      'Quickly dip savoiardi into the espresso (1 second each side, do not soak).',
      'Arrange an even layer of dipped cookies in a serving dish; top with half the mascarpone cream.',
      'Repeat with a second layer of cookies and remaining cream. Smooth the top.',
      'Refrigerate for at least 6 hours, dust liberally with cocoa powder before slicing.'
    ],
    tags: ['Tiramisu', 'ItalianDesserts', 'EspressoLovers', 'NoBakeCake'],
    likesCount: 62700,
    isTrending: false
  },
  {
    id: 'vid-16',
    youtubeUrl: 'https://youtu.be/YmKxog6RR9U?si=x6KKuUytwqKx-p_k',
    youtubeId: extractYouTubeId('https://youtu.be/YmKxog6RR9U?si=x6KKuUytwqKx-p_k'),
    title: 'Spicy Mexican Birria Tacos with Rich Slow-Cooked Consomé',
    channelName: 'Street Food Secrets',
    channelAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    views: '1.9M views',
    numericViews: 1900000,
    uploadTime: '3 weeks ago',
    duration: '17:40',
    category: 'Non-Vegetarian',
    foodType: 'Non-Vegetarian',
    difficulty: 'Advanced',
    prepTime: '30 mins',
    cookTime: '3 hours',
    servings: '6 servings',
    description: 'Tender shredded beef chuck slow braised in aromatic guajillo, ancho chili, and roasted garlic broth, stuffed into corn tortillas dipped in the chili fat, crisped on the griddle with Oaxaca cheese.',
    ingredients: [
      '1.5 kg beef chuck roast & bone-in short ribs',
      '5 dried guajillo chilies, 3 ancho chilies & 2 chipotles in adobo',
      '1 large onion, 8 garlic cloves, whole cloves, cinnamon stick',
      '2 cups beef stock & 1 tbsp apple cider vinegar',
      'Oaxaca or Monterey Jack cheese (grated)',
      'Corn tortillas, diced white onion, fresh cilantro, lime wedges'
    ],
    instructions: [
      'Toast dried chilies in a dry pan, then simmer in boiling water until soft.',
      'Blend chilies with garlic, charred onion, vinegar, and spices into a smooth adobo paste.',
      'Sear salted beef in a Dutch oven; pour adobo marinade and broth over meat.',
      'Simmer low and slow for 3 hours until fork-tender; shred meat and reserve flavorful consomé.',
      'Dip corn tortillas in red chili fat, place on hot comal, top with cheese and shredded beef.',
      'Fold in half until golden and crispy; serve immediately with a hot bowl of cilantro consomé.'
    ],
    tags: ['BirriaTacos', 'MexicanFood', 'Consome', 'Quesabirria'],
    likesCount: 119000,
    isTrending: true,
    isSpecial: true
  },
  {
    id: 'vid-17',
    youtubeUrl: 'https://youtu.be/eZN8--v11QE?si=L3fMUptm1TFP4hUw',
    youtubeId: extractYouTubeId('https://youtu.be/eZN8--v11QE?si=L3fMUptm1TFP4hUw'),
    title: 'Creamy Tuscan Garlic Butter Salmon with Sun-Dried Tomatoes & Spinach',
    channelName: 'Green & Clean Gourmet',
    channelAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    views: '710K views',
    numericViews: 710000,
    uploadTime: '2 weeks ago',
    duration: '12:05',
    category: 'Healthy',
    foodType: 'Non-Vegetarian',
    difficulty: 'Easy',
    prepTime: '10 mins',
    cookTime: '15 mins',
    servings: '3-4 servings',
    description: 'Crispy skin-on wild salmon fillets swimming in an irresistible creamy garlic sauce packed with baby spinach, sweet sun-dried tomatoes, and freshly grated parmesan cheese.',
    ingredients: [
      '4 fresh salmon fillets (skin on)',
      '1 cup heavy cream or coconut cream',
      '1/2 cup oil-packed sun-dried tomatoes (sliced)',
      '3 cups fresh baby spinach leaves',
      '5 cloves garlic (minced) & 1/2 cup grated Parmesan',
      '1 tbsp fresh oregano & lemon juice'
    ],
    instructions: [
      'Season salmon with salt, pepper, and garlic powder; sear skin-side down for 5 mins until crisp.',
      'Flip salmon, cook 3 more minutes, then remove onto a plate.',
      'In the same skillet, melt butter and sauté minced garlic and sun-dried tomatoes.',
      'Pour in heavy cream, bring to a gentle simmer, and stir in parmesan cheese until melted.',
      'Add fresh baby spinach until wilted, then nestle salmon fillets back into the velvety sauce.',
      'Squeeze fresh lemon juice over the top and serve warm.'
    ],
    tags: ['TuscanSalmon', 'HealthyDinner', 'KetoFriendly', 'SeafoodLovers'],
    likesCount: 45000,
    isTrending: false,
    isQuick: true
  },
  {
    id: 'vid-18',
    youtubeUrl: 'https://youtu.be/hP5u2bUHTSQ?si=aO6b4HjrNbLYJi94',
    youtubeId: extractYouTubeId('https://youtu.be/hP5u2bUHTSQ?si=aO6b4HjrNbLYJi94'),
    title: 'Crunchy Samosas with Spiced Potato Green Pea Filling & Tamarind Chutney',
    channelName: 'Royal Dastarkhwan',
    channelAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    views: '930K views',
    numericViews: 930000,
    uploadTime: '3 weeks ago',
    duration: '16:50',
    category: 'Snacks',
    foodType: 'Vegetarian',
    difficulty: 'Medium',
    prepTime: '30 mins',
    cookTime: '20 mins',
    servings: '10-12 samosas',
    description: 'The quintessential Indian tea-time snack: flaky pastry cones stuffed with seasoned potatoes, green peas, roasted cashews, and whole coriander seeds, fried to crispy golden perfection.',
    ingredients: [
      '2 cups maida (all-purpose flour)',
      '1/4 cup desi ghee (hot) for moin (flakiness)',
      '1 tsp ajwain (carom seeds) & 1 tsp salt',
      'Filling: 4 large boiled potatoes, 1/2 cup green peas, 1 tbsp crushed coriander seeds',
      'Garam masala, dry mango powder (amchur), green chilies, and ginger',
      'Oil for slow deep frying'
    ],
    instructions: [
      'Rub hot ghee into flour until it resembles breadcrumbs. Knead into a stiff, firm dough. Rest 30m.',
      'Sauté crushed spices, green chilies, boiled potatoes, amchur, and peas for 5 minutes; cool.',
      'Roll dough into oval sheets, cut in half, shape into cones with water seal, and fill with potato mix.',
      'Pinch bottom pleat and seal edges firmly.',
      'Fry in low-medium hot oil for 15-20 minutes, gradually turning until golden and super crispy.',
      'Serve steaming hot with sweet tamarind chutney and spicy mint dip.'
    ],
    tags: ['CrispySamosa', 'IndianSnacks', 'ChaiTime', 'DesiFlavors'],
    likesCount: 58900,
    isTrending: false
  },
  {
    id: 'vid-19',
    youtubeUrl: 'https://youtu.be/T4YB1996guA?si=D-IcTrsijlcqyynU',
    youtubeId: extractYouTubeId('https://youtu.be/T4YB1996guA?si=D-IcTrsijlcqyynU'),
    title: 'Authentic Japanese Tokyo Shoyu Ramen with Chashu Pork & Nitamago Egg',
    channelName: 'Wok Master Chen',
    channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    views: '1.3M views',
    numericViews: 1300000,
    uploadTime: '1 month ago',
    duration: '19:25',
    category: 'Chinese',
    foodType: 'Non-Vegetarian',
    difficulty: 'Advanced',
    prepTime: '45 mins',
    cookTime: '2 hours',
    servings: '4 bowls',
    description: 'Master the elements of authentic Tokyo Shoyu Ramen: clear chicken and dashi broth, aromatic tare seasoning, springy handmade noodles, melting braised chashu pork, and jammy ramen eggs.',
    ingredients: [
      '4 portions fresh alkaline ramen noodles',
      'Broth: Whole chicken bones, kombu kelp, bonito flakes, scallions, ginger',
      'Tare: Mirin, sake, quality soy sauce, dried shiitake',
      'Chashu: Pork belly roll simmered in sweet soy broth',
      'Toppings: Marinated soft-boiled eggs (Ajitsuke Tamago), menma bamboo shoots, nori sheets, scallions'
    ],
    instructions: [
      'Simmer chicken broth gently for 4 hours; add kombu and bonito flakes in final 15 minutes.',
      'Simmer pork belly in soy-sake liquid until gelatinous; chill and slice thinly.',
      'Boil 6-minute eggs, peel carefully, and marinate in tare mixture overnight.',
      'In warm ramen bowls, add 3 tbsp shoyu tare and a ladle of aromatic scallion oil.',
      'Ladle piping hot clarified broth, drop cooked springy noodles, and swirl.',
      'Top with chashu slices, halved jammy egg, nori, bamboo shoots, and finely chopped scallions.'
    ],
    tags: ['ShoyuRamen', 'JapaneseCooking', 'NoodleBowl', 'SoulFood'],
    likesCount: 92400,
    isTrending: true
  },
  {
    id: 'vid-20',
    youtubeUrl: 'https://youtu.be/SMa-s-gZvgg?si=x2hMXrOYwSzHO9ge',
    youtubeId: extractYouTubeId('https://youtu.be/SMa-s-gZvgg?si=x2hMXrOYwSzHO9ge'),
    title: 'Creamy Garlic Butter Mushroom Risotto with Aged Parmesan',
    channelName: 'Chef Antonio Rossi',
    channelAvatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=150&q=80',
    views: '540K views',
    numericViews: 540000,
    uploadTime: '3 weeks ago',
    duration: '13:40',
    category: 'Italian',
    foodType: 'Vegetarian',
    difficulty: 'Medium',
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: '4 servings',
    description: 'Master the authentic Italian risotto method. Carnaroli rice slowly stirred with rich mushroom stock, caramelized cremini & shiitake mushrooms, finished with cold butter and aged Parmigiano Reggiano.',
    ingredients: [
      '300g Carnaroli or Arborio rice',
      '400g mixed mushrooms (cremini, shiitake, oyster)',
      '1 liter hot rich vegetable or mushroom broth',
      '1/2 cup dry white wine (Pinot Grigio)',
      '1 shallot (finely minced) & 3 cloves garlic',
      '50g cold unsalted butter & 80g freshly grated Parmigiano Reggiano',
      'Fresh thyme sprigs & black pepper'
    ],
    instructions: [
      'Pan-sear mushrooms in olive oil and butter with fresh thyme until deeply browned; set half aside for garnish.',
      'Sauté shallots in butter, add Carnaroli rice, and toast until grains are translucent around edges.',
      'Deglaze with white wine, stirring continuously until completely absorbed.',
      'Gradually ladle in hot stock one ladle at a time, stirring gently until absorbed before adding more (approx 18 mins).',
      'Turn off the heat! Perform the "Mantecatura": beat in cold diced butter and grated parmesan vigorously.',
      'Rest covered for 2 minutes; serve on flat warm plates topped with sautéed wild mushrooms and olive oil.'
    ],
    tags: ['MushroomRisotto', 'ItalianCuisine', 'ComfortFood', 'VegetarianGourmet'],
    likesCount: 37800,
    isTrending: false,
    isQuick: false
  }
];

export const CATEGORIES_DATA: { name: CategoryType; icon: string; count: number; color: string; bgLight: string; bgDark: string }[] = [
  { name: 'All', icon: 'Sparkles', count: 20, color: 'text-orange-500', bgLight: 'bg-orange-50 hover:bg-orange-100', bgDark: 'dark:bg-orange-950/40 dark:hover:bg-orange-900/40' },
  { name: 'Indian', icon: 'Flame', count: 4, color: 'text-amber-500', bgLight: 'bg-amber-50 hover:bg-amber-100', bgDark: 'dark:bg-amber-950/40 dark:hover:bg-amber-900/40' },
  { name: 'Italian', icon: 'UtensilsCrossed', count: 4, color: 'text-emerald-500', bgLight: 'bg-emerald-50 hover:bg-emerald-100', bgDark: 'dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40' },
  { name: 'Chinese', icon: 'Soup', count: 3, color: 'text-red-500', bgLight: 'bg-red-50 hover:bg-red-100', bgDark: 'dark:bg-red-950/40 dark:hover:bg-red-900/40' },
  { name: 'Street Food', icon: 'Store', count: 3, color: 'text-orange-600', bgLight: 'bg-orange-50 hover:bg-orange-100', bgDark: 'dark:bg-orange-950/40 dark:hover:bg-orange-900/40' },
  { name: 'Desserts', icon: 'Cake', count: 2, color: 'text-pink-500', bgLight: 'bg-pink-50 hover:bg-pink-100', bgDark: 'dark:bg-pink-950/40 dark:hover:bg-pink-900/40' },
  { name: 'Breakfast', icon: 'Coffee', count: 2, color: 'text-yellow-500', bgLight: 'bg-yellow-50 hover:bg-yellow-100', bgDark: 'dark:bg-yellow-950/40 dark:hover:bg-yellow-900/40' },
  { name: 'Snacks', icon: 'Cookie', count: 2, color: 'text-amber-600', bgLight: 'bg-amber-50 hover:bg-amber-100', bgDark: 'dark:bg-amber-950/40 dark:hover:bg-amber-900/40' },
  { name: 'Healthy', icon: 'Salad', count: 2, color: 'text-green-500', bgLight: 'bg-green-50 hover:bg-green-100', bgDark: 'dark:bg-green-950/40 dark:hover:bg-green-900/40' },
  { name: 'Vegetarian', icon: 'Leaf', count: 12, color: 'text-emerald-600', bgLight: 'bg-emerald-50 hover:bg-emerald-100', bgDark: 'dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40' },
  { name: 'Non-Vegetarian', icon: 'Beef', count: 8, color: 'text-rose-500', bgLight: 'bg-rose-50 hover:bg-rose-100', bgDark: 'dark:bg-rose-950/40 dark:hover:bg-rose-900/40' },
];

export const CHEFS_DATA: Chef[] = [
  {
    id: 'chef-1',
    name: 'Chef Ranveer Brar',
    role: 'Master of Royal Indian Culinary Arts',
    specialty: 'Authentic Indian, Mughlai & Street Heritage',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80',
    subscribers: '5.8M',
    videosCount: 240,
    featuredRecipe: 'Authentic Restaurant Butter Chicken'
  },
  {
    id: 'chef-2',
    name: 'Chef Antonio Rossi',
    role: 'Roman Pasta & Artisanal Pizza Master',
    specialty: 'Traditional Italian & Wood-Fired Baking',
    avatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=300&q=80',
    subscribers: '3.4M',
    videosCount: 185,
    featuredRecipe: 'Authentic Carbonara & Tiramisu'
  },
  {
    id: 'chef-3',
    name: 'Wok Master Chen',
    role: 'Szechuan & Pan-Asian Wok Specialist',
    specialty: 'High-Heat Wok Hei, Dim Sum & Ramen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    subscribers: '4.1M',
    videosCount: 310,
    featuredRecipe: 'Kung Pao Chicken & Tokyo Shoyu Ramen'
  },
  {
    id: 'chef-4',
    name: 'Sweet Tooth Bakehouse',
    role: 'Pastry Chef & Confectioner',
    specialty: 'Molten Cakes, Pastries & Artisan Bread',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    subscribers: '2.9M',
    videosCount: 160,
    featuredRecipe: 'Decadent Molten Lava Cake'
  },
  {
    id: 'chef-5',
    name: 'Street Food Secrets',
    role: 'Global Street Food Explorer',
    specialty: 'Tacos, Chaat, Momos & Night Market Gems',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    subscribers: '3.7M',
    videosCount: 420,
    featuredRecipe: 'Mumbai Vada Pav & Mexican Birria Tacos'
  },
  {
    id: 'chef-6',
    name: 'Green & Clean Gourmet',
    role: 'Nutritionist & Whole Foods Chef',
    specialty: 'Mediterranean Bowls, High-Protein Meals & Salads',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    subscribers: '1.9M',
    videosCount: 145,
    featuredRecipe: 'Mediterranean Quinoa Power Bowl'
  }
];

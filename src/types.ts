export type CategoryType =
  | 'All'
  | 'Indian'
  | 'Chinese'
  | 'Italian'
  | 'Desserts'
  | 'Breakfast'
  | 'Snacks'
  | 'Healthy'
  | 'Street Food'
  | 'Vegetarian'
  | 'Non-Vegetarian';

export interface CookingVideo {
  id: string;
  youtubeUrl: string;
  youtubeId: string;
  title: string;
  channelName: string;
  channelAvatar: string;
  views: string;
  numericViews: number;
  uploadTime: string;
  duration: string;
  category: CategoryType;
  foodType: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan';
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  prepTime: string;
  cookTime: string;
  servings: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  likesCount: number;
  isTrending?: boolean;
  isSpecial?: boolean;
  isQuick?: boolean;
}

export interface Chef {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatar: string;
  subscribers: string;
  videosCount: number;
  featuredRecipe: string;
}

export type ActiveTab = 'Home' | 'Categories' | 'Popular' | 'Latest' | 'Saved' | 'About';

// src/components/home/constants.js
import {
  TbTruck,
  TbShieldCheck,
  TbRefresh,
  TbStar,
} from 'react-icons/tb'

export const colors = {
  bg:           '#FAF7F4',
  card:         '#FFFFFF',
  accent:       '#8B5E2E',
  accentLight:  'rgba(139,94,46,0.08)',
  accentBorder: 'rgba(139,94,46,0.18)',
  text:         '#2C1A0E',
  textMuted:    'rgba(44,26,14,0.55)',
  divider:      'rgba(139,94,46,0.12)',
  gold:         '#D4A373',   // ✅ ADD — HeroSection, ProductCard, badges වලට ඕනෑ
}

export const features = [
  { icon: TbTruck,       title: 'Free Delivery',   desc: 'On all orders over $100'     },
  { icon: TbShieldCheck, title: '2 Year Warranty', desc: 'On every piece of furniture' },
  { icon: TbRefresh,     title: 'Easy Returns',    desc: '30-day hassle-free returns'  },
  { icon: TbStar,        title: 'Premium Quality', desc: 'Handpicked by our experts'   },
]

export const categories = [
  { label: 'Living Room', path: 'living-room', emoji: '🛋️', count: 48 },  // ✅ count ADD
  { label: 'Bedroom',     path: 'bedroom',     emoji: '🛏️', count: 36 },
  { label: 'Dining Room', path: 'dining',      emoji: '🍽️', count: 29 },
  { label: 'Office',      path: 'office',      emoji: '💼', count: 22 },
  { label: 'Outdoor',     path: 'outdoor',     emoji: '🌿', count: 17 },
  { label: 'Decor',       path: 'decor',       emoji: '🪴', count: 41 },  // ✅ Lighting → Decor + ADD
  { label: 'Lighting',    path: 'lighting',    emoji: '💡', count: 25 },
]

export const bestSellingProducts = [
  {
    id:      1,
    name:    'Modern Sofa',
    price:   799,           // ✅ string → number (ProductCard price.toLocaleString() වලට)
    rating:  '4.9',
    reviews: 128,           // ✅ ADD — ProductCard reviews count
    badge:   'Best Seller', // ✅ ADD — card badge
    image:   'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
  },
  {
    id:      2,
    name:    'Wood Dining Table',
    price:   599,
    rating:  '4.8',
    reviews: 94,
    badge:   'Top Rated',
    image:   'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800',
  },
  {
    id:      3,
    name:    'Luxury Bed',
    price:   999,
    rating:  '4.9',
    reviews: 76,
    badge:   null,
    image:   'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
  },
  {
    id:      4,
    name:    'Office Chair',
    price:   299,
    rating:  '4.7',
    reviews: 55,
    badge:   'Trending',
    image:   'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800',
  },
  {
    id:      5,
    name:    'Zen Armchair',
    price:   379,
    rating:  '4.6',
    reviews: 42,
    badge:   null,
    image:   'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
  },
  {
    id:      6,
    name:    'Terra Bookshelf',
    price:   329,
    rating:  '4.8',
    reviews: 88,
    badge:   'Best Seller',
    image:   'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800',
  },
]

export const newArrivals = [
  {
    id:          7,
    name:        'Modern Bedroom Collection', // ✅ title → name (ProductCard uses name)
    title:       'Modern Bedroom Collection',
    badge:       'NEW',
    description: 'Elegant bedroom furniture crafted for comfort and luxury.',
    price:       619,
    rating:      '4.9',
    reviews:     12,
    img:         'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
    image:       'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
  },
  {
    id:          8,
    name:        'Luxury Living Room Set',
    title:       'Luxury Living Room Set',
    badge:       'TRENDING',
    description: 'Premium sofas and coffee tables for a stylish home.',
    price:       189,
    rating:      '4.7',
    reviews:     8,
    img:         'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    image:       'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
  },
  {
    id:          9,
    name:        'Contemporary Dining Room',
    title:       'Contemporary Dining Room',
    badge:       '2026 COLLECTION',
    description: 'Beautiful dining furniture perfect for family gatherings.',
    price:       899,
    rating:      '5.0',
    reviews:     6,
    img:         'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800',
    image:       'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800',
  },
  {
    id:          10,
    name:        'Rattan Side Table',
    title:       'Rattan Side Table',
    badge:       'NEW',
    description: 'Handcrafted rattan side table, perfect for any room.',
    price:       149,
    rating:      '4.8',
    reviews:     19,
    img:         'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800',
    image:       'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800',
  },
]

export const testimonials = [
  {
    name:   'Sarah M.',
    review: 'The sofa quality exceeded my expectations. Excellent craftsmanship and fast delivery.',
    rating: 5,
  },
  {
    name:   'John D.',
    review: 'Beautiful dining table and outstanding customer service. Highly recommended.',
    rating: 5,
  },
  {
    name:   'Emily R.',
    review: 'The furniture looks exactly like the photos. Premium quality and great value.',
    rating: 5,
  },
]
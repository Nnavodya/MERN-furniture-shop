// v1: Color scheme and data constants for Home components
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
}

export const features = [
  { icon: TbTruck,       title: 'Free Delivery',   desc: 'On all orders over $100'     },
  { icon: TbShieldCheck, title: '2 Year Warranty', desc: 'On every piece of furniture' },
  { icon: TbRefresh,     title: 'Easy Returns',    desc: '30-day hassle-free returns'  },
  { icon: TbStar,        title: 'Premium Quality', desc: 'Handpicked by our experts'   },
]

export const categories = [
  { label: 'Living Room', path: 'living-room', emoji: '🛋️' },
  { label: 'Bedroom',     path: 'bedroom',     emoji: '🛏️' },
  { label: 'Dining Room', path: 'dining',      emoji: '🍽️' },
  { label: 'Office',      path: 'office',      emoji: '💼' },
  { label: 'Outdoor',     path: 'outdoor',     emoji: '🌿' },
  { label: 'Lighting',    path: 'lighting',    emoji: '💡' },
]

export const bestSellingProducts = [
  {
    id: 1,
    name: "Modern Sofa",
    price: "$799",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
  },
  {
    id: 2,
    name: "Wood Dining Table",
    price: "$599",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
  },
  {
    id: 3,
    name: "Luxury Bed",
    price: "$999",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
  },
  {
    id: 4,
    name: "Office Chair",
    price: "$299",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800",
  },
]

export const newArrivals = [
  {
    id: 1,
    title: "Modern Bedroom Collection",
    badge: "NEW",
    description: "Elegant bedroom furniture crafted for comfort and luxury.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
  },
  {
    id: 2,
    title: "Luxury Living Room Set",
    badge: "TRENDING",
    description: "Premium sofas and coffee tables for a stylish home.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200",
  },
  {
    id: 3,
    title: "Contemporary Dining Room",
    badge: "2026 COLLECTION",
    description: "Beautiful dining furniture perfect for family gatherings.",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200",
  },
]

export const testimonials = [
  {
    name: "Sarah M.",
    review: "The sofa quality exceeded my expectations. Excellent craftsmanship and fast delivery.",
    rating: 5,
  },
  {
    name: "John D.",
    review: "Beautiful dining table and outstanding customer service. Highly recommended.",
    rating: 5,
  },
  {
    name: "Emily R.",
    review: "The furniture looks exactly like the photos. Premium quality and great value.",
    rating: 5,
  },
]

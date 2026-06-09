// v1: Room Inspiration Gallery Component
import React from 'react'
import { colors } from './constants'

const RoomInspirationGallery = () => {
  const C = colors

  const rooms = [
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

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold" style={{ color: C.text }}>
          Room Inspiration Gallery
        </h2>
        <p className="text-sm mt-2" style={{ color: C.textMuted }}>
          Get inspired by our beautifully designed room setups
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl cursor-pointer"
            style={{
              background: C.card,
              border: `1px solid ${C.divider}`,
            }}
          >
            <img
              src={room.image}
              alt={room.title}
              className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
            />

            <div className="p-5">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: C.accentLight,
                  color: C.accent,
                }}
              >
                {room.badge}
              </span>

              <h3 className="text-xl font-bold mt-3" style={{ color: C.text }}>
                {room.title}
              </h3>

              <p className="text-sm mt-2" style={{ color: C.textMuted }}>
                {room.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RoomInspirationGallery

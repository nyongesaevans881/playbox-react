"use client"

import { useState } from "react"
import { FaFire, FaGamepad, FaRegClock } from "react-icons/fa"
import { Gamepad2, ChevronRight, Zap, Trophy, Flame, Sparkles, ArrowUpRight } from "lucide-react"

export default function GamingBlog() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const blogPosts = [
    {
      id: 1,
      title: "GTA 6: Everything We Know So Far (And Some Stuff We Made Up)",
      excerpt:
        "Vice City, dual protagonists, and a release date that's 'coming soon™' for the 47th time. Rockstar is really testing our patience... and our wallet thickness.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Upcoming Games",
      readTime: "7 min read",
      hot: true,
      icon: <Flame className="w-5 h-5" />,
      date: "April 10, 2025",
    },
    {
      id: 2,
      title: "Nintendo Switch 2: The Console That Will Empty Your Bank Account... Again",
      excerpt:
        "Nintendo's newest console promises better graphics, longer battery life, and the same games you've already bought three times before. But we'll still buy it, won't we?",
      image: "/placeholder.svg?height=400&width=600",
      category: "Hardware",
      readTime: "5 min read",
      hot: true,
      icon: <Zap className="w-5 h-5" />,
      date: "April 8, 2025",
    },
    {
      id: 3,
      title: "Top 10 Games That Will Make You Throw Your Controller",
      excerpt:
        "From Elden Ring to Cuphead, we've compiled a list of games that will test not only your skills but also your controller's durability and your neighbor's patience.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Gaming Rage",
      readTime: "8 min read",
      hot: false,
      icon: <Trophy className="w-5 h-5" />,
      date: "April 5, 2025",
    },
    {
      id: 4,
      title: "The Rise of Kenyan Esports: Local Teams Making Global Waves",
      excerpt:
        "Kenya's gaming scene is exploding with talent. Meet the local teams and players who are putting East Africa on the global esports map and making us proud.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Esports",
      readTime: "6 min read",
      hot: false,
      icon: <Sparkles className="w-5 h-5" />,
      date: "April 2, 2025",
    },
  ]

  return (
    <section className="w-full py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <Gamepad2 className="text-[#ef3563] w-8 h-8" />
            <h2 className="text-3xl md:text-4xl font-extrabold">
              <span className="text-[#0690f3]">LATEST</span> <span className="text-[#ef3563]">GAMING</span>{" "}
              <span className="text-white">NEWS</span>
            </h2>
          </div>
          <a
            href="/blog"
            className="hidden md:flex items-center gap-2 text-[#0690f3] hover:text-[#ef3563] transition-colors duration-300 font-bold"
          >
            VIEW ALL POSTS
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Glowing Subtitle with Gaming Humor */}
        <div className="relative mb-12 text-center">
          <p className="text-lg text-gray-400 italic">
            Where we talk about games that aren't released yet and pretend we've played them
          </p>
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#ef3563] opacity-20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#0690f3] opacity-20 rounded-full blur-xl"></div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              className="group relative bg-gray-900 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_25px_rgba(239,53,99,0.3)] h-[400px] md:h-[450px]"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Hover Effect Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-70 transition-opacity duration-300 ${
                  hoveredIndex === index ? "opacity-90" : "opacity-70"
                }`}
              ></div>

              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Hot Tag */}
              {post.hot && (
                <div className="absolute top-4 right-4 bg-[#ef3563] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10">
                  <FaFire className="text-yellow-300" />
                  HOT TOPIC
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col h-[65%] justify-end z-10">
                {/* Category */}
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-1.5 rounded-full ${index % 2 === 0 ? "bg-[#0690f3]" : "bg-[#ef3563]"}`}>
                    {post.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-300">{post.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-[#0690f3] transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt - Only visible on hover */}
                <p
                  className={`text-gray-400 text-sm mb-4 line-clamp-3 transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FaRegClock />
                    <span>{post.readTime}</span>
                  </div>

                  <a
                    href={`/blog/${post.id}`}
                    className={`flex items-center gap-1 font-bold text-sm transition-all duration-300 ${
                      index % 2 === 0 ? "text-[#0690f3] hover:text-[#ef3563]" : "text-[#ef3563] hover:text-[#0690f3]"
                    }`}
                  >
                    READ MORE
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Animated Corner Accent */}
              <div
                className={`absolute bottom-0 right-0 w-16 h-16 transition-transform duration-500 ${
                  hoveredIndex === index ? "translate-x-0 translate-y-0" : "translate-x-full translate-y-full"
                }`}
              >
                <div
                  className="absolute bottom-0 right-0 w-0 h-0 border-solid border-t-transparent border-r-transparent border-b-[40px] border-l-transparent"
                  style={{
                    borderBottomColor: index % 2 === 0 ? "#0690f3" : "#ef3563",
                  }}
                ></div>
                <div
                  className="absolute bottom-0 right-0 w-0 h-0 border-solid border-t-transparent border-r-[40px] border-b-transparent border-l-transparent"
                  style={{
                    borderRightColor: index % 2 === 0 ? "#0690f3" : "#ef3563",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-10 text-center md:hidden">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0690f3] to-[#ef3563] text-white font-bold py-3 px-6 rounded-full hover:opacity-90 transition-opacity duration-300"
          >
            VIEW ALL GAMING NEWS
            <FaGamepad className="ml-2" />
          </a>
        </div>

        {/* Gaming Quote */}
        <div className="mt-16 text-center">
          <p className="text-xl italic text-gray-400">
            "The only thing more delayed than GTA 6 is my response time in Valorant."
          </p>
          <p className="text-sm text-[#ef3563] mt-2">- Every Gamer Ever</p>
        </div>
      </div>
    </section>
  )
}

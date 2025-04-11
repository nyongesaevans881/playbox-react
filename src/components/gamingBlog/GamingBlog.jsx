import { useState } from 'react';
import { ChevronRight, ArrowRight, Gamepad2 } from 'lucide-react';

export default function GamingBlog() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "GTA 6 Miami Vice: Everything We Know So Far",
      excerpt: "Rockstar's upcoming crime saga takes us back to Vice City with dual protagonists and the most detailed open world yet.",
      imageUrl: "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743936148/gta6-4k_csdhvy.jpg",
      category: "News",
      date: "April 9, 2025",
      readTime: "4 min read",
      hot: true
    },
    {
      id: 2,
      title: "Nintendo Switch 2: Hands-On With Nintendo's Next-Gen Console",
      excerpt: "We got our hands on the Switch 2 and tested its backwards compatibility, enhanced graphics, and battery life improvements.",
      imageUrl: "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744392883/nintendo_ohqxca.png",
      category: "Hardware",
      date: "April 7, 2025",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "10 Gaming Rage Moments That Made Us Throw Controllers",
      excerpt: "From Dark Souls deaths to Mario Kart blue shells, these gaming moments triggered controller-throwing rage in even the calmest gamers.",
      imageUrl: "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1744393251/water_mmtsjh.jpg",
      category: "Entertainment",
      date: "April 5, 2025",
      readTime: "5 min read"
    },
    {
      id: 4,
      title: "The Indie Game That's Secretly Better Than AAA Blockbusters",
      excerpt: "This $15 indie masterpiece delivers more entertainment value than $70 AAA games. Here's why it deserves your attention.",
      imageUrl: "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743936148/nfs-unbound_fj4h7z.jpg",
      category: "Reviews",
      date: "April 3, 2025",
      readTime: "7 min read"
    }
  ];

  return (
    <section className="w-full bg-black py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Gamepad2 className="text-secondary" size={35} />
            <h1 className="text-2xl md:text-3xl font-bold text-white p-0 m-0 uppercase">
              What's New From The <span className="text-secondary">GamerVerse</span>
            </h1>
          </div>

          <a href="/blog" className="hidden md:flex items-center gap-3 text-primary hover:text-secondary transition-colors duration-300 font-medium border py-0.5 px-8">
            View all posts
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Glowing Subtitle with Gaming Humor */}
        <div className="relative mb-12 max-md:text-center">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#ef3563] opacity-20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#0690f3] opacity-20 rounded-full blur-xl"></div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 z-1">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              className="relative bg-gray-900 overflow-hidden transform transition-all duration-300 hover:-translate-y-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-gray-800 text-xs font-medium text-white">
                  {post.category}
                </div>

                {/* Hot Badge */}
                {post.hot && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-secondary text-xs font-medium text-white flex items-center gap-1">
                    <Gamepad2 size={12} />
                    HOT
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${hoveredIndex === index ? 'text-secondary' : 'text-primary'}`}
                  >
                    Read more
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Hover Border */}
              <div
                className={`absolute inset-0 border-2 pointer-events-none transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  borderImage: 'linear-gradient(to right, #0690f3, #ef3563) 1',
                }}
              />
            </div>
          ))}
        </div>

        <div className="relative mb-12 max-md:text-center z-1">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#ef3563] opacity-20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#0690f3] opacity-20 rounded-full blur-xl"></div>
        </div>

        {/* Gaming Quote */}
        <div className="mt-16 text-center">
          <p className="text-xl italic text-gray-400">
            "The only thing more delayed than GTA 6 is my response time in Valorant."
          </p>
          <p className="text-sm text-[#ef3563] mt-2">- Every Gamer Ever</p>
        </div>

        {/* Mobile View All Link */}
        <div className="flex justify-center mt-8 md:hidden">
          <a href="/blog" className="flex items-center gap-1 text-primary hover:text-secondary transition-colors duration-300 font-medium border py-0.5 px-8">
            View all posts
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
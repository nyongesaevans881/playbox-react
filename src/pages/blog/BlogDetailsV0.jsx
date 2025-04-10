"use client"

import { useState, useEffect } from "react"
import { FaGamepad } from "react-icons/fa"
import {
  Flame,
  Gamepad2,
  Trophy,
  Zap,
  Star,
  Share2,
  Heart,
  MessageSquare,
  Calendar,
  DollarSign,
  Globe,
  Users,
  Map,
} from "lucide-react"

export default function BlogDetailsV0() {
  const [timeLeft, setTimeLeft] = useState({
    days: 171,
    hours: 1,
    minutes: 13,
    seconds: 36,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime

        if (seconds > 0) {
          seconds -= 1
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes -= 1
          } else {
            minutes = 59
            if (hours > 0) {
              hours -= 1
            } else {
              hours = 23
              if (days > 0) {
                days -= 1
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-white min-h-screen py-10 px-4 md:px-8 lg:px-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-12 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        <img
          src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743936148/gta6-4k_csdhvy.jpg"
          alt="GTA 6 Key Art"
          className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
        />
        <div className="absolute bottom-0 left-0 z-20 p-6 md:p-10 w-full md:w-3/4">
          <div className="flex items-center space-x-2 text-[#ff3e6c] mb-2">
            <Flame className="h-5 w-5" />
            <span className="uppercase font-bold tracking-wider text-sm">Hot Topic</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            GRAND THEFT AUTO VI
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-6 max-w-2xl">
            The most anticipated game of the decade is coming. Here's everything we know about Rockstar's next
            masterpiece.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-white">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>April 6, 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>By PlayboxTeam</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>24 Comments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="bg-gradient-to-r from-[#ff3e6c] to-[#ff267e] p-6 mb-12 shadow-lg">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 text-center">ESTIMATED RELEASE COUNTDOWN</h2>
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <div key={index} className="bg-black/30 p-3 md:p-4 text-center">
              <div className="text-white text-2xl md:text-4xl lg:text-5xl font-bold">
                {item.value < 10 ? `0${item.value}` : item.value}
              </div>
              <div className="text-white/80 text-xs md:text-sm uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1: Introduction */}
          <section className="bg-gray-100 p-6 shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <Gamepad2 className="h-6 w-6 text-[#ff3e6c]" />
              <h2 className="text-2xl md:text-3xl font-bold">Let's Talk About Gaming</h2>
            </div>
            <p className="text-gray-700 mb-4">
              After years of rumors, leaks, and speculation, Rockstar Games has finally confirmed that Grand Theft Auto
              VI is in active development. The gaming community has been buzzing with excitement since the announcement,
              and for good reason - GTA VI promises to be the most ambitious open-world game ever created.
            </p>
            <p className="text-gray-700">
              As Kenya's premier gaming community, Playbox is here to break down everything we know so far about this
              groundbreaking title. From gameplay features to release dates, we've got you covered with the most
              up-to-date information available.
            </p>
          </section>

          {/* Section 2: Expected Price & Editions */}
          <section className="bg-gray-100 p-6 shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <DollarSign className="h-6 w-6 text-[#ff3e6c]" />
              <h2 className="text-2xl md:text-3xl font-bold">Expected Price & Editions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  title: "Standard Edition",
                  price: "$69.99",
                  features: ["Base Game", "Digital Bonus Content", "Online Access"],
                },
                {
                  title: "Deluxe Edition",
                  price: "$89.99",
                  features: [
                    "Base Game",
                    "Exclusive Vehicles",
                    "Character Customization",
                    "Digital Soundtrack",
                    "Online Bonuses",
                  ],
                },
                {
                  title: "Collector's Edition",
                  price: "$149.99",
                  features: [
                    "Everything in Deluxe",
                    "Physical Map",
                    "Collectible Steelbook",
                    "Art Book",
                    "Exclusive Merchandise",
                  ],
                },
              ].map((edition, index) => (
                <div
                  key={index}
                  className="bg-black text-white p-4 hover:bg-[#ff3e6c] transition-colors duration-300"
                >
                  <h3 className="font-bold text-xl mb-2">{edition.title}</h3>
                  <div className="text-2xl font-bold mb-3">{edition.price}</div>
                  <ul className="space-y-1 text-sm">
                    {edition.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-gray-700">
              Industry analysts predict GTA 6 will set a new standard for AAA game pricing, with the base edition
              expected to retail at around $70 USD (approximately Ksh. 9,000). This aligns with the industry's gradual
              shift toward higher price points for premium titles.
            </p>
            <p className="text-gray-700 mt-4">
              Pre-orders are expected to begin approximately 6 months before release, with Playbox offering exclusive
              pre-order bonuses for our Kenyan gaming community. Stay tuned for announcements!
            </p>
          </section>

          {/* Section 3: Immersive Open-World Gameplay */}
          <section className="bg-gray-100 p-6 shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <Map className="h-6 w-6 text-[#ff3e6c]" />
              <h2 className="text-2xl md:text-3xl font-bold">Immersive Open-World Gameplay</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="GTA 6 Gameplay"
                  className="w-full h-[200px] object-cover mb-4"
                />
                <h3 className="font-bold text-lg mb-2">Dynamic NPC System</h3>
                <p className="text-gray-700">
                  GTA 6 will feature the most realistic NPC behavior ever seen in a video game. NPCs will have daily
                  routines, remember player actions, and react dynamically to the world around them.
                </p>
              </div>
              <div>
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="GTA 6 Map"
                  className="w-full h-[200px] object-cover rounded-lg mb-4"
                />
                <h3 className="font-bold text-lg mb-2">Expanded Vice City</h3>
                <p className="text-gray-700">
                  The game will return to Vice City, but with a massively expanded map that includes surrounding areas
                  inspired by Miami and the Florida Keys, creating the largest and most detailed GTA map to date.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-[#ff3e6c] p-2 rounded-full mr-4 mt-1">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Dual Protagonists</h3>
                  <p className="text-gray-700">
                    For the first time in the series, GTA 6 will feature a female protagonist alongside a male
                    character, with the ability to switch between them throughout the story. Each character will have
                    unique abilities and storylines that intertwine.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#ff3e6c] p-2 rounded-full mr-4 mt-1">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Advanced Physics Engine</h3>
                  <p className="text-gray-700">
                    Rockstar has developed a new physics engine that will make vehicle handling, destruction, and
                    environmental interactions more realistic than ever before. Expect improved driving mechanics and
                    more destructible environments.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#ff3e6c] p-2 rounded-full mr-4 mt-1">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Immersive Heists</h3>
                  <p className="text-gray-700">
                    Building on the success of GTA V's heists, GTA 6 will feature more complex and varied heist missions
                    with multiple approaches and outcomes. Players will be able to recruit crew members with unique
                    skills and plan their approach in unprecedented detail.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Massive Online Evolution */}
          <section className="bg-gray-100 rounded-xl p-6 shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-6 w-6 text-[#ff3e6c]" />
              <h2 className="text-2xl md:text-3xl font-bold">Massive Online Evolution</h2>
            </div>
            <p className="text-gray-700 mb-6">
              GTA Online has been a massive success for Rockstar, and GTA 6 is set to take the online experience to new
              heights. The new online mode will be more integrated with the single-player experience, allowing for a
              seamless transition between the two.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {[
                {
                  title: "Criminal Empires",
                  description:
                    "Build and manage your own criminal empire with more business options and territory control than ever before.",
                },
                {
                  title: "Dynamic Events",
                  description:
                    "The world will feature random events and challenges that appear organically, creating unique experiences every time you play.",
                },
                {
                  title: "Cross-Platform Play",
                  description:
                    "For the first time, GTA Online will support cross-platform play between PlayStation, Xbox, and PC players.",
                },
                {
                  title: "Player Housing",
                  description:
                    "Purchase and customize properties throughout the map with unprecedented detail and functionality.",
                },
                {
                  title: "Faction Warfare",
                  description:
                    "Join one of several criminal factions and participate in territory wars and faction-specific missions.",
                },
                {
                  title: "Live Events",
                  description:
                    "Rockstar plans to host regular in-game events that will permanently change the game world and storyline.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-black text-white rounded-lg p-4 hover:scale-105 transition-transform duration-300"
                >
                  <h3 className="font-bold text-lg mb-2 text-[#ff3e6c]">{feature.title}</h3>
                  <p className="text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="bg-black text-white p-5 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-[#ff3e6c]">Playbox Online Gaming Community</h3>
              <p className="mb-4">
                At Playbox, we're already preparing for GTA 6 Online by building dedicated Kenyan servers and organizing
                our community into crews. Join our Discord to connect with fellow Kenyan gamers and be ready for launch
                day!
              </p>
              <button className="bg-[#ff3e6c] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#ff267e] transition-colors duration-300">
                Join Our GTA Community
              </button>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Author Card */}
          <div className="bg-gray-100 rounded-xl p-6 shadow-md">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Author"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#ff3e6c]"
              />
              <div>
                <h3 className="font-bold text-lg">PlayboxTeam</h3>
                <p className="text-gray-600 text-sm">Gaming Enthusiast & Analyst</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Our team of gaming experts stays on top of the latest industry news and trends to bring you the most
              accurate and insightful content about your favorite games.
            </p>
          </div>

          {/* Related Articles */}
          <div className="bg-gray-100 rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-xl mb-4 flex items-center">
              <FaGamepad className="mr-2 text-[#ff3e6c]" />
              Related Articles
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "PS5 Pro: Everything We Know So Far",
                  date: "March 28, 2025",
                  image: "/placeholder.svg?height=80&width=120",
                },
                {
                  title: "Top 10 Gaming Peripherals of 2025",
                  date: "March 15, 2025",
                  image: "/placeholder.svg?height=80&width=120",
                },
                {
                  title: "The Rise of Kenyan Esports: Local Teams to Watch",
                  date: "March 3, 2025",
                  image: "/placeholder.svg?height=80&width=120",
                },
              ].map((article, index) => (
                <div key={index} className="flex space-x-3 group cursor-pointer">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-20 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-[#ff3e6c] transition-colors duration-300">
                      {article.title}
                    </h4>
                    <p className="text-gray-500 text-xs">{article.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-black text-white px-4 py-2 rounded-lg font-bold hover:bg-[#ff3e6c] transition-colors duration-300 text-sm">
              View All Articles
            </button>
          </div>

          {/* Popular Tags */}
          <div className="bg-gray-100 rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-xl mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "GTA 6",
                "Rockstar Games",
                "PlayStation 5",
                "Xbox Series X",
                "Open World",
                "Gaming",
                "Vice City",
                "Online Gaming",
                "PC Gaming",
                "Game Release",
                "Playbox Kenya",
              ].map((tag, index) => (
                <span
                  key={index}
                  className="bg-black text-white px-3 py-1 rounded-full text-sm hover:bg-[#ff3e6c] transition-colors duration-300 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-[#ff3e6c] rounded-xl p-6 shadow-md text-white">
            <h3 className="font-bold text-xl mb-2">Get GTA 6 Updates</h3>
            <p className="mb-4 text-white/90 text-sm">
              Subscribe to our newsletter to receive the latest news and updates about GTA 6 directly to your inbox.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:bg-white hover:text-[#ff3e6c] transition-colors duration-300">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <section className="bg-gray-100 rounded-xl p-6 shadow-md mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
          <MessageSquare className="h-6 w-6 text-[#ff3e6c] mr-2" />
          Join the Conversation
        </h2>
        <div className="mb-8">
          <div className="flex items-start space-x-4 mb-6">
            <img src="/placeholder.svg?height=50&width=50" alt="User Avatar" className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <textarea
                placeholder="Share your thoughts on GTA 6..."
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff3e6c] min-h-[100px]"
              ></textarea>
              <div className="flex justify-end mt-2">
                <button className="bg-[#ff3e6c] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#ff267e] transition-colors duration-300">
                  Post Comment
                </button>
              </div>
            </div>
          </div>

          {/* Sample Comments */}
          <div className="space-y-6">
            {[
              {
                name: "John Kamau",
                avatar: "/placeholder.svg?height=50&width=50",
                date: "2 hours ago",
                content:
                  "I can't wait for GTA 6! I've been playing since GTA III and each game just gets better. The dual protagonists sound amazing, especially having a female lead finally!",
                likes: 24,
              },
              {
                name: "Wanjiku M.",
                avatar: "/placeholder.svg?height=50&width=50",
                date: "5 hours ago",
                content:
                  "The price is steep but considering how much content Rockstar packs into these games, it's worth it. I'll be saving up for the Collector's Edition for sure!",
                likes: 17,
              },
              {
                name: "GamerX254",
                avatar: "/placeholder.svg?height=50&width=50",
                date: "1 day ago",
                content:
                  "I hope they optimize it well for PC. GTA V took forever to come to PC and had performance issues at launch. Also, will Playbox be doing midnight launch events?",
                likes: 9,
                replies: [
                  {
                    name: "PlayboxTeam",
                    avatar: "/placeholder.svg?height=50&width=50",
                    date: "1 day ago",
                    content:
                      "Yes! We're planning midnight launch events at all our stores across Kenya. Stay tuned for more details closer to release date!",
                  },
                ],
              },
            ].map((comment, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-start space-x-4">
                  <img
                    src={comment.avatar || "/placeholder.svg"}
                    alt={comment.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold">{comment.name}</h4>
                      <span className="text-gray-500 text-sm">{comment.date}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{comment.content}</p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-[#ff3e6c]">
                        <Heart className="h-4 w-4" />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-[#ff3e6c]">
                        <MessageSquare className="h-4 w-4" />
                        <span>Reply</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-[#ff3e6c]">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>

                    {/* Replies */}
                    {comment.replies && (
                      <div className="mt-4 pl-6 border-l-2 border-gray-200 space-y-4">
                        {comment.replies.map((reply, replyIndex) => (
                          <div key={replyIndex} className="flex items-start space-x-3">
                            <img
                              src={reply.avatar || "/placeholder.svg"}
                              alt={reply.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <div className="flex items-center mb-1">
                                <h5 className="font-bold text-sm">{reply.name}</h5>
                                <span className="text-gray-500 text-xs ml-2">{reply.date}</span>
                              </div>
                              <p className="text-gray-700 text-sm">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <button className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-[#ff3e6c] transition-colors duration-300">
            Load More Comments
          </button>
        </div>
      </section>

      {/* Call to Action */}
      <div className="bg-black text-white rounded-xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/placeholder.svg?height=400&width=1200"
            alt="GTA 6 Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready for GTA 6?</h2>
          <p className="text-gray-300 mb-6">
            Pre-register with Playbox Kenya to be the first to know when pre-orders go live. Get exclusive Playbox
            bonuses and a chance to win a Collector's Edition!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#ff3e6c] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#ff267e] transition-colors duration-300">
              Pre-Register Now
            </button>
            <button className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors duration-300">
              Join Discord Community
            </button>
          </div>
        </div>
      </div>

      {/* Social Sharing */}
      <div className="flex justify-center items-center space-x-4 mt-12">
        <span className="font-bold text-gray-700">Share this article:</span>
        {[
          { icon: <FaGamepad className="h-5 w-5" />, color: "bg-[#ff3e6c]" },
          { icon: <Share2 className="h-5 w-5" />, color: "bg-blue-500" },
          { icon: <MessageSquare className="h-5 w-5" />, color: "bg-green-500" },
          { icon: <Heart className="h-5 w-5" />, color: "bg-red-500" },
        ].map((social, index) => (
          <button
            key={index}
            className={`${social.color} text-white p-2 rounded-full hover:opacity-80 transition-opacity duration-300`}
          >
            {social.icon}
          </button>
        ))}
      </div>
    </div>
  )
}


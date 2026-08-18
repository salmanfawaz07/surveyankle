import Link from "next/link";
import FakeAd from "@/components/FakeAd";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top banner ad */}
      <div className="bg-yellow-300 border-b-4 border-yellow-500 py-2 text-center text-sm font-bold">
        🔥 LIMITED TIME: Everything is 900% better today only! 🔥
      </div>

      {/* Navbar */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tight">
            Daily<span className="text-orange-500">Zap</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-orange-500">
              Home
            </a>
            <a href="#" className="hover:text-orange-500">
              Discover
            </a>
            <a href="#" className="hover:text-orange-500">
              Deals
            </a>
            <a href="#" className="hover:text-orange-500">
              Weird Stuff
            </a>
          </nav>
          <div className="text-xs text-gray-500">est. 2024</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Hero */}
        <section className="text-center py-10 mb-8">
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            Welcome to the{" "}
            <span className="text-orange-500">Internet&apos;s</span>
            <br />
            Most Confusing Website
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            We have no idea what this site is about either. Enjoy the ads.
          </p>
        </section>

        {/* Big banner ad */}
        <div className="mb-8">
          <FakeAd
            size="banner"
            emoji="🚀"
            title="Mega Internet Booster Pro Max Ultra"
            description="Make your internet 900% faster! Scientists hate this one simple trick. Works on all devices including toasters."
            cta="BOOST NOW"
          />
        </div>

        {/* Content + sidebar layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Random cards */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-2">
                📰 Today&apos;s Random Fact
              </h2>
              <p className="text-gray-700">
                Did you know that the average cloud weighs about 1.1 million
                pounds? That&apos;s why they float... somehow. Science!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FakeAd
                size="rectangle"
                emoji="🍕"
                title="World's Most Powerful Pizza"
                description="Now with 300% more cheese. Guaranteed to change your life or your money back*."
                cta="ORDER PIZZA"
              />
              <FakeAd
                size="rectangle"
                emoji="💤"
                title="Sleep Better Instantly"
                description="Our patented pillow technology makes you sleep 47% more efficiently. Dreams included free."
                cta="BUY PILLOW"
              />
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-2">✨ Daily Affirmation</h2>
              <p className="text-gray-700 italic">
                &quot;I am enough. My wifi is enough. This website is...
                something.&quot;
              </p>
            </div>

            <FakeAd
              size="banner"
              emoji="🧠"
              title="Become a Genius in 3 Days"
              description="Download our free eBook: 'How to Think Better Using Only Your Left Toe'. Limited downloads remaining: 999,999"
              cta="GET THE BOOK"
            />

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-2">🎯 Random Poll</h2>
              <p className="mb-3 text-sm text-gray-600">
                What should we add next to this website?
              </p>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="radio" name="poll" /> More ads
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="poll" /> Even more ads
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="poll" /> A secret useful page
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FakeAd
                size="rectangle"
                emoji="🐱"
                title="Cat Photos Unlimited"
                description="Subscribe now and get 10,000 exclusive photos of cats doing nothing."
                cta="SUBSCRIBE"
              />
              <FakeAd
                size="rectangle"
                emoji="⚡"
                title="Lightning Cable Pro"
                description="Charges your phone at the speed of light*. Literally. (*not literally)"
                cta="SHOP NOW"
              />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <FakeAd
              size="sidebar"
              emoji="📱"
              title="App That Does Nothing"
              description="Download the #1 app that opens and immediately closes. Revolutionary."
              cta="DOWNLOAD"
            />
            <FakeAd
              size="sidebar"
              emoji="🎧"
              title="Noise Cancelling Headphones"
              description="Cancels all noise including your thoughts. Perfect for meetings."
              cta="BUY PAIR"
            />
            <div className="bg-gray-100 rounded-lg p-4 text-center text-sm text-gray-500">
              <p className="font-semibold mb-1">Sponsored Content</p>
              <p>This space intentionally left confusing.</p>
            </div>
            <FakeAd
              size="sidebar"
              emoji="🌟"
              title="Become Famous Overnight"
              description="Our secret method works 0% of the time. Results may vary."
              cta="LEARN MORE"
            />
          </aside>
        </div>

        {/* Bottom ads */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FakeAd
            size="small"
            emoji="🦷"
            title="Whitening Toothpaste"
            description="Whiten teeth so much they become invisible."
            cta="BUY"
          />
          <FakeAd
            size="small"
            emoji="🏋️"
            title="Home Gym in a Box"
            description="Fits under your bed. Works under your bed too."
            cta="ORDER"
          />
          <FakeAd
            size="small"
            emoji="☕"
            title="Coffee That Never Ends"
            description="One cup lasts forever. Side effects may include immortality."
            cta="SIP NOW"
          />
        </div>

        {/* Secret hint */}
        <div className="mt-12 text-center text-xs text-gray-400">
          <p>
            Looking for something useful? Try visiting{" "}
            <Link href="/code" className="underline hover:text-orange-500">
              /code
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          <p className="font-bold text-lg mb-2">
            Daily<span className="text-orange-500">Zap</span>
          </p>
          <p className="mb-4">
            The website that makes no sense. And that&apos;s the point.
          </p>
          <p className="text-xs">
            All advertisements on this website are completely fictional and
            labeled as DEMO. No real products are being sold.
          </p>
          <p className="mt-4 text-xs">
            © {new Date().getFullYear()} DailyZap. Made for fun.
          </p>
        </div>
      </footer>
    </div>
  );
}

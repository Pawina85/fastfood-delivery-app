import Image from "next/image";

export default function About() {
  const stats = [
    { icon: "🚀", value: "30k+", label: "Orders" },
    { icon: "⭐", value: "4.9", label: "Rating" },
    { icon: "🍽️", value: "200+", label: "Restaurants" },
    { icon: "💜", value: "50k+", label: "Users" },
  ];

  return (
    <section id="about" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Full-width Image with Overlay */}
          <div className="relative w-full h-72 md:h-96 rounded-t-2xl overflow-hidden">
            <Image
              src="/Image/aboutpic.jpg"
              alt="About us"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-b-2xl shadow-sm p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Us
            </h2>

            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Bringing your cravings to your door
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gray-50 rounded-xl p-4 text-center"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-orange-500">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
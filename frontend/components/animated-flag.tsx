export function AnimatedFlag() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-white to-green-600">
        {/* Animated flag stripes */}
        <div className="absolute inset-0 opacity-30">
          <div className="h-1/3 bg-gradient-to-r from-orange-400 to-orange-600 animate-pulse"></div>
          <div className="h-1/3 bg-gradient-to-r from-white to-gray-100 animate-pulse delay-75"></div>
          <div className="h-1/3 bg-gradient-to-r from-green-400 to-green-600 animate-pulse delay-150"></div>
        </div>

        {/* Ashoka Chakra in center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-32 h-32 border-4 border-blue-800 rounded-full animate-spin-slow opacity-20">
            <div className="absolute inset-2 border-2 border-blue-700 rounded-full">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-6 bg-blue-800 origin-bottom"
                  style={{
                    left: "50%",
                    bottom: "50%",
                    transform: `translateX(-50%) rotate(${i * 15}deg)`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-40 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

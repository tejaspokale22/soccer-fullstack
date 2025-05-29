import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [date, setDate] = useState(() => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 9; // 3x3 grid

  // Collection of random team logo placeholders
  const teamPlaceholders = [
    "https://placehold.co/64x64/2563eb/ffffff?text=Team",
    "https://placehold.co/64x64/dc2626/ffffff?text=Team",
    "https://placehold.co/64x64/16a34a/ffffff?text=Team",
    "https://placehold.co/64x64/9333ea/ffffff?text=Team",
    "https://placehold.co/64x64/ea580c/ffffff?text=Team",
    "https://placehold.co/64x64/0891b2/ffffff?text=Team",
    "https://placehold.co/64x64/be185d/ffffff?text=Team",
    "https://placehold.co/64x64/854d0e/ffffff?text=Team",
  ];

  const getRandomPlaceholder = () => {
    return teamPlaceholders[Math.floor(Math.random() * teamPlaceholders.length)];
  };

  const fetchMatches = async (selectedDate) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://soccer-fullstack.onrender.com/api/matches?date=${selectedDate}`);
      setMatches(res.data.response);
      setCurrentPage(1); // Reset to first page when date changes
      setLoading(false);
    } catch (error) {
      console.error("Error fetching matches:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches(date);
  }, [date]);

  // Pagination calculations
  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);
  const totalPages = Math.ceil(matches.length / matchesPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Started":
        return "text-blue-600";
      case "Match Cancelled":
        return "text-red-600";
      case "Match Finished":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const LoadingSpinner = ({ size = "default" }) => {
    const sizeClasses = {
      small: "w-4 h-4",
      default: "w-8 h-8",
      large: "w-12 h-12",
    };

    return (
      <div className="flex items-center justify-center">
        <div
          className={`${sizeClasses[size]} border-4 border-gray-200 border-t-black rounded-full animate-spin`}
        ></div>
      </div>
    );
  };

  const LoadingCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="bg-gray-50 p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-3 w-16 bg-gray-200 rounded mt-1"></div>
            </div>
          </div>
          <div className="text-right">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-3 w-16 bg-gray-200 rounded mt-1"></div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
            <div className="h-4 w-24 bg-gray-200 rounded mt-2 mx-auto"></div>
          </div>
          <div className="text-2xl font-bold text-gray-200">VS</div>
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
            <div className="h-4 w-24 bg-gray-200 rounded mt-2 mx-auto"></div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  const Pagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          «
        </button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ‹
        </button>
        {startPage > 1 && (
          <>
            <button
              onClick={() => setCurrentPage(1)}
              className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-3 py-1 rounded-md ${
              currentPage === number
                ? "bg-black text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {number}
          </button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ›
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          »
        </button>
      </div>
    );
  };

  const TeamLogo = ({ src, alt, className }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      setIsLoading(true);
      setHasError(false);
      setImgSrc(src);
    }, [src]);

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      // Try alternative image source if available
      if (src.includes('api-sports.io')) {
        const alternativeSrc = src.replace('api-sports.io', 'media-3.api-sports.io');
        setImgSrc(alternativeSrc);
      }
    };

    return (
      <div className={`relative ${className}`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={imgSrc}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
        />
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-xs text-gray-500 font-medium">{alt?.split(' ')[0]}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          ⚽Upcoming Soccer Matches Schedule
        </h1>

        <div className="mb-8 flex justify-center">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border-2 border-gray-300 px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600">No matches found for {date}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentMatches.map((match) => (
                <div
                  key={match.fixture.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {/* League Header */}
                  <div className="bg-gray-50 p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={match.league.logo}
                          alt={match.league.name}
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            e.target.src = "https://placehold.co/24x24/2563eb/ffffff?text=League";
                          }}
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">{match.league.name}</h3>
                          <div className="flex items-center gap-2">
                            <img
                              src={match.league.flag}
                              alt={match.league.country}
                              className="w-4 h-4"
                              onError={(e) => {
                                e.target.src = "https://placehold.co/16x16/2563eb/ffffff?text=Flag";
                              }}
                            />
                            <span className="text-xs text-gray-500">{match.league.country}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${getStatusColor(match.fixture.status.long)}`}>
                          {match.fixture.status.long === "Not Started"
                            ? formatTime(match.fixture.date)
                            : match.fixture.status.long}
                        </p>
                        <p className="text-xs text-gray-500">{match.league.round}</p>
                      </div>
                    </div>
                  </div>

                  {/* Teams Section */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 text-center">
                        <img
                          src={match.teams.home.logo}
                          alt={match.teams.home.name}
                          className="w-16 h-16 mx-auto object-contain"
                          onError={(e) => {
                            e.target.src = getRandomPlaceholder();
                          }}
                        />
                        <span className="mt-2 block font-semibold text-gray-800">
                          {match.teams.home.name}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-400">VS</div>
                      <div className="flex-1 text-center">
                        <img
                          src={match.teams.away.logo}
                          alt={match.teams.away.name}
                          className="w-16 h-16 mx-auto object-contain"
                          onError={(e) => {
                            e.target.src = getRandomPlaceholder();
                          }}
                        />
                        <span className="mt-2 block font-semibold text-gray-800">
                          {match.teams.away.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Match Details Footer */}
                  <div className="bg-gray-50 p-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      {match.fixture.venue && (
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="truncate">
                            {match.fixture.venue.name}, {match.fixture.venue.city}
                          </span>
                        </div>
                      )}
                      {match.fixture.referee && (
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span className="truncate">Ref: {match.fixture.referee}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination />
          </>
        )}
      </div>
    </div>
  );
};

export default App;

import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Hotels from "./models/Hotels.js";

dotenv.config();

const sampleHotels = [
  // Luxury Resorts
  {
    name: "Paradise Bay Resort",
    type: "Luxury Resort",
    location: {
      city: "Maldives",
      country: "Maldives",
    },
    rating: 4.9,
    reviewsCount: 328,
    pricePerNight: 450,
    originalPrice: 550,
    amenities: [
      "Private Beach",
      "Infinity Pool",
      "Spa & Wellness",
      "Fine Dining",
      "Water Sports",
      "Free WiFi",
    ],
    featured: true,
    image: ["Boa Hancock5.jpg", "Boa Hancock6.jpg", "Ng1.jpg"],
    distance: "2.3 km from airport",
    description:
      "Experience paradise at its finest in our luxurious overwater villas. Paradise Bay Resort offers unparalleled views of crystal-clear turquoise waters, world-class diving, and exceptional service. Each villa features a private deck with direct ocean access, perfect for snorkeling and relaxation.",
  },
  {
    name: "Ocean Pearl Hotel",
    type: "Luxury Resort",
    location: {
      city: "Bali",
      country: "Indonesia",
    },
    rating: 4.8,
    reviewsCount: 456,
    pricePerNight: 380,
    originalPrice: 480,
    amenities: [
      "Ocean View",
      "Spa",
      "Pool",
      "Restaurant",
      "Bar",
      "Free Parking",
    ],
    featured: true,
    image: ["Ng2.jpg", "Ng3.jpg", "Ng4.jpg"],
    distance: "5.1 km from city center",
    description:
      "Nestled on Bali's pristine coastline, Ocean Pearl Hotel combines traditional Balinese architecture with modern luxury. Enjoy breathtaking ocean views, authentic Indonesian cuisine, and a serene spa experience. Our resort is perfectly positioned for exploring nearby temples and rice terraces.",
  },
  {
    name: "Sunset Villa Resort",
    type: "Luxury Resort",
    location: {
      city: "Santorini",
      country: "Greece",
    },
    rating: 4.9,
    reviewsCount: 512,
    pricePerNight: 520,
    originalPrice: 650,
    amenities: [
      "Caldera View",
      "Private Pool",
      "Spa",
      "Fine Dining",
      "Concierge",
      "Free WiFi",
    ],
    featured: true,
    image: ["2B5.jpeg", "2B6.jpeg", "Alya2.jpeg"],
    distance: "1.8 km from Oia",
    description:
      "Perched on the famous caldera cliffs of Santorini, our exclusive villas offer the most spectacular sunset views in the Aegean. Each villa features a private infinity pool, outdoor jacuzzi, and cave-style luxury suites carved into the volcanic rock. Indulge in Mediterranean fine dining while watching the sun paint the sky in brilliant colors.",
  },

  // Beach Hotels
  {
    name: "Tropical Breeze Hotel",
    type: "Beach Hotel",
    location: {
      city: "Phuket",
      country: "Thailand",
    },
    rating: 4.6,
    reviewsCount: 289,
    pricePerNight: 180,
    originalPrice: 240,
    amenities: [
      "Beach Access",
      "Pool",
      "Restaurant",
      "Bar",
      "Free WiFi",
      "Gym",
    ],
    featured: false,
    image: ["Alya3.jpeg", "Best1.jpg", "Best2.jpg"],
    distance: "0.5 km from Patong Beach",
    description:
      "Located steps from Patong Beach, Tropical Breeze Hotel offers comfortable accommodations with easy access to Phuket's vibrant nightlife and shopping. Enjoy fresh seafood at our beachfront restaurant, relax by the pool, or explore nearby islands with our tour desk services.",
  },
  {
    name: "Coral Sands Resort",
    type: "Beach Hotel",
    location: {
      city: "Cancun",
      country: "Mexico",
    },
    rating: 4.7,
    reviewsCount: 367,
    pricePerNight: 220,
    originalPrice: 280,
    amenities: [
      "Private Beach",
      "Pool",
      "All-Inclusive",
      "Water Sports",
      "Spa",
      "Kids Club",
    ],
    featured: true,
    image: ["Fubuki1.jpeg", "Fubuki2.jpg", "Hibana2.jpg"],
    distance: "12 km from airport",
    description:
      "An all-inclusive paradise on Cancun's famous Hotel Zone. Coral Sands Resort features multiple pools, a pristine private beach, and endless activities for the whole family. From snorkeling in the Caribbean Sea to exploring ancient Mayan ruins, your perfect Mexican vacation awaits.",
  },

  // City Hotels
  {
    name: "Grand Metropolitan Hotel",
    type: "City Hotel",
    location: {
      city: "New York",
      country: "USA",
    },
    rating: 4.5,
    reviewsCount: 892,
    pricePerNight: 320,
    originalPrice: 420,
    amenities: [
      "Rooftop Bar",
      "Gym",
      "Business Center",
      "Restaurant",
      "Free WiFi",
      "Concierge",
    ],
    featured: true,
    image: ["Hibana3.jpg", "hinata5.jpeg", "hinata6.jpg"],
    distance: "0.8 km from Times Square",
    description:
      "Experience the heart of Manhattan at Grand Metropolitan Hotel. Our prime location puts you steps away from Broadway theaters, world-class shopping, and iconic landmarks. Unwind at our rooftop bar with stunning skyline views, or energize at our state-of-the-art fitness center before exploring the city that never sleeps.",
  },
  {
    name: "Urban Loft Hotel",
    type: "City Hotel",
    location: {
      city: "Tokyo",
      country: "Japan",
    },
    rating: 4.6,
    reviewsCount: 445,
    pricePerNight: 280,
    originalPrice: 350,
    amenities: [
      "Modern Design",
      "Restaurant",
      "Bar",
      "Free WiFi",
      "Gym",
      "Laundry Service",
    ],
    featured: false,
    image: ["Juvia Lockser1.jpeg", "Juvia Lockser2.jpeg", "Mei Mei3.jpg"],
    distance: "0.3 km from Shibuya Station",
    description:
      "Immerse yourself in Tokyo's vibrant Shibuya district at Urban Loft Hotel. Our contemporary design blends Japanese minimalism with urban sophistication. Within walking distance of the famous Shibuya Crossing, trendy boutiques, and authentic ramen shops, we're your gateway to experiencing modern Tokyo.",
  },
  {
    name: "Skyline Plaza Hotel",
    type: "City Hotel",
    location: {
      city: "Dubai",
      country: "UAE",
    },
    rating: 4.8,
    reviewsCount: 678,
    pricePerNight: 400,
    originalPrice: 500,
    amenities: [
      "Sky Bar",
      "Infinity Pool",
      "Spa",
      "Fine Dining",
      "Valet Parking",
      "Butler Service",
    ],
    featured: true,
    image: ["Mei Mei8.jpeg", "Tanababyxo1.png", "Tanababyxo2.png"],
    distance: "5 km from Burj Khalifa",
    description:
      "Luxury redefined in the heart of Dubai. Skyline Plaza Hotel offers opulent accommodations with personalized butler service, a sky-high infinity pool, and panoramic views of the glittering cityscape. Dine at our Michelin-starred restaurant or sip cocktails at the exclusive sky bar while overlooking the iconic Burj Khalifa.",
  },

  // Boutique Hotels
  {
    name: "Heritage House Hotel",
    type: "Boutique Hotel",
    location: {
      city: "Paris",
      country: "France",
    },
    rating: 4.7,
    reviewsCount: 234,
    pricePerNight: 290,
    originalPrice: 360,
    amenities: [
      "Historic Building",
      "Garden Terrace",
      "Restaurant",
      "Free WiFi",
      "Concierge",
      "Art Gallery",
    ],
    featured: false,
    image: ["Nami2.jpg", "Nami3.jpeg", "mikasa2.jpge"],
    distance: "1.2 km from Eiffel Tower",
    description:
      "Step into Parisian elegance at Heritage House Hotel, a beautifully restored 18th-century mansion. Each uniquely designed room features period furniture and modern amenities. Enjoy breakfast in our enchanting garden terrace, explore our curated art gallery, or stroll to nearby cafés and the iconic Eiffel Tower.",
  },
  {
    name: "Artisan Inn",
    type: "Boutique Hotel",
    location: {
      city: "Barcelona",
      country: "Spain",
    },
    rating: 4.6,
    reviewsCount: 189,
    pricePerNight: 210,
    originalPrice: 270,
    amenities: [
      "Rooftop Terrace",
      "Local Cuisine",
      "Free WiFi",
      "Bikes Available",
      "Library",
      "Wine Cellar",
    ],
    featured: false,
    image: ["mikasa3.jpg", "vivi1.jpg", "vivi2.jpg"],
    distance: "0.7 km from Gothic Quarter",
    description:
      "Discover Barcelona's artistic soul at Artisan Inn. Our boutique hotel in the Gothic Quarter showcases local craftsmanship and Catalan culture. Relax on our rooftop terrace with views of the historic neighborhood, borrow a bike to explore Gaudí's masterpieces, or sample regional wines in our intimate cellar.",
  },

  // Mountain Lodges
  {
    name: "Alpine Peak Lodge",
    type: "Mountain Lodge",
    location: {
      city: "Aspen",
      country: "USA",
    },
    rating: 4.8,
    reviewsCount: 312,
    pricePerNight: 340,
    originalPrice: 420,
    amenities: [
      "Ski-in/Ski-out",
      "Hot Tub",
      "Restaurant",
      "Fireplace Lounge",
      "Spa",
      "Equipment Rental",
    ],
    featured: true,
    image: ["yamato1.jpg", "yamato6.jpg", "yor4.jpeg", "yor5.jpg"],
    distance: "0.2 km from slopes",
    description:
      "Ultimate ski-in/ski-out convenience at Alpine Peak Lodge. Wake up to snow-capped mountain views, hit the pristine slopes within minutes, and return to soak in our outdoor hot tub. After a day of adventure, warm up by the fireplace with hot cocoa or indulge in a relaxing spa treatment.",
  },
  {
    name: "Mountain View Chalet",
    type: "Mountain Lodge",
    location: {
      city: "Zermatt",
      country: "Switzerland",
    },
    rating: 4.9,
    reviewsCount: 267,
    pricePerNight: 480,
    originalPrice: 600,
    amenities: [
      "Matterhorn View",
      "Wellness Center",
      "Fine Dining",
      "Ski Storage",
      "Sauna",
      "Concierge",
    ],
    featured: true,
    image: ["Retsu Unohana6.jpg", "Resu Unohana7.jpg", "nicorobin1.jpg"],
    distance: "0.5 km from cable car",
    description:
      "Unparalleled views of the majestic Matterhorn await at our luxury Swiss chalet. Mountain View Chalet combines traditional Alpine charm with five-star amenities. Enjoy gourmet Swiss cuisine, rejuvenate in our wellness center with sauna and steam rooms, and experience world-class skiing on the legendary Zermatt slopes.",
  },

  // Budget Hotels
  {
    name: "Comfort Inn Express",
    type: "Budget Hotel",
    location: {
      city: "Los Angeles",
      country: "USA",
    },
    rating: 4.2,
    reviewsCount: 523,
    pricePerNight: 95,
    originalPrice: 120,
    amenities: [
      "Free Breakfast",
      "Free WiFi",
      "Parking",
      "24/7 Reception",
      "Vending Machines",
    ],
    featured: false,
    image: ["nicorobin3.jpg", "Retsu Unohana6.jpg", "Retsu Unohana7.jpg"],
    distance: "3 km from downtown",
    description:
      "Clean, comfortable, and convenient accommodations in Los Angeles. Comfort Inn Express offers excellent value with complimentary breakfast, free parking, and easy access to Hollywood, beaches, and downtown attractions. Perfect for budget-conscious travelers who want to maximize their LA experience.",
  },
  {
    name: "City Stay Hotel",
    type: "Budget Hotel",
    location: {
      city: "London",
      country: "UK",
    },
    rating: 4.1,
    reviewsCount: 698,
    pricePerNight: 110,
    originalPrice: 145,
    amenities: [
      "Free WiFi",
      "Breakfast Available",
      "Luggage Storage",
      "Tour Desk",
      "Laundry",
    ],
    featured: false,
    image: ["Ng4.jpg", "vivi1.jpg", "vivi2.jpg"],
    distance: "1.5 km from tube station",
    description:
      "Your affordable base for exploring London. City Stay Hotel provides comfortable rooms with easy access to the Underground, making all of London's attractions within reach. Our friendly staff can help arrange tours to Buckingham Palace, the Tower of London, and other must-see landmarks.",
  },

  // Business Hotels
  {
    name: "Executive Business Hotel",
    type: "Business Hotel",
    location: {
      city: "Singapore",
      country: "Singapore",
    },
    rating: 4.7,
    reviewsCount: 412,
    pricePerNight: 260,
    originalPrice: 320,
    amenities: [
      "Business Center",
      "Meeting Rooms",
      "Executive Lounge",
      "Gym",
      "Restaurant",
      "Free WiFi",
    ],
    featured: false,
    image: ["nicorobin1.jpg", "nicorobin3.jpg", "Retsu Unohana6.jpg"],
    distance: "2 km from financial district",
    description:
      "The premier choice for business travelers in Singapore. Executive Business Hotel offers fully equipped meeting rooms, a 24-hour business center, and high-speed WiFi throughout. After work, network in our executive lounge or maintain your fitness routine in our modern gym. Close to the financial district and Marina Bay.",
  },
  {
    name: "Corporate Suites Hotel",
    type: "Business Hotel",
    location: {
      city: "Frankfurt",
      country: "Germany",
    },
    rating: 4.5,
    reviewsCount: 356,
    pricePerNight: 230,
    originalPrice: 290,
    amenities: [
      "Conference Facilities",
      "Workspace in Rooms",
      "Restaurant",
      "Bar",
      "Gym",
      "Airport Shuttle",
    ],
    featured: false,
    image: ["Mei Mei3.jpg", "Mei Mei8.jpeg", "Boa Hancock5.jpg"],
    distance: "8 km from airport",
    description:
      "Designed for the modern business traveler, Corporate Suites Hotel features spacious rooms with dedicated workspaces, conference facilities for up to 200 guests, and complimentary airport shuttle service. Located in Frankfurt's business hub with excellent connections to the trade fair grounds and city center.",
  },

  // Eco Hotels
  {
    name: "Green Valley Eco Resort",
    type: "Eco Hotel",
    location: {
      city: "Costa Rica",
      country: "Costa Rica",
    },
    rating: 4.8,
    reviewsCount: 245,
    pricePerNight: 195,
    originalPrice: 250,
    amenities: [
      "Sustainable Building",
      "Organic Restaurant",
      "Nature Trails",
      "Solar Power",
      "Wildlife Tours",
      "Yoga Classes",
    ],
    featured: true,
    image: ["Best1.jpg", "Best2.jpg", "Alya2.jpeg"],
    distance: "15 km from national park",
    description:
      "Embrace sustainable luxury in the heart of Costa Rica's rainforest. Green Valley Eco Resort is powered entirely by solar energy and built with locally sourced materials. Explore diverse wildlife on guided nature walks, practice yoga surrounded by tropical birds, and dine on organic farm-to-table cuisine. Our eco-friendly practices ensure your stay helps preserve this natural paradise.",
  },
  {
    name: "Rainforest Lodge",
    type: "Eco Hotel",
    location: {
      city: "Amazon",
      country: "Brazil",
    },
    rating: 4.7,
    reviewsCount: 178,
    pricePerNight: 175,
    originalPrice: 230,
    amenities: [
      "Jungle Tours",
      "Organic Meals",
      "Bird Watching",
      "Eco-Friendly",
      "Canopy Walks",
      "Local Guides",
    ],
    featured: false,
    image: ["Hibana2.jpg", "Hibana3.jpg", "hinata5.jpeg"],
    distance: "45 km from Manaus",
    description:
      "Adventure meets conservation at Rainforest Lodge. Deep in the Amazon jungle, our eco-lodge offers an authentic rainforest experience with minimal environmental impact. Join expert local guides for jungle expeditions, bird watching at dawn, and thrilling canopy walks. Enjoy organic meals prepared with indigenous ingredients while listening to the symphony of the jungle.",
  },

  // Desert Resorts
  {
    name: "Desert Oasis Resort",
    type: "Desert Resort",
    location: {
      city: "Marrakech",
      country: "Morocco",
    },
    rating: 4.6,
    reviewsCount: 289,
    pricePerNight: 210,
    originalPrice: 270,
    amenities: [
      "Desert Tours",
      "Traditional Spa",
      "Pool",
      "Moroccan Restaurant",
      "Camel Rides",
      "Stargazing",
    ],
    featured: true,
    image: ["hinata6.jpg", "Ng3.jpg", "Boa Hancock5.jpg"],
    distance: "25 km from city center",
    description:
      "Experience the magic of the Sahara at Desert Oasis Resort. Our luxury desert camp offers traditional Berber hospitality with modern comforts. Ride camels across golden dunes, indulge in authentic hammam spa treatments, and dine on exquisite Moroccan cuisine under a canopy of stars. Watch the sunset paint the desert in brilliant hues from your private terrace.",
  },

  {
    name: "Bijay Resort",
    type: "Desert Resort",
    location: {
      city: "Bhaktapur",
      country: "Nepal",
    },
    rating: 4.9,
    reviewsCount: 299,
    pricePerNight: 200,
    originalPrice: 300,
    amenities: [
      "Desert Tours",
      "Traditional Spa",
      "Pool",
      "Moroccan Restaurant",
      "Camel Rides",
      "Stargazing",
    ],
    featured: true,
    image: ["Best1.jpg", "Ng1.jpg", "Best2.jpg"],
    distance: "25 km from city center",
    description:
      "Nestled in the ancient city of Bhaktapur, Bijay Resort combines traditional Newari architecture with modern luxury. Explore UNESCO World Heritage temples just steps away, enjoy panoramic Himalayan views from our rooftop, and savor authentic Nepali cuisine. Our resort offers a perfect blend of cultural immersion and comfortable relaxation, with traditional spa treatments and guided tours of this medieval city.",
  },
];

// Source folder where your original images are stored
const SOURCE_IMAGE_DIR = path.join(process.cwd(), "uploads", "images");

// Destination base folder for categorized images
const UPLOADS_BASE_DIR = path.join(process.cwd(), "uploads", "images");

// Helper function to ensure a folder exists, create if missing
const ensureFolderExists = (folderPath: string): void => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
  }
};

// Helper function to copy images and prepare hotel data
const prepareAndCopyImages = () => {
  ensureFolderExists(SOURCE_IMAGE_DIR); // Ensure source folder exists
  return sampleHotels.map((hotel) => {
    const typeFolderName = hotel.type.toLowerCase().replace(/\s+/g, "-");
    const destFolder = path.join(UPLOADS_BASE_DIR, typeFolderName);

    // Ensure destination type folder exists
    ensureFolderExists(destFolder);

    // Process each image in the array
    const processedImages = hotel.image.map((imageName) => {
      const sourceImagePath = path.join(SOURCE_IMAGE_DIR, imageName);
      const destImagePath = path.join(destFolder, imageName);

      // Copy the image file if it exists
      if (fs.existsSync(sourceImagePath)) {
        fs.copyFileSync(sourceImagePath, destImagePath);
        console.log(`✅ Copied image ${imageName} to ${destFolder}`);
      } else {
        console.warn(`⚠️ Source image not found: ${sourceImagePath}`);
      }

      // Return the relative path
      return path.relative(process.cwd(), destImagePath).replace(/\\/g, "/");
    });

    // Return the hotel object with updated image paths array
    return {
      ...hotel,
      image: processedImages,
    };
  });
};

const preparedHotels = prepareAndCopyImages();

// Validate MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error(
    "❌ Error: MONGODB_URI is not defined in environment variables"
  );
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    await Hotels.deleteMany({});
    await Hotels.insertMany(preparedHotels);
    console.log("✅ Sample hotel data inserted successfully.");
    console.log(`📊 Total hotels inserted: ${preparedHotels.length}`);
    console.log(
      `🏨 Hotel Types: ${[
        ...new Set(sampleHotels.map((hotel) => hotel.type)),
      ].join(", ")}`
    );
    console.log(
      `🌍 Locations: ${[
        ...new Set(
          sampleHotels.map(
            (hotel) => `${hotel.location.city}, ${hotel.location.country}`
          )
        ),
      ].join(" | ")}`
    );
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Error inserting sample data:", err);
    mongoose.disconnect();
  });

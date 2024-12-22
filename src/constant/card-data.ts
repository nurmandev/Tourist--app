type Location = {
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  
  type TimeInfo = {
    opens?: string;
    closes?: string;
    daysOfOperation?: string[];
  };
  
  type Duration = {
    preparation?: string;
    cooking?: string;
    total?: string;
  };
  
  type SubwayInfo = {
    nearestStation?: string;
    lines?: string[];
    walkingDistance?: string;
  };
  
  type Item = {
    // Required fields
    id: number;
    title: string;
  
    // Optional fields
    about?: string;
    location?: Location;
    image?: string;
    categories?: string[];
    tags?: string[];
    time?: TimeInfo;
    duration?: Duration;
    texts?: string[];
    subway?: SubwayInfo;
    price?: string;
    label?: string;
    icons?: string[];
    whatsIncluded?: string[];
    whoThisIsFor?: string[];
    whatYouShouldKnow?: string[];
  };
  
  
   export const CardFullData: Item = {
    id: 1,
    title: "Seven ways to eat codfish",
    about: "Experience the authentic taste of Portuguese codfish through seven unique preparations. From traditional Bacalhau à Brás to modern interpretations, discover the versatility of this beloved fish.",
    location: {
      address: "Rua da Boavista 134",
      city: "Lisbon",
      postalCode: "1200-068",
      country: "Portugal",
      coordinates: {
        lat: 38.7084,
        lng: -9.1487
      }
    },
    image: "/images/home1.png",
    categories: ["FOR YOU", "TOBY'S CHOICE"],
    tags: ["Portuguese cuisine", "Seafood", "Traditional", "Chef's special", "Fish"],
    time: {
      opens: "12:00",
      closes: "23:00",
      daysOfOperation: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    duration: {
      preparation: "45 mins",
      cooking: "30 mins",
      total: "75 mins"
    },
    texts: [
      "Discover the art of Portuguese codfish",
      "Fresh ingredients, traditional methods",
      "Family recipes passed through generations"
    ],
    subway: {
      nearestStation: "Baixa-Chiado",
      lines: ["Green", "Blue"],
      walkingDistance: "5 minutes"
    },
    price: "€€",
    label: "original",
    icons: ["/images/icons/music.svg"],
    whatsIncluded: [
      "• Tasting of 7 traditional codfish dishes:",
      "  • Salada de Bacalhau: A refreshing codfish salad with chickpeas, onions, and olive oil",
      "  • Pastéis de Bacalhau: Golden codfish cake, crispy on the outside and fluffy inside",
      "  • Patanisca de Bacalhau: A delicious codfish fritter crispy on the outside and fluffy inside",
      "  • Bacalhau à Brás: A comforting mix of shredded codfish, eggs, onions, and crispy potatoes",
      "  • Bacalhau à Lagareiro: Oven-baked codfish with olive oil, garlic, and roasted potatoes",
      "  • Bacalhau à Gomes de Sá: A classic casserole with cod, potatoes, onions, and olives",
      "  • Bacalhau Assado na Brasa: Grilled codfish with a smoky, charred flavor",
      "• A glass of wine or beverage paired with each dish",
      "• Access to web app with historical and cultural insights about codfish in Portuguese cuisine"
    ],
    whoThisIsFor: [
      "◻ Most travelers can participate;",
      "◻ In case of food allergies or diet restrictions, indicate it at the time of booking.",
      "◻ This activity is NOT suitable for: Vegan, Vegetarian or if you do not eat fish.",
      "◻ It Is suitable for the Pescetarian diet (fish, no meat). To be indicated at the time of purchase.",
    ],
    whatYouShouldKnow: [
      "• This experience requires a minimum number of travelers. If it’s canceled because the minimum isn’t met, you’ll be offered a different date/experience or a full refund.",
      "• For a full refund, cancel at least 24 hours in advance of the start date of the experience.",
      "• Classes are conducted in English and Portuguese",
      "• Vegetarian alternatives are not available for this specific class",
      "• Photos and videos are allowed and encouraged",
      "• Please inform us of any allergies in advance"
    ]
  };
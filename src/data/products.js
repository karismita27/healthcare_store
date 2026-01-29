export const CATEGORIES = [
  "BP Machines",
  "Stethoscope",
  "Nebulizer",
  "Pulse Oximeter",
  "Thermometer",
  "Glucometer",
];

export const PRODUCTS = [
  {
    id: "bp-001",
    name: "Digital BP Monitor (Arm)",
    category: "BP Machines",
    price: 2499,
    mrp: 2999,
    rating: 4.6,
    reviews: 128,
    stock: 45,
    brand: "MediCheck",
    image: "/images/17.jpg",
    popular: true,
    gallery: [
      "https://images.unsplash.com/photo-1580281658628-9a3f84b78b9d?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=60",
    ],
    shortPoints: [
      "Irregular heartbeat detection",
      "Large LCD display",
      "Memory storage for 2 users",
      "Cuff size: 22–42 cm",
    ],
    description:
      "Accurate arm BP monitor for daily monitoring. Designed for home and clinic use with easy one-touch operation.",
    specs: {
      "Measurement Method": "Oscillometric",
      "Display": "Large LCD",
      "Power": "4×AA / USB",
      "Cuff Range": "22–42 cm",
      "Warranty": "1 year",
    },
    inBox: ["Main unit", "Arm cuff", "Batteries", "User manual", "Carry pouch"],
    howToUse:
      "Wrap the cuff on upper arm, sit relaxed, press Start, and wait for results. Avoid talking/moving during measurement.",
    qualityBadges: ["Quality Checked", "Trusted Suppliers", "Easy Returns"],
  },
  {
    id: "st-001",
    name: "Classic Stethoscope",
    category: "Stethoscope",
    price: 899,
    mrp: 1099,
    rating: 4.4,
    reviews: 310,
    stock: 120,
    brand: "Clinico",
    popular: true,
    image:
      "/images/8.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1581595219315-cc9d62145758?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1588776814814-40551c9ccad1?auto=format&fit=crop&w=1200&q=60",
    ],
    shortPoints: [
      "Dual-head chestpiece",
      "Soft-seal ear tips",
      "Clear acoustics",
      "Clinic-ready build",
    ],
    description:
      "Durable, clinic-ready stethoscope with clear acoustics for everyday examination.",
    specs: {
      "Chestpiece": "Dual-head",
      "Tube": "PVC (latex-free)",
      "Ear Tips": "Soft seal",
      "Warranty": "6 months",
    },
    inBox: ["Stethoscope", "Extra ear tips", "User guide"],
    howToUse:
      "Insert ear tips facing forward, place chestpiece on target area, switch diaphragm/bell by rotating chestpiece.",
    qualityBadges: ["Quality Checked", "Verified Item"],
  },
  {
    id: "neb-001",
    name: "Portable Nebulizer",
    category: "Nebulizer",
    price: 1699,
    mrp: 1999,
    rating: 4.5,
    reviews: 89,
    stock: 30,
    brand: "AirEase",
    popular: true,
    image:
      "/images/15.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1588776814673-ec44a08d0e8f?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1588776814801-4de0d4a3b8d7?auto=format&fit=crop&w=1200&q=60",
    ],
    shortPoints: [
      "Low noise operation",
      "Compact for travel",
      "Fast nebulization",
      "Adult & child masks",
    ],
    description:
      "Compact nebulizer suitable for home use and clinics. Designed for consistent aerosol delivery.",
    specs: {
      "Noise Level": "Low",
      "Power": "AC",
      "Particle Size": "< 5 μm",
      "Warranty": "1 year",
    },
    inBox: ["Nebulizer", "Mask (Adult)", "Mask (Child)", "Mouthpiece", "Tube"],
    howToUse:
      "Add prescribed medicine to chamber, connect tube, wear mask, turn on device and breathe normally.",
    qualityBadges: ["Quality Checked", "Trusted Suppliers"],
  },
  {
    id: "ox-001",
    name: "Finger Pulse Oximeter",
    category: "Pulse Oximeter",
    price: 799,
    mrp: 999,
    rating: 4.3,
    reviews: 540,
    stock: 200,
    popular: true,
    brand: "OxySure",
    image:
      "/images/13.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1581595218513-1d1f530c6b0e?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1588776814800-1a1fd4d5b5da?auto=format&fit=crop&w=1200&q=60",
    ],
    shortPoints: ["SpO₂ & Pulse rate", "Bright display", "Auto power-off", "Portable"],
    description:
      "Quickly measure SpO₂ and pulse rate. Ideal for home monitoring and clinics.",
    specs: {
      "Measures": "SpO₂ / PR",
      "Display": "OLED",
      "Battery": "2×AAA",
      "Warranty": "6 months",
    },
    inBox: ["Oximeter", "Lanyard", "Batteries", "User guide"],
    howToUse:
      "Insert finger, keep hand steady, wait for stable reading. Avoid cold fingers for best accuracy.",
    qualityBadges: ["Quality Checked", "Verified Item", "Easy Returns"],
  },
  {
    id: "th-001",
    name: "Infrared Thermometer (Forehead)",
    category: "Thermometer",
    price: 1199,
    mrp: 1499,
    rating: 4.4,
    popular: true,
    reviews: 222,
    stock: 76,
    brand: "TempPro",
    image:
      "/images/11.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1588776814722-6ea06bdfe5a8?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1588776814678-1b8a0f4c9f69?auto=format&fit=crop&w=1200&q=60",
    ],
    shortPoints: ["1-second reading", "No-contact", "Fever alarm", "Memory recall"],
    description:
      "Non-contact infrared thermometer for fast readings—ideal for home and office screening.",
    specs: {
      "Reading Time": "1 sec",
      "Mode": "Body / Surface",
      "Power": "2×AAA",
      "Warranty": "1 year",
    },
    inBox: ["Thermometer", "Batteries", "User manual"],
    howToUse:
      "Aim at forehead from recommended distance, press button, read temperature. Keep sensor clean.",
    qualityBadges: ["Quality Checked", "Trusted Suppliers"],
  },
  {
    id: "gl-001",
    name: "Blood Glucose Meter Kit",
    category: "Glucometer",
    price: 1399,
    mrp: 1699,
    rating: 4.5,
    reviews: 145,
    stock: 90,
    brand: "GlucoMate",
    image:
      "/images/1.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1588776814807-5a9f1b9f15d9?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1588776814826-7a2f0d7c02fb?auto=format&fit=crop&w=1200&q=60",
    ],
    shortPoints: ["Accurate readings", "Easy strips", "Memory storage", "Fast result"],
    description:
      "Complete glucometer kit with strips and lancets. Suitable for regular monitoring.",
    specs: {
      "Result Time": "5 sec",
      "Sample": "0.6 μL",
      "Memory": "500 results",
      "Warranty": "1 year",
    },
    inBox: ["Meter", "Test strips", "Lancets", "Lancing device", "Carry case", "Manual"],
    howToUse:
      "Insert strip, prick finger with lancet, touch blood to strip, and read result in seconds.",
    qualityBadges: ["Quality Checked", "Verified Item"],
  },
];

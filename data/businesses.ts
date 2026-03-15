import { Business } from "@/types/business";

export const businessTagLabels: Record<string, string> = {
  low2k: "Low <$2k",
  low5k: "Low <$5k",
  solo: "Solo-friendly",
  high: "High demand",
  indoor: "Indoor",
  outdoor: "Outdoor"
};

export const businesses: Business[] = [
  {
    id: "lawn-care-landscaping",
    name: "Lawn Care / Landscaping",
    tags: ["low5k", "solo", "high", "outdoor"],
    startup_cost_range: "$1,800-$6,500",
    revenue_90_range: "$3,500-$18,000",
    revenue_1yr_range: "$35,000-$120,000",
    margin_range: "35%-55%",
    difficulty: "Beginner",
    recommended_first_offer: "Front-yard mow, edge, and cleanup package",
    phaseBenchmarks: [
      { leads: [8, 14], quotes: [5, 9], jobs: [2, 4], revenue: [500, 1800] },
      { leads: [16, 28], quotes: [10, 16], jobs: [5, 8], revenue: [1600, 5200] },
      { leads: [20, 36], quotes: [12, 20], jobs: [7, 12], revenue: [2800, 8200] },
      { leads: [24, 42], quotes: [14, 24], jobs: [8, 14], revenue: [3800, 11000] }
    ],
    costs: {
      equipment: "$1,100-$4,200",
      insurance: "$300-$900",
      marketing: "$180-$700",
      software: "$60-$260",
      misc: "$160-$440"
    },
    tools: [
      "Commercial mower or push mower",
      "String trimmer",
      "Blower",
      "Safety glasses + gloves",
      "Gas cans",
      "Lawn bags",
      "Basic trailer or hitch carrier",
      "Measuring wheel"
    ]
  },
  {
    id: "pressure-washing",
    name: "Pressure Washing",
    tags: ["low2k", "low5k", "solo", "high", "outdoor"],
    startup_cost_range: "$1,500-$4,500",
    revenue_90_range: "$4,000-$22,000",
    revenue_1yr_range: "$45,000-$130,000",
    margin_range: "40%-65%",
    difficulty: "Beginner",
    recommended_first_offer: "Driveway + walkway wash starter package",
    phaseBenchmarks: [
      { leads: [10, 16], quotes: [6, 10], jobs: [3, 5], revenue: [700, 2200] },
      { leads: [18, 30], quotes: [11, 18], jobs: [6, 10], revenue: [2200, 6800] },
      { leads: [24, 40], quotes: [14, 22], jobs: [8, 13], revenue: [3600, 9800] },
      { leads: [28, 46], quotes: [16, 26], jobs: [9, 16], revenue: [4800, 13200] }
    ],
    costs: {
      equipment: "$950-$2,900",
      insurance: "$280-$850",
      marketing: "$150-$650",
      software: "$60-$250",
      misc: "$120-$420"
    },
    tools: [
      "3,000+ PSI pressure washer",
      "Surface cleaner attachment",
      "Hose and reels",
      "Nozzle set",
      "Eco-safe detergent",
      "PPE kit",
      "Extension cords",
      "Water source adapters"
    ]
  },
  {
    id: "residential-cleaning",
    name: "Residential Cleaning",
    tags: ["low2k", "low5k", "solo", "high", "indoor"],
    startup_cost_range: "$900-$3,000",
    revenue_90_range: "$3,000-$15,000",
    revenue_1yr_range: "$30,000-$90,000",
    margin_range: "35%-55%",
    difficulty: "Beginner",
    recommended_first_offer: "3-hour deep clean for kitchen + bathrooms",
    phaseBenchmarks: [
      { leads: [8, 14], quotes: [5, 9], jobs: [2, 4], revenue: [450, 1500] },
      { leads: [14, 24], quotes: [9, 14], jobs: [5, 8], revenue: [1400, 4500] },
      { leads: [18, 30], quotes: [11, 18], jobs: [7, 11], revenue: [2400, 7000] },
      { leads: [22, 34], quotes: [13, 20], jobs: [8, 13], revenue: [3200, 9400] }
    ],
    costs: {
      equipment: "$450-$1,300",
      insurance: "$220-$700",
      marketing: "$120-$500",
      software: "$50-$220",
      misc: "$80-$280"
    },
    tools: [
      "Vacuum",
      "Microfiber cloths",
      "Mop + bucket",
      "Scrub brushes",
      "All-purpose cleaner",
      "Glass cleaner",
      "Protective gloves",
      "Car caddy organizer"
    ]
  },
  {
    id: "commercial-cleaning",
    name: "Commercial Cleaning",
    tags: ["low5k", "high", "indoor"],
    startup_cost_range: "$1,500-$6,000",
    revenue_90_range: "$4,000-$25,000",
    revenue_1yr_range: "$50,000-$200,000",
    margin_range: "25%-45%",
    difficulty: "Moderate",
    recommended_first_offer: "Nightly office cleaning trial (2 visits)",
    phaseBenchmarks: [
      { leads: [6, 12], quotes: [4, 8], jobs: [1, 3], revenue: [700, 2600] },
      { leads: [12, 20], quotes: [7, 12], jobs: [2, 5], revenue: [2600, 8500] },
      { leads: [16, 28], quotes: [9, 15], jobs: [4, 7], revenue: [4200, 13000] },
      { leads: [20, 32], quotes: [11, 18], jobs: [5, 8], revenue: [5600, 17000] }
    ],
    costs: {
      equipment: "$700-$2,400",
      insurance: "$350-$1,100",
      marketing: "$220-$900",
      software: "$80-$300",
      misc: "$140-$500"
    },
    tools: [
      "Commercial vacuum",
      "Floor machine rental option",
      "Janitorial cart",
      "Disinfectants",
      "Mop system",
      "Trash liners",
      "Gloves and PPE",
      "Scope-of-work checklist forms"
    ]
  },
  {
    id: "junk-removal",
    name: "Junk Removal",
    tags: ["low5k", "high", "outdoor"],
    startup_cost_range: "$4,000-$15,000",
    revenue_90_range: "$6,000-$30,000",
    revenue_1yr_range: "$70,000-$220,000",
    margin_range: "30%-50%",
    difficulty: "Moderate",
    recommended_first_offer: "1/8 truck-load pickup special",
    phaseBenchmarks: [
      { leads: [8, 14], quotes: [5, 9], jobs: [2, 4], revenue: [900, 3200] },
      { leads: [14, 24], quotes: [9, 14], jobs: [5, 8], revenue: [3000, 9000] },
      { leads: [18, 30], quotes: [11, 18], jobs: [7, 11], revenue: [5200, 14500] },
      { leads: [22, 36], quotes: [13, 21], jobs: [8, 13], revenue: [7000, 19000] }
    ],
    costs: {
      equipment: "$2,300-$8,400",
      insurance: "$500-$1,400",
      marketing: "$220-$950",
      software: "$70-$300",
      misc: "$200-$600"
    },
    tools: [
      "Pickup truck or trailer",
      "Heavy-duty gloves",
      "Ratchet straps",
      "Appliance dolly",
      "Tarps",
      "Safety vest",
      "Dump fee budget",
      "Quote-by-volume chart"
    ]
  },
  {
    id: "mobile-car-detailing",
    name: "Mobile Car Detailing",
    tags: ["low2k", "low5k", "solo", "high", "outdoor"],
    startup_cost_range: "$1,200-$5,000",
    revenue_90_range: "$4,000-$20,000",
    revenue_1yr_range: "$45,000-$140,000",
    margin_range: "40%-65%",
    difficulty: "Beginner",
    recommended_first_offer: "Exterior wash + interior reset package",
    phaseBenchmarks: [
      { leads: [10, 16], quotes: [6, 10], jobs: [3, 5], revenue: [700, 2300] },
      { leads: [16, 26], quotes: [10, 16], jobs: [6, 9], revenue: [2200, 6800] },
      { leads: [22, 34], quotes: [13, 20], jobs: [8, 12], revenue: [3600, 9800] },
      { leads: [26, 40], quotes: [15, 24], jobs: [9, 14], revenue: [4900, 13000] }
    ],
    costs: {
      equipment: "$700-$2,600",
      insurance: "$250-$850",
      marketing: "$150-$700",
      software: "$60-$260",
      misc: "$120-$420"
    },
    tools: [
      "Shop vacuum",
      "Dual-action polisher",
      "Microfiber towels",
      "Buckets and grit guards",
      "Foam cannon",
      "Interior brushes",
      "Water tank (optional)",
      "Portable canopy"
    ]
  },
  {
    id: "window-cleaning",
    name: "Window Cleaning",
    tags: ["low2k", "low5k", "solo", "high", "outdoor"],
    startup_cost_range: "$1,000-$4,000",
    revenue_90_range: "$3,000-$17,000",
    revenue_1yr_range: "$35,000-$110,000",
    margin_range: "40%-60%",
    difficulty: "Beginner",
    recommended_first_offer: "Exterior window clean up to 20 panes",
    phaseBenchmarks: [
      { leads: [8, 14], quotes: [5, 9], jobs: [2, 4], revenue: [500, 1800] },
      { leads: [15, 24], quotes: [9, 14], jobs: [5, 8], revenue: [1600, 5200] },
      { leads: [20, 32], quotes: [12, 18], jobs: [7, 11], revenue: [2800, 7600] },
      { leads: [24, 38], quotes: [14, 21], jobs: [8, 13], revenue: [3800, 10000] }
    ],
    costs: {
      equipment: "$500-$1,900",
      insurance: "$250-$850",
      marketing: "$140-$600",
      software: "$50-$230",
      misc: "$100-$350"
    },
    tools: [
      "Squeegees",
      "Extension poles",
      "Window mop",
      "Detergent",
      "Ladder stabilizer",
      "Drop cloths",
      "Glass scraper",
      "Safety harness basics"
    ]
  },
  {
    id: "gutter-cleaning",
    name: "Gutter Cleaning",
    tags: ["low5k", "solo", "high", "outdoor"],
    startup_cost_range: "$1,500-$5,500",
    revenue_90_range: "$3,500-$20,000",
    revenue_1yr_range: "$40,000-$120,000",
    margin_range: "35%-55%",
    difficulty: "Moderate",
    recommended_first_offer: "Single-story gutter clean + downspout flush",
    phaseBenchmarks: [
      { leads: [8, 14], quotes: [5, 9], jobs: [2, 4], revenue: [550, 2100] },
      { leads: [14, 24], quotes: [9, 14], jobs: [5, 8], revenue: [1900, 6000] },
      { leads: [18, 30], quotes: [11, 18], jobs: [7, 11], revenue: [3300, 8600] },
      { leads: [22, 36], quotes: [13, 21], jobs: [8, 13], revenue: [4400, 11200] }
    ],
    costs: {
      equipment: "$900-$3,100",
      insurance: "$300-$980",
      marketing: "$170-$700",
      software: "$60-$250",
      misc: "$120-$470"
    },
    tools: [
      "Extension ladders",
      "Gutter scoop",
      "Leaf blower attachment",
      "Bucket + hooks",
      "Work gloves",
      "Safety helmet",
      "Harness kit",
      "Downspout snake"
    ]
  },
  {
    id: "handyman-services",
    name: "Handyman Services",
    tags: ["low5k", "solo", "high", "indoor", "outdoor"],
    startup_cost_range: "$2,000-$8,000",
    revenue_90_range: "$5,000-$25,000",
    revenue_1yr_range: "$60,000-$180,000",
    margin_range: "30%-50%",
    difficulty: "Moderate",
    recommended_first_offer: "Half-day fix-it bundle (3 small tasks)",
    phaseBenchmarks: [
      { leads: [8, 14], quotes: [5, 9], jobs: [2, 4], revenue: [700, 2600] },
      { leads: [14, 24], quotes: [9, 14], jobs: [5, 8], revenue: [2500, 7800] },
      { leads: [18, 30], quotes: [11, 18], jobs: [7, 11], revenue: [4300, 11800] },
      { leads: [22, 36], quotes: [13, 22], jobs: [8, 14], revenue: [5900, 15400] }
    ],
    costs: {
      equipment: "$1,200-$4,900",
      insurance: "$350-$1,100",
      marketing: "$190-$780",
      software: "$70-$300",
      misc: "$180-$540"
    },
    tools: [
      "Drill/driver set",
      "Saw options",
      "Stud finder",
      "Socket set",
      "Step ladder",
      "Drop cloths",
      "PPE",
      "Consumables kit"
    ]
  },
  {
    id: "painting",
    name: "Painting (Interior/Exterior)",
    tags: ["low5k", "high", "indoor", "outdoor"],
    startup_cost_range: "$2,500-$10,000",
    revenue_90_range: "$7,000-$35,000",
    revenue_1yr_range: "$80,000-$250,000",
    margin_range: "30%-50%",
    difficulty: "Moderate",
    recommended_first_offer: "Single-room repaint package",
    phaseBenchmarks: [
      { leads: [8, 14], quotes: [5, 9], jobs: [2, 4], revenue: [1000, 3800] },
      { leads: [14, 24], quotes: [9, 14], jobs: [5, 8], revenue: [3600, 11000] },
      { leads: [18, 30], quotes: [11, 18], jobs: [7, 11], revenue: [6200, 17000] },
      { leads: [22, 36], quotes: [13, 21], jobs: [8, 13], revenue: [8200, 23000] }
    ],
    costs: {
      equipment: "$1,400-$5,500",
      insurance: "$380-$1,250",
      marketing: "$220-$920",
      software: "$70-$320",
      misc: "$240-$700"
    },
    tools: [
      "Rollers and brushes",
      "Airless sprayer (optional)",
      "Drop cloths",
      "Painter tape",
      "Ladders",
      "Caulk guns",
      "Prep tools",
      "Respirator masks"
    ]
  },
  {
    id: "appliance-repair",
    name: "Appliance Repair",
    tags: ["low5k", "solo", "high", "indoor"],
    startup_cost_range: "$3,000-$12,000",
    revenue_90_range: "$7,000-$30,000",
    revenue_1yr_range: "$90,000-$220,000",
    margin_range: "35%-55%",
    difficulty: "Moderate",
    recommended_first_offer: "Diagnostic + minor repair visit",
    phaseBenchmarks: [
      { leads: [8, 14], quotes: [5, 9], jobs: [2, 4], revenue: [1200, 4200] },
      { leads: [14, 22], quotes: [9, 14], jobs: [5, 8], revenue: [3800, 12000] },
      { leads: [18, 28], quotes: [11, 17], jobs: [7, 11], revenue: [6600, 18000] },
      { leads: [22, 34], quotes: [13, 20], jobs: [8, 13], revenue: [8900, 24000] }
    ],
    costs: {
      equipment: "$1,800-$7,200",
      insurance: "$420-$1,300",
      marketing: "$220-$900",
      software: "$80-$320",
      misc: "$250-$760"
    },
    tools: [
      "Diagnostic meter",
      "Nut drivers",
      "Wrench set",
      "Parts bins",
      "Service manuals access",
      "PPE",
      "Knee pads",
      "Vehicle shelving"
    ]
  },
  {
    id: "pool-cleaning",
    name: "Pool Cleaning",
    tags: ["low5k", "solo", "high", "outdoor"],
    startup_cost_range: "$2,500-$9,000",
    revenue_90_range: "$5,000-$24,000",
    revenue_1yr_range: "$70,000-$180,000",
    margin_range: "30%-50%",
    difficulty: "Moderate",
    recommended_first_offer: "Weekly chemical check + skim + vacuum",
    phaseBenchmarks: [
      { leads: [6, 12], quotes: [4, 8], jobs: [2, 3], revenue: [800, 2600] },
      { leads: [12, 20], quotes: [7, 12], jobs: [4, 7], revenue: [2800, 8600] },
      { leads: [16, 26], quotes: [9, 15], jobs: [6, 10], revenue: [4900, 13000] },
      { leads: [20, 32], quotes: [11, 18], jobs: [7, 12], revenue: [6600, 17500] }
    ],
    costs: {
      equipment: "$1,300-$4,900",
      insurance: "$340-$1,050",
      marketing: "$180-$760",
      software: "$70-$280",
      misc: "$220-$620"
    },
    tools: [
      "Test strips and kits",
      "Pool pole + net",
      "Vacuum head",
      "Brushes",
      "Chemical storage bins",
      "PPE",
      "Service route app",
      "Waterproof labels"
    ]
  },
  {
    id: "fence-installation",
    name: "Fence Installation",
    tags: ["high", "outdoor"],
    startup_cost_range: "$5,000-$20,000",
    revenue_90_range: "$8,000-$45,000",
    revenue_1yr_range: "$120,000-$350,000",
    margin_range: "25%-40%",
    difficulty: "Moderate",
    recommended_first_offer: "40-foot privacy fence install",
    phaseBenchmarks: [
      { leads: [6, 10], quotes: [4, 7], jobs: [1, 2], revenue: [1600, 6200] },
      { leads: [10, 16], quotes: [6, 10], jobs: [2, 4], revenue: [5500, 17000] },
      { leads: [12, 20], quotes: [8, 12], jobs: [3, 5], revenue: [9200, 25000] },
      { leads: [14, 24], quotes: [9, 14], jobs: [4, 6], revenue: [12500, 33000] }
    ],
    costs: {
      equipment: "$2,800-$10,500",
      insurance: "$500-$1,500",
      marketing: "$260-$1,100",
      software: "$90-$340",
      misc: "$300-$950"
    },
    tools: [
      "Post hole auger",
      "Level and strings",
      "Circular saw",
      "Concrete mix gear",
      "Nailer/screws",
      "Truck/trailer access",
      "PPE",
      "Material estimator sheet"
    ]
  },
  {
    id: "flooring-installation",
    name: "Flooring Installation (small jobs)",
    tags: ["high", "indoor"],
    startup_cost_range: "$4,000-$15,000",
    revenue_90_range: "$8,000-$40,000",
    revenue_1yr_range: "$110,000-$280,000",
    margin_range: "25%-45%",
    difficulty: "Moderate",
    recommended_first_offer: "Single-room LVP install package",
    phaseBenchmarks: [
      { leads: [6, 10], quotes: [4, 7], jobs: [1, 2], revenue: [1600, 6000] },
      { leads: [10, 16], quotes: [6, 10], jobs: [2, 4], revenue: [5200, 16000] },
      { leads: [12, 20], quotes: [8, 12], jobs: [3, 5], revenue: [9000, 23000] },
      { leads: [14, 24], quotes: [9, 14], jobs: [4, 6], revenue: [12000, 30000] }
    ],
    costs: {
      equipment: "$2,400-$8,800",
      insurance: "$450-$1,400",
      marketing: "$240-$980",
      software: "$80-$320",
      misc: "$260-$760"
    },
    tools: [
      "Floor cutter",
      "Moisture meter",
      "Knee pads",
      "Spacers",
      "Pull bars",
      "Tapping block",
      "Saws",
      "Adhesive tools"
    ]
  },
  {
    id: "moving-labor",
    name: "Moving Labor (labor-only)",
    tags: ["low2k", "low5k", "solo", "high", "indoor", "outdoor"],
    startup_cost_range: "$1,200-$4,500",
    revenue_90_range: "$4,000-$18,000",
    revenue_1yr_range: "$50,000-$150,000",
    margin_range: "35%-55%",
    difficulty: "Beginner",
    recommended_first_offer: "2 movers, 2-hour local labor block",
    phaseBenchmarks: [
      { leads: [8, 14], quotes: [5, 9], jobs: [2, 4], revenue: [700, 2400] },
      { leads: [14, 24], quotes: [9, 14], jobs: [5, 8], revenue: [2300, 7000] },
      { leads: [18, 30], quotes: [11, 18], jobs: [7, 11], revenue: [3900, 9800] },
      { leads: [22, 36], quotes: [13, 21], jobs: [8, 13], revenue: [5200, 12800] }
    ],
    costs: {
      equipment: "$650-$2,300",
      insurance: "$300-$950",
      marketing: "$150-$680",
      software: "$60-$250",
      misc: "$120-$420"
    },
    tools: [
      "Dollies",
      "Moving blankets",
      "Ratchet straps",
      "Hand truck",
      "Gloves",
      "Back-support belts",
      "Shrink wrap",
      "Basic toolkit"
    ]
  },
  {
    id: "pet-waste-removal",
    name: "Pet Waste Removal",
    tags: ["low2k", "low5k", "solo", "high", "outdoor"],
    startup_cost_range: "$700-$2,500",
    revenue_90_range: "$2,000-$10,000",
    revenue_1yr_range: "$25,000-$80,000",
    margin_range: "45%-70%",
    difficulty: "Beginner",
    recommended_first_offer: "Weekly yard cleanup subscription",
    phaseBenchmarks: [
      { leads: [10, 16], quotes: [6, 10], jobs: [3, 5], revenue: [350, 1300] },
      { leads: [16, 28], quotes: [10, 16], jobs: [6, 10], revenue: [1200, 3600] },
      { leads: [20, 34], quotes: [12, 20], jobs: [8, 13], revenue: [2000, 5500] },
      { leads: [24, 40], quotes: [14, 24], jobs: [9, 15], revenue: [2800, 7600] }
    ],
    costs: {
      equipment: "$260-$900",
      insurance: "$180-$600",
      marketing: "$100-$450",
      software: "$40-$180",
      misc: "$80-$260"
    },
    tools: [
      "Scooper tools",
      "Bucket liners",
      "Disinfectant spray",
      "Boot covers",
      "Route map app",
      "Waste bins",
      "Disposable gloves",
      "Subscription tracker sheet"
    ]
  },
  {
    id: "snow-removal",
    name: "Snow Removal",
    tags: ["low5k", "high", "outdoor"],
    startup_cost_range: "$2,000-$10,000",
    revenue_90_range: "$4,000-$30,000",
    revenue_1yr_range: "$35,000-$140,000",
    margin_range: "25%-45%",
    difficulty: "Moderate",
    recommended_first_offer: "Driveway + walkway storm service",
    phaseBenchmarks: [
      { leads: [6, 12], quotes: [4, 8], jobs: [2, 3], revenue: [700, 2600] },
      { leads: [10, 20], quotes: [6, 12], jobs: [4, 7], revenue: [2200, 9000] },
      { leads: [14, 26], quotes: [8, 15], jobs: [6, 10], revenue: [3800, 15000] },
      { leads: [18, 32], quotes: [10, 18], jobs: [7, 12], revenue: [5200, 19000] }
    ],
    costs: {
      equipment: "$1,100-$5,700",
      insurance: "$350-$1,100",
      marketing: "$180-$780",
      software: "$60-$260",
      misc: "$180-$520"
    },
    tools: [
      "Snow blower",
      "Shovels",
      "Salt spreader",
      "Ice melt stock",
      "Winter PPE",
      "Headlamp",
      "Storm route list",
      "Vehicle winter kit"
    ]
  },
  {
    id: "trash-bin-cleaning",
    name: "Trash Bin Cleaning",
    tags: ["low2k", "low5k", "solo", "high", "outdoor"],
    startup_cost_range: "$1,500-$8,000",
    revenue_90_range: "$3,000-$18,000",
    revenue_1yr_range: "$40,000-$130,000",
    margin_range: "35%-55%",
    difficulty: "Beginner",
    recommended_first_offer: "Monthly dual-bin sanitation plan",
    phaseBenchmarks: [
      { leads: [10, 16], quotes: [6, 10], jobs: [3, 5], revenue: [500, 1800] },
      { leads: [16, 28], quotes: [10, 16], jobs: [6, 10], revenue: [1700, 5400] },
      { leads: [20, 34], quotes: [12, 20], jobs: [8, 13], revenue: [2900, 8000] },
      { leads: [24, 40], quotes: [14, 24], jobs: [9, 15], revenue: [4000, 10500] }
    ],
    costs: {
      equipment: "$850-$4,600",
      insurance: "$260-$900",
      marketing: "$160-$700",
      software: "$50-$230",
      misc: "$140-$460"
    },
    tools: [
      "Pressure washer",
      "Sanitizer concentrate",
      "Drain-safe runoff plan",
      "PPE gear",
      "Bin hooks",
      "Odor treatment",
      "Route planner",
      "Receipt template"
    ]
  },
  {
    id: "holiday-light-installation",
    name: "Holiday Light Installation",
    tags: ["low5k", "high", "outdoor"],
    startup_cost_range: "$2,500-$12,000",
    revenue_90_range: "$6,000-$40,000",
    revenue_1yr_range: "$40,000-$180,000",
    margin_range: "30%-50%",
    difficulty: "Moderate",
    recommended_first_offer: "Roofline + entryway light install package",
    phaseBenchmarks: [
      { leads: [6, 12], quotes: [4, 8], jobs: [2, 3], revenue: [900, 3200] },
      { leads: [12, 20], quotes: [7, 12], jobs: [4, 7], revenue: [3200, 11000] },
      { leads: [16, 28], quotes: [9, 15], jobs: [6, 10], revenue: [5600, 17000] },
      { leads: [20, 34], quotes: [11, 18], jobs: [7, 12], revenue: [7600, 23000] }
    ],
    costs: {
      equipment: "$1,500-$6,800",
      insurance: "$380-$1,250",
      marketing: "$220-$980",
      software: "$70-$290",
      misc: "$220-$670"
    },
    tools: [
      "Ladders",
      "Roof safety kit",
      "Clips and fasteners",
      "Timers",
      "Extension cords",
      "Storage reels",
      "Install gloves",
      "Design mockup sheet"
    ]
  },
  {
    id: "garage-door-service",
    name: "Garage Door Service (basic repairs)",
    tags: ["low5k", "solo", "high", "indoor", "outdoor"],
    startup_cost_range: "$3,500-$14,000",
    revenue_90_range: "$8,000-$35,000",
    revenue_1yr_range: "$100,000-$260,000",
    margin_range: "30%-50%",
    difficulty: "Moderate",
    recommended_first_offer: "Tune-up + balance + safety check service",
    phaseBenchmarks: [
      { leads: [8, 14], quotes: [5, 9], jobs: [2, 4], revenue: [1300, 4300] },
      { leads: [14, 24], quotes: [9, 14], jobs: [5, 8], revenue: [4200, 13000] },
      { leads: [18, 30], quotes: [11, 18], jobs: [7, 11], revenue: [7200, 19500] },
      { leads: [22, 36], quotes: [13, 21], jobs: [8, 13], revenue: [9800, 25500] }
    ],
    costs: {
      equipment: "$2,000-$8,200",
      insurance: "$420-$1,350",
      marketing: "$260-$1,020",
      software: "$80-$320",
      misc: "$260-$740"
    },
    tools: [
      "Torsion winding bars",
      "Socket and wrench sets",
      "Lubricants",
      "Cable tools",
      "Safety clamps",
      "Diagnostic checklist",
      "PPE",
      "Service inventory bins"
    ]
  }
];

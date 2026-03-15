import {
  AcquisitionPlan,
  Benchmark,
  Business,
  BusinessTag,
  ExecutionStage,
  OfferPricing,
  OperationsSetup,
  Phase,
  PromptSuggestions,
  Script,
  SoftwareRecommendation,
  StartupRequirements,
  SubscriptionTier
} from "@/types/business";

export const businessTagLabels: Record<BusinessTag, string> = {
  low2k: "Under $2k",
  low5k: "Under $5k",
  low10k: "Under $10k",
  solo: "Solo-friendly",
  crew: "Crew-based",
  high: "High demand",
  indoor: "Indoor",
  outdoor: "Outdoor",
  mobile: "Mobile",
  beginner: "Beginner-friendly",
  recurring: "Recurring revenue",
  seasonal: "Seasonal"
};

type ServiceSeed = {
  id: string;
  name: string;
  tags: BusinessTag[];
  summary: string;
  teaser: string;
  goodFor: string[];
  operatorModel: string;
  teamModel: string;
  serviceMode: string;
  difficulty: string;
  startup_cost_range: string;
  revenue_90_range: string;
  revenue_1yr_range: string;
  margin_range: string;
  demandLevel: string;
  seasonality: string;
  recurringRevenuePotential: string;
  recommended_first_offer: string;
  whyAttractive: string;
  whyPeopleStartIt: string;
  pros: string[];
  cons: string[];
  bestFitOperatorType: string;
  phaseBenchmarks: Benchmark[];
  costs: Business["costs"];
  tools: string[];
  equipment: string[];
  vehicleNeeds: string[];
  requiredItems: string[];
  optionalItems: string[];
  softwareNotes: Partial<Record<string, string>>;
  commonLicenseCategories: string[];
  localAgencyPrompts: string[];
  commercialAutoNote: string;
  equipmentCoverageNote: string;
  questionsToAskAgent: string[];
  starterOffer: string;
  standardOffer: string;
  premiumOffer: string;
  addOns: string[];
  recurringOption: string;
  minimumPriceGuidance: string;
  sampleUpsells: string[];
  pricingNotes: string[];
  bestFirstLeadSources: string[];
  onlineSources: string[];
  offlineSources: string[];
  localOutreachIdeas: string[];
  referralIdeas: string[];
  neighborhoodMarketingIdeas: string[];
  socialProofIdeas: string[];
  beforeAfterContentIdeas: string[];
  googleBusinessProfileGuidance: string[];
  leadResponseProcess: string[];
  quotingProcess: string[];
  schedulingProcess: string[];
  jobPrep: string[];
  completionChecklist: string[];
  invoicing: string[];
  reviewRequestProcess: string[];
  followUpProcess: string[];
  executionFocus: [string, string, string, string, string, string];
  advancedSystems: string[];
};

function buildBlueprintPhases(seed: ServiceSeed): Phase[] {
  return [
    {
      title: "Phase 1: Foundation",
      goal: `Build the operating base for ${seed.name} and get the first offer market-ready.`,
      tasks: [
        `Define exactly which jobs belong in "${seed.starterOffer}" and what is out of scope.`,
        "Register the business structure, secure a business bank account, and get proof of insurance in place.",
        "Set up business phone, CRM, invoicing, and scheduling before running outreach.",
        "Purchase only the required startup gear and stage it for fast daily deployment.",
        "Create a simple one-page price and service menu with clear minimums.",
        "Launch or update Google Business Profile with service-area language and proof photos."
      ],
      benchmarks: seed.phaseBenchmarks[0]
    },
    {
      title: "Phase 2: First Customers",
      goal: `Generate consistent quotes and close the first paid jobs for ${seed.name}.`,
      tasks: [
        "Publish one focused offer across local channels instead of splitting attention across too many services.",
        "Respond to every inbound lead within five minutes during business hours.",
        "Run estimates in clean geographic blocks and send quotes the same day.",
        "Document before/after proof and customer notes after every completed job.",
        "Ask for a review as soon as the customer confirms the outcome.",
        "Review close rate, average ticket, and quote speed at the end of every week."
      ],
      benchmarks: seed.phaseBenchmarks[1]
    },
    {
      title: "Phase 3: Operating Rhythm",
      goal: "Standardize the work, tighten pricing, and create predictable weekly execution.",
      tasks: [
        "Turn your best-performing offer into a repeatable delivery checklist.",
        "Install a weekly admin block for pipeline review, invoicing, and follow-up.",
        "Raise weak estimates by improving scope clarity instead of discounting first.",
        "Create at least one recurring or repeat-service pathway where it fits the service.",
        "Build referral asks into the closeout and review request flow.",
        "Track where every lead came from and keep only the highest-signal channels."
      ],
      benchmarks: seed.phaseBenchmarks[2]
    },
    {
      title: "Phase 4: Systemize & Scale",
      goal: "Add cleaner systems, protect margins, and prepare for steady month-four growth.",
      tasks: [
        "Create SOPs for intake, quoting, scheduling, completion, invoicing, and follow-up.",
        "Install missed-call text-back and quote reminder workflows.",
        "Define capacity limits, travel zones, and service minimums.",
        "Split offers into Starter, Standard, and Premium packages for cleaner sales conversations.",
        "Reactivate old quotes and past customers with a structured follow-up campaign.",
        "Set the next 30-day operating target for leads, jobs, revenue, and reviews."
      ],
      benchmarks: seed.phaseBenchmarks[3]
    }
  ];
}

function buildExecutionPlan(seed: ServiceSeed): ExecutionStage[] {
  const [week1, week2, week3, week4, month2, month3] = seed.executionFocus;

  return [
    {
      title: "Week 1",
      summary: "Set up the commercial basics and the first offer.",
      actions: [
        week1,
        "Open the business bank account, secure the domain/email, and configure the CRM pipeline.",
        `Write the quoting template for ${seed.starterOffer} with clear exclusions and minimum pricing.`,
        "Create the first proof pack: logo, five service photos, and a simple offer graphic."
      ]
    },
    {
      title: "Week 2",
      summary: "Launch public visibility and outreach.",
      actions: [
        week2,
        "Publish the launch offer on Google Business Profile, Facebook, and one neighborhood platform.",
        "Start daily lead response standards and document every inquiry in the CRM.",
        "Prepare door-hanger, flyer, or outreach templates matched to the service area."
      ]
    },
    {
      title: "Week 3",
      summary: "Run estimates, tighten scripts, and close the first jobs.",
      actions: [
        week3,
        "Time every estimate and job so pricing reflects labor, drive time, setup, and cleanup.",
        "Capture before/after assets on every completed job for future content.",
        "Refine the objection-handling script around the three biggest pricing questions."
      ]
    },
    {
      title: "Week 4",
      summary: "Build repeatability into delivery and follow-up.",
      actions: [
        week4,
        "Create the job checklist and review request workflow.",
        "Install a quote follow-up cadence for Day 2 and Day 7.",
        "Review the first month of numbers and cut low-performing lead sources."
      ]
    },
    {
      title: "Month 2",
      summary: "Move from hustle to operating rhythm.",
      actions: [
        month2,
        "Set fixed marketing, admin, and production blocks on the calendar.",
        "Refine upsells, recurring packages, and route density where appropriate.",
        "Add one partner/referral channel and one repeatable weekly outreach play."
      ]
    },
    {
      title: "Month 3",
      summary: "Systemize and prepare for controlled growth.",
      actions: [
        month3,
        "Document SOPs and install automation for intake, reminders, and review requests.",
        "Set month-four goals for leads, close rate, average ticket, and review count.",
        "Decide whether the next step is better pricing, denser routes, or part-time labor support."
      ]
    }
  ];
}

function buildScripts(seed: ServiceSeed): Script[] {
  return [
    {
      title: "Launch Offer Script",
      body:
        `Hi, this is [Your Name] with [Business Name]. We help local customers with ${seed.name.toLowerCase()}.\n` +
        `Right now we're booking our launch offer: "${seed.starterOffer}".\n` +
        "If I text you a quick scope and price range, would you like a quote?"
    },
    {
      title: "Estimate Follow-Up",
      body:
        `Hi [Name], checking in on the quote for ${seed.name.toLowerCase()}.\n` +
        "I still have room on the calendar this week and can hold a slot if you want to move forward.\n" +
        "Would you like me to reserve the next opening?"
    },
    {
      title: "Review Request",
      body:
        `Thanks again for trusting us with your ${seed.name.toLowerCase()} project.\n` +
        "If the result met your expectations, would you leave a quick review? It helps a local business grow.\n" +
        "Here is the direct link: [Review Link]"
    }
  ];
}

function buildSoftwareStack(seed: ServiceSeed): SoftwareRecommendation[] {
  const notes = seed.softwareNotes;

  return [
    {
      category: "Business phone",
      tool: "OpenPhone or Google Voice",
      requirement: "required",
      notes: notes["Business phone"] ?? "Use a dedicated business line, voicemail, and text-back workflow from day one."
    },
    {
      category: "CRM",
      tool: "Anchor Systems or a lightweight pipeline CRM",
      requirement: "required",
      notes: notes["CRM"] ?? "Track every lead, estimate, follow-up, and won/lost outcome in one pipeline."
    },
    {
      category: "Website",
      tool: "Simple one-page marketing site on Framer, Webflow, or Carrd",
      requirement: "recommended",
      notes: notes["Website"] ?? "A clean one-page site is enough early if it clearly explains service area, offer, and proof."
    },
    {
      category: "Domain / email",
      tool: "Google Workspace",
      requirement: "required",
      notes: notes["Domain / email"] ?? "Use a branded domain and email for trust when sending quotes and invoices."
    },
    {
      category: "Scheduling",
      tool: "Calendly, Acuity, or CRM-based scheduling",
      requirement: "recommended",
      notes: notes["Scheduling"] ?? "Batch estimate windows and install confirmation reminders."
    },
    {
      category: "Invoicing",
      tool: "Stripe Invoicing, QuickBooks, or CRM invoice tools",
      requirement: "required",
      notes: notes["Invoicing"] ?? "Send invoices immediately on completion and keep payment links easy."
    },
    {
      category: "Review management",
      tool: "Google review link + CRM automation",
      requirement: "recommended",
      notes: notes["Review management"] ?? "Review requests should fire right after completion while the result is top of mind."
    },
    {
      category: "Estimates / proposals",
      tool: "Quote template in CRM or Joist / QuoteIQ style tool",
      requirement: "required",
      notes: notes["Estimates / proposals"] ?? "Quotes should define scope, exclusions, schedule, and expiration."
    },
    {
      category: "Team communication",
      tool: "Slack or simple SMS group threads",
      requirement: "optional",
      notes: notes["Team communication"] ?? "Only needed once jobs involve a helper or recurring crew coordination."
    },
    {
      category: "Notes / docs",
      tool: "Notion, Google Docs, or Apple Notes",
      requirement: "recommended",
      notes: notes["Notes / docs"] ?? "Store SOPs, objections, scripts, and job notes in one operating manual."
    },
    {
      category: "Graphic design / content",
      tool: "Canva",
      requirement: "optional",
      notes: notes["Graphic design / content"] ?? "Use for simple before/after posts, flyers, and launch graphics."
    }
  ];
}

function buildStartupRequirements(seed: ServiceSeed): StartupRequirements {
  return {
    tools: seed.tools,
    equipment: seed.equipment,
    vehicleNeeds: seed.vehicleNeeds,
    requiredItems: seed.requiredItems,
    optionalItems: seed.optionalItems,
    budgetBuckets: [
      {
        label: "Equipment",
        range: seed.costs.equipment,
        note: "Buy only what is needed to deliver the starter and standard offer reliably."
      },
      {
        label: "Insurance",
        range: seed.costs.insurance,
        note: "Get coverage in place before running heavier job volume."
      },
      {
        label: "Marketing",
        range: seed.costs.marketing,
        note: "Use launch spend on local proof, route density, and a few repeatable channels."
      },
      {
        label: "Software",
        range: seed.costs.software,
        note: "A clean phone, CRM, quoting, and invoicing stack matters early."
      },
      {
        label: "Miscellaneous",
        range: seed.costs.misc,
        note: "Keep room for fuel, consumables, branded shirts, PPE, and replacements."
      }
    ]
  };
}

function buildAcquisitionPlan(seed: ServiceSeed): AcquisitionPlan {
  return {
    bestFirstLeadSources: seed.bestFirstLeadSources,
    onlineSources: seed.onlineSources,
    offlineSources: seed.offlineSources,
    localOutreachIdeas: seed.localOutreachIdeas,
    referralIdeas: seed.referralIdeas,
    neighborhoodMarketingIdeas: seed.neighborhoodMarketingIdeas,
    socialProofIdeas: seed.socialProofIdeas,
    beforeAfterContentIdeas: seed.beforeAfterContentIdeas,
    googleBusinessProfileGuidance: seed.googleBusinessProfileGuidance
  };
}

function buildOperations(seed: ServiceSeed): OperationsSetup {
  return {
    leadResponseProcess: seed.leadResponseProcess,
    quotingProcess: seed.quotingProcess,
    schedulingProcess: seed.schedulingProcess,
    jobPrep: seed.jobPrep,
    completionChecklist: seed.completionChecklist,
    invoicing: seed.invoicing,
    reviewRequestProcess: seed.reviewRequestProcess,
    followUpProcess: seed.followUpProcess
  };
}

function buildPromptSuggestions(serviceName: string): PromptSuggestions {
  return {
    setup: [
      `What licenses should I check for a ${serviceName.toLowerCase()} business in my city and state?`,
      `What insurance should I ask for as a new ${serviceName.toLowerCase()} operator?`,
      `What apps should I use to run a lean ${serviceName.toLowerCase()} business?`
    ],
    pricing: [
      `Help me create three pricing tiers for my ${serviceName.toLowerCase()} business.`,
      `What should my minimum job price be for ${serviceName.toLowerCase()}?`,
      `Help me respond when a ${serviceName.toLowerCase()} customer says my price is too high.`
    ],
    marketing: [
      `Write my first Facebook post for a new ${serviceName.toLowerCase()} company.`,
      `Give me 10 local lead generation ideas for ${serviceName.toLowerCase()}.`,
      `Write a Google Business Profile description for my ${serviceName.toLowerCase()} company.`
    ],
    operations: [
      `Build me a job checklist for ${serviceName.toLowerCase()}.`,
      `Help me create a lead intake workflow for ${serviceName.toLowerCase()}.`,
      `Write a review request message for a ${serviceName.toLowerCase()} customer.`
    ],
    sales: [
      `Write a follow-up text for an open ${serviceName.toLowerCase()} quote.`,
      `Help me answer why my ${serviceName.toLowerCase()} price is higher.`,
      `Give me a quick sales script for a ${serviceName.toLowerCase()} business.`
    ]
  };
}

function buildOfferPricing(seed: ServiceSeed): OfferPricing {
  return {
    starterOffer: seed.starterOffer,
    standardOffer: seed.standardOffer,
    premiumOffer: seed.premiumOffer,
    addOns: seed.addOns,
    recurringOption: seed.recurringOption,
    minimumPriceGuidance: seed.minimumPriceGuidance,
    sampleUpsells: seed.sampleUpsells,
    pricingNotes: seed.pricingNotes
  };
}

function buildBusiness(seed: ServiceSeed): Business {
  return {
    id: seed.id,
    name: seed.name,
    tags: seed.tags,
    summary: seed.summary,
    teaser: seed.teaser,
    goodFor: seed.goodFor,
    operatorModel: seed.operatorModel,
    teamModel: seed.teamModel,
    serviceMode: seed.serviceMode,
    difficulty: seed.difficulty,
    startup_cost_range: seed.startup_cost_range,
    revenue_90_range: seed.revenue_90_range,
    revenue_1yr_range: seed.revenue_1yr_range,
    margin_range: seed.margin_range,
    demandLevel: seed.demandLevel,
    seasonality: seed.seasonality,
    recurringRevenuePotential: seed.recurringRevenuePotential,
    recommended_first_offer: seed.recommended_first_offer,
    whyAttractive: seed.whyAttractive,
    whyPeopleStartIt: seed.whyPeopleStartIt,
    pros: seed.pros,
    cons: seed.cons,
    bestFitOperatorType: seed.bestFitOperatorType,
    phaseBenchmarks: seed.phaseBenchmarks,
    blueprintPhases: buildBlueprintPhases(seed),
    executionPlan: buildExecutionPlan(seed),
    costs: seed.costs,
    startupRequirements: buildStartupRequirements(seed),
    softwareStack: buildSoftwareStack(seed),
    licensingGuidance: {
      disclaimer:
        "Not legal advice. Licensing and permit requirements vary by state, county, and city. Always verify locally.",
      whereToCheck: [
        "City or county business licensing office",
        "State secretary of state / business registration portal",
        "State contractor, specialty trade, or environmental agency if applicable",
        "Your insurance agent and local chamber or SBA resource center"
      ],
      checklist: [
        "Register the business entity or sole proprietorship locally.",
        "Verify whether a general business license or home occupation permit is required.",
        "Ask whether this service triggers any specialty trade, environmental, hauling, or contractor rules.",
        "Confirm whether sales tax registration, waste disposal, or route permits apply.",
        "Store the license number, registration documents, EIN, and renewal dates in one folder."
      ],
      commonCategories: seed.commonLicenseCategories,
      agencyPrompts: seed.localAgencyPrompts
    },
    insuranceGuidance: {
      generalLiability:
        "Carry general liability before meaningful job volume so you can provide proof of coverage on request and protect against property damage claims.",
      commercialAuto: seed.commercialAutoNote,
      workersComp:
        "If you hire help or use subcontracted labor regularly, ask when workers' compensation or equivalent coverage becomes mandatory in your state.",
      equipmentCoverage: seed.equipmentCoverageNote,
      questionsToAsk: seed.questionsToAskAgent,
      documentsToKeep: [
        "Certificate of insurance",
        "Policy declarations page",
        "Agent contact information",
        "Vehicle schedule if relevant",
        "Coverage renewal dates",
        "Incident reporting steps"
      ]
    },
    offerPricing: buildOfferPricing(seed),
    acquisitionPlan: buildAcquisitionPlan(seed),
    operationsSetup: buildOperations(seed),
    promptSuggestions: buildPromptSuggestions(seed.name),
    scripts: buildScripts(seed),
    previewTeasers: [
      {
        title: "Core unlocks the real launch plan",
        description: `Preview lets you explore ${seed.name}. Core unlocks the detailed setup, operating guidance, and weekly roadmap.`,
        items: [
          "Full setup checklist and required tools",
          "Apps, pricing, licensing, and insurance guidance",
          "Weekly launch plan and operating process"
        ]
      },
      {
        title: "Pro unlocks guided AI support",
        description: "Use service-specific prompts and coaching to tighten pricing, marketing, operations, and follow-up.",
        items: [
          "Prompt starters by category",
          "Pricing and objection handling help",
          "Marketing, operations, and sales guidance"
        ]
      }
    ],
    advancedSystems: seed.advancedSystems
  };
}

const serviceSeeds: ServiceSeed[] = [
  {
    id: "pressure-washing",
    name: "Pressure Washing",
    tags: ["low2k", "low5k", "low10k", "solo", "outdoor", "mobile", "high", "beginner"],
    summary: "A mobile exterior cleaning business with strong visual proof, fast close cycles, and straightforward launch mechanics.",
    teaser: "Strong local demand, simple launch offer, and highly marketable before/after results.",
    goodFor: ["Operators who want fast visual transformation work", "People comfortable with outdoor field jobs", "Founders who want mobile local service routes"],
    operatorModel: "Strong fit for solo owner-operator launch.",
    teamModel: "Scales from solo to a 2-person field crew once route density grows.",
    serviceMode: "Outdoor / mobile",
    difficulty: "Beginner",
    startup_cost_range: "$1,500-$4,500",
    revenue_90_range: "$4,000-$22,000",
    revenue_1yr_range: "$45,000-$130,000",
    margin_range: "40%-65%",
    demandLevel: "High",
    seasonality: "Spring through fall is strongest in most markets, but warm-weather regions can run year-round.",
    recurringRevenuePotential: "Moderate through annual maintenance, HOA work, storefronts, and commercial contracts.",
    recommended_first_offer: "Driveway + walkway wash starter package",
    whyAttractive: "Customers can see the value instantly, and the service sells well with strong proof images and a simple offer.",
    whyPeopleStartIt: "It launches quickly, can be run from a truck or trailer, and does not require a full crew to start.",
    pros: ["High visual proof", "Simple local offer", "Can start lean", "Easy to batch by neighborhood"],
    cons: ["Weather exposure", "Water access and runoff considerations", "Equipment reliability matters"],
    bestFitOperatorType: "A responsive operator who likes route-based field work, direct response marketing, and before/after proof.",
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
    tools: ["3,000+ PSI pressure washer", "Surface cleaner", "Hose reels", "Nozzle kit", "Downstream injector", "PPE kit", "Extension cords", "Water source adapters"],
    equipment: ["Pressure washer", "Surface cleaner", "Hose reel setup", "Chemicals and storage", "Fuel cans", "Tarps and cones"],
    vehicleNeeds: ["Pickup truck, van, or trailer setup", "Secure hose and machine storage", "Water tank optional depending on market"],
    requiredItems: ["Commercial-grade washer", "Surface cleaner", "Insurance", "Business phone", "Quote template"],
    optionalItems: ["Soft-wash setup", "Portable water tank", "Branded shirts", "Canopy for estimate events"],
    softwareNotes: {
      CRM: "Track property type, water access notes, and quote follow-up timing so estimates stay fast.",
      "Estimates / proposals": "Use templates that separate driveway, siding, patio, deck, and roof-safe work."
    },
    commonLicenseCategories: ["General business license", "Water runoff / environmental questions", "Local contractor registration in some markets"],
    localAgencyPrompts: ["Do I need a runoff recovery or wastewater disposal permit for exterior washing?", "Are there restrictions on chemicals or water discharge for residential service work?"],
    commercialAutoNote: "Recommended if you drive a truck or trailer regularly for jobs or carry mounted equipment.",
    equipmentCoverageNote: "Worth asking about if you carry a commercial machine, reels, chemicals, and a trailer setup.",
    questionsToAskAgent: ["Would overspray, runoff, or surface damage be covered under general liability?", "How should I list the trailer and mobile equipment setup?"],
    starterOffer: "Driveway refresh up to a standard two-car driveway with walkway rinse.",
    standardOffer: "Driveway + walkway + patio wash with edge detail and photo proof.",
    premiumOffer: "Full exterior cleaning package with driveway, walkway, patio, house wash, and spot treatment.",
    addOns: ["Fence wash", "Patio furniture rinse", "Garage door wash", "Spot rust treatment"],
    recurringOption: "Annual or semiannual exterior refresh plan for homes and storefronts.",
    minimumPriceGuidance: "Protect a minimum trip charge even on small jobs because setup, breakdown, and drive time are real labor.",
    sampleUpsells: ["Add patio cleaning", "Upgrade to house wash", "Bundle fence panels or garage doors"],
    pricingNotes: ["Quote by surface type and soil level, not just square footage.", "Be clear about stain removal limits and water access assumptions."],
    bestFirstLeadSources: ["Google Business Profile", "Neighborhood Facebook groups", "Door hangers in high-visibility neighborhoods"],
    onlineSources: ["Google Business Profile posts", "Nextdoor", "Facebook before/after posts", "Local service marketplaces if carefully tracked"],
    offlineSources: ["Door hangers", "Yard signs at active jobs", "Realtor and property manager outreach"],
    localOutreachIdeas: ["Target homes with visibly dirty drives and walkways", "Offer bundle pricing on adjacent neighbors the same day"],
    referralIdeas: ["Window cleaners", "Landscapers", "Realtors", "Property managers"],
    neighborhoodMarketingIdeas: ["Run a same-street special", "Post route-day availability for one subdivision", "Use before/after flyers with QR code"],
    socialProofIdeas: ["Time-lapse driveway clean", "Side-by-side dirty vs clean comparison", "Customer text screenshots"],
    beforeAfterContentIdeas: ["Concrete transformation reels", "Patio refresh carousel", "Fence panel comparison shots"],
    googleBusinessProfileGuidance: ["Use service-area wording in the description", "Upload geo-tagged before/after proof", "Request reviews that mention driveway, patio, and curb appeal outcomes"],
    leadResponseProcess: ["Answer inbound calls quickly or use missed-call text-back.", "Ask for address, surface type, staining level, and water access.", "Book estimates in route clusters."],
    quotingProcess: ["Use photo-first quoting where possible.", "Confirm exact surfaces included and stain expectations.", "Send quote same day with add-on options."],
    schedulingProcess: ["Group jobs by neighborhood and weather windows.", "Confirm water access and gate access the day before.", "Send arrival window reminders."],
    jobPrep: ["Inspect overspray risk areas.", "Stage hoses, cones, chemicals, and PPE.", "Take starting photos before spraying."],
    completionChecklist: ["Post-job rinse and cleanup", "Before/after photos saved", "Customer walk-through", "Service notes logged in CRM"],
    invoicing: ["Invoice same day with photos attached if helpful.", "Collect on completion whenever possible.", "Track payment link clicks and outstanding balance."],
    reviewRequestProcess: ["Request review once the customer sees the finished result.", "Use a direct Google link.", "Mention curb appeal and professionalism in the ask."],
    followUpProcess: ["Send Day 2 quote follow-up.", "Send seasonal reminder before peak dirty season.", "Re-offer patio or house wash to completed customers."],
    executionFocus: [
      "Finalize the starter driveway package, pricing floor, and route radius.",
      "Launch proof-driven posts and door-hanger outreach in one priority neighborhood.",
      "Run your first estimate block and refine quote templates around surface type and stain level.",
      "Turn completed jobs into before/after assets and install a review request habit.",
      "Build weekly route density and add simple bundle upsells for patios, garage doors, and fences.",
      "Document intake, quoting, chemical handling, and completion SOPs so the work can scale."
    ],
    advancedSystems: [
      "Missed-call text-back linked to instant photo upload request",
      "Automated quote follow-up and route clustering workflows",
      "Recurring annual exterior maintenance campaigns"
    ]
  },
  {
    id: "window-cleaning",
    name: "Window Cleaning",
    tags: ["low2k", "low5k", "low10k", "solo", "outdoor", "mobile", "high", "beginner", "recurring"],
    summary: "A route-friendly service with straightforward tools, strong repeat potential, and high trust value when done cleanly.",
    teaser: "Simple equipment, recurring opportunities, and fast referral value from clean results.",
    goodFor: ["Founders who like clean process-driven work", "Operators comfortable with ladders and detail work", "People who want strong referral and repeat potential"],
    operatorModel: "Launches well as a solo owner-operator business.",
    teamModel: "Can stay solo or add a helper for larger homes and small commercial routes.",
    serviceMode: "Outdoor / mobile",
    difficulty: "Beginner",
    startup_cost_range: "$1,000-$4,000",
    revenue_90_range: "$3,000-$17,000",
    revenue_1yr_range: "$35,000-$110,000",
    margin_range: "40%-60%",
    demandLevel: "High",
    seasonality: "Best in spring, summer, and fall, though storefront work can run year-round.",
    recurringRevenuePotential: "High with storefronts, recurring homeowners, and seasonal maintenance.",
    recommended_first_offer: "Exterior window clean up to 20 panes",
    whyAttractive: "Customers quickly understand the value, and repeat cadence is easy to explain for both homes and storefronts.",
    whyPeopleStartIt: "Startup costs are manageable, the service is easy to demonstrate, and repeat work can compound.",
    pros: ["Lean startup", "Route density opportunity", "Good repeat business", "Strong referral value"],
    cons: ["Safety discipline required", "Weather sensitivity", "Detail expectations must be high"],
    bestFitOperatorType: "A detail-oriented operator who values clean process, professionalism, and repeat customer relationships.",
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
    tools: ["Squeegees", "Extension poles", "Window mop", "Bucket system", "Scraper kit", "Microfiber towels", "Ladder stabilizer", "Water-fed pole optional"],
    equipment: ["Glass cleaning kit", "Ladder system", "Drop cloths", "Belt and holster", "Towel loadout"],
    vehicleNeeds: ["Car, SUV, van, or pickup that safely stores ladders and poles", "Roof rack or interior ladder tie-down"],
    requiredItems: ["Basic glass kit", "Ladder safety setup", "Insurance", "Phone and CRM", "Quote checklist"],
    optionalItems: ["Water-fed pole", "Pure water system", "Branded shoe covers", "Route scheduling software"],
    softwareNotes: {
      Scheduling: "Recurring route customers benefit from standing cadence reminders and grouped service windows."
    },
    commonLicenseCategories: ["General business license", "Local registration", "Contractor registration rarely but verify for commercial ladder work"],
    localAgencyPrompts: ["Are there any height, ladder, or storefront permitting rules for mobile window cleaning in this city?", "Do I need a general business license to serve storefront routes?"],
    commercialAutoNote: "Recommended once ladders, poles, and commercial equipment travel daily in the vehicle.",
    equipmentCoverageNote: "Useful if you carry ladders, poles, pure water gear, or larger commercial storefront equipment.",
    questionsToAskAgent: ["Is ladder-related property damage covered?", "Should ladders and poles be listed as tools/equipment coverage?"],
    starterOffer: "Exterior residential window clean up to 20 panes.",
    standardOffer: "Interior + exterior residential clean with track wipe-down on accessible windows.",
    premiumOffer: "Interior + exterior + screen clean + track detail for full-home refresh.",
    addOns: ["Screen cleaning", "Track detailing", "Storm windows", "Storefront route add-on"],
    recurringOption: "Quarterly or biannual home cleaning and monthly storefront route service.",
    minimumPriceGuidance: "Use a minimum visit charge even when pane count is small so travel and ladder setup stay profitable.",
    sampleUpsells: ["Add screen cleaning", "Add skylights", "Upgrade to interior + track detail"],
    pricingNotes: ["Price by pane count, access difficulty, and interior/exterior mix.", "Clarify which windows require ladder access or special risk."],
    bestFirstLeadSources: ["Google Business Profile", "Storefront outreach", "Neighborhood referrals"],
    onlineSources: ["Google Business Profile", "Facebook neighborhood groups", "Local business directories"],
    offlineSources: ["Main-street storefront visits", "Door hangers", "Yard signs at residential jobs"],
    localOutreachIdeas: ["Visit small storefronts with a simple recurring route offer", "Offer same-day add-on pricing for nearby homes while in the area"],
    referralIdeas: ["Pressure washers", "House cleaners", "Realtors", "Property managers"],
    neighborhoodMarketingIdeas: ["Route-day specials", "Bundle two adjacent homes", "Leave behind screen-cleaning upsell flyer"],
    socialProofIdeas: ["Glass clarity closeups", "Storefront shine photos", "Review screenshots emphasizing professionalism"],
    beforeAfterContentIdeas: ["Sunlight-through-glass photos", "Track detail closeups", "Storefront transformation carousel"],
    googleBusinessProfileGuidance: ["Ask customers to mention reliability and clean finish.", "Use keywords for window cleaning, screen cleaning, and storefront service."],
    leadResponseProcess: ["Ask pane count, story count, access concerns, and whether interior work is needed.", "Tag residential vs storefront leads for different follow-up cadence."],
    quotingProcess: ["Use price ranges by pane count and access level.", "Clarify ladders, screens, tracks, and hard-water stain exclusions in writing."],
    schedulingProcess: ["Stack route days by neighborhood or commercial block.", "Confirm pets, access, and weather before arrival."],
    jobPrep: ["Stage drop cloths and shoe covers.", "Inspect ladder points and sensitive landscaping.", "Take pre-job notes on tough stains or seals."],
    completionChecklist: ["Final glass inspection", "Tracks/screens confirmed", "Ladder area cleaned", "Photos and notes logged"],
    invoicing: ["Invoice immediately after walk-through or storefront completion.", "Offer autopay for recurring route clients."],
    reviewRequestProcess: ["Ask after the customer sees the difference in natural light.", "For storefronts, ask after the second visit if recurring."],
    followUpProcess: ["Send recurring cadence reminder before the next suggested clean.", "Re-open older quotes before spring and holiday periods."],
    executionFocus: [
      "Set pane-count pricing rules, access rules, and minimum job pricing.",
      "Launch Google Business Profile and start local storefront outreach with a recurring route angle.",
      "Run first residential and storefront estimates, then tighten your quote notes for screens and tracks.",
      "Install recurring reminders and ask every completed customer about a repeat cadence.",
      "Build a denser route with storefronts or repeat homes and standardize upsell language.",
      "Document route scheduling, access prep, and completion QA so quality stays consistent as volume rises."
    ],
    advancedSystems: [
      "Recurring route scheduler with auto reminders",
      "Storefront segment follow-up workflows",
      "Post-service review and referral automations"
    ]
  },
  {
    id: "gutter-cleaning",
    name: "Gutter Cleaning",
    tags: ["low5k", "low10k", "solo", "outdoor", "mobile", "high", "seasonal"],
    summary: "A high-demand exterior maintenance service that sells well on urgency, prevention, and route-based local marketing.",
    teaser: "Strong homeowner pain point with fast close cycles, especially in leaf-heavy markets.",
    goodFor: ["Operators comfortable with ladders and outdoor work", "Founders who like seasonal burst demand", "People who can market prevention and property protection"],
    operatorModel: "Best launched solo with strong safety discipline.",
    teamModel: "Can expand to a 2-person crew for larger homes and denser fall routes.",
    serviceMode: "Outdoor / mobile",
    difficulty: "Moderate",
    startup_cost_range: "$1,500-$5,500",
    revenue_90_range: "$3,500-$20,000",
    revenue_1yr_range: "$40,000-$120,000",
    margin_range: "35%-55%",
    demandLevel: "High",
    seasonality: "Peaks during fall and storm-prep seasons, but downspout and maintenance work can extend the year.",
    recurringRevenuePotential: "Moderate through seasonal maintenance plans.",
    recommended_first_offer: "Single-story gutter clean + downspout flush",
    whyAttractive: "It solves a clear homeowner pain point and often closes quickly when timing is right.",
    whyPeopleStartIt: "The offer is easy to understand, and route density can make the economics strong during peak season.",
    pros: ["Simple homeowner problem", "Fast quote cycle", "Route-based efficiency", "Easy seasonal marketing angle"],
    cons: ["Safety risk", "Weather and debris conditions", "Seasonality can create demand swings"],
    bestFitOperatorType: "A field operator who communicates clearly, respects safety, and can run neighborhood campaigns quickly.",
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
    tools: ["Extension ladders", "Gutter scoop", "Leaf blower attachment", "Bucket + hooks", "Work gloves", "Safety helmet", "Harness kit", "Downspout snake"],
    equipment: ["Ladder system", "Debris collection gear", "Blower setup", "Downspout flush tools", "Safety cones"],
    vehicleNeeds: ["Truck, van, or trailer with ladder storage", "Space for debris bags and cleanup gear"],
    requiredItems: ["Ladder system", "Safety gear", "Insurance", "Quote checklist", "Branded leave-behind or flyer"],
    optionalItems: ["Gutter camera", "Leaf vacuum", "Gutter guard upsell samples", "Soft wash add-on gear"],
    softwareNotes: {
      "Estimates / proposals": "Quotes should define height assumptions, debris load, and whether bagging/haul-away is included."
    },
    commonLicenseCategories: ["General business license", "Waste disposal questions in some municipalities", "Home service registration if required locally"],
    localAgencyPrompts: ["Do I need any disposal or debris hauling rules for gutter cleanout waste?", "Are there restrictions for ladder-based service work in this city?"],
    commercialAutoNote: "Recommended because ladders and debris gear typically travel to every job.",
    equipmentCoverageNote: "Useful if ladders, blowers, and fall-protection gear are material assets in the business.",
    questionsToAskAgent: ["Is fall-related property damage covered?", "Should ladders and debris equipment be separately scheduled?"],
    starterOffer: "Single-story gutter clean with downspout flush.",
    standardOffer: "Full gutter and downspout clean with bagged debris removal and photo proof.",
    premiumOffer: "Full clean, flush, minor reseal, and gutter guard / maintenance inspection package.",
    addOns: ["Roofline debris blow-off", "Minor reseal", "Downspout unclog", "Gutter guard inspection"],
    recurringOption: "Spring + fall maintenance plan with priority storm-prep scheduling.",
    minimumPriceGuidance: "Use a height- and debris-adjusted minimum so small homes still support travel, ladder setup, and cleanup.",
    sampleUpsells: ["Add roof debris blow-off", "Bundle downspout unclog", "Set seasonal maintenance reminder"],
    pricingNotes: ["Clarify story count, roof pitch, gutter length, and debris severity.", "Spell out whether haul-away and photos are included."],
    bestFirstLeadSources: ["Google Business Profile", "Door hangers in leaf-heavy neighborhoods", "Storm-season reminder campaigns"],
    onlineSources: ["Google Business Profile", "Nextdoor", "Neighborhood Facebook groups", "Local homeowner associations"],
    offlineSources: ["Door hangers", "Mailbox-safe neighborhood flyers where allowed", "Property manager outreach"],
    localOutreachIdeas: ["Target homes with visible overflow or heavy tree cover", "Run storm-prep campaigns after large weather events"],
    referralIdeas: ["Roofers", "Window cleaners", "Pressure washers", "Landscapers"],
    neighborhoodMarketingIdeas: ["Offer same-street pricing windows", "Use fall reminder postcards", "Leave proof photos with a CTA for annual service"],
    socialProofIdeas: ["Overflow-to-clean comparison", "Downspout flush videos", "Review screenshots that mention professionalism and cleanup"],
    beforeAfterContentIdeas: ["Debris removal shots", "Overflow stain cleanup before/after", "Photo proof of downspout flush"],
    googleBusinessProfileGuidance: ["Post before/after roofline and gutter proof.", "Ask customers to mention fall prep, fast response, and clean cleanup."],
    leadResponseProcess: ["Ask home height, tree coverage, and recent overflow symptoms.", "Confirm story count and whether downspouts have known clogs."],
    quotingProcess: ["Quote from photos when possible but confirm access and slope assumptions.", "Use clear exclusions for roof work and repair beyond minor seal tasks."],
    schedulingProcess: ["Cluster by neighborhood during seasonal surges.", "Send prep reminders about pets, gates, and parked cars."],
    jobPrep: ["Inspect ladder points and roof edges.", "Stage debris bags and flush gear.", "Take before photos of clogged sections."],
    completionChecklist: ["Debris removed", "Downspouts flushed", "Walk area cleaned", "Photos saved and sent"],
    invoicing: ["Invoice same day and include photo proof.", "For repeat seasonal customers, book next service before closing the job."],
    reviewRequestProcess: ["Ask once the customer sees the photo proof and cleaned property edges.", "Mention seasonal maintenance value in the ask."],
    followUpProcess: ["Send fall or spring reminder campaigns.", "Follow up on open quotes after forecasted storms."],
    executionFocus: [
      "Build height-based pricing rules, safety standards, and a clean single-story launch offer.",
      "Launch neighborhood campaigns in tree-heavy areas and update Google Business Profile with overflow proof.",
      "Run first estimates, tighten story-count assumptions, and refine photo-based quoting.",
      "Install seasonal reminder follow-up and clean proof-photo delivery after every job.",
      "Add maintenance plan language and small repair or reseal upsells where appropriate.",
      "Document the safety, quoting, and cleanup SOP so the seasonal rush stays controlled."
    ],
    advancedSystems: [
      "Seasonal reminder automation before storm windows",
      "Photo-based quote intake flow",
      "Past-customer reactivation by tree-heavy neighborhood segment"
    ]
  },
  {
    id: "lawn-care-landscaping",
    name: "Lawn Care / Landscaping",
    tags: ["low5k", "low10k", "solo", "outdoor", "mobile", "high", "recurring", "beginner", "seasonal"],
    summary: "A classic recurring local service with route density, easy repeat value, and multiple upsell pathways.",
    teaser: "Recurring weekly revenue, visible transformation, and simple neighborhood marketing.",
    goodFor: ["Operators who like routine route work", "Founders seeking recurring revenue", "People comfortable with outdoor physical work"],
    operatorModel: "Strong solo launch if the offer is focused and route density stays tight.",
    teamModel: "Scales naturally into a small mowing or landscape crew.",
    serviceMode: "Outdoor / mobile",
    difficulty: "Beginner",
    startup_cost_range: "$1,800-$6,500",
    revenue_90_range: "$3,500-$18,000",
    revenue_1yr_range: "$35,000-$120,000",
    margin_range: "35%-55%",
    demandLevel: "High",
    seasonality: "Peak during growing season, with shoulder-season cleanup or light landscape work to extend revenue.",
    recurringRevenuePotential: "High with weekly or biweekly maintenance accounts.",
    recommended_first_offer: "Front-yard mow, edge, and cleanup package",
    whyAttractive: "Recurring service creates route density and predictable weekly revenue once a few good accounts stick.",
    whyPeopleStartIt: "The model is familiar, customers understand the value quickly, and neighborhood clustering works well.",
    pros: ["Recurring revenue", "Easy local proof", "Simple route density", "Natural upsell path"],
    cons: ["Equipment upkeep", "Seasonality", "Pricing discipline matters on small properties"],
    bestFitOperatorType: "A dependable operator who likes routine, route planning, and repeat customer relationships.",
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
    tools: ["Commercial mower or push mower", "String trimmer", "Blower", "Safety glasses + gloves", "Gas cans", "Lawn bags", "Basic trailer", "Measuring wheel"],
    equipment: ["Mower", "Trimmer", "Blower", "Fuel setup", "Trailer or carrier", "Basic hand tools"],
    vehicleNeeds: ["Truck, SUV, or trailer setup that can safely haul mower and yard gear", "Route-friendly storage for consumables and cleanup bags"],
    requiredItems: ["Mower", "Trimmer", "Blower", "Insurance", "Phone and CRM"],
    optionalItems: ["Commercial zero-turn", "Mulch bed tools", "Edger attachment", "Route-optimized trailer racks"],
    softwareNotes: {
      Scheduling: "Recurring route clients need tight scheduling windows and simple reschedule communication.",
      CRM: "Track cut frequency, gate codes, pet notes, and upsell opportunities in the lead record."
    },
    commonLicenseCategories: ["General business license", "Landscape contractor registration in some states", "Pesticide or fertilizer rules if you add treatment services"],
    localAgencyPrompts: ["Do I need a separate license if I offer planting, hardscape, or chemical treatment work?", "Are there noise-hour restrictions for mowing routes?"],
    commercialAutoNote: "Recommended once a truck or trailer is used regularly for route work.",
    equipmentCoverageNote: "Important if the mower, trimmer, and trailer are core revenue assets.",
    questionsToAskAgent: ["How should I cover the mower and trailer setup?", "Does liability cover property damage from thrown debris or irrigation impacts?"],
    starterOffer: "Front-yard mow, edge, and cleanup.",
    standardOffer: "Full mow, edge, blow with weed spot treatment and trim detail.",
    premiumOffer: "Weekly premium maintenance with mow, edge, cleanup, shrub touch-up, and seasonal visit notes.",
    addOns: ["Bush trimming", "Mulch refresh", "Leaf cleanup", "Seasonal property reset"],
    recurringOption: "Weekly or biweekly recurring maintenance plan.",
    minimumPriceGuidance: "Do not price below the level needed to cover drive time, unload/load time, and route gaps.",
    sampleUpsells: ["Add shrub trimming", "Upgrade to recurring schedule", "Bundle seasonal cleanup"],
    pricingNotes: ["Price by property size, terrain, gate access, and service frequency.", "Recurring clients should price differently than one-off cleanups."],
    bestFirstLeadSources: ["Google Business Profile", "Neighbor referrals", "Route-density flyer drops"],
    onlineSources: ["Google Business Profile", "Neighborhood Facebook groups", "Local homeowner forums"],
    offlineSources: ["Door hangers", "Truck signage", "Yard signs during service", "HOA or property manager outreach"],
    localOutreachIdeas: ["Market on the same street while servicing a property", "Offer same-day estimates in one subdivision"],
    referralIdeas: ["Realtors", "Pool cleaners", "Pressure washers", "Property managers"],
    neighborhoodMarketingIdeas: ["Same-street recurring pricing", "Lawn-health reminder cards", "Leaf cleanup campaign by subdivision"],
    socialProofIdeas: ["Striping photos", "Edge detail closeups", "Review snippets about reliability and consistency"],
    beforeAfterContentIdeas: ["Overgrown-to-clean transformation", "Edge detail comparison", "Seasonal cleanup reels"],
    googleBusinessProfileGuidance: ["Ask reviews to mention reliability, cleanup quality, and recurring service.", "Use service-area and lawn maintenance keywords in posts."],
    leadResponseProcess: ["Ask lot size, service frequency, and whether the property is maintained or overgrown.", "Log gate codes, pets, irrigation notes, and preferred visit day."],
    quotingProcess: ["Use route-aware pricing rather than generic square-foot assumptions.", "Clarify what is included in mowing vs cleanup vs shrub work."],
    schedulingProcess: ["Build recurring route days by neighborhood.", "Use weather-adjusted communication when the schedule shifts."],
    jobPrep: ["Check mower blades, fuel, and route order.", "Review notes on gates, pets, and wet ground conditions."],
    completionChecklist: ["Clean edge lines", "Clippings cleared", "Gate reset", "Photos or notes logged if needed"],
    invoicing: ["Invoice recurring accounts on a predictable cadence.", "Use autopay or card-on-file where possible."],
    reviewRequestProcess: ["Ask once the lawn has visibly improved and reliability is established.", "For recurring clients, ask after the third successful visit."],
    followUpProcess: ["Send seasonal cleanup or mulch upsell reminders.", "Reactivate paused clients before the next growth season."],
    executionFocus: [
      "Define service boundaries, route radius, and the recurring maintenance offer.",
      "Launch neighborhood outreach and Google Business Profile proof with one route-density target area.",
      "Run first estimates and tighten minimum pricing around travel and unload time.",
      "Install recurring billing and a repeatable review request workflow.",
      "Add shrub, cleanup, and seasonal upsells to the route while protecting margin.",
      "Document route operations, service notes, and billing SOPs so recurring work stays smooth."
    ],
    advancedSystems: [
      "Recurring route automation with weather-trigger messaging",
      "Past-customer seasonal upsell campaigns",
      "Lead routing by neighborhood density"
    ]
  },
  {
    id: "residential-cleaning",
    name: "Residential Cleaning",
    tags: ["low2k", "low5k", "low10k", "solo", "indoor", "mobile", "high", "beginner", "recurring"],
    summary: "A service business with strong repeat potential, straightforward offers, and fast word-of-mouth upside when quality is consistent.",
    teaser: "Repeat clients, referral potential, and relatively low startup complexity for a solo operator.",
    goodFor: ["Detail-oriented founders", "Operators who prefer indoor work", "People who want recurring household relationships"],
    operatorModel: "Excellent solo launch with focused offer design and clean SOPs.",
    teamModel: "Scales into a small recurring cleaning team as capacity fills.",
    serviceMode: "Indoor / mobile",
    difficulty: "Beginner",
    startup_cost_range: "$900-$3,000",
    revenue_90_range: "$3,000-$15,000",
    revenue_1yr_range: "$30,000-$90,000",
    margin_range: "35%-55%",
    demandLevel: "High",
    seasonality: "Fairly stable year-round with spring-cleaning and holiday-prep spikes.",
    recurringRevenuePotential: "High with weekly, biweekly, or monthly maintenance cleans.",
    recommended_first_offer: "3-hour deep clean for kitchen + bathrooms",
    whyAttractive: "Recurring household cleaning compounds well when trust is earned and service quality is reliable.",
    whyPeopleStartIt: "The launch can be lean, early referrals are strong, and recurring schedules make revenue more predictable.",
    pros: ["Repeat revenue", "Low startup complexity", "Strong referral loops", "Indoor service stability"],
    cons: ["Quality control must stay high", "Physical work can be repetitive", "Trust and professionalism matter heavily"],
    bestFitOperatorType: "A detail-driven operator who values consistency, trust, and clean repeat systems.",
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
    tools: ["Vacuum", "Microfiber cloths", "Mop + bucket", "Scrub brushes", "All-purpose cleaner", "Glass cleaner", "Protective gloves", "Car caddy organizer"],
    equipment: ["Vacuum", "Cleaning caddy", "Mop and buckets", "Brush set", "Reusable towels", "Supply storage bins"],
    vehicleNeeds: ["Reliable car or SUV for carrying cleaning bins, vacuum, and linens", "Organized tote storage to avoid job delays"],
    requiredItems: ["Vacuum", "Cleaning supply kit", "Insurance", "Phone and CRM", "Checklist and quote template"],
    optionalItems: ["Steam cleaner", "Portable carpet spot cleaner", "Branded aprons", "Laundry turnover kit"],
    softwareNotes: {
      "Review management": "Recurring clients are a strong source of reviews once the service quality is proven.",
      Scheduling: "Recurring cadence and lockout-time scheduling are critical for residential cleaning."
    },
    commonLicenseCategories: ["General business license", "Home-service registration", "Sales tax questions if selling add-on products"],
    localAgencyPrompts: ["Do I need a local business license or home occupation permit for residential cleaning services?", "Are there any rules around disposal of chemicals or janitorial products?"],
    commercialAutoNote: "Usually not mandatory at launch, but ask if the vehicle is used daily for business and supplies.",
    equipmentCoverageNote: "Optional early, but ask if equipment loss would disrupt service delivery materially.",
    questionsToAskAgent: ["Does the liability policy cover accidental breakage inside the home?", "Is key custody or property access covered under the policy?"],
    starterOffer: "Kitchen + bathroom deep clean up to three labor hours.",
    standardOffer: "Whole-home standard clean with kitchen, bathrooms, dusting, floors, and reset detail.",
    premiumOffer: "Deep clean or move-in/move-out package with appliance fronts, baseboards, detail wipe-down, and full reset.",
    addOns: ["Inside fridge", "Inside oven", "Laundry fold", "Bed change", "Move-in supply reset"],
    recurringOption: "Weekly, biweekly, or monthly recurring maintenance clean.",
    minimumPriceGuidance: "Use a minimum based on labor hours, travel, and supply usage rather than competing on flat low prices.",
    sampleUpsells: ["Add oven clean", "Upgrade to deep clean", "Set recurring biweekly schedule"],
    pricingNotes: ["Price by condition, size, and frequency rather than only bedroom count.", "Clarify what is not included in a standard clean."],
    bestFirstLeadSources: ["Google Business Profile", "Referral asks", "Local mom groups and neighborhood communities"],
    onlineSources: ["Google Business Profile", "Neighborhood Facebook groups", "Nextdoor", "Apartment / relocation communities"],
    offlineSources: ["Flyers in local businesses where permitted", "Realtor partnerships", "Property manager introductions"],
    localOutreachIdeas: ["Offer a first-clean package in one target ZIP code", "Use before/after detail proof with a recurring option CTA"],
    referralIdeas: ["Realtors", "Organizers", "Pet sitters", "Nannies", "Property managers"],
    neighborhoodMarketingIdeas: ["Same-building or same-street recurring specials", "Holiday-prep and spring-clean reminders"],
    socialProofIdeas: ["Organized-space after shots", "Review snippets about trust and reliability", "Short clips of detail zones"],
    beforeAfterContentIdeas: ["Sink and countertop transformations", "Bathroom refresh comparison", "Move-in reset sequence"],
    googleBusinessProfileGuidance: ["Encourage reviews that mention trust, punctuality, and detail quality.", "Post recurring-clean and deep-clean proof photos consistently."],
    leadResponseProcess: ["Ask home size, current condition, pets, and whether the need is standard or deep cleaning.", "Confirm frequency and access expectations on the first call."],
    quotingProcess: ["Quote based on labor estimate, condition, and add-ons.", "Send written scope with included rooms and exclusions."],
    schedulingProcess: ["Use recurring schedule blocks for repeat clients.", "Send prep reminders about clutter, pets, and access instructions."],
    jobPrep: ["Review scope and add-ons.", "Stage supplies by room order.", "Log any fragile areas or access notes."],
    completionChecklist: ["All scoped rooms complete", "Trash and linens handled per agreement", "Photos and notes logged", "Lock-up confirmed"],
    invoicing: ["Invoice immediately after the clean or run card-on-file for recurring customers.", "Keep add-ons itemized."],
    reviewRequestProcess: ["Ask after the second successful recurring clean or right after a strong deep-clean result.", "Use a short trust-oriented review request."],
    followUpProcess: ["Send recurring cadence reminders and dormant-customer reactivation messages.", "Offer seasonal deep-clean add-ons to recurring clients."],
    executionFocus: [
      "Lock the standard, deep-clean, and recurring offer structure with clear scope.",
      "Launch referral asks and Google Business Profile while targeting one local ZIP code.",
      "Run first quotes and tighten labor-based pricing assumptions.",
      "Install checklists, review requests, and recurring billing habits.",
      "Build recurring slots and upsell deep-clean or move-in packages where appropriate.",
      "Document room-by-room SOPs so quality stays consistent as volume grows."
    ],
    advancedSystems: [
      "Recurring schedule automation with reminder flows",
      "Move-in / move-out quote intake sequence",
      "Dormant-customer reactivation campaigns"
    ]
  },
  {
    id: "commercial-cleaning",
    name: "Commercial Cleaning",
    tags: ["low5k", "low10k", "crew", "indoor", "high", "recurring"],
    summary: "A contract-driven cleaning business that can build stable recurring revenue through offices, suites, and smaller facilities.",
    teaser: "Recurring contracts, stronger account value, and routeable evening or daytime service blocks.",
    goodFor: ["Operators who want B2B recurring contracts", "Founders comfortable with proposals and account management", "Teams that can deliver consistent SOP-driven work"],
    operatorModel: "Can start lean, but account delivery often benefits from at least one helper quickly.",
    teamModel: "Naturally crew-based as recurring contracts accumulate.",
    serviceMode: "Indoor / on-site commercial",
    difficulty: "Moderate",
    startup_cost_range: "$1,500-$6,000",
    revenue_90_range: "$4,000-$25,000",
    revenue_1yr_range: "$50,000-$200,000",
    margin_range: "25%-45%",
    demandLevel: "High",
    seasonality: "Generally stable year-round with lower seasonality than residential services.",
    recurringRevenuePotential: "High because the model is built around recurring contracts.",
    recommended_first_offer: "Nightly office cleaning trial (2 visits)",
    whyAttractive: "Recurring contract value can be meaningful, and a few solid accounts can stabilize the business quickly.",
    whyPeopleStartIt: "The model supports recurring revenue, clearer scheduling blocks, and more predictable account planning.",
    pros: ["Recurring contract revenue", "Less seasonal", "Clear SOP-driven work", "Commercial referrals can compound"],
    cons: ["Longer sales cycles", "Proposal discipline required", "Labor management can get complex"],
    bestFitOperatorType: "A disciplined founder who can sell, manage scopes, and enforce consistent delivery standards.",
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
    tools: ["Commercial vacuum", "Mop system", "Janitorial cart", "Disinfectants", "Trash liners", "Gloves and PPE", "Checklist forms", "Floor machine rental option"],
    equipment: ["Commercial vacuum", "Janitorial cart", "Mop and bucket system", "Disinfecting kit", "Microfiber system"],
    vehicleNeeds: ["Car, van, or small commercial vehicle for moving supplies between accounts", "Secure storage for chemicals and PPE"],
    requiredItems: ["Commercial vacuum", "Insurance", "Proposal template", "Phone and CRM", "Account checklist"],
    optionalItems: ["Floor machine", "Auto-scrubber rental", "Team messaging software", "Key management lockbox"],
    softwareNotes: {
      CRM: "Track proposal stage, scope notes, site contact, and cleaning frequency for each account.",
      "Team communication": "Useful early if you have even one helper or recurring site instructions to maintain."
    },
    commonLicenseCategories: ["General business license", "Janitorial registration where required", "Sales tax questions for supply resale or consumables if applicable"],
    localAgencyPrompts: ["Are there janitorial or commercial cleaning registration requirements for B2B accounts in this city?", "Do I need any special handling guidance for disinfectants or waste disposal?"],
    commercialAutoNote: "Recommended if supplies or employees move regularly between accounts in a business vehicle.",
    equipmentCoverageNote: "Worth asking about once multiple vacuums, carts, and commercial-grade equipment are in rotation.",
    questionsToAskAgent: ["Does the policy cover after-hours commercial sites and key access?", "Should I add employee dishonesty or bonding options for commercial accounts?"],
    starterOffer: "Two-visit office cleaning trial for a small suite or office.",
    standardOffer: "Recurring office cleaning with trash, restrooms, surfaces, and floor care.",
    premiumOffer: "Recurring service plus periodic deep detail, consumable restock, and inspection reporting.",
    addOns: ["Floor treatment", "Restock supplies", "Day porter support", "Window touch-up"],
    recurringOption: "Nightly, weekly, or multi-visit recurring janitorial contract.",
    minimumPriceGuidance: "Do not chase low-margin accounts; price for labor, travel, supervision, and consumables.",
    sampleUpsells: ["Add restroom consumables", "Add floor care", "Upgrade to deeper monthly detail"],
    pricingNotes: ["Scope clarity matters more than price bravado.", "Spell out frequency, exclusions, and quality checks in the proposal."],
    bestFirstLeadSources: ["Property managers", "Office suites", "Medical or professional offices where allowed", "Local networking groups"],
    onlineSources: ["Google Business Profile", "Local commercial directories", "LinkedIn outreach to office managers"],
    offlineSources: ["Direct office outreach", "Property manager visits", "Networking breakfasts or BNI-style groups"],
    localOutreachIdeas: ["Offer a short trial clean to a small office", "Approach buildings where the current cleaning standard looks weak"],
    referralIdeas: ["Property managers", "Commercial realtors", "Office furniture vendors", "Flooring contractors"],
    neighborhoodMarketingIdeas: ["Target office parks and professional suites rather than residential streets", "Use account case studies and cleanliness audit angles"],
    socialProofIdeas: ["Professional before/after zone photos", "Review snippets about reliability and trust", "Short walkthrough videos of clean common areas"],
    beforeAfterContentIdeas: ["Break room reset", "Restroom detail clean", "Floor treatment improvement"],
    googleBusinessProfileGuidance: ["Use janitorial, office cleaning, and recurring contract keywords.", "Ask clients to mention reliability and professionalism rather than only price."],
    leadResponseProcess: ["Ask square footage, frequency, access times, and cleaning pain points.", "Log decision-maker name and proposal timing."],
    quotingProcess: ["Perform or request a walkthrough before final pricing.", "Define scope by area, frequency, and consumables in the proposal."],
    schedulingProcess: ["Build service windows around client access and alarm protocols.", "Use recurring site instructions and site-contact notes."],
    jobPrep: ["Stage consumables and PPE.", "Review site instructions, codes, and alarm notes.", "Assign room-by-room checklist."],
    completionChecklist: ["Trash completed", "Restrooms reset", "Touchpoints disinfected", "Site secured", "Supervisor notes logged"],
    invoicing: ["Invoice on agreed contract terms and track aging closely.", "Use autopay or ACH where possible for recurring accounts."],
    reviewRequestProcess: ["Ask once the account is stable and trust is built, usually after the first month.", "Use a professional tone focused on reliability and results."],
    followUpProcess: ["Run monthly account check-ins and scope review.", "Re-open older proposals with a short audit-based follow-up."],
    executionFocus: [
      "Finalize trial-clean offer, proposal template, and after-hours site checklist.",
      "Run commercial outreach to small offices and property managers with a trial-clean CTA.",
      "Walk your first sites and tighten labor assumptions around frequency and scope.",
      "Install QA checklists, account notes, and recurring billing standards.",
      "Add floor-care or restock upsells to strong accounts while protecting labor margin.",
      "Document site onboarding and quality control SOPs for repeatable team delivery."
    ],
    advancedSystems: [
      "Recurring account QA reporting",
      "After-hours site onboarding automation",
      "Contract renewal and upsell workflows"
    ]
  },
  {
    id: "junk-removal",
    name: "Junk Removal",
    tags: ["low10k", "crew", "outdoor", "mobile", "high"],
    summary: "A higher-ticket hauling business with strong local demand, rapid close cycles, and large same-day revenue opportunities.",
    teaser: "Higher average tickets, simple customer pain, and fast response value for clutter and property cleanup.",
    goodFor: ["Operators with access to a truck or trailer", "Founders who can manage logistics and dump economics", "People comfortable with physical outdoor work"],
    operatorModel: "Can launch solo on small loads but often benefits from a helper quickly.",
    teamModel: "Strong fit for a 2-person field crew as load size grows.",
    serviceMode: "Outdoor / mobile",
    difficulty: "Moderate",
    startup_cost_range: "$4,000-$15,000",
    revenue_90_range: "$6,000-$30,000",
    revenue_1yr_range: "$70,000-$220,000",
    margin_range: "30%-50%",
    demandLevel: "High",
    seasonality: "Fairly steady with peaks around moving season, estate cleanouts, and renovation cycles.",
    recurringRevenuePotential: "Moderate through property managers, realtors, and contractor partnerships.",
    recommended_first_offer: "1/8 truck-load pickup special",
    whyAttractive: "Average tickets can be large, and a responsive same-day offer converts well when customers need clutter gone fast.",
    whyPeopleStartIt: "It solves urgent problems and can generate meaningful cash flow quickly with the right routing and disposal discipline.",
    pros: ["Higher ticket sizes", "Simple problem/solution pitch", "Good partner channel upside", "Fast close cycle"],
    cons: ["Disposal costs matter", "Vehicle wear and tear", "Physical labor is heavy"],
    bestFitOperatorType: "A decisive operator who likes logistics, field work, and fast-response local sales.",
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
    tools: ["Pickup truck or trailer", "Heavy-duty gloves", "Ratchet straps", "Appliance dolly", "Tarps", "Safety vest", "Dump fee budget", "Quote-by-volume chart"],
    equipment: ["Truck or trailer", "Dollies", "Straps", "Tarps", "PPE", "Load-out tools"],
    vehicleNeeds: ["Truck, dump trailer, or strong hauling setup", "Secure tie-down system and dump or disposal plan"],
    requiredItems: ["Hauling vehicle", "Insurance", "Load chart", "Quote script", "Payment collection setup"],
    optionalItems: ["Dump trailer upgrade", "Additional helper labor", "Storage unit for reusable items", "Donation workflow"],
    softwareNotes: {
      CRM: "Track photo-based quotes, load size, dump notes, and property access details.",
      "Estimates / proposals": "A clear load-size chart speeds quoting and keeps pricing discipline tight."
    },
    commonLicenseCategories: ["General business license", "Hauling or waste transport questions", "Local disposal or dump regulations", "Contractor registration if demolition expands"],
    localAgencyPrompts: ["Do I need a hauling or waste transporter registration for junk removal in this county?", "Are there disposal or recycling rules for appliances, electronics, or construction debris?"],
    commercialAutoNote: "Strongly recommended because the vehicle is central to service delivery.",
    equipmentCoverageNote: "Ask about tool coverage, trailer coverage, and physical damage protection for hauling gear.",
    questionsToAskAgent: ["Are loading-related property damage claims covered?", "How should I insure the trailer and hauling equipment setup?"],
    starterOffer: "1/8 truck-load curbside pickup special.",
    standardOffer: "Full-service in-home pickup by volume with labor and sweep-up included.",
    premiumOffer: "Full cleanout package with labor, donation sorting, heavy-item handling, and final photo proof.",
    addOns: ["Appliance haul", "Hot tub removal coordination", "Shed demo referral", "Donation sorting"],
    recurringOption: "Monthly property manager, realtor, or contractor cleanup account.",
    minimumPriceGuidance: "Never ignore dump fees, labor intensity, stairs, or heavy-item handling when setting the minimum.",
    sampleUpsells: ["Upgrade curbside to full-service load-out", "Add garage cleanout", "Bundle appliance removal"],
    pricingNotes: ["Use a clear volume chart and separate out heavy or specialty items.", "Clarify disposal surcharges for mattresses, appliances, tires, or electronics."],
    bestFirstLeadSources: ["Google Business Profile", "Realtors", "Property managers", "Moving-related referrals"],
    onlineSources: ["Google Business Profile", "Facebook Marketplace cleanout posts", "Local homeowner groups", "Realtor networks"],
    offlineSources: ["Truck signage", "Realtor visits", "Property manager outreach", "Door hangers after neighborhood cleanouts"],
    localOutreachIdeas: ["Target neighborhoods during moving season", "Offer same-day curbside pickup windows", "Approach contractors who need debris help"],
    referralIdeas: ["Realtors", "Property managers", "Movers", "Painters", "Handymen"],
    neighborhoodMarketingIdeas: ["Weekend cleanout specials", "Garage purge campaigns", "Move-out cleanup route offers"],
    socialProofIdeas: ["Load-out time-lapse", "Garage reclaim before/after", "Review snippets about responsiveness"],
    beforeAfterContentIdeas: ["Garage cleanout before/after", "Yard debris removal", "Estate cleanout transformation"],
    googleBusinessProfileGuidance: ["Use keywords tied to junk pickup, cleanouts, appliance removal, and same-day service.", "Post transformation photos and team professionalism proof."],
    leadResponseProcess: ["Request photos first and identify stairs, heavy items, or access constraints.", "Clarify whether the job is curbside, garage, in-home, or full cleanout."],
    quotingProcess: ["Use photo-first volume estimates whenever possible.", "List surcharges for heavy items and specialty disposal clearly."],
    schedulingProcess: ["Batch jobs by dump route and neighborhood.", "Confirm access, parking, and which items are approved before dispatch."],
    jobPrep: ["Review load chart and dump notes.", "Stage dollies, straps, and PPE.", "Confirm labor help if the load is heavy or stair-intensive."],
    completionChecklist: ["Area swept", "Approved items removed", "Photos logged", "Final volume confirmed", "Invoice sent"],
    invoicing: ["Collect at completion or deposit before dispatch for larger cleanouts.", "Track dump fee impact by job type."],
    reviewRequestProcess: ["Ask once the space is visibly reclaimed and the customer feels relief from the problem.", "Use language around responsiveness and professionalism."],
    followUpProcess: ["Send reminder offers to realtors and property managers.", "Re-open older quotes if the property is still active."],
    executionFocus: [
      "Finalize volume-based pricing, dump-fee rules, and a clear starter pickup offer.",
      "Launch fast-response local marketing and partner outreach to realtors and property managers.",
      "Refine photo-based quoting and heavy-item surcharge rules after the first jobs.",
      "Install completion cleanup, invoice collection, and review request standards.",
      "Build recurring partner channels and tighten route-plus-dump efficiency.",
      "Document load-out, disposal, and customer communication SOPs to protect margin."
    ],
    advancedSystems: [
      "Photo-to-quote intake automation",
      "Partner referral follow-up sequences",
      "Dump-fee tracking and job profitability workflow"
    ]
  },
  {
    id: "mobile-car-detailing",
    name: "Mobile Car Detailing",
    tags: ["low2k", "low5k", "low10k", "solo", "mobile", "outdoor", "high", "beginner", "recurring"],
    summary: "A visual mobile service with lifestyle-friendly branding, routeable appointments, and simple package-based selling.",
    teaser: "Strong before/after proof, easy social content, and upsell-friendly package design.",
    goodFor: ["Founders who like customer-facing service", "Operators comfortable with mobile field work", "People who want strong social proof and add-on sales"],
    operatorModel: "Launches well as a solo owner-operator business.",
    teamModel: "Can scale into a small route crew or add second-vehicle capacity.",
    serviceMode: "Mobile / outdoor",
    difficulty: "Beginner",
    startup_cost_range: "$1,200-$5,000",
    revenue_90_range: "$4,000-$20,000",
    revenue_1yr_range: "$45,000-$140,000",
    margin_range: "40%-65%",
    demandLevel: "High",
    seasonality: "Strong in warm months but can run year-round with garage access or climate-friendly markets.",
    recurringRevenuePotential: "High through maintenance detail plans and fleet accounts.",
    recommended_first_offer: "Exterior wash + interior reset package",
    whyAttractive: "Packages are easy to present, and before/after proof converts well online and in-person.",
    whyPeopleStartIt: "A solo operator can launch lean, create strong content quickly, and grow through maintenance plans.",
    pros: ["Strong visual proof", "Upsell-friendly", "Routeable work", "Good repeat potential"],
    cons: ["Weather sensitive", "Setup time matters", "Water/power access needs planning"],
    bestFitOperatorType: "A polished operator who values customer experience, presentation, and repeat maintenance revenue.",
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
    tools: ["Shop vacuum", "Dual-action polisher", "Microfiber towels", "Buckets and grit guards", "Foam cannon", "Interior brushes", "Water tank optional", "Portable canopy"],
    equipment: ["Vacuum", "Wash setup", "Towel system", "Interior brush kit", "Polisher", "Chemical loadout"],
    vehicleNeeds: ["Car, SUV, van, or trailer setup that can carry water, chemicals, and tools cleanly", "Shade or canopy option helps in the field"],
    requiredItems: ["Wash kit", "Vacuum", "Interior reset tools", "Insurance", "Phone and CRM"],
    optionalItems: ["Water tank", "Extractor", "Paint correction add-ons", "Fleet service setup"],
    softwareNotes: {
      Scheduling: "Cluster mobile jobs by neighborhood and account for setup breakdown time in the calendar."
    },
    commonLicenseCategories: ["General business license", "Water runoff or environmental questions in some municipalities", "Fleet or commercial lot permissions if serving on-site lots"],
    localAgencyPrompts: ["Are there runoff restrictions for mobile detailing in this city?", "Can I perform mobile detailing in public parking lots or are there location restrictions?"],
    commercialAutoNote: "Recommended if the vehicle carries business equipment daily and functions as a mobile shop.",
    equipmentCoverageNote: "Useful if you carry polishing gear, extractors, canopy setups, or water tank equipment.",
    questionsToAskAgent: ["Does the policy cover accidental interior damage or overspray issues?", "How should I cover a mobile equipment setup carried in the vehicle?"],
    starterOffer: "Exterior wash + interior reset package.",
    standardOffer: "Full interior/exterior detail with trim, tire, and touchpoint treatment.",
    premiumOffer: "Premium detail with polish enhancement, stain treatment, and interior restoration touches.",
    addOns: ["Odor treatment", "Pet hair removal", "Engine bay detail", "Headlight restore"],
    recurringOption: "Monthly or quarterly maintenance detail plan for individuals or fleets.",
    minimumPriceGuidance: "Set a minimum that covers travel, setup, and drying time before you account for detailing labor.",
    sampleUpsells: ["Add pet hair removal", "Upgrade to monthly maintenance", "Add headlight restoration"],
    pricingNotes: ["Price around condition, vehicle size, and labor intensity rather than just package names.", "Make stain, paint correction, and heavy pet hair separate upsells."],
    bestFirstLeadSources: ["Google Business Profile", "Instagram or Facebook proof posts", "Office park or fleet outreach"],
    onlineSources: ["Google Business Profile", "Instagram reels", "Facebook before/after posts", "Local enthusiast groups"],
    offlineSources: ["Office parking lot outreach where allowed", "Flyers for apartment or HOA communities", "Fleet or small business visits"],
    localOutreachIdeas: ["Offer mobile convenience to busy professionals", "Target apartment complexes and office parks", "Run same-day route specials by neighborhood"],
    referralIdeas: ["Tint shops", "Mechanics", "Car wash staff", "Real estate agents", "Fleet managers"],
    neighborhoodMarketingIdeas: ["Weekend detail route signups", "Neighborhood wash day", "Multi-car household bundle pricing"],
    socialProofIdeas: ["Interior reset reels", "Seat and console before/after", "Review snippets about convenience and finish"],
    beforeAfterContentIdeas: ["Interior cleanup carousel", "Wheel and trim restore shots", "Paint gloss comparison"],
    googleBusinessProfileGuidance: ["Use keywords around mobile detailing, interior detail, and convenience.", "Ask reviews to mention convenience, punctuality, and result quality."],
    leadResponseProcess: ["Ask vehicle size, condition, location, and whether shade/water/power are available.", "Tag maintenance vs one-time detail jobs for different offers."],
    quotingProcess: ["Use condition-based estimates and clarify add-on triggers.", "Send service tiers with expected duration and exclusions."],
    schedulingProcess: ["Block setup and drive time between jobs.", "Confirm parking and weather backup plan before arrival."],
    jobPrep: ["Review package, add-ons, and condition notes.", "Stage towels and chemicals by workflow.", "Take intake photos before starting."],
    completionChecklist: ["Exterior and interior final pass", "Customer walkthrough", "Before/after photos logged", "Invoice and review ask sent"],
    invoicing: ["Invoice on completion and offer maintenance plan enrollment at checkout.", "Use deposits for premium multi-hour jobs if needed."],
    reviewRequestProcess: ["Ask right after the customer sees the finished interior and exterior.", "Mention convenience and professionalism in the ask."],
    followUpProcess: ["Send maintenance reminder at the next recommended interval.", "Follow up on premium package quotes with before/after proof."],
    executionFocus: [
      "Finalize your three package structure, add-ons, and setup checklist.",
      "Launch proof-driven content and map a small mobile service radius.",
      "Run first bookings and tighten condition-based pricing and timing assumptions.",
      "Install a maintenance plan pitch and review request at every closeout.",
      "Build route density and fleet / office-park outreach where convenient access exists.",
      "Document intake, staging, and quality-control SOPs so the experience feels premium every time."
    ],
    advancedSystems: [
      "Maintenance-plan reminder automation",
      "Fleet and multi-vehicle follow-up campaigns",
      "Photo-based upsell workflow after intake"
    ]
  },
  {
    id: "handyman-services",
    name: "Handyman Services",
    tags: ["low5k", "low10k", "solo", "indoor", "outdoor", "mobile", "high"],
    summary: "A broad local service business with strong homeowner demand, high trust requirements, and flexible job mix options.",
    teaser: "Wide problem set, strong referral upside, and room to grow into premium home-service relationships.",
    goodFor: ["Skilled generalists", "Operators comfortable in homes", "Founders who want flexible job mix and upsells"],
    operatorModel: "Often launches solo with a tightly defined job list.",
    teamModel: "Can scale with helpers or specialists as demand expands.",
    serviceMode: "Indoor / outdoor / mobile",
    difficulty: "Moderate",
    startup_cost_range: "$2,000-$8,000",
    revenue_90_range: "$5,000-$25,000",
    revenue_1yr_range: "$60,000-$180,000",
    margin_range: "30%-50%",
    demandLevel: "High",
    seasonality: "Generally steady year-round with seasonal spikes around moving, punch-list, and holiday prep work.",
    recurringRevenuePotential: "Moderate through maintenance plans, punch-list programs, and property managers.",
    recommended_first_offer: "Half-day fix-it bundle (3 small tasks)",
    whyAttractive: "Demand is broad, referrals are strong, and a tightly defined starter offer can convert quickly.",
    whyPeopleStartIt: "Skilled operators can monetize existing trade confidence without committing to one narrow specialty at launch.",
    pros: ["Broad demand", "High referral value", "Flexible upsells", "Can price for expertise"],
    cons: ["Scope creep risk", "Licensing rules vary by job type", "Trust and communication matter heavily"],
    bestFitOperatorType: "A reliable operator who communicates clearly, scopes work well, and values craftsmanship.",
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
    tools: ["Drill/driver set", "Saw options", "Stud finder", "Socket set", "Step ladder", "Drop cloths", "PPE", "Consumables kit"],
    equipment: ["Core hand and power tools", "Ladder set", "Consumables bins", "Measurement kit", "Vehicle shelving"],
    vehicleNeeds: ["Van, truck, or organized SUV with clean tool storage", "Lockable storage for tools and materials"],
    requiredItems: ["Core tool set", "Insurance", "Scope checklist", "Phone and CRM", "Invoice and quote templates"],
    optionalItems: ["Finish nailer", "Tile or trim specialty tools", "More advanced saw systems", "Helper scheduling setup"],
    softwareNotes: {
      "Notes / docs": "Detailed scope notes matter because handyman jobs often vary and rely on good documentation."
    },
    commonLicenseCategories: ["General business license", "Contractor or specialty trade rules depending on task type", "Permit questions for electrical, plumbing, or structural work"],
    localAgencyPrompts: ["Which handyman tasks are allowed without a trade license in my state?", "At what point does this work require a contractor or permit?"],
    commercialAutoNote: "Recommended once tools and materials are regularly transported for jobs.",
    equipmentCoverageNote: "Important if a large portion of your value sits in portable tools and vehicle storage.",
    questionsToAskAgent: ["Are accidental installation errors and resulting property damage covered?", "Should portable power tools be scheduled under inland marine or tool coverage?"],
    starterOffer: "Half-day fix-it bundle covering up to three small tasks.",
    standardOffer: "Single-day punch-list visit with prioritized repairs and install work.",
    premiumOffer: "Full-day premium service block with planning, sourcing coordination, and detailed finish work.",
    addOns: ["Fixture install", "TV mounting", "Caulking and patching", "Material pickup"],
    recurringOption: "Quarterly home maintenance or landlord punch-list service.",
    minimumPriceGuidance: "Use a minimum that reflects travel, tool setup, sourcing time, and scope uncertainty.",
    sampleUpsells: ["Upgrade to half-day block", "Add material pickup", "Book quarterly maintenance visit"],
    pricingNotes: ["Scope clarity matters more than being the cheapest.", "Exclude licensed electrical, plumbing, or structural work unless properly authorized."],
    bestFirstLeadSources: ["Google Business Profile", "Realtors", "Property managers", "Neighborhood referrals"],
    onlineSources: ["Google Business Profile", "Facebook neighborhood groups", "Nextdoor", "Local homeowner forums"],
    offlineSources: ["Realtor outreach", "Property manager outreach", "Truck signage", "Leave-behind service menu cards"],
    localOutreachIdeas: ["Offer a new-homeowner punch-list bundle", "Market landlord turn and move-in fix-it packages"],
    referralIdeas: ["Realtors", "Movers", "Painters", "Cleaners", "Property managers"],
    neighborhoodMarketingIdeas: ["Seasonal home reset checklist", "Holiday prep task bundle", "Storm-repair follow-up offers"],
    socialProofIdeas: ["Before/after repair shots", "Review snippets about reliability and craftsmanship", "Short clips of small repairs completed fast"],
    beforeAfterContentIdeas: ["Drywall patch and paint touch-up", "Fixture install", "Cabinet hardware refresh"],
    googleBusinessProfileGuidance: ["Use keywords around home repair, punch-list, fixture install, and assembly.", "Ask reviews to mention trust, communication, and workmanship."],
    leadResponseProcess: ["Ask for photos and exact task list before quoting.", "Identify any tasks that may trigger trade-license rules before accepting the work."],
    quotingProcess: ["Scope jobs tightly and separate unknowns or material costs.", "Use day-block pricing or clearly itemized small-task bundles."],
    schedulingProcess: ["Group jobs by area and task type to keep tool loadouts efficient.", "Confirm material readiness before arriving."],
    jobPrep: ["Review task order and tool loadout.", "Protect work areas with drop cloths.", "Confirm any homeowner-supplied materials."],
    completionChecklist: ["Each scoped task complete", "Work area cleaned", "Photos or notes logged", "Future issues documented for customer"],
    invoicing: ["Invoice on completion with itemized tasks.", "Track material reimbursement separately from labor."],
    reviewRequestProcess: ["Ask after a clean, trust-building job that solved multiple headaches.", "Encourage mentions of reliability and quality."],
    followUpProcess: ["Re-open deferred tasks after the first visit.", "Offer quarterly maintenance checkups to good customers."],
    executionFocus: [
      "Narrow your starter task list and define what work you will not take.",
      "Launch a punch-list offer and build trust-focused Google and referral presence.",
      "Run first jobs and tighten scope notes, exclusions, and material assumptions.",
      "Install clean completion, documentation, and review request habits.",
      "Build referral loops with realtors and property managers while protecting scope discipline.",
      "Document quoting, task triage, and tool-load SOPs so operations stay professional."
    ],
    advancedSystems: [
      "Lead triage workflow by task type",
      "Deferred-work follow-up automation",
      "Quarterly maintenance reminder campaigns"
    ]
  },
  {
    id: "painting",
    name: "Painting (Interior/Exterior)",
    tags: ["low5k", "low10k", "crew", "indoor", "outdoor", "high"],
    summary: "A high-trust, high-visibility home-service business with strong ticket sizes and clear premium package potential.",
    teaser: "Visible transformation, meaningful ticket sizes, and strong referral value when process and finish quality are high.",
    goodFor: ["Operators with finish-work standards", "Founders comfortable with crews and material planning", "People who can manage estimates and job sequencing"],
    operatorModel: "Can launch with a focused small-job offer, but crew support often follows quickly.",
    teamModel: "Well-suited for a small field crew as scope and job size expand.",
    serviceMode: "Indoor / outdoor / on-site",
    difficulty: "Moderate",
    startup_cost_range: "$2,500-$10,000",
    revenue_90_range: "$7,000-$35,000",
    revenue_1yr_range: "$80,000-$250,000",
    margin_range: "30%-50%",
    demandLevel: "High",
    seasonality: "Interior work is year-round; exterior peaks with weather windows.",
    recurringRevenuePotential: "Moderate through property managers, maintenance accounts, and periodic refresh work.",
    recommended_first_offer: "Single-room repaint package",
    whyAttractive: "The value is highly visible and premium pricing is possible when prep, communication, and finish quality are strong.",
    whyPeopleStartIt: "Strong ticket sizes and referral upside make it attractive once process and quality are dialed in.",
    pros: ["Higher tickets", "Visible transformation", "Premium package opportunity", "Referral-friendly"],
    cons: ["Prep quality matters", "Labor management", "Materials and schedule control matter"],
    bestFitOperatorType: "A detail-focused operator who can manage prep, scope, and customer expectations professionally.",
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
    tools: ["Rollers and brushes", "Airless sprayer optional", "Drop cloths", "Painter tape", "Ladders", "Caulk guns", "Prep tools", "Respirator masks"],
    equipment: ["Brushes and rollers", "Prep tools", "Ladders", "Drop cloths", "Caulk and patch setup", "Sprayer optional"],
    vehicleNeeds: ["Van or truck for ladders, drop cloths, paint, and prep equipment", "Protected storage for paint and finish tools"],
    requiredItems: ["Core painting kit", "Insurance", "Estimate template", "Phone and CRM", "Prep checklist"],
    optionalItems: ["Sprayer", "Dust containment gear", "Crew communication tools", "Color consultation materials"],
    softwareNotes: {
      "Estimates / proposals": "Quotes should separate prep, coatings, exclusions, and schedule clearly.",
      "Graphic design / content": "Use clean before/after and color mockups to support premium positioning."
    },
    commonLicenseCategories: ["General business license", "Contractor registration in some states", "Lead-safe or specialty environmental rules for older homes"],
    localAgencyPrompts: ["Does residential painting require contractor registration in this state or city?", "Are there lead-safe or environmental requirements I need to follow on older properties?"],
    commercialAutoNote: "Recommended because ladders, coatings, and gear travel routinely.",
    equipmentCoverageNote: "Useful once ladders, sprayers, and finish gear become meaningful assets.",
    questionsToAskAgent: ["Does the policy cover overspray or accidental finish damage?", "Should ladders and sprayer equipment be separately scheduled?"],
    starterOffer: "Single-room repaint package.",
    standardOffer: "Multi-room interior repaint with prep, patching, and finish coat package.",
    premiumOffer: "Premium interior/exterior repaint with prep, repair, premium coatings, and project communication updates.",
    addOns: ["Trim refresh", "Door package", "Accent wall", "Cabinet touch-up"],
    recurringOption: "Annual property refresh plan for landlords or property managers.",
    minimumPriceGuidance: "Set a minimum that covers prep, masking, material handling, and cleanup, not just brush time.",
    sampleUpsells: ["Upgrade to trim package", "Add doors and baseboards", "Use premium coating upgrade"],
    pricingNotes: ["Prep complexity changes pricing more than square footage alone.", "Be explicit about repairs and number of coats."],
    bestFirstLeadSources: ["Google Business Profile", "Realtor and property manager referrals", "Neighborhood proof posts"],
    onlineSources: ["Google Business Profile", "Facebook before/after posts", "Instagram transformations", "Local homeowner groups"],
    offlineSources: ["Realtor visits", "Yard signs during jobs", "Property manager outreach", "Referral leave-behinds"],
    localOutreachIdeas: ["Target older neighborhoods with visible exterior wear", "Offer move-in and pre-listing refresh packages"],
    referralIdeas: ["Realtors", "Handymen", "Flooring installers", "Property managers"],
    neighborhoodMarketingIdeas: ["Same-street exterior quote days", "Pre-listing refresh promotions", "Color consultation lead magnets"],
    socialProofIdeas: ["Trim and wall finish closeups", "Customer review snippets about professionalism", "Before/after reels"],
    beforeAfterContentIdeas: ["Room repaint transformation", "Exterior trim refresh", "Cabinet touch-up carousel"],
    googleBusinessProfileGuidance: ["Use keywords tied to interior painting, exterior painting, and prep quality.", "Ask reviews to mention cleanliness, communication, and finish quality."],
    leadResponseProcess: ["Ask whether the job is interior or exterior, surface condition, timeline, and color readiness.", "Tag small room jobs separately from multi-day projects."],
    quotingProcess: ["Walk prep requirements carefully and document exclusions.", "Separate repairs, premium coatings, and extra coats in the estimate."],
    schedulingProcess: ["Sequence around drying time, weather, and homeowner access.", "Confirm color selections and furniture prep before arrival."],
    jobPrep: ["Protect surfaces thoroughly.", "Stage ladders, drop cloths, and materials by room order.", "Review prep and repair notes with the customer before starting."],
    completionChecklist: ["Punch list complete", "Tape and coverings removed", "Touch-ups done", "Photos and customer notes logged"],
    invoicing: ["Use deposits for multi-day jobs and invoice progress milestones when appropriate.", "Collect final payment after punch-list closeout."],
    reviewRequestProcess: ["Ask once the final walkthrough confirms clean finish and communication quality.", "Encourage mention of professionalism and cleanup."],
    followUpProcess: ["Follow up on deferred spaces or exterior phases.", "Reconnect with pre-listing and property-manager contacts seasonally."],
    executionFocus: [
      "Define the small-job starter package, prep standards, and exclusions clearly.",
      "Launch transformation-focused proof and partner outreach to realtors and property managers.",
      "Run first estimates and refine prep-based pricing assumptions.",
      "Install walkthrough, punch-list, and review request standards.",
      "Add trim, premium coating, and recurring property-manager upsells where they fit.",
      "Document prep, communication, and closeout SOPs so the brand feels premium at scale."
    ],
    advancedSystems: [
      "Pre-listing partner follow-up automation",
      "Punch-list and milestone communication workflow",
      "Past-customer room-refresh campaigns"
    ]
  },
  {
    id: "appliance-repair",
    name: "Appliance Repair",
    tags: ["low5k", "low10k", "solo", "indoor", "mobile", "high"],
    summary: "A high-trust home-service business with strong ticket sizes, diagnostic value, and recurring referral potential.",
    teaser: "Urgent homeowner need, high-trust positioning, and premium diagnostic-based pricing potential.",
    goodFor: ["Mechanically inclined founders", "Operators who like diagnostics and troubleshooting", "People comfortable entering homes and building trust quickly"],
    operatorModel: "Often launches as a solo diagnostic and minor-repair business.",
    teamModel: "Can remain solo for a long time or scale through specialist technicians.",
    serviceMode: "Indoor / mobile",
    difficulty: "Moderate",
    startup_cost_range: "$3,000-$12,000",
    revenue_90_range: "$7,000-$30,000",
    revenue_1yr_range: "$90,000-$220,000",
    margin_range: "35%-55%",
    demandLevel: "High",
    seasonality: "Steady year-round because appliance failure is need-driven, not seasonal.",
    recurringRevenuePotential: "Moderate through property managers, landlords, and repeat household trust.",
    recommended_first_offer: "Diagnostic + minor repair visit",
    whyAttractive: "Customers often need quick help, and diagnostic skill creates pricing leverage and strong referral value.",
    whyPeopleStartIt: "The work is urgent, technical, and less dependent on big crews when launched well.",
    pros: ["Urgent demand", "Higher trust premium", "Technical positioning", "Good landlord/property-manager upside"],
    cons: ["Parts logistics", "Technical accuracy matters", "Licensing and trade questions vary"],
    bestFitOperatorType: "A technically disciplined operator who can diagnose quickly and communicate clearly under pressure.",
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
    tools: ["Diagnostic meter", "Nut drivers", "Wrench set", "Parts bins", "Service manual access", "PPE", "Knee pads", "Vehicle shelving"],
    equipment: ["Diagnostic tools", "Hand tool set", "Parts storage", "Safety gear", "Vehicle shelving"],
    vehicleNeeds: ["Van, truck, or organized SUV with secure parts and tool storage", "Shelving that supports fast field diagnostics"],
    requiredItems: ["Diagnostic tools", "Insurance", "Business phone", "CRM", "Service note and invoice templates"],
    optionalItems: ["Specialty tools by brand", "Tablet for manuals", "Common replacement part inventory", "Route optimization tools"],
    softwareNotes: {
      CRM: "Track appliance type, brand, symptoms, part needs, and return-visit status on every lead.",
      "Notes / docs": "Keep model-specific notes and recurring fault patterns in one searchable knowledge base."
    },
    commonLicenseCategories: ["General business license", "Electrical / gas or trade questions depending on scope", "EPA or specialty handling questions for certain systems"],
    localAgencyPrompts: ["What appliance repair tasks are allowed without a trade license in this state?", "Do gas, electrical, or refrigerant-related repairs trigger separate licensing or certification rules?"],
    commercialAutoNote: "Recommended because the vehicle functions as the mobile service platform.",
    equipmentCoverageNote: "Important if diagnostic equipment and stocked parts are material assets.",
    questionsToAskAgent: ["Are accidental installation or repair errors covered?", "Should stocked parts and diagnostic tools be separately covered?"],
    starterOffer: "Diagnostic visit with minor repair path if resolved on-site.",
    standardOffer: "Diagnostic visit plus common part replacement with same-day completion when stocked.",
    premiumOffer: "Priority diagnostic service with parts sourcing coordination, follow-up communication, and repair warranty explanation.",
    addOns: ["Second appliance inspection", "Water-line replacement coordination", "Maintenance cleanout", "Property manager service plan"],
    recurringOption: "Landlord or property-manager priority service relationship.",
    minimumPriceGuidance: "Charge for the diagnostic visit first so travel and expertise are covered even if repair is deferred.",
    sampleUpsells: ["Inspect second appliance", "Add maintenance cleaning", "Priority scheduling for property managers"],
    pricingNotes: ["Keep diagnostic, labor, and parts separated cleanly.", "Be very clear about what the diagnostic fee covers."],
    bestFirstLeadSources: ["Google Business Profile", "Property manager referrals", "Local Facebook / Nextdoor need-based posts"],
    onlineSources: ["Google Business Profile", "Local search ads if economics work", "Property manager groups", "Neighborhood platforms"],
    offlineSources: ["Property manager visits", "Realtor and landlord outreach", "Appliance store service relationships"],
    localOutreachIdeas: ["Target landlords and property managers needing dependable response", "Offer fast-response diagnostic windows"],
    referralIdeas: ["Property managers", "Handymen", "Plumbers", "HVAC techs", "Appliance retailers"],
    neighborhoodMarketingIdeas: ["Use trust-focused rather than discount-focused messaging", "Promote fast response and professional diagnostics"],
    socialProofIdeas: ["Review snippets about honesty and troubleshooting", "Short clips of clean diagnostic workflow", "Same-day repair success stories"],
    beforeAfterContentIdeas: ["Washer or dryer maintenance cleanout", "Organized service vehicle posts", "Repair-result explanation graphics"],
    googleBusinessProfileGuidance: ["Use keywords tied to washer repair, dryer repair, refrigerator repair, and diagnostic service.", "Ask reviews to mention professionalism, speed, and clarity."],
    leadResponseProcess: ["Ask appliance type, brand, symptoms, and urgency.", "Clarify whether there are gas, electrical, or water issues before dispatch."],
    quotingProcess: ["Lead with diagnostic pricing and explain possible next-step ranges.", "Do not overpromise repair until the appliance is inspected."],
    schedulingProcess: ["Hold time for diagnostics and possible part runs.", "Confirm model number and symptom notes before arrival."],
    jobPrep: ["Review model details, likely parts, and prior notes.", "Stage diagnostic gear and common consumables."],
    completionChecklist: ["Diagnosis documented", "Repair completed or next step clear", "Area cleaned", "Warranty or notes explained", "Invoice sent"],
    invoicing: ["Invoice diagnostic first and additional labor/parts separately.", "Use deposits if special-order parts are involved."],
    reviewRequestProcess: ["Ask once the appliance is functioning and the customer sees the value of clarity and professionalism.", "Use trust and expertise language."],
    followUpProcess: ["Check on completed repairs after a short interval if appropriate.", "Re-open deferred quotes after parts decisions or budget conversations."],
    executionFocus: [
      "Define exactly which appliance categories and repair scope you will take at launch.",
      "Launch trust-focused presence and fast-response diagnostic messaging.",
      "Refine call triage and diagnostic pricing after early service calls.",
      "Install repair documentation, parts tracking, and review request standards.",
      "Build landlord and property-manager relationships for repeat work.",
      "Document symptom triage, parts follow-up, and service note SOPs to keep diagnostics sharp."
    ],
    advancedSystems: [
      "Model-number intake automation",
      "Return-visit and parts follow-up workflow",
      "Property-manager priority routing"
    ]
  },
  {
    id: "pool-cleaning",
    name: "Pool Cleaning",
    tags: ["low5k", "low10k", "solo", "outdoor", "mobile", "high", "recurring", "seasonal"],
    summary: "A route-based recurring service with predictable maintenance demand and premium seasonal account value.",
    teaser: "Recurring route revenue, service notes that compound over time, and strong neighborhood cluster potential.",
    goodFor: ["Operators who like route-based field work", "Founders comfortable with recurring maintenance routines", "People serving pool-heavy neighborhoods"],
    operatorModel: "Can start solo with a compact route and strong service notes.",
    teamModel: "Scales into route technicians as density grows.",
    serviceMode: "Outdoor / mobile",
    difficulty: "Moderate",
    startup_cost_range: "$2,500-$9,000",
    revenue_90_range: "$5,000-$24,000",
    revenue_1yr_range: "$70,000-$180,000",
    margin_range: "30%-50%",
    demandLevel: "High",
    seasonality: "Seasonally stronger in warm regions or summer months, though some markets support near year-round work.",
    recurringRevenuePotential: "High because weekly or biweekly service is the core model.",
    recommended_first_offer: "Weekly chemical check + skim + vacuum",
    whyAttractive: "Recurring service routes can stack cleanly, and maintenance clients value consistency more than constant re-selling.",
    whyPeopleStartIt: "Once a route is built, recurring revenue and density can make operations more predictable.",
    pros: ["Recurring route model", "High local density value", "Clear maintenance need", "Strong account retention if reliable"],
    cons: ["Chemical handling discipline", "Seasonality in some markets", "Travel kills margin if routes are loose"],
    bestFitOperatorType: "A process-focused operator who likes recurring service notes, route density, and dependable weekly execution.",
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
    tools: ["Test strips and kits", "Pool pole + net", "Vacuum head", "Brushes", "Chemical storage bins", "PPE", "Service route app", "Waterproof labels"],
    equipment: ["Chemical test kit", "Pole and net", "Vacuum system", "Brushes", "Chemical storage", "Route bins"],
    vehicleNeeds: ["Truck, van, or SUV setup with secure chemical storage", "Route-friendly supply organization"],
    requiredItems: ["Testing kit", "Cleaning tools", "Chemical storage", "Insurance", "Phone and CRM"],
    optionalItems: ["Advanced digital testing", "Route optimization app", "Tablet for service logs", "Pool repair partner network"],
    softwareNotes: {
      CRM: "Track chemistry notes, gate codes, and service history on every pool so weekly visits stay consistent."
    },
    commonLicenseCategories: ["General business license", "Chemical handling or pool contractor questions in some states", "Repair-related licensing if equipment repair is added"],
    localAgencyPrompts: ["Are there certification or licensing requirements for pool maintenance or chemical handling in this state?", "At what point do equipment repairs require a separate contractor license?"],
    commercialAutoNote: "Recommended because chemicals and service equipment travel daily.",
    equipmentCoverageNote: "Useful if testing gear, vacuums, and stocked chemicals represent meaningful value.",
    questionsToAskAgent: ["How should chemical handling be described on the policy?", "Does liability cover water chemistry mistakes or related property damage claims?"],
    starterOffer: "Weekly chemical check, skim, and vacuum visit.",
    standardOffer: "Full weekly maintenance with chemical balancing, skimming, brushing, and vacuuming.",
    premiumOffer: "Premium maintenance with detailed service reports, filter reminders, and priority storm cleanup support.",
    addOns: ["Filter clean", "Green-to-clean coordination", "Equipment check", "Storm debris reset"],
    recurringOption: "Weekly or biweekly recurring pool care plan.",
    minimumPriceGuidance: "Protect the route minimum because drive time and chemical handling can quietly destroy margins.",
    sampleUpsells: ["Add filter clean", "Upgrade to premium reporting plan", "Bundle storm cleanup support"],
    pricingNotes: ["Route density and pool condition matter heavily.", "Clarify chemical inclusions versus bill-through or surcharge structure."],
    bestFirstLeadSources: ["Google Business Profile", "HOA-heavy neighborhoods", "Pool-builder and realtor referrals"],
    onlineSources: ["Google Business Profile", "Facebook neighborhood groups", "Community forums in pool-heavy areas"],
    offlineSources: ["Door hangers in pool neighborhoods", "Pool store relationship building", "Realtor and property manager outreach"],
    localOutreachIdeas: ["Target pool-heavy subdivisions with route-day availability", "Market opening-week service or storm cleanup help"],
    referralIdeas: ["Pool builders", "Landscapers", "Realtors", "Property managers"],
    neighborhoodMarketingIdeas: ["Route density specials for one gated community", "Pre-holiday pool prep reminders", "Storm-cleanup campaigns"],
    socialProofIdeas: ["Clean pool clarity shots", "Review snippets around reliability", "Service log visuals showing consistency"],
    beforeAfterContentIdeas: ["Storm-debris cleanup", "Clarity improvement", "Equipment area organization"],
    googleBusinessProfileGuidance: ["Use keywords around pool service, weekly pool maintenance, and chemical balancing.", "Ask reviews to mention reliability and communication."],
    leadResponseProcess: ["Ask pool size, current condition, access notes, and service frequency desired.", "Tag green pools or heavy recovery jobs separately from maintenance clients."],
    quotingProcess: ["Quote maintenance differently from recovery work.", "Clarify what chemical inclusion and reporting level is built into the service."],
    schedulingProcess: ["Run fixed route days by neighborhood.", "Confirm gate codes and service windows in the CRM."],
    jobPrep: ["Check chemical stock and route notes.", "Review service history before arrival.", "Stage PPE and testing tools."],
    completionChecklist: ["Chemistry checked", "Debris removed", "Service notes logged", "Customer updates sent if needed"],
    invoicing: ["Invoice recurring clients on a simple predictable cadence.", "Track chemical surcharges or recovery jobs separately."],
    reviewRequestProcess: ["Ask once the route service has shown consistency and water quality is visibly strong.", "Mention reliability and communication in the ask."],
    followUpProcess: ["Re-open seasonal clients before warm weather ramps.", "Send storm-cleanup reminders when weather shifts."],
    executionFocus: [
      "Set route minimums, chemical inclusion rules, and the core weekly maintenance offer.",
      "Launch local marketing in pool-heavy neighborhoods and build service-area proof.",
      "Run first service calls and tighten reporting plus chemistry note standards.",
      "Install recurring billing, gate-code logging, and review request habits.",
      "Grow route density and add storm, filter, or recovery upsells carefully.",
      "Document route operations, chemistry notes, and customer update SOPs to stabilize the route."
    ],
    advancedSystems: [
      "Recurring route notes with auto reminders",
      "Storm-cleanup reactivation flows",
      "Account health reporting for premium maintenance clients"
    ]
  },
  {
    id: "fence-installation",
    name: "Fence Installation",
    tags: ["low10k", "crew", "outdoor", "high"],
    summary: "A project-based exterior service with meaningful ticket sizes, strong contractor-style quoting, and clear upsell opportunity.",
    teaser: "Higher-ticket projects with strong homeowner demand and visible property-value impact.",
    goodFor: ["Founders comfortable with project estimating", "Operators who can manage labor and materials", "People who want larger-ticket outdoor jobs"],
    operatorModel: "Usually not ideal as a purely solo model beyond small repairs or short runs.",
    teamModel: "Best suited to a crew-based field operation.",
    serviceMode: "Outdoor / on-site",
    difficulty: "Moderate",
    startup_cost_range: "$5,000-$20,000",
    revenue_90_range: "$8,000-$45,000",
    revenue_1yr_range: "$120,000-$350,000",
    margin_range: "25%-40%",
    demandLevel: "High",
    seasonality: "Weather-dependent in many markets, strongest during build and renovation seasons.",
    recurringRevenuePotential: "Lower than route businesses, but repair and maintenance work can create repeat opportunities.",
    recommended_first_offer: "40-foot privacy fence install",
    whyAttractive: "Projects carry larger tickets, and a good estimating process can create meaningful monthly revenue quickly.",
    whyPeopleStartIt: "Visible property improvement, strong referral value, and large-ticket jobs make the business attractive.",
    pros: ["Large tickets", "Strong visual proof", "High homeowner value", "Referral-friendly"],
    cons: ["Material cash flow", "Labor coordination", "Permitting and scope complexity"],
    bestFitOperatorType: "A project-minded operator who can estimate carefully, manage crews, and coordinate materials cleanly.",
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
    tools: ["Post hole auger", "Level and strings", "Circular saw", "Concrete mix gear", "Nailer/screws", "Truck/trailer access", "PPE", "Material estimator sheet"],
    equipment: ["Auger", "Saw kit", "Levels and layout tools", "Concrete gear", "Fastening tools", "Truck/trailer"],
    vehicleNeeds: ["Truck and trailer or dedicated hauling setup for materials and tools", "Ability to transport posts, panels, and concrete safely"],
    requiredItems: ["Layout tools", "Auger access", "Insurance", "Estimate template", "Materials sourcing process"],
    optionalItems: ["Skid steer or heavier equipment", "Crew communication tools", "Branded yard signs", "Permit workflow tools"],
    softwareNotes: {
      "Estimates / proposals": "Fence quotes need layout detail, material grade, gate scope, and permit assumptions."
    },
    commonLicenseCategories: ["General business license", "Contractor registration in many states", "Permit questions for property lines and structural work"],
    localAgencyPrompts: ["Does fence installation require contractor registration or a specialty license here?", "What setbacks, permits, or HOA approvals should customers verify before installation?"],
    commercialAutoNote: "Recommended because trucks and trailers are central to delivery and install work.",
    equipmentCoverageNote: "Important when augers, trailers, and heavier tools are core assets.",
    questionsToAskAgent: ["How should trailers and powered augers be insured?", "Does the liability policy cover property-line or post-hole damage claims?"],
    starterOffer: "40-foot privacy fence install package.",
    standardOffer: "Full perimeter install with gates and upgraded material options.",
    premiumOffer: "Premium install with layout planning, material upgrades, stain/seal coordination, and detailed closeout.",
    addOns: ["Gate hardware upgrades", "Fence stain/seal", "Small repair package", "Demo and haul-away"],
    recurringOption: "Annual inspection, maintenance, or repair support for property managers.",
    minimumPriceGuidance: "Use deposits and material margin discipline because project cash flow can get tight fast.",
    sampleUpsells: ["Upgrade gate hardware", "Add stain/seal package", "Bundle removal and haul-away"],
    pricingNotes: ["Material grade and layout complexity drive price heavily.", "Clarify permit, survey, and property-line assumptions in writing."],
    bestFirstLeadSources: ["Google Business Profile", "Realtor referrals", "Property managers", "Neighborhood proof posts"],
    onlineSources: ["Google Business Profile", "Facebook before/after posts", "Local contractor directories", "Neighborhood groups"],
    offlineSources: ["Yard signs at installs", "Realtor visits", "Property manager outreach", "Fence repair door hangers"],
    localOutreachIdeas: ["Target aging fence neighborhoods", "Offer gate and repair inspections as a lower-friction entry point"],
    referralIdeas: ["Realtors", "Landscapers", "Pool builders", "Property managers"],
    neighborhoodMarketingIdeas: ["Same-street install visibility", "Gate repair offers", "Storm-damage inspection campaigns"],
    socialProofIdeas: ["Property boundary transformation shots", "Customer comments about communication and cleanup", "Install progress reels"],
    beforeAfterContentIdeas: ["Old fence demo to new install", "Gate upgrade comparison", "Corner and line detail shots"],
    googleBusinessProfileGuidance: ["Use keywords tied to privacy fence, fence installation, gate installation, and repair.", "Ask reviews to mention workmanship, communication, and finished look."],
    leadResponseProcess: ["Ask fence type, footage estimate, gate count, and whether the property line is known.", "Clarify homeowner association or permit considerations early."],
    quotingProcess: ["Walk the site or review detailed photos.", "Separate material grade, gate scope, demo, and permit assumptions in the quote."],
    schedulingProcess: ["Sequence material ordering, crew availability, and weather windows.", "Confirm layout and access before mobilizing."],
    jobPrep: ["Verify measurements and line layout.", "Confirm materials on-site.", "Review crew assignments and site protection plan."],
    completionChecklist: ["Posts and panels checked", "Gate swings confirmed", "Site cleaned", "Photos and care notes delivered"],
    invoicing: ["Use deposit + progress + final payment structure when appropriate.", "Track material and labor margin per job."],
    reviewRequestProcess: ["Ask once the customer sees the finished line and gate functionality.", "Highlight craftsmanship and communication in the ask."],
    followUpProcess: ["Offer stain/seal or repair follow-up after install.", "Reconnect with past customers for maintenance or neighbor referrals."],
    executionFocus: [
      "Define the entry offer, material standard, and deposit structure before taking leads.",
      "Launch proof-driven marketing and partner outreach to realtors and landscapers.",
      "Refine site-walk and quote templates around footage, gates, and property-line assumptions.",
      "Install project communication, deposit, and closeout standards.",
      "Add repair, seal, and gate upgrades to improve profitability and follow-on work.",
      "Document estimating, materials, and site-communication SOPs to protect project margin."
    ],
    advancedSystems: [
      "Deposit and milestone workflow automation",
      "Post-install maintenance campaigns",
      "Partner referral pipeline for larger projects"
    ]
  },
  {
    id: "flooring-installation",
    name: "Flooring Installation",
    tags: ["low10k", "crew", "indoor", "high"],
    summary: "A project-based interior service with strong ticket sizes and premium positioning when finish quality is controlled.",
    teaser: "Large project value, visible results, and good partnership upside with painters, realtors, and remodelers.",
    goodFor: ["Finish-oriented operators", "Founders comfortable with estimating and project management", "People who want larger-ticket interior jobs"],
    operatorModel: "Can start with small-room jobs, but crew support often becomes necessary quickly.",
    teamModel: "Best suited to a crew-based or helper-supported field model.",
    serviceMode: "Indoor / on-site",
    difficulty: "Moderate",
    startup_cost_range: "$4,000-$15,000",
    revenue_90_range: "$8,000-$40,000",
    revenue_1yr_range: "$110,000-$280,000",
    margin_range: "25%-45%",
    demandLevel: "High",
    seasonality: "Fairly steady, often tied to renovation cycles, moves, and listings.",
    recurringRevenuePotential: "Lower recurring cadence, but strong repeat through contractors and property managers.",
    recommended_first_offer: "Single-room LVP install package",
    whyAttractive: "Projects carry meaningful ticket size and good visual proof, especially with small-room starter offers.",
    whyPeopleStartIt: "The work sits in a premium home-improvement category with strong partnership upside and visible finished results.",
    pros: ["Higher project value", "Premium positioning", "Strong partner channels", "Visible transformation"],
    cons: ["Material handling", "Prep and subfloor issues", "Labor quality matters greatly"],
    bestFitOperatorType: "A finish-focused operator who scopes carefully, communicates well, and values project discipline.",
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
    tools: ["Floor cutter", "Moisture meter", "Knee pads", "Spacers", "Pull bars", "Tapping block", "Saws", "Adhesive tools"],
    equipment: ["Cutting tools", "Moisture meter", "Knee protection", "Pull bars and spacers", "Vacuum and prep tools"],
    vehicleNeeds: ["Van or truck for material transport and tool storage", "Ability to stage planks, saws, and prep gear cleanly"],
    requiredItems: ["Core flooring tool kit", "Insurance", "Measurement template", "Estimate and scope system", "Vehicle storage"],
    optionalItems: ["Dust containment", "Crew communication tools", "Floor prep specialty tools", "Delivery support equipment"],
    softwareNotes: {
      "Estimates / proposals": "Separate demolition, prep, material handling, trim, and transition work in the proposal."
    },
    commonLicenseCategories: ["General business license", "Contractor registration in many states", "Permit or specialty trade questions if structural subfloor work is included"],
    localAgencyPrompts: ["Does flooring installation require contractor registration in my state?", "Which prep or structural tasks move this job beyond basic flooring installation?"],
    commercialAutoNote: "Recommended because materials and saw systems often travel to every project.",
    equipmentCoverageNote: "Useful when saws, meters, and installation gear become material assets.",
    questionsToAskAgent: ["Does the policy cover damage related to installation mistakes or subfloor exposure?", "How should I describe tool and material handling risk on the policy?"],
    starterOffer: "Single-room LVP install package.",
    standardOffer: "Multi-room install with trim and transition package.",
    premiumOffer: "Premium install with detailed prep, trim package, transition work, and final walkthrough support.",
    addOns: ["Baseboard install", "Subfloor prep", "Demo and haul-away", "Trim package"],
    recurringOption: "Property-manager turnover flooring package.",
    minimumPriceGuidance: "Price for prep, hauling, cleanup, and transition work, not just laying floor material.",
    sampleUpsells: ["Add baseboards", "Add demo and haul-away", "Upgrade to premium trim finish"],
    pricingNotes: ["Subfloor prep and demolition change the economics fast.", "Always clarify material supply responsibility and acclimation timing."],
    bestFirstLeadSources: ["Google Business Profile", "Realtors", "Painters", "Property managers", "Remodel referrals"],
    onlineSources: ["Google Business Profile", "Before/after posts", "Local contractor directories", "Neighborhood groups"],
    offlineSources: ["Realtor outreach", "Property manager visits", "Jobsite signage", "Contractor networking"],
    localOutreachIdeas: ["Offer single-room starter packages to reduce buying friction", "Target move-in refresh and listing prep jobs"],
    referralIdeas: ["Painters", "Realtors", "Cabinet installers", "Property managers"],
    neighborhoodMarketingIdeas: ["Move-in refresh campaigns", "Rental turnover offers", "Remodel bundle partnerships"],
    socialProofIdeas: ["Room transformation reels", "Customer comments on finish quality", "Transition detail photos"],
    beforeAfterContentIdeas: ["Old carpet to LVP", "Trim and transition detail", "Room reset transformation"],
    googleBusinessProfileGuidance: ["Use keywords for LVP install, flooring install, floor replacement, and trim finish.", "Ask reviews to mention finish quality, communication, and cleanup."],
    leadResponseProcess: ["Ask flooring type, room count, current floor condition, and timeline.", "Identify whether demolition and trim are part of scope."],
    quotingProcess: ["Use measurements and prep notes, not quick guess pricing.", "Separate demo, prep, and premium finish elements clearly."],
    schedulingProcess: ["Sequence around material delivery, acclimation, and access windows.", "Confirm furniture movement and room readiness before arrival."],
    jobPrep: ["Inspect subfloor and moisture issues.", "Stage materials and cutting area cleanly.", "Protect adjacent finished surfaces."],
    completionChecklist: ["Install complete", "Transitions and trim complete", "Debris removed", "Photos and care notes delivered"],
    invoicing: ["Use deposits for materials and larger projects.", "Track labor and prep margin carefully."],
    reviewRequestProcess: ["Ask after the final walkthrough and visible finish reveal.", "Encourage comments about craftsmanship and communication."],
    followUpProcess: ["Offer future room phases or property-manager turnover support.", "Reconnect with realtor and contractor partners after completed projects."],
    executionFocus: [
      "Finalize your starter room package, prep rules, and material assumptions.",
      "Launch partner outreach to realtors, painters, and property managers plus visual proof marketing.",
      "Run early site walks and tighten prep, demo, and transition pricing.",
      "Install deposits, walkthrough, and closeout standards on every project.",
      "Add trim, demo, and multi-room upsells to profitable jobs.",
      "Document estimating, site prep, and final-walk SOPs to keep project quality high."
    ],
    advancedSystems: [
      "Partner referral intake workflows",
      "Deposit and milestone communication sequence",
      "Past-client next-room reactivation campaigns"
    ]
  },
  {
    id: "moving-labor",
    name: "Moving Labor",
    tags: ["low2k", "low5k", "low10k", "crew", "indoor", "outdoor", "mobile", "high", "beginner"],
    summary: "A labor-first service that sells convenience, urgency, and reliability without requiring ownership of a full moving fleet.",
    teaser: "Fast demand, flexible launch model, and strong partner potential around moving and apartment turnover.",
    goodFor: ["Founders with labor capacity", "Operators comfortable with time-block pricing", "People who want service demand without full truck ownership"],
    operatorModel: "Can begin with labor-only blocks, but helpers improve economics quickly.",
    teamModel: "Better as a small crew-based labor model.",
    serviceMode: "Indoor / outdoor / mobile",
    difficulty: "Beginner",
    startup_cost_range: "$1,200-$4,500",
    revenue_90_range: "$4,000-$18,000",
    revenue_1yr_range: "$50,000-$150,000",
    margin_range: "35%-55%",
    demandLevel: "High",
    seasonality: "Strong during moving seasons and end-of-month apartment turnover windows.",
    recurringRevenuePotential: "Moderate through apartment communities, staging partners, and repeat referral channels.",
    recommended_first_offer: "2 movers, 2-hour local labor block",
    whyAttractive: "It solves a stressful customer problem quickly and can launch without buying a full moving truck fleet.",
    whyPeopleStartIt: "Labor-only moving support allows faster market entry and flexible pricing with lower asset requirements.",
    pros: ["Fast demand", "No truck ownership needed at launch", "Partner-friendly", "Simple time-block pricing"],
    cons: ["Labor reliability matters", "Injury risk", "Scheduling can get chaotic if poorly managed"],
    bestFitOperatorType: "An organized operator who can coordinate people, communicate clearly, and keep jobs running on time.",
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
    tools: ["Dollies", "Moving blankets", "Ratchet straps", "Hand truck", "Gloves", "Back-support belts", "Shrink wrap", "Basic toolkit"],
    equipment: ["Dollies", "Hand trucks", "Moving blankets", "Straps", "Shrink wrap", "Protective gear"],
    vehicleNeeds: ["Vehicle optional if labor-only, but at least one support vehicle helps transport gear and crew", "Partnership with truck-rental workflows is useful"],
    requiredItems: ["Basic moving gear", "Insurance", "Quote script", "Scheduling setup", "Crew communication process"],
    optionalItems: ["Trailer or truck partnerships", "Branded shirts", "Extra labor bench", "Apartment partnership leave-behinds"],
    softwareNotes: {
      Scheduling: "Tight arrival windows and crew coordination matter more than fancy tooling in early stages."
    },
    commonLicenseCategories: ["General business license", "Motor carrier rules if you move goods with your own truck", "Local moving or transport registration if hauling is added"],
    localAgencyPrompts: ["If I offer labor-only moving help, do I avoid state mover licensing requirements?", "What changes if I start transporting customer goods with my own truck?"],
    commercialAutoNote: "Ask based on whether your company vehicle is used to transport crew or customer goods.",
    equipmentCoverageNote: "Optional early, but moving gear replacement can still be disruptive.",
    questionsToAskAgent: ["Does my policy cover accidental property damage during moving labor?", "What coverage changes if I later add truck-based moves?"],
    starterOffer: "Two movers for a two-hour local labor block.",
    standardOffer: "Labor-only loading or unloading package with stairs and furniture protection options.",
    premiumOffer: "Premium move support with packing help, furniture disassembly, and final room reset assistance.",
    addOns: ["Packing help", "Furniture assembly", "Extra mover", "Stair carry surcharge"],
    recurringOption: "Apartment turn and staging support relationship.",
    minimumPriceGuidance: "Use a minimum block rate plus clearly defined stair, heavy-item, and extra-labor rules.",
    sampleUpsells: ["Add packing help", "Upgrade to extra mover", "Book unpack / setup support"],
    pricingNotes: ["Keep labor-only vs hauling clearly separated.", "Clarify weight, stairs, assembly, and insurance limitations."],
    bestFirstLeadSources: ["Apartment communities", "Realtors", "Facebook and local move groups", "Storage facilities"],
    onlineSources: ["Google Business Profile", "Facebook local groups", "Moving-related marketplaces", "Apartment resident groups"],
    offlineSources: ["Storage facility outreach", "Apartment manager relationships", "Realtor and stager referrals"],
    localOutreachIdeas: ["Offer move-day labor support to apartment communities", "Target end-of-month demand windows"],
    referralIdeas: ["Truck rental centers", "Stagers", "Realtors", "Storage managers"],
    neighborhoodMarketingIdeas: ["Move-in / move-out weekend blocks", "Apartment building flyer strategy", "Student move-season campaigns"],
    socialProofIdeas: ["Review snippets about reliability and care", "Packing and loadout time-lapse", "Organized crew content"],
    beforeAfterContentIdeas: ["Room cleared for move-out", "Storage load organization", "Setup and unpack support visuals"],
    googleBusinessProfileGuidance: ["Use keywords for moving labor, loading help, unloading help, and apartment moves.", "Ask reviews to mention professionalism, care, and punctuality."],
    leadResponseProcess: ["Ask date, labor scope, number of movers needed, stairs, and heavy items.", "Clarify whether the company is providing transport or labor only."],
    quotingProcess: ["Quote in time blocks with clear add-on rules.", "Define arrival window, heavy-item rules, and cancellation terms."],
    schedulingProcess: ["Confirm crew availability and hold buffers for overruns.", "Send prep checklist before the move day."],
    jobPrep: ["Confirm gear loadout and crew assignments.", "Review access, elevator, and parking notes.", "Clarify item protection expectations."],
    completionChecklist: ["Items moved per scope", "Damage check complete", "Tools and blankets collected", "Invoice and notes sent"],
    invoicing: ["Collect deposit for reserved blocks when appropriate.", "Invoice additional time or extra labor clearly."],
    reviewRequestProcess: ["Ask once the stressful move moment is over and the customer feels relief.", "Highlight care, speed, and professionalism."],
    followUpProcess: ["Offer unpack or assembly support after the move.", "Reconnect with apartment and realtor partners before peak moving dates."],
    executionFocus: [
      "Finalize your labor-only scope, time-block pricing, and heavy-item rules.",
      "Launch partner outreach to apartments, storage facilities, and realtors.",
      "Run first moves and tighten staffing plus stair/extra-time pricing assumptions.",
      "Install prep checklist, arrival reminder, and review request habits.",
      "Add packing, assembly, or unpacking upsells to good-fit jobs.",
      "Document scheduling, crew communication, and closeout SOPs so jobs stay controlled."
    ],
    advancedSystems: [
      "Move-day reminder workflows",
      "Apartment partner follow-up campaigns",
      "Crew scheduling and overrun alerts"
    ]
  },
  {
    id: "pet-waste-removal",
    name: "Pet Waste Removal",
    tags: ["low2k", "low5k", "solo", "outdoor", "mobile", "high", "beginner", "recurring"],
    summary: "A recurring subscription-style yard service with simple route economics, low startup friction, and strong local retention.",
    teaser: "Low startup cost, easy subscription model, and excellent route density potential.",
    goodFor: ["Founders who want recurring routes", "Operators comfortable with simple outdoor service work", "People seeking a very lean launch model"],
    operatorModel: "Excellent solo route launch business.",
    teamModel: "Can scale into route techs as subscription density grows.",
    serviceMode: "Outdoor / mobile",
    difficulty: "Beginner",
    startup_cost_range: "$700-$2,500",
    revenue_90_range: "$2,000-$10,000",
    revenue_1yr_range: "$25,000-$80,000",
    margin_range: "45%-70%",
    demandLevel: "High",
    seasonality: "Fairly stable year-round with regional weather impact.",
    recurringRevenuePotential: "High because the best model is weekly or biweekly subscription service.",
    recommended_first_offer: "Weekly yard cleanup subscription",
    whyAttractive: "The model is simple, route density compounds, and recurring subscriptions can become predictable quickly.",
    whyPeopleStartIt: "It is one of the leanest recurring local-service launches with straightforward operations.",
    pros: ["Very lean launch", "Recurring subscriptions", "Simple service delivery", "Good neighborhood density"],
    cons: ["Perceived glamour is low", "Route density matters heavily", "Need clear sanitation and professionalism"],
    bestFitOperatorType: "A process-driven founder who values recurring revenue and efficient route execution over flashy branding.",
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
    tools: ["Scooper tools", "Bucket liners", "Disinfectant spray", "Boot covers", "Route map app", "Waste bins", "Disposable gloves", "Subscription tracker sheet"],
    equipment: ["Scooping tools", "Waste container system", "Sanitation supplies", "Route bins"],
    vehicleNeeds: ["Small car or SUV is sufficient with clean containment and route organization"],
    requiredItems: ["Scooping tools", "Waste containers", "Sanitation supplies", "Phone and CRM", "Recurring billing setup"],
    optionalItems: ["Branded route vehicle", "Service notification cards", "Canine-yard deodorizer upsell", "Second route tech"],
    softwareNotes: {
      Scheduling: "Recurring weekly or biweekly route logic is central to making this business work."
    },
    commonLicenseCategories: ["General business license", "Waste disposal or sanitation questions in some municipalities"],
    localAgencyPrompts: ["Are there any local disposal rules for pet waste removal businesses?", "Do I need a general business license for recurring yard cleanup service?"],
    commercialAutoNote: "Usually not critical at the very beginning but ask if the business vehicle is used daily for route work.",
    equipmentCoverageNote: "Optional early; the equipment cost is lower than many trades.",
    questionsToAskAgent: ["Does liability cover gate, pet, or property-access related incidents?", "Do I need any sanitation-specific endorsements?"],
    starterOffer: "Weekly yard cleanup subscription.",
    standardOffer: "Weekly cleanup plus bagging and gate notification service.",
    premiumOffer: "Premium weekly service with deodorizer treatment and photo confirmation.",
    addOns: ["Deodorizer treatment", "Twice-weekly visits", "One-time reset clean", "Multi-dog surcharge"],
    recurringOption: "Weekly or twice-weekly subscription route.",
    minimumPriceGuidance: "Protect a minimum subscription price per stop so route density and drive time stay healthy.",
    sampleUpsells: ["Add deodorizer", "Upgrade to twice-weekly plan", "Add initial reset clean"],
    pricingNotes: ["Number of dogs, yard size, and route density are the main drivers.", "Initial cleanup resets often deserve a separate price."],
    bestFirstLeadSources: ["Neighborhood Facebook groups", "Google Business Profile", "Pet-related referral partners"],
    onlineSources: ["Google Business Profile", "Neighborhood groups", "Local pet owner communities", "Nextdoor"],
    offlineSources: ["Veterinarian or pet store flyer partnerships", "Dog groomer referrals", "Neighborhood leave-behinds"],
    localOutreachIdeas: ["Target dog-heavy neighborhoods", "Offer same-street route pricing for clusters", "Use playful but premium branding"],
    referralIdeas: ["Dog walkers", "Pet stores", "Groomers", "Veterinarians"],
    neighborhoodMarketingIdeas: ["Subscription route specials", "Multi-dog household bundles", "Neighbor referral discounts"],
    socialProofIdeas: ["Customer praise about convenience", "Route-day proof posts", "Playful brand visuals"],
    beforeAfterContentIdeas: ["Clean-yard before/after", "Subscription route map stories", "Seasonal yard reset content"],
    googleBusinessProfileGuidance: ["Use keywords around pooper scooper service, pet waste removal, and weekly yard cleanup.", "Ask reviews to mention convenience, reliability, and professionalism."],
    leadResponseProcess: ["Ask dog count, yard size, gate access, and preferred visit frequency.", "Log pet notes and access notes carefully."],
    quotingProcess: ["Use subscription-first pricing and separate out initial cleanup resets.", "Clarify billing cadence and gate access expectations."],
    schedulingProcess: ["Build dense route days by neighborhood.", "Send service-complete notification if that is part of the package."],
    jobPrep: ["Review gate and dog notes.", "Stage sanitation supplies and replacement liners.", "Check route order before leaving."],
    completionChecklist: ["Yard complete", "Gate secured", "Waste contained", "Service note logged", "Notification sent if promised"],
    invoicing: ["Run recurring autopay and keep failed-payment follow-up simple.", "Separate reset cleans and add-ons from recurring subscription billing."],
    reviewRequestProcess: ["Ask after a few dependable visits once the convenience is obvious.", "Use a professional but light tone."],
    followUpProcess: ["Offer referral reward to good recurring customers.", "Reactivate paused customers at season changes."],
    executionFocus: [
      "Set recurring pricing, service radius, and initial cleanup rules.",
      "Launch neighborhood-first marketing and build route density in one target area.",
      "Run first subscriptions and tighten dog-count plus yard-size pricing assumptions.",
      "Install service-complete notes, autopay, and review request cadence.",
      "Add deodorizer or multi-visit upsells while tightening route efficiency.",
      "Document route, sanitation, and customer-notification SOPs to keep operations clean."
    ],
    advancedSystems: [
      "Recurring billing and failed-payment workflow",
      "Neighbor referral automation",
      "Route-density reporting by ZIP code"
    ]
  },
  {
    id: "snow-removal",
    name: "Snow Removal",
    tags: ["low5k", "low10k", "crew", "outdoor", "mobile", "high", "seasonal"],
    summary: "A highly seasonal but urgent service business that can produce strong short-window revenue with the right route prep.",
    teaser: "Urgent demand, weather-triggered buying, and strong route economics when operations are tight.",
    goodFor: ["Operators in snow markets", "Founders comfortable with weather-driven scheduling", "People who can prepare routes before storms"],
    operatorModel: "Can launch solo with smaller residential routes.",
    teamModel: "Often benefits from helpers or subcontractors during heavy storm events.",
    serviceMode: "Outdoor / mobile",
    difficulty: "Moderate",
    startup_cost_range: "$2,000-$10,000",
    revenue_90_range: "$4,000-$30,000",
    revenue_1yr_range: "$35,000-$140,000",
    margin_range: "25%-45%",
    demandLevel: "High",
    seasonality: "Heavily seasonal and storm-driven.",
    recurringRevenuePotential: "Moderate through seasonal contracts and storm retainers.",
    recommended_first_offer: "Driveway + walkway storm service",
    whyAttractive: "Storm events create urgent demand and customers value dependable response over complexity.",
    whyPeopleStartIt: "In the right market, a short intense season can produce meaningful revenue quickly.",
    pros: ["Urgent demand", "Clear value", "Storm retainers possible", "Route density can be strong"],
    cons: ["Heavy seasonality", "Weather unpredictability", "Equipment readiness matters"],
    bestFitOperatorType: "An operator who plans ahead, respects route logistics, and can communicate clearly during storms.",
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
    tools: ["Snow blower", "Shovels", "Salt spreader", "Ice melt stock", "Winter PPE", "Headlamp", "Storm route list", "Vehicle winter kit"],
    equipment: ["Snow blower", "Hand tools", "Salt spreader", "Winter safety gear", "Vehicle prep kit"],
    vehicleNeeds: ["Reliable winter-ready vehicle with route gear storage", "Snow tires or proper winter prep are critical"],
    requiredItems: ["Snow equipment", "Insurance", "Storm route planning", "Customer communication system", "Winter vehicle kit"],
    optionalItems: ["Plow attachment", "Backup blower", "Subcontractor bench", "Commercial route add-ons"],
    softwareNotes: {
      Scheduling: "Storm-triggered scheduling and customer status updates are core to the service experience."
    },
    commonLicenseCategories: ["General business license", "Commercial snow or right-of-way restrictions in some municipalities", "Commercial contractor registration questions for larger sites"],
    localAgencyPrompts: ["Are there municipal restrictions on snow placement or de-icing materials for service contractors?", "Do commercial lots require any additional contractor registration or approvals?"],
    commercialAutoNote: "Recommended because the business depends on a winter service vehicle.",
    equipmentCoverageNote: "Worth asking about for snow blowers, spreaders, or plow attachments.",
    questionsToAskAgent: ["Does liability cover slip-and-fall claims related to snow and ice service?", "How should I insure winter attachments or plow equipment?"],
    starterOffer: "Driveway + walkway storm service package.",
    standardOffer: "Storm service with walkway, entry, and ice melt application.",
    premiumOffer: "Priority snow and ice management plan with storm updates and repeat passes if needed.",
    addOns: ["Ice melt application", "Second pass", "Sidewalk extension", "Seasonal retainer"],
    recurringOption: "Seasonal contract or storm retainer with priority service.",
    minimumPriceGuidance: "Price around dispatch risk, overnight timing, and route disruption, not only square footage.",
    sampleUpsells: ["Add ice melt", "Upgrade to seasonal contract", "Add second pass guarantee"],
    pricingNotes: ["Storm timing and trigger depth change the economics.", "Clarify whether a price is per push, per event, or seasonal."],
    bestFirstLeadSources: ["Neighborhoods with driveways", "Property managers", "Local Facebook groups before storms"],
    onlineSources: ["Google Business Profile", "Storm reminder social posts", "Neighborhood groups", "Nextdoor"],
    offlineSources: ["Flyers before winter", "Property manager visits", "Neighborhood signage where allowed"],
    localOutreachIdeas: ["Run pre-storm signup pushes", "Market priority route spots before the first major event"],
    referralIdeas: ["Landscapers", "Property managers", "HOAs", "Handymen"],
    neighborhoodMarketingIdeas: ["Priority route enrollment by subdivision", "Storm alert campaigns", "Seasonal contract reminders"],
    socialProofIdeas: ["Storm-response updates", "Review snippets about reliability in bad weather", "Clean driveway after-storm photos"],
    beforeAfterContentIdeas: ["Pre/post storm clearing", "Walkway safety improvement", "Route readiness content"],
    googleBusinessProfileGuidance: ["Use keywords around snow removal, driveway clearing, and ice management.", "Ask reviews to mention reliability and communication during storms."],
    leadResponseProcess: ["Confirm address, trigger depth expectations, and whether salt is requested.", "Log priority accounts separately from on-demand leads."],
    quotingProcess: ["Clarify pricing model and service trigger clearly.", "Define where snow will be placed and what happens in heavy storms."],
    schedulingProcess: ["Pre-build route order before storms.", "Use automated status updates when storms hit."],
    jobPrep: ["Fuel and stage equipment before the storm.", "Review route order and salt inventory.", "Check vehicle winter readiness."],
    completionChecklist: ["Driveway clear", "Walkway safe", "Salt noted if applied", "Route completion logged", "Customer update sent"],
    invoicing: ["Use pre-authorized cards for recurring or on-demand clients when possible.", "Track per-push margin carefully."],
    reviewRequestProcess: ["Ask after dependable service through a meaningful storm event.", "Highlight responsiveness and reliability."],
    followUpProcess: ["Re-open seasonal contracts before the next storm wave.", "Offer priority enrollment to on-demand customers."],
    executionFocus: [
      "Set trigger-depth pricing, route radius, and seasonal contract rules.",
      "Launch pre-storm signup campaigns and priority route offers before weather hits.",
      "Refine storm dispatch process and per-push pricing after early events.",
      "Install status-update and invoice collection workflows.",
      "Build recurring seasonal accounts and reduce on-demand chaos through better prep.",
      "Document storm prep, route sequencing, and customer messaging SOPs so events stay manageable."
    ],
    advancedSystems: [
      "Storm-trigger customer messaging",
      "Priority-route enrollment workflow",
      "Event-by-event profitability tracking"
    ]
  },
  {
    id: "trash-bin-cleaning",
    name: "Trash Bin Cleaning",
    tags: ["low2k", "low5k", "low10k", "solo", "outdoor", "mobile", "high", "beginner", "recurring"],
    summary: "A route-based sanitation service with recurring plan potential, neighborhood density upside, and simple subscription packaging.",
    teaser: "Low-friction recurring offer with route density and good add-on potential in suburban neighborhoods.",
    goodFor: ["Founders who like recurring routes", "Operators comfortable with outdoor sanitation work", "People who want a lean specialty service"],
    operatorModel: "Strong solo launch business with route focus.",
    teamModel: "Can scale into route techs once recurring density is strong.",
    serviceMode: "Outdoor / mobile",
    difficulty: "Beginner",
    startup_cost_range: "$1,500-$8,000",
    revenue_90_range: "$3,000-$18,000",
    revenue_1yr_range: "$40,000-$130,000",
    margin_range: "35%-55%",
    demandLevel: "High",
    seasonality: "Generally stable with some demand spikes in hot months.",
    recurringRevenuePotential: "High through monthly sanitation plans.",
    recommended_first_offer: "Monthly dual-bin sanitation plan",
    whyAttractive: "Subscription-style sanitation service can become highly route efficient in the right neighborhoods.",
    whyPeopleStartIt: "The service is niche, low-noise, and easy to explain once customers understand the convenience.",
    pros: ["Recurring subscription potential", "Niche positioning", "Route density upside", "Simple offer packaging"],
    cons: ["Requires sanitation professionalism", "Need route density", "Some customer education required"],
    bestFitOperatorType: "A route-focused operator who enjoys recurring service and clear process.",
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
    tools: ["Pressure washer", "Sanitizer concentrate", "Drain-safe runoff plan", "PPE gear", "Bin hooks", "Odor treatment", "Route planner", "Receipt template"],
    equipment: ["Pressure washer", "Sanitation chemical setup", "Bin handling tools", "PPE", "Route bins"],
    vehicleNeeds: ["Truck, trailer, or van-based mobile cleaning setup", "Organized water and sanitation storage"],
    requiredItems: ["Cleaning setup", "Sanitation PPE", "Insurance", "Recurring billing setup", "Phone and CRM"],
    optionalItems: ["Custom trailer rig", "Branded route vehicle", "Odor-treatment upsell inventory", "Neighborhood signage"],
    softwareNotes: {
      Scheduling: "The business wins when monthly routes are clustered tightly by neighborhood."
    },
    commonLicenseCategories: ["General business license", "Wastewater or runoff questions", "Sanitation-related local guidance"],
    localAgencyPrompts: ["Are there runoff, drain, or sanitation rules for mobile bin cleaning in this city?", "Do I need a general business license for a monthly bin sanitation route?"],
    commercialAutoNote: "Recommended because the vehicle functions as the mobile service platform.",
    equipmentCoverageNote: "Useful if you invest in a more custom rig or specialized cleaning setup.",
    questionsToAskAgent: ["Does the policy cover runoff-related damage claims?", "How should I describe the mobile sanitation setup on the policy?"],
    starterOffer: "Monthly dual-bin sanitation plan.",
    standardOffer: "Monthly or biweekly sanitation with odor treatment and lid/detail clean.",
    premiumOffer: "Premium sanitation plan with odor treatment, reminder notifications, and route priority.",
    addOns: ["Extra bin", "Odor treatment", "One-time reset clean", "Biweekly service"],
    recurringOption: "Monthly or biweekly recurring sanitation subscription.",
    minimumPriceGuidance: "Use a route-aware minimum so low-density areas do not erode the model.",
    sampleUpsells: ["Add extra bin", "Upgrade to biweekly", "Add odor treatment"],
    pricingNotes: ["Density and number of bins matter more than just service time.", "One-time reset cleans often deserve separate pricing."],
    bestFirstLeadSources: ["Neighborhood groups", "Google Business Profile", "Route-flyer drops"],
    onlineSources: ["Google Business Profile", "Neighborhood Facebook groups", "Nextdoor", "HOA community boards"],
    offlineSources: ["Door hangers", "Neighborhood flyers", "HOA or property manager relationships"],
    localOutreachIdeas: ["Target suburban family neighborhoods", "Offer same-street signup incentives", "Use hot-weather smell messaging carefully but professionally"],
    referralIdeas: ["Pet waste removal", "Landscapers", "HOAs", "Property managers"],
    neighborhoodMarketingIdeas: ["Monthly route openings by subdivision", "Bin-day reminder marketing", "Neighbor referral incentives"],
    socialProofIdeas: ["Sanitized bin before/after", "Odor-treatment proof", "Review snippets around convenience and cleanliness"],
    beforeAfterContentIdeas: ["Bin lid and interior cleaning comparison", "Route-day content", "Odor-treatment story posts"],
    googleBusinessProfileGuidance: ["Use keywords around trash bin cleaning, bin sanitation, and odor control.", "Ask reviews to mention convenience and cleanliness."],
    leadResponseProcess: ["Ask how many bins, service address, and preferred day after pickup.", "Tag one-time reset vs subscription interest."],
    quotingProcess: ["Use subscription pricing first, with extra-bin and one-time reset logic clearly separated.", "Clarify pickup-day scheduling assumptions."],
    schedulingProcess: ["Route based on local trash pickup patterns.", "Send reminder or completion notifications if included."],
    jobPrep: ["Review pickup calendar and route notes.", "Stage chemicals, PPE, and service equipment.", "Check runoff plan before the day starts."],
    completionChecklist: ["Bins cleaned", "Odor treatment applied if included", "Area left tidy", "Service note logged"],
    invoicing: ["Use recurring autopay for subscription accounts.", "Keep one-time reset jobs separate from route billing."],
    reviewRequestProcess: ["Ask after the customer sees and smells the difference.", "Keep the message practical and professional."],
    followUpProcess: ["Prompt one-time customers into a subscription.", "Reactivate paused accounts before hot-weather peaks."],
    executionFocus: [
      "Set pickup-day rules, route radius, and monthly subscription pricing.",
      "Launch neighborhood-first outreach in one routeable service area.",
      "Refine density pricing and one-time reset pricing after early jobs.",
      "Install autopay and completion-note habits for every customer.",
      "Grow recurring route density and add simple odor-treatment upsells.",
      "Document route, sanitation, and notification SOPs so the brand feels clean and professional."
    ],
    advancedSystems: [
      "Pickup-day route automation",
      "Subscription conversion follow-up from one-time jobs",
      "Neighbor referral campaigns"
    ]
  },
  {
    id: "holiday-light-installation",
    name: "Holiday Light Installation",
    tags: ["low5k", "low10k", "crew", "outdoor", "high", "seasonal"],
    summary: "A premium seasonal exterior service with strong visual appeal, upsell potential, and high-value holiday urgency.",
    teaser: "Seasonal premium service with strong property visibility and meaningful ticket sizes in a short window.",
    goodFor: ["Operators comfortable on ladders", "Founders who like project-based premium installs", "People who can market urgency and aesthetics"],
    operatorModel: "Can launch small, but crew support quickly improves install and takedown efficiency.",
    teamModel: "Naturally crew-based as display scale grows.",
    serviceMode: "Outdoor / on-site",
    difficulty: "Moderate",
    startup_cost_range: "$2,500-$12,000",
    revenue_90_range: "$6,000-$40,000",
    revenue_1yr_range: "$40,000-$180,000",
    margin_range: "30%-50%",
    demandLevel: "High",
    seasonality: "Heavily seasonal around Q4 and holiday periods.",
    recurringRevenuePotential: "Moderate through annual returning clients and storage/service plans.",
    recommended_first_offer: "Roofline + entryway light install package",
    whyAttractive: "Premium visual results, seasonal urgency, and recurring annual renewals can make the business attractive.",
    whyPeopleStartIt: "Customers pay for convenience, design confidence, and safety during a short high-value season.",
    pros: ["Premium pricing", "Strong visual marketing", "Seasonal urgency", "Annual repeat clients possible"],
    cons: ["Short season", "Safety matters", "Storage and takedown operations require planning"],
    bestFitOperatorType: "An organized operator who can sell premium visual outcomes, manage seasonal scheduling, and enforce safety.",
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
    tools: ["Ladders", "Roof safety kit", "Clips and fasteners", "Timers", "Extension cords", "Storage reels", "Install gloves", "Design mockup sheet"],
    equipment: ["Ladders", "Roof safety gear", "Lighting storage", "Timers and cords", "Fastener kit"],
    vehicleNeeds: ["Truck, van, or trailer for ladders, storage reels, and display inventory"],
    requiredItems: ["Safety gear", "Ladders", "Lighting materials", "Insurance", "Design/quote template"],
    optionalItems: ["Storage unit", "Premium custom-cut lighting inventory", "Crew communication tools", "Photo mockup software"],
    softwareNotes: {
      "Graphic design / content": "Simple mockups and proof photos help close premium seasonal work fast."
    },
    commonLicenseCategories: ["General business license", "Contractor registration questions depending on electrical scope", "HOA or local decoration rules in some communities"],
    localAgencyPrompts: ["Does decorative light installation require any contractor or specialty registration here?", "Are there HOA or local restrictions I should remind homeowners to check before installation?"],
    commercialAutoNote: "Recommended because ladders, lights, and gear travel to every project.",
    equipmentCoverageNote: "Useful if you own a meaningful volume of seasonal light inventory and ladders.",
    questionsToAskAgent: ["Does the policy cover ladder and roofline work?", "How should I insure stored lighting inventory between seasons?"],
    starterOffer: "Roofline + entryway light install package.",
    standardOffer: "Front elevation install with timers, clips, and takedown scheduling.",
    premiumOffer: "Custom design, premium install, maintenance, takedown, and storage package.",
    addOns: ["Tree wrap", "Wreath and garland install", "Maintenance visit", "Storage package"],
    recurringOption: "Annual install/takedown/storage client relationship.",
    minimumPriceGuidance: "Price for install labor, takedown, maintenance, and storage, not just initial install time.",
    sampleUpsells: ["Add tree wrap", "Upgrade to annual storage package", "Add maintenance coverage"],
    pricingNotes: ["Clarify whether lights are customer-supplied or company-supplied.", "Include takedown timing and storage rules in the quote."],
    bestFirstLeadSources: ["Neighborhood proof posts", "Google Business Profile", "Past-customer annual renewal list", "HOA communities"],
    onlineSources: ["Google Business Profile", "Facebook community groups", "Instagram visual proof", "Neighborhood apps"],
    offlineSources: ["Yard signs", "Door hangers before season", "Referral asks from past clients", "HOA-safe community outreach"],
    localOutreachIdeas: ["Launch pre-book campaigns before the season starts", "Offer limited install slots to create urgency"],
    referralIdeas: ["Landscapers", "Realtors", "HOA boards", "Painters", "Pressure washers"],
    neighborhoodMarketingIdeas: ["Same-street install visibility", "Annual route pre-booking", "Holiday display gallery by neighborhood"],
    socialProofIdeas: ["Nighttime home photos", "Customer holiday review snippets", "Install highlight reels"],
    beforeAfterContentIdeas: ["Dark roofline to lit display", "Tree wrap transformation", "Holiday curb-appeal showcase"],
    googleBusinessProfileGuidance: ["Use keywords for holiday lights, Christmas light installation, and seasonal display install.", "Ask reviews to mention professionalism, safety, and visual result."],
    leadResponseProcess: ["Ask home type, roofline complexity, desired display style, and whether the lights are supplied.", "Log install, takedown, and storage interest separately."],
    quotingProcess: ["Use design tiers and clarify install, maintenance, takedown, and storage assumptions.", "Be explicit about electrical limitations and weather delays."],
    schedulingProcess: ["Book install windows early and reserve takedown routes later in the season.", "Send confirmation reminders and prep notes."],
    jobPrep: ["Review design, ladder plan, and safety setup.", "Stage clips, cords, timers, and inventory by property."],
    completionChecklist: ["Lights tested", "Timers set", "Safety check complete", "Photo proof saved", "Takedown notes logged"],
    invoicing: ["Use deposit plus balance structure for larger packages.", "Track annual renewals and storage clients separately."],
    reviewRequestProcess: ["Ask once the homeowner sees the display at night and feels the holiday result.", "Use a premium service tone."],
    followUpProcess: ["Rebook annual customers before the next season.", "Offer storage and maintenance follow-up after takedown."],
    executionFocus: [
      "Define supply model, install tiers, and takedown/storage structure.",
      "Launch pre-book marketing before the season compresses and show strong night proof.",
      "Refine design-based quoting and install timing after early jobs.",
      "Install maintenance, takedown, and review request workflows.",
      "Build annual renewal clients and route density while protecting install capacity.",
      "Document install, takedown, and storage SOPs to make the short season efficient."
    ],
    advancedSystems: [
      "Annual renewal campaigns",
      "Takedown and storage workflow automation",
      "Premium display upsell sequences"
    ]
  },
  {
    id: "garage-door-service",
    name: "Garage Door Service",
    tags: ["low5k", "low10k", "solo", "indoor", "outdoor", "mobile", "high"],
    summary: "A high-trust home-service niche with urgent repair demand, strong ticket sizes, and excellent local search value.",
    teaser: "Urgent homeowner need, premium trust positioning, and strong service-call economics when handled professionally.",
    goodFor: ["Mechanically inclined operators", "Founders comfortable with home service sales", "People who want urgent-demand local service"],
    operatorModel: "Can launch solo with a controlled scope and strong safety discipline.",
    teamModel: "Can scale into multiple service vans or helper-supported install days.",
    serviceMode: "Indoor / outdoor / mobile",
    difficulty: "Moderate",
    startup_cost_range: "$3,500-$14,000",
    revenue_90_range: "$8,000-$35,000",
    revenue_1yr_range: "$100,000-$260,000",
    margin_range: "30%-50%",
    demandLevel: "High",
    seasonality: "Stable year-round because breakdowns are need-driven.",
    recurringRevenuePotential: "Moderate through tune-up plans and property-manager relationships.",
    recommended_first_offer: "Tune-up + balance + safety check service",
    whyAttractive: "Urgent repair demand and strong homeowner trust value support premium service-call positioning.",
    whyPeopleStartIt: "The service solves a painful problem quickly and can command strong average tickets with a professional process.",
    pros: ["Urgent demand", "Strong local search intent", "Premium trust positioning", "Good property-manager channel"],
    cons: ["Safety risk", "Technical accuracy matters", "Scope and parts discipline are critical"],
    bestFitOperatorType: "A technically disciplined service operator who communicates clearly and respects safety rigorously.",
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
    tools: ["Torsion winding bars", "Socket and wrench sets", "Lubricants", "Cable tools", "Safety clamps", "Diagnostic checklist", "PPE", "Service inventory bins"],
    equipment: ["Garage door service tools", "Safety clamps", "Winding bars", "Inventory bins", "Diagnostic gear"],
    vehicleNeeds: ["Van or truck with organized part and tool storage", "Safe transport for springs, rollers, and hardware inventory"],
    requiredItems: ["Safety tools", "Insurance", "Diagnostic checklist", "Parts organization", "Phone and CRM"],
    optionalItems: ["Expanded parts inventory", "Second technician support", "Priority scheduling system", "Tune-up membership flow"],
    softwareNotes: {
      CRM: "Track door type, opener type, spring size, service history, and parts used for each property."
    },
    commonLicenseCategories: ["General business license", "Contractor or specialty trade questions in some states", "Electrical scope rules if opener installs or wiring are involved"],
    localAgencyPrompts: ["Does garage door repair require contractor registration or a specialty license here?", "What changes if I install openers or perform electrical-related work?"],
    commercialAutoNote: "Recommended because the service vehicle carries tools and parts daily.",
    equipmentCoverageNote: "Useful if stocked inventory and specialty tools are meaningful business assets.",
    questionsToAskAgent: ["Does the policy cover garage door failure after service if workmanship is alleged?", "How should I cover service inventory and specialty tools in the van?"],
    starterOffer: "Tune-up, balance, and safety-check service.",
    standardOffer: "Tune-up plus common roller, cable, or hardware repair package.",
    premiumOffer: "Priority diagnostic and repair package with parts coordination and opener performance review.",
    addOns: ["Roller upgrade", "Opener tune-up", "Weather seal replacement", "Property manager priority service"],
    recurringOption: "Annual safety and tune-up plan for households or landlords.",
    minimumPriceGuidance: "Always charge for the service call and diagnostic time; do not turn it into free estimating.",
    sampleUpsells: ["Add opener tune-up", "Upgrade rollers", "Enroll in annual safety plan"],
    pricingNotes: ["Separate service call, diagnostic, labor, and parts clearly.", "Be explicit about safety limits and when full replacement is a better path."],
    bestFirstLeadSources: ["Google Business Profile", "Property managers", "Realtors", "Local urgent-need search traffic"],
    onlineSources: ["Google Business Profile", "Local search ads if disciplined", "Neighborhood groups", "Property manager forums"],
    offlineSources: ["Property manager visits", "Realtor and handyman referrals", "Truck signage"],
    localOutreachIdeas: ["Market safety and fast response rather than discounts", "Target landlords and property managers with annual tune-up plans"],
    referralIdeas: ["Handymen", "Realtors", "Property managers", "Painters", "General contractors"],
    neighborhoodMarketingIdeas: ["Safety-check seasonal reminders", "New-homeowner tune-up offer", "Landlord portfolio service messaging"],
    socialProofIdeas: ["Review snippets around reliability and professionalism", "Organized service-van visuals", "Service-call outcome graphics"],
    beforeAfterContentIdeas: ["Roller or track improvement closeups", "Safety check explanation content", "Garage-door curb appeal posts"],
    googleBusinessProfileGuidance: ["Use keywords around garage door repair, opener tune-up, spring repair, and safety checks.", "Ask reviews to mention speed, clarity, and professionalism."],
    leadResponseProcess: ["Ask door symptoms, opener behavior, and safety concerns immediately.", "Identify emergencies vs scheduled tune-ups clearly."],
    quotingProcess: ["Lead with service-call pricing and explain likely repair paths.", "Avoid remote overpromising without inspecting the system."],
    schedulingProcess: ["Hold emergency windows in the calendar if urgent repairs are part of the model.", "Confirm access and vehicle clearance before arrival."],
    jobPrep: ["Review likely parts and door type.", "Stage safety tools and inventory bins.", "Check vehicle stock before dispatch."],
    completionChecklist: ["Door balance and safety check complete", "Parts installed correctly", "Customer educated on next steps", "Invoice and notes sent"],
    invoicing: ["Invoice service call and parts cleanly.", "Use deposits if special-order parts or replacements are required."],
    reviewRequestProcess: ["Ask once the door is working smoothly and the safety concern is resolved.", "Use trust and professionalism language."],
    followUpProcess: ["Re-open replacement or additional repair opportunities.", "Offer annual tune-up reminders to completed customers."],
    executionFocus: [
      "Define your launch scope, service-call pricing, and safety boundaries clearly.",
      "Launch trust-first local search positioning and partner outreach to landlords and realtors.",
      "Refine triage, parts assumptions, and diagnostic workflow after early service calls.",
      "Install clean invoicing, note-taking, and review request habits.",
      "Add annual tune-up plans and property-manager relationships for steadier repeat work.",
      "Document intake, diagnostics, and closeout SOPs so the service feels expert and controlled."
    ],
    advancedSystems: [
      "Emergency-vs-standard dispatch workflow",
      "Annual tune-up reminder campaigns",
      "Property-manager priority service pipeline"
    ]
  }
];

export const businesses: Business[] = serviceSeeds.map(buildBusiness);

export const tierUpgradePaths: Record<SubscriptionTier, SubscriptionTier | null> = {
  preview: "core",
  core: "pro",
  pro: "elite",
  elite: null
};

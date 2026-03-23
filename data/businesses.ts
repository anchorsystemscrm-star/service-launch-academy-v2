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
      goal:
        `Build the launch infrastructure for ${seed.name}. Success looks like one clear starter offer, a working admin stack, ` +
        "and a business that can answer leads the same day without improvising.",
      tasks: [
        `Choose the exact jobs included in "${seed.starterOffer}" and list what is not included so scope stays controlled.`,
        "Register the business, open the business bank account, and secure insurance documents before meaningful outreach begins.",
        "Set up the business phone, CRM, quoting template, invoicing flow, and calendar blocks before the first lead comes in.",
        "Buy only the required launch gear, label the setup, and stage the vehicle or storage so daily deployment is simple.",
        "Set a minimum price, travel zone, and service radius so you do not underquote the first month.",
        "Publish or refresh Google Business Profile, service-area copy, offer page, and proof photos so the market sees one focused service."
      ],
      benchmarks: seed.phaseBenchmarks[0]
    },
    {
      title: "Phase 2: First Customers",
      goal:
        `Turn attention into paid work for ${seed.name}. Success looks like consistent lead handling, same-day quotes, ` +
        "and the first batch of completed jobs with proof and reviews.",
      tasks: [
        "Push one starter offer across your strongest local channels instead of marketing too many offers at once.",
        "Answer every inbound lead fast, collect the right intake details, and book the next step before ending the conversation.",
        "Batch estimates by geography, send quotes the same day, and give the customer one simple decision path.",
        "Photograph the job before and after, then save customer notes, pricing, and objections in the CRM after every visit.",
        "Ask for a review while the result is still fresh and the customer can clearly see the value.",
        "Review weekly numbers for lead source, quote speed, close rate, and average ticket so weak channels get cut early."
      ],
      benchmarks: seed.phaseBenchmarks[1]
    },
    {
      title: "Phase 3: Operating Rhythm",
      goal:
        "Turn the early wins into a repeatable operating rhythm. Success looks like cleaner pricing, tighter scheduling, " +
        "and delivery checklists that make the work easier to repeat.",
      tasks: [
        "Turn the best-selling offer into a checklist with setup, execution, closeout, and upsell notes.",
        "Install a weekly admin block for lead review, estimate follow-up, invoicing, and partner outreach.",
        "Raise weak quotes by improving scope clarity, travel rules, and add-on design before reaching for discounts.",
        "Create a repeat-service or reactivation pathway where the service allows it, even if it starts as a light reminder system.",
        "Ask every happy customer for one review and one referral source rather than hoping repeat business appears on its own.",
        "Track where the best jobs come from and keep only the channels that produce profitable work."
      ],
      benchmarks: seed.phaseBenchmarks[2]
    },
    {
      title: "Phase 4: Systemize & Scale",
      goal:
        "Install cleaner systems so growth does not create chaos. Success looks like documented SOPs, reliable follow-up, " +
        "and a business that can protect margin as volume rises.",
      tasks: [
        "Document the intake, quote, schedule, job, invoice, review, and follow-up flow in plain English.",
        "Install missed-call text-back, quote reminders, and customer reminders so fewer leads die from delay.",
        "Set firm capacity rules for service area, minimum price, travel zone, and acceptable job types.",
        "Use Starter, Standard, and Premium packages to make sales conversations faster and easier for beginners.",
        "Reactivate old quotes and completed jobs with a structured follow-up campaign rather than waiting for referrals only.",
        "Set the next 30-day target for leads, jobs, reviews, and revenue, then match weekly actions to those targets."
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
      summary: "Choose the offer, lock the basics, and remove launch friction.",
      actions: [
        week1,
        "Open the bank account, connect branded email, and set up one clean pipeline for new lead, quoted, booked, completed, and follow-up.",
        `Write the quote template for "${seed.starterOffer}" with inclusions, exclusions, travel rules, and the minimum acceptable price.`,
        "Stage the required tools, photo process, payment method, and review link so the first customer experience feels complete instead of improvised."
      ]
    },
    {
      title: "Week 2",
      summary: "Go live with focused local visibility and disciplined lead handling.",
      actions: [
        week2,
        "Publish the launch offer on Google Business Profile, one neighborhood platform, and one social profile with proof-based wording.",
        "Answer every inquiry fast, request missing photos immediately, and log source plus next action before moving on.",
        "Prepare one simple flyer, text template, and referral ask so outreach is consistent instead of made up each day."
      ]
    },
    {
      title: "Week 3",
      summary: "Run real quotes, tighten the sales process, and finish early jobs cleanly.",
      actions: [
        week3,
        "Time the estimate, setup, production, cleanup, and drive segments so pricing starts reflecting reality.",
        "Capture before-and-after proof on every completed job and note what sold, what slowed the job, and what should be upsold next time.",
        "Tighten your phone and text language around the three most common objections: price, timing, and trust."
      ]
    },
    {
      title: "Week 4",
      summary: "Turn the first month into repeatable operating standards.",
      actions: [
        week4,
        "Write the first production checklist, review request flow, and Day 2 or Day 7 quote follow-up sequence.",
        "Review the first month of numbers by lead source, close rate, average ticket, and gross margin assumptions.",
        "Cut or pause the weakest channel and double down on the lead source that produced the cleanest jobs."
      ]
    },
    {
      title: "Month 2",
      summary: "Move from reactive hustle into a weekly operator rhythm.",
      actions: [
        month2,
        "Set fixed calendar blocks for marketing, estimates, admin, collections, and route production so the week has structure.",
        "Refine add-ons, recurring pathways, and job minimums using real first-month data instead of guesswork.",
        "Add one partner channel and one repeatable neighborhood play that can be run every week."
      ]
    },
    {
      title: "Month 3",
      summary: "Systemize the business and prepare the next growth decision.",
      actions: [
        month3,
        "Document SOPs for intake, reminders, quoting, scheduling, closeout, and review collection so another person could follow them.",
        "Set month-four targets for lead volume, close rate, average ticket, repeat work, and review count.",
        "Decide whether the best next move is higher pricing, denser routes, stronger follow-up, or selective labor support."
      ]
    }
  ];
}

function buildScripts(seed: ServiceSeed): Script[] {
  const serviceName = seed.name.toLowerCase();

  return [
    {
      title: "Launch Offer Script",
      body:
        `Hi [Name], this is [Your Name] with [Business Name]. We help local customers with ${serviceName}.\n` +
        `We are currently booking a focused launch offer: "${seed.starterOffer}".\n` +
        "If you send me your address plus a couple photos, I can text back the likely price range, what is included, and the next opening."
    },
    {
      title: "Estimate Follow-Up",
      body:
        `Hi [Name], I am following up on the ${serviceName} quote I sent over.\n` +
        "Based on the scope, I can still hold a spot on [Day / Window] if you would like to move forward.\n" +
        'If the quote looks good, just reply "book it" and I will lock the visit and send the confirmation details.'
    },
    {
      title: "Review Request",
      body:
        `Thanks again for trusting us with your ${serviceName} project.\n` +
        "If the work looked the way you hoped, would you mind leaving a short review and mentioning the service, communication, and result?\n" +
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
      notes:
        notes["Business phone"] ??
        "Use a dedicated number with voicemail, call recording if helpful, and missed-call text-back so leads do not die when you are on a job."
    },
    {
      category: "CRM",
      tool: "Anchor Systems or a lightweight pipeline CRM",
      requirement: "required",
      notes:
        notes["CRM"] ??
        "Every lead should live in one pipeline with source, scope notes, quote amount, next follow-up date, and won or lost reason."
    },
    {
      category: "Website",
      tool: "Simple one-page site on Framer, Webflow, or Carrd",
      requirement: "recommended",
      notes:
        notes["Website"] ??
        "Early on, one clean page is enough if it clearly shows service area, offer structure, proof photos, and one strong call to action."
    },
    {
      category: "Domain / email",
      tool: "Google Workspace",
      requirement: "required",
      notes:
        notes["Domain / email"] ??
        "Use a branded domain and business email so estimates, invoices, and review requests feel legitimate from the first contact."
    },
    {
      category: "Scheduling",
      tool: "Calendly, Acuity, or CRM-based scheduling",
      requirement: "recommended",
      notes:
        notes["Scheduling"] ??
        "Use scheduling that supports estimate blocks, confirmation texts, and route-friendly time windows instead of vague all-day promises."
    },
    {
      category: "Invoicing",
      tool: "Stripe Invoicing, QuickBooks, or CRM invoice tools",
      requirement: "required",
      notes:
        notes["Invoicing"] ??
        "Invoice immediately after approval, keep payment links simple, and track unpaid jobs so collections never depend on memory."
    },
    {
      category: "Review management",
      tool: "Google review link + CRM automation",
      requirement: "recommended",
      notes:
        notes["Review management"] ??
        "Review requests work best when the link is ready, the timing is immediate, and the customer is told what kind of feedback helps."
    },
    {
      category: "Estimates / proposals",
      tool: "Quote template in CRM or Joist / QuoteIQ style tool",
      requirement: "required",
      notes:
        notes["Estimates / proposals"] ??
        "Quotes should show scope, exclusions, timing, expiration, and upsell paths so the customer can say yes without more back-and-forth."
    },
    {
      category: "Team communication",
      tool: "Slack or simple SMS group threads",
      requirement: "optional",
      notes:
        notes["Team communication"] ??
        "Use this once jobs involve helpers, recurring site notes, or route changes that must be confirmed in real time."
    },
    {
      category: "Notes / docs",
      tool: "Notion, Google Docs, or Apple Notes",
      requirement: "recommended",
      notes:
        notes["Notes / docs"] ??
        "Store scripts, SOPs, site notes, pricing rules, objections, and partner lists in one simple operating manual."
    },
    {
      category: "Graphic design / content",
      tool: "Canva",
      requirement: "optional",
      notes:
        notes["Graphic design / content"] ??
        "Use it for before-and-after posts, flyers, route promos, and proof graphics that make the business look polished without a designer."
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
        note: "Buy the smallest reliable setup that can deliver the starter and standard offer well. Avoid premium upgrades until revenue proves the need."
      },
      {
        label: "Insurance",
        range: seed.costs.insurance,
        note: "Put coverage in place before real volume starts so you can show proof fast and avoid launching with preventable risk."
      },
      {
        label: "Marketing",
        range: seed.costs.marketing,
        note: "Spend early money on proof assets, a local offer, and repeatable channels. Do not scatter launch spend across too many experiments."
      },
      {
        label: "Software",
        range: seed.costs.software,
        note: "Keep the stack lean: phone, CRM, quoting, scheduling, and invoicing matter more than fancy extras."
      },
      {
        label: "Miscellaneous",
        range: seed.costs.misc,
        note: "Reserve cash for fuel, PPE, consumables, uniforms, replacements, and the small operating costs that surprise first-time owners."
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
    leadResponseProcess: [
      "Respond within five minutes during business hours or trigger a missed-call text-back that asks for address, photos, and the main problem.",
      ...seed.leadResponseProcess,
      "Tag the lead source, urgency, and service area before you move on so later reporting is accurate.",
      "End every lead conversation with one clear next step: photos requested, quote promised, or estimate time booked."
    ],
    quotingProcess: [
      "Review the scope before naming a price. If the job is unclear, slow down and request better photos or a site visit.",
      ...seed.quotingProcess,
      "Send the quote the same day whenever possible with scope, exclusions, minimums, and a simple acceptance instruction.",
      "Set an automatic follow-up task before you close the lead so the estimate does not vanish into your inbox."
    ],
    schedulingProcess: [
      "Offer specific windows, not vague promises, and keep travel grouped by neighborhood whenever possible.",
      ...seed.schedulingProcess,
      "Send a day-before confirmation with arrival window, prep expectations, and any access reminders.",
      "Update the calendar the moment the job is booked so route planning, labor, and materials stay accurate."
    ],
    jobPrep: [
      "Review the scope, route, customer notes, and required materials the night before or at the start of the route.",
      ...seed.jobPrep,
      "On arrival, confirm the scope with the customer before full setup so surprises are addressed early.",
      "Document anything that could change the quote or outcome before work starts."
    ],
    completionChecklist: [
      "Pause before leaving and compare the finished job against the original scope, not your memory of the work.",
      ...seed.completionChecklist,
      "Save final photos, note add-on opportunities, and log anything that should trigger a future follow-up.",
      "Do not leave without confirming the customer knows the work is complete and what happens next."
    ],
    invoicing: [
      "Invoice immediately after the job is approved or at the contract milestone you established in advance.",
      ...seed.invoicing,
      "Make payment simple with card or ACH links and note any deposit, balance due, or next service already scheduled.",
      "If payment is not collected same day, create a follow-up task before the day ends."
    ],
    reviewRequestProcess: [
      "Ask only after the customer has seen the result and sounds satisfied. Timing matters more than volume.",
      ...seed.reviewRequestProcess,
      "Send the direct review link immediately instead of promising to send it later.",
      "Track who was asked, who reviewed, and who needs one polite reminder."
    ],
    followUpProcess: [
      "Create the next follow-up date before closing the job so repeat business is planned instead of accidental.",
      ...seed.followUpProcess,
      "Use a specific reason for the next contact such as season, maintenance interval, partner referral, or open quote reminder.",
      "Review the follow-up queue weekly and remove stale leads only after multiple clear attempts."
    ]
  };
}

function buildPromptSuggestions(seed: ServiceSeed): PromptSuggestions {
  const serviceName = seed.name.toLowerCase();

  return {
    setup: [
      `Help me verify the licenses, permits, and insurance questions I should check before offering ${serviceName} in [city, state].`,
      `Build me a beginner startup checklist for launching ${serviceName} with a budget of ${seed.startup_cost_range}.`,
      `What should I buy first and what can wait if I am starting a ${serviceName} business around "${seed.starterOffer}"?`
    ],
    pricing: [
      `Help me create Starter, Standard, and Premium pricing for ${serviceName} using "${seed.starterOffer}" as the entry offer.`,
      `What should my minimum job price and travel rule be for ${serviceName} in my market?`,
      `Write a simple response for when a ${serviceName} customer says the quote is higher than they expected.`
    ],
    marketing: [
      `Write a Google Business Profile description for my ${serviceName} company that sounds premium and local, not generic.`,
      `Give me 10 first-customer lead generation ideas for ${serviceName} that work in a single ZIP code.`,
      `Write three before-and-after social posts I can use to market ${serviceName} without sounding cheap.`
    ],
    operations: [
      `Build me a step-by-step job checklist for ${serviceName}, from intake to payment collection.`,
      `Help me create a fast lead intake form for ${serviceName} so I can quote faster and avoid scope mistakes.`,
      `Write a recurring follow-up plan for past ${serviceName} customers based on the service cycle and seasonality.`
    ],
    sales: [
      `Write a phone script for selling "${seed.starterOffer}" without sounding pushy.`,
      `Help me turn one ${serviceName} quote into a higher-ticket package with useful upsells.`,
      `Write a short text follow-up that reopens an unbooked ${serviceName} estimate without discounting immediately.`
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
        "Not legal advice. Licensing and permit rules change by state, county, and city. Always verify the current rules with the local agencies before selling work.",
      whereToCheck: [
        "City or county business licensing office",
        "State secretary of state or business registration portal",
        "State contractor, trade, environmental, or transportation agency if the service touches regulated work",
        "Your insurance agent, local chamber, or SBA resource center for practical filing guidance"
      ],
      checklist: [
        "Register the business entity or sole proprietorship and store the filing confirmation in one shared folder.",
        "Verify whether a local business license, service-area permit, or home-occupation permit is required before marketing.",
        "Ask whether the service triggers any contractor, hauling, environmental, chemical, or specialty trade rules.",
        "Confirm whether sales tax, disposal registration, route permits, or permit pull obligations apply to the exact work you plan to sell.",
        "Store the license numbers, registration IDs, renewal dates, EIN, and agency contact notes in one operating file."
      ],
      commonCategories: seed.commonLicenseCategories,
      agencyPrompts: seed.localAgencyPrompts
    },
    insuranceGuidance: {
      generalLiability:
        "Carry general liability before meaningful job volume so you can provide proof quickly, protect against property damage claims, and avoid selling work you cannot responsibly insure.",
      commercialAuto: seed.commercialAutoNote,
      workersComp:
        "If you hire help, use recurring subcontracted labor, or move toward a crew model, ask exactly when workers' compensation or its local equivalent becomes mandatory.",
      equipmentCoverage: seed.equipmentCoverageNote,
      questionsToAsk: seed.questionsToAskAgent,
      documentsToKeep: [
        "Certificate of insurance",
        "Policy declarations page",
        "Agent contact information",
        "Vehicle or trailer schedule if relevant",
        "Coverage renewal dates",
        "Incident reporting steps"
      ]
    },
    offerPricing: buildOfferPricing(seed),
    acquisitionPlan: buildAcquisitionPlan(seed),
    operationsSetup: buildOperations(seed),
    promptSuggestions: buildPromptSuggestions(seed),
    scripts: buildScripts(seed),
    previewTeasers: [
      {
        title: "Core turns the idea into an operating plan",
        description:
          `Preview shows the model. Core unlocks the actual launch path for ${seed.name}, including setup, pricing, tools, workflows, and the week-by-week plan.`,
        items: [
          "Full startup checklist, tools, budget buckets, and requirements",
          "Pricing structure, licensing questions, insurance guidance, and offer design",
          "Operator workflow for lead response, quoting, scheduling, closeout, and follow-up"
        ]
      },
      {
        title: "Pro adds guided coaching inside the workflow",
        description:
          "Use service-specific AI prompts to sharpen pricing, tighten sales language, improve operations, and make better week-to-week decisions.",
        items: [
          "Prompt starters for setup, marketing, pricing, operations, and sales",
          "Help with objections, offer design, and local lead generation",
          "More useful coaching once you are actively quoting and delivering work"
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
    summary:
      "A mobile exterior cleaning business with fast visual proof, short sales cycles, and straightforward starter offers. It works especially well for operators who can sell curb appeal, batch jobs by neighborhood, and keep setup simple.",
    teaser:
      "Launch with one clear driveway offer, turn every job into before-and-after proof, and build route density fast.",
    goodFor: [
      "First-time founders who want a service the customer can understand in seconds",
      "Operators comfortable with outdoor field work, route planning, and physical setup",
      "Anyone who wants a proof-heavy business that sells well through before-and-after content"
    ],
    operatorModel:
      "Strong solo owner-operator launch. One disciplined person can quote, sell, and complete starter jobs without a crew if the service area stays tight.",
    teamModel:
      "Usually scales into a 2-person crew once route density improves, larger exterior packages sell, or soft-wash work gets added.",
    serviceMode: "Outdoor / mobile residential and light commercial field service",
    difficulty: "Beginner-friendly if scope stays simple and chemical handling plus runoff rules are respected",
    startup_cost_range: "$1,500-$4,500",
    revenue_90_range: "$4,000-$22,000",
    revenue_1yr_range: "$45,000-$130,000",
    margin_range: "40%-65%",
    demandLevel: "High in most homeowner markets because curb appeal and maintenance are easy to value",
    seasonality:
      "Strongest in spring through fall in most markets. Warm regions can operate nearly year-round, while colder regions need weather-aware scheduling.",
    recurringRevenuePotential:
      "Moderate. Annual house, driveway, patio, storefront, HOA, and property-manager maintenance can become a strong repeat layer.",
    recommended_first_offer: "Driveway + walkway wash starter package",
    whyAttractive:
      "The customer sees the difference immediately, which makes marketing easier, quoting faster, and review collection more natural than many home services.",
    whyPeopleStartIt:
      "It can be launched lean, the offer is easy to understand, and a few strong before-and-after jobs create real local sales assets quickly.",
    pros: [
      "Very strong before-and-after proof",
      "Simple starter offer for beginners",
      "Easy to batch by neighborhood or subdivision",
      "Natural upsell path into patios, house washing, and annual refresh plans"
    ],
    cons: [
      "Weather and water access can disrupt the day",
      "Runoff, chemical use, and overspray need real discipline",
      "Cheap pricing hurts fast because setup and drive time are real",
      "Equipment reliability matters more than many beginners expect"
    ],
    bestFitOperatorType:
      "A responsive field operator who likes route-based work, fast lead follow-up, visible transformation, and direct local marketing rather than long commercial sales cycles.",
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
      "3,000-4,000 PSI commercial-grade pressure washer",
      "Surface cleaner sized for residential concrete",
      "Hose reels for pressure hose and garden hose",
      "Nozzle kit with labeled tips",
      "Downstream injector or soft-wash chemical application option",
      "PPE kit including eye protection, gloves, and boots",
      "Extension cords and water-source adapters",
      "Cones, caution signs, and overspray-control supplies"
    ],
    equipment: [
      "Pressure washer unit",
      "Surface cleaner",
      "Hose reel and hose storage system",
      "Chemical containers with secure transport",
      "Fuel cans and spill-control basics",
      "Tarps, cones, and property-protection supplies"
    ],
    vehicleNeeds: [
      "Pickup, van, or trailer setup that keeps the machine, hoses, and chemicals secure",
      "Space for organized hose deployment so setup and breakdown stay fast",
      "Water tank optional depending on market, property type, and local water access realities"
    ],
    requiredItems: [
      "Commercial-grade washer with reliable startup",
      "Surface cleaner for profitable flatwork",
      "General liability coverage",
      "Dedicated business phone and missed-call text-back",
      "Simple quote template with surface and stain notes"
    ],
    optionalItems: [
      "Soft-wash setup for siding-safe upsells",
      "Portable water tank for properties with poor access",
      "Branded shirts for trust on residential streets",
      "Canopy, yard signs, or route-day signage for neighborhood marketing"
    ],
    softwareNotes: {
      "Business phone": "Set up missed-call text-back that asks for address, photos, and surface type so field time does not kill inbound conversion.",
      CRM: "Track property type, water access, stain type, and quote follow-up timing so routes and pricing get sharper fast.",
      Scheduling: "Use neighborhood estimate blocks and weather-aware reschedule templates.",
      "Estimates / proposals": "Separate driveway, walkway, patio, house-wash, and stain-treatment line items so upsells feel clean instead of improvised."
    },
    commonLicenseCategories: [
      "General business license",
      "Water runoff or environmental guidance",
      "Local contractor registration in some markets",
      "Wastewater disposal questions if chemical-heavy services are added"
    ],
    localAgencyPrompts: [
      "Do I need a runoff recovery, wastewater disposal, or environmental permit for exterior washing in this city or county?",
      "Are there restrictions on detergents, bleach mixes, or water discharge for residential pressure washing?",
      "Is there any local contractor registration requirement for exterior cleaning work performed on-site?"
    ],
    commercialAutoNote:
      "Strongly worth asking about if you operate a truck, van, or trailer daily for jobs or carry mounted equipment as part of the business setup.",
    equipmentCoverageNote:
      "Worth discussing once the machine, reels, chemicals, and trailer setup would be expensive or disruptive to replace quickly.",
    questionsToAskAgent: [
      "Would overspray, surface damage, or runoff-related claims be treated as covered property damage under my liability policy?",
      "How should I list the trailer, hose reels, and mobile equipment on the policy?",
      "Should chemicals or soft-wash equipment be disclosed separately?"
    ],
    starterOffer: "Driveway refresh up to a standard two-car driveway with walkway rinse and surface-safe treatment.",
    standardOffer: "Driveway, walkway, and patio wash with edge detail, rinse-down, and before-and-after photo proof.",
    premiumOffer: "Full exterior curb-appeal package with driveway, walkway, patio, house wash, and targeted stain treatment.",
    addOns: [
      "Fence wash",
      "Patio furniture rinse",
      "Garage door wash",
      "Spot rust treatment",
      "Front-porch or entry reset"
    ],
    recurringOption:
      "Annual or semiannual exterior refresh plan for homeowners, storefronts, HOAs, and property managers.",
    minimumPriceGuidance:
      "Protect a minimum trip charge even on small jobs. Setup, hose deployment, breakdown, drive time, and cleanup make tiny jobs unprofitable if priced like quick favors.",
    sampleUpsells: [
      "Add patio cleaning while the machine is already on site",
      "Upgrade to a house-wash or front-entry bundle",
      "Bundle fence panels, garage doors, or retaining-wall sections"
    ],
    pricingNotes: [
      "Quote by surface type, soil level, stain type, water access, and setup complexity, not square footage alone.",
      "Be clear about oil, rust, red-clay, and heavy organic stain limits before the customer expects perfection.",
      "If the route is sparse or access is poor, travel and setup should be priced into the job."
    ],
    bestFirstLeadSources: [
      "Google Business Profile",
      "Neighborhood Facebook groups with proof photos",
      "Door hangers in high-visibility subdivisions",
      "Yard signs and neighbor offers on active jobs"
    ],
    onlineSources: [
      "Google Business Profile posts with before-and-after images",
      "Nextdoor in curb-appeal focused neighborhoods",
      "Facebook proof posts and route-day stories",
      "Local service marketplaces only if lead cost and close rate are tracked tightly"
    ],
    offlineSources: [
      "Door hangers",
      "Yard signs at active jobs",
      "Realtor and property manager outreach",
      "Same-street flyer drops after visible transformations"
    ],
    localOutreachIdeas: [
      "Target homes with visibly dirty drives, patios, or entry paths and use photo-first outreach",
      "Offer bundle pricing when adjacent neighbors book the same day",
      "Run a curb-appeal campaign ahead of graduations, parties, and listing season"
    ],
    referralIdeas: [
      "Window cleaners",
      "Landscapers",
      "Realtors",
      "Property managers",
      "Exterior painters"
    ],
    neighborhoodMarketingIdeas: [
      "Run one-subdivision route days with limited slots",
      "Offer same-street bundle pricing when two or more homes book",
      "Leave behind before-and-after cards with a QR code to quote request"
    ],
    socialProofIdeas: [
      "Time-lapse driveway clean videos",
      "Side-by-side dirty vs cleaned concrete comparisons",
      "Customer text screenshots mentioning curb appeal and responsiveness"
    ],
    beforeAfterContentIdeas: [
      "Concrete transformation reels",
      "Patio refresh carousel posts",
      "Fence panel comparison shots",
      "Front-entry curb-appeal photo sets"
    ],
    googleBusinessProfileGuidance: [
      "Use service-area language and mention driveways, patios, house washing, and curb appeal in the profile description.",
      "Upload consistent before-and-after proof from the same angle so prospects immediately understand the service.",
      "Ask reviewers to mention driveway cleaning, professionalism, responsiveness, and how the home looked afterward."
    ],
    leadResponseProcess: [
      "Ask for the address, surface type, visible staining, water access, and whether photos can be texted immediately.",
      "If the lead is in your target area, give a quick price range and either send a photo quote or book a route-friendly estimate window.",
      "Flag risks early such as oil stains, painted surfaces, poor drainage, or homes that may actually need soft washing rather than high pressure."
    ],
    quotingProcess: [
      "Use photo-first quoting when the surfaces are clear, then confirm exact areas included before finalizing the price.",
      "Spell out what is included, what is excluded, and whether stain treatment or water-access assumptions affect the estimate.",
      "Send add-on options for patios, garage doors, or house washing while the customer is already considering curb-appeal work."
    ],
    schedulingProcess: [
      "Group jobs by neighborhood and weather window so setup time and drive time do not eat the day.",
      "Confirm water access, locked gates, parked cars, and any HOA timing rules the day before service.",
      "Give a realistic arrival window and text when you are on the way so the customer is ready when hoses come out."
    ],
    jobPrep: [
      "Inspect overspray risks, delicate surfaces, open windows, outlet covers, and nearby vehicles before unloading fully.",
      "Stage hoses, cones, chemicals, and PPE in the order you plan to use them so setup is controlled.",
      "Take before photos from the same angles you plan to use later for proof and review follow-up."
    ],
    completionChecklist: [
      "Do a final rinse and clean the work area so no muddy residue or hose mess is left behind.",
      "Walk the result with the customer or text the proof photos immediately if they are not home.",
      "Save job notes about stain limits, upsell opportunities, and whether the property should get an annual reminder."
    ],
    invoicing: [
      "Invoice the same day with a simple payment link and attach photo proof when that helps the customer see the result.",
      "Collect on completion whenever possible rather than treating small exterior jobs like net-term invoices.",
      "If an upsell was added on site, itemize it clearly so the customer sees the value instead of feeling surprised."
    ],
    reviewRequestProcess: [
      "Ask for the review as soon as the customer reacts to the cleaned surface, not hours later when the excitement is gone.",
      "Suggest they mention curb appeal, communication, and how quickly the job was scheduled.",
      "If they do not review immediately, send one polite reminder with the direct Google link the next day."
    ],
    followUpProcess: [
      "Send a Day 2 quote follow-up to open estimates and include the next route opening rather than a generic check-in.",
      "Put completed jobs on a seasonal reminder for spring, summer entertaining season, or pre-listing prep depending on property type.",
      "Re-offer patios, fences, and house-wash upgrades to past driveway clients once you have new proof content."
    ],
    executionFocus: [
      "Finalize the driveway starter offer, price floor, travel radius, and stain-expectation language before marketing.",
      "Launch proof-heavy Google and neighborhood posts in one target area and pair them with route-day door hangers.",
      "Run the first estimate block, then tighten quote notes around surface type, stains, and water-access assumptions.",
      "Turn every completed job into proof, a review request, and one relevant upsell or annual reminder.",
      "Build denser route days and promote bundles for patios, garage doors, fences, and house washes.",
      "Document intake, quoting, chemical handling, and closeout steps so the work can scale cleanly."
    ],
    advancedSystems: [
      "Missed-call text-back that requests photos and address automatically",
      "Quote reminder plus neighborhood route-clustering workflow",
      "Annual exterior maintenance reminder campaign with last-job photos"
    ]
  },
  {
    id: "window-cleaning",
    name: "Window Cleaning",
    tags: ["low2k", "low5k", "low10k", "solo", "outdoor", "mobile", "high", "beginner", "recurring"],
    summary:
      "A route-friendly service with lean equipment needs, easy repeat value, and strong referral potential once customers trust the finish quality. It works well because the result is visible, the service can be packaged clearly, and recurring storefront or residential schedules create stability.",
    teaser:
      "Start with a simple exterior clean, layer in tracks and screens, and turn clean quality into repeat routes and referrals.",
    goodFor: [
      "Operators who like clean, detail-driven field work",
      "Founders comfortable with ladders, repetitive systems, and route density",
      "People who want a business where repeat customers and referrals can compound quickly"
    ],
    operatorModel:
      "Excellent solo owner-operator launch when the initial offer stays focused on accessible residential and small storefront work.",
    teamModel:
      "Can remain solo for a long time, then add a helper for larger homes, interior packages, or denser storefront routes.",
    serviceMode: "Outdoor / mobile residential and small commercial route service",
    difficulty: "Beginner-friendly if ladder safety, detail standards, and route planning are taken seriously",
    startup_cost_range: "$1,000-$4,000",
    revenue_90_range: "$3,000-$17,000",
    revenue_1yr_range: "$35,000-$110,000",
    margin_range: "40%-60%",
    demandLevel: "High in markets where curb appeal, storefront visibility, and repeat maintenance are valued",
    seasonality:
      "Residential demand is strongest in spring through fall. Storefront routes and some residential maintenance can continue year-round.",
    recurringRevenuePotential:
      "High. Storefronts, quarterly home cleans, and biannual residential service create strong repeat revenue if the experience is reliable.",
    recommended_first_offer: "Exterior window clean up to 20 panes",
    whyAttractive:
      "Customers immediately understand the value, the tools are simple, and the business rewards reliability, presentation, and detail more than heavy capital spending.",
    whyPeopleStartIt:
      "It is easy to explain, easy to market with proof photos, and one good residential or storefront route can produce repeat revenue quickly.",
    pros: [
      "Lean startup compared with many home services",
      "Strong repeat and referral potential",
      "Easy to batch by neighborhood or storefront block",
      "Natural upsell path into tracks, screens, skylights, and recurring care"
    ],
    cons: [
      "Safety discipline matters on every ladder job",
      "Weather and wind can disrupt the schedule",
      "Detail expectations are high and callbacks hurt trust",
      "Underpricing small jobs leads to weak route economics"
    ],
    bestFitOperatorType:
      "A detail-oriented operator who values clean presentation, process discipline, and building repeat customer trust over chasing one big project at a time.",
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
      "Professional squeegee kit with spare channels and rubber",
      "Extension poles sized for residential reach",
      "Window mop and bucket system",
      "Scraper kit for approved glass only",
      "Microfiber towel loadout for detailing",
      "Ladder stabilizer and ladder safety kit",
      "Shoe covers and drop cloths for interior work",
      "Water-fed pole optional for higher or harder-to-reach exterior glass"
    ],
    equipment: [
      "Core glass-cleaning kit",
      "Ladder system with stabilizer",
      "Belt and holster for efficient movement",
      "Drop cloths and towel system",
      "Detailing towels and track tools"
    ],
    vehicleNeeds: [
      "Car, SUV, van, or pickup that stores ladders and poles safely",
      "Roof rack or secure internal tie-down system for ladder transport",
      "Organized bins for towels, tools, and replacement rubber so the job starts quickly"
    ],
    requiredItems: [
      "Basic professional glass kit",
      "Safe ladder setup",
      "General liability coverage",
      "Business phone and CRM",
      "Quote checklist by pane count and access level"
    ],
    optionalItems: [
      "Water-fed pole system",
      "Pure water setup",
      "Branded shoe covers or drop cloth kit for premium interior work",
      "Route-scheduling software once recurring density grows"
    ],
    softwareNotes: {
      CRM: "Track pane count, story count, screens, track detail requests, and residential versus storefront segments in the same pipeline.",
      Scheduling: "Recurring route customers benefit from standing cadence reminders, neighborhood batching, and weather-reschedule templates.",
      "Review management": "Ask repeat residential customers after the second clean and storefronts after reliability is established."
    },
    commonLicenseCategories: [
      "General business license",
      "Local registration",
      "Contractor registration rarely, but verify for commercial ladder work or larger contracts"
    ],
    localAgencyPrompts: [
      "Are there any height, ladder, or storefront permitting rules for mobile window cleaning in this city?",
      "Do I need a general business license to service storefront routes in this municipality?",
      "Are there any restrictions on mobile service parking or signage in downtown commercial areas?"
    ],
    commercialAutoNote:
      "Recommended once ladders, poles, towels, or pure-water equipment are carried daily for business use.",
    equipmentCoverageNote:
      "Useful if the ladder system, water-fed pole, or pure-water gear would be costly or disruptive to replace.",
    questionsToAskAgent: [
      "Is ladder-related property damage covered under my liability policy?",
      "Should ladders, poles, and pure-water gear be listed under tools or inland marine coverage?",
      "Would interior accidental damage or broken glass be treated as part of my liability exposure?"
    ],
    starterOffer: "Exterior residential window clean up to 20 panes with frame wipe-down on accessible glass.",
    standardOffer: "Interior and exterior window clean with track wipe-down on accessible windows and basic screen handling.",
    premiumOffer: "Full-home refresh with interior, exterior, screens, and detailed track cleaning on accessible windows.",
    addOns: [
      "Screen cleaning",
      "Track detailing",
      "Storm windows",
      "Skylights",
      "Storefront route add-on"
    ],
    recurringOption:
      "Quarterly or biannual residential cleaning plus monthly storefront route service for local businesses.",
    minimumPriceGuidance:
      "Use a minimum visit charge even when pane count looks small. Travel, ladder setup, detailing, and cleanup still require a full professional stop.",
    sampleUpsells: [
      "Add screens and track detail",
      "Upgrade from exterior-only to interior and exterior",
      "Book a recurring cadence before the job closes"
    ],
    pricingNotes: [
      "Price by pane count, access difficulty, story count, and interior versus exterior mix.",
      "Clarify what requires ladder access, what is considered accessible, and what hard-water or stain issues are excluded.",
      "Storefront pricing should reward route density, frequency, and easy recurring scheduling."
    ],
    bestFirstLeadSources: [
      "Google Business Profile",
      "Small storefront outreach",
      "Neighborhood referrals",
      "Partner referrals from pressure washers or cleaners"
    ],
    onlineSources: [
      "Google Business Profile",
      "Facebook neighborhood groups",
      "Local business directories",
      "Instagram or Facebook proof posts with sunlight-through-glass shots"
    ],
    offlineSources: [
      "Main-street storefront visits",
      "Door hangers",
      "Yard signs at residential jobs",
      "Referral cards for complementary home-service partners"
    ],
    localOutreachIdeas: [
      "Visit independent storefronts with a short recurring route offer and a simple first-clean price",
      "Offer same-day add-on pricing for nearby homes while you are already in the area",
      "Use seasonal reminders before holidays, spring cleaning, and real-estate listing periods"
    ],
    referralIdeas: [
      "Pressure washers",
      "House cleaners",
      "Realtors",
      "Property managers",
      "Landscapers"
    ],
    neighborhoodMarketingIdeas: [
      "Route-day specials by subdivision",
      "Bundle two adjacent homes with a small density discount",
      "Leave a screen and track upsell card after exterior-only jobs"
    ],
    socialProofIdeas: [
      "Glass clarity closeups in natural light",
      "Storefront shine photos from sidewalk view",
      "Review screenshots that emphasize professionalism, punctuality, and detail quality"
    ],
    beforeAfterContentIdeas: [
      "Sunlight-through-glass photos",
      "Track detail closeups",
      "Storefront transformation carousel posts",
      "Screen clean comparison shots"
    ],
    googleBusinessProfileGuidance: [
      "Use keywords for window cleaning, screen cleaning, track cleaning, and storefront service in the description and posts.",
      "Ask customers to mention reliability, clean finish, and how the home or storefront looked after service.",
      "Upload proof from both residential and small commercial jobs so the profile supports multiple route types."
    ],
    leadResponseProcess: [
      "Ask pane count, story count, interior or exterior scope, screen needs, and any access issues before giving a range.",
      "Tag leads as residential, storefront, or recurring prospect so your follow-up language matches the job type.",
      "If the customer is price shopping, narrow the scope quickly instead of discounting everything at once."
    ],
    quotingProcess: [
      "Use pane-count pricing with an access modifier so your range is fast but still disciplined.",
      "Clarify screens, tracks, ladder access, storm windows, and stain exclusions in writing before the customer approves.",
      "Show one upsell path that makes sense for the property, such as screens, tracks, or recurring care."
    ],
    schedulingProcess: [
      "Stack route days by neighborhood or storefront block so drive time stays low and the day stays predictable.",
      "Confirm pets, access, alarms, and whether interior work means someone must be present.",
      "Keep weather backups ready so you can reschedule without looking disorganized."
    ],
    jobPrep: [
      "Stage drop cloths, shoe covers, towels, and ladders in the order they will be used.",
      "Inspect ladder points, delicate landscaping, screens, and any existing glass damage before starting.",
      "Take note of hard-water staining or seal failures so the customer hears that limitation before final inspection."
    ],
    completionChecklist: [
      "Do a final glass check from multiple angles, not only from inside the room.",
      "Confirm tracks, screens, and ladder areas are clean before packing out.",
      "Log any recurring service recommendation and next suggested cleaning interval in the CRM."
    ],
    invoicing: [
      "Invoice immediately after the walkthrough or after the storefront stop is complete.",
      "Offer recurring customers autopay or card-on-file so route days stay administrative-light.",
      "If a last-minute add-on was accepted, show it clearly as a separate line item."
    ],
    reviewRequestProcess: [
      "Ask once the customer sees the difference in natural light or from the curb.",
      "For storefront accounts, ask after the second or third clean when reliability has already been proven.",
      "Include a short suggestion to mention professionalism, glass clarity, and how easy the service was to book."
    ],
    followUpProcess: [
      "Send recurring cadence reminders based on the season and the customer's last service type.",
      "Re-open older residential quotes before spring and holiday periods when people notice dirty glass again.",
      "Follow up with storefront prospects monthly using one simple route availability update rather than generic spam."
    ],
    executionFocus: [
      "Set pane-count pricing rules, access rules, and minimum visit pricing before you take real inquiries.",
      "Launch Google Business Profile plus storefront outreach with a clear recurring route angle.",
      "Run the first residential and storefront estimates, then tighten quote notes for screens, tracks, and access.",
      "Install recurring reminders and ask every happy customer about the next cleaning interval.",
      "Build a denser route with storefronts or repeat homes and standardize your upsell language.",
      "Document route scheduling, access prep, and final QA so finish quality stays consistent."
    ],
    advancedSystems: [
      "Recurring route scheduler with automatic reminders",
      "Storefront follow-up workflow by block or business district",
      "Post-service review and referral automation tied to repeat cadence"
    ]
  },
  {
    id: "gutter-cleaning",
    name: "Gutter Cleaning",
    tags: ["low5k", "low10k", "solo", "outdoor", "mobile", "high", "seasonal"],
    summary:
      "A high-demand exterior maintenance service built around prevention, homeowner urgency, and neighborhood density. It sells well because clogged gutters are visible, risky, and easy for customers to understand, especially in leaf-heavy markets.",
    teaser:
      "Sell prevention, show photo proof, and turn seasonal urgency into routeable high-margin neighborhood work.",
    goodFor: [
      "Operators comfortable with ladder-based exterior work and strong safety habits",
      "Founders who like seasonal demand bursts and direct neighborhood marketing",
      "People who can sell property protection and move quickly when weather shifts"
    ],
    operatorModel:
      "Best launched solo if the scope stays controlled and the operator takes ladder safety seriously from day one.",
    teamModel:
      "Often expands into a 2-person crew during fall peaks, taller homes, or heavier cleanout seasons.",
    serviceMode: "Outdoor / mobile residential and light property-maintenance service",
    difficulty: "Moderate because safety, ladder setup, and debris conditions all matter",
    startup_cost_range: "$1,500-$5,500",
    revenue_90_range: "$3,500-$20,000",
    revenue_1yr_range: "$40,000-$120,000",
    margin_range: "35%-55%",
    demandLevel: "High where tree cover, storms, and homeowner maintenance needs are common",
    seasonality:
      "Peaks in fall and storm-prep seasons. Spring cleanouts, downspout service, and light maintenance plans can extend the year.",
    recurringRevenuePotential:
      "Moderate through spring and fall maintenance plans, property-manager programs, and repeat homeowner reminders.",
    recommended_first_offer: "Single-story gutter clean + downspout flush",
    whyAttractive:
      "The pain point is clear, the job often closes quickly, and homeowners are willing to pay to avoid overflow, damage, and ladder risk.",
    whyPeopleStartIt:
      "The service is simple to explain, route density can make the model strong, and visible overflow creates easy local marketing opportunities.",
    pros: [
      "Clear homeowner problem with urgency",
      "Fast quote cycle when photos are good",
      "Strong neighborhood batching in tree-heavy areas",
      "Natural upsell path into maintenance plans and minor related services"
    ],
    cons: [
      "Safety risk is real on every ladder job",
      "Demand is more seasonal than many services",
      "Debris load and home height can swing job difficulty quickly",
      "Poor cleanup or messy closeout damages trust fast"
    ],
    bestFitOperatorType:
      "A practical field operator who communicates clearly, respects safety, and can run simple seasonal campaigns with urgency and professionalism.",
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
      "Extension ladders with stabilizer and standoff",
      "Gutter scoop and hand tools",
      "Leaf blower attachment or blower setup",
      "Bucket with hooks or debris bag system",
      "Work gloves, helmet, and ladder-safe footwear",
      "Harness or fall-protection kit as required",
      "Downspout snake or flush tools",
      "Photo documentation setup for before-and-after proof"
    ],
    equipment: [
      "Ladder system",
      "Debris collection gear",
      "Blower or flush setup",
      "Downspout service tools",
      "Safety cones and property-protection supplies"
    ],
    vehicleNeeds: [
      "Truck, van, or trailer with secure ladder storage",
      "Space for debris bags, cleanup gear, and flush tools",
      "Organized storage so seasonal route days do not become cluttered and slow"
    ],
    requiredItems: [
      "Ladder and stabilizer system",
      "Basic fall and PPE safety gear",
      "General liability coverage",
      "Quote checklist with story count and debris notes",
      "Simple leave-behind or follow-up reminder system"
    ],
    optionalItems: [
      "Gutter camera for proof or inspection",
      "Leaf vacuum or improved debris system",
      "Gutter guard samples for referral or partner upsells",
      "Soft-wash or roofline add-on gear if allowed and safe"
    ],
    softwareNotes: {
      CRM: "Track story count, roofline notes, overflow symptoms, tree coverage, and seasonal follow-up timing for every property.",
      "Estimates / proposals": "Quotes should state height assumptions, debris severity, downspout scope, and whether haul-away and photo proof are included.",
      Scheduling: "Cluster fall routes by neighborhood and build weather backup slots before peak weeks."
    },
    commonLicenseCategories: [
      "General business license",
      "Waste disposal questions in some municipalities",
      "Home-service registration if required locally",
      "Contractor registration questions if repair work expands beyond light maintenance"
    ],
    localAgencyPrompts: [
      "Do I need any disposal or debris-hauling registration for gutter cleanout waste in this city or county?",
      "Are there restrictions or safety rules that apply to ladder-based exterior service work here?",
      "If I offer minor reseal or guard-related work, does that change local licensing requirements?"
    ],
    commercialAutoNote:
      "Recommended because ladders, debris gear, and tools usually travel on every job and often define the service vehicle.",
    equipmentCoverageNote:
      "Useful if ladders, blowers, fall-protection gear, and seasonal equipment represent meaningful business value.",
    questionsToAskAgent: [
      "Would ladder-related property damage or debris-related claims be covered?",
      "Should ladders, blowers, and safety equipment be separately scheduled under tool or equipment coverage?",
      "If I add minor reseal work, does that change anything about my liability profile?"
    ],
    starterOffer: "Single-story gutter clean with downspout flush and basic debris cleanup.",
    standardOffer: "Full gutter and downspout clean with bagged debris removal, site cleanup, and photo proof.",
    premiumOffer: "Full clean, flush, minor reseal touch-up, and gutter-condition report with maintenance recommendations.",
    addOns: [
      "Roofline debris blow-off",
      "Minor reseal",
      "Downspout unclog",
      "Gutter guard inspection",
      "Seasonal maintenance reminder enrollment"
    ],
    recurringOption:
      "Spring and fall maintenance plan with priority scheduling ahead of major storm or leaf-drop periods.",
    minimumPriceGuidance:
      "Use a height- and debris-adjusted minimum so even small homes still cover drive time, ladder setup, cleanup, and risk.",
    sampleUpsells: [
      "Add roofline debris blow-off while setup is already in place",
      "Bundle a second seasonal visit at booking time",
      "Add minor reseal or downspout unclogging where appropriate"
    ],
    pricingNotes: [
      "Clarify story count, roof pitch, gutter length, debris severity, and access challenges before final pricing.",
      "Spell out whether debris haul-away, photo proof, and downspout flushing are included.",
      "Homes with steep pitch, heavy tree cover, or poor access should not be priced like easy ranch homes."
    ],
    bestFirstLeadSources: [
      "Google Business Profile",
      "Door hangers in tree-heavy neighborhoods",
      "Storm-season reminder campaigns",
      "Realtor and property-manager relationships"
    ],
    onlineSources: [
      "Google Business Profile",
      "Nextdoor",
      "Neighborhood Facebook groups",
      "Local homeowner and HOA pages"
    ],
    offlineSources: [
      "Door hangers",
      "Route flyers where allowed",
      "Property-manager outreach",
      "Same-street leave-behinds after visible overflow jobs"
    ],
    localOutreachIdeas: [
      "Target homes with visible overflow, staining, or heavy tree coverage",
      "Run storm-prep campaigns before forecasted weather and again after major events",
      "Use seasonal photo proof to push a simple prevention message instead of discount language"
    ],
    referralIdeas: [
      "Roofers",
      "Window cleaners",
      "Pressure washers",
      "Landscapers",
      "Realtors"
    ],
    neighborhoodMarketingIdeas: [
      "Offer same-street scheduling windows during fall rush",
      "Use spring and fall reminder postcards or door cards",
      "Leave proof photos plus a maintenance CTA after every completed job"
    ],
    socialProofIdeas: [
      "Overflow-to-clean comparison photos",
      "Downspout flush videos",
      "Review screenshots that mention cleanup and responsiveness"
    ],
    beforeAfterContentIdeas: [
      "Debris removal shots",
      "Overflow stain cleanup before-and-after",
      "Photo proof of downspout flow restoration",
      "Leaf-heavy property maintenance transformations"
    ],
    googleBusinessProfileGuidance: [
      "Post before-and-after roofline and gutter proof consistently, especially during seasonal peaks.",
      "Ask customers to mention fast response, clean cleanup, and prevention value in their reviews.",
      "Use seasonal posts tied to storms, leaf drop, and homeowner prevention messaging."
    ],
    leadResponseProcess: [
      "Ask home height, visible overflow symptoms, tree coverage, and whether downspouts are already known to be clogged.",
      "Request photos from the front and rear if possible so you can price faster and reduce unnecessary site visits.",
      "Separate simple cleanouts from homes that may involve repair, steep pitch, or work you do not want to take."
    ],
    quotingProcess: [
      "Quote from photos when possible, but confirm access, story count, and roofline assumptions before finalizing the number.",
      "State clearly whether the price includes downspout flushing, debris bagging, and cleanup around entry or patio areas.",
      "Use a second option for a seasonal maintenance plan so the customer sees the repeat pathway immediately."
    ],
    schedulingProcess: [
      "Cluster by neighborhood during seasonal surges so ladders stay on dense routes instead of crossing town all day.",
      "Send prep reminders about pets, gates, parked cars, and outdoor access before you arrive.",
      "When weather shifts, reschedule decisively and offer the next route block rather than vague future promises."
    ],
    jobPrep: [
      "Inspect ladder points, wet surfaces, roofline condition, and debris load before committing to the exact work method.",
      "Stage bags, flush tools, and ladders so the property stays protected and the work area stays controlled.",
      "Take before photos of clogged sections and any existing damage so the customer sees what was already present."
    ],
    completionChecklist: [
      "Confirm all debris is removed, all downspouts flow, and ground-level cleanup is complete before packing out.",
      "Send or show photo proof of the cleared gutters and note any areas that may need repair later.",
      "Log whether the property should receive a spring, fall, or storm reminder in the CRM."
    ],
    invoicing: [
      "Invoice same day and include photo proof when it helps reinforce the value and the prevention benefit.",
      "For maintenance-plan customers, pre-book or at least tentatively hold the next seasonal visit before closing the job.",
      "Track which property types produce the best margins so future routing and marketing get smarter."
    ],
    reviewRequestProcess: [
      "Ask once the customer sees the cleaned roofline or the photo proof and understands the problem is resolved.",
      "Prompt them to mention professionalism, cleanup, and peace of mind in the review.",
      "If they respond positively by text, send the direct review link immediately instead of waiting."
    ],
    followUpProcess: [
      "Send spring or fall reminder campaigns to completed jobs before the season becomes crowded.",
      "Follow up on open quotes after forecasted storms or high-wind events when the need becomes more urgent.",
      "Offer maintenance-plan enrollment to one-time customers after the first successful visit."
    ],
    executionFocus: [
      "Build height-based pricing rules, a safe starter offer, and a clear list of jobs you will not take.",
      "Launch neighborhood campaigns in tree-heavy areas and update Google Business Profile with overflow proof.",
      "Run the first quotes, tighten story-count assumptions, and refine photo-based pricing rules.",
      "Install seasonal reminder follow-up and send clean proof photos after every completed job.",
      "Add maintenance-plan language and light reseal or downspout upsells where appropriate.",
      "Document safety, quoting, and cleanup SOPs so the seasonal rush stays controlled."
    ],
    advancedSystems: [
      "Photo-based quote intake flow",
      "Seasonal reminder automation before storm and leaf-drop windows",
      "Past-customer reactivation by tree-heavy neighborhood segment"
    ]
  },
  {
    id: "lawn-care-landscaping",
    name: "Lawn Care / Landscaping",
    tags: ["low5k", "low10k", "solo", "outdoor", "mobile", "high", "recurring", "beginner", "seasonal"],
    summary:
      "A classic recurring local service with route density, visible property improvement, and multiple straightforward upsell paths. The model becomes attractive once recurring clients are grouped tightly and pricing protects time between stops.",
    teaser:
      "Win one neighborhood, tighten the recurring route, and turn simple mowing accounts into dependable weekly revenue.",
    goodFor: [
      "Operators who like routine outdoor route work and steady weekly rhythms",
      "First-time founders who want recurring revenue rather than one-off projects only",
      "People comfortable with physical field work, route planning, and seasonal upsells"
    ],
    operatorModel:
      "Strong solo launch if the first offer is narrow, the route is local, and the operator avoids underpriced one-off cleanups.",
    teamModel:
      "Scales naturally into a small mowing or maintenance crew once route density, recurring billing, and service notes are stable.",
    serviceMode: "Outdoor / mobile route service with residential and light commercial potential",
    difficulty: "Beginner-friendly if route discipline, equipment maintenance, and minimum pricing stay tight",
    startup_cost_range: "$1,800-$6,500",
    revenue_90_range: "$3,500-$18,000",
    revenue_1yr_range: "$35,000-$120,000",
    margin_range: "35%-55%",
    demandLevel: "High because recurring maintenance is easy for customers to understand and outsource",
    seasonality:
      "Peak during growing season, with shoulder-season cleanup, mulch, pruning, and leaf work extending revenue in many markets.",
    recurringRevenuePotential:
      "High. Weekly and biweekly maintenance accounts are the core engine, with seasonal add-ons expanding account value.",
    recommended_first_offer: "Front-yard mow, edge, and cleanup package",
    whyAttractive:
      "Once a route is built, recurring revenue becomes more predictable and neighborhood density makes the economics much stronger.",
    whyPeopleStartIt:
      "Customers already understand the need, route clustering works well, and the business can start with one focused maintenance offer before broader landscaping is added.",
    pros: [
      "Recurring weekly or biweekly revenue",
      "Easy neighborhood visibility and route density",
      "Natural add-ons like shrubs, mulch, cleanup, and seasonal resets",
      "Simple customer understanding of the core service"
    ],
    cons: [
      "Equipment upkeep is constant",
      "Seasonality and weather affect the calendar",
      "Tiny properties can become margin traps if priced too low",
      "Travel gaps can quietly destroy route profitability"
    ],
    bestFitOperatorType:
      "A dependable operator who likes routine, route planning, customer retention, and improving simple systems week after week.",
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
      "Commercial push mower or entry-level commercial mower",
      "String trimmer",
      "Backpack or handheld blower",
      "Safety glasses, hearing protection, and gloves",
      "Fuel cans and blade-maintenance basics",
      "Lawn bags and debris containers",
      "Measuring wheel or lot-size note system",
      "Basic trailer or hitch carrier setup"
    ],
    equipment: [
      "Mower",
      "Trimmer",
      "Blower",
      "Fuel and blade-maintenance setup",
      "Trailer or transport carrier",
      "Basic hand tools for touch-up and cleanup"
    ],
    vehicleNeeds: [
      "Truck, SUV, or trailer setup that can move mower and route gear safely",
      "Secure storage for fuel, trimmer line, bags, and small tools",
      "A route-friendly loading setup so unload and reload time stays low across stops"
    ],
    requiredItems: [
      "Reliable mower",
      "Trimmer and blower",
      "General liability coverage",
      "Business phone and CRM",
      "Recurring billing and route notes system"
    ],
    optionalItems: [
      "Commercial zero-turn or upgraded mower",
      "Mulch or cleanup hand-tool kit",
      "Edger attachment or dedicated edger",
      "Trailer racks and route-optimized organization upgrades"
    ],
    softwareNotes: {
      CRM: "Track frequency, gate codes, pets, irrigation notes, yard issues, and upsell opportunities on every account.",
      Scheduling: "Recurring route clients need fixed service days by neighborhood plus weather-reschedule communication that feels professional.",
      Invoicing: "Autopay or card-on-file is one of the biggest quality-of-life upgrades in recurring lawn service."
    },
    commonLicenseCategories: [
      "General business license",
      "Landscape contractor registration in some states",
      "Pesticide or fertilizer rules if treatment work is added",
      "Noise-hour restrictions in some municipalities"
    ],
    localAgencyPrompts: [
      "Do I need a separate license if I offer planting, hardscape, fertilizer, or treatment services?",
      "Are there local noise-hour restrictions that affect route scheduling for mowing crews?",
      "If I haul debris or yard waste, are there disposal or transport rules I should verify?"
    ],
    commercialAutoNote:
      "Recommended once a truck, trailer, or route vehicle is used regularly to transport mowing equipment and fuel.",
    equipmentCoverageNote:
      "Important once the mower, trimmer, blower, and trailer represent a meaningful portion of the business value.",
    questionsToAskAgent: [
      "How should I insure the mower and trailer setup used for recurring route work?",
      "Does my liability policy cover property damage from thrown debris, irrigation heads, or windows?",
      "If I add helpers, when does workers' compensation become necessary?"
    ],
    starterOffer: "Front-yard mow, edge, and cleanup with a simple recurring upgrade path.",
    standardOffer: "Full mow, edge, and blow service with trim detail and optional weed-spot treatment where allowed.",
    premiumOffer: "Premium recurring maintenance with mow, edge, cleanup, shrub touch-up, and seasonal property notes.",
    addOns: [
      "Bush trimming",
      "Mulch refresh",
      "Leaf cleanup",
      "Seasonal property reset",
      "Overgrowth recovery visit"
    ],
    recurringOption: "Weekly or biweekly recurring maintenance plan with seasonal upsell reminders.",
    minimumPriceGuidance:
      "Do not price below the level needed to cover drive time, unload and reload time, route gaps, fuel, and equipment wear. Small lawns still need a professional minimum.",
    sampleUpsells: [
      "Add shrub trimming to recurring accounts",
      "Upgrade one-time jobs into weekly or biweekly service",
      "Bundle seasonal cleanup, leaf work, or mulch refresh"
    ],
    pricingNotes: [
      "Price by property size, terrain, obstacles, gate access, and service frequency, not just by lot size alone.",
      "Recurring accounts should be priced differently from one-time overgrown or neglected properties.",
      "Protect route density. A low-priced property far outside the route is usually a bad client."
    ],
    bestFirstLeadSources: [
      "Google Business Profile",
      "Neighbor referrals",
      "Route-density flyer drops",
      "Yard signs and same-street visibility"
    ],
    onlineSources: [
      "Google Business Profile",
      "Neighborhood Facebook groups",
      "Local homeowner forums",
      "Simple before-and-after lawn and edging posts"
    ],
    offlineSources: [
      "Door hangers",
      "Truck or trailer signage",
      "Yard signs during service",
      "HOA, realtor, and property manager outreach"
    ],
    localOutreachIdeas: [
      "Market on the same street while servicing a property and offer a next-route opening",
      "Run first-cut specials only inside one target subdivision rather than across the whole city",
      "Use a recurring-first message instead of training customers to think one-time cheap cleanup"
    ],
    referralIdeas: [
      "Realtors",
      "Pool cleaners",
      "Pressure washers",
      "Property managers",
      "Landscapers who do higher-end design work"
    ],
    neighborhoodMarketingIdeas: [
      "Same-street recurring pricing windows",
      "Lawn-health or curb-appeal reminder cards",
      "Leaf cleanup and spring-reset campaigns by subdivision"
    ],
    socialProofIdeas: [
      "Striping photos",
      "Edge-detail closeups",
      "Review snippets that mention reliability and consistency"
    ],
    beforeAfterContentIdeas: [
      "Overgrown-to-clean transformation",
      "Edge-detail comparison",
      "Seasonal cleanup reels",
      "Recurring route progress over several visits"
    ],
    googleBusinessProfileGuidance: [
      "Ask reviewers to mention reliability, cleanup quality, and recurring service consistency.",
      "Use service-area and lawn-maintenance keywords in posts, but keep the copy homeowner-friendly and local.",
      "Post recurring route proof, not just dramatic cleanup jobs, so prospects see the normal service quality."
    ],
    leadResponseProcess: [
      "Ask lot size, current condition, service frequency, gate notes, and whether the property is maintained or overgrown.",
      "Log pets, irrigation heads, locked gates, and preferred service day so production is smoother later.",
      "If the prospect only wants a one-time rescue job, decide quickly whether it fits your route or should be priced as a premium exception."
    ],
    quotingProcess: [
      "Quote with route density in mind rather than guessing from square footage alone.",
      "State clearly what is included in mow, trim, edge, cleanup, and what counts as an extra such as heavy overgrowth or bagging.",
      "Present a recurring option first so the customer sees the easier long-term choice."
    ],
    schedulingProcess: [
      "Build recurring route days by neighborhood and protect them from random off-route bookings.",
      "Use weather-adjusted communication that tells the customer exactly when their visit shifts, not just that rain caused a delay.",
      "Keep notes on access, pets, and property quirks directly on the schedule or CRM record."
    ],
    jobPrep: [
      "Check blades, fuel, trimmer line, and route order before leaving or at the start of the morning.",
      "Review property notes around gates, pets, wet ground, and hidden obstacles before unloading.",
      "Walk the property quickly on arrival so you catch toys, hoses, irrigation issues, or storm debris early."
    ],
    completionChecklist: [
      "Confirm cut quality, clean edge lines, and clipped surfaces before putting equipment away.",
      "Clear clippings from walkways, patios, and drive surfaces so the finish feels professional.",
      "Reset gates and note any property issues or upsell opportunities such as shrubs, mulch, or cleanup."
    ],
    invoicing: [
      "Invoice recurring accounts on a predictable cadence so cash flow is stable and customers know what to expect.",
      "Use autopay or card-on-file where possible because recurring service should not require constant manual collections.",
      "Separate one-time cleanups and add-ons clearly so the recurring service price stays easy to understand."
    ],
    reviewRequestProcess: [
      "Ask once the lawn has visibly improved and the customer has seen you show up reliably, not after the very first pass unless the result is dramatic.",
      "For recurring clients, ask after the third successful visit when trust is established.",
      "Suggest they mention reliability, neatness, and how the property looks after service."
    ],
    followUpProcess: [
      "Send seasonal upsell messages for mulch, leaf cleanup, shrub work, and property resets based on the time of year.",
      "Reactivate paused clients before the next growth season with a clear route-day opening, not a generic blast.",
      "Keep a short list of neighbors on the same street who were interested but not ready, then revisit them once you are already nearby."
    ],
    executionFocus: [
      "Define service boundaries, route radius, and the recurring maintenance offer before taking on random yard work.",
      "Launch neighborhood outreach and Google Business Profile proof in one route-density target area.",
      "Run the first estimates and tighten minimum pricing around travel, unload time, and overgrowth risk.",
      "Install recurring billing, review requests, and simple property notes on every account.",
      "Add shrub, cleanup, and seasonal upsells while protecting route density and margin.",
      "Document route operations, service notes, and billing SOPs so recurring work stays easy to manage."
    ],
    advancedSystems: [
      "Recurring route automation with weather-triggered messaging",
      "Past-customer seasonal upsell campaigns",
      "Lead and route mapping by neighborhood density"
    ]
  },
  {
    id: "residential-cleaning",
    name: "Residential Cleaning",
    tags: ["low2k", "low5k", "low10k", "solo", "indoor", "mobile", "high", "beginner", "recurring"],
    summary:
      "A repeat-friendly home service with low startup friction, strong word-of-mouth upside, and clear package design once scope is defined well. It becomes valuable quickly when the operator builds trust, keeps quality consistent, and moves customers onto recurring schedules.",
    teaser:
      "Start with one deep-clean entry offer, earn trust fast, and convert good households into recurring clients.",
    goodFor: [
      "Detail-oriented founders who like structured indoor work",
      "Operators who value repeat relationships and strong customer trust",
      "Beginners who want a lean launch with recurring revenue potential"
    ],
    operatorModel:
      "Excellent solo launch if the service list is tight, travel stays controlled, and the operator uses room-by-room checklists instead of memory.",
    teamModel:
      "Scales naturally into a small recurring cleaning team once enough biweekly and weekly slots are filled.",
    serviceMode: "Indoor / mobile home service",
    difficulty: "Beginner-friendly, but quality control and trust standards need to be higher than many new operators expect",
    startup_cost_range: "$900-$3,000",
    revenue_90_range: "$3,000-$15,000",
    revenue_1yr_range: "$30,000-$90,000",
    margin_range: "35%-55%",
    demandLevel: "High because recurring household cleaning is a familiar and easy-to-value purchase",
    seasonality:
      "Stable year-round with spikes around spring cleaning, moving, hosting season, and holiday-prep periods.",
    recurringRevenuePotential:
      "High. Weekly, biweekly, and monthly maintenance cleans are the core margin and retention engine of the model.",
    recommended_first_offer: "3-hour deep clean for kitchen + bathrooms",
    whyAttractive:
      "Recurring household cleaning compounds well when trust is earned and the customer feels the operator is reliable, careful, and easy to work with.",
    whyPeopleStartIt:
      "The launch can be lean, referrals come early if the work is consistent, and recurring schedules make the business easier to predict.",
    pros: [
      "Strong recurring revenue potential",
      "Low initial equipment complexity",
      "Referral loops are powerful in local communities",
      "Indoor work creates more weather stability than outdoor services"
    ],
    cons: [
      "Quality control must stay high every visit",
      "Trust and professionalism matter heavily in private homes",
      "Physical work can be repetitive",
      "Unclear scope creates customer frustration quickly"
    ],
    bestFitOperatorType:
      "A detail-driven operator who values consistency, household trust, clean systems, and long-term repeat relationships over constant one-time selling.",
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
      "Reliable vacuum",
      "Microfiber cloth system with color coding if desired",
      "Mop and bucket or flat-mop system",
      "Scrub brushes and detail tools",
      "All-purpose cleaner, glass cleaner, and bathroom products",
      "Protective gloves and basic PPE",
      "Portable cleaning caddy or room tote",
      "Laundry or linen management bins if add-ons are offered"
    ],
    equipment: [
      "Vacuum",
      "Cleaning caddy",
      "Mop system",
      "Brush set and detail tools",
      "Reusable towel system",
      "Supply storage bins"
    ],
    vehicleNeeds: [
      "Reliable car or SUV that can carry cleaning bins, a vacuum, and supplies without constant repacking",
      "Organized tote storage so setup at the home is calm and professional",
      "A simple trunk or bin system that keeps chemicals upright and easy to restock"
    ],
    requiredItems: [
      "Vacuum",
      "Core cleaning supply kit",
      "General liability coverage",
      "Business phone and CRM",
      "Room-by-room checklist and quote template"
    ],
    optionalItems: [
      "Steam cleaner",
      "Portable carpet or upholstery spot-cleaner",
      "Branded apron or uniform",
      "Laundry turnover kit for premium or turnover jobs"
    ],
    softwareNotes: {
      CRM: "Track home size, room count, pets, access instructions, recurring cadence, and add-on history for every household.",
      Scheduling: "Recurring cadence and travel time matter more than fancy automation early, but reminders and lockout windows help a lot.",
      "Review management": "Recurring clients are a strong review source once the trust and quality pattern is established."
    },
    commonLicenseCategories: [
      "General business license",
      "Home-service registration",
      "Sales tax questions if selling add-on products or supplies",
      "Home-occupation permit questions if the business is run from home"
    ],
    localAgencyPrompts: [
      "Do I need a local business license or home-occupation permit for residential cleaning services in this city?",
      "Are there any rules around disposal of cleaning chemicals or janitorial products here?",
      "If I hire cleaners as the business grows, are there local employment registrations I should prepare for?"
    ],
    commercialAutoNote:
      "Often not critical on day one, but ask if the vehicle is used daily for business travel and supply transport.",
    equipmentCoverageNote:
      "Optional early because equipment cost is modest, but still worth asking about if replacing it quickly would disrupt service.",
    questionsToAskAgent: [
      "Does my liability policy cover accidental breakage inside the home?",
      "If I keep keys or use lockbox access, is that exposure handled anywhere in the policy?",
      "When I add cleaners, what coverage changes should I expect?"
    ],
    starterOffer: "Kitchen and bathroom deep clean up to three labor hours with clear scope and add-on options.",
    standardOffer: "Whole-home standard clean with kitchen, bathrooms, dusting, floors, and reset detail.",
    premiumOffer: "Deep clean or move-in / move-out package with appliance fronts, baseboards, detail wipe-down, and full reset.",
    addOns: [
      "Inside fridge",
      "Inside oven",
      "Laundry fold",
      "Bed change",
      "Move-in supply reset"
    ],
    recurringOption: "Weekly, biweekly, or monthly recurring maintenance clean.",
    minimumPriceGuidance:
      "Price from labor hours, travel, and supply use rather than trying to match flat low-price competitors. The right households will pay for reliability and trust.",
    sampleUpsells: [
      "Add oven or fridge cleaning",
      "Upgrade to a full deep clean",
      "Convert the home to a recurring biweekly schedule"
    ],
    pricingNotes: [
      "Price by condition, size, room count, and frequency rather than bedroom count alone.",
      "Clarify exactly what is not included in a standard clean so expectations stay aligned.",
      "Deep cleans, move-outs, pet-heavy homes, and cluttered spaces should not be priced like maintenance visits."
    ],
    bestFirstLeadSources: [
      "Google Business Profile",
      "Referral asks from early customers",
      "Local parent groups and neighborhood communities",
      "Realtor and organizer partnerships"
    ],
    onlineSources: [
      "Google Business Profile",
      "Neighborhood Facebook groups",
      "Nextdoor",
      "Apartment, relocation, and local family communities"
    ],
    offlineSources: [
      "Flyers in local businesses where permitted",
      "Realtor partnerships",
      "Property manager introductions",
      "Organizer and nanny referral relationships"
    ],
    localOutreachIdeas: [
      "Offer a first-clean package in one target ZIP code and keep the route tight",
      "Use before-and-after detail proof with a recurring-service call to action",
      "Promote trust, consistency, and relief rather than just low pricing"
    ],
    referralIdeas: [
      "Realtors",
      "Professional organizers",
      "Pet sitters",
      "Nannies",
      "Property managers"
    ],
    neighborhoodMarketingIdeas: [
      "Same-building or same-street recurring specials",
      "Holiday-prep and spring-clean reminders",
      "Move-in and new-baby household reset offers"
    ],
    socialProofIdeas: [
      "Organized-space after shots",
      "Review snippets about trust and reliability",
      "Short clips of detail zones like sinks, counters, and bathrooms"
    ],
    beforeAfterContentIdeas: [
      "Sink and countertop transformations",
      "Bathroom refresh comparison",
      "Move-in reset sequence",
      "Recurring client maintenance quality over time"
    ],
    googleBusinessProfileGuidance: [
      "Encourage reviews that mention trust, punctuality, and detail quality rather than generic compliments only.",
      "Post recurring-clean and deep-clean proof photos consistently so prospects see both maintenance and reset work.",
      "Use local service-area language and household-relief positioning instead of generic janitorial copy."
    ],
    leadResponseProcess: [
      "Ask home size, room count, current condition, pets, and whether the need is standard maintenance, deep cleaning, or move-related.",
      "Confirm frequency, access expectations, and whether clutter or laundry should be considered before you quote.",
      "If the home sounds outside your service standard, narrow the scope or price for the extra labor instead of hoping it works out."
    ],
    quotingProcess: [
      "Quote based on labor estimate, current condition, and add-ons, not just room count.",
      "Send a written scope with included rooms, exclusions, and any prep expectations such as clutter pickup or pet management.",
      "Show the recurring price next to the one-time price so the maintenance path feels obvious."
    ],
    schedulingProcess: [
      "Use recurring schedule blocks for repeat clients and keep one-time deep cleans from destroying your route or week.",
      "Send prep reminders about clutter, pets, access codes, and whether someone needs to be home.",
      "Build enough travel buffer so you do not arrive rushed and start the job already behind."
    ],
    jobPrep: [
      "Review the scope, add-ons, and special notes before entering the home.",
      "Stage supplies by room order so you move through the home with less backtracking and less visual clutter.",
      "Log any fragile items, access issues, or condition surprises before deep work starts."
    ],
    completionChecklist: [
      "Confirm all scoped rooms are complete and that any agreed trash, linens, or resets were handled properly.",
      "Do a final walk for streaks, missed dust zones, and bathroom or kitchen detail spots before leaving.",
      "Log notes about future deep-clean opportunities, recurring cadence fit, and special household preferences."
    ],
    invoicing: [
      "Invoice immediately after the clean or run card-on-file automatically for recurring customers.",
      "Keep add-ons itemized so premium work is visible instead of buried in one total.",
      "If the customer wants recurring service, send the next-date confirmation with the invoice while momentum is high."
    ],
    reviewRequestProcess: [
      "Ask after the second successful recurring clean or immediately after a strong deep-clean result when the home feels transformed.",
      "Use a short, trust-oriented message and suggest they mention reliability, communication, and detail quality.",
      "Send the review link while the customer is still reacting positively to the finished home."
    ],
    followUpProcess: [
      "Send recurring-cadence reminders and dormant-customer reactivation messages tied to season, hosting events, or life changes.",
      "Offer seasonal deep-clean add-ons to recurring clients before holidays, spring, and summer.",
      "Revisit one-time deep-clean clients within 2 to 4 weeks with a recurring conversion message."
    ],
    executionFocus: [
      "Lock the standard, deep-clean, and recurring offer structure with very clear scope.",
      "Launch referral asks and Google Business Profile while targeting one ZIP code or neighborhood cluster.",
      "Run the first quotes and tighten labor-based pricing assumptions using actual job times.",
      "Install checklists, review requests, and recurring billing habits immediately.",
      "Build recurring slots and upsell deep-clean or move-related packages where appropriate.",
      "Document room-by-room SOPs so quality stays consistent as volume grows."
    ],
    advancedSystems: [
      "Recurring schedule automation with reminders and lockout handling",
      "Move-in / move-out quote intake sequence",
      "Dormant-customer reactivation campaign tied to season and household events"
    ]
  },
  {
    id: "commercial-cleaning",
    name: "Commercial Cleaning",
    tags: ["low5k", "low10k", "crew", "indoor", "high", "recurring"],
    summary:
      "A recurring contract service built around reliable SOPs, account management, and disciplined proposals. A few good office or facility accounts can stabilize the business quickly, but the operator has to manage scope, labor, and communication tightly.",
    teaser:
      "Win small recurring accounts first, deliver with clean checklists, and grow into stable contract revenue.",
    goodFor: [
      "Founders who want B2B recurring contracts instead of only homeowner jobs",
      "Operators comfortable with proposals, walkthroughs, and site notes",
      "Teams that can deliver repeatable work with clear quality control"
    ],
    operatorModel:
      "Can start lean with very small suites or offices, but most operators benefit from at least one helper once recurring contracts begin stacking.",
    teamModel:
      "Naturally becomes crew-based as account count rises, especially when after-hours service windows are involved.",
    serviceMode: "Indoor / on-site commercial recurring service",
    difficulty: "Moderate because scope management, labor control, and account retention all matter",
    startup_cost_range: "$1,500-$6,000",
    revenue_90_range: "$4,000-$25,000",
    revenue_1yr_range: "$50,000-$200,000",
    margin_range: "25%-45%",
    demandLevel: "High because offices, suites, and smaller facilities regularly outsource this work",
    seasonality:
      "Fairly stable year-round with lower seasonality than most residential field services.",
    recurringRevenuePotential:
      "High because the business is fundamentally built around recurring janitorial agreements and retained accounts.",
    recommended_first_offer: "Nightly office cleaning trial (2 visits)",
    whyAttractive:
      "Recurring contract value can be meaningful, and a few dependable accounts create a stable base of predictable revenue.",
    whyPeopleStartIt:
      "The model supports recurring billing, structured schedules, and clear SOP-driven delivery once the first accounts are landed.",
    pros: [
      "Recurring contract revenue",
      "Lower seasonality than most residential services",
      "Clear SOP and checklist structure",
      "Strong upside from property-manager and office referrals"
    ],
    cons: [
      "Sales cycles are longer than many consumer services",
      "Proposal discipline matters more than flashy marketing",
      "Labor management gets harder as accounts stack",
      "A bad scope or bad hire can damage account retention fast"
    ],
    bestFitOperatorType:
      "A disciplined founder who can sell professionally, document scopes carefully, and build simple accountability into recurring team delivery.",
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
      "Mop system and buckets",
      "Janitorial cart",
      "Disinfectants and restroom products",
      "Trash liners and consumables",
      "Gloves and PPE",
      "Room-by-room checklist forms",
      "Floor machine rental or partner access when needed"
    ],
    equipment: [
      "Commercial vacuum",
      "Janitorial cart",
      "Mop and bucket system",
      "Disinfecting kit",
      "Microfiber system",
      "Secure chemical and consumable storage"
    ],
    vehicleNeeds: [
      "Car, van, or small work vehicle for moving supplies between accounts",
      "Secure transport and storage for chemicals, PPE, and key site materials",
      "Enough organization to avoid wasting time looking for site-specific items on arrival"
    ],
    requiredItems: [
      "Commercial vacuum",
      "General liability coverage",
      "Proposal template with scope and frequency terms",
      "Business phone and CRM",
      "Account checklist and inspection notes system"
    ],
    optionalItems: [
      "Floor machine or auto-scrubber access",
      "Team messaging software",
      "Key-management lockbox",
      "Quality-control photo or inspection form system"
    ],
    softwareNotes: {
      CRM: "Track proposal stage, site contact, square footage, service frequency, cleaning pain points, and renewal timing for every account.",
      Scheduling: "Recurring service windows, access notes, and alarm procedures should live in one place, not in scattered texts.",
      "Team communication": "Useful early if even one helper or recurring site instructions must be followed consistently."
    },
    commonLicenseCategories: [
      "General business license",
      "Janitorial registration where required",
      "Sales tax or consumable resale questions if applicable",
      "Employer registrations once staff are added"
    ],
    localAgencyPrompts: [
      "Are there janitorial or commercial cleaning registration requirements for B2B accounts in this city or county?",
      "Do I need any special guidance for disinfectants, restroom chemicals, or waste disposal?",
      "If I service medical or higher-regulation spaces, does that change any local requirements?"
    ],
    commercialAutoNote:
      "Recommended if supplies, equipment, or employees move regularly between accounts in a business vehicle.",
    equipmentCoverageNote:
      "Worth asking about once multiple vacuums, carts, floor machines, or larger chemical inventories are in rotation.",
    questionsToAskAgent: [
      "Does the policy cover after-hours commercial sites and key or alarm access exposure?",
      "Should I add employee dishonesty, bonding, or similar protection for commercial accounts?",
      "If I subcontract or hire cleaners, what coverage changes should I expect?"
    ],
    starterOffer: "Two-visit office cleaning trial for a small suite or office.",
    standardOffer: "Recurring office cleaning with trash, restrooms, surfaces, touchpoints, and floor care.",
    premiumOffer: "Recurring service plus periodic deep detail, supply restock, inspection reporting, and priority communication.",
    addOns: [
      "Floor treatment",
      "Restock supplies",
      "Day porter support",
      "Window touch-up",
      "Monthly deep-detail visit"
    ],
    recurringOption: "Nightly, weekly, or multi-visit recurring janitorial contract.",
    minimumPriceGuidance:
      "Do not chase low-margin accounts. Price for labor, travel, supervision, inspection time, consumables, and the risk of after-hours service.",
    sampleUpsells: [
      "Add restroom consumables and restock management",
      "Add floor-care visits or quarterly deep detail",
      "Upgrade the account to a higher-frequency service schedule"
    ],
    pricingNotes: [
      "Scope clarity matters more than aggressive pricing. A clean scope prevents constant complaints and margin leaks.",
      "Spell out frequency, tasks by area, consumables responsibility, and exclusions directly in the proposal.",
      "Trial cleans can help close accounts, but the recurring price must still reflect real labor."
    ],
    bestFirstLeadSources: [
      "Property managers",
      "Office suites",
      "Professional or medical offices where permitted",
      "Local networking groups and direct outreach"
    ],
    onlineSources: [
      "Google Business Profile",
      "Local commercial directories",
      "LinkedIn outreach to office managers or administrators",
      "Targeted email or simple audit-based outbound campaigns"
    ],
    offlineSources: [
      "Direct office outreach",
      "Property manager visits",
      "Networking breakfasts or BNI-style groups",
      "Referral asks from vendors who already serve office spaces"
    ],
    localOutreachIdeas: [
      "Offer a short trial clean to small offices where decision cycles are shorter",
      "Approach buildings where the current cleaning standard visibly looks weak",
      "Lead with reliability, scope clarity, and simple communication rather than cheap pricing"
    ],
    referralIdeas: [
      "Property managers",
      "Commercial realtors",
      "Office furniture vendors",
      "Flooring contractors",
      "Building maintenance vendors"
    ],
    neighborhoodMarketingIdeas: [
      "Target office parks and professional suites, not residential neighborhoods",
      "Use case studies, audit findings, and trial-clean language",
      "Follow one business district repeatedly instead of random citywide outreach"
    ],
    socialProofIdeas: [
      "Professional before-and-after zone photos",
      "Review snippets about reliability and trust",
      "Short walkthrough videos of clean common areas or restrooms"
    ],
    beforeAfterContentIdeas: [
      "Break room reset",
      "Restroom detail clean",
      "Floor treatment improvement",
      "Desk and common-area presentation before-and-after"
    ],
    googleBusinessProfileGuidance: [
      "Use keywords around janitorial, office cleaning, recurring cleaning, and commercial cleaning services.",
      "Ask clients to mention professionalism, consistency, and communication in reviews instead of only saying the space looks nice.",
      "Post content that shows process, inspection quality, and account consistency, not only one dramatic clean."
    ],
    leadResponseProcess: [
      "Ask square footage, frequency needed, access times, decision-maker name, and the main pain points with the current cleaning situation.",
      "Log whether the account is office, suite, clinic, or another facility type so your proposal language matches the environment.",
      "If the account is a poor fit for your schedule, say so early instead of forcing an operationally bad contract."
    ],
    quotingProcess: [
      "Request or perform a walkthrough before final pricing whenever possible because recurring commercial scope is easy to underestimate from words alone.",
      "Define tasks by area, visit frequency, consumables responsibility, and inspection expectations in the written proposal.",
      "Use a trial-clean or short onboarding option when it helps reduce buying friction without damaging your full recurring price."
    ],
    schedulingProcess: [
      "Build service windows around client access rules, alarm procedures, and team availability before promising start dates.",
      "Store recurring site instructions, codes, and contact numbers where the whole team can reliably access them.",
      "Confirm holiday closures, special events, and weekend access changes before they create missed-service problems."
    ],
    jobPrep: [
      "Stage consumables, PPE, keys, and site-specific notes before leaving for the account.",
      "Review the room-by-room checklist and any inspection notes from the last visit so repeated misses are corrected.",
      "Assign responsibilities clearly if multiple people are on site so no zone gets assumed and skipped."
    ],
    completionChecklist: [
      "Confirm trash, restrooms, touchpoints, and floor care are completed according to the contract and not just the team's usual routine.",
      "Secure the site, reset alarms if required, and note any building issues or supply shortages for the client.",
      "Log supervisor or quality notes so account-management follow-up has specifics."
    ],
    invoicing: [
      "Invoice on the agreed contract terms and track aging tightly because B2B accounts can drift if there is no collection rhythm.",
      "Use ACH or autopay where possible for recurring clients to reduce admin load.",
      "If there was extra scope or an add-on visit, document and bill it separately instead of hoping it gets remembered later."
    ],
    reviewRequestProcess: [
      "Ask once the account feels stable and the customer has seen at least a few consistent visits, usually after the first month.",
      "Use professional language focused on reliability, responsiveness, and maintained standards.",
      "For stronger accounts, ask for both a review and an introduction to another local business contact."
    ],
    followUpProcess: [
      "Run monthly account check-ins to confirm satisfaction, scope fit, and opportunities for add-ons or higher frequency.",
      "Re-open older proposals with a short audit-style note rather than a generic follow-up email.",
      "Track renewal or trial-end dates so accounts do not lapse because nobody remembered to ask for the next agreement."
    ],
    executionFocus: [
      "Finalize the trial-clean offer, proposal template, and after-hours site checklist.",
      "Run direct outreach to small offices and property managers with a clean trial-clean CTA.",
      "Walk the first sites and tighten labor assumptions around frequency, site size, and scope.",
      "Install QA checklists, account notes, and recurring billing standards immediately.",
      "Add floor-care or restock upsells to strong accounts while protecting labor margin.",
      "Document site onboarding and quality-control SOPs for repeatable team delivery."
    ],
    advancedSystems: [
      "Recurring account QA reporting and inspection logs",
      "After-hours site onboarding automation",
      "Proposal follow-up and contract-renewal workflow"
    ]
  },
  {
    id: "junk-removal",
    name: "Junk Removal",
    tags: ["low10k", "crew", "outdoor", "mobile", "high"],
    summary:
      "A higher-ticket hauling business with strong local demand, fast response value, and large same-day revenue opportunities. It performs well when the operator prices by volume and difficulty, controls dump economics, and answers urgent leads fast.",
    teaser:
      "Use fast response, photo-based quotes, and clear load pricing to turn clutter problems into high-ticket jobs.",
    goodFor: [
      "Operators with access to a truck or trailer and comfort with physical work",
      "Founders who can manage dump fees, route logic, and same-day lead response",
      "People who like fast-closing local sales and partner-driven lead channels"
    ],
    operatorModel:
      "Can launch solo for small curbside loads or light pickups, but many operators add a helper quickly because job size and safety vary a lot.",
    teamModel:
      "Best economics often show up with a 2-person field crew once larger cleanouts and in-home pickups become common.",
    serviceMode: "Outdoor / mobile hauling and property-cleanout service",
    difficulty: "Moderate because vehicle economics, heavy lifting, and disposal rules matter",
    startup_cost_range: "$4,000-$15,000",
    revenue_90_range: "$6,000-$30,000",
    revenue_1yr_range: "$70,000-$220,000",
    margin_range: "30%-50%",
    demandLevel: "High because customers often need junk gone quickly and do not want to self-haul",
    seasonality:
      "Fairly steady with peaks during moving season, estate cleanouts, renovation cycles, and end-of-lease periods.",
    recurringRevenuePotential:
      "Moderate through property managers, realtors, flippers, contractors, and repeat cleanup relationships.",
    recommended_first_offer: "1/8 truck-load pickup special",
    whyAttractive:
      "Average ticket sizes can be strong, customers often want same-day help, and visible clutter problems convert well with fast response.",
    whyPeopleStartIt:
      "It solves urgent problems, generates meaningful cash flow quickly, and can be marketed simply with photo proof and load-size pricing.",
    pros: [
      "Higher ticket sizes than many local services",
      "Fast close cycle when response is quick",
      "Good partner-channel upside with realtors and property managers",
      "Simple problem and solution language for customers"
    ],
    cons: [
      "Dump fees and disposal choices affect margins heavily",
      "Vehicle wear and tear is real",
      "Physical labor can be intense",
      "Poor volume pricing leads to fast underbidding"
    ],
    bestFitOperatorType:
      "A decisive operator who likes logistics, field work, photo-based selling, and moving quickly on urgent local demand.",
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
      "Pickup truck, box truck, or trailer setup",
      "Heavy-duty gloves and PPE",
      "Ratchet straps and tie-down system",
      "Appliance dolly and moving dollies",
      "Tarps and load-protection supplies",
      "Safety vest and basic first-aid kit",
      "Dump-fee budget tracker",
      "Clear quote-by-volume chart"
    ],
    equipment: [
      "Hauling vehicle or trailer",
      "Dollies and lifting tools",
      "Straps and tarps",
      "PPE",
      "Load-out tools",
      "Cleanup supplies for sweep-out finish"
    ],
    vehicleNeeds: [
      "Truck, dump trailer, or another dependable hauling setup",
      "Secure tie-down system plus a consistent dump, recycling, or donation plan",
      "Enough organization that straps, dollies, and bins are easy to grab on short-notice jobs"
    ],
    requiredItems: [
      "Hauling vehicle",
      "General liability and relevant vehicle coverage",
      "Volume-based load chart",
      "Simple quote script and payment collection method",
      "Dump-fee tracking habit from day one"
    ],
    optionalItems: [
      "Dump trailer upgrade",
      "Additional helper labor",
      "Storage unit for reusable or donation items",
      "Donation, recycling, or contractor debris workflow"
    ],
    softwareNotes: {
      CRM: "Track photo-based quotes, load size, heavy-item flags, dump notes, and partner source on every lead.",
      Scheduling: "Batch jobs by neighborhood and dump route, not just by who called first.",
      "Estimates / proposals": "A clear load-size chart, surcharge notes, and approval text speed up same-day conversion."
    },
    commonLicenseCategories: [
      "General business license",
      "Hauling or waste-transport questions",
      "Local disposal or dump regulations",
      "Contractor registration questions if demolition expands"
    ],
    localAgencyPrompts: [
      "Do I need a hauling or waste-transporter registration for junk removal in this county or city?",
      "Are there disposal, recycling, or handling rules for appliances, electronics, mattresses, or construction debris?",
      "If I add light demolition, does that change my licensing or permit obligations?"
    ],
    commercialAutoNote:
      "Strongly recommended because the service vehicle is central to delivery, carries heavy loads, and represents major exposure.",
    equipmentCoverageNote:
      "Ask about trailer coverage, tool coverage, and physical-damage protection for hauling equipment and accessories.",
    questionsToAskAgent: [
      "Are loading-related property damage claims covered under my liability policy?",
      "How should I insure the trailer, hauling equipment, and tie-down setup?",
      "If I use helpers, what workers' compensation or similar requirements should I prepare for?"
    ],
    starterOffer: "1/8 truck-load curbside pickup special with simple volume-based pricing.",
    standardOffer: "Full-service in-home pickup by volume with labor, loading, and sweep-up included.",
    premiumOffer: "Full cleanout package with labor, donation sorting, heavy-item handling, and final photo proof.",
    addOns: [
      "Appliance haul",
      "Hot tub removal coordination",
      "Shed demo referral",
      "Donation sorting",
      "Storage-unit cleanout"
    ],
    recurringOption:
      "Monthly or as-needed cleanup account for property managers, realtors, contractors, and landlords.",
    minimumPriceGuidance:
      "Never ignore dump fees, labor intensity, stairs, parking, or heavy-item handling when setting the minimum. The truck only matters if the job still leaves margin after disposal.",
    sampleUpsells: [
      "Upgrade curbside pickup to full-service load-out",
      "Add a garage, shed, or attic cleanout while the truck is already out",
      "Bundle appliance, mattress, or donation sorting add-ons"
    ],
    pricingNotes: [
      "Use a clear volume chart and separate heavy, awkward, or specialty-disposal items from normal household junk.",
      "Clarify disposal surcharges for mattresses, appliances, tires, electronics, and construction debris before arrival.",
      "Photo-first quotes speed the process, but stairs, distance, and access must still be verified."
    ],
    bestFirstLeadSources: [
      "Google Business Profile",
      "Realtors",
      "Property managers",
      "Moving-related referrals",
      "Contractor and flipper relationships"
    ],
    onlineSources: [
      "Google Business Profile",
      "Facebook Marketplace or local cleanout-related posts",
      "Local homeowner groups",
      "Realtor networks and neighborhood forums"
    ],
    offlineSources: [
      "Truck signage",
      "Realtor visits",
      "Property manager outreach",
      "Door hangers after neighborhood cleanouts"
    ],
    localOutreachIdeas: [
      "Target neighborhoods during moving season with a same-week pickup message",
      "Offer same-day or next-day curbside windows for simple loads",
      "Approach contractors, painters, and remodelers who occasionally need fast debris help"
    ],
    referralIdeas: [
      "Realtors",
      "Property managers",
      "Movers",
      "Painters",
      "Handymen"
    ],
    neighborhoodMarketingIdeas: [
      "Weekend cleanout specials",
      "Garage purge campaigns",
      "Move-out cleanup route offers",
      "Same-street pickup windows for light loads"
    ],
    socialProofIdeas: [
      "Load-out time-lapse videos",
      "Garage reclaim before-and-after photos",
      "Review snippets about responsiveness and professionalism"
    ],
    beforeAfterContentIdeas: [
      "Garage cleanout before-and-after",
      "Yard debris removal",
      "Estate cleanout transformation",
      "Storage-unit reset content"
    ],
    googleBusinessProfileGuidance: [
      "Use keywords tied to junk pickup, cleanouts, same-day service, and appliance removal.",
      "Post transformation photos plus team professionalism proof, not only truck shots.",
      "Ask reviews to mention responsiveness, speed, care with the property, and how easy the process felt."
    ],
    leadResponseProcess: [
      "Request photos first, then identify stairs, distance to load, heavy items, parking issues, and whether the job is curbside or in-home.",
      "Clarify whether the job is a single-load pickup, garage cleanout, estate cleanout, storage unit, or contractor debris situation.",
      "If the dump economics or access sound bad, price for it immediately rather than hoping the job works at the original number."
    ],
    quotingProcess: [
      "Use photo-first volume estimates whenever possible, but keep heavy-item, stairs, and specialty-disposal surcharges separate.",
      "List exactly what is approved for removal so the crew is not pressured into extra work on arrival.",
      "Give the customer one easy yes path, plus upsell options for adjacent areas or full cleanout scope."
    ],
    schedulingProcess: [
      "Batch jobs by dump route and neighborhood so disposal trips and fuel are controlled.",
      "Confirm access, parking, gate codes, elevator rules, and approved items before dispatch.",
      "Use arrival-window texts because junk jobs often happen on stressful days and customers need clarity."
    ],
    jobPrep: [
      "Review the load chart, dump plan, disposal restrictions, and heavy-item notes before leaving.",
      "Stage dollies, straps, tarps, gloves, and sweep-out tools so the crew can move in a safe sequence.",
      "If the job is stair-heavy or unusually bulky, confirm labor help before you arrive rather than improvising on site."
    ],
    completionChecklist: [
      "Confirm only approved items were removed and that the area was swept or left in the condition promised.",
      "Take final photos, note final volume used, and record any dump-fee adjustments or donation items.",
      "Tell the customer clearly that the job is complete and offer any next-step cleanout opportunities before leaving."
    ],
    invoicing: [
      "Collect at completion or take a deposit before dispatch for larger cleanouts.",
      "Track dump-fee impact by job type so you learn which categories are actually profitable.",
      "If the job expanded on site, update the customer on the revised total before the load is closed out."
    ],
    reviewRequestProcess: [
      "Ask once the customer sees the reclaimed space and feels the relief of the problem being gone.",
      "Prompt them to mention responsiveness, professionalism, and how quickly the team solved the issue.",
      "For partners like realtors or property managers, combine the review ask with a simple invitation to send the next property."
    ],
    followUpProcess: [
      "Send reminder offers to realtors, property managers, and contractors after a successful job, ideally with the same proof photos.",
      "Re-open older quotes when the property is still active or the season makes cleanouts more likely.",
      "Tag completed customers by property type so future estate, move-out, or contractor cleanup offers feel relevant."
    ],
    executionFocus: [
      "Finalize volume-based pricing, dump-fee rules, and one clear starter pickup offer.",
      "Launch fast-response local marketing and partner outreach to realtors and property managers.",
      "Refine photo-based quoting and heavy-item surcharge rules after the first few jobs.",
      "Install completion cleanup, invoice collection, and review request standards immediately.",
      "Build recurring partner channels and tighten route-plus-dump efficiency.",
      "Document load-out, disposal, and customer communication SOPs to protect margin."
    ],
    advancedSystems: [
      "Photo-to-quote intake automation",
      "Partner referral follow-up sequence",
      "Dump-fee and profitability tracking by job category"
    ]
  },
  {
    id: "mobile-car-detailing",
    name: "Mobile Car Detailing",
    tags: ["low2k", "low5k", "low10k", "solo", "mobile", "outdoor", "high", "beginner", "recurring"],
    summary:
      "A visual mobile service with premium presentation potential, routeable appointments, and clean package-based selling. It performs best when the operator controls setup time, sells maintenance plans, and consistently captures high-quality before-and-after proof.",
    teaser:
      "Sell convenience and visible transformation, then turn one-time details into maintenance-plan customers.",
    goodFor: [
      "Founders who like customer-facing service and strong visual branding",
      "Operators comfortable with mobile field work, route planning, and vehicle setup",
      "People who want a service that supports add-ons, content, and repeat maintenance plans"
    ],
    operatorModel:
      "Strong solo launch if package design is simple and the mobile setup stays organized enough to move quickly between jobs.",
    teamModel:
      "Can scale into a small route crew, second vehicle, or dedicated premium-detail support once demand and route density justify it.",
    serviceMode: "Mobile / outdoor service, often at homes, offices, or fleet locations",
    difficulty: "Beginner-friendly if condition-based pricing, setup time, and weather planning are handled well",
    startup_cost_range: "$1,200-$5,000",
    revenue_90_range: "$4,000-$20,000",
    revenue_1yr_range: "$45,000-$140,000",
    margin_range: "40%-65%",
    demandLevel: "High in convenience-driven suburban and professional markets",
    seasonality:
      "Strongest in warmer months, but many markets can run year-round with garage access, covered parking, or mild climates.",
    recurringRevenuePotential:
      "High through monthly or quarterly maintenance plans, multi-car households, and small fleet relationships.",
    recommended_first_offer: "Exterior wash + interior reset package",
    whyAttractive:
      "Packages are easy to present, before-and-after proof is strong, and convenience is a real premium value for busy customers.",
    whyPeopleStartIt:
      "A solo operator can launch lean, create strong content quickly, and build recurring maintenance revenue without a physical shop.",
    pros: [
      "High visual proof and social content value",
      "Simple package and upsell structure",
      "Good repeat potential through maintenance plans",
      "Mobile convenience supports premium positioning"
    ],
    cons: [
      "Weather and parking conditions matter",
      "Setup and breakdown time can quietly hurt margin",
      "Water and power access have to be planned clearly",
      "Condition-based pricing takes discipline"
    ],
    bestFitOperatorType:
      "A polished operator who values presentation, customer experience, repeat business, and a premium feeling from intake through closeout.",
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
      "Microfiber towel system",
      "Buckets with grit guards",
      "Foam cannon or wash setup",
      "Interior brush and detailing tools",
      "Water tank optional depending on market and access",
      "Portable canopy for sun or light weather protection"
    ],
    equipment: [
      "Vacuum",
      "Wash setup",
      "Towel system",
      "Interior brush kit",
      "Polisher",
      "Chemical loadout"
    ],
    vehicleNeeds: [
      "Car, SUV, van, or trailer setup that carries tools, chemicals, towels, and optional water storage in an organized way",
      "A layout that separates clean towels, dirty towels, chemicals, and tools so the setup feels professional",
      "Shade or canopy support helps protect quality and operator stamina on longer jobs"
    ],
    requiredItems: [
      "Wash kit",
      "Vacuum",
      "Interior reset tools",
      "General liability coverage",
      "Business phone and CRM"
    ],
    optionalItems: [
      "Water tank",
      "Extractor",
      "Paint-correction tools and packages",
      "Fleet service setup",
      "Interior steam tools"
    ],
    softwareNotes: {
      CRM: "Track vehicle size, condition, location type, water and power access, and maintenance-plan status for every customer.",
      Scheduling: "Cluster mobile jobs by neighborhood and build setup plus breakdown time directly into the calendar.",
      "Graphic design / content": "Use polished before-and-after graphics and package menus to support premium presentation."
    },
    commonLicenseCategories: [
      "General business license",
      "Water runoff or environmental questions in some municipalities",
      "Fleet or commercial-lot permissions if serving business parking areas"
    ],
    localAgencyPrompts: [
      "Are there runoff restrictions for mobile detailing in this city or county?",
      "Can I perform mobile detailing in public parking lots or are there location restrictions I should know about?",
      "Do any local rules change if I carry water or chemicals in the vehicle daily?"
    ],
    commercialAutoNote:
      "Recommended if the vehicle carries business equipment daily and effectively functions as a mobile shop.",
    equipmentCoverageNote:
      "Useful once polishers, extractors, canopy setups, water tanks, or other mobile gear represent meaningful replacement cost.",
    questionsToAskAgent: [
      "Does the policy cover accidental interior damage, trim staining, or overspray-related property issues?",
      "How should I describe the mobile equipment setup carried in the vehicle?",
      "If I add employees or another detail van later, what should change in the coverage?"
    ],
    starterOffer: "Exterior wash plus interior reset package with clear time and condition limits.",
    standardOffer: "Full interior and exterior detail with trim, tire, vacuum, wipe-down, and touchpoint treatment.",
    premiumOffer: "Premium detail with polish enhancement, stain treatment, and interior restoration touches.",
    addOns: [
      "Odor treatment",
      "Pet hair removal",
      "Engine bay detail",
      "Headlight restore",
      "Multi-car household discount"
    ],
    recurringOption:
      "Monthly or quarterly maintenance detail plan for individuals, families, or small fleets.",
    minimumPriceGuidance:
      "Set a minimum that covers travel, setup, towel handling, drying time, and cleanup before you even start counting detailing labor.",
    sampleUpsells: [
      "Add pet hair removal or odor treatment",
      "Upgrade to a maintenance plan while the vehicle still looks fresh",
      "Add headlight restoration or engine-bay cleaning"
    ],
    pricingNotes: [
      "Price around vehicle size, interior condition, contamination, and labor intensity rather than package names alone.",
      "Heavy pet hair, stain removal, paint correction, and odor treatment should be priced as separate labor or add-on work.",
      "Office-park or fleet jobs should reward density and repeated scheduling."
    ],
    bestFirstLeadSources: [
      "Google Business Profile",
      "Instagram or Facebook proof posts",
      "Office park or fleet outreach",
      "Multi-car household referrals"
    ],
    onlineSources: [
      "Google Business Profile",
      "Instagram reels",
      "Facebook before-and-after posts",
      "Local car-enthusiast or neighborhood groups"
    ],
    offlineSources: [
      "Office parking lot outreach where allowed",
      "Flyers for apartment or HOA communities",
      "Fleet or small-business visits",
      "Referral cards at tint, wrap, or repair shops"
    ],
    localOutreachIdeas: [
      "Offer mobile convenience to busy professionals and families who value time more than chasing the cheapest wash",
      "Target apartment complexes, office parks, and multi-car households where convenience is easy to sell",
      "Run same-day route specials by neighborhood when you already have jobs booked nearby"
    ],
    referralIdeas: [
      "Tint shops",
      "Mechanics",
      "Car wash staff",
      "Real estate agents",
      "Fleet managers"
    ],
    neighborhoodMarketingIdeas: [
      "Weekend detail route signups",
      "Neighborhood wash days",
      "Multi-car household bundle pricing",
      "Maintenance-plan promos after local pollen or weather events"
    ],
    socialProofIdeas: [
      "Interior reset reels",
      "Seat and console before-and-after photos",
      "Review snippets about convenience, punctuality, and finish quality"
    ],
    beforeAfterContentIdeas: [
      "Interior cleanup carousel",
      "Wheel and trim restore shots",
      "Paint gloss comparison",
      "Maintenance-plan progress on the same vehicle over time"
    ],
    googleBusinessProfileGuidance: [
      "Use keywords around mobile detailing, interior detail, exterior detail, and convenience.",
      "Ask customers to mention convenience, communication, and result quality in reviews.",
      "Post clean, premium-looking proof instead of cluttered gear photos so the business feels trustworthy and polished."
    ],
    leadResponseProcess: [
      "Ask vehicle size, current condition, location, and whether shade, water, or power are available at the service site.",
      "Tag leads as maintenance-plan candidate, one-time deep clean, fleet, or convenience-only wash so the offer matches the need.",
      "If the customer sends poor photos, ask for better interior and exterior angles before giving a firm number."
    ],
    quotingProcess: [
      "Use condition-based estimates and explain what changes the price, such as pet hair, staining, or paint correction requests.",
      "Send clear service tiers with expected duration, add-on options, and what is not included in the base package.",
      "Present the maintenance-plan option alongside the one-time detail so repeat revenue starts early."
    ],
    schedulingProcess: [
      "Block setup, breakdown, and drive time between jobs so the calendar reflects the real workday.",
      "Confirm parking, weather backup plan, and site access before the appointment is locked.",
      "Group nearby jobs on the same day so water, towel, and travel logistics stay efficient."
    ],
    jobPrep: [
      "Review the package, add-ons, and condition notes before leaving or before pulling onto the site.",
      "Stage towels, chemicals, tools, and shade setup in workflow order so the job feels controlled.",
      "Take intake photos before starting and note any pre-existing interior wear or exterior issues."
    ],
    completionChecklist: [
      "Do a final exterior and interior quality pass in better light before presenting the vehicle.",
      "Walk the customer through the result, point out completed add-ons, and confirm any limitations that remained.",
      "Save before-and-after photos and tag the customer for maintenance-plan follow-up if the vehicle is a good fit."
    ],
    invoicing: [
      "Invoice on completion and present the maintenance-plan enrollment option while the customer is seeing the finished result.",
      "Use deposits for premium multi-hour jobs or for fleet days that hold significant calendar space.",
      "Itemize specialty add-ons so the customer understands the labor and value behind them."
    ],
    reviewRequestProcess: [
      "Ask right after the customer sees the finished interior and exterior while the transformation is most obvious.",
      "Encourage mentions of convenience, punctuality, and the result quality rather than asking for a vague nice review.",
      "For maintenance customers, ask after the second or third visit once consistency is proven."
    ],
    followUpProcess: [
      "Send maintenance reminders based on driving habits, season, and the package the customer bought.",
      "Follow up on premium package quotes using the intake photos and a simple explanation of the value difference.",
      "Revisit fleet and office-park prospects with grouped scheduling options instead of one-off availability checks."
    ],
    executionFocus: [
      "Finalize the three-package structure, add-ons, and mobile setup checklist.",
      "Launch proof-driven content and map a tight mobile service radius before chasing broad geography.",
      "Run the first bookings and tighten condition-based pricing plus time assumptions.",
      "Install a maintenance-plan pitch and review request at every closeout.",
      "Build route density and fleet or office-park outreach where convenient access exists.",
      "Document intake, staging, and quality-control SOPs so the service feels premium every time."
    ],
    advancedSystems: [
      "Maintenance-plan reminder automation",
      "Fleet and multi-vehicle follow-up campaign",
      "Photo-based upsell workflow after intake"
    ]
  },
  {
    id: "handyman-services",
    name: "Handyman Services",
    tags: ["low5k", "low10k", "solo", "indoor", "outdoor", "mobile", "high"],
    summary:
      "A broad local service business with strong homeowner demand, flexible job mix, and high-trust sales. It works best when the operator defines a tight launch scope, avoids licensed trade work they should not touch, and prices for expertise rather than favor-style labor.",
    teaser:
      "Sell a clear fix-it bundle, avoid scope creep, and turn solved homeowner headaches into repeat work and referrals.",
    goodFor: [
      "Skilled generalists who can solve small home problems cleanly",
      "Operators comfortable working in occupied homes and communicating clearly",
      "Founders who want flexible job mix and strong referral upside"
    ],
    operatorModel:
      "Usually launches solo with a tightly defined task list, small job bundles, and strong scope discipline.",
    teamModel:
      "Can scale with helpers or specialty partners once job volume increases and the operator learns which categories are most profitable.",
    serviceMode: "Indoor / outdoor / mobile residential service",
    difficulty: "Moderate because scoping, communication, and licensing boundaries all matter",
    startup_cost_range: "$2,000-$8,000",
    revenue_90_range: "$5,000-$25,000",
    revenue_1yr_range: "$60,000-$180,000",
    margin_range: "30%-50%",
    demandLevel: "High because homeowners constantly need small repairs, installs, and punch-list help",
    seasonality:
      "Generally steady year-round with spikes around moving, listing prep, storm damage, and holiday preparation.",
    recurringRevenuePotential:
      "Moderate through maintenance plans, punch-list programs, landlord relationships, and repeat homeowner trust.",
    recommended_first_offer: "Half-day fix-it bundle (3 small tasks)",
    whyAttractive:
      "Demand is broad, referrals are strong, and a defined starter bundle gives the customer an easy way to buy without asking for a full custom proposal.",
    whyPeopleStartIt:
      "Skilled operators can monetize practical ability quickly and build strong repeat relationships without choosing one narrow specialty immediately.",
    pros: [
      "Broad local demand",
      "Strong referral and repeat value",
      "Flexible upsell path into better projects",
      "Can price for expertise and convenience"
    ],
    cons: [
      "Scope creep risk is constant",
      "Licensing rules vary by task category",
      "Material runs and unknowns can ruin day-block pricing if unmanaged",
      "Trust and communication matter as much as technical ability"
    ],
    bestFitOperatorType:
      "A reliable operator who communicates clearly, scopes tightly, and values craftsmanship, boundaries, and homeowner trust.",
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
      "Drill and driver set",
      "Basic saw options",
      "Stud finder and measuring tools",
      "Socket and wrench set",
      "Step ladder",
      "Drop cloths and surface protection",
      "PPE",
      "Consumables kit with anchors, screws, caulk, and patch supplies"
    ],
    equipment: [
      "Core hand and power tools",
      "Ladder set",
      "Consumables bins",
      "Measurement and layout kit",
      "Vehicle shelving or tool organization"
    ],
    vehicleNeeds: [
      "Van, truck, or organized SUV with clean tool storage",
      "Lockable storage for tools and consumables",
      "Enough organization that the right tool loadout can be chosen based on the task list instead of bringing everything"
    ],
    requiredItems: [
      "Core tool set",
      "General liability coverage",
      "Scope checklist with task triage",
      "Business phone and CRM",
      "Estimate and invoice templates"
    ],
    optionalItems: [
      "Finish nailer",
      "Tile, trim, or specialty tools",
      "Additional saw systems",
      "Helper scheduling setup",
      "Material pickup workflow"
    ],
    softwareNotes: {
      CRM: "Track task list, photos, material needs, customer-supplied items, and jobs that may cross into licensed trade territory.",
      "Notes / docs": "Detailed scope notes matter because handyman jobs vary widely and depend on good documentation.",
      Scheduling: "Use half-day or day-block scheduling when job lists are variable so you are not promising impossible time windows."
    },
    commonLicenseCategories: [
      "General business license",
      "Contractor or specialty trade rules depending on task type",
      "Permit questions for electrical, plumbing, structural, or major exterior work"
    ],
    localAgencyPrompts: [
      "Which handyman tasks are allowed without a trade license in my state or city?",
      "At what point does this type of work require a permit or contractor registration?",
      "Are there task categories I should avoid advertising unless I hold a specific license?"
    ],
    commercialAutoNote:
      "Recommended once tools, ladders, and materials are routinely transported in a business-use vehicle.",
    equipmentCoverageNote:
      "Important if a large share of the business value sits in portable tools, ladders, and organized vehicle storage.",
    questionsToAskAgent: [
      "Are accidental installation errors and resulting property-damage claims covered under my liability policy?",
      "Should portable power tools and ladders be scheduled under inland marine or similar tool coverage?",
      "If I occasionally pick up materials, is that already contemplated in the vehicle coverage?"
    ],
    starterOffer: "Half-day fix-it bundle covering up to three small tasks from a defined approved list.",
    standardOffer: "Single-day punch-list visit with prioritized repairs, install work, and simple homeowner communication.",
    premiumOffer: "Full-day premium service block with planning, sourcing coordination, and detailed finish work.",
    addOns: [
      "Fixture install",
      "TV mounting",
      "Caulking and patching",
      "Material pickup",
      "Additional task bundle"
    ],
    recurringOption:
      "Quarterly home maintenance or landlord punch-list service with priority booking for repeat customers.",
    minimumPriceGuidance:
      "Use a minimum that reflects travel, tool setup, sourcing time, and scope uncertainty. Handyman work becomes unprofitable fast when priced like hourly casual labor.",
    sampleUpsells: [
      "Upgrade to a half-day or full-day block",
      "Add material pickup and sourcing coordination",
      "Book a quarterly maintenance visit for deferred tasks"
    ],
    pricingNotes: [
      "Scope clarity matters more than being the cheapest. Small unknowns can blow up a cheap quote fast.",
      "Exclude licensed electrical, plumbing, gas, or structural work unless you are properly authorized and insured.",
      "Day blocks often work better than hyper-itemized small-task pricing once multiple repairs are involved."
    ],
    bestFirstLeadSources: [
      "Google Business Profile",
      "Realtors",
      "Property managers",
      "Neighborhood referrals",
      "Move-related households"
    ],
    onlineSources: [
      "Google Business Profile",
      "Facebook neighborhood groups",
      "Nextdoor",
      "Local homeowner forums"
    ],
    offlineSources: [
      "Realtor outreach",
      "Property manager outreach",
      "Truck signage",
      "Leave-behind service menu cards"
    ],
    localOutreachIdeas: [
      "Offer a new-homeowner punch-list bundle that solves multiple early move-in tasks",
      "Market landlord turn and move-in fix-it packages where speed matters",
      "Lead with trust, scope clarity, and convenience instead of trying to be the cheapest hourly helper"
    ],
    referralIdeas: [
      "Realtors",
      "Movers",
      "Painters",
      "Cleaners",
      "Property managers"
    ],
    neighborhoodMarketingIdeas: [
      "Seasonal home reset checklist offer",
      "Holiday prep task bundle",
      "Storm-repair or post-storm deferred-task campaigns"
    ],
    socialProofIdeas: [
      "Before-and-after repair shots",
      "Review snippets about reliability and craftsmanship",
      "Short clips of small repairs completed cleanly and efficiently"
    ],
    beforeAfterContentIdeas: [
      "Drywall patch and paint touch-up",
      "Fixture install",
      "Cabinet hardware refresh",
      "Punch-list completion collage"
    ],
    googleBusinessProfileGuidance: [
      "Use keywords around home repair, punch-list work, fixture install, assembly, and maintenance tasks.",
      "Ask reviews to mention trust, communication, and workmanship instead of generic praise.",
      "Post a mix of small-task transformations and organized process photos so the business feels professional, not random."
    ],
    leadResponseProcess: [
      "Ask for photos, exact task list, and desired timing before giving even a rough number.",
      "Identify any task that may trigger trade-license or permit rules before agreeing to the work.",
      "If the task list is scattered, group it into a half-day or day-block offer instead of quoting tiny pieces one by one."
    ],
    quotingProcess: [
      "Scope jobs tightly and separate unknowns, material costs, and any homeowner-supplied items from labor.",
      "Use day-block pricing or clearly itemized small-task bundles depending on how defined the work is.",
      "State what is excluded, especially anything involving hidden conditions, specialty trades, or heavy material handling."
    ],
    schedulingProcess: [
      "Group jobs by area and task type so tool loadouts stay efficient and the day does not become a parts hunt.",
      "Confirm material readiness, access, and whether the customer has purchased any owner-supplied items before arrival.",
      "Leave calendar buffer for material runs, unknowns, and punch-list items that take longer than expected."
    ],
    jobPrep: [
      "Review task order, required tools, and consumables before leaving so you are not improvising in the driveway.",
      "Protect work areas with drop cloths and confirm any homeowner-supplied materials or fixtures before starting.",
      "Take quick reference photos before beginning if installation alignment or finish condition could become a dispute later."
    ],
    completionChecklist: [
      "Confirm each scoped task is complete, functional, and visually finished at the level promised.",
      "Clean the work area, remove scraps, and point out any future issues or deferred tasks to the customer.",
      "Log the next repair, seasonal maintenance item, or referral partner opportunity in the CRM."
    ],
    invoicing: [
      "Invoice on completion with itemized tasks and material reimbursement listed separately from labor.",
      "If the work was done in a day block, summarize what was completed so the customer sees the value of the block.",
      "Collect same day unless contract terms were set differently with a trusted repeat client or partner."
    ],
    reviewRequestProcess: [
      "Ask after a clean, trust-building visit that solved multiple headaches and left the home in good shape.",
      "Encourage mentions of reliability, communication, and quality rather than asking for a generic review.",
      "For realtor or property-manager partners, pair the review ask with a clear invitation to send the next punch list."
    ],
    followUpProcess: [
      "Re-open deferred tasks after the first visit with a practical note about what can be bundled next time.",
      "Offer quarterly maintenance checkups to strong customers or landlords who routinely have punch-list work.",
      "Keep a tagged list of job categories that lead to better referrals so you know which tasks to market more heavily."
    ],
    executionFocus: [
      "Narrow the starter task list and define what work you will not take before marketing broadly.",
      "Launch a punch-list offer and build trust-first Google and referral presence.",
      "Run the first jobs and tighten scope notes, exclusions, and material assumptions.",
      "Install clean completion, documentation, and review request habits.",
      "Build referral loops with realtors and property managers while protecting scope discipline.",
      "Document quoting, task triage, and tool-load SOPs so the operation stays professional."
    ],
    advancedSystems: [
      "Lead triage workflow by task type and licensing risk",
      "Deferred-work follow-up automation",
      "Quarterly maintenance reminder campaign"
    ]
  },
  {
    id: "painting",
    name: "Painting (Interior/Exterior)",
    tags: ["low5k", "low10k", "crew", "indoor", "outdoor", "high"],
    summary:
      "A high-visibility home-service business with strong ticket sizes, premium package potential, and powerful before-and-after proof. It rewards operators who control prep, communication, and finish quality instead of racing to the cheapest square-foot number.",
    teaser:
      "Sell clean prep, visible transformation, and a professional customer experience rather than commodity labor.",
    goodFor: [
      "Operators with finish-work standards and patience for prep",
      "Founders comfortable with estimating, crews, and project sequencing",
      "People who want larger home-service tickets with strong referral value"
    ],
    operatorModel:
      "Can launch with a focused small-job or room repaint offer, but many operators move toward crew support quickly as jobs get larger.",
    teamModel:
      "Well-suited for a small field crew once multi-room, exterior, or faster-turn projects begin stacking.",
    serviceMode: "Indoor / outdoor / on-site project service",
    difficulty: "Moderate because prep, coatings, labor management, and customer expectations all matter",
    startup_cost_range: "$2,500-$10,000",
    revenue_90_range: "$7,000-$35,000",
    revenue_1yr_range: "$80,000-$250,000",
    margin_range: "30%-50%",
    demandLevel: "High in homeowner, pre-listing, and property-refresh markets",
    seasonality:
      "Interior work can run year-round. Exterior demand depends heavily on weather windows and local climate.",
    recurringRevenuePotential:
      "Moderate through property-manager refresh work, landlords, annual touch-ups, and repeat homeowners.",
    recommended_first_offer: "Single-room repaint package",
    whyAttractive:
      "The visual transformation is obvious, price points can be meaningful, and a premium process supports strong local referrals.",
    whyPeopleStartIt:
      "Painting offers visible value, strong average tickets, and a clear path to premium positioning when prep and finish quality are disciplined.",
    pros: [
      "Higher ticket sizes than many local services",
      "Strong before-and-after proof",
      "Premium package potential",
      "Excellent referral and partner value with realtors and property managers"
    ],
    cons: [
      "Prep quality determines whether the job feels premium",
      "Labor management matters quickly",
      "Materials and schedule control can make or break profit",
      "Bad change-order handling creates conflict fast"
    ],
    bestFitOperatorType:
      "A detail-focused operator who can sell clean prep, control expectations, and manage project communication without letting craftsmanship slip.",
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
      "Airless sprayer optional depending on launch scope",
      "Drop cloths and masking supplies",
      "Painter tape",
      "Ladders",
      "Caulk guns and patch tools",
      "Prep tools including sanders and scrapers",
      "Respirators and safety gear"
    ],
    equipment: [
      "Brushes and rollers",
      "Prep tools",
      "Ladders",
      "Drop cloths",
      "Caulk and patch setup",
      "Sprayer optional"
    ],
    vehicleNeeds: [
      "Van or truck for ladders, drop cloths, paint, and prep gear",
      "Protected storage for coatings, finishes, and tools",
      "Enough organization to separate clean finish tools from dusty prep supplies"
    ],
    requiredItems: [
      "Core painting kit",
      "General liability coverage",
      "Estimate template with prep and coating detail",
      "Business phone and CRM",
      "Prep checklist"
    ],
    optionalItems: [
      "Sprayer",
      "Dust containment gear",
      "Crew communication tools",
      "Color consultation materials",
      "Project signage"
    ],
    softwareNotes: {
      CRM: "Track room count, surface condition, repair notes, customer timeline, and color-selection status for every job.",
      "Estimates / proposals": "Quotes should separate prep, coatings, repairs, color changes, exclusions, and schedule clearly.",
      "Graphic design / content": "Use polished before-and-after and color-story content to support premium positioning."
    },
    commonLicenseCategories: [
      "General business license",
      "Contractor registration in some states",
      "Lead-safe or environmental rules for older homes",
      "Permit or specialty rules if repair scope moves beyond painting"
    ],
    localAgencyPrompts: [
      "Does residential painting require contractor registration in this state or city?",
      "Are there lead-safe or environmental requirements for older homes that I need to follow?",
      "At what point does prep or repair work move beyond standard painting in local rules?"
    ],
    commercialAutoNote:
      "Recommended because ladders, coatings, and job gear typically travel on every project.",
    equipmentCoverageNote:
      "Useful once ladders, sprayers, and finish gear become significant business assets.",
    questionsToAskAgent: [
      "Does the policy cover overspray, accidental finish damage, or drips on non-painted surfaces?",
      "Should sprayers, ladders, and other higher-value tools be separately scheduled?",
      "If I hire painters or subs, what coverage adjustments are needed?"
    ],
    starterOffer: "Single-room repaint package with clear prep, coverage, and finish assumptions.",
    standardOffer: "Multi-room interior repaint with prep, patching, and full finish-coat package.",
    premiumOffer: "Premium interior or exterior repaint with detailed prep, premium coatings, project updates, and closeout walkthrough.",
    addOns: [
      "Trim refresh",
      "Door package",
      "Accent wall",
      "Cabinet touch-up",
      "Color consultation"
    ],
    recurringOption:
      "Annual property refresh plan for landlords, property managers, and repeat homeowners.",
    minimumPriceGuidance:
      "Set a minimum that covers prep, masking, material handling, cleanup, and customer communication, not just brush time.",
    sampleUpsells: [
      "Upgrade to trim or door package",
      "Add premium coating or extra-coat upgrade",
      "Bundle another room or exterior touch-up while the crew is already mobilized"
    ],
    pricingNotes: [
      "Prep complexity changes pricing more than square footage alone in many jobs.",
      "Be explicit about repairs, surface condition, color changes, and number of coats.",
      "Exterior work should reflect weather risk, access, and trim complexity instead of a generic per-square-foot shortcut."
    ],
    bestFirstLeadSources: [
      "Google Business Profile",
      "Realtor and property-manager referrals",
      "Neighborhood proof posts",
      "Pre-listing and move-in refresh partnerships"
    ],
    onlineSources: [
      "Google Business Profile",
      "Facebook before-and-after posts",
      "Instagram transformation content",
      "Local homeowner and neighborhood groups"
    ],
    offlineSources: [
      "Realtor visits",
      "Yard signs during projects",
      "Property manager outreach",
      "Referral leave-behinds"
    ],
    localOutreachIdeas: [
      "Target older neighborhoods with visible exterior wear or dated interior colors",
      "Offer move-in and pre-listing refresh packages where speed and presentation matter",
      "Lead with finish quality, prep, and communication rather than discount messaging"
    ],
    referralIdeas: [
      "Realtors",
      "Handymen",
      "Flooring installers",
      "Property managers",
      "Cabinet or trim contractors"
    ],
    neighborhoodMarketingIdeas: [
      "Same-street exterior quote days",
      "Pre-listing refresh campaigns",
      "Color consultation lead magnets",
      "Move-in room package promos"
    ],
    socialProofIdeas: [
      "Trim and wall finish closeups",
      "Customer review snippets about professionalism and cleanup",
      "Before-and-after reels showing prep and finished reveal"
    ],
    beforeAfterContentIdeas: [
      "Room repaint transformation",
      "Exterior trim refresh",
      "Cabinet touch-up carousel",
      "Door and trim upgrade stories"
    ],
    googleBusinessProfileGuidance: [
      "Use keywords tied to interior painting, exterior painting, prep quality, and clean finish work.",
      "Ask reviews to mention cleanliness, communication, punctuality, and finish quality.",
      "Show both the prep process and the finished reveal so prospects understand why your price is not commodity labor."
    ],
    leadResponseProcess: [
      "Ask whether the job is interior or exterior, what surfaces are involved, current condition, desired timeline, and color readiness.",
      "Tag small room jobs separately from larger multi-day projects so your sales process and follow-up stay appropriate.",
      "If prep or repair sounds significant, slow the conversation down and avoid casual ballpark numbers that will likely be wrong."
    ],
    quotingProcess: [
      "Walk prep needs carefully and document repairs, color changes, access issues, and what will be protected.",
      "Separate repairs, premium coatings, extra coats, and add-ons so the customer sees where price differences come from.",
      "Use a clean written estimate with deposit terms, production timing, and what the homeowner needs to do before arrival."
    ],
    schedulingProcess: [
      "Sequence the job around drying time, weather, crew size, and homeowner access before promising a completion date.",
      "Confirm color selections, furniture prep, and site readiness before the team arrives.",
      "Leave room in the schedule for touch-ups and punch-list closeout instead of pretending every project ends perfectly on the last production hour."
    ],
    jobPrep: [
      "Protect floors, furniture, fixtures, and adjacent surfaces thoroughly before opening paint.",
      "Stage ladders, coverings, tools, and materials by room or elevation order so the team moves cleanly.",
      "Review prep and repair notes with the customer before starting so there is alignment on what is being solved."
    ],
    completionChecklist: [
      "Run a punch list before removing coverings so touch-ups are handled while the setup is still in place.",
      "Remove tape, coverings, and job debris fully, then do a clean final walkthrough with the customer.",
      "Save photos, document colors and coatings used, and note future upsell opportunities such as trim, doors, or deferred rooms."
    ],
    invoicing: [
      "Use deposits for multi-day jobs and progress billing when the project size justifies it.",
      "Collect final payment after the punch-list walkthrough confirms the scope is complete.",
      "Document any change orders or added work separately so the final invoice stays clean and defensible."
    ],
    reviewRequestProcess: [
      "Ask once the final walkthrough confirms the clean finish, good communication, and a tidy jobsite.",
      "Encourage mention of professionalism, prep quality, cleanliness, and communication in the review.",
      "Send the review link the same day while the reveal still feels fresh."
    ],
    followUpProcess: [
      "Follow up on deferred rooms, trim packages, or exterior phases that were discussed during the job.",
      "Reconnect with pre-listing and property-manager contacts seasonally when refresh work is common.",
      "Tag past customers by project type so future room-refresh or maintenance outreach is relevant."
    ],
    executionFocus: [
      "Define the small-job starter package, prep standards, and exclusions clearly.",
      "Launch transformation-focused proof and partner outreach to realtors and property managers.",
      "Run the first estimates and refine prep-based pricing assumptions with real job data.",
      "Install walkthrough, punch-list, and review request standards on every job.",
      "Add trim, premium coating, and recurring property-manager upsells where they fit.",
      "Document prep, communication, and closeout SOPs so the brand feels premium at scale."
    ],
    advancedSystems: [
      "Pre-listing partner follow-up automation",
      "Punch-list and milestone communication workflow",
      "Past-customer room-refresh campaign"
    ]
  },
  {
    id: "appliance-repair",
    name: "Appliance Repair",
    tags: ["low5k", "low10k", "solo", "indoor", "mobile", "high"],
    summary:
      "A high-trust home-service business built around diagnostics, communication, and fast-response problem solving. It can command premium pricing because customers value clarity and restored function, especially when the operator handles triage and parts decisions professionally.",
    teaser:
      "Lead with the diagnostic visit, communicate clearly, and turn urgent service calls into trusted repeat relationships.",
    goodFor: [
      "Mechanically inclined founders who enjoy troubleshooting",
      "Operators comfortable entering homes and building trust quickly",
      "People who like technical work, paid diagnostics, and landlord or property-manager channels"
    ],
    operatorModel:
      "Commonly starts as a solo diagnostic and minor-repair business focused on defined appliance categories and fast, professional intake.",
    teamModel:
      "Can stay solo for a long time or eventually scale through specialized technicians, return-visit systems, and van stock management.",
    serviceMode: "Indoor / mobile technical home service",
    difficulty: "Moderate because diagnostic accuracy, safety, and parts workflow are all operationally important",
    startup_cost_range: "$3,000-$12,000",
    revenue_90_range: "$7,000-$30,000",
    revenue_1yr_range: "$90,000-$220,000",
    margin_range: "35%-55%",
    demandLevel: "High because appliance failure is need-driven and often urgent",
    seasonality:
      "Steady year-round because breakdowns are driven by need rather than seasonal demand swings.",
    recurringRevenuePotential:
      "Moderate through property managers, landlords, repeat household trust, and priority response relationships.",
    recommended_first_offer: "Diagnostic + minor repair visit",
    whyAttractive:
      "Urgent need plus technical skill creates pricing leverage, and customers value honest diagnosis even before a full repair is approved.",
    whyPeopleStartIt:
      "The work can be launched without a large crew, and strong diagnostic process quickly separates professional operators from general handymen.",
    pros: [
      "Urgent demand and strong local search intent",
      "Diagnostic expertise supports premium pricing",
      "Good repeat and referral value with landlords and property managers",
      "A solo operator can build a strong reputation quickly"
    ],
    cons: [
      "Parts logistics create extra admin and revisit complexity",
      "Technical mistakes are expensive",
      "Licensing and safety boundaries vary by appliance and task",
      "You need good communication when repairs are deferred or not economical"
    ],
    bestFitOperatorType:
      "A technically disciplined operator who can diagnose calmly, explain clearly, and handle parts or follow-up without losing customer confidence.",
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
      "Nut-driver and wrench sets",
      "Specialty hand tools by appliance type",
      "Parts bins and label system",
      "Service-manual or technical documentation access",
      "PPE and safety gear",
      "Knee pads",
      "Vehicle shelving"
    ],
    equipment: [
      "Diagnostic tools",
      "Hand-tool set",
      "Parts storage",
      "Safety gear",
      "Vehicle shelving",
      "Tablet or note system for manuals and service history"
    ],
    vehicleNeeds: [
      "Van, truck, or organized SUV with secure tool and parts storage",
      "Shelving that supports fast field diagnostics without searching through loose bins",
      "Space for commonly stocked consumables and carefully selected fast-moving parts"
    ],
    requiredItems: [
      "Diagnostic tools",
      "General liability coverage",
      "Business phone and CRM",
      "Service note and invoice templates",
      "Clear diagnostic-fee policy"
    ],
    optionalItems: [
      "Specialty tools by brand or appliance category",
      "Tablet for manuals and diagrams",
      "Common replacement part inventory",
      "Route optimization tools",
      "Warranty-tracking system"
    ],
    softwareNotes: {
      CRM: "Track appliance type, brand, model, symptoms, diagnosis, part needs, and return-visit status on every lead.",
      "Notes / docs": "Keep model-specific notes, recurring fault patterns, and manufacturer quirks in one searchable knowledge base.",
      Scheduling: "Leave buffer for diagnostics, parts runs, and return-visit rescheduling instead of booking every day at 100 percent."
    },
    commonLicenseCategories: [
      "General business license",
      "Electrical, gas, or trade-related rules depending on scope",
      "EPA or specialty handling questions for regulated systems",
      "Local contractor or repair registration in some areas"
    ],
    localAgencyPrompts: [
      "What appliance repair tasks are allowed without a trade license in this state or city?",
      "Do gas, electrical, or refrigerant-related repairs trigger separate licensing or certification rules here?",
      "If I advertise installation as well as repair, does that change local requirements?"
    ],
    commercialAutoNote:
      "Recommended because the vehicle functions as the mobile service platform and carries core tools and stocked parts.",
    equipmentCoverageNote:
      "Important if diagnostic tools, stocked parts, and specialized equipment represent meaningful business value.",
    questionsToAskAgent: [
      "Are accidental installation or repair errors covered if a customer alleges workmanship caused later damage?",
      "Should stocked parts and diagnostic tools be separately covered?",
      "If I carry gas or electrical exposure, is there anything special I should disclose to the carrier?"
    ],
    starterOffer: "Diagnostic visit with a minor repair path if the issue can be resolved on-site.",
    standardOffer: "Diagnostic visit plus common-part replacement with same-day completion when stocked.",
    premiumOffer: "Priority diagnostic service with parts sourcing coordination, follow-up communication, and repair warranty explanation.",
    addOns: [
      "Second appliance inspection",
      "Water-line replacement coordination",
      "Maintenance cleanout",
      "Property-manager service plan",
      "Priority scheduling"
    ],
    recurringOption:
      "Landlord or property-manager priority service relationship with repeat diagnostic and repair support.",
    minimumPriceGuidance:
      "Charge for the diagnostic visit first so travel and expertise are covered even if the customer declines the repair or the unit is not economical to fix.",
    sampleUpsells: [
      "Inspect a second appliance during the same visit",
      "Add a maintenance cleanout or preventive service",
      "Offer priority response for landlords or repeat customers"
    ],
    pricingNotes: [
      "Keep diagnostic fee, labor, parts, and return-visit costs clearly separated.",
      "Do not promise a repair outcome before inspection if symptoms are still vague.",
      "Parts sourcing and follow-up should be priced with admin time in mind, not treated as invisible work."
    ],
    bestFirstLeadSources: [
      "Google Business Profile",
      "Property manager referrals",
      "Local Facebook or Nextdoor urgent-need posts",
      "Landlord and appliance-store relationships"
    ],
    onlineSources: [
      "Google Business Profile",
      "Local search ads if unit economics are disciplined",
      "Property manager groups",
      "Neighborhood platforms"
    ],
    offlineSources: [
      "Property manager visits",
      "Realtor and landlord outreach",
      "Appliance store service relationships",
      "Referral cards with plumbers, HVAC techs, and handymen"
    ],
    localOutreachIdeas: [
      "Target landlords and property managers who need dependable fast response more than bargain pricing",
      "Offer defined diagnostic windows and clean communication rather than vague same-day promises",
      "Build trust-first positioning around honesty, clarity, and repair-or-replace guidance"
    ],
    referralIdeas: [
      "Property managers",
      "Handymen",
      "Plumbers",
      "HVAC technicians",
      "Appliance retailers"
    ],
    neighborhoodMarketingIdeas: [
      "Use trust-focused messaging rather than discount-heavy ads",
      "Promote fast response and clear diagnostics for common appliance problems",
      "Run seasonal maintenance or dryer-vent related education where appropriate"
    ],
    socialProofIdeas: [
      "Review snippets about honesty, troubleshooting, and fast help",
      "Short clips of organized diagnostic workflow",
      "Same-day repair success story graphics"
    ],
    beforeAfterContentIdeas: [
      "Washer or dryer maintenance cleanout",
      "Organized service-vehicle posts",
      "Repair-result explanation graphics",
      "Diagnostic checklist or parts-sourcing content"
    ],
    googleBusinessProfileGuidance: [
      "Use keywords tied to washer repair, dryer repair, refrigerator repair, and diagnostic service.",
      "Ask reviews to mention professionalism, speed, and clarity instead of generic compliments.",
      "Post educational content that shows expertise and reduces fear, not just sales copy."
    ],
    leadResponseProcess: [
      "Ask appliance type, brand, model if available, main symptoms, and urgency before promising anything.",
      "Clarify whether there are gas, electrical, or water issues so you can determine whether the job fits your launch scope.",
      "If the customer cannot provide a model or clear symptom, guide them through the minimum intake instead of guessing on the phone."
    ],
    quotingProcess: [
      "Lead with the diagnostic fee and explain the likely repair path range without overpromising the final repair cost.",
      "Separate the visit fee from labor and parts so the customer understands what is being bought immediately.",
      "If parts are likely, explain the approval and return-visit process before you arrive."
    ],
    schedulingProcess: [
      "Hold enough time for diagnostics and possible parts runs instead of stacking service calls unrealistically.",
      "Confirm model number, symptoms, and access notes before dispatch so you can bring likely tools or common parts.",
      "Reserve a few flexible windows each week for urgent breakdowns if that is part of your positioning."
    ],
    jobPrep: [
      "Review model details, prior notes, and likely parts before leaving for the call.",
      "Stage diagnostic gear, common consumables, and safety tools in the van for fast access.",
      "Know your no-go boundaries before arrival so you do not drift into work you should not perform."
    ],
    completionChecklist: [
      "Document the diagnosis clearly whether the repair was completed or deferred.",
      "Clean the area, test the appliance where appropriate, and explain the next step in plain English.",
      "Save model, symptom, part, and outcome notes so future visits or repeat customers are easier to handle."
    ],
    invoicing: [
      "Invoice the diagnostic visit first, then add approved labor and parts separately.",
      "Use deposits when special-order parts are involved so the business is not floating parts cash unnecessarily.",
      "If the repair is deferred, bill the diagnosis cleanly and note the follow-up task before closing the ticket."
    ],
    reviewRequestProcess: [
      "Ask once the appliance is working and the customer has seen the value of the diagnosis and communication.",
      "Prompt them to mention honesty, professionalism, speed, and explanation clarity.",
      "If they decline the repair but appreciated the diagnosis, you can still ask for a review based on helpfulness and professionalism."
    ],
    followUpProcess: [
      "Check on completed repairs after a short interval when that makes sense for the appliance and warranty promise.",
      "Re-open deferred repair quotes after the customer has had time to consider the part cost or replacement decision.",
      "Build a tagged list of landlord and property-manager accounts for priority follow-up and seasonal check-ins."
    ],
    executionFocus: [
      "Define exactly which appliance categories and repair scope you will take at launch.",
      "Launch trust-focused positioning and fast-response diagnostic messaging.",
      "Refine call triage and diagnostic pricing after early service calls.",
      "Install repair documentation, parts tracking, and review request standards.",
      "Build landlord and property-manager relationships for repeat work.",
      "Document symptom triage, parts follow-up, and service-note SOPs to keep diagnostics sharp."
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
    summary:
      "A route-based recurring service with predictable maintenance demand, strong account retention potential, and premium value in pool-heavy neighborhoods. The business works when the operator protects route density, keeps chemistry notes tight, and communicates clearly after each visit.",
    teaser:
      "Build a dense weekly route, keep service notes sharp, and turn consistent maintenance into stable recurring revenue.",
    goodFor: [
      "Operators who like route-based field work and repeat weekly routines",
      "Founders comfortable with recurring maintenance and customer updates",
      "People serving suburban or warm-weather markets with enough pool density"
    ],
    operatorModel:
      "Can start solo with a compact route, disciplined note taking, and a clear maintenance-only launch scope.",
    teamModel:
      "Scales into route technicians as customer density, service frequency, and premium reporting packages grow.",
    serviceMode: "Outdoor / mobile route service",
    difficulty: "Moderate because chemistry, route efficiency, and weather all matter",
    startup_cost_range: "$2,500-$9,000",
    revenue_90_range: "$5,000-$24,000",
    revenue_1yr_range: "$70,000-$180,000",
    margin_range: "30%-50%",
    demandLevel: "High in pool-heavy neighborhoods and warm-weather markets",
    seasonality:
      "Stronger in warm regions or summer months, though some markets support near year-round maintenance revenue.",
    recurringRevenuePotential:
      "High because weekly or biweekly recurring pool care is the core model, not just an add-on idea.",
    recommended_first_offer: "Weekly chemical check + skim + vacuum",
    whyAttractive:
      "Recurring route work creates steady revenue, and customers value consistency, communication, and clear water more than constant re-selling.",
    whyPeopleStartIt:
      "Once a route is built, the business becomes more predictable and often easier to manage than one-off project work.",
    pros: [
      "Recurring route model",
      "Strong local density economics in the right neighborhoods",
      "Clear maintenance need with high customer retention when service is good",
      "Natural premium upsells like reporting, filter service, and storm cleanup"
    ],
    cons: [
      "Chemical handling and note discipline matter",
      "Seasonality affects some markets heavily",
      "Loose route geography kills margin",
      "Green-pool recovery work can be mispriced easily"
    ],
    bestFitOperatorType:
      "A process-focused operator who likes recurring service notes, route density, and dependable weekly execution rather than constant custom quoting.",
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
      "Test strips and liquid testing kits",
      "Pool pole and skimmer net",
      "Vacuum head and hose",
      "Brushes for walls and steps",
      "Chemical storage bins",
      "PPE for handling chemicals",
      "Route app or route note system",
      "Waterproof labels or organization system"
    ],
    equipment: [
      "Chemical test kit",
      "Pole and net",
      "Vacuum system",
      "Brushes",
      "Chemical storage",
      "Route bins"
    ],
    vehicleNeeds: [
      "Truck, van, or SUV setup with secure chemical storage and route-friendly organization",
      "Enough space to separate clean tools, chemicals, and customer-specific supplies",
      "Reliable transport because recurring route delays can compound across the week"
    ],
    requiredItems: [
      "Testing kit",
      "Cleaning tools",
      "Chemical storage setup",
      "General liability coverage",
      "Business phone and CRM"
    ],
    optionalItems: [
      "Advanced digital testing tools",
      "Route optimization app",
      "Tablet for service logs",
      "Pool repair partner network",
      "Premium reporting templates"
    ],
    softwareNotes: {
      CRM: "Track chemistry notes, gate codes, filter details, service history, and premium add-on opportunities for every pool.",
      Scheduling: "Fixed route days and exception handling matter more than fancy software, but route notes must be accurate and easy to update.",
      Invoicing: "Recurring billing should be simple and predictable so the route is not slowed by collections."
    },
    commonLicenseCategories: [
      "General business license",
      "Chemical handling or pool contractor questions in some states",
      "Repair-related licensing if equipment work is added",
      "Commercial pool rules if serving larger facilities"
    ],
    localAgencyPrompts: [
      "Are there certification or licensing requirements for pool maintenance or chemical handling in this state?",
      "At what point do equipment repairs or more technical work require a separate contractor license?",
      "Are there local disposal rules for pool chemicals or service materials?"
    ],
    commercialAutoNote:
      "Recommended because chemicals and service equipment travel daily, and the route vehicle is central to the operation.",
    equipmentCoverageNote:
      "Useful if testing gear, vacuums, chemical inventory, and other service equipment represent meaningful replacement value.",
    questionsToAskAgent: [
      "How should chemical handling and transport be described on the policy?",
      "Does liability cover chemistry mistakes or related property-damage claims?",
      "If I hire route technicians later, what coverage changes should I plan for?"
    ],
    starterOffer: "Weekly chemical check, skim, and vacuum visit with simple service notes.",
    standardOffer: "Full weekly maintenance with chemical balancing, skimming, brushing, and vacuuming.",
    premiumOffer: "Premium maintenance with detailed service reports, filter reminders, and priority storm-cleanup support.",
    addOns: [
      "Filter clean",
      "Green-to-clean coordination",
      "Equipment check",
      "Storm debris reset",
      "Premium chemistry report"
    ],
    recurringOption: "Weekly or biweekly recurring pool care plan.",
    minimumPriceGuidance:
      "Protect the route minimum because drive time, chemistry handling, and report writing can quietly destroy margin when a pool is priced too low.",
    sampleUpsells: [
      "Add filter cleaning",
      "Upgrade to premium reporting and communication",
      "Bundle storm cleanup or recovery support"
    ],
    pricingNotes: [
      "Route density, pool condition, and chemistry responsibility matter heavily.",
      "Clarify whether chemicals are included, billed separately, or handled through a surcharge structure.",
      "Green-pool or recovery work should be quoted separately from normal recurring maintenance."
    ],
    bestFirstLeadSources: [
      "Google Business Profile",
      "Pool-heavy neighborhoods",
      "Pool-builder and realtor referrals",
      "Property manager relationships"
    ],
    onlineSources: [
      "Google Business Profile",
      "Facebook neighborhood groups",
      "Community forums in pool-heavy areas",
      "Simple service-report and route-day content"
    ],
    offlineSources: [
      "Door hangers in pool neighborhoods",
      "Pool-store relationship building",
      "Realtor and property-manager outreach",
      "Neighborhood leave-behinds after visible cleanups"
    ],
    localOutreachIdeas: [
      "Target pool-heavy subdivisions with route-day availability and a recurring-first offer",
      "Market opening-week service, summer prep, and storm-cleanup help based on the season",
      "Use reliability and service notes as part of the pitch, not just chemistry language"
    ],
    referralIdeas: [
      "Pool builders",
      "Landscapers",
      "Realtors",
      "Property managers",
      "Pool equipment vendors"
    ],
    neighborhoodMarketingIdeas: [
      "Route-density specials for one subdivision or gated community",
      "Pre-holiday pool-prep reminders",
      "Storm-cleanup campaigns after weather events"
    ],
    socialProofIdeas: [
      "Water-clarity shots",
      "Review snippets around reliability and communication",
      "Service-log visuals showing consistency"
    ],
    beforeAfterContentIdeas: [
      "Storm-debris cleanup",
      "Water-clarity improvement",
      "Equipment area organization",
      "Green-to-clean recovery progress"
    ],
    googleBusinessProfileGuidance: [
      "Use keywords around pool service, weekly pool maintenance, and chemical balancing in the profile and posts.",
      "Ask reviews to mention reliability, communication, and water quality consistency.",
      "Post routine maintenance proof so prospects trust the weekly standard, not only big recoveries."
    ],
    leadResponseProcess: [
      "Ask pool size, current condition, service frequency desired, and whether the pool is standard maintenance or a recovery job.",
      "Log access details like gates, dogs, alarms, and whether the property is occupied or managed remotely.",
      "Separate green-pool recovery and equipment issues from normal maintenance inquiries immediately."
    ],
    quotingProcess: [
      "Quote recurring maintenance separately from recovery work so the base route price stays clean.",
      "Clarify chemical inclusion, frequency, what gets logged after each visit, and what counts as a billable exception.",
      "If the pool condition is poor, set expectations before the first visit so the customer understands the path back to steady maintenance."
    ],
    schedulingProcess: [
      "Run fixed route days by neighborhood and avoid random reschedules that break route density.",
      "Confirm gate codes, service windows, and whether the customer wants a text report after each visit.",
      "Use weather and storm protocols that tell customers what happens if the route shifts or the pool needs extra recovery work."
    ],
    jobPrep: [
      "Check chemical stock, route notes, and any customer messages before leaving for the route.",
      "Review service history so you arrive knowing recent chemistry or equipment issues rather than starting blind.",
      "Stage PPE, testing tools, and nets in workflow order before the first stop."
    ],
    completionChecklist: [
      "Confirm chemistry was checked, debris removed, and the promised scope completed before leaving the property.",
      "Log service notes, chemical readings, and any issues such as low water, equipment noise, or needed repairs.",
      "If the customer receives updates, send the summary while the visit is still fresh."
    ],
    invoicing: [
      "Invoice recurring clients on a simple, predictable cadence that matches the service frequency.",
      "Track chemicals, recovery jobs, and one-time extras separately so route-account profitability is visible.",
      "If a pool needs repair or a partner referral, note it on the invoice or follow-up message so the recommendation is not lost."
    ],
    reviewRequestProcess: [
      "Ask once service has been consistent for a few visits and the pool is clearly staying in good condition.",
      "Encourage the customer to mention reliability, communication, and peace of mind.",
      "If a recovery job turned a rough pool around, use that transformation moment for the review ask."
    ],
    followUpProcess: [
      "Re-open seasonal clients before warm weather ramps up so you reclaim route density early.",
      "Send storm-cleanup reminders when weather shifts and tag which customers historically respond well.",
      "Offer premium reporting, filter cleaning, or repair-partner support to solid recurring accounts."
    ],
    executionFocus: [
      "Set route minimums, chemical inclusion rules, and the core weekly maintenance offer.",
      "Launch local marketing in pool-heavy neighborhoods and build proof on Google Business Profile.",
      "Run the first service calls and tighten reporting plus chemistry-note standards.",
      "Install recurring billing, gate-code logging, and review request habits.",
      "Grow route density and add storm, filter, or recovery upsells carefully.",
      "Document route operations, chemistry notes, and customer-update SOPs to stabilize the business."
    ],
    advancedSystems: [
      "Recurring route notes with automatic reminders",
      "Storm-cleanup reactivation workflow",
      "Premium account service reporting"
    ]
  },
  {
    id: "fence-installation",
    name: "Fence Installation",
    tags: ["low10k", "crew", "outdoor", "high"],
    summary:
      "A project-based exterior service with meaningful ticket sizes, visible property-value impact, and strong upsell potential through gates, removals, and material upgrades. The business rewards accurate estimating, deposits, and tight control of materials, access, and layout assumptions.",
    teaser:
      "Sell a clean first project, protect material margin, and use visible installs to drive the next neighborhood lead.",
    goodFor: [
      "Founders comfortable with project estimating and deposits",
      "Operators who can manage labor, materials, and jobsite communication",
      "People who want larger outdoor ticket sizes and visible installed results"
    ],
    operatorModel:
      "Usually not ideal as a pure solo model beyond short repairs or very small sections because material handling and layout benefit from support.",
    teamModel:
      "Best suited to a crew-based field operation with defined install roles, jobsite prep, and customer communication standards.",
    serviceMode: "Outdoor / on-site project service",
    difficulty: "Moderate because estimating, property-line assumptions, and material management all matter",
    startup_cost_range: "$5,000-$20,000",
    revenue_90_range: "$8,000-$45,000",
    revenue_1yr_range: "$120,000-$350,000",
    margin_range: "25%-40%",
    demandLevel: "High because homeowners consistently invest in privacy, safety, and curb appeal",
    seasonality:
      "Weather-dependent in many markets, strongest during build, move-in, and renovation seasons.",
    recurringRevenuePotential:
      "Lower than route businesses, but repair, gate, maintenance, and partner-driven repeat work can still matter.",
    recommended_first_offer: "40-foot privacy fence install",
    whyAttractive:
      "Projects carry larger tickets, the finished product is highly visible, and one strong install often creates nearby referral and neighbor opportunities.",
    whyPeopleStartIt:
      "Visible property improvement, strong homeowner demand, and meaningful average tickets make the business attractive if estimating is disciplined.",
    pros: [
      "Large ticket sizes",
      "High visual proof value",
      "Strong homeowner value perception",
      "Good upsell path into gates, demo, stain, or repairs"
    ],
    cons: [
      "Material cash flow and deposits matter a lot",
      "Labor coordination is required",
      "Permitting and property-line issues create real risk",
      "Underestimating layout or ground conditions can erase margin fast"
    ],
    bestFitOperatorType:
      "A project-minded operator who estimates carefully, manages crews and materials cleanly, and communicates clearly with homeowners about assumptions and schedule.",
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
      "Post-hole auger or auger access",
      "Levels, strings, and layout tools",
      "Circular saw and fastening tools",
      "Concrete mixing gear",
      "Nailer or screw system",
      "Truck and trailer setup",
      "PPE",
      "Material estimator sheet or measurement system"
    ],
    equipment: [
      "Auger",
      "Saw kit",
      "Levels and layout tools",
      "Concrete gear",
      "Fastening tools",
      "Truck or trailer"
    ],
    vehicleNeeds: [
      "Truck and trailer or dedicated hauling setup for materials and tools",
      "Ability to move posts, panels, gates, and concrete safely",
      "A loading plan that keeps tools accessible even when the trailer is full of material"
    ],
    requiredItems: [
      "Layout tools",
      "Auger access",
      "General liability coverage",
      "Estimate template with footage and gate detail",
      "Materials sourcing and deposit process"
    ],
    optionalItems: [
      "Skid steer or heavier equipment access",
      "Crew communication tools",
      "Branded yard signs",
      "Permit workflow templates",
      "Stain or seal partner relationship"
    ],
    softwareNotes: {
      CRM: "Track fence type, footage, gate count, property-line confidence, HOA notes, and deposit status on every lead.",
      "Estimates / proposals": "Fence quotes need layout detail, material grade, gate scope, demo scope, and permit assumptions.",
      Scheduling: "Order materials only after deposit and keep install dates tied to confirmed supply and access readiness."
    },
    commonLicenseCategories: [
      "General business license",
      "Contractor registration in many states",
      "Permit questions for property lines and structural work",
      "HOA approval or setback considerations"
    ],
    localAgencyPrompts: [
      "Does fence installation require contractor registration or a specialty license here?",
      "What setbacks, permits, or HOA approvals should customers verify before installation?",
      "If I offer demolition and haul-away, are there local disposal or permitting implications?"
    ],
    commercialAutoNote:
      "Recommended because trucks and trailers are central to material delivery and install work.",
    equipmentCoverageNote:
      "Important when augers, trailers, saws, and heavier tools are essential revenue assets.",
    questionsToAskAgent: [
      "How should trailers, powered augers, and heavier tools be insured?",
      "Does the liability policy cover property-line, post-hole, or underground-utility-related damage claims?",
      "If I use a crew or subcontractors, what workers' compensation or related coverage questions should I ask?"
    ],
    starterOffer: "40-foot privacy fence install package with clear material and layout assumptions.",
    standardOffer: "Full perimeter install with gates, upgraded material options, and coordinated site cleanup.",
    premiumOffer: "Premium install with layout planning, material upgrades, demo, stain or seal coordination, and detailed closeout.",
    addOns: [
      "Gate hardware upgrades",
      "Fence stain or seal",
      "Small repair package",
      "Demo and haul-away",
      "Neighbor-side upgrade or extension"
    ],
    recurringOption:
      "Annual inspection, maintenance, or repair support for property managers and repeat customers.",
    minimumPriceGuidance:
      "Use deposits and protect material margin because project cash flow can tighten quickly if labor or supply surprises are absorbed for free.",
    sampleUpsells: [
      "Upgrade gate hardware or latch package",
      "Add stain or seal coordination",
      "Bundle demo, haul-away, or a repair on another fence section"
    ],
    pricingNotes: [
      "Material grade, footage, gate count, demolition, and site conditions drive price more than simple linear footage alone.",
      "Clarify permit, survey, utility, and property-line assumptions in writing before taking a deposit.",
      "Never price a job as if the ground and access will be perfect unless you have confirmed that directly."
    ],
    bestFirstLeadSources: [
      "Google Business Profile",
      "Realtor referrals",
      "Property managers",
      "Neighborhood proof posts",
      "Repair and storm-damage leads"
    ],
    onlineSources: [
      "Google Business Profile",
      "Facebook before-and-after posts",
      "Local contractor directories",
      "Neighborhood groups"
    ],
    offlineSources: [
      "Yard signs at installs",
      "Realtor visits",
      "Property manager outreach",
      "Fence repair door hangers"
    ],
    localOutreachIdeas: [
      "Target older neighborhoods with visible leaning or aging fence lines",
      "Offer gate and repair inspections as a lower-friction entry point before full installs",
      "Use install photos and workmanship language rather than generic contractor promises"
    ],
    referralIdeas: [
      "Realtors",
      "Landscapers",
      "Pool builders",
      "Property managers",
      "General contractors"
    ],
    neighborhoodMarketingIdeas: [
      "Same-street install visibility with signs and photo proof",
      "Gate repair offers to neighbors after a full install",
      "Storm-damage inspection campaigns"
    ],
    socialProofIdeas: [
      "Boundary transformation shots",
      "Customer comments about communication and cleanup",
      "Install progress reels that show craftsmanship"
    ],
    beforeAfterContentIdeas: [
      "Old fence demo to new install",
      "Gate upgrade comparison",
      "Corner and line-detail shots",
      "Stain or finish upgrade visuals"
    ],
    googleBusinessProfileGuidance: [
      "Use keywords tied to privacy fence, fence installation, gate installation, and fence repair.",
      "Ask reviews to mention workmanship, communication, and finished appearance.",
      "Post both finished projects and process shots so the customer sees that the team operates professionally."
    ],
    leadResponseProcess: [
      "Ask fence type, footage estimate, gate count, current fence condition, and whether the property line is confirmed.",
      "Clarify HOA, survey, permit, and utility-marking responsibilities early in the conversation.",
      "If the lead only has a vague idea, guide them toward a site walk rather than trying to quote from weak assumptions."
    ],
    quotingProcess: [
      "Walk the site or review detailed photos and measurements before final pricing whenever possible.",
      "Separate material grade, gate scope, demo, haul-away, and permit assumptions in the quote so change orders are easier to manage.",
      "Use deposit terms, start-date conditions, and clear acceptance language to avoid soft verbal approvals."
    ],
    schedulingProcess: [
      "Sequence material ordering, crew availability, utility marking, and weather windows before promising install dates.",
      "Confirm final layout, access for materials, and homeowner prep before mobilizing.",
      "Keep a buffer for delays tied to supply, weather, or permitting so one project does not throw off the whole calendar."
    ],
    jobPrep: [
      "Verify measurements, line layout, gate location, and site obstacles before full crew setup.",
      "Confirm materials are on site or staged correctly and that hardware matches the quote.",
      "Review crew assignments, safety steps, and site protection plan before digging or demo begins."
    ],
    completionChecklist: [
      "Check posts, panels, alignment, and gate swing before calling the job done.",
      "Clean the site, remove debris, and walk the customer through care, maintenance, and any follow-up items.",
      "Save photos, material notes, and future repair or stain opportunities in the CRM."
    ],
    invoicing: [
      "Use deposit, progress, and final payment structure where appropriate for project size and materials.",
      "Track material and labor margin per job instead of assuming large-ticket jobs are automatically profitable.",
      "If there were approved changes, document them clearly on the final invoice."
    ],
    reviewRequestProcess: [
      "Ask once the customer sees the finished fence line, working gates, and a clean site.",
      "Encourage mention of workmanship, communication, and how smoothly the project was handled.",
      "If neighbors asked questions during the project, mention that referrals are welcome while the install is still visible."
    ],
    followUpProcess: [
      "Offer stain, seal, repair, or maintenance follow-up after the install where relevant.",
      "Reconnect with past customers for neighbor referrals or small repair add-ons after a few weeks.",
      "Keep property managers and realtors on a follow-up list for future perimeter, gate, or repair projects."
    ],
    executionFocus: [
      "Define the entry offer, material standard, and deposit structure before taking broad leads.",
      "Launch proof-driven marketing and partner outreach to realtors and landscapers.",
      "Refine site-walk and quote templates around footage, gates, and property-line assumptions.",
      "Install project communication, deposit, and closeout standards.",
      "Add repair, seal, and gate upgrades to improve profitability and follow-on work.",
      "Document estimating, materials, and site-communication SOPs to protect project margin."
    ],
    advancedSystems: [
      "Deposit and milestone workflow automation",
      "Post-install maintenance campaign",
      "Partner referral pipeline for larger projects"
    ]
  },
  {
    id: "flooring-installation",
    name: "Flooring Installation",
    tags: ["low10k", "crew", "indoor", "high"],
    summary:
      "A project-based interior service with strong ticket sizes, visible transformation, and premium positioning when prep and finish are controlled. The model becomes attractive when the operator prices for demo, prep, transitions, and trim instead of acting like the only variable is square footage.",
    teaser:
      "Use a small-room starter offer, sell clean prep and finish quality, and grow through partner referrals and larger installs.",
    goodFor: [
      "Finish-oriented operators who care about clean installation details",
      "Founders comfortable with measurements, site walks, and material coordination",
      "People who want larger-ticket interior jobs with strong before-and-after value"
    ],
    operatorModel:
      "Can begin with small-room jobs or helper-supported installs, but crew support usually becomes important as scope and materials grow.",
    teamModel:
      "Best suited to a crew-based or helper-supported field model because material handling and install pace benefit from more than one person.",
    serviceMode: "Indoor / on-site project service",
    difficulty: "Moderate because prep, subfloor issues, material handling, and finish expectations all matter",
    startup_cost_range: "$4,000-$15,000",
    revenue_90_range: "$8,000-$40,000",
    revenue_1yr_range: "$110,000-$280,000",
    margin_range: "25%-45%",
    demandLevel: "High because homeowners, landlords, and remodelers regularly need floor replacement and finish upgrades",
    seasonality:
      "Fairly steady and often tied to renovation cycles, moves, rental turns, and listing prep rather than weather.",
    recurringRevenuePotential:
      "Lower recurring cadence, but strong repeat value exists through contractors, property managers, and repeat homeowners.",
    recommended_first_offer: "Single-room LVP install package",
    whyAttractive:
      "Projects carry meaningful ticket size, the finished result is obvious, and strong partner channels can feed more work once reliability is proven.",
    whyPeopleStartIt:
      "The service sits in a premium home-improvement category and supports larger project revenue than many basic local services.",
    pros: [
      "Higher project value",
      "Premium positioning potential",
      "Strong partner channels",
      "Visible and satisfying transformation"
    ],
    cons: [
      "Material handling is real work",
      "Subfloor and prep surprises affect profit quickly",
      "Finish quality needs strong discipline",
      "Scheduling depends on delivery, acclimation, and room readiness"
    ],
    bestFitOperatorType:
      "A finish-focused operator who measures carefully, communicates clearly, and values project discipline more than chasing quick low-margin installs.",
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
      "Pull bars and tapping block",
      "Saws for trim and planks",
      "Adhesive or prep tools as needed",
      "Vacuum and cleanup tools"
    ],
    equipment: [
      "Cutting tools",
      "Moisture meter",
      "Knee protection",
      "Pull bars and spacers",
      "Vacuum and prep tools",
      "Material transport aids"
    ],
    vehicleNeeds: [
      "Van or truck for material transport and organized tool storage",
      "Ability to stage planks, saws, trim, and prep gear cleanly",
      "A workflow that protects finish materials from damage during transport"
    ],
    requiredItems: [
      "Core flooring tool kit",
      "General liability coverage",
      "Measurement and scope template",
      "Estimate system with prep detail",
      "Vehicle storage and transport plan"
    ],
    optionalItems: [
      "Dust containment setup",
      "Crew communication tools",
      "Floor-prep specialty tools",
      "Delivery support equipment",
      "Trim or baseboard specialty tools"
    ],
    softwareNotes: {
      CRM: "Track flooring type, room count, current floor condition, moisture or subfloor notes, and material-responsibility details on every lead.",
      "Estimates / proposals": "Separate demolition, prep, material handling, trim, transitions, and furniture movement in the proposal.",
      Scheduling: "Tie install dates to confirmed delivery, acclimation needs, and room-readiness steps so the crew is not arriving to a half-prepared house."
    },
    commonLicenseCategories: [
      "General business license",
      "Contractor registration in many states",
      "Permit or specialty-trade questions if structural subfloor work is included",
      "Waste disposal considerations for demolition and haul-away"
    ],
    localAgencyPrompts: [
      "Does flooring installation require contractor registration in my state or city?",
      "Which prep or structural tasks move this job beyond basic flooring installation?",
      "Are there disposal or haul-away rules for demolition materials that I should check locally?"
    ],
    commercialAutoNote:
      "Recommended because materials, saw systems, and other tools often travel to every project.",
    equipmentCoverageNote:
      "Useful when saws, meters, and installation gear become meaningful business assets.",
    questionsToAskAgent: [
      "Does the policy cover damage related to installation mistakes or subfloor exposure?",
      "How should I describe material handling, saw equipment, and on-site dust exposure to the carrier?",
      "If I use helpers or subcontractors, what additional coverage should I ask about?"
    ],
    starterOffer: "Single-room LVP install package with clear prep and trim assumptions.",
    standardOffer: "Multi-room install with trim and transition package.",
    premiumOffer: "Premium install with detailed prep, trim package, transition work, and final walkthrough support.",
    addOns: [
      "Baseboard install",
      "Subfloor prep",
      "Demo and haul-away",
      "Trim package",
      "Additional room or hallway bundle"
    ],
    recurringOption:
      "Property-manager turnover flooring package or phased room-by-room homeowner refresh work.",
    minimumPriceGuidance:
      "Price for prep, hauling, cleanup, transitions, and communication, not just laying planks or boards. The visible install is only part of the labor.",
    sampleUpsells: [
      "Add baseboards or trim package",
      "Add demo and haul-away",
      "Upgrade to premium finish on transitions and thresholds"
    ],
    pricingNotes: [
      "Subfloor prep, demolition, trim removal, and moisture issues change the economics quickly.",
      "Always clarify who is supplying material, where it will be staged, and whether acclimation time is needed.",
      "A small-room starter offer is easier to sell, but it still needs a professional minimum."
    ],
    bestFirstLeadSources: [
      "Google Business Profile",
      "Realtors",
      "Painters",
      "Property managers",
      "Remodel referrals"
    ],
    onlineSources: [
      "Google Business Profile",
      "Before-and-after posts",
      "Local contractor directories",
      "Neighborhood groups"
    ],
    offlineSources: [
      "Realtor outreach",
      "Property manager visits",
      "Jobsite signage",
      "Contractor networking"
    ],
    localOutreachIdeas: [
      "Offer single-room starter packages to reduce buying friction for homeowners",
      "Target move-in refresh and listing-prep jobs where quick visual improvement matters",
      "Use finish quality, trim detail, and clean site habits as the differentiator"
    ],
    referralIdeas: [
      "Painters",
      "Realtors",
      "Cabinet installers",
      "Property managers",
      "General remodelers"
    ],
    neighborhoodMarketingIdeas: [
      "Move-in refresh campaigns",
      "Rental turnover offers",
      "Remodel bundle partnerships",
      "Room-by-room upgrade promos"
    ],
    socialProofIdeas: [
      "Room transformation reels",
      "Customer comments on finish quality and cleanup",
      "Transition-detail photos"
    ],
    beforeAfterContentIdeas: [
      "Old carpet to LVP conversion",
      "Trim and transition detail",
      "Room reset transformation",
      "Rental-turn or move-in refresh visual stories"
    ],
    googleBusinessProfileGuidance: [
      "Use keywords for LVP install, flooring install, floor replacement, and trim finish.",
      "Ask reviews to mention finish quality, communication, and cleanup.",
      "Post close-up finish details, not only wide room shots, so the craftsmanship is visible."
    ],
    leadResponseProcess: [
      "Ask flooring type desired, room count, current floor condition, timeline, and whether demolition and trim are part of the scope.",
      "If the customer is still choosing materials, clarify whether you are quoting labor only or labor plus guidance.",
      "Request measurements and photos, but do not skip a site walk when prep risk is high."
    ],
    quotingProcess: [
      "Use measurements, prep notes, and transitions in the quote instead of guessing from room count alone.",
      "Separate demo, subfloor prep, trim, furniture movement, and premium-finish details in the estimate.",
      "State material assumptions, acclimation needs, and what the homeowner must do before start day."
    ],
    schedulingProcess: [
      "Sequence around material delivery, acclimation, room access, and any demo or prep work before you commit to start dates.",
      "Confirm furniture movement, room readiness, and trim decisions before the team arrives.",
      "Leave buffer for prep surprises and punch-list finish work instead of overpacking the calendar."
    ],
    jobPrep: [
      "Inspect subfloor, moisture, transitions, and trim conditions before laying material.",
      "Stage materials and cutting area cleanly to protect the customer's home and the finish quality.",
      "Protect adjacent surfaces and confirm the install direction, transitions, and trim plan before the first cuts."
    ],
    completionChecklist: [
      "Confirm the install, transitions, trim, and cleanup all match the scope before leaving.",
      "Walk the room with the customer and explain care guidance, cure or settling expectations, and any future recommendations.",
      "Save finish photos, measurement notes, and next-room opportunities for future follow-up."
    ],
    invoicing: [
      "Use deposits for materials and larger projects so cash flow stays healthy.",
      "Track labor, prep, and demo margin separately because those categories are where most estimating misses happen.",
      "If the project changed on site, document and bill the approved change rather than hiding it in one total."
    ],
    reviewRequestProcess: [
      "Ask after the final walkthrough when the finish reveal is obvious and the site is clean.",
      "Encourage comments about craftsmanship, communication, and the finished look.",
      "If the project came from a partner, follow the review ask with a simple request for the next referral."
    ],
    followUpProcess: [
      "Offer future room phases or turnover support if the customer staged the project in pieces.",
      "Reconnect with realtor and contractor partners after completed projects using the finished proof photos.",
      "Tag customers by flooring type and project type so later follow-up feels relevant."
    ],
    executionFocus: [
      "Finalize the starter room package, prep rules, and material assumptions.",
      "Launch partner outreach to realtors, painters, and property managers plus strong proof marketing.",
      "Run early site walks and tighten prep, demo, and transition pricing.",
      "Install deposits, walkthrough, and closeout standards on every project.",
      "Add trim, demo, and multi-room upsells to profitable jobs.",
      "Document estimating, site prep, and final-walk SOPs to keep project quality high."
    ],
    advancedSystems: [
      "Partner referral intake workflow",
      "Deposit and milestone communication sequence",
      "Past-client next-room reactivation campaign"
    ]
  },
  {
    id: "moving-labor",
    name: "Moving Labor",
    tags: ["low2k", "low5k", "low10k", "crew", "indoor", "outdoor", "mobile", "high", "beginner"],
    summary:
      "A labor-first service that sells convenience, urgency, and reliability without requiring a full moving fleet on day one. It works best when the operator uses clear time-block pricing, communicates what labor-only means, and keeps crew coordination tighter than the customer expects.",
    teaser:
      "Lead with labor blocks, communicate clearly, and turn stressful move days into repeat partner referrals.",
    goodFor: [
      "Founders with reliable labor capacity and strong communication",
      "Operators comfortable with time-block pricing and day-of coordination",
      "People who want moving-related demand without buying a full truck fleet first"
    ],
    operatorModel:
      "Can begin with labor-only loading and unloading blocks, but helpers improve both economics and customer confidence quickly.",
    teamModel:
      "Better as a small crew-based model because two-person or multi-person jobs are the norm for many profitable moves.",
    serviceMode: "Indoor / outdoor / mobile labor service",
    difficulty: "Beginner-friendly if scheduling, crew reliability, and damage prevention are taken seriously",
    startup_cost_range: "$1,200-$4,500",
    revenue_90_range: "$4,000-$18,000",
    revenue_1yr_range: "$50,000-$150,000",
    margin_range: "35%-55%",
    demandLevel: "High around moving cycles, storage moves, and apartment turnover periods",
    seasonality:
      "Strong during moving season and end-of-month apartment cycles, though localized demand can appear year-round.",
    recurringRevenuePotential:
      "Moderate through apartment communities, staging companies, storage facilities, and repeat referral partners.",
    recommended_first_offer: "2 movers, 2-hour local labor block",
    whyAttractive:
      "It solves a stressful customer problem quickly and can be launched before owning a full truck-based moving company.",
    whyPeopleStartIt:
      "Labor-only moving support allows lower startup friction, fast demand capture, and flexible pricing without full fleet overhead.",
    pros: [
      "Fast demand and clear pain point",
      "No truck ownership required at launch",
      "Good partner opportunities with apartments and storage facilities",
      "Simple time-block pricing model"
    ],
    cons: [
      "Crew reliability matters on every job",
      "Injury and damage risk are real",
      "Scheduling can get chaotic if buffers are missing",
      "Customers easily misunderstand labor-only versus transport scope"
    ],
    bestFitOperatorType:
      "An organized operator who can coordinate people, communicate cleanly under time pressure, and protect both schedule and customer property.",
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
      "Work gloves",
      "Back-support gear if preferred",
      "Shrink wrap",
      "Basic toolkit for furniture disassembly"
    ],
    equipment: [
      "Dollies",
      "Hand trucks",
      "Moving blankets",
      "Straps",
      "Shrink wrap",
      "Protective gear"
    ],
    vehicleNeeds: [
      "Support vehicle optional if labor-only, but at least one vehicle for gear and crew transport is helpful",
      "If customers are expected to provide the truck, communicate that clearly in every quote and reminder",
      "Truck-rental referral or partner workflows can make the business feel more complete without owning a fleet"
    ],
    requiredItems: [
      "Basic moving gear",
      "General liability coverage",
      "Quote script that defines labor-only scope",
      "Scheduling setup",
      "Crew communication process"
    ],
    optionalItems: [
      "Truck or trailer partnerships",
      "Branded shirts",
      "Extra labor bench",
      "Apartment partnership leave-behinds",
      "Damage photo workflow"
    ],
    softwareNotes: {
      CRM: "Track move date, labor scope, stairs, heavy items, parking notes, and whether transport is customer-supplied or yours.",
      Scheduling: "Tight arrival windows and crew coordination matter more than fancy tooling in early stages.",
      Invoicing: "Reserved time blocks should have clear deposit and overage rules documented before move day."
    },
    commonLicenseCategories: [
      "General business license",
      "Motor carrier rules if you move goods with your own truck",
      "Local moving or transport registration if hauling is added",
      "Labor or employment registrations once crews are hired"
    ],
    localAgencyPrompts: [
      "If I offer labor-only moving help, do I avoid state mover licensing requirements here?",
      "What changes if I start transporting customer goods with my own truck or trailer?",
      "Are there city-level moving or parking permits I should know about for common apartment areas?"
    ],
    commercialAutoNote:
      "Ask based on whether your company vehicle transports crew, equipment, or customer goods in the course of the business.",
    equipmentCoverageNote:
      "Optional early, but moving blankets, dollies, and protective gear still matter if multiple crews use them.",
    questionsToAskAgent: [
      "Does my policy cover accidental property damage during moving labor and loading?",
      "What coverage changes if I later add truck-based moves or transport customer goods directly?",
      "If crew members are regular helpers, when does workers' compensation apply?"
    ],
    starterOffer: "Two movers for a two-hour local labor block with clear overage and stair rules.",
    standardOffer: "Labor-only loading or unloading package with stairs, furniture protection, and simple disassembly options.",
    premiumOffer: "Premium move support with packing help, furniture disassembly, and room-reset assistance on arrival.",
    addOns: [
      "Packing help",
      "Furniture assembly",
      "Extra mover",
      "Stair carry surcharge",
      "Unpack support"
    ],
    recurringOption:
      "Apartment turnover, staging support, or property-manager labor relationship.",
    minimumPriceGuidance:
      "Use a minimum block rate plus clearly defined stair, heavy-item, overtime, and extra-labor rules. Move days create surprises, so pricing needs a structure.",
    sampleUpsells: [
      "Add packing help before the move",
      "Upgrade to an extra mover for speed or safety",
      "Book unpacking or furniture assembly for the destination"
    ],
    pricingNotes: [
      "Keep labor-only and hauling clearly separated in all customer communication.",
      "Clarify weight, stairs, assembly, parking, and cancellation terms before move day.",
      "Protect your schedule with minimum blocks and overtime rules instead of trying to guess an exact end time."
    ],
    bestFirstLeadSources: [
      "Apartment communities",
      "Realtors",
      "Facebook and local move groups",
      "Storage facilities",
      "Truck-rental related referrals"
    ],
    onlineSources: [
      "Google Business Profile",
      "Facebook local groups",
      "Moving-related marketplaces",
      "Apartment resident groups"
    ],
    offlineSources: [
      "Storage facility outreach",
      "Apartment manager relationships",
      "Realtor and stager referrals",
      "Truck-rental center partnerships"
    ],
    localOutreachIdeas: [
      "Offer move-day labor support to apartment communities and storage facilities",
      "Target end-of-month demand windows with clear time-block offers",
      "Lead with punctuality, professionalism, and careful handling rather than bargain pricing"
    ],
    referralIdeas: [
      "Truck rental centers",
      "Stagers",
      "Realtors",
      "Storage managers",
      "Apartment leasing offices"
    ],
    neighborhoodMarketingIdeas: [
      "Move-in and move-out weekend blocks",
      "Apartment-building flyer strategy where allowed",
      "Student move-season campaigns",
      "Storage-unit cleanout add-on offers"
    ],
    socialProofIdeas: [
      "Review snippets about reliability and care",
      "Packing and load-out time-lapse clips",
      "Organized crew and gear content"
    ],
    beforeAfterContentIdeas: [
      "Room cleared for move-out",
      "Storage load organization",
      "Setup and unpack support visuals",
      "Apartment turn support before-and-after"
    ],
    googleBusinessProfileGuidance: [
      "Use keywords for moving labor, loading help, unloading help, apartment moves, and furniture moving assistance.",
      "Ask reviews to mention professionalism, care, speed, and punctuality.",
      "Clarify in the profile if you are labor-only or if you also coordinate transport so customers are not confused."
    ],
    leadResponseProcess: [
      "Ask move date, origin and destination, labor scope, number of movers needed, stairs, and heavy items right away.",
      "Clarify whether the company is providing transport or labor only before discussing price.",
      "If the move sounds under-staffed, recommend the right crew size instead of letting the customer underbook and create a bad job."
    ],
    quotingProcess: [
      "Quote in time blocks with clear add-on rules for stairs, heavy items, disassembly, packing, or extra movers.",
      "Define arrival window, overtime rate, cancellation terms, and what equipment is included.",
      "Confirm whether the customer, rental company, or your business is handling transport so there is no confusion later."
    ],
    schedulingProcess: [
      "Confirm crew availability and leave buffers for overruns because move times are often less predictable than customers expect.",
      "Send a prep checklist before move day covering packing status, parking, elevator reservations, and truck readiness.",
      "Keep same-day communication tight so delays are explained early rather than after the arrival window passes."
    ],
    jobPrep: [
      "Confirm gear loadout, crew assignments, and route timing the day before.",
      "Review access, elevator, parking, and building rules before arrival.",
      "Clarify item-protection expectations, fragile items, and any furniture disassembly plan before moving begins."
    ],
    completionChecklist: [
      "Confirm all scoped items were moved, assembled, or placed where the customer expected.",
      "Do a damage check with the customer and collect all blankets, straps, and tools before leaving.",
      "Log whether the customer may need unpacking, junk removal, or future labor help."
    ],
    invoicing: [
      "Collect deposit for reserved blocks when appropriate and document overtime clearly if the move runs long.",
      "Invoice additional time, extra labor, and add-ons in a way the customer can trace back to the agreed pricing rules.",
      "Collect same day whenever possible because move-day customers quickly move on mentally once the job ends."
    ],
    reviewRequestProcess: [
      "Ask once the stressful part of the move is over and the customer feels relief, not in the middle of the rush.",
      "Highlight care, speed, and professionalism in the review prompt.",
      "For apartment or partner referrals, combine the review ask with a note that you can help on the next move as well."
    ],
    followUpProcess: [
      "Offer unpacking, assembly, or small junk-removal support after the move while the need is still active.",
      "Reconnect with apartment, storage, and realtor partners before peak moving dates each month or season.",
      "Tag strong referral sources by building or facility so you can revisit the highest-signal relationships."
    ],
    executionFocus: [
      "Finalize the labor-only scope, time-block pricing, and heavy-item rules before launch.",
      "Launch partner outreach to apartments, storage facilities, and realtors.",
      "Run the first moves and tighten staffing plus stair and overtime pricing assumptions.",
      "Install prep checklist, arrival reminders, and review request habits.",
      "Add packing, assembly, or unpacking upsells to good-fit jobs.",
      "Document scheduling, crew communication, and closeout SOPs so jobs stay controlled."
    ],
    advancedSystems: [
      "Move-day reminder workflow",
      "Apartment and partner follow-up campaign",
      "Crew scheduling and overrun alerts"
    ]
  },
  {
    id: "pet-waste-removal",
    name: "Pet Waste Removal",
    tags: ["low2k", "low5k", "solo", "outdoor", "mobile", "high", "beginner", "recurring"],
    summary:
      "A recurring subscription-style yard service with low startup friction, simple route economics, and strong retention when neighborhoods are dense. The model works because customers buy convenience and consistency, not complexity, and route efficiency compounds quickly.",
    teaser:
      "Keep the route tight, make billing automatic, and turn simple weekly stops into dependable recurring revenue.",
    goodFor: [
      "Founders who want a very lean recurring route business",
      "Operators comfortable with simple outdoor work and sanitation habits",
      "People who value predictable subscriptions over flashy one-off projects"
    ],
    operatorModel:
      "Excellent solo launch business because one operator can run a dense route efficiently with the right service area and billing system.",
    teamModel:
      "Scales into route technicians as neighborhood clusters and recurring subscriptions grow.",
    serviceMode: "Outdoor / mobile recurring route service",
    difficulty: "Beginner-friendly if route density, sanitation, and billing discipline stay tight",
    startup_cost_range: "$700-$2,500",
    revenue_90_range: "$2,000-$10,000",
    revenue_1yr_range: "$25,000-$80,000",
    margin_range: "45%-70%",
    demandLevel: "High in dog-heavy suburban neighborhoods and recurring convenience markets",
    seasonality:
      "Fairly stable year-round, with some regional weather impact on route efficiency and service frequency.",
    recurringRevenuePotential:
      "High because the strongest version of the model is weekly or twice-weekly subscription service.",
    recommended_first_offer: "Weekly yard cleanup subscription",
    whyAttractive:
      "The service is simple, recurring, and routeable. Once a neighborhood starts converting, every additional nearby stop gets easier and more profitable.",
    whyPeopleStartIt:
      "It is one of the leanest recurring local-service launches and does not require expensive equipment or complex quoting to get moving.",
    pros: [
      "Very lean startup",
      "Recurring subscriptions fit naturally",
      "Simple service delivery",
      "Excellent route-density potential"
    ],
    cons: [
      "The business is not glamorous to many people",
      "Route density matters heavily to profitability",
      "Sanitation and professionalism must be obvious",
      "Low prices can trap you in weak neighborhoods"
    ],
    bestFitOperatorType:
      "A process-driven operator who values recurring revenue, clean route execution, and simple systems over complicated service menus.",
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
      "Boot covers or route-safe footwear",
      "Route map app or route list",
      "Waste bins or sealed containment system",
      "Disposable gloves",
      "Subscription tracker or CRM"
    ],
    equipment: [
      "Scooping tools",
      "Waste container system",
      "Sanitation supplies",
      "Route bins",
      "Backup gloves and liners"
    ],
    vehicleNeeds: [
      "Small car or SUV is enough if waste containment is secure and the route is organized cleanly",
      "A separation system for clean supplies versus collected waste helps the business feel more professional",
      "Tight neighborhood routing matters more than having a large vehicle"
    ],
    requiredItems: [
      "Scooping tools",
      "Waste containers",
      "Sanitation supplies",
      "Business phone and CRM",
      "Recurring billing setup"
    ],
    optionalItems: [
      "Branded route vehicle",
      "Service notification cards",
      "Canine-yard deodorizer upsell",
      "Second route tech",
      "Seasonal route signage"
    ],
    softwareNotes: {
      CRM: "Track dog count, yard size, gate notes, service frequency, and failed-payment status for every account.",
      Scheduling: "Recurring weekly or biweekly route logic is central to making this business work.",
      Invoicing: "Autopay is one of the highest-leverage systems in this model because the average ticket is small and recurring."
    },
    commonLicenseCategories: [
      "General business license",
      "Waste disposal or sanitation questions in some municipalities"
    ],
    localAgencyPrompts: [
      "Are there any local disposal rules for pet waste removal businesses in this city or county?",
      "Do I need a general business license for recurring yard cleanup service here?",
      "Are there route or sanitation rules I should know about before marketing the service?"
    ],
    commercialAutoNote:
      "Usually not critical at the very beginning, but ask if the business vehicle is used daily for route work and waste transport.",
    equipmentCoverageNote:
      "Optional early because the equipment cost is lower than many trades, though route reliability still depends on replacement basics.",
    questionsToAskAgent: [
      "Does liability cover gate, pet, or property-access incidents tied to yard service?",
      "Do I need any sanitation-specific endorsements for this kind of recurring route business?",
      "If I add route techs later, what coverage questions should I revisit?"
    ],
    starterOffer: "Weekly yard cleanup subscription with a simple recurring billing model.",
    standardOffer: "Weekly cleanup plus bagging and service-complete notification.",
    premiumOffer: "Premium weekly service with deodorizer treatment and photo confirmation when requested.",
    addOns: [
      "Deodorizer treatment",
      "Twice-weekly visits",
      "One-time reset clean",
      "Multi-dog surcharge",
      "Gate or route-priority add-on"
    ],
    recurringOption: "Weekly or twice-weekly subscription route.",
    minimumPriceGuidance:
      "Protect a minimum subscription price per stop so route density, travel time, and failed payments do not undermine the business.",
    sampleUpsells: [
      "Add deodorizer treatment",
      "Upgrade to twice-weekly service",
      "Charge separately for an initial reset clean before recurring service begins"
    ],
    pricingNotes: [
      "Dog count, yard size, gate access, and route density are the main price drivers.",
      "Initial cleanup resets often deserve a separate price because they are not the same as ongoing maintenance.",
      "A low-density stop in the wrong area can hurt the route more than it helps revenue."
    ],
    bestFirstLeadSources: [
      "Neighborhood Facebook groups",
      "Google Business Profile",
      "Pet-related referral partners",
      "Neighbor referral loops"
    ],
    onlineSources: [
      "Google Business Profile",
      "Neighborhood groups",
      "Local pet-owner communities",
      "Nextdoor"
    ],
    offlineSources: [
      "Veterinarian or pet-store flyer partnerships",
      "Dog groomer referrals",
      "Neighborhood leave-behinds",
      "Dog-walker and pet-sitter partner cards"
    ],
    localOutreachIdeas: [
      "Target dog-heavy neighborhoods and build density on one or two streets at a time",
      "Offer same-street route pricing when multiple neighbors sign up",
      "Use playful but still premium branding that communicates reliability and cleanliness"
    ],
    referralIdeas: [
      "Dog walkers",
      "Pet stores",
      "Groomers",
      "Veterinarians",
      "Pet sitters"
    ],
    neighborhoodMarketingIdeas: [
      "Subscription route specials",
      "Multi-dog household bundles",
      "Neighbor referral credits",
      "Seasonal yard reset campaigns"
    ],
    socialProofIdeas: [
      "Customer praise about convenience",
      "Route-day proof posts",
      "Clean, playful brand visuals"
    ],
    beforeAfterContentIdeas: [
      "Clean-yard before-and-after",
      "Subscription route map stories",
      "Seasonal yard reset content",
      "Dog-friendly clean-yard visuals"
    ],
    googleBusinessProfileGuidance: [
      "Use keywords around pooper scooper service, pet waste removal, and weekly yard cleanup.",
      "Ask reviews to mention convenience, reliability, and professionalism.",
      "Keep profile imagery clean and brand-safe so the business feels more premium than the category stereotype."
    ],
    leadResponseProcess: [
      "Ask dog count, yard size, gate access, and preferred service frequency before quoting.",
      "Log pet notes, gate notes, and whether the customer needs a one-time reset before recurring service can start.",
      "If the address is outside your density zone, decide quickly whether to price for the distance or decline the lead."
    ],
    quotingProcess: [
      "Lead with subscription pricing and separate the initial cleanup or multi-dog surcharges cleanly.",
      "Clarify billing cadence, missed-visit policy, gate-access expectations, and whether service notifications are included.",
      "If the yard condition is unusually heavy, price the reset first and then move the customer into recurring service."
    ],
    schedulingProcess: [
      "Build dense route days by neighborhood and avoid one-off outlier stops that fracture the day.",
      "Send service-complete notifications when included so the subscription feels active and professional.",
      "Document gate and dog notes directly in the route so visits are quick and predictable."
    ],
    jobPrep: [
      "Review gate, dog, and payment notes before leaving for the route.",
      "Stage sanitation supplies, clean liners, and backup tools before the first stop.",
      "Check route order before leaving so backtracking does not quietly kill the route."
    ],
    completionChecklist: [
      "Confirm the yard is complete, the gate is secured, and waste is contained properly before leaving.",
      "Log the service note and whether anything unusual happened, such as a locked gate or excessive waste volume.",
      "Send the completion notice if promised in the package."
    ],
    invoicing: [
      "Run recurring autopay whenever possible and keep failed-payment follow-up simple and immediate.",
      "Separate reset cleans and add-ons from recurring subscription billing so the core plan stays easy to understand.",
      "If payment fails, trigger the follow-up the same day so low-ticket problems do not pile up."
    ],
    reviewRequestProcess: [
      "Ask after a few dependable visits once the convenience is obvious and trust has been earned.",
      "Use a professional but light tone and suggest they mention reliability and how easy the service has been.",
      "Pair the review ask with a neighbor referral prompt when the customer is especially happy."
    ],
    followUpProcess: [
      "Offer a referral reward to strong recurring customers who live near other dog owners.",
      "Reactivate paused customers at season changes when yard use increases again.",
      "Send add-on offers like deodorizer or extra-frequency service when household needs change."
    ],
    executionFocus: [
      "Set recurring pricing, service radius, and initial cleanup rules before launch.",
      "Launch neighborhood-first marketing and build route density in one target area.",
      "Run the first subscriptions and tighten dog-count plus yard-size pricing assumptions.",
      "Install service-complete notes, autopay, and review request cadence.",
      "Add deodorizer or multi-visit upsells while tightening route efficiency.",
      "Document route, sanitation, and customer-notification SOPs so operations stay clean."
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
    summary:
      "A highly seasonal but urgent service business that can produce strong short-window revenue when routes, equipment, and communication are ready before the storm hits. Success depends less on flashy marketing and more on preparation, route discipline, and dependable customer updates.",
    teaser:
      "Pre-sell priority routes, plan before the storm, and turn urgency into profitable recurring winter work.",
    goodFor: [
      "Operators in real snow markets who can plan ahead and respond fast",
      "Founders comfortable with weather-driven scheduling and overnight execution",
      "People who can prepare routes before storms instead of reacting after the first snowfall"
    ],
    operatorModel:
      "Can launch solo for smaller residential routes, but helpers or subcontractors often improve reliability during heavy events.",
    teamModel:
      "Often expands into helper support or subcontractor coverage because storm intensity can compress many jobs into the same hours.",
    serviceMode: "Outdoor / mobile storm-response service",
    difficulty: "Moderate because weather, route timing, equipment readiness, and liability all matter",
    startup_cost_range: "$2,000-$10,000",
    revenue_90_range: "$4,000-$30,000",
    revenue_1yr_range: "$35,000-$140,000",
    margin_range: "25%-45%",
    demandLevel: "High in active snow markets because demand becomes urgent quickly",
    seasonality:
      "Heavily seasonal and storm-driven. A weak winter can soften volume while a strong winter can strain operations.",
    recurringRevenuePotential:
      "Moderate through seasonal contracts, storm retainers, and priority-route enrollment.",
    recommended_first_offer: "Driveway + walkway storm service",
    whyAttractive:
      "Storm events create urgent demand, and customers value dependable response more than complex sales pitches when snow actually hits.",
    whyPeopleStartIt:
      "In the right market, a short and intense season can produce meaningful revenue quickly without needing a full-year route business.",
    pros: [
      "Urgent demand with clear value",
      "Route density can be strong in subdivisions",
      "Seasonal contracts and retainers create better predictability",
      "Fast close cycles when storms are approaching"
    ],
    cons: [
      "Heavily seasonal revenue",
      "Weather unpredictability affects planning",
      "Equipment readiness and backup plans matter",
      "Slip-and-fall risk needs serious attention"
    ],
    bestFitOperatorType:
      "An operator who prepares early, communicates clearly during storms, and treats routing and equipment readiness like the real product.",
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
    ],
    equipment: [
      "Snow blower",
      "Hand tools",
      "Salt spreader",
      "Winter safety gear",
      "Vehicle prep kit",
      "Backup fuel and battery support"
    ],
    vehicleNeeds: [
      "Reliable winter-ready vehicle with route gear storage",
      "Snow tires or proper winter prep are critical, not optional",
      "Enough organization to keep tools, salt, and backup gear accessible during overnight or early-morning events"
    ],
    requiredItems: [
      "Snow equipment",
      "General liability and relevant vehicle coverage",
      "Storm route planning",
      "Customer communication system",
      "Winter vehicle kit"
    ],
    optionalItems: [
      "Plow attachment",
      "Backup blower",
      "Subcontractor bench",
      "Commercial route add-ons",
      "Storm-trigger messaging automation"
    ],
    softwareNotes: {
      CRM: "Track trigger depth, salt preferences, priority accounts, and route grouping by storm zone.",
      Scheduling: "Storm-trigger scheduling and customer status updates are core to the service experience.",
      Invoicing: "Event-based billing or retainers must be documented clearly before the season starts."
    },
    commonLicenseCategories: [
      "General business license",
      "Commercial snow or right-of-way restrictions in some municipalities",
      "Commercial contractor registration questions for larger sites",
      "Salt or de-icing material use guidance where applicable"
    ],
    localAgencyPrompts: [
      "Are there municipal restrictions on snow placement or de-icing materials for service contractors here?",
      "Do commercial lots require any additional contractor registration or approval?",
      "Are there city rules about pushing snow into streets, sidewalks, or drainage paths?"
    ],
    commercialAutoNote:
      "Recommended because the business depends on a winter service vehicle and often transports equipment and materials during active storms.",
    equipmentCoverageNote:
      "Worth asking about for snow blowers, spreaders, attachments, and other winter equipment that could fail during peak demand.",
    questionsToAskAgent: [
      "Does liability cover slip-and-fall claims related to snow and ice service?",
      "How should I insure winter attachments, plows, or spreaders if I add them?",
      "If I use subcontractors or helpers during storms, what coverage questions should I ask?"
    ],
    starterOffer: "Driveway and walkway storm service package with clear trigger-depth terms.",
    standardOffer: "Storm service with walkway, entry, and ice-melt application.",
    premiumOffer: "Priority snow and ice management plan with storm updates and repeat passes if needed.",
    addOns: [
      "Ice melt application",
      "Second pass",
      "Sidewalk extension",
      "Seasonal retainer",
      "Priority route enrollment"
    ],
    recurringOption: "Seasonal contract or storm retainer with priority service.",
    minimumPriceGuidance:
      "Price around dispatch risk, overnight timing, travel disruption, and liability exposure, not just square footage or shovel time.",
    sampleUpsells: [
      "Add ice melt service",
      "Upgrade to a seasonal contract or storm retainer",
      "Add a second-pass guarantee for long storms"
    ],
    pricingNotes: [
      "Storm timing, trigger depth, and route density change the economics quickly.",
      "Clarify whether a price is per push, per event, seasonal, or based on accumulation tiers.",
      "Do not let on-demand jobs compromise contracted priority accounts unless that rule is explicit."
    ],
    bestFirstLeadSources: [
      "Neighborhoods with driveways and walkways",
      "Property managers",
      "Local Facebook groups before storms",
      "Seasonal route signups before winter"
    ],
    onlineSources: [
      "Google Business Profile",
      "Storm reminder social posts",
      "Neighborhood groups",
      "Nextdoor"
    ],
    offlineSources: [
      "Flyers before winter",
      "Property manager visits",
      "Neighborhood signage where allowed",
      "Landscaper partner referrals"
    ],
    localOutreachIdeas: [
      "Run pre-storm signup pushes before the first major event, not after",
      "Market priority route spots before your calendar fills",
      "Use dependable response and safety messaging instead of bargain-first marketing"
    ],
    referralIdeas: [
      "Landscapers",
      "Property managers",
      "HOAs",
      "Handymen",
      "Realtors"
    ],
    neighborhoodMarketingIdeas: [
      "Priority-route enrollment by subdivision",
      "Storm-alert campaigns",
      "Seasonal contract reminders",
      "Neighbor route signups after the first successful storm"
    ],
    socialProofIdeas: [
      "Storm-response updates",
      "Review snippets about reliability in bad weather",
      "Clean driveway after-storm photos"
    ],
    beforeAfterContentIdeas: [
      "Pre- and post-storm clearing",
      "Walkway safety improvement",
      "Route readiness content",
      "Ice-treatment before-and-after visuals"
    ],
    googleBusinessProfileGuidance: [
      "Use keywords around snow removal, driveway clearing, walkway clearing, and ice management.",
      "Ask reviews to mention reliability, communication, and performance during real storms.",
      "Post pre-season signup content before winter and storm update content during active weather."
    ],
    leadResponseProcess: [
      "Confirm address, trigger-depth expectations, walkway scope, and whether salt is requested before quoting.",
      "Tag priority accounts separately from on-demand prospects so dispatch decisions stay clear during storms.",
      "If the customer is outside your planned route, price for that reality or decline before the storm hits."
    ],
    quotingProcess: [
      "Clarify the pricing model and service trigger in plain language before the customer commits.",
      "Define where snow will be placed, whether repeat passes are included, and how longer storms are handled.",
      "Use seasonal or retainer options when possible because they stabilize a highly variable business."
    ],
    schedulingProcess: [
      "Pre-build the route order before storms and know who gets first-pass priority.",
      "Use automated status updates when storms hit so customers know you are active and coming.",
      "Leave room for repeat passes and route disruptions instead of planning a perfect one-pass day."
    ],
    jobPrep: [
      "Fuel and stage equipment before the storm arrives, not after the first call comes in.",
      "Review route order, salt inventory, and weather timing before the first dispatch.",
      "Check vehicle winter readiness, lights, and backup gear every time a storm is forecast."
    ],
    completionChecklist: [
      "Confirm the driveway is clear, walkway is safe, and any salt application is recorded before moving to the next stop.",
      "Log route completion, issues, and whether the account may need a second pass based on continuing snowfall.",
      "Send the customer a short completion update if that is part of the service promise."
    ],
    invoicing: [
      "Use pre-authorized cards or seasonal billing structures whenever possible because storm-day collections create friction.",
      "Track per-push or per-event margin carefully so you know which account types actually work.",
      "Document any extra passes, salt use, or special access complications on the invoice."
    ],
    reviewRequestProcess: [
      "Ask after dependable service through a meaningful storm event when the customer has real context for the value.",
      "Highlight responsiveness, reliability, and communication in the review prompt.",
      "If seasonal clients are happy, ask for both a review and a neighbor referral before the next storm."
    ],
    followUpProcess: [
      "Re-open seasonal contracts and on-demand customers before the next forecasted storm wave.",
      "Offer priority-route enrollment to on-demand customers after they experience the service once.",
      "Keep a list of high-density neighborhoods where storm response produced the best future route potential."
    ],
    executionFocus: [
      "Set trigger-depth pricing, route radius, and seasonal contract rules before winter demand hits.",
      "Launch pre-storm signup campaigns and priority-route offers before weather arrives.",
      "Refine storm dispatch process and per-push pricing after early events.",
      "Install status-update and invoice-collection workflows.",
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
    summary:
      "A route-based sanitation service with recurring plan potential, simple subscription packaging, and strong neighborhood density upside. It becomes attractive when the operator aligns service days with trash pickup patterns and keeps the brand clean, practical, and professional.",
    teaser:
      "Use pickup-day routing, subscription billing, and odor-control upsells to turn a niche service into a real route business.",
    goodFor: [
      "Founders who like recurring routes and simple offer design",
      "Operators comfortable with outdoor sanitation work and process discipline",
      "People who want a lean specialty service with subscription potential"
    ],
    operatorModel:
      "Strong solo launch business when route density and pickup-day logic are built early instead of treated as an afterthought.",
    teamModel:
      "Can scale into route technicians once recurring density is strong enough to justify additional equipment and tighter zones.",
    serviceMode: "Outdoor / mobile route service",
    difficulty: "Beginner-friendly if sanitation, routing, and recurring billing stay organized",
    startup_cost_range: "$1,500-$8,000",
    revenue_90_range: "$3,000-$18,000",
    revenue_1yr_range: "$40,000-$130,000",
    margin_range: "35%-55%",
    demandLevel: "High in suburban neighborhoods where odor control and convenience resonate",
    seasonality:
      "Generally stable, with added urgency in hot months when smell and residue become more noticeable.",
    recurringRevenuePotential:
      "High through monthly or biweekly sanitation plans tied to local trash pickup schedules.",
    recommended_first_offer: "Monthly dual-bin sanitation plan",
    whyAttractive:
      "It is a simple subscription-style service with strong route density potential once a neighborhood starts converting.",
    whyPeopleStartIt:
      "The offer is niche, easy to explain, and can be launched without the complexity of larger home-service categories.",
    pros: [
      "Recurring subscription potential",
      "Niche positioning with low direct local competition in some markets",
      "Good route-density upside",
      "Simple packaging and add-on structure"
    ],
    cons: [
      "Requires visible sanitation professionalism",
      "Needs route density to work well",
      "Some customer education is needed at first",
      "Runoff and cleanup discipline matter"
    ],
    bestFitOperatorType:
      "A route-focused operator who likes recurring service, clear process, and neighborhood clustering more than custom jobs.",
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
      "Drain-safe runoff plan or containment process",
      "PPE gear",
      "Bin hooks or handling tools",
      "Odor treatment products",
      "Route planner",
      "Receipt and service-note template"
    ],
    equipment: [
      "Pressure washer",
      "Sanitation chemical setup",
      "Bin handling tools",
      "PPE",
      "Route bins",
      "Water and drainage management supplies"
    ],
    vehicleNeeds: [
      "Truck, trailer, or van-based mobile cleaning setup",
      "Organized water and sanitation storage that keeps the vehicle clean and efficient",
      "Routing tied to trash pickup days so the vehicle is used on predictable neighborhood loops"
    ],
    requiredItems: [
      "Cleaning setup",
      "Sanitation PPE",
      "General liability coverage",
      "Recurring billing setup",
      "Business phone and CRM"
    ],
    optionalItems: [
      "Custom trailer rig",
      "Branded route vehicle",
      "Odor-treatment upsell inventory",
      "Neighborhood signage",
      "Automated pickup-day reminder flow"
    ],
    softwareNotes: {
      CRM: "Track pickup day, number of bins, subscription status, odor-treatment add-ons, and one-time reset customers for conversion follow-up.",
      Scheduling: "The business wins when monthly routes are clustered tightly by neighborhood and pickup pattern.",
      Invoicing: "Autopay is especially helpful because tickets are recurring and operationally small."
    },
    commonLicenseCategories: [
      "General business license",
      "Wastewater or runoff questions",
      "Sanitation-related local guidance"
    ],
    localAgencyPrompts: [
      "Are there runoff, drain, or sanitation rules for mobile bin cleaning in this city or county?",
      "Do I need a general business license for a monthly bin sanitation route?",
      "Are there disposal or wastewater rules I should follow after cleaning routes?"
    ],
    commercialAutoNote:
      "Recommended because the vehicle often functions as the mobile service platform and carries equipment, water, and sanitation products.",
    equipmentCoverageNote:
      "Useful if you invest in a custom rig or specialized cleaning setup that would be expensive to replace.",
    questionsToAskAgent: [
      "Does the policy cover runoff-related damage claims or customer property concerns tied to the service?",
      "How should I describe the mobile sanitation setup and vehicle use on the policy?",
      "If I add route staff, what coverage changes should I plan for?"
    ],
    starterOffer: "Monthly dual-bin sanitation plan timed to local pickup schedules.",
    standardOffer: "Monthly or biweekly sanitation with odor treatment and lid-detail clean.",
    premiumOffer: "Premium sanitation plan with odor treatment, reminder notifications, and priority routing.",
    addOns: [
      "Extra bin",
      "Odor treatment",
      "One-time reset clean",
      "Biweekly service",
      "HOA or multi-home route bundle"
    ],
    recurringOption: "Monthly or biweekly recurring sanitation subscription.",
    minimumPriceGuidance:
      "Use a route-aware minimum so low-density neighborhoods or one-off resets do not quietly erode the model.",
    sampleUpsells: [
      "Add an extra bin",
      "Upgrade to biweekly service",
      "Add odor treatment during warmer months"
    ],
    pricingNotes: [
      "Density and number of bins matter more than just service time.",
      "One-time reset cleans should be priced differently from clean recurring accounts.",
      "Route days aligned to pickup patterns create better margins than random booking windows."
    ],
    bestFirstLeadSources: [
      "Neighborhood groups",
      "Google Business Profile",
      "Route flyer drops",
      "HOA or property manager relationships"
    ],
    onlineSources: [
      "Google Business Profile",
      "Neighborhood Facebook groups",
      "Nextdoor",
      "HOA community boards"
    ],
    offlineSources: [
      "Door hangers",
      "Neighborhood flyers",
      "HOA or property-manager outreach",
      "Partner referrals from pet-waste and lawn providers"
    ],
    localOutreachIdeas: [
      "Target suburban family neighborhoods with clear pickup-day scheduling language",
      "Offer same-street signup incentives to build route density fast",
      "Use hot-weather odor messaging carefully but professionally without sounding gimmicky"
    ],
    referralIdeas: [
      "Pet-waste removal services",
      "Landscapers",
      "HOAs",
      "Property managers",
      "Pressure washers"
    ],
    neighborhoodMarketingIdeas: [
      "Monthly route openings by subdivision",
      "Bin-day reminder marketing",
      "Neighbor referral incentives",
      "Summer odor-control campaigns"
    ],
    socialProofIdeas: [
      "Sanitized-bin before-and-after visuals",
      "Odor-treatment proof",
      "Review snippets around convenience and cleanliness"
    ],
    beforeAfterContentIdeas: [
      "Bin lid and interior cleaning comparison",
      "Route-day content",
      "Odor-treatment story posts",
      "One-time reset to subscription conversion proof"
    ],
    googleBusinessProfileGuidance: [
      "Use keywords around trash bin cleaning, bin sanitation, and odor control.",
      "Ask reviews to mention convenience, cleanliness, and communication.",
      "Post clean visuals and simple explanations so customers quickly understand what the service does and why it matters."
    ],
    leadResponseProcess: [
      "Ask how many bins, service address, and preferred day after local pickup before quoting.",
      "Tag one-time reset leads separately from subscription prospects so follow-up matches the goal.",
      "If the lead is outside your route pattern, either price for it intentionally or wait until density exists nearby."
    ],
    quotingProcess: [
      "Use subscription pricing first, then clearly separate extra-bin and one-time-reset logic.",
      "Clarify pickup-day assumptions, what gets sanitized, and whether odor treatment is included or optional.",
      "Offer the recurring plan next to the one-time option so the customer sees the better long-term choice."
    ],
    schedulingProcess: [
      "Route based on local trash pickup patterns and keep neighborhoods grouped tightly.",
      "Send reminder or completion notifications if they are part of the package so the service feels active and reliable.",
      "Use one dedicated route day per pickup zone when possible instead of custom scheduling every customer."
    ],
    jobPrep: [
      "Review pickup calendar, route notes, and subscription exceptions before the day starts.",
      "Stage chemicals, PPE, and service tools in the order they will be used on route.",
      "Check runoff plan and drainage assumptions before leaving for the first stop."
    ],
    completionChecklist: [
      "Confirm bins were cleaned, deodorized if included, and left tidy in the agreed spot.",
      "Log service notes and whether the customer is a good fit for biweekly or multi-bin upsells.",
      "If part of the package, send the completion note while the service is still fresh."
    ],
    invoicing: [
      "Use recurring autopay for subscription accounts so route days stay operationally simple.",
      "Keep one-time reset jobs separate from route billing so true subscription performance stays clear.",
      "If the customer adds bins or changes frequency, update the recurring amount immediately instead of waiting."
    ],
    reviewRequestProcess: [
      "Ask after the customer has seen and smelled the difference, especially during warmer months when the value is obvious.",
      "Keep the tone practical and professional and suggest they mention convenience and cleanliness.",
      "For subscription customers, ask after a dependable sequence of visits rather than after the very first clean."
    ],
    followUpProcess: [
      "Prompt one-time reset customers into a subscription while the difference is still obvious.",
      "Reactivate paused accounts before hot-weather peaks or after neighborhood pickup changes.",
      "Offer odor treatment and extra-bin upgrades based on household size and season."
    ],
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
      "Subscription-conversion workflow for one-time jobs",
      "Neighbor referral campaign"
    ]
  },
  {
    id: "holiday-light-installation",
    name: "Holiday Light Installation",
    tags: ["low5k", "low10k", "crew", "outdoor", "high", "seasonal"],
    summary:
      "A premium seasonal exterior service with strong visual appeal, short-window urgency, and meaningful ticket sizes. The model works when the operator pre-books installs, controls takedown and storage, and sells design plus convenience instead of just labor.",
    teaser:
      "Sell the holiday look early, control the schedule before the rush, and turn annual clients into a renewable seasonal book.",
    goodFor: [
      "Operators comfortable with ladders and roofline safety",
      "Founders who like premium seasonal project work and visual selling",
      "People who can market urgency, aesthetics, and annual repeat service"
    ],
    operatorModel:
      "Can launch small with simple roofline packages, but crew support quickly improves install, takedown, and seasonal capacity.",
    teamModel:
      "Naturally crew-based once display complexity and install volume increase.",
    serviceMode: "Outdoor / on-site seasonal project service",
    difficulty: "Moderate because safety, seasonal compression, and logistics matter heavily",
    startup_cost_range: "$2,500-$12,000",
    revenue_90_range: "$6,000-$40,000",
    revenue_1yr_range: "$40,000-$180,000",
    margin_range: "30%-50%",
    demandLevel: "High during Q4 in many suburban homeowner markets",
    seasonality:
      "Heavily seasonal around Q4 and holiday periods, with takedown and storage carrying into early Q1.",
    recurringRevenuePotential:
      "Moderate through annual return clients, maintenance coverage, and storage-based renewal relationships.",
    recommended_first_offer: "Roofline + entryway light install package",
    whyAttractive:
      "The service is highly visible, customers pay for convenience and safety, and recurring annual clients can shorten the sales cycle in future seasons.",
    whyPeopleStartIt:
      "Customers value the finished look and reduced risk, which supports premium pricing during a short, urgent season.",
    pros: [
      "Premium pricing potential",
      "Strong visual marketing value",
      "Seasonal urgency helps sales",
      "Annual repeat clients are possible"
    ],
    cons: [
      "Short selling season",
      "Safety matters on every install",
      "Storage and takedown need planning",
      "Weather can compress already-busy schedules"
    ],
    bestFitOperatorType:
      "An organized operator who can sell premium visual outcomes, manage seasonal scheduling tightly, and enforce safety without compromise.",
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
      "Design mockup or measurement sheet"
    ],
    equipment: [
      "Ladders",
      "Roof safety gear",
      "Lighting storage",
      "Timers and cords",
      "Fastener kit",
      "Labeling and storage system"
    ],
    vehicleNeeds: [
      "Truck, van, or trailer for ladders, storage reels, and lighting inventory",
      "Enough organization to separate install-day inventory from takedown and storage materials",
      "A clean storage plan matters because seasonal inventory gets chaotic fast"
    ],
    requiredItems: [
      "Safety gear",
      "Ladders",
      "Lighting materials",
      "General liability coverage",
      "Design and quote template"
    ],
    optionalItems: [
      "Storage unit",
      "Premium custom-cut lighting inventory",
      "Crew communication tools",
      "Photo mockup software",
      "Maintenance-call workflow"
    ],
    softwareNotes: {
      CRM: "Track roofline complexity, supply model, install date, takedown date, storage status, and annual renewal timing.",
      Scheduling: "Install dates, maintenance coverage, takedown routes, and storage intake all need to be coordinated before the season peaks.",
      "Graphic design / content": "Simple mockups and polished night-time proof help close premium seasonal work fast."
    },
    commonLicenseCategories: [
      "General business license",
      "Contractor registration questions depending on electrical scope",
      "HOA or local decoration rules in some communities"
    ],
    localAgencyPrompts: [
      "Does decorative light installation require any contractor or specialty registration here?",
      "Are there HOA or local restrictions homeowners should check before installation?",
      "If I provide timers, connections, or light modifications, does that create any additional local requirements?"
    ],
    commercialAutoNote:
      "Recommended because ladders, lights, and gear travel to every project during a compressed season.",
    equipmentCoverageNote:
      "Useful if you own significant light inventory, ladders, timers, or storage materials across seasons.",
    questionsToAskAgent: [
      "Does the policy cover ladder and roofline work tied to seasonal installations?",
      "How should I insure stored lighting inventory between seasons?",
      "If I offer maintenance visits during the season, is that already contemplated by the policy?"
    ],
    starterOffer: "Roofline and entryway light install package with clear install and takedown terms.",
    standardOffer: "Front elevation install with timers, clips, and scheduled takedown.",
    premiumOffer: "Custom design, premium install, maintenance, takedown, and storage package.",
    addOns: [
      "Tree wrap",
      "Wreath and garland install",
      "Maintenance visit",
      "Storage package",
      "Additional elevation or backyard feature"
    ],
    recurringOption:
      "Annual install, takedown, and storage client relationship with priority renewal.",
    minimumPriceGuidance:
      "Price for install labor, design time, takedown, maintenance, and storage, not just the first visit to hang lights.",
    sampleUpsells: [
      "Add tree wrap or garland features",
      "Upgrade to annual storage package",
      "Add in-season maintenance coverage"
    ],
    pricingNotes: [
      "Clarify whether lights are customer-supplied or company-supplied and how replacements are handled.",
      "Include takedown timing, storage rules, and maintenance terms in the quote so customers do not treat them as free.",
      "Roofline complexity, tree wrapping, and custom design should be priced intentionally, not guessed."
    ],
    bestFirstLeadSources: [
      "Neighborhood proof posts",
      "Google Business Profile",
      "Past-customer annual renewal list",
      "HOA communities",
      "Realtor and landscaper referrals"
    ],
    onlineSources: [
      "Google Business Profile",
      "Facebook community groups",
      "Instagram visual proof",
      "Neighborhood apps"
    ],
    offlineSources: [
      "Yard signs",
      "Door hangers before the season",
      "Referral asks from past clients",
      "HOA-safe community outreach"
    ],
    localOutreachIdeas: [
      "Launch pre-book campaigns before the season starts and the calendar compresses",
      "Offer limited install slots to create urgency honestly",
      "Show night-time proof and premium design rather than sounding like generic handyman labor"
    ],
    referralIdeas: [
      "Landscapers",
      "Realtors",
      "HOA boards",
      "Painters",
      "Pressure washers"
    ],
    neighborhoodMarketingIdeas: [
      "Same-street install visibility",
      "Annual route pre-booking",
      "Holiday display gallery by neighborhood",
      "Storage client renewal pushes"
    ],
    socialProofIdeas: [
      "Night-time home photos",
      "Customer holiday review snippets",
      "Install highlight reels"
    ],
    beforeAfterContentIdeas: [
      "Dark roofline to lit display",
      "Tree wrap transformation",
      "Holiday curb-appeal showcase",
      "Takedown and storage professionalism content"
    ],
    googleBusinessProfileGuidance: [
      "Use keywords for holiday lights, Christmas light installation, seasonal display install, and takedown service.",
      "Ask reviews to mention professionalism, safety, and the final visual result.",
      "Post night-time proof prominently and seasonally update the profile before the booking rush."
    ],
    leadResponseProcess: [
      "Ask home type, roofline complexity, desired display style, and whether lights are customer-supplied or company-supplied.",
      "Log install, takedown, storage, and maintenance interest separately because those choices drive price and capacity.",
      "If the property needs a custom quote, move quickly to photos or a site visit instead of dragging out text exchanges."
    ],
    quotingProcess: [
      "Use design tiers and clarify install, maintenance, takedown, and storage assumptions in the estimate.",
      "Be explicit about electrical limitations, weather delays, and replacement rules for damaged or failed materials.",
      "Offer the annual service path upfront so the customer sees the easier repeat option."
    ],
    schedulingProcess: [
      "Book install windows early and reserve takedown routes later in the season before the calendar becomes chaotic.",
      "Send confirmation reminders and prep notes so access, power sources, and any HOA rules are understood before arrival.",
      "Protect capacity by not overbooking the same weather window with too many large installs."
    ],
    jobPrep: [
      "Review design, ladder plan, roofline complexity, and safety setup before leaving for the property.",
      "Stage clips, cords, timers, and lighting inventory by property so install order is simple.",
      "Take before photos and note any roofline or electrical issues before full installation begins."
    ],
    completionChecklist: [
      "Test lights, timers, and connections before presenting the result.",
      "Save photo proof, note any in-season maintenance promises, and record the takedown or storage plan clearly.",
      "Confirm the customer knows how to contact you if a section fails during the season."
    ],
    invoicing: [
      "Use deposit plus balance structure for larger packages and company-supplied inventory.",
      "Track annual renewals and storage clients separately because they are the highest-leverage book for next season.",
      "Make takedown and storage charges visible so they are not mentally treated as freebies."
    ],
    reviewRequestProcess: [
      "Ask once the homeowner has seen the display at night and feels the holiday result, not only in daylight.",
      "Use a premium service tone and prompt them to mention the design, professionalism, and convenience.",
      "For annual clients, pair the review ask with a note about priority renewal next season."
    ],
    followUpProcess: [
      "Rebook annual customers before the next season rather than waiting for them to remember in peak demand.",
      "Offer storage and maintenance follow-up after takedown to make renewal easier.",
      "Tag clients by display size and profitability so next season's sales effort starts with the best accounts."
    ],
    executionFocus: [
      "Define the supply model, install tiers, and takedown or storage structure.",
      "Launch pre-book marketing before the season compresses and show strong night-time proof.",
      "Refine design-based quoting and install timing after early jobs.",
      "Install maintenance, takedown, and review request workflows.",
      "Build annual renewal clients and route density while protecting install capacity.",
      "Document install, takedown, and storage SOPs to make the short season efficient."
    ],
    advancedSystems: [
      "Annual renewal campaign",
      "Takedown and storage workflow automation",
      "Premium display upsell sequence"
    ]
  },
  {
    id: "garage-door-service",
    name: "Garage Door Service",
    tags: ["low5k", "low10k", "solo", "indoor", "outdoor", "mobile", "high"],
    summary:
      "A high-trust local service niche with urgent repair demand, strong service-call economics, and valuable local search intent. It rewards operators who control safety, parts, and diagnostics while communicating clearly enough that customers feel the problem is being handled by a specialist.",
    teaser:
      "Lead with the service call, solve urgent door problems fast, and turn tune-ups into long-term trust and referrals.",
    goodFor: [
      "Mechanically inclined operators who value safe technical work",
      "Founders comfortable with home-service sales and diagnostic conversations",
      "People who want urgent-demand local service with strong average tickets"
    ],
    operatorModel:
      "Can launch solo with a controlled scope, strong safety standards, and a disciplined diagnostic and parts process.",
    teamModel:
      "Can scale into multiple service vans or helper-supported repair and install days as demand grows.",
    serviceMode: "Indoor / outdoor / mobile home service",
    difficulty: "Moderate because safety, parts, and technical accuracy all matter",
    startup_cost_range: "$3,500-$14,000",
    revenue_90_range: "$8,000-$35,000",
    revenue_1yr_range: "$100,000-$260,000",
    margin_range: "30%-50%",
    demandLevel: "High because broken doors create immediate homeowner stress and safety concerns",
    seasonality:
      "Stable year-round because breakdowns and tune-up needs are not highly seasonal.",
    recurringRevenuePotential:
      "Moderate through annual tune-ups, property-manager relationships, and safety-check plans.",
    recommended_first_offer: "Tune-up + balance + safety check service",
    whyAttractive:
      "Urgent repair demand plus homeowner trust value supports premium service-call positioning and strong local search conversion.",
    whyPeopleStartIt:
      "The work solves a real pain point quickly, and a professional process can support strong average tickets without a massive team.",
    pros: [
      "Urgent demand and strong local search intent",
      "Good service-call economics when diagnostics are paid",
      "Property-manager and realtor referral potential",
      "Annual tune-up or safety-plan pathway"
    ],
    cons: [
      "Safety risk is significant",
      "Technical errors can be costly",
      "Parts and inventory discipline matter",
      "Scope must stay clear between repair, tune-up, and replacement"
    ],
    bestFitOperatorType:
      "A technically disciplined operator who communicates clearly, respects safety rigorously, and can handle urgent homeowner concerns without rushing the work.",
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
      "Cable and roller tools",
      "Safety clamps",
      "Diagnostic checklist",
      "PPE",
      "Service inventory bins"
    ],
    equipment: [
      "Garage door service tools",
      "Safety clamps",
      "Winding bars",
      "Inventory bins",
      "Diagnostic gear",
      "Organized van shelving"
    ],
    vehicleNeeds: [
      "Van or truck with organized part and tool storage",
      "Safe transport for springs, rollers, cables, and opener hardware",
      "Enough inventory organization to support urgent repairs without guesswork"
    ],
    requiredItems: [
      "Safety tools",
      "General liability and relevant vehicle coverage",
      "Diagnostic checklist",
      "Parts organization system",
      "Business phone and CRM"
    ],
    optionalItems: [
      "Expanded parts inventory",
      "Second technician support",
      "Priority scheduling system",
      "Tune-up membership flow",
      "Replacement-door partner workflow"
    ],
    softwareNotes: {
      CRM: "Track door type, opener type, spring size, service history, parts used, and replacement versus repair outcome on every property.",
      Scheduling: "Reserve emergency windows if urgent repairs are part of the model and avoid stacking too many diagnostic unknowns back-to-back.",
      Invoicing: "Separate service call, labor, and parts clearly so customers understand the value and your margins stay visible."
    },
    commonLicenseCategories: [
      "General business license",
      "Contractor or specialty trade questions in some states",
      "Electrical scope rules if opener installs or wiring are involved"
    ],
    localAgencyPrompts: [
      "Does garage door repair require contractor registration or a specialty license here?",
      "What changes if I install openers or perform electrical-related work?",
      "Are there local permit or inspection rules for full replacement jobs?"
    ],
    commercialAutoNote:
      "Recommended because the service vehicle carries tools, parts, and inventory every day.",
    equipmentCoverageNote:
      "Useful if stocked inventory and specialty tools in the van represent material value that would disrupt operations if lost.",
    questionsToAskAgent: [
      "Does the policy cover garage door failure after service if workmanship is alleged?",
      "How should I cover service inventory and specialty tools stored in the vehicle?",
      "If I add technicians or helpers, what workers' compensation or liability questions should I revisit?"
    ],
    starterOffer: "Tune-up, balance, and safety-check service with a clear paid diagnostic path.",
    standardOffer: "Tune-up plus common roller, cable, or hardware repair package.",
    premiumOffer: "Priority diagnostic and repair package with parts coordination and opener performance review.",
    addOns: [
      "Roller upgrade",
      "Opener tune-up",
      "Weather seal replacement",
      "Property-manager priority service",
      "Annual safety plan"
    ],
    recurringOption: "Annual safety and tune-up plan for households or landlord portfolios.",
    minimumPriceGuidance:
      "Always charge for the service call and diagnostic time. Garage door service should not turn into free estimating with high safety exposure.",
    sampleUpsells: [
      "Add opener tune-up or roller upgrade",
      "Enroll in an annual safety-check plan",
      "Convert a tune-up into a broader repair or replacement consult when appropriate"
    ],
    pricingNotes: [
      "Separate service call, diagnostic, labor, and parts clearly in every quote and invoice.",
      "Be explicit about safety limits and when full replacement is a better path than repair.",
      "Urgent demand supports premium pricing only when communication and professionalism match it."
    ],
    bestFirstLeadSources: [
      "Google Business Profile",
      "Property managers",
      "Realtors",
      "Local urgent-need search traffic",
      "Handyman and contractor referrals"
    ],
    onlineSources: [
      "Google Business Profile",
      "Local search ads if tightly managed",
      "Neighborhood groups",
      "Property manager forums"
    ],
    offlineSources: [
      "Property manager visits",
      "Realtor and handyman referrals",
      "Truck signage",
      "Partnership cards with related home-service providers"
    ],
    localOutreachIdeas: [
      "Market safety and fast response rather than discounts",
      "Target landlords and property managers with annual tune-up plans and priority dispatch",
      "Use trust-first language because homeowners are buying confidence as much as the repair"
    ],
    referralIdeas: [
      "Handymen",
      "Realtors",
      "Property managers",
      "Painters",
      "General contractors"
    ],
    neighborhoodMarketingIdeas: [
      "Safety-check seasonal reminders",
      "New-homeowner tune-up offer",
      "Landlord portfolio service messaging",
      "Opener-upgrade and weather-seal campaigns"
    ],
    socialProofIdeas: [
      "Review snippets around reliability and professionalism",
      "Organized service-van visuals",
      "Service-call outcome graphics that explain the solved problem"
    ],
    beforeAfterContentIdeas: [
      "Roller or track improvement closeups",
      "Safety-check explanation content",
      "Garage-door curb-appeal posts",
      "Before-and-after tune-up or seal replacement visuals"
    ],
    googleBusinessProfileGuidance: [
      "Use keywords around garage door repair, opener tune-up, spring repair, and safety checks.",
      "Ask reviews to mention speed, clarity, professionalism, and how the door works after service.",
      "Use local search content that explains problems solved, not just generic promises of quality."
    ],
    leadResponseProcess: [
      "Ask door symptoms, opener behavior, current safety concerns, and whether the door is stuck open, stuck closed, or still operating poorly.",
      "Separate true emergencies from tune-up requests so scheduling stays rational.",
      "If the customer is describing something outside your launch scope, say that early and route them appropriately."
    ],
    quotingProcess: [
      "Lead with service-call pricing and explain likely repair paths without promising exact parts or outcomes before inspection.",
      "Keep tune-up, repair, and replacement options distinct so the customer sees the decision clearly.",
      "Avoid remote overpromising on spring, opener, or cable issues until the system is inspected safely."
    ],
    schedulingProcess: [
      "Reserve emergency windows in the calendar if urgent repairs are part of the offer.",
      "Confirm access, vehicle clearance, and whether someone needs the door working by a specific deadline.",
      "Use clear arrival updates because urgency creates anxiety and communication is part of the service."
    ],
    jobPrep: [
      "Review likely parts, door type, and recent customer notes before dispatch.",
      "Stage safety tools and inventory bins in the vehicle so urgent repairs are handled calmly.",
      "Know the safety boundaries and lockout approach before touching the system."
    ],
    completionChecklist: [
      "Confirm door balance, safety checks, and installed parts before closing out the job.",
      "Explain what was done, what should be watched, and whether any future work is recommended.",
      "Save parts, symptom, and property notes so future service or annual tune-up outreach is more informed."
    ],
    invoicing: [
      "Invoice service call and parts clearly so the customer sees both the diagnosis and the repair work.",
      "Use deposits if special-order parts or full replacements are involved.",
      "If replacement is the real recommendation, invoice the diagnostic cleanly and keep the larger estimate separate."
    ],
    reviewRequestProcess: [
      "Ask once the door is operating smoothly and the safety concern is clearly resolved.",
      "Use trust and professionalism language in the review request.",
      "For property managers or landlords, combine the review ask with an invitation to set up annual tune-up coverage."
    ],
    followUpProcess: [
      "Re-open replacement or additional repair opportunities after the service call when the customer has had time to think.",
      "Offer annual tune-up reminders to completed customers and property managers.",
      "Tag customers by door type and service category so future outreach is more relevant."
    ],
    executionFocus: [
      "Define the launch scope, service-call pricing, and safety boundaries clearly.",
      "Launch trust-first local search positioning and partner outreach to landlords and realtors.",
      "Refine triage, parts assumptions, and diagnostic workflow after early service calls.",
      "Install clean invoicing, note-taking, and review request habits.",
      "Add annual tune-up plans and property-manager relationships for steadier repeat work.",
      "Document intake, diagnostics, and closeout SOPs so the service feels expert and controlled."
    ],
    advancedSystems: [
      "Emergency-versus-standard dispatch workflow",
      "Annual tune-up reminder campaign",
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

/**
 * AVAN Group — English copy (plan §D + Phase 2 additions). Deliberately not
 * `as const`: `typeof en` is the shared `Copy` type, so strings must widen.
 * Do not paraphrase in components.
 */

export const en = {
  site: {
    name: "AVAN Group",
    motto: "Ordo Ex Intelligentia",
    mottoGloss: "Order from Intelligence",
    title: "AVAN Group — A patrimonial house",
    description:
      "AVAN Group is a patrimonial house — a sovereign, multigenerational parent that audits, builds, and compounds value across finance, technology, capital, and culture.",
  },

  nav: {
    links: [
      { label: "Rivers", hash: "#rivers" },
      { label: "The House", hash: "#layers" },
      { label: "Access", hash: "#privé" },
    ],
    cta: { label: "Request Introduction", hash: "#privé" },
    skip: "Skip to content",
    localeSwitch: { code: "FR", aria: "Version française" },
  },

  hero: {
    eyebrow: "AVAN GROUP · ORDO EX INTELLIGENTIA",
    wordmark: "AVAN",
    thesis: "Value, held across generations.",
    headline: "Order, from intelligence.",
    secondaryCta: { label: "Explore the house", hash: "#rivers" },
    scrollCue: "SCROLL",
  },

  provenance: {
    eyebrow: "THE HOUSE",
    head: "We were built to endure.",
    body: "AVAN Group is a patrimonial house. We audit what matters, build what lasts, and compound value with the patience of people who intend to be here in a hundred years. We do not chase the quarter. We keep the century.",
    support: "One parent. Four disciplines. A single standard of care.",
    imageAlt: "A neoclassical stone facade in raking afternoon light.",
  },

  rivers: {
    eyebrow: "WHAT WE HOLD",
    head: "Four rivers, one source.",
    intro:
      "Everything AVAN does flows from one discipline — the refusal to let value erode. It runs through four channels.",
    cards: [
      {
        title: "Finance",
        lede: "Trust, audited.",
        body: "Assurance, tax, and advisory conducted to institutional standard.",
        house: "PFI · Pro-Finance",
      },
      {
        title: "Technology",
        lede: "Intelligence, engineered.",
        body: "Automation, data, and research that compound quiet advantage.",
        house: "PFI Intelligence · AVAN Labs",
      },
      {
        title: "Capital",
        lede: "Value, expanded.",
        body: "Family office, private equity, and real assets held for the long horizon.",
        house: "AVAN Capital · AVAN Estates",
      },
      {
        title: "Culture",
        lede: "Meaning, made.",
        body: "Craft, design, and cultural work given a patient patron.",
        house: "AVAN Atelier · AVAN Culture",
      },
    ],
  },

  layers: {
    eyebrow: "HOW TRUST IS STRUCTURED",
    head: "Lineage, and the ledger.",
    body: "Two layers carry the house. AVAN holds the patrimony — the lineage, the long horizon, the seal. PFI holds the institutional standard — audit-grade rigor that lets counterparties rely on us without knowing us. One gives the house its permanence. The other gives it its proof.",
    panels: [
      {
        label: "AVAN",
        role: "Patrimony & Lineage",
        note: "The lineage, the long horizon, the seal.",
      },
      {
        label: "PFI",
        role: "Institutional Trust",
        note: "Audit-grade rigor, documented and relied upon.",
      },
    ],
    imageAlt: "An open leather-bound ledger on a marble desk, warm window light.",
  },

  stone: {
    eyebrow: "AVAN YEQARA",
    head: "The stone keeps its shape under pressure.",
    tenets: [
      { label: "Permanence", line: "Built to outlast the people who built it." },
      { label: "Rarity", line: "Value is scarce by design, never diluted." },
      { label: "Resilience", line: "It holds its form under pressure. It does not break." },
      { label: "Integrity", line: "One standard, applied everywhere, unwatched." },
    ],
    closing: "A house should be measured the way a stone is — by what it survives.",
    imageAlt: "Brushed bronze catching warm light, close detail.",
  },

  register: {
    eyebrow: "THE PRINCIPALS",
    head: "You arrive carrying weight. We expect to share it.",
    litany: [
      "To the builder who has just become liquid: it is now in disciplined custody.",
      "To the steward of a name older than any market: nothing here will be squandered.",
      "To the heir: you will be trusted, not managed.",
      "To the counterparty: the rigor is institutional, and it is documented.",
      "To the maker: your craft has a patron, not a landlord.",
    ],
    imageAlt: "A brass seal pressed into wax on cream paper — a mark of trust.",
  },

  figures: {
    eyebrow: "THE HOUSE IN FIGURES",
    stats: [
      { value: "04", label: "Disciplines" },
      { value: "02", label: "Layers of trust" },
      { value: "00", label: "Exits from the house" },
      { value: "01", label: "Standard of care" },
      { value: "∞", label: "Horizon" },
    ],
    footnote: "We keep few numbers in public. These are the ones that matter.",
  },

  voice: {
    quote:
      "We measure in decades, answer to descendants, and treat every mandate as though the family name were on it — because it is.",
    attribution: "— AVAN GROUP",
  },

  prive: {
    eyebrow: "PRIVÉ",
    head: "Privileged access, by introduction.",
    body: "AVAN does not advertise its mandates and does not take them at volume. If your matter requires a house that thinks in generations, begin a private conversation.",
    fields: {
      name: "Name",
      email: "Email",
      nature: "Nature of inquiry",
      note: "A short note",
    },
    // `value` is the stable API enum (never localized); `label` is displayed.
    natures: [
      { value: "Capital", label: "Capital" },
      { value: "Advisory", label: "Advisory" },
      { value: "Institutional", label: "Institutional" },
      { value: "Cultural", label: "Cultural" },
      { value: "Other", label: "Other" },
    ],
    submit: "Request an introduction",
    submitting: "Sending…",
    reassurance:
      "Held in confidence. Reviewed personally. Not every inquiry becomes a conversation.",
    success: "Received. If it is a fit, you will hear from us directly.",
    registers: {
      Capital: {
        reassurance:
          "Capital is read at principal level. An inquiry creates no obligation — on either side.",
        success:
          "Received. Capital matters are answered by someone with the authority to act on them.",
      },
      Advisory: {
        reassurance:
          "Advisory mandates are taken on one condition — that we can hold your standard.",
        success: "Received. Expect a considered reply, not a brochure.",
      },
      Institutional: {
        reassurance: "Institutional inquiries are answered with documentation, not assurances.",
        success: "Received. The rigor you are testing for is the rigor that will reply.",
      },
      Cultural: {
        reassurance: "Cultural work is read as patronage, not sponsorship. Bring the craft.",
        success: "Received. Your work will be read by people who intend to see it endure.",
      },
      Other: {
        reassurance:
          "Held in confidence. Reviewed personally. Not every inquiry becomes a conversation.",
        success: "Received. If it is a fit, you will hear from us directly.",
      },
    },
    protocol: [
      {
        term: "In confidence",
        line: "What you write is read by principals of the house, and goes no further.",
      },
      {
        term: "Personal review",
        line: "There is no queue and no team inbox. A principal reads every inquiry.",
      },
      {
        term: "No obligation",
        line: "A conversation is not a mandate. Either side may close the door quietly.",
      },
    ],
  },

  colophon: {
    closing: "Ordo Ex Intelligentia.",
    lines: [
      "AVAN GROUP — a patrimonial house.",
      "PFI · Pro-Finance — institutional arm.",
      "© 2026 AVAN Group. All rights reserved.",
    ],
    links: [
      { label: "Privé", target: "prive" },
      { label: "PFI", target: "pfi" },
      { label: "Legal", target: "legal" },
      { label: "Privacy", target: "privacy" },
    ],
    micro: "By introduction only.",
    backToTop: "Back to top",
  },

  microcopy: {
    emailInvalid: "A working email, so we can reply.",
    nameInvalid: "Your name.",
    submitError: "Something interrupted us. Try once more.",
    loading: "Preparing the hall…",
  },

  pfi: {
    meta: {
      title: "PFI · Pro-Finance — the institutional arm of AVAN Group",
      description:
        "Assurance, tax, and advisory conducted to institutional standard — the documented rigor of the house.",
    },
    hero: {
      eyebrow: "PFI · PRO-FINANCE",
      head: "The standard, kept.",
      lede: "PFI is the institutional layer of the house — assurance, tax, and advisory conducted so counterparties can rely on us without knowing us.",
      motto: "ORDO EX INTELLIGENTIA",
      crestAlt: "The PFI crest — crown above the shield, the house motto beneath.",
    },
    standard: {
      eyebrow: "THE STANDARD",
      head: "Rigor, documented.",
      intro: "Three practices, one discipline: evidence over assertion.",
      rows: [
        {
          title: "Assurance",
          lede: "Audit, conducted properly.",
          body: "Institutional-grade assurance, where the working papers could stand in for the opinion.",
        },
        {
          title: "Tax",
          lede: "Structure that survives scrutiny.",
          body: "Cross-border structuring built to hold under review — this year's, and a decade's.",
        },
        {
          title: "Advisory",
          lede: "Counsel, measured in decades.",
          body: "Advice given as though we will be present when its consequences arrive. We intend to be.",
        },
      ],
    },
    intelligence: {
      eyebrow: "PFI INTELLIGENCE",
      head: "Systems that keep the ledger honest.",
      body: "Automation, data, and reporting built by the house's own engineers — so the rigor is enforced by systems, not memory.",
    },
    governance: {
      eyebrow: "GOVERNANCE",
      head: "The terms of reliance.",
      items: [
        {
          term: "Independence",
          line: "Opinions are not for sale. Engagements that would compromise independence are declined.",
        },
        {
          term: "Documentation",
          line: "Every material judgment is written down, dated, and attributable.",
        },
        {
          term: "Confidentiality",
          line: "Client matters are discussed with no one — including each other, unless engaged jointly.",
        },
      ],
    },
    cta: {
      head: "Begin an institutional conversation.",
      body: "Counterparty diligence, engagement terms, and references are answered with documents.",
      button: "Request an introduction",
    },
  },

  legal: {
    meta: { title: "Legal notice", description: "Legal notice for AVAN Group, a patrimonial house, and its institutional arm PFI · Pro-Finance: publisher, host and terms of use of this site." },
    title: "Legal notice",
    updated: "Maintained by the house · July 2026",
    sections: [
      {
        h: "The house",
        body: "AVAN Group is a patrimonial holding. PFI · Pro-Finance is its institutional arm. Corporate identifiers, registered seat, and regulatory registrations are provided in engagement documentation and on request.",
      },
      {
        h: "This site",
        body: "This site presents the house. Nothing on it constitutes an offer of securities, investment advice, or a solicitation in any jurisdiction.",
      },
      {
        h: "Correspondence",
        body: "Formal correspondence is received through the introduction form. Legal notices are acknowledged in writing.",
      },
    ],
  },

  privacy: {
    meta: { title: "Privacy", description: "How AVAN Group handles the personal data you share through this site: what is collected, why, for how long, and your rights under the GDPR." },
    title: "Privacy",
    updated: "Maintained by the house · July 2026",
    sections: [
      {
        h: "What we hold",
        body: "If you write to us, we hold what you send: your name, your email, the nature of your inquiry, and your note. Nothing else is collected — no advertising cookies, no trackers, no analytics that identify you.",
      },
      {
        h: "How it is used",
        body: "To read your inquiry and, if it is a fit, to reply. It is not shared, sold, or added to any list.",
      },
      {
        h: "Your rights",
        body: "Write to us and your correspondence will be corrected or erased, completely. The same channel answers questions about this policy.",
      },
    ],
  },
};

export type Copy = typeof en;

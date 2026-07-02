import type { Copy } from "./en";

/**
 * AVAN Group — copie française. Écrite dans la voix de la maison : déclarative,
 * sobre, certaine. La maison affirme ; elle ne vend pas.
 */
export const fr: Copy = {
  site: {
    name: "AVAN Group",
    motto: "Ordo Ex Intelligentia",
    mottoGloss: "L'ordre né de l'intelligence",
    title: "AVAN Group — Une maison patrimoniale",
    description:
      "AVAN Group est une maison patrimoniale — une maison mère souveraine et multigénérationnelle qui audite, bâtit et fait fructifier la valeur à travers la finance, la technologie, le capital et la culture.",
  },

  nav: {
    links: [
      { label: "Rivières", hash: "#rivers" },
      { label: "La Maison", hash: "#layers" },
      { label: "Accès", hash: "#privé" },
    ],
    cta: { label: "Demander une introduction", hash: "#privé" },
    skip: "Aller au contenu",
    localeSwitch: { code: "EN", aria: "English version" },
  },

  hero: {
    eyebrow: "AVAN GROUP · ORDO EX INTELLIGENTIA",
    wordmark: "AVAN",
    thesis: "La valeur, tenue de génération en génération.",
    headline: "L'ordre, né de l'intelligence.",
    secondaryCta: { label: "Parcourir la maison", hash: "#rivers" },
    scrollCue: "DÉFILER",
  },

  provenance: {
    eyebrow: "LA MAISON",
    head: "Nous avons été bâtis pour durer.",
    body: "AVAN Group est une maison patrimoniale. Nous auditons ce qui compte, bâtissons ce qui dure, et faisons fructifier la valeur avec la patience de ceux qui comptent être là dans cent ans. Nous ne courons pas après le trimestre. Nous gardons le siècle.",
    support: "Une maison mère. Quatre disciplines. Un seul standard d'exigence.",
    imageAlt: "Une façade néoclassique en pierre sous une lumière rasante d'après-midi.",
  },

  rivers: {
    eyebrow: "CE QUE NOUS TENONS",
    head: "Quatre rivières, une source.",
    intro:
      "Tout ce que fait AVAN découle d'une seule discipline — le refus de laisser la valeur s'éroder. Elle coule par quatre canaux.",
    cards: [
      {
        title: "Finance",
        lede: "La confiance, auditée.",
        body: "Audit, fiscalité et conseil menés au standard institutionnel.",
        house: "PFI · Pro-Finance",
      },
      {
        title: "Technologie",
        lede: "L'intelligence, façonnée.",
        body: "Automatisation, données et recherche qui composent un avantage silencieux.",
        house: "PFI Intelligence · AVAN Labs",
      },
      {
        title: "Capital",
        lede: "La valeur, déployée.",
        body: "Family office, private equity et actifs réels tenus sur l'horizon long.",
        house: "AVAN Capital · AVAN Estates",
      },
      {
        title: "Culture",
        lede: "Le sens, créé.",
        body: "Artisanat, design et œuvre culturelle sous un mécénat patient.",
        house: "AVAN Atelier · AVAN Culture",
      },
    ],
  },

  layers: {
    eyebrow: "COMMENT LA CONFIANCE EST STRUCTURÉE",
    head: "La lignée, et le registre.",
    body: "Deux strates portent la maison. AVAN tient le patrimoine — la lignée, l'horizon long, le sceau. PFI tient le standard institutionnel — une rigueur d'audit qui permet aux contreparties de s'appuyer sur nous sans nous connaître. L'une donne à la maison sa permanence. L'autre, sa preuve.",
    panels: [
      {
        label: "AVAN",
        role: "Patrimoine & Lignée",
        note: "La lignée, l'horizon long, le sceau.",
      },
      {
        label: "PFI",
        role: "Confiance institutionnelle",
        note: "Une rigueur d'audit, documentée, sur laquelle on s'appuie.",
      },
    ],
    imageAlt: "Un registre relié de cuir, ouvert sur un bureau de marbre, dans une lumière chaude.",
  },

  stone: {
    eyebrow: "AVAN YEQARA",
    head: "La pierre garde sa forme sous la pression.",
    tenets: [
      { label: "Permanence", line: "Bâtie pour survivre à ceux qui l'ont taillée." },
      { label: "Rareté", line: "La valeur est rare par dessein, jamais diluée." },
      { label: "Résilience", line: "Elle tient sa forme sous la pression. Elle ne rompt pas." },
      { label: "Intégrité", line: "Un seul standard, appliqué partout, sans témoin." },
    ],
    closing: "On devrait mesurer une maison comme on mesure une pierre — à ce qu'elle traverse.",
    imageAlt: "Du bronze brossé saisi par une lumière chaude, en détail rapproché.",
  },

  register: {
    eyebrow: "LES MANDANTS",
    head: "Vous arrivez chargé de poids. Nous entendons le partager.",
    litany: [
      "Au bâtisseur devenu liquide : c'est désormais sous garde disciplinée.",
      "Au gardien d'un nom plus ancien que les marchés : rien ici ne sera dilapidé.",
      "À l'héritier : vous aurez notre confiance, non notre tutelle.",
      "À la contrepartie : la rigueur est institutionnelle, et elle est documentée.",
      "Au créateur : votre art a un mécène, pas un bailleur.",
    ],
    imageAlt: "Un sceau de laiton pressé dans la cire sur papier crème — une marque de confiance.",
  },

  figures: {
    eyebrow: "LA MAISON EN CHIFFRES",
    stats: [
      { value: "04", label: "Disciplines" },
      { value: "02", label: "Strates de confiance" },
      { value: "00", label: "Sorties de la maison" },
      { value: "01", label: "Standard d'exigence" },
      { value: "∞", label: "Horizon" },
    ],
    footnote: "Nous publions peu de chiffres. Voici ceux qui comptent.",
  },

  voice: {
    quote:
      "Nous mesurons en décennies, répondons aux descendants, et traitons chaque mandat comme si le nom de la famille y était engagé — parce qu'il l'est.",
    attribution: "— AVAN GROUP",
  },

  prive: {
    eyebrow: "PRIVÉ",
    head: "Accès privilégié, sur introduction.",
    body: "AVAN n'affiche pas ses mandats et ne les prend pas en volume. Si votre affaire requiert une maison qui pense en générations, engagez une conversation privée.",
    fields: {
      name: "Nom",
      email: "Courriel",
      nature: "Nature de la demande",
      note: "Un mot",
    },
    natures: [
      { value: "Capital", label: "Capital" },
      { value: "Advisory", label: "Conseil" },
      { value: "Institutional", label: "Institutionnel" },
      { value: "Cultural", label: "Culturel" },
      { value: "Other", label: "Autre" },
    ],
    submit: "Demander une introduction",
    submitting: "Envoi…",
    reassurance:
      "Tenu confidentiel. Lu personnellement. Toute demande ne devient pas une conversation.",
    success: "Reçu. Si l'affaire s'y prête, nous vous contacterons directement.",
    registers: {
      Capital: {
        reassurance:
          "Le capital se lit au niveau des associés. Une demande n'engage à rien — d'aucun côté.",
        success:
          "Reçu. Les affaires de capital reçoivent réponse de qui a l'autorité d'y donner suite.",
      },
      Advisory: {
        reassurance:
          "Les mandats de conseil sont pris à une condition — que nous puissions tenir votre exigence.",
        success: "Reçu. Attendez-vous à une réponse réfléchie, pas à une brochure.",
      },
      Institutional: {
        reassurance:
          "Les demandes institutionnelles reçoivent des documents, pas des promesses.",
        success: "Reçu. La rigueur que vous éprouvez est celle qui vous répondra.",
      },
      Cultural: {
        reassurance: "L'œuvre culturelle se lit en mécène, non en sponsor. Apportez l'art.",
        success: "Reçu. Votre travail sera lu par des gens qui entendent le voir durer.",
      },
      Other: {
        reassurance:
          "Tenu confidentiel. Lu personnellement. Toute demande ne devient pas une conversation.",
        success: "Reçu. Si l'affaire s'y prête, nous vous contacterons directement.",
      },
    },
    protocol: [
      {
        term: "Confidentialité",
        line: "Ce que vous écrivez est lu par les associés de la maison, et ne va pas plus loin.",
      },
      {
        term: "Lecture personnelle",
        line: "Ni file d'attente, ni boîte d'équipe. Un associé lit chaque demande.",
      },
      {
        term: "Sans obligation",
        line: "Une conversation n'est pas un mandat. Chacun peut refermer la porte, sans bruit.",
      },
    ],
  },

  colophon: {
    closing: "Ordo Ex Intelligentia.",
    lines: [
      "AVAN GROUP — une maison patrimoniale.",
      "PFI · Pro-Finance — le bras institutionnel.",
      "© 2026 AVAN Group. Tous droits réservés.",
    ],
    links: [
      { label: "Privé", target: "prive" },
      { label: "PFI", target: "pfi" },
      { label: "Mentions légales", target: "legal" },
      { label: "Confidentialité", target: "privacy" },
    ],
    micro: "Sur introduction uniquement.",
    backToTop: "Revenir en haut",
  },

  microcopy: {
    emailInvalid: "Un courriel valide, pour que nous puissions répondre.",
    nameInvalid: "Votre nom.",
    submitError: "Quelque chose nous a interrompus. Réessayez.",
    loading: "Préparation du hall…",
  },

  pfi: {
    meta: {
      title: "PFI · Pro-Finance — le bras institutionnel d'AVAN Group",
      description:
        "Audit, fiscalité et conseil menés au standard institutionnel — la rigueur documentée de la maison.",
    },
    hero: {
      eyebrow: "PFI · PRO-FINANCE",
      head: "Le standard, tenu.",
      lede: "PFI est la strate institutionnelle de la maison — audit, fiscalité et conseil menés pour que les contreparties puissent s'appuyer sur nous sans nous connaître.",
      motto: "ORDO EX INTELLIGENTIA",
      crestAlt: "Les armes de PFI — la couronne au-dessus de l'écu, la devise de la maison au-dessous.",
    },
    standard: {
      eyebrow: "LE STANDARD",
      head: "La rigueur, documentée.",
      intro: "Trois pratiques, une discipline : la preuve plutôt que l'affirmation.",
      rows: [
        {
          title: "Audit",
          lede: "L'audit, mené comme il se doit.",
          body: "Une assurance de niveau institutionnel, où les dossiers de travail pourraient tenir lieu d'opinion.",
        },
        {
          title: "Fiscalité",
          lede: "Des structures qui résistent à l'examen.",
          body: "Des montages transfrontaliers bâtis pour tenir sous revue — celle de cette année comme celle d'une décennie.",
        },
        {
          title: "Conseil",
          lede: "Le conseil, mesuré en décennies.",
          body: "Des avis donnés comme si nous devions être présents quand leurs conséquences arriveront. Nous comptons l'être.",
        },
      ],
    },
    intelligence: {
      eyebrow: "PFI INTELLIGENCE",
      head: "Des systèmes qui gardent le registre honnête.",
      body: "Automatisation, données et reporting bâtis par les ingénieurs de la maison — pour que la rigueur soit tenue par des systèmes, non par la mémoire.",
    },
    governance: {
      eyebrow: "GOUVERNANCE",
      head: "Les termes de la confiance.",
      items: [
        {
          term: "Indépendance",
          line: "Les opinions ne sont pas à vendre. Les missions qui compromettraient l'indépendance sont déclinées.",
        },
        {
          term: "Documentation",
          line: "Chaque jugement matériel est écrit, daté, attribuable.",
        },
        {
          term: "Confidentialité",
          line: "Les affaires des clients ne se discutent avec personne — y compris entre nous, sauf mission conjointe.",
        },
      ],
    },
    cta: {
      head: "Engager une conversation institutionnelle.",
      body: "Diligence de contrepartie, termes de mission, références : nous répondons par des documents.",
      button: "Demander une introduction",
    },
  },

  legal: {
    meta: { title: "Mentions légales", description: "Mentions légales — AVAN Group." },
    title: "Mentions légales",
    updated: "Tenu par la maison · Juillet 2026",
    sections: [
      {
        h: "La maison",
        body: "AVAN Group est une holding patrimoniale. PFI · Pro-Finance en est le bras institutionnel. Identifiants sociaux, siège et enregistrements réglementaires figurent dans la documentation de mission et sont fournis sur demande.",
      },
      {
        h: "Ce site",
        body: "Ce site présente la maison. Rien n'y constitue une offre de titres, un conseil en investissement ou une sollicitation, dans quelque juridiction que ce soit.",
      },
      {
        h: "Correspondance",
        body: "La correspondance formelle est reçue par le formulaire d'introduction. Les notifications légales sont accusées par écrit.",
      },
    ],
  },

  privacy: {
    meta: { title: "Confidentialité", description: "Confidentialité — AVAN Group." },
    title: "Confidentialité",
    updated: "Tenu par la maison · Juillet 2026",
    sections: [
      {
        h: "Ce que nous détenons",
        body: "Si vous nous écrivez, nous détenons ce que vous envoyez : votre nom, votre courriel, la nature de votre demande et votre mot. Rien d'autre n'est collecté — ni cookies publicitaires, ni traceurs, ni mesure d'audience qui vous identifie.",
      },
      {
        h: "L'usage qui en est fait",
        body: "Lire votre demande et, si l'affaire s'y prête, y répondre. Elle n'est ni partagée, ni vendue, ni versée à aucune liste.",
      },
      {
        h: "Vos droits",
        body: "Écrivez-nous : votre correspondance sera corrigée ou effacée, intégralement. Le même canal répond aux questions sur la présente politique.",
      },
    ],
  },
};

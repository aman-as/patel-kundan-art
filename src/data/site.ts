/**
 * SINGLE SOURCE OF TRUTH
 * -----------------------------------------------------------------------------
 * Every phone number, link, address and structured-data tag on this site is
 * generated from this file. Change a number here and it changes in the header,
 * the footer, the sticky mobile bar, every WhatsApp button and the schema.org
 * markup Google reads — all at once.
 *
 * Do not hard-code contact details anywhere else.
 */

export interface Contact {
  name: string;
  /** Digits only, with country code. Used to build tel: and wa.me links. */
  number: string;
  call: boolean;
  whatsapp: boolean;
}

const digits = (n: string) => n.replace(/\D/g, '');

/** Pretty-printer for display: 919999029885 -> +91 99990 29885 */
export const formatPhone = (n: string) => {
  const d = digits(n);
  return `+${d.slice(0, 2)} ${d.slice(2, 7)} ${d.slice(7)}`;
};

export const contacts: Contact[] = [
  { name: 'Anil Singh',  number: '919999029885', call: true, whatsapp: true },
  { name: 'Sunil Singh', number: '919999964650', call: true, whatsapp: true },
];

/** The number used for every primary CTA. Keep it consistent everywhere —
 *  site, Google Business Profile, visiting card, Instagram. */
export const primary = contacts[0];

/** Prefilled WhatsApp openers. A blank message box loses enquiries; a
 *  prefilled one also pre-qualifies who is writing. */
export const waMessages = {
  general: 'Hello, I saw your website. I would like to discuss a jewellery design.',
  trade: 'Hello, I am a jeweller and I would like to discuss manufacturing or job work. My shop is in ',
  custom: 'Hello, I would like to discuss a custom piece of jewellery.',
  remake: 'Hello, I have some old jewellery I would like to discuss remaking.',
} as const;

export const wa = (msg: string = waMessages.general, number: string = primary.number) =>
  `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;

export const tel = (number: string = primary.number) => `tel:+${number}`;

/**
 * Build an internal link.
 *
 * The site currently lives under a sub-path on GitHub Pages
 * (/patel-kundan-art/), and will later sit at the root of its own domain.
 * Always write links as url('/workshop/') rather than href="/workshop/" —
 * a hard-coded leading slash breaks the moment the base path changes.
 */
export const url = (path: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

/** The five pages, in menu order. The header and footer both read this. */
export const pages = [
  { path: '/', label: 'Home' },
  { path: '/workshop/', label: 'Our Workshop' },
  { path: '/custom-orders/', label: 'For Individuals' },
  { path: '/for-jewellers/', label: 'For Jewellers' },
  { path: '/contact/', label: 'Contact' },
] as const;

export const site = {
  brand: 'Patel Kundan Art',
  mark: 'कुंदन वाला',
  markRoman: 'Kundanwala',

  /** One line on what the business is, for the footer. */
  tagline:
    'Kundan and jadau jewellery specialists. Custom gold and silver jewellery manufacturing for individuals and jewellers.',

  /** Short description used for meta tags and structured data. */
  description:
    'Patel Kundan Art is a family-run jewellery manufacturing workshop in Karol Bagh, Delhi, specialising in kundan and jadau, with custom gold and silver jewellery for individuals and jewellers.',

  url: 'https://patelkundanart.com',

  /** The two proprietorships behind the brand. Shown only in the footer —
   *  see claude/operating-structure-option-a.md in the project. */
  entities: ['Patel Kundan Art', 'Shree Patel Jewellers'],

  address: {
    street: '2561/6, 1st Floor, Beadonpura',
    locality: 'Karol Bagh Post Office Lane, Karol Bagh',
    city: 'New Delhi',
    region: 'Delhi',
    postalCode: '110005',
    country: 'IN',
  },

  geo: { lat: 28.650651, lng: 77.193367 },

  /** Verified from the Udyam registrations. */
  emails: {
    primary: 'patelkundanarts@gmail.com',
    secondary: 'shreepateljewellers@gmail.com',
  },

  social: {
    instagram: 'https://www.instagram.com/patelkundanart/',
  },

  /**
   * TODO — NOT YET VERIFIED. Left empty on purpose.
   * Nothing unverified goes on this site. Fill in and it will appear on the
   * Contact page and in the LocalBusiness schema automatically.
   * Format: [{ days: ['Monday','Tuesday'], opens: '11:00', closes: '19:00' }]
   */
  hours: [] as { days: string[]; opens: string; closes: string }[],

  /**
   * TODO — NOT YET VERIFIED. The year the family began kundan work.
   * Leave null and no founding claim is rendered anywhere.
   * ("Established 2000" appears on the old Google Sites but no document
   *  supports it — see claude/patel-kundan-art-fact-base.md.)
   */
  foundedYear: null as number | null,

  /**
   * Our Google Maps listing, as shared by the owner (18 Oct 2026).
   * Every map, address and directions link on the site opens this, so a
   * visitor lands on the business listing itself, never on a bare map pin.
   * Keep it as given: do not swap in a coordinate link or a guessed place URL.
   */
  mapsUrl: 'https://maps.app.goo.gl/beA2e6hGz39CNkk67',
  /**
   * The same listing at its full Google Maps address: where `mapsUrl` leads,
   * copied from its redirect (18 Oct 2026) without the tracking part. A
   * computer opens this instead, because some office networks block Google's
   * short links (see BaseLayout).
   */
  mapsUrlFull: 'https://www.google.com/maps/place/Patel+Kundan+Art+%26+Patel+Jewellers/@28.6507243,77.1933096,17z/data=!3m1!4b1!4m6!3m5!1s0x390d031c93a0fc61:0xcc55f09823b1f0d1!8m2!3d28.6507243!4d77.1933096!16s%2Fg%2F11lgftfc_2!5m1!1e2',
} as const;

export const fullAddress = [
  site.address.street,
  site.address.locality,
  `${site.address.city} ${site.address.postalCode}`,
].join(', ');

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
  role: string;
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
  { name: 'Anil Singh',  role: 'Kundan setting',     number: '919999029885', call: true,  whatsapp: true },
  { name: 'Sunil Singh', role: 'Orders and finishing', number: '919999964650', call: true,  whatsapp: true },
  { name: 'Aman Singh',  role: 'Enquiries',          number: '918448731321', call: false, whatsapp: true },
];

/** The number used for every primary CTA. Keep it consistent everywhere —
 *  site, Google Business Profile, visiting card, Instagram. */
export const primary = contacts[0];

/** Prefilled WhatsApp openers. A blank message box loses enquiries; a
 *  prefilled one also pre-qualifies who is writing. */
export const waMessages = {
  general: 'Hello, I saw your website. I would like to discuss some jewellery work.',
  trade: 'Hello, I am a jeweller and I need kundan manufacturing work. My shop is in ',
  custom: 'Hello, I would like to get a piece of jewellery made to order.',
  remake: 'Hello, I have some old gold jewellery I would like remade.',
} as const;

export const wa = (msg: string = waMessages.general, number: string = primary.number) =>
  `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;

export const tel = (number: string = primary.number) => `tel:+${number}`;

/**
 * Build an internal link.
 *
 * The site currently lives under a sub-path on GitHub Pages
 * (/patel-kundan-art/), and will later sit at the root of its own domain.
 * Always write links as url('/our-work/') rather than href="/our-work/" —
 * a hard-coded leading slash breaks the moment the base path changes.
 */
export const url = (path: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

export const site = {
  brand: 'Patel Kundan Art',
  mark: 'कुंदन वाला',
  markRoman: 'Kundanwala',

  headline: 'You bring the design. We make it.',
  subline:
    'Kundan & Customized Jewellery, by hand, in Karol Bagh, Delhi — for jewellers and for families.',

  /** Short description used for meta tags and structured data. */
  description:
    'Kundan and jadau jewellery manufacturing and job work in Karol Bagh, Delhi. Handmade to order for jewellery retailers and for individuals.',

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

  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=28.650651,77.193367',
} as const;

export const fullAddress = [
  site.address.street,
  site.address.locality,
  `${site.address.city} ${site.address.postalCode}`,
].join(', ');

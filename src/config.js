/**
 * ╔══════════════════════════════════════════════════╗
 * ║          DT LOVE AFFAIR '26 — WEDDING CONFIG     ║
 * ║  Edit this file to update content site-wide.    ║
 * ║  Lines marked ← CUSTOMIZE need your input.      ║
 * ╚══════════════════════════════════════════════════╝
 */

export const WEDDING = {
  // ─── App / Brand ──────────────────────────────────
  appName: "DT Love Affair '26",

  // ─── Couple ───────────────────────────────────────
  bride: {
    firstName: "Deborah",
    lastName: "Ibukunoluwa",
    family: "Ibukunoluwa",
  },
  groom: {
    firstName: "Temiloluwa",
    lastName: "Oluwaseyi",
    family: "Oluwaseyi",
  },

  // ─── Families (hero hosts line) ───────────────────
  hosts:
    "The families of Mr & Mrs Hezekiah Adeniyi & Pastor & Deaconess Olumide Adeleye",

  // ─── Date & Location ──────────────────────────────
  weddingDate: new Date("2026-06-27T09:00:00"), // countdown target (church start)
  displayDate: "June 27th, 2026",
  city: "Ibafo, Ogun State",

  // ─── RSVP Deadline ────────────────────────────────
  rsvpDeadline: "June 14th, 2026", // ← CUSTOMIZE if different

  // ─── Events ───────────────────────────────────────
  events: [
    {
      num: "01",
      category: "Saturday · 27th June 2026",
      title: "Church Wedding & Reception",
      details: [
        { icon: "📅", text: "Saturday, 27th June 2026" },
        { icon: "🕘", text: "9:00 am" },
        { icon: "⛪", text: "Gospel Apostolic Church, Ibafo Branch 2" },
        {
          icon: "📍",
          text: "Behind Oluwaseun Bakery, Sefu-Ota, Ibafo, Ogun State",
        },
        { icon: "👗", text: "Formal / Classic Attire" },
        { icon: "🥂", text: "Reception follows immediately" },
      ],
      calendarUrl:
        "https://calendar.google.com/calendar/r/eventedit?text=Church+Wedding+%26+Reception+-+Deborah+%26+Temiloluwa&dates=20260627T090000/20260627T130000&location=Gospel+Apostolic+Church+Sefu-Ota+Ibafo+Ogun+State+Nigeria",
    },
    {
      num: "02",
      category: "Saturday · 27th June 2026",
      title: "Engagement Ceremony",
      details: [
        { icon: "📅", text: "Saturday, 27th June 2026" },
        { icon: "🕛", text: "12:00 pm" },
        { icon: "🏛️", text: "Doulos Hall, Oremeji Bus Stop" },
        { icon: "📍", text: "Ibafo, Ogun State, Nigeria" },
        { icon: "👗", text: "Champagne Gold & Ivory" },
        { icon: "🎉", text: "Food, Music & Celebration" },
      ],
      calendarUrl:
        "https://calendar.google.com/calendar/r/eventedit?text=Engagement+-+Deborah+%26+Temiloluwa&dates=20260627T120000/20260627T190000&location=Doulos+Hall+Oremeji+Bus+Stop+Ibafo+Ogun+State+Nigeria",
    },
  ],

  // ─── Locations ────────────────────────────────────
  locations: [
    {
      icon: "⛪",
      label: "Church Wedding & Reception",
      name: "Gospel Apostolic Church",
      address: [
        "Ibafo Branch 2, Behind Oluwaseun Bakery",
        "Sefu-Ota, Ibafo, Ogun State",
      ],
      mapsUrl:
        "https://maps.google.com/?q=Gospel+Apostolic+Church,+Sefu-Ota,+Ibafo,+Ogun+State,+Nigeria",
      mapsEmbed:
        "https://maps.google.com/maps?q=Gospel+Apostolic+Church+Sefu-Ota+Ibafo+Ogun+State+Nigeria&output=embed&z=16",
    },
    {
      icon: "🏛️",
      label: "Engagement Ceremony",
      name: "Doulos Hall",
      address: ["Oremeji Bus Stop", "Ibafo, Ogun State, Nigeria"],
      mapsUrl:
        "https://maps.google.com/?q=Doulos+Hall,+Oremeji+Bus+Stop,+Ibafo,+Ogun+State,+Nigeria",
      mapsEmbed:
        "https://maps.google.com/maps?q=Doulos+Hall+Oremeji+Bus+Stop+Ibafo+Ogun+State+Nigeria&output=embed&z=16",
    },
  ],

  // ─── Dress Code ───────────────────────────────────
  dressCode: {
    note: "Come dressed in your most gorgeous attire. We'd love to be surrounded by warm and vibrant colours as we celebrate this joyful occasion.",
    swatches: [
      { name: "Champagne Gold", hex: "#D4AF37" },
      { name: "Ivory", hex: "#FFFFF0" },
    ],
    tags: [
      { event: "Church Wedding & Reception", attire: "Champagne Gold · Ivory" },
      { event: "Engagement Ceremony", attire: "Champagne Gold · Ivory" },
    ],
    // Array of aso-ebi contacts
    asoebi: [
      { contact: "Mr. Joseph", phone: "08147843011", tel: "+2348147843011" },
      { contact: "Mr. Tunde", phone: "08062132940", tel: "+2348062132940" },
    ],
  },

  // ─── Song ─────────────────────────────────────────
  song: {
    title: "LMLY",
    artist: "Anendlessocean",
    // ← CUSTOMIZE: replace with an actual lyric from LMLY
    quote: '"In you I found my home, my song, and every reason to love."',
    file: "/music.mp3",
  },

  // ─── Guest Photo Gallery ──────────────────────────
  // ← CUSTOMIZE: set up your own Cloudinary account & Apps Script
  guestGallery: {
    id: "deborah-temiloluwa-2026",
    bride: "Deborah",
    groom: "Temiloluwa",
    date: "27 June 2026",
    venue: "Ibafo, Ogun State",
    max: 30,
    cloud: "daxhbax71", // ← REPLACE with your Cloudinary cloud name
    preset: "DT_Love_Affair", // ← REPLACE with your Cloudinary preset
    apiUrl:
      "https://script.google.com/macros/s/AKfycbztGrErCsXMNuQKPLyRnPFOHkKPq9qidZYRKaecw9x2CjsMitysrQS5gp8lCImN1oMc/exec", // ← REPLACE
  },

  // ─── Contacts (RSVP) ──────────────────────────────
  contacts: [
    {
      initial: "J",
      name: "Mr. Joseph",
      role: "RSVP Contact",
      display: "08147843011",
      tel: "+2348147843011",
    },
    {
      initial: "T",
      name: "Mr. Tunde",
      role: "RSVP Contact",
      display: "08062132940",
      tel: "+2348062132940",
    },
  ],

  // ─── RSVP Backend ─────────────────────────────────
  // ← REPLACE: create a new Google Apps Script for DT and paste its URL here
  rsvpScriptUrl:
    "https://script.google.com/macros/s/AKfycbyC08bzGJo7DK6y9icsNQv7aeGScL-RO8w0gWsYsW7PCy_o7eNeDC1_UEQBP2zxhUzu/exec",

  // ─── Images ───────────────────────────────────────
  // img-1 through img-7 are the DT couple photos in public/images/
  // ← REPLACE heroBg with whichever wide DT photo looks best as the hero background
  images: {
    heroBg: "/images/img-1.jpeg",
    logo: "/images/logo.jpeg",
    slideshow: [
      "/images/img-1.jpeg",
      "/images/img-2.jpeg",
      "/images/img-3.jpeg",
    ],
    storyPhoto: "/images/img-4.jpeg",
    gallery: [
      "/images/img-1.jpeg",
      "/images/img-2.jpeg",
      "/images/img-3.jpeg",
      "/images/img-4.jpeg",
      "/images/img-5.jpeg",
      "/images/img-6.jpeg",
      "/images/img-7.jpeg",
    ],
  },
};

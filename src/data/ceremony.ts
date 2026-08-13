import type { InviteEvent } from "./types";

/** Celebration types beyond wedding — Canva-style market coverage. */
export type CeremonyCategoryId =
  | "wedding"
  | "engagement"
  | "naming"
  | "birthday"
  | "housewarming"
  | "college"
  | "school"
  | "anniversary";

export const ceremonyMeta: Record<
  CeremonyCategoryId,
  { label: string; short: string; emoji: string; blurb: string }
> = {
  wedding: {
    label: "Wedding",
    short: "Wedding",
    emoji: "💍",
    blurb: "Vivah, nikah, church & Anand Karaj — full marriage festival energy.",
  },
  engagement: {
    label: "Engagement",
    short: "Engage",
    emoji: "✨",
    blurb: "Ring ceremony & roka — soft glam for the first big yes.",
  },
  naming: {
    label: "Naming ceremony",
    short: "Naming",
    emoji: "🪷",
    blurb: "Naamkaran / christening — lamps, lotus & gentle blessings.",
  },
  birthday: {
    label: "Birthday",
    short: "Birthday",
    emoji: "🎂",
    blurb: "Milestone birthdays with festive colour and joy.",
  },
  housewarming: {
    label: "Housewarming",
    short: "Gruhapravesha",
    emoji: "🏠",
    blurb: "Gruhapravesha & new-home blessings with warm diya glow.",
  },
  college: {
    label: "College / farewell",
    short: "College",
    emoji: "🎓",
    blurb: "Farewell, fresher’s & graduation night — campus celebration vibe.",
  },
  school: {
    label: "School event",
    short: "School",
    emoji: "📚",
    blurb: "Annual day, farewell & cultural fest invites for schools.",
  },
  anniversary: {
    label: "Anniversary",
    short: "Anniversary",
    emoji: "🥂",
    blurb: "Silver, gold & love milestones — elegant celebration cards.",
  },
};

export const allCeremonyIds = Object.keys(ceremonyMeta) as CeremonyCategoryId[];

export type CeremonyPreset = {
  primaryName: string;
  secondaryName: string;
  monogram: string;
  tagline: string;
  hosts: string;
  invitationCopy: string;
  closingCopy: string;
  blessingNative: string;
  blessingEnglish: string;
  dateIso: string;
  dateLabel: string;
  coverSubtitle: string;
  ofLabel: string;
  youAreInvited: string;
  eventsTitle: string;
  emblem: string;
  location: { name: string; address: string; mapUrl: string };
  events: InviteEvent[];
};

export const ceremonyPresets: Record<CeremonyCategoryId, CeremonyPreset> = {
  wedding: {
    primaryName: "Ananya",
    secondaryName: "Arjun",
    monogram: "AA",
    tagline: "Two hearts. One sacred vow.",
    hosts: "With the blessings of both families",
    invitationCopy: "We invite you to celebrate our wedding with love and joy.",
    closingCopy: "Your presence will make our celebration complete.",
    blessingNative: "शुभ विवाह",
    blessingEnglish: "Auspicious wedding blessings",
    dateIso: "2026-12-12T18:30:00+05:30",
    dateLabel: "12 December 2026",
    coverSubtitle: "Together with their families",
    ofLabel: "The wedding of",
    youAreInvited: "You are invited",
    eventsTitle: "Celebration events",
    emblem: "ॐ",
    location: {
      name: "Grand Courtyard",
      address: "Bengaluru, Karnataka",
      mapUrl: "https://maps.google.com",
    },
    events: [
      {
        id: "mehendi",
        title: "Mehendi",
        emoji: "🌿",
        dateLabel: "10 Dec",
        dayLabel: "Thu",
        time: "4:00 PM",
        venue: "Home Courtyard",
        city: "Bengaluru",
      },
      {
        id: "wedding",
        title: "Wedding",
        emoji: "💍",
        dateLabel: "12 Dec",
        dayLabel: "Sat",
        time: "6:30 PM",
        venue: "Grand Courtyard",
        city: "Bengaluru",
      },
    ],
  },
  engagement: {
    primaryName: "Diya",
    secondaryName: "Rohan",
    monogram: "DR",
    tagline: "A promise sealed in gold.",
    hosts: "With love from both families",
    invitationCopy: "Join us as we celebrate our engagement with music and blessings.",
    closingCopy: "Come bless the beginning of forever.",
    blessingNative: "शुभ सगाई",
    blessingEnglish: "Blessings for the engagement",
    dateIso: "2026-09-20T18:00:00+05:30",
    dateLabel: "20 September 2026",
    coverSubtitle: "Ring ceremony celebration",
    ofLabel: "The engagement of",
    youAreInvited: "You are invited",
    eventsTitle: "Evening plan",
    emblem: "✧",
    location: {
      name: "Pearl Banquet",
      address: "Mysuru, Karnataka",
      mapUrl: "https://maps.google.com",
    },
    events: [
      {
        id: "ring",
        title: "Ring ceremony",
        emoji: "💍",
        dateLabel: "20 Sep",
        dayLabel: "Sun",
        time: "6:00 PM",
        venue: "Pearl Banquet",
        city: "Mysuru",
      },
    ],
  },
  naming: {
    primaryName: "Aarav",
    secondaryName: "",
    monogram: "A",
    tagline: "A new name. A new blessing.",
    hosts: "Proudly hosted by the Sharma family",
    invitationCopy:
      "With grateful hearts we invite you to the naming ceremony of our little one.",
    closingCopy: "Bless the child with your loving presence.",
    blessingNative: "नामकरण शुभम्",
    blessingEnglish: "Auspicious naming blessings",
    dateIso: "2026-08-30T10:30:00+05:30",
    dateLabel: "30 August 2026",
    coverSubtitle: "Naamkaran celebration",
    ofLabel: "Naming ceremony of",
    youAreInvited: "You are warmly invited",
    eventsTitle: "Ceremony schedule",
    emblem: "🪷",
    location: {
      name: "Family Home · Puja Hall",
      address: "Hubballi, Karnataka",
      mapUrl: "https://maps.google.com",
    },
    events: [
      {
        id: "puja",
        title: "Naamkaran puja",
        emoji: "🪔",
        dateLabel: "30 Aug",
        dayLabel: "Sun",
        time: "10:30 AM",
        venue: "Family Home",
        city: "Hubballi",
      },
      {
        id: "lunch",
        title: "Blessing lunch",
        emoji: "🍽️",
        dateLabel: "30 Aug",
        dayLabel: "Sun",
        time: "12:30 PM",
        venue: "Family Home",
        city: "Hubballi",
      },
    ],
  },
  birthday: {
    primaryName: "Kiara",
    secondaryName: "",
    monogram: "K",
    tagline: "Another year of sparkle.",
    hosts: "With love from Kiara’s family",
    invitationCopy: "Join us for a joyful birthday celebration filled with music and cake.",
    closingCopy: "Your smile is the best gift.",
    blessingNative: "जन्मदिन मुबारक",
    blessingEnglish: "Happy birthday blessings",
    dateIso: "2026-10-05T17:00:00+05:30",
    dateLabel: "5 October 2026",
    coverSubtitle: "Birthday celebration",
    ofLabel: "Birthday of",
    youAreInvited: "You're invited to celebrate",
    eventsTitle: "Party flow",
    emblem: "🎂",
    location: {
      name: "Sky Garden Hall",
      address: "Mangaluru, Karnataka",
      mapUrl: "https://maps.google.com",
    },
    events: [
      {
        id: "party",
        title: "Birthday party",
        emoji: "🎉",
        dateLabel: "5 Oct",
        dayLabel: "Mon",
        time: "5:00 PM",
        venue: "Sky Garden Hall",
        city: "Mangaluru",
      },
    ],
  },
  housewarming: {
    primaryName: "The Reddy Family",
    secondaryName: "",
    monogram: "R",
    tagline: "New walls. Old blessings.",
    hosts: "With warm regards from the Reddy family",
    invitationCopy:
      "Please join us for Gruhapravesha as we light the first diya in our new home.",
    closingCopy: "Come share sweets and blessings.",
    blessingNative: "गृहप्रवेश शुभम्",
    blessingEnglish: "Auspicious housewarming",
    dateIso: "2026-11-08T09:00:00+05:30",
    dateLabel: "8 November 2026",
    coverSubtitle: "Gruhapravesha",
    ofLabel: "Housewarming of",
    youAreInvited: "You are invited",
    eventsTitle: "Day plan",
    emblem: "🪔",
    location: {
      name: "New Residence",
      address: "Whitefield, Bengaluru",
      mapUrl: "https://maps.google.com",
    },
    events: [
      {
        id: "puja",
        title: "Gruhapravesha puja",
        emoji: "🪔",
        dateLabel: "8 Nov",
        dayLabel: "Sun",
        time: "9:00 AM",
        venue: "New Residence",
        city: "Bengaluru",
      },
    ],
  },
  college: {
    primaryName: "Class of 2026",
    secondaryName: "NIT Surathkal",
    monogram: "26",
    tagline: "One last night. Forever friends.",
    hosts: "Organised by the Farewell Committee",
    invitationCopy:
      "You're invited to the grand college farewell — music, memories and midnight promises.",
    closingCopy: "Dress sharp. Dance harder. Stay forever.",
    blessingNative: "शुभ विदाई",
    blessingEnglish: "Farewell night blessings",
    dateIso: "2026-04-18T18:30:00+05:30",
    dateLabel: "18 April 2026",
    coverSubtitle: "College farewell night",
    ofLabel: "Farewell ·",
    youAreInvited: "You're on the guest list",
    eventsTitle: "Night schedule",
    emblem: "🎓",
    location: {
      name: "Campus Amphitheatre",
      address: "Surathkal, Karnataka",
      mapUrl: "https://maps.google.com",
    },
    events: [
      {
        id: "cultural",
        title: "Cultural night",
        emoji: "🎤",
        dateLabel: "18 Apr",
        dayLabel: "Sat",
        time: "6:30 PM",
        venue: "Amphitheatre",
        city: "Surathkal",
      },
      {
        id: "dj",
        title: "DJ night",
        emoji: "🎧",
        dateLabel: "18 Apr",
        dayLabel: "Sat",
        time: "9:00 PM",
        venue: "Open Lawn",
        city: "Surathkal",
      },
    ],
  },
  school: {
    primaryName: "Annual Day 2026",
    secondaryName: "Sacred Heart School",
    monogram: "SH",
    tagline: "Talent. Tradition. Triumph.",
    hosts: "Principal & Staff cordially invite you",
    invitationCopy:
      "Join us for Annual Day — performances, prizes and proud parent moments.",
    closingCopy: "Your encouragement lights every stage.",
    blessingNative: "शुभ वार्षिकोत्सव",
    blessingEnglish: "Annual day blessings",
    dateIso: "2026-01-24T10:00:00+05:30",
    dateLabel: "24 January 2026",
    coverSubtitle: "School annual day",
    ofLabel: "Celebrating",
    youAreInvited: "Parents & guests welcome",
    eventsTitle: "Programme",
    emblem: "📚",
    location: {
      name: "School Auditorium",
      address: "Mangalore, Karnataka",
      mapUrl: "https://maps.google.com",
    },
    events: [
      {
        id: "program",
        title: "Main programme",
        emoji: "🎭",
        dateLabel: "24 Jan",
        dayLabel: "Sat",
        time: "10:00 AM",
        venue: "Auditorium",
        city: "Mangalore",
      },
    ],
  },
  anniversary: {
    primaryName: "Meera",
    secondaryName: "Vikram",
    monogram: "MV",
    tagline: "Twenty-five years of us.",
    hosts: "With love from our children",
    invitationCopy:
      "Celebrate our silver anniversary with dinner, laughter and old songs.",
    closingCopy: "Help us toast the years ahead.",
    blessingNative: "रजत जयंती शुभम्",
    blessingEnglish: "Silver anniversary blessings",
    dateIso: "2026-03-14T19:00:00+05:30",
    dateLabel: "14 March 2026",
    coverSubtitle: "Silver anniversary",
    ofLabel: "Celebrating",
    youAreInvited: "You are invited",
    eventsTitle: "Evening",
    emblem: "🥂",
    location: {
      name: "Harbour Lights",
      address: "Kochi, Kerala",
      mapUrl: "https://maps.google.com",
    },
    events: [
      {
        id: "dinner",
        title: "Anniversary dinner",
        emoji: "🥂",
        dateLabel: "14 Mar",
        dayLabel: "Sat",
        time: "7:00 PM",
        venue: "Harbour Lights",
        city: "Kochi",
      },
    ],
  },
};

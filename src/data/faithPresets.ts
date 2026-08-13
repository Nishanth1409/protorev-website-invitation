import type { FaithId, InviteEvent, LanguageId } from "./types";

export type FaithPreset = {
  faith: FaithId;
  faithLabel: string;
  emblem: string;
  audioSrc: string;
  regionLabel: string;
  weddingDate: string;
  weddingDateLabel: string;
  monogram: string;
  location: { name: string; address: string; mapUrl: string };
  blessingNative: string;
  blessingEnglish: string;
  hosts: string;
  tagline: string;
  invitationCopy: string;
  closingCopy: string;
  coverSubtitle: string;
  bride: string;
  groom: string;
  events: InviteEvent[];
  /** Optional localized couple samples per language */
  byLanguage?: Partial<
    Record<
      LanguageId,
      Partial<
        Pick<
          FaithPreset,
          | "bride"
          | "groom"
          | "hosts"
          | "tagline"
          | "invitationCopy"
          | "closingCopy"
          | "coverSubtitle"
          | "blessingNative"
          | "blessingEnglish"
          | "location"
          | "events"
          | "regionLabel"
        >
      >
    >
  >;
};

export const faithPresets: Record<FaithId, FaithPreset> = {
  hindu: {
    faith: "hindu",
    faithLabel: "Hindu",
    emblem: "ॐ",
    audioSrc: "/audio/hindu-ceremony.mp3",
    regionLabel: "Bengaluru",
    weddingDate: "2026-11-14T18:30:00+05:30",
    weddingDateLabel: "14 / 11 / 2026",
    monogram: "AA",
    bride: "Ananya Sharma",
    groom: "Arjun Mehta",
    blessingNative: "ॐ शुभ विवाह",
    blessingEnglish:
      "With the blessings of the Divine, we invite you to witness our sacred union.",
    hosts: "Mr & Mrs. Rajesh Sharma",
    tagline: "Two souls. One sacred fire.",
    invitationCopy:
      "With hearts full of joy and reverence, we invite you and your family to bless the wedding ceremonies of our beloved daughter Ananya with Arjun.",
    closingCopy:
      "May the sacred fire light our path ahead. Your blessings are the greatest gift we seek.",
    coverSubtitle: "Together With Their Families",
    location: {
      name: "Lotus Courtyard, The Grand Orchid",
      address: "MG Road, Bengaluru, Karnataka 560001",
      mapUrl: "https://maps.google.com/?q=MG+Road+Bengaluru",
    },
    events: [
      { id: "mehendi", title: "Mehendi", emoji: "🌿", dateLabel: "12 NOV 2026", dayLabel: "Thursday", time: "4:00 PM", venue: "Sharma Residence Lawn", city: "Bengaluru" },
      { id: "haldi", title: "Haldi", emoji: "🌼", dateLabel: "13 NOV 2026", dayLabel: "Friday", time: "10:00 AM", venue: "Sharma Residence", city: "Bengaluru" },
      { id: "sangeet", title: "Sangeet", emoji: "🎵", dateLabel: "13 NOV 2026", dayLabel: "Friday", time: "7:00 PM", venue: "Orchid Ballroom", city: "Bengaluru" },
      { id: "vivah", title: "Vivah Ceremony", emoji: "🔥", dateLabel: "14 NOV 2026", dayLabel: "Saturday", time: "6:30 PM", venue: "Lotus Courtyard", city: "Bengaluru" },
      { id: "reception", title: "Reception", emoji: "✨", dateLabel: "15 NOV 2026", dayLabel: "Sunday", time: "7:00 PM", venue: "The Grand Orchid", city: "Bengaluru" },
    ],
    byLanguage: {
      kn: {
        regionLabel: "Mysuru",
        bride: "ದಿವ್ಯಾ ರಾವ್",
        groom: "ಕಾರ್ತಿಕ್ ಗೌಡ",
        hosts: "ಶ್ರೀ & ಶ್ರೀಮತಿ ರಾಮೇಗೌಡ",
        tagline: "ಪವಿತ್ರ ಅಗ್ನಿಯ ಬೆಳಕಿನಲ್ಲಿ ಒಂದು ಬದುಕು.",
        blessingNative: "ಶುಭ ಮದುವೆ",
        blessingEnglish: "ಶುಭಾಶಯಗಳೊಂದಿಗೆ ನಿಮ್ಮನ್ನು ನಮ್ಮ ಮದುವೆ ಸಮಾರಂಭಕ್ಕೆ ಆಹ್ವಾನಿಸುತ್ತೇವೆ.",
        invitationCopy:
          "ನಮ್ಮ ಪ್ರೀತಿಯ ಮಗಳು ದಿವ್ಯಾ ಹಾಗೂ ಕಾರ್ತಿಕ್ ಅವರ ವಿವಾಹ ಮಹೋತ್ಸವಕ್ಕೆ ನಿಮ್ಮ ಕುಟುಂಬವನ್ನು ಸ್ವಾಗತಿಸುತ್ತೇವೆ.",
        closingCopy: "ನಿಮ್ಮ ಉಪಸ್ಥಿತಿ ಮತ್ತು ಆಶೀರ್ವಾದಗಳಿಗಾಗಿ ಹೃತ್ಪೂರ್ವಕ ಧನ್ಯವಾದಗಳು.",
        coverSubtitle: "ಅವರ ಕುಟುಂಬಗಳೊಂದಿಗೆ",
        location: {
          name: "ಚಾಮುಂಡಿ ಉದ್ಯಾನ",
          address: "Nazarbad, Mysuru, Karnataka 570010",
          mapUrl: "https://maps.google.com/?q=Mysuru+Karnataka",
        },
        events: [
          { id: "haldi", title: "ಅರಿಶಿನ", emoji: "🌼", dateLabel: "04 DEC 2026", dayLabel: "ಶುಕ್ರವಾರ", time: "10:00 AM", venue: "ಮನೆ ಅಂಗಳ", city: "Mysuru" },
          { id: "vivah", title: "ಮದುವೆ", emoji: "🔥", dateLabel: "05 DEC 2026", dayLabel: "ಶನಿವಾರ", time: "11:00 AM", venue: "ಚಾಮುಂಡಿ ಉದ್ಯಾನ", city: "Mysuru" },
          { id: "reception", title: "ರಿಸೆಪ್ಷನ್", emoji: "✨", dateLabel: "05 DEC 2026", dayLabel: "ಶನಿವಾರ", time: "7:00 PM", venue: "ರಾಯಲ್ ಹಾಲ್", city: "Mysuru" },
        ],
      },
      ta: {
        regionLabel: "Madurai",
        bride: "மீனாட்சி சுப்ரமணியன்",
        groom: "அருண் கணேசன்",
        hosts: "திரு & திருமதி சுப்ரமணியன்",
        tagline: "அக்னியின் முன் இணைந்த இரு உயிர்கள்.",
        blessingNative: "சுப முகூர்த்தம்",
        blessingEnglish: "தெய்வீக ஆசீர்வாதத்துடன் உங்களை அழைக்கிறோம்.",
        invitationCopy:
          "எங்கள் அன்பு மகள் மீனாட்சி மற்றும் அருண் அவர்களின் திருமண விழாவுக்கு உங்களையும் குடும்பத்தையும் அன்புடன் அழைக்கிறோம்.",
        closingCopy: "உங்கள் ஆசிர்வாதமே எங்கள் செல்வம்.",
        coverSubtitle: "அவர்களது குடும்பங்களுடன்",
      },
      te: {
        regionLabel: "Hyderabad",
        bride: "శ్రావణి రెడ్డి",
        groom: "వెంకట్ రావు",
        hosts: "శ్రీ & శ్రీమతి రెడ్డి",
        tagline: "పవిత్ర అగ్ని ముందు ఒక జీవితం.",
        blessingNative: "శుభవివాహం",
        blessingEnglish: "దైవాశీస్సులతో మిమ్మల్ని ఆహ్వానిస్తున్నాము.",
        invitationCopy:
          "మా ప్రియమైన కుమార్తె శ్రావణి మరియు వెంకట్ వివాహ వేడుకకు మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాము.",
        closingCopy: "మీ ఆశీర్వాదాలే మా అదృష్టం.",
        coverSubtitle: "వారి కుటుంబాలతో",
      },
      hi: {
        regionLabel: "Jaipur",
        bride: "प्रिया शर्मा",
        groom: "रोहन गुप्ता",
        hosts: "श्री एवं श्रीमती शर्मा",
        tagline: "दो आत्माएँ। एक पवित्र अग्नि।",
        blessingNative: "शुभ विवाह",
        blessingEnglish: "ईश्वर की कृपा से हम आपको आमंत्रित करते हैं।",
        invitationCopy:
          "हृदय से प्रसन्न होकर हम अपनी पुत्री प्रिया एवं रोहन के विवाह में आपको सादर आमंत्रित करते हैं।",
        closingCopy: "आपके आशीर्वाद ही हमारा सबसे बड़ा उपहार हैं।",
        coverSubtitle: "अपने परिवारों के साथ",
      },
      ml: {
        regionLabel: "Thrissur",
        bride: "ലക്ഷ്മി നായർ",
        groom: "അരുൺ മേനോൻ",
        hosts: "ശ്രീ & ശ്രീമതി നായർ",
        tagline: "പവിത്ര അഗ്നിയിൽ ഒരു ജീവിതം.",
        blessingNative: "ശുഭ വിവാഹം",
        blessingEnglish: "ദൈവാനുഗ്രഹത്തോടെ നിങ്ങളെ ക്ഷണിക്കുന്നു.",
        invitationCopy:
          "ഞങ്ങളുടെ പ്രിയ മകൾ ലക്ഷ്മിയുടെയും അരുണിന്റെയും വിവാഹത്തിന് നിങ്ങളെയും കുടുംബത്തെയും സ്നേഹപൂർവം ക്ഷണിക്കുന്നു.",
        closingCopy: "നിങ്ങളുടെ അനുഗ്രഹം ഞങ്ങളുടെ ഏറ്റവും വലിയ സമ്പത്താണ്.",
        coverSubtitle: "അവരുടെ കുടുംബങ്ങളോടൊപ്പം",
      },
    },
  },
  muslim: {
    faith: "muslim",
    faithLabel: "Muslim",
    emblem: "☪",
    audioSrc: "/audio/muslim-ceremony.mp3",
    regionLabel: "Hyderabad",
    weddingDate: "2026-09-26T18:00:00+05:30",
    weddingDateLabel: "26 / 09 / 2026",
    monogram: "AO",
    bride: "Ayesha Rahman",
    groom: "Omar Siddiqui",
    blessingNative: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    blessingEnglish: "In the name of Allah, the Most Gracious, the Most Merciful",
    hosts: "Mr & Mrs. Fareed Rahman",
    tagline: "Written in mercy. Sealed in love.",
    invitationCopy:
      "With gratitude and joy, we invite you and your beloved family to grace the nikah of our dear daughter Ayesha with Omar. Your presence and duas will be our greatest blessing.",
    closingCopy:
      "With the blessings of Allah and our families, we warmly invite you to celebrate this beautiful beginning with us.",
    coverSubtitle: "Together With Their Families",
    location: {
      name: "Noor Banquet Hall",
      address: "Banjara Hills, Hyderabad, Telangana 500034",
      mapUrl: "https://maps.google.com/?q=Banjara+Hills+Hyderabad",
    },
    events: [
      { id: "nikah", title: "Nikah", emoji: "🕌", dateLabel: "26 SEP 2026", dayLabel: "Saturday", time: "6:00 PM", venue: "Noor Banquet Hall", city: "Hyderabad" },
      { id: "walima", title: "Walima", emoji: "🌙", dateLabel: "27 SEP 2026", dayLabel: "Sunday", time: "7:00 PM", venue: "Pearl Pavilion", city: "Hyderabad" },
    ],
    byLanguage: {
      hi: {
        bride: "आयशा रहमान",
        groom: "उमर सिद्दीकी",
        hosts: "श्री एवं श्रीमती फरीद रहमान",
        tagline: "रहमत में लिखा। प्रेम में मुहर।",
        invitationCopy:
          "हर्ष और कृतज्ञता के साथ हम अपनी बेटी आयशा और उमर की निकाह में आपको सादर आमंत्रित करते हैं।",
        closingCopy: "अल्लाह की रहमत से यह शुरुआत हमारे संग मनाएँ।",
        coverSubtitle: "अपने परिवारों के साथ",
      },
      te: {
        regionLabel: "Hyderabad",
        bride: "ఆయేషా రెహమాన్",
        groom: "ఒమర్ సిద్ధికి",
        invitationCopy:
          "కృతజ్ఞతతో మా కుమార్తె ఆయేషా మరియు ఒమర్ నికాహ్‌కు మిమ్మల్ని ఆహ్వానిస్తున్నాము.",
        coverSubtitle: "వారి కుటుంబాలతో",
      },
      kn: {
        bride: "ಆಯೇಷಾ ರಹಮಾನ್",
        groom: "ಒಮರ್ ಸಿದ್ದೀಕಿ",
        tagline: "ಕರುಣೆಯಲ್ಲಿ ಬರೆದ ಪ್ರೀತಿ.",
        invitationCopy:
          "ನಮ್ಮ ಪ್ರೀತಿಯ ಮಗಳು ಆಯೇಷಾ ಹಾಗೂ ಒಮರ್ ಅವರ ನಿಕಾಹಕ್ಕೆ ನಿಮ್ಮನ್ನು ಆಹ್ವಾನಿಸುತ್ತೇವೆ.",
        coverSubtitle: "ಅವರ ಕುಟುಂಬಗಳೊಂದಿಗೆ",
      },
      ta: {
        bride: "ஆயிஷா ரஹ்மான்",
        groom: "உமர் சித்திக்கி",
        invitationCopy:
          "எங்கள் மகள் ஆயிஷா மற்றும் உமரின் நிகாஹ் விழாவிற்கு உங்களை அழைக்கிறோம்.",
        coverSubtitle: "அவர்களது குடும்பங்களுடன்",
      },
      ml: {
        bride: "ആയിഷ റഹ്മാൻ",
        groom: "ഒമർ സിദ്ദിഖി",
        invitationCopy:
          "ഞങ്ങളുടെ മകൾ ആയിഷയുടെയും ഒമറിന്റെയും നിക്കാഹിലേക്ക് നിങ്ങളെ ക്ഷണിക്കുന്നു.",
        coverSubtitle: "അവരുടെ കുടുംബങ്ങളോടൊപ്പം",
      },
    },
  },
  christian: {
    faith: "christian",
    faithLabel: "Christian",
    emblem: "✝",
    audioSrc: "/audio/christian-ceremony.mp3",
    regionLabel: "Kochi",
    weddingDate: "2026-12-12T16:00:00+05:30",
    weddingDateLabel: "12 / 12 / 2026",
    monogram: "GD",
    bride: "Grace Thomas",
    groom: "Daniel Fernandes",
    blessingNative: "Soli Deo Gloria",
    blessingEnglish: "What God has joined together, let no one separate. — Matthew 19:6",
    hosts: "Mr & Mrs. Samuel Thomas",
    tagline: "Faith, hope, and a lifelong vow.",
    invitationCopy:
      "With joyful hearts, we invite you to celebrate the Holy Matrimony of our daughter Grace and Daniel.",
    closingCopy:
      "Your presence is a blessing. We look forward to celebrating God's goodness with you.",
    coverSubtitle: "United in Faith & Love",
    location: {
      name: "St. Mary's Cathedral",
      address: "Fort Kochi, Kochi, Kerala 682001",
      mapUrl: "https://maps.google.com/?q=Fort+Kochi+Cathedral",
    },
    events: [
      { id: "ceremony", title: "Holy Matrimony", emoji: "✝️", dateLabel: "12 DEC 2026", dayLabel: "Saturday", time: "4:00 PM", venue: "St. Mary's Cathedral", city: "Kochi" },
      { id: "reception", title: "Reception Dinner", emoji: "🕊️", dateLabel: "12 DEC 2026", dayLabel: "Saturday", time: "7:30 PM", venue: "Harbourview Lawn", city: "Kochi" },
    ],
    byLanguage: {
      ml: {
        regionLabel: "Kottayam",
        bride: "അന്ന മാത്യു",
        groom: "തോമസ് വർഗീസ്",
        hosts: "ശ്രീ & ശ്രീമതി മാത്യു",
        tagline: "ദൈവാനുഗ്രഹത്തിൽ ഒരു പുതിയ തുടക്കം.",
        blessingNative: "ദൈവം അനുഗ്രഹിക്കട്ടെ",
        blessingEnglish: "ദൈവം യോജിപ്പിച്ചതിനെ മനുഷ്യൻ വേർപെടുത്തരുത്.",
        invitationCopy:
          "ഞങ്ങളുടെ പ്രിയപ്പെട്ട മകൾ അന്നയുടെയും തോമസിന്റെയും വിശുദ്ധ വിവാഹത്തിന് നിങ്ങളെയും കുടുംബത്തെയും സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു.",
        closingCopy: "നിങ്ങളുടെ സാന്നിധ്യവും പ്രാർത്ഥനയും ഞങ്ങൾക്ക് അനുഗ്രഹമാണ്.",
        coverSubtitle: "അവരുടെ കുടുംബങ്ങളോടൊപ്പം",
        location: {
          name: "സെന്റ് ജോർജ് കത്തീഡ്രൽ",
          address: "Kottayam, Kerala 686001",
          mapUrl: "https://maps.google.com/?q=Kottayam+Kerala",
        },
      },
      ta: {
        bride: "கிரேஸ் தாமஸ்",
        groom: "டேனியல் பெர்னாண்டஸ்",
        tagline: "நம்பிக்கையும் அன்பும் நிறைந்த உறுதி.",
        invitationCopy:
          "மகிழ்ச்சியுடன் எங்கள் மகள் கிரேஸ் மற்றும் டேனியலின் புனித திருமணத்திற்கு அழைக்கிறோம்.",
        coverSubtitle: "அவர்களது குடும்பங்களுடன்",
      },
      hi: {
        bride: "ग्रेस थॉमस",
        groom: "डेनियल फर्नांडिस",
        tagline: "विश्वास, आशा और आजीवन वचन।",
        invitationCopy:
          "हर्षित हृदय से हम ग्रेस और डेनियल के पवित्र विवाह में आपको आमंत्रित करते हैं।",
        coverSubtitle: "विश्वास और प्रेम में एकजुट",
      },
      kn: {
        bride: "ಗ್ರೇಸ್ ಥಾಮಸ್",
        groom: "ಡೇನಿಯಲ್ ಫರ್ನಾಂಡಿಸ್",
        invitationCopy:
          "ನಮ್ಮ ಮಗಳು ಗ್ರೇಸ್ ಮತ್ತು ಡೇನಿಯಲ್ ಅವರ ಪವಿತ್ರ ವಿವಾಹಕ್ಕೆ ನಿಮ್ಮನ್ನು ಆಹ್ವಾನಿಸುತ್ತೇವೆ.",
        coverSubtitle: "ಅವರ ಕುಟುಂಬಗಳೊಂದಿಗೆ",
      },
      te: {
        bride: "గ్రేస్ థామస్",
        groom: "డేనియల్ ఫెర్నాండెజ్",
        invitationCopy:
          "మా కుమార్తె గ్రేస్ మరియు డేనియల్ పవిత్ర వివాహానికి మిమ్మల్ని ఆహ్వానిస్తున్నాము.",
        coverSubtitle: "వారి కుటుంబాలతో",
      },
    },
  },
  sikh: {
    faith: "sikh",
    faithLabel: "Sikh",
    emblem: "☬",
    audioSrc: "/audio/sikh-ceremony.mp3",
    regionLabel: "Chandigarh",
    weddingDate: "2026-10-18T10:00:00+05:30",
    weddingDateLabel: "18 / 10 / 2026",
    monogram: "HG",
    bride: "Harleen Kaur",
    groom: "Gurpreet Singh",
    blessingNative: "ੴ ਸਤਿ ਨਾਮੁ",
    blessingEnglish: "By the grace of the True Guru, we invite you to our Anand Karaj.",
    hosts: "S. Jaswant Singh & Family",
    tagline: "In the Guru's presence, two become one.",
    invitationCopy:
      "With Waheguru's blessings, we joyfully invite you to the Anand Karaj of our beloved Harleen Kaur with Gurpreet Singh.",
    closingCopy:
      "May Waheguru bless this union with peace, seva, and everlasting joy.",
    coverSubtitle: "With the Blessings of Waheguru",
    location: {
      name: "Gurdwara Singh Sabha",
      address: "Sector 34, Chandigarh 160022",
      mapUrl: "https://maps.google.com/?q=Gurdwara+Singh+Sabha+Chandigarh",
    },
    events: [
      { id: "anand", title: "Anand Karaj", emoji: "☬", dateLabel: "18 OCT 2026", dayLabel: "Sunday", time: "10:00 AM", venue: "Gurdwara Singh Sabha", city: "Chandigarh" },
      { id: "lunch", title: "Langar & Reception", emoji: "🧡", dateLabel: "18 OCT 2026", dayLabel: "Sunday", time: "1:00 PM", venue: "Community Hall", city: "Chandigarh" },
    ],
    byLanguage: {
      hi: {
        bride: "हरलीन कौर",
        groom: "गुरप्रीत सिंह",
        tagline: "गुरु की हाज़री में दो एक हो जाते हैं।",
        invitationCopy:
          "वाहेगुरु की कृपा से हम हरलीन कौर और गुरप्रीत सिंह के आनंद कारज में आपको आमंत्रित करते हैं।",
        coverSubtitle: "वाहेगुरु की कृपा से",
      },
      kn: {
        bride: "ಹರ್ಲೀನ್ ಕೌರ್",
        groom: "ಗುರಪ್ರೀತ್ ಸಿಂಗ್",
        invitationCopy:
          "ವಾಹೆಗುರುವಿನ ಆಶೀರ್ವಾದದೊಂದಿಗೆ ಹರ್ಲೀನ್ ಮತ್ತು ಗುರಪ್ರೀತ್ ಅವರ ಆನಂದ್ ಕಾರಜ್‌ಗೆ ಆಹ್ವಾನ.",
        coverSubtitle: "ವಾಹೆಗುರುವಿನ ಆಶೀರ್ವಾದದೊಂದಿಗೆ",
      },
      ta: {
        bride: "ஹர்லீன் கவுர்",
        groom: "குர்பிரீத் சிங்",
        invitationCopy:
          "வாஹேகுரு அருளால் ஹர்லீன் மற்றும் குர்பிரீத் ஆனந்த் காரஜ் விழாவிற்கு அழைக்கிறோம்.",
        coverSubtitle: "வாஹேகுரு அருளுடன்",
      },
      te: {
        bride: "హర్లీన్ కౌర్",
        groom: "గుర్ప్రీత్ సింగ్",
        invitationCopy:
          "వాహెగురు ఆశీస్సులతో హర్లీన్ మరియు గుర్ప్రీత్ ఆనంద్ కారజ్‌కు ఆహ్వానం.",
        coverSubtitle: "వాహెగురు ఆశీస్సులతో",
      },
      ml: {
        bride: "ഹർലീൻ കൗർ",
        groom: "ഗുർപ്രീത് സിംഗ്",
        invitationCopy:
          "വാഹെഗുരുവിന്റെ അനുഗ്രഹത്തോടെ ഹർലീനിന്റെയും ഗുർപ്രീതിന്റെയും ആനന്ദ് കാരജിലേക്ക് ക്ഷണം.",
        coverSubtitle: "വാഹെഗുരു അനുഗ്രഹത്തോടെ",
      },
    },
  },
  jain: {
    faith: "jain",
    faithLabel: "Jain",
    emblem: "🪷",
    audioSrc: "/audio/jain-ceremony.mp3",
    regionLabel: "Ahmedabad",
    weddingDate: "2027-01-24T11:00:00+05:30",
    weddingDateLabel: "24 / 01 / 2027",
    monogram: "RK",
    bride: "Riya Jain",
    groom: "Kabir Shah",
    blessingNative: "णमो अरिहंताणं",
    blessingEnglish:
      "With reverence to the Tirthankaras, we invite you to bless our sacred beginning.",
    hosts: "Mr & Mrs. Naveen Jain",
    tagline: "Ahimsa in heart. Forever in vow.",
    invitationCopy:
      "In the spirit of simplicity and devotion, we request the honour of your presence at the wedding of our daughter Riya with Kabir.",
    closingCopy:
      "May this union walk the path of compassion, truth, and mutual respect.",
    coverSubtitle: "With Family Blessings",
    location: {
      name: "Shanti Vatika",
      address: "Palitana Road, Ahmedabad, Gujarat 380015",
      mapUrl: "https://maps.google.com/?q=Ahmedabad+Gujarat",
    },
    events: [
      { id: "mangal", title: "Mangal Fera", emoji: "🪷", dateLabel: "24 JAN 2027", dayLabel: "Sunday", time: "11:00 AM", venue: "Shanti Vatika", city: "Ahmedabad" },
      { id: "reception", title: "Evening Reception", emoji: "🤍", dateLabel: "24 JAN 2027", dayLabel: "Sunday", time: "6:30 PM", venue: "Ivory Hall", city: "Ahmedabad" },
    ],
    byLanguage: {
      hi: {
        bride: "रिया जैन",
        groom: "कबीर शाह",
        tagline: "हृदय में अहिंसा। प्रणय में अनंत।",
        invitationCopy:
          "सरलता और भक्ति के साथ हम रिया एवं कबीर के विवाह में आपको सादर आमंत्रित करते हैं।",
        coverSubtitle: "परिवार के आशीर्वाद के साथ",
      },
      kn: {
        bride: "ರಿಯಾ ಜೈನ್",
        groom: "ಕಬೀರ್ ಶಾ",
        invitationCopy:
          "ಸರಳತೆ ಮತ್ತು ಭಕ್ತಿಯೊಂದಿಗೆ ರಿಯಾ ಹಾಗೂ ಕಬೀರ್ ಅವರ ವಿವಾಹಕ್ಕೆ ಆಹ್ವಾನ.",
        coverSubtitle: "ಕುಟುಂಬದ ಆಶೀರ್ವಾದದೊಂದಿಗೆ",
      },
      ta: {
        bride: "ரியா ஜெயின்",
        groom: "கபீர் ஷா",
        invitationCopy:
          "எளிமையும் பக்தியும் கொண்டு ரியா மற்றும் கபீரின் திருமணத்திற்கு அழைக்கிறோம்.",
        coverSubtitle: "குடும்ப ஆசீர்வாதத்துடன்",
      },
      te: {
        bride: "రియా జైన్",
        groom: "కబీర్ షా",
        invitationCopy:
          "సరళత మరియు భక్తితో రియా మరియు కబీర్ వివాహానికి ఆహ్వానం.",
        coverSubtitle: "కుటుంబ ఆశీర్వాదాలతో",
      },
      ml: {
        bride: "റിയ ജൈൻ",
        groom: "കബീർ ഷാ",
        invitationCopy:
          "ലാളിത്യത്തോടെയും ഭക്തിയോടെയും റിയയുടെയും കബീറിന്റെയും വിവാഹത്തിലേക്ക് ക്ഷണം.",
        coverSubtitle: "കുടുംബാനുഗ്രഹത്തോടെ",
      },
    },
  },
  interfaith: {
    faith: "interfaith",
    faithLabel: "Interfaith",
    emblem: "✧",
    audioSrc: "/audio/interfaith-ceremony.mp3",
    regionLabel: "Goa",
    weddingDate: "2026-11-28T17:00:00+05:30",
    weddingDateLabel: "28 / 11 / 2026",
    monogram: "ML",
    bride: "Maya Kapoor",
    groom: "Leo Andersen",
    blessingNative: "Love is the bridge",
    blessingEnglish:
      "Across faiths and continents, we choose each other — and invite you to celebrate.",
    hosts: "The Kapoor & Andersen Families",
    tagline: "Two cultures. One promise.",
    invitationCopy:
      "We joyfully invite you to an intimate celebration uniting Maya and Leo. Come share music, stories, and a feast that honours both our worlds.",
    closingCopy: "Your love and laughter will make our day whole.",
    coverSubtitle: "Two Families. One Celebration.",
    location: {
      name: "Cliffside Pavilion",
      address: "Candolim, Goa 403515",
      mapUrl: "https://maps.google.com/?q=Candolim+Goa",
    },
    events: [
      { id: "ceremony", title: "Unity Ceremony", emoji: "🌍", dateLabel: "28 NOV 2026", dayLabel: "Saturday", time: "5:00 PM", venue: "Cliffside Pavilion", city: "Goa" },
      { id: "dinner", title: "Dinner & Dance", emoji: "🥂", dateLabel: "28 NOV 2026", dayLabel: "Sunday", time: "7:30 PM", venue: "Ocean Lawn", city: "Goa" },
    ],
    byLanguage: {
      hi: {
        bride: "माया कपूर",
        groom: "लियो एंडरसन",
        tagline: "दो संस्कृतियाँ। एक वादा।",
        invitationCopy:
          "माया और लियो के अंतरधार्मिक उत्सव में आपको सादर आमंत्रित करते हैं।",
        coverSubtitle: "दो परिवार। एक उत्सव।",
      },
      kn: {
        bride: "ಮಾಯಾ ಕಪೂರ್",
        groom: "ಲಿಯೋ ಆಂಡರ್ಸನ್",
        invitationCopy:
          "ಮಾಯಾ ಮತ್ತು ಲಿಯೋ ಅವರ ಅಂತರ್ಧರ್ಮೀಯ ಸಂಭ್ರಮಕ್ಕೆ ನಿಮ್ಮನ್ನು ಆಹ್ವಾನಿಸುತ್ತೇವೆ.",
        coverSubtitle: "ಎರಡು ಕುಟುಂಬ. ಒಂದು ಆಚರಣೆ.",
      },
      ta: {
        bride: "மாயா கபூர்",
        groom: "லியோ ஆண்டர்சன்",
        invitationCopy:
          "மாயா மற்றும் லியோவின் இணைப்பு விழாவிற்கு உங்களை அழைக்கிறோம்.",
        coverSubtitle: "இரண்டு குடும்பங்கள். ஒரு கொண்டாட்டம்.",
      },
      te: {
        bride: "మాయా కపూర్",
        groom: "లియో ఆండర్సన్",
        invitationCopy:
          "మాయా మరియు లియో సంయుక్త వేడుకకు మిమ్మల్ని ఆహ్వానిస్తున్నాము.",
        coverSubtitle: "రెండు కుటుంబాలు. ఒక వేడుక.",
      },
      ml: {
        bride: "മായ കപൂർ",
        groom: "ലിയോ ആൻഡേഴ്സൻ",
        invitationCopy:
          "മായയുടെയും ലിയോയുടെയും അന്തർമത ആഘോഷത്തിലേക്ക് നിങ്ങളെ ക്ഷണിക്കുന്നു.",
        coverSubtitle: "രണ്ട് കുടുംബങ്ങൾ. ഒരു ആഘോഷം.",
      },
    },
  },
};

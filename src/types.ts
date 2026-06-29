export type Screen = 'home' | 'contact' | 'packages' | 'deep_dive' | 'booking' | 'gallery';

export type PackageCategory = 'birthday' | 'romantic' | 'baby-shower' | 'anniversary';

export interface BirthdayPackage {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: PackageCategory;
  inclusions: string[];
}

export interface CustomPackageRequest {
  balloonCount: number;
  banners: string[];
  customBannerText: string;
  decorationTypes: string[];
  extras: string[];
  budgetRange: string;
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  location: string;
  specialNotes: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  image: string;
  description: string;
}

export interface BookingData {
  date: string;
  location: string;
  fullname: string;
  phone: string;
  packageId?: string;
}

export interface NavigationState {
  currentScreen: Screen;
  history: Screen[];
}

export const BIRTHDAY_PACKAGES: BirthdayPackage[] = [
  {
    id: 'balloon-bliss',
    title: 'Balloon Bliss',
    price: 2000,
    image: '/packages/image2000.png',
    description: 'A classic birthday balloon setup with vibrant colours and a festive banner to set the mood. Perfect for intimate home celebrations.',
    category: 'birthday',
    inclusions: [
      '200 Balloons',
      '1 Happy Birthday Banner',
      '3 Curtains'
    ]
  },
  {
    id: 'ring-decoration',
    title: 'Ring Decoration',
    price: 3000,
    image: '/packages/image3000.png',
    description: 'An elegant ring-shaped decoration centerpiece surrounded by a sea of balloons and illuminated with LED birthday lights.',
    category: 'birthday',
    inclusions: [
      '300 Balloons',
      '3 Curtains',
      'LED Lights of Happy Birthday'
    ]
  },
  {
    id: 'starry-night',
    title: 'Starry Night',
    price: 3500,
    image: '/packages/image3500.png',
    description: 'A dreamy celestial-themed setup with foil stars, a crescent moon, and a welcome balloon arch. Ideal for a magical birthday night.',
    category: 'birthday',
    inclusions: [
      '300 Balloons',
      '1× Welcome Foil Balloon',
      '8× Little Foil Stars',
      '1× Foil Moon',
      '3 Curtains'
    ]
  }
];

export const PACKAGE_CATEGORIES: { label: string; value: PackageCategory | 'all' }[] = [
  { label: 'All Packages', value: 'all' },
  { label: 'Birthday', value: 'birthday' },
  { label: 'Romantic Dinners', value: 'romantic' },
  { label: 'Baby Showers', value: 'baby-shower' },
  { label: 'Anniversaries', value: 'anniversary' },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-neon-bash',
    title: 'Neon Birthday Bash',
    location: 'South Delhi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-S5qHmNzUsrIBs62ZpJBvAGNVw8pH30IK_lU1EVZlZCgfLyA3SpSatRdq7l9VIUP8khixaf82Yd68scmrkVH6WFmGivBr3TcVDSVY_oSIt78s06TQjPdH2RVCBV2LpmI6u7fH4dV8pjSbrYEcwwvuecph72qi8fAfsx5RetD4F7Z9vuMS3_1XeQ_SGoSFI9nP_0VT1bdWNu8RCA3r0GPlySDlNJ3IHEe9dfOyJLRHfTaCBDHTzPuiP2QgTN2Xqm3us2YBs20Lsg',
    description: 'A striking, maximalist birthday party setup in a lush South Delhi garden featuring a cascading balloon arch in vibrant neon pink, bright yellow, and metallic gold drapes.'
  },
  {
    id: 'gallery-rooftop-romance',
    title: 'Rooftop Romance',
    location: 'Gurugram',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCb4Yb1E3efgqAVBPNCL995W3LWpFgXx6C96pIoz6r0XC2mFdf1NfSogCDG0hmZcydsmUh-A0LVgq5AlsXdWgLH1JQwr2sCmn7fgGmMiMGJwf1AOTd7022JJ7mZLz1EzoS37cxAMXdnpalvvNE3xBLDk_na3KvJbOpirVo2iIuaCA7FKpTzqir_k_uTMNpVjB2YcCgDdvWG3EMbqQu6RSGu6lN2eF8cMpsfLFkHgivj8zDOeQ2H1vnNvk2Gni-jwpJ9viS4T-3k_w',
    description: 'A romantic, intimate anniversary dinner setup on a modern Gurugram rooftop with low picnic seating, candle lighting, and a glowing neon sign.'
  },
  {
    id: 'gallery-pastel-dreams',
    title: 'Pastel Dreams Shower',
    location: 'Noida',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-SV_TE01-Z6Pe2Jehr1ZYep4q5HtKI4DnK9O886nR0WdSEX5zlvD3C7i79-HC5hyEiPi0GTsJfEKi_rdAAobO3Dx2EZVZIVNNdt07KEmFzQ93p1sMr3kIkaZgEDE9hEFkQQd4a584_Z5kTnRdfKXx67pZC26PGGI6HjaLLY4rNBB7NHaEYTEK2lArXPh4OJR7myelaIsNli72-lKPSWe9rGieFguEzZ4Of7sspbyzRSTewaISigken98hUJzKQlrgM2ayPKYHbw',
    description: 'A cheerful baby shower event decorated with massive pastel pink and yellow bouncy props, custom banners, and soft toy arrangements.'
  },
  {
    id: 'gallery-club-16',
    title: 'Club 16',
    location: 'Vasant Kunj',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU4gikTviOvEVmzlAThTHwyUwFm9aFoLnfr3Aw4iGR4Zd_rYIvzr-Ic7vCHTS9wvadVDO3TEE3oaUVFL0XjhUSHG1KicClPQtlpRbmHpZ0dKeSVGRX0WruLVc3TVXCZKCgW3c0RsMFvvjhtYGnE2irrps7ovnGT7yd3HbX2E0ss4gXVMf46DGal2xhX8buL6gX7JApbXv0hXH1I1gxqRQl8iRsXqzNJe2qT40hpBvpqxNbYJI-BbI20AppGaQArb7sO8X3UxHYuQ',
    description: 'A premium Sweet 16 setup with vibrant neon panels, interactive projection setups, and professional laser lights.'
  },
  {
    id: 'gallery-sunshine-haldi',
    title: 'Sunshine Haldi',
    location: 'Chattarpur',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSZIxtPeq16HCZ9f0jOi00AezrRPaV2hGNGMPCnL3pyvPka9ynj4m3_BKJ5n1s3RTxN-dCRDuMM5U6TxYBfM-LjQbLIQ4k6I30OyU_UzS3VNeddoEAM-WbXuJGyaVwrJ_fSUjZUH_R52pYLCbNKoSdwx1qOrlFKF20D7DuHZ02HV3ryL6v7mz6N_eGP1DQJkkhFZnyDtYFtTik-SXvOtS6uKsZNdwxnqX61hwmpnpAjE6LM3o1Vr5XAJdxrTakmUTuk3FqaroOKA',
    description: 'Traditional meets modern maximalist decor under drapes of hot pink and golden marigolds at a luxury Chattarpur farmhouse.'
  },
  {
    id: 'gallery-enchanted-forest',
    title: 'Enchanted Forest',
    location: 'Faridabad',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcjAHYoPktk8U8Ku6uDD-oj3eTQwpT6LKFZnC1xzamKGgXBDiPHmi_ZCsHkzWLZ1AmEs-Dy5Ii9qXCYLWUjQo4zbsaHIWkYZmS4S5docwa9T_KPFHqQs0c6C289Aqg5mbqrHX1hN27F55MYaMeTyNP70hpmGqWUzY2KZv5aYjepzH5P4u9_zGru5_R07NGEVOxsFeme9sf6DddwUwNpNMiXrR6Wtn_jMSApp3dQsYo_SbFIYYlQkJpQyAAgfTqWk3NcTHfvjeswg',
    description: 'A fairy-tale children birthday setup with organic woodcraft, oversized mushrooms, and a pastel pink castle structure.'
  },
  {
    id: 'gallery-corporate-gala',
    title: 'Corporate Gala',
    location: 'DLF Cyber City',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIhniA5_21pdvLDoBlsKKctl-KaiRo544MHkuL47QA1RQN7YGIr-NGECczyAsYDPpBhr6_UN_271GoEt9Nfd3k4EKOss2IG2Qz2PTFVSU6Fa0NL6_BaaIblF8dMM4w8rcHyTLsacK5cmVzoy5vnul_Mv1qx5q_X4KO0c1hJ8443aqzSwTRjmmv3Npyv4E6-gZU2nnRJ7DDOwmhJMy2k3XOpLPNjgl6yitCSU5mPWJ1d0L1Nn3uWUaMQfGxKvwg71hRlT2Rx-QLBA',
    description: 'A bold corporate celebration featuring magenta floral arrangements framing a high-definition LED projection stage.'
  },
  {
    id: 'gallery-terrace-movie-night',
    title: 'Terrace Movie Night',
    location: 'Greater Kailash',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqo-74RvP1qrZiQbvTRgslKT-bSsAicc8-vJcdkEQLq4Y9pc9MA0jksZs55yLKwNI0TrmksjmFxb9aAy32x2jJPeSAHN5jKCPoLFXrLsMi7DPF_5jmUMKz8XMMn7CuPHq_ALfHaiMzOV4KEdjxq77Mp5PGNYJmk-CH6eWajxft4uRK7GFbG2kP38PEAG8wJ5mCFtUnb1uNv2PVpDv56wGkdMLkmefy0OnLfht6RyYMkij2VkPCmrWtLyp-RY8ih6qMzaot8zSgJA',
    description: 'Cozy movie viewing setup under open skies with plush seating, warm fairy lights, and an interactive widescreen.'
  }
];

export type Screen = 'home' | 'contact' | 'packages' | 'deep_dive' | 'booking' | 'gallery';

export interface BirthdayPackage {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  vibe: 'Minimalist' | 'Neon Bash' | 'Floral Fantasy' | 'Vintage Gold';
  inclusions: string[];
  priceRange: 'all' | '<2000' | '2000-5000' | '5000+';
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
    id: 'neon-birthday-bash',
    title: 'Grand Neon Bash',
    price: 4999,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUuKKKLAI2RdK5K5ZnuJ4sTfmOD9yhnAktM6mJH3KudfV7q6TBFh-6sL9bGsDmfqRt4Emwk53Xut15gjOBCAcQ7b4ZPbjYP_97voEy5WsrLaaKe3g3wk_hu1elcf7oavFYUSUJeNO6_QXjWpRGbrOXeQ04BG8YZdoCZGJj3NeFbN73qlYBzJ5CLOua9Ty_-KIdeDUGWfmR1cGJm2NXB6EOu0ltUL9Xrlgtil0BWi7Ukn3ob3boFm-JcmM_ZkikjljKta-lzPLsLA',
    description: 'Turn up the volume on your celebration with our most vibrant, high-energy setup yet. Perfect for making those Instagram reels pop.',
    vibe: 'Neon Bash',
    priceRange: '2000-5000',
    inclusions: [
      "Custom 'Happy Birthday' Neon Signage",
      "150+ Premium Metallic & Matte Balloons",
      "Shimmer Wall Backdrop (Gold or Silver)",
      "Acrylic Cake Pedestal with LED up-lighting",
      "Professional Setup & Cleanup within Delhi NCR"
    ]
  },
  {
    id: 'petite-balloon-arch',
    title: 'Petite Balloon Arch',
    price: 1999,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyqniP3PwWpKo65hnW4deugbhcMq-pB28vgni1MQkED_EfLWCqFpBKwAoB8B20JRsK8US3Bpzc5mRhCBDuqibL0BzEM0nTlNiN9HYWnL3pyOT0oS43GEVNjWvwphUHVbf9tGyzbsFDCPoSXRdx_qvffVo9vf8bMQBj7f3mS6Jyv7simxqgIUd7fVAIQMualNwAm31iXRoHJWJ72X1AS6m6VFudzGh6cKYvwa_UetLOucZuPrx2rmr_BYqCkqUVdMb_83IRbTeRlw',
    description: 'A minimalist and chic birthday decor set against a clean white wall. A delicate pastel pink balloon arch frames a simple cake table. Soft, natural morning light creates a peaceful and elegant mood.',
    vibe: 'Minimalist',
    priceRange: '<2000',
    inclusions: [
      "Single Color Palette Balloon Arch",
      "2-Hour Fast Setup Time",
      "Basic Props & Cake Pedestal Included",
      "Subtle and Elegant Accent Setup"
    ]
  },
  {
    id: 'floral-fantasy',
    title: 'Floral Fantasy',
    price: 3499,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdg87QW75L7sqXj8AL2MSgVhPXqehyiDWwef5IlYAGrUiDTLcrMEVnhyGuYuZBbw51roWn2rXUtdZrnfUvLx6Q5txyXkozVrPkGSTw9ss_lqnziK_CK8MpVqGsoisuOczGJM-X8DVugIspK5pJMCfx1edkhCUhv829zJq2OQXkG1FsUcKp9lmpbb-ssm4V-SsbShLc4Wb9fajvi9AowpZW6gDqGW2JttHot3R4RyCRzisyPMuSsvDrWInf7V3_wG38mb9mFcs_IA',
    description: 'A lush floral-themed birthday setup with cascading roses and hydrangeas around a circular golden backdrop. Reflects a romantic, premium, and highly sophisticated celebration style.',
    vibe: 'Floral Fantasy',
    priceRange: '2000-5000',
    inclusions: [
      "Fresh Exotic Flowers (Roses & Hydrangeas)",
      "Premium Golden Circle Frame Setup",
      "Personalized Acrylic Greeting Board",
      "Warm Cinematic Spotlight Illuminations"
    ]
  },
  {
    id: 'retro-disco',
    title: 'The Retro Disco',
    price: 2999,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7IWePoEpl9vrgkaah5Qix38NC0Ag6yEnSWxbnbRy1Q5mLQvKtERpQi54EWDkoQT2LDgcBJSIvpvm1VpcFG-9D3aEYQT6hh_W16mcUuqS07SvAOGjWvaTEym7rpwtD6Dvuj882XJX9P4tfPt1ROiuDYSI4hR5SM5s-5XpJyAYnIt6n1JXFdrzjpsu7xExQ1xlu5qWHYD21FS7TDcl7xecBxiYPst7whAe76CWfnzRya7zI4HTiLOjOzHil7ndDhsk2MKRLxk4Nwg',
    description: 'Bring the 70s back with our shimmering disco ball installation and iridescent backdrops. Perfect for the dance floor enthusiasts.',
    vibe: 'Vintage Gold',
    priceRange: '2000-5000',
    inclusions: [
      "10+ Shimmering Metallic Disco Balls",
      "Iridescent Backdrop & Streamers Setup",
      "Dynamic Multi-colored Spotlights",
      "Special Effects Smoke Machine Included"
    ]
  }
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

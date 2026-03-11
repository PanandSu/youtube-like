// Mock data for videos
const mockVideos = [
  {
    id: 'v1',
    title: 'Building a Modern Web Application from Scratch',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=640&h=360&fit=crop',
    duration: '24:35',
    views: 1250000,
    uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    channel: {
      id: 'c1',
      name: 'CodeMaster Pro',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      subscribers: 2500000,
      verified: true
    },
    description: 'Learn how to build a complete web application from scratch using modern technologies. We cover everything from setup to deployment.',
    tags: ['coding', 'web development', 'tutorial'],
    category: 'tech',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    likes: 45000,
    liked: false,
    subscribed: false,
    live: true
  },
  {
    id: 'v2',
    title: 'Top 10 Gaming Moments of 2025 - You Won\'t Believe #7',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=640&h=360&fit=crop',
    duration: '18:42',
    views: 3500000,
    uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    channel: {
      id: 'c2',
      name: 'Gaming Insider',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a3694fb2c61?w=100&h=100&fit=crop',
      subscribers: 5200000,
      verified: true
    },
    description: 'The most incredible gaming moments captured this year. From clutch plays to hilarious glitches, this compilation has it all!',
    tags: ['gaming', 'highlights', 'compilation'],
    category: 'gaming',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    likes: 89000,
    liked: false,
    subscribed: false
  },
  {
    id: 'v3',
    title: 'Acoustic Guitar Covers - Relaxing Music Mix',
    thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=640&h=360&fit=crop',
    duration: '1:02:15',
    views: 890000,
    uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    channel: {
      id: 'c3',
      name: 'Melody Lounge',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      subscribers: 1800000
    },
    description: 'A curated collection of beautiful acoustic guitar covers perfect for studying, relaxing, or background music.',
    tags: ['music', 'acoustic', 'relaxing'],
    category: 'music',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: 32000,
    liked: false,
    subscribed: false
  },
  {
    id: 'v4',
    title: 'Ultimate Street Food Tour - Bangkok, Thailand',
    thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=640&h=360&fit=crop',
    duration: '32:18',
    views: 2100000,
    uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    channel: {
      id: 'c4',
      name: 'Foodie Explorer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      subscribers: 3200000
    },
    description: 'Join us on a mouth-watering journey through Bangkok\'s famous street food scene. From pad thai to mango sticky rice!',
    tags: ['food', 'travel', 'bangkok', 'street food'],
    category: 'travel',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    likes: 67000,
    liked: false,
    subscribed: false
  },
  {
    id: 'v5',
    title: 'Championship Finals - Epic Basketball Highlights',
    thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=640&h=360&fit=crop',
    duration: '45:22',
    views: 5600000,
    uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    channel: {
      id: 'c5',
      name: 'Sports Central',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      subscribers: 8500000
    },
    description: 'Watch the most intense moments from this year\'s championship finals. Buzzer beaters, incredible blocks, and legendary plays!',
    tags: ['sports', 'basketball', 'highlights'],
    category: 'sports',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    likes: 120000,
    liked: false,
    subscribed: false
  },
  {
    id: 'v6',
    title: 'Mastering Italian Cuisine - Pasta Making Masterclass',
    thumbnail: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=640&h=360&fit=crop',
    duration: '28:55',
    views: 980000,
    uploadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    channel: {
      id: 'c6',
      name: 'Chef\'s Kitchen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      subscribers: 2100000
    },
    description: 'Learn the art of making authentic Italian pasta from scratch. From fresh pasta dough to delicious sauces!',
    tags: ['cooking', 'italian', 'pasta', 'tutorial'],
    category: 'cooking',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    likes: 41000,
    liked: false,
    subscribed: false
  },
  {
    id: 'v7',
    title: 'Stand-Up Comedy Special - Best of 2025',
    thumbnail: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=640&h=360&fit=crop',
    duration: '1:15:30',
    views: 4200000,
    uploadedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    channel: {
      id: 'c7',
      name: 'Comedy Gold',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      subscribers: 4500000
    },
    description: 'The funniest moments from stand-up comedians this year. Guaranteed to make you laugh out loud!',
    tags: ['comedy', 'stand-up', 'funny'],
    category: 'comedy',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    likes: 95000,
    liked: false,
    subscribed: false
  },
  {
    id: 'v8',
    title: 'Machine Learning Explained - Beginner\'s Guide',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=640&h=360&fit=crop',
    duration: '52:18',
    views: 1800000,
    uploadedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    channel: {
      id: 'c8',
      name: 'Tech Academy',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
      subscribers: 3800000
    },
    description: 'A comprehensive introduction to machine learning concepts. Perfect for beginners looking to enter the field of AI.',
    tags: ['education', 'machine learning', 'AI', 'tutorial'],
    category: 'education',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    likes: 56000,
    liked: false,
    subscribed: false
  },
  {
    id: 'v9',
    title: 'Japan Travel Vlog - Cherry Blossom Season',
    thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=640&h=360&fit=crop',
    duration: '38:42',
    views: 1650000,
    uploadedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    channel: {
      id: 'c9',
      name: 'Wanderlust Tales',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      subscribers: 2800000
    },
    description: 'Experience the magical cherry blossom season in Japan. From Tokyo to Kyoto, beautiful sakura everywhere!',
    tags: ['travel', 'japan', 'vlog', 'cherry blossom'],
    category: 'travel',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    likes: 48000,
    liked: false,
    subscribed: false
  },
  {
    id: 'v10',
    title: 'FIFA 26 - First Impressions & Gameplay Review',
    thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=640&h=360&fit=crop',
    duration: '22:15',
    views: 2800000,
    uploadedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    channel: {
      id: 'c10',
      name: 'Game Review Hub',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop',
      subscribers: 4200000
    },
    description: 'Our first look at FIFA 26. New features, updated graphics, and is it worth the upgrade? Find out!',
    tags: ['gaming', 'fifa', 'review', 'sports game'],
    category: 'gaming',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    likes: 72000,
    liked: false,
    subscribed: false
  },
  {
    id: 'v11',
    title: 'Lo-Fi Hip Hop - Study Beats Mix',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=640&h=360&fit=crop',
    duration: '2:00:00',
    views: 5200000,
    uploadedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    channel: {
      id: 'c11',
      name: 'Chill Vibes',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
      subscribers: 6800000
    },
    description: 'Perfect lo-fi beats for studying, working, or relaxing. 2 hours of non-stop chill music!',
    tags: ['music', 'lofi', 'hip hop', 'study'],
    category: 'music',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    likes: 145000,
    liked: false,
    subscribed: false
  },
  {
    id: 'v12',
    title: 'iPhone 16 Pro Max - Full Review',
    thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=640&h=360&fit=crop',
    duration: '35:48',
    views: 3900000,
    uploadedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    channel: {
      id: 'c12',
      name: 'Tech Today',
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop',
      subscribers: 7200000
    },
    description: 'Complete review of the iPhone 16 Pro Max. Camera tests, performance benchmarks, battery life, and more!',
    tags: ['tech', 'iphone', 'review', 'apple'],
    category: 'tech',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    likes: 88000,
    liked: false,
    subscribed: false
  },
  {
    id: 'v13',
    title: 'Premier League Goals of the Month',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=640&h=360&fit=crop',
    duration: '15:30',
    views: 4100000,
    uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    channel: {
      id: 'c13',
      name: 'Football Focus',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
      subscribers: 5900000
    },
    description: 'The best goals from the Premier League this month. Volley, long-range, and incredible team goals!',
    tags: ['sports', 'football', 'soccer', 'premier league'],
    category: 'sports',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    likes: 92000,
    liked: false,
    subscribed: false
  },
  {
    id: 'v14',
    title: 'Sushi Making Tutorial - Authentic Japanese',
    thumbnail: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=640&h=360&fit=crop',
    duration: '42:10',
    views: 1100000,
    uploadedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    channel: {
      id: 'c14',
      name: 'Sushi Master',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
      subscribers: 1500000
    },
    description: 'Learn to make authentic Japanese sushi at home. From rice preparation to rolling techniques!',
    tags: ['cooking', 'sushi', 'japanese', 'tutorial'],
    category: 'cooking',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    likes: 38000,
    liked: false,
    subscribed: false
  },
  {
    id: 'v15',
    title: 'Physics Explained - How Light Works',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=640&h=360&fit=crop',
    duration: '28:22',
    views: 750000,
    uploadedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    channel: {
      id: 'c15',
      name: 'Science Simplified',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop',
      subscribers: 1900000
    },
    description: 'Dive deep into the fascinating world of light. Wave-particle duality, refraction, and more!',
    tags: ['education', 'physics', 'science', 'light'],
    category: 'education',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    likes: 28000,
    liked: false,
    subscribed: false
  },
  {
    id: 'v16',
    title: 'Prank Compilation - Ultimate Fun',
    thumbnail: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=640&h=360&fit=crop',
    duration: '25:45',
    views: 6200000,
    uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    channel: {
      id: 'c16',
      name: 'Fun Factory',
      avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488058?w=100&h=100&fit=crop',
      subscribers: 8100000
    },
    description: 'The funniest pranks caught on camera! Warning: Lots of laughing involved!',
    tags: ['comedy', 'pranks', 'funny'],
    category: 'comedy',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: 156000,
    liked: false,
    subscribed: false
  }
];

// Mock comments
const mockComments = [
  {
    id: 'cm1',
    author: 'TechEnthusiast',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    text: 'This is exactly what I needed! Great explanation.',
    likes: 234,
    uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: 'cm2',
    author: 'CodeNewbie',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    text: 'Finally understood this concept. Thank you!',
    likes: 156,
    uploadedAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
  },
  {
    id: 'cm3',
    author: 'LearningDaily',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    text: 'Could you make a follow-up video on advanced topics?',
    likes: 89,
    uploadedAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
  },
  {
    id: 'cm4',
    author: 'DevMaster2025',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    text: 'Bookmarked for later. This is gold!',
    likes: 45,
    uploadedAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
  },
  {
    id: 'cm5',
    author: 'WebWizard',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
    text: 'Your tutorials are always so well explained. Keep it up!',
    likes: 312,
    uploadedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  }
];

// State
let videos = [...mockVideos];
let currentVideo = null;
let currentCategory = 'all';
let searchQuery = '';

// Export for use in other modules
window.mockData = {
  videos,
  currentVideo,
  currentCategory,
  searchQuery,
  comments: mockComments
};

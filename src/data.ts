import { Product } from './types';

export const PRODUCTS: Product[] = [
  // --- SUITS ---
  {
    id: 'suit-1',
    name: 'Kashmiri Embroidered Chanderi Suit Set',
    description: 'An elegant lavender Chanderi cotton salwar suit set with delicate Kashmiri thread embroidery, matching cotton pants, and a sheer organza dupatta with gold zari borders. Perfect for festive celebrations and elegant gatherings.',
    price: 2450,
    originalPrice: 3200,
    category: 'Suits',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviewsCount: 42,
    isBestSeller: true,
    isNewArrival: false,
    stock: 12
  },
  {
    id: 'suit-2',
    name: 'Jaipuri Floral Print Anarkali Suit',
    description: 'A hand-block printed pure cotton Anarkali kurta featuring a beautiful blush-pink floral pattern, gotapatti work on the neckline, matching slim-fit trousers, and a lightweight printed mulmul dupatta.',
    price: 1890,
    originalPrice: 2400,
    category: 'Suits',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviewsCount: 28,
    isBestSeller: false,
    isNewArrival: true,
    stock: 8
  },
  {
    id: 'suit-3',
    name: 'Royal Maroon Velvet Kurta Set',
    description: 'A luxurious deep maroon velvet straight-cut kurta with detailed golden zari and sequin handcrafting around the neck and cuffs. Comes with matching comfortable velvet pants and an exquisite silk-blend dupatta.',
    price: 3400,
    originalPrice: 4500,
    category: 'Suits',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
    sizes: ['M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewsCount: 15,
    isBestSeller: true,
    isNewArrival: false,
    stock: 5
  },

  // --- SAREES ---
  {
    id: 'saree-1',
    name: 'Royal Banarasi Silk Saree',
    description: 'Exquisite deep crimson Banarasi silk saree hand-woven by master weavers in Varanasi. Showcases intricate gold brocade floral bootis, and an ornate, heavy gold pallu. Includes an unstitched matching blouse piece.',
    price: 4800,
    originalPrice: 6500,
    category: 'Sarees',
    image: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=600&auto=format&fit=crop&q=80',
    sizes: ['Free Size (5.5m + Blouse)'],
    rating: 5.0,
    reviewsCount: 36,
    isBestSeller: true,
    isNewArrival: false,
    stock: 6
  },
  {
    id: 'saree-2',
    name: 'Emerald Green Kanjeevaram Saree',
    description: 'A stunning emerald green Kanjeevaram silk saree with rich traditional gold zari borders displaying beautiful temple motifs. Offers a heavy, high-contrast gold pallu for an unmatched regal wedding look.',
    price: 5200,
    originalPrice: 7000,
    category: 'Sarees',
    image: 'https://images.unsplash.com/photo-1583391733912-64104616b72a?w=600&auto=format&fit=crop&q=80',
    sizes: ['Free Size (5.5m + Blouse)'],
    rating: 4.9,
    reviewsCount: 22,
    isBestSeller: false,
    isNewArrival: true,
    stock: 4
  },

  // --- NIGHTY ---
  {
    id: 'nighty-1',
    name: 'Pure Cotton Floral Print Maxi Nighty',
    description: 'Extremely soft and breathable 100% cotton night gown featuring classic floral prints. Offers a relaxed silhouette, side-pockets, and adjustable neck lace detailing for absolute evening comfort.',
    price: 650,
    originalPrice: 850,
    category: 'Nighty',
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6d588f?w=600&auto=format&fit=crop&q=80',
    sizes: ['L', 'XL', 'XXL'],
    rating: 4.5,
    reviewsCount: 54,
    isBestSeller: true,
    isNewArrival: false,
    stock: 25
  },
  {
    id: 'nighty-2',
    name: 'Premium Hosiery Nighty with Lace Detail',
    description: 'Made from high-grade stretchable cotton-hosiery knit fabric. This premium nighty has elegant delicate self-lace embroidery around the yoke and a highly durable color-fast floral-printed body.',
    price: 790,
    originalPrice: 990,
    category: 'Nighty',
    image: 'https://images.unsplash.com/photo-1562572159-4ebcd318f4dd?w=600&auto=format&fit=crop&q=80',
    sizes: ['M', 'L', 'XL'],
    rating: 4.4,
    reviewsCount: 19,
    isBestSeller: false,
    isNewArrival: true,
    stock: 18
  },

  // --- NIGHT SUITS ---
  {
    id: 'nightsuit-1',
    name: 'Pastel Floral Cotton Pajama Set',
    description: 'A cozy two-piece night suit featuring a button-down, short-sleeve notched collar shirt and matching slip-on pajamas with an elasticated waistband and side pockets. Extremely breathable pastel block patterns.',
    price: 1150,
    originalPrice: 1500,
    category: 'Night Suits',
    image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?w=600&auto=format&fit=crop&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviewsCount: 33,
    isBestSeller: true,
    isNewArrival: false,
    stock: 15
  },
  {
    id: 'nightsuit-2',
    name: 'Stylish Mustard Linen Co-ord Loungewear',
    description: 'Comfort-fit linen-cotton blend co-ord lounge set in warm mustard yellow. Featuring a relaxed drop-shoulder tunic-style top and cropped breathable culottes, suitable for both sleeping and light errands.',
    price: 1290,
    originalPrice: 1750,
    category: 'Night Suits',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.6,
    reviewsCount: 17,
    isBestSeller: false,
    isNewArrival: true,
    stock: 10
  },

  // --- BEDSHEETS ---
  {
    id: 'bedsheet-1',
    name: 'Traditional Sanganeri Jaipuri Double Bedsheet',
    description: 'A classic 100% cotton double bedsheet hand-printed using traditional wooden blocks by artisans in Sanganer, Jaipur. Set includes one king-size bedsheet and two matching pillow covers, featuring a dense traditional floral jaal border.',
    price: 1350,
    originalPrice: 1850,
    category: 'Bedsheets',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&auto=format&fit=crop&q=80',
    sizes: ['Double King (90" x 108")'],
    rating: 4.9,
    reviewsCount: 48,
    isBestSeller: true,
    isNewArrival: false,
    stock: 20
  },
  {
    id: 'bedsheet-2',
    name: 'Premium Cotton Indigo Block-Print Bedsheet',
    description: 'Indulgent, thick cotton high-TC double bedsheet hand-printed with organic Indigo vegetable dyes. Perfect ethnic touch to give your bedroom an elegant, rustic, yet boutique look.',
    price: 1550,
    originalPrice: 2100,
    category: 'Bedsheets',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80',
    sizes: ['Double King (90" x 108")', 'Single (60" x 90")'],
    rating: 4.7,
    reviewsCount: 29,
    isBestSeller: false,
    isNewArrival: true,
    stock: 14
  },

  // --- SLIPPERS ---
  {
    id: 'slipper-1',
    name: 'Handcrafted Velvet Zardozi Juttis',
    description: 'A masterfully crafted ethnic slipper/jutti featuring premium soft black velvet embroidered with gorgeous golden zardozi threadwork. Extra cushioned insole for premium arch support during heavy wedding occasions.',
    price: 850,
    originalPrice: 1200,
    category: 'Slippers',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
    sizes: ['UK 5', 'UK 6', 'UK 7', 'UK 8'],
    rating: 4.8,
    reviewsCount: 26,
    isBestSeller: true,
    isNewArrival: false,
    stock: 11
  },
  {
    id: 'slipper-2',
    name: 'Comfort Plush Soft Home Slippers',
    description: 'Ultra-lightweight cozy slippers with faux-fur fleece and anti-skid rubber soles, ideal for keeping your feet warm and stress-free on tiled floors during long household tasks.',
    price: 390,
    originalPrice: 550,
    category: 'Slippers',
    image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=600&auto=format&fit=crop&q=80',
    sizes: ['UK 5-6 Dual Size', 'UK 7-8 Dual Size'],
    rating: 4.4,
    reviewsCount: 31,
    isBestSeller: false,
    isNewArrival: false,
    stock: 30
  },

  // --- GIFT ITEMS ---
  {
    id: 'gift-1',
    name: 'Handcrafted Brass Diya & Marigold Shagun Box',
    description: 'An elegant gift box consisting of one meticulously polished traditional brass diya, a small glass jar of organic vermilion (kumkum), and a string of lifelike fragrant marigold flower garlands, packed in a gold-embossed box.',
    price: 750,
    originalPrice: 1100,
    category: 'Gift Items',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80',
    sizes: ['Standard Gift Box'],
    rating: 4.9,
    reviewsCount: 12,
    isBestSeller: true,
    isNewArrival: true,
    stock: 16
  },
  {
    id: 'gift-2',
    name: 'Gilded Shagun Envelopes - Set of 10',
    description: 'Premium handmade paper cash envelopes with intricate hand-painted golden paisley highlights. Perfect for gifting auspicious cash amounts at weddings, pujas, and Indian festivals.',
    price: 250,
    originalPrice: 350,
    category: 'Gift Items',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    sizes: ['Pack of 10'],
    rating: 4.8,
    reviewsCount: 40,
    isBestSeller: false,
    isNewArrival: false,
    stock: 50
  },

  // --- AACHAR (PICKLE) ---
  {
    id: 'aachar-1',
    name: 'Dadi-Maa-style Homemade Mango Pickle (Aam ka Aachar)',
    description: 'Authentic Banarasi style mango pickle made using hand-cut local green mangoes, organic cold-pressed mustard oil, and ground aromatic spices like fennel, fenugreek, and mustard seeds. Naturally sun-matured for weeks without any synthetic preservatives.',
    price: 220,
    originalPrice: 280,
    category: 'Aachar',
    image: 'https://images.unsplash.com/photo-1589135306090-e55524b942f1?w=600&auto=format&fit=crop&q=80',
    sizes: ['250g', '500g', '1kg'],
    rating: 5.0,
    reviewsCount: 89,
    isBestSeller: true,
    isNewArrival: false,
    stock: 40
  },
  {
    id: 'aachar-2',
    name: 'Spicy Banarasi Stuffed Red Chilli Pickle',
    description: 'An old-school Mughalsarai favorite! Fat red chillies are carefully slit and packed tight with an incredibly flavorful, tangy spice blend of dry mango powder, mustard, and carom, cured under direct sunlight in traditional clay pots.',
    price: 280,
    originalPrice: 350,
    category: 'Aachar',
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=600&auto=format&fit=crop&q=80',
    sizes: ['250g', '500g', '1kg'],
    rating: 4.9,
    reviewsCount: 65,
    isBestSeller: true,
    isNewArrival: true,
    stock: 25
  },

  // --- PAPAD ---
  {
    id: 'papad-1',
    name: 'Hand-rolled Spicy Moong Dal Papad',
    description: 'Crispy, premium papads handcrafted by village women. Prepared with stone-ground moong dal flour, fresh black pepper grits, and premium hing (asafoetida). Totally sun-dried and hygienic.',
    price: 120,
    originalPrice: 160,
    category: 'Papad',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80',
    sizes: ['250g', '500g'],
    rating: 4.8,
    reviewsCount: 73,
    isBestSeller: true,
    isNewArrival: false,
    stock: 60
  },
  {
    id: 'papad-2',
    name: 'Traditional Sajji-Khar Masala Papad',
    description: 'An aromatic crunchy flatbread snack flavored with custom spices, cumin, and carom seeds. Light, bubbly, and incredibly satisfying when roasted on open flames or deep-fried.',
    price: 100,
    originalPrice: 130,
    category: 'Papad',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80',
    sizes: ['250g', '500g'],
    rating: 4.7,
    reviewsCount: 38,
    isBestSeller: false,
    isNewArrival: true,
    stock: 45
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Sushma Srivastava',
    location: 'Mughalsarai',
    rating: 5,
    text: 'Shree Hans Boutique has the best collection of salwar suits in Mughalsarai! The Kashmiri embroidery is flawless and the cotton fabric is so comfortable. Highly recommended!',
    date: '2 months ago'
  },
  {
    id: 't-2',
    name: 'Preeti Sharma',
    location: 'Varanasi',
    rating: 5,
    text: 'I ordered their homemade Mango Pickle and papads. They taste exactly like the ones my grandmother used to make! Clean, spicy, and purely homemade. Ordered bedsheets next and they are beautiful!',
    date: '1 month ago'
  },
  {
    id: 't-3',
    name: 'Anjali Verma',
    location: 'Ravinagar',
    rating: 5,
    text: 'Their custom stitching service is exceptional. I gave my wedding blouse for stitching, and the fit is absolutely perfect. The tailor was very cooperative with my measurements and details.',
    date: '3 weeks ago'
  },
  {
    id: 't-4',
    name: 'Divya Rastogi',
    location: 'Chandauli',
    rating: 4,
    text: 'Perfect cotton nighties and nightsuits. The prints don’t fade even after multiple machine washes. I will definitely buy more gift sets during Diwali.',
    date: '1 week ago'
  }
];

export const TAILORING_SERVICES = [
  {
    id: 'st-1',
    name: 'Custom Salwar Suit Stitching',
    description: 'Perfect tailor-fit salwar kameez, churidar, patiala, or palazzo suit sets stitched exactly to your measurements with optional boutique piping, laces, or matching linings.',
    basePrice: 450,
    duration: '3-5 Days',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'st-2',
    name: 'Designer Blouse Stitching',
    description: 'Stitch modern designer blouses (Princess cut, boat neck, halter neck, padded, backless) with perfect drapes and hooks, ideal to pair with your heavy silk or Banarasi sarees.',
    basePrice: 350,
    duration: '2-4 Days',
    image: 'https://images.unsplash.com/photo-1583391733912-64104616b72a?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'st-3',
    name: 'Anarkali or Kurti Custom Tailoring',
    description: 'Get flowy floor-length Anarkalis, straight Kurtis, or short tops stitched from your own fabrics with high precision, exquisite neckline cutouts, and hand-stitched borders.',
    basePrice: 500,
    duration: '4-6 Days',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'st-4',
    name: 'Saree Fall & Picco Work',
    description: 'Get seamless bottom fall stitching and precise picco borders for a flawless, non-fraying drape. Express next-day service available.',
    basePrice: 120,
    duration: '24 Hours',
    image: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=600&auto=format&fit=crop&q=80'
  }
];

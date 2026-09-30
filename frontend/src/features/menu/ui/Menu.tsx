"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { LayoutGroup, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useAnimation from "../hooks/useAnimation";

const { smoothEase, fadeUp, heroContainer, heroItem } = useAnimation();

/* =========================================================
   DATA
   Each entry in MENU is one slide (one page of the printed menu).
   Reorder, edit or remove entries freely.
========================================================= */

type Item = { name: string; price: string; note?: string };
type Section = { title: string; items: Item[] };
type MenuPage = { tab: string; sections: Section[] };

const i = (name: string, price: string, note?: string): Item => ({
  name,
  price,
  note,
});

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=90";

const MENU: MenuPage[] = [
  {
    tab: "Soups",
    sections: [
      {
        title: "Soups",
        items: [
          i("Hot n Sour Soup", "169", "Spicy and tangy broth with fresh vegetables and bold Asian flavours"),
          i("Veg Manchow Soup", "169", "Spicy aromatic soy flavoured Indo-Chinese soup with crisp fried noodles"),
          i("Veg Clear Soup", "169", "Healthy veggies soup with enhanced flavours of spices"),
          i("Sweet Corn Soup", "169", "Light and hearty soup made with sweet corn and delicate seasoning"),
          i("Tomato Soup", "159", "Tangy spiced tomato broth infused with Indian herbs"),
          i("Cream of Mushroom Soup", "169", "Rich and smooth mushroom broth, subtle seasoning"),
          i("Classic Minestrone Soup", "169", "Hearty Italian soup brimming with seasonal vegetables and beans"),
          i("Lemon Coriander Soup", "169", "Light tangy broth with lemon, coriander and vegetables"),
        ],
      },
      {
        title: "Classic Indian Noshes",
        items: [
          i("Peanut Masala", "140", "Tasty peanut snack made with blend of mixed spices"),
          i("Corn Chaat", "150", "Sweet corn tossed with tangy spices and fresh herbs for a zesty snack"),
          i("Chinese Bhel", "200", "Crunchy fusion of fried noodles, fresh veggies and tangy Indo-Chinese sauces tossed together for street style treat"),
          i("French Fries", "140", "Classic deep fried potato strips"),
        ],
      },
    ],
  },
  {
    tab: "Noshes",
    sections: [
      {
        title: "Classic Indian Noshes",
        items: [
          i("French Fries Peri Peri", "160", "Classic deep fried potato strips with mixed masala"),
          i("Kanda Bhaji", "150", "Onion fritters with ajwain and besan"),
          i("Vegetable Pakoda Platter", "195", "Assorted seasonal vegetable fritters served with mint chutney"),
          i("Paneer Pakoda Platter", "210", "Crisp golden fritters of spiced cottage cheese served with hot and tangy chutneys"),
          i("Papad", "30 / 35 / 50", "Roasted / Fry / Masala"),
        ],
      },
      {
        title: "Verandah Smoke House",
        items: [
          i("Royal Kebab Platter", "499", "Assortment of various tikkas and seekh kebab to fulfilment"),
          i("Hara Bhara Kebab", "250", "Spinach, green peas and veggie patties blended with Indian spice, shallow fried"),
          i("Dahi Ke Kebab", "250", "Hung curd and cottage cheese based kebabs, crisp outside and creamy inside"),
          i("Veg Seekh Kebab", "249", "Minced vegetables blended with aromatic spices skewered and grilled to perfection"),
          i("Malai Broccoli Tikka", "350", "Broccoli florets marinated in malai and masala for fusion"),
          i("Paneer Seekh Kebab", "290", "Minced paneer blended with aromatic spices skewered and grilled to perfection"),
          i("Paneer Lucknowavi Tikka", "350", "Delicately spiced paneer infused with royal Awadhi flavours"),
        ],
      },
    ],
  },
  {
    tab: "Smoke House",
    sections: [
      {
        title: "Verandah Smoke House",
        items: [
          i("Paneer Achari Tikka", "290", "Tangy and bold cottage cheese cubes infused with pickling spices"),
          i("Malai Paneer Tikka", "310", "Creamy cubes of cottage cheese marinated in cream and embracing spices"),
          i("Paneer Tikka", "290", "Classic tandoor dish of cottage cheese mixed with fragrant spices"),
          i("Hariyali Pustaini Tikka", "350", "Dry fruit and cheese stuffed cottage cheese marinated in yoghurt"),
          i("Mint Paneer Tikka", "270"),
          i("Mushroom Tikka", "270", "An Awadhi delight which melts in mouth"),
          i("Aloo Tikka / Aloo Achari Tikka", "200", "Spicy potato appetizer marinated with spice"),
          i("Lehsuni Chaap Tikka", "290", "Tender soya chaap marinated in ginger garlic paste grilled in tandoor"),
          i("Malai Chaap", "290", "Rich and flavorful creaming with soya chaap"),
          i("Tandoori Chaap", "290", "A classic tandoor dish of chaap mixed with fragrant spices"),
          i("Ajwain Paneer Tikka", "270"),
        ],
      },
    ],
  },
  {
    tab: "Oriental",
    sections: [
      {
        title: "Verandah Goes Oriental",
        items: [
          i("Honey Chilli Potato", "220", "Golden fried potato fingers in tangy sauces"),
          i("Crispy Chilli Baby Corn", "349", "Baby corn fritters in spicy garlic sauce"),
          i("Veg Crispy", "240", "Vegetable fritters in Indo-Chinese blend sauce"),
          i("Crispy Corn", "200", "A crispy fried sweet corn kernels seasoned with salt and spices"),
          i("Chana Chilli", "200", "Crispy chickpeas tossed in a spicy Indo-Chinese sauce"),
          i("Paneer 65", "299", "Spicy stir fried cottage cheese cubes tossed in south Indian style chilli garlic tempering"),
          i("Garlic Paneer", "299", "Juicy cottage cheese cubes tossed in bold garlic sauce with Indo-Chinese spices and herbs"),
          i("Chilli Paneer Dry / Gravy", "260 / 280", "Soft cottage cheese in spicy soya garlic sauce"),
          i("Crispy Chilli Lotus Stem", "299", "Seasonal"),
          i("Garlic Mushroom", "299", "Succulent chunks of mushroom stir fried in hot garlic sauce"),
          i("Veg Manchurian Dry / Gravy", "240 / 260", "Fried veggie balls in savory sauce"),
          i("Veg Choupsey", "260", "Crispy fried noodles topped with a tangy gravy for a crunchy and saucy Indo-Chinese delight"),
        ],
      },
    ],
  },
  {
    tab: "Rolls & Noodles",
    sections: [
      {
        title: "Rolls",
        items: [
          i("Veg Spring Roll", "220", "Crisp golden rolls stuffed with saute mixed vegetables served with schezwan dip"),
          i("Cheese Corn Roll", "270", "Melty cheese and masala corn wrapped together"),
          i("Cocktail Roll", "300", "Savory roll of flavorful carrot capsicum onion mixed with noodles"),
          i("Dragon Roll", "280", "Fiery fusion roll packed with crispy vegetable"),
        ],
      },
      {
        title: "Noodles / Rice",
        items: [
          i("Hakka Noodles", "220", "Classic Indo-Chinese stir fried noodles"),
          i("Schezwan Noodles / Rice", "240", "Noodles tossed in spicy veg schezwan sauce"),
          i("Chilli Garlic Noodles / Rice", "220", "Flavoured with aromatic chilli and garlic"),
          i("Veg Fried Rice", "240", "Wok tossed rice with fresh vegetables and soy"),
          i("All Mix", "260", "Combo of noodles, rice and manchurian tossed together in bold Indo-Chinese sauces"),
          i("Singaporean Noodles", "260", "Stir fried noodles tossed with vegetable in a spicy and tangy curry flavoured sauce"),
          i("Pan Fried Noodles", "300", "Golden noodles and stir fried rice topped with a savory of vegetables in rich Indo-Chinese sauce"),
        ],
      },
    ],
  },
  {
    tab: "Gravies",
    sections: [
      {
        title: "Indian Main Course · Signature Gravies",
        items: [
          i("Royal Paneer Lababdar", "320", "Cottage cheese simmered in luscious onion-tomato masala with a touch of cream and crushed fenugreek"),
          i("Smokey Paneer Tikka Masala", "320", "Char-grilled cottage cheese tikka cubes in traditional wild spicy gravy"),
          i("Punjabi Paneer Masala", "320", "A fiery and classic dish with true celebration of bold spices"),
          i("Paneer Butter Masala", "310", "Cottage cheese cubes cooked in sweet and tangy flavor"),
          i("Paneer Handi", "310", "Cottage cheese cubes cooked in spicy flavor"),
          i("Paneer Adraki", "300", "Soft cottage cheese cubes simmered in zesty gravy infused with bold ginger flavor"),
          i("Paneer Do Pyaza", "320", "Cottage cheese cooked with a double dose of onion in a rich, mildly spiced gravy"),
          i("Kadhai Paneer", "310", "Bold and rustic assorted veggies in fiery red gravy"),
          i("Lehsuni Palak Paneer", "300", "Aromatic spinach puree with slow roasted garlic and seared cottage cheese cubes"),
          i("Sahi Paneer Korma", "320", "Mughlai style curry made with milky cottage cheese, yogurt, fried onions and medley of sweet smelling Indian spices"),
          i("Malai Kofta", "310", "Golden paneer and dryfruit dumpling in a rich cashew cream curry"),
          i("Veg Kofta", "290", "Style dish of mixed vegetable koftas in a lovely spiced gravy"),
        ],
      },
    ],
  },
  {
    tab: "More Gravies",
    sections: [
      {
        title: "Signature Gravies",
        items: [
          i("Nargisi Kofta", "280", "Creamy dish of mixed vegetable koftas in a lovely spiced gravy"),
          i("Kaju Masala", "320", "Spicy kaju curry to fulfill the spice notes"),
          i("Kaju Curry", "340", "Mughlai style cashew and cardamom korma"),
          i("Navratna Korma", "340", "Colorful veggies in gently sweet and fragrant white gravy"),
          i("Corn Palak", "310", "Fresh spinach and sweet corn cooked in rich, saucy gravy"),
          i("Tandoori Chaap Tikka Masala", "320", "Juicy tandoori soya chaap in a spicy brown onion tomato masala with a smoky finish"),
          i("Chaap Rogan Josh", "320", "Hearty Kashmir style red gravy with tender soya chunks and bold aromatic spices"),
          i("Awadhi Chaap", "320", "Delectable Awadhi dish featuring juicy pieces of chaap cooked in creamy royal gravy"),
          i("Sev Tamatar", "220", "Tangy and textural gravy with crispy Gujarati sev incorporating aromatic spices"),
          i("Mushroom Mutter Masala", "260", "Juicy mushroom and green peas simmered in rich, spiced onion tomato gravy"),
          i("Mushroom Masala", "240", "Tender mushroom cooked in bold Indian spices"),
          i("Methi Matar Malai", "300", "Fresh fenugreek and green peas in a creamy mildly sweet cashew based gravy with a hint of spice"),
          i("Patiala Papad Sabzi", "300", "Flavourful explosion with unique fusion of Punjabi curry with crispy papad roll"),
        ],
      },
    ],
  },
  {
    tab: "Dry Veg",
    sections: [
      {
        title: "Dry Veg Delights",
        items: [
          i("Bhindi Do Pyaza", "220", "Okra stir fried with caramelised onion and warming Indian spices"),
          i("Deewani Handi", "310", "Delectable north Indian dish featuring mushroom, baby corn and assorted veggies"),
          i("Vegetable Lagan", "250", "Aromatic combination of diced veggies cooked together with spices"),
          i("Jeera / Dhaniya / Methi Aloo", "200", "Potatoes made with your choice seasoning"),
          i("Dum Aloo Banarsi", "250", "Traditional Banarsi cuisine with fried potatoes in mildly spicy gravy"),
          i("Gobhi Aloo Adraki", "240", "Fresh potatoes and cauliflower tossed in flavorful garlic"),
          i("Chana Masala", "240", "Comfort food bliss with chickpeas simmered in aromatic gravy"),
          i("Stuffed Tomato & Capsicum", "280"),
        ],
      },
    ],
  },
  {
    tab: "Breads & Rice",
    sections: [
      {
        title: "Indian Breads",
        items: [
          i("Tandoori Roti", "30 / 35 / 45", "Plain / Butter / Garlic"),
          i("Naan", "65 / 75 / 95", "Plain / Butter / Garlic"),
          i("Chilli Cheese Garlic Naan", "115"),
          i("Laccha Paratha / Mint Paratha", "55 / 65"),
          i("Laccha Butter Naan", "80"),
          i("Missi Roti", "45"),
          i("Masala Roti", "70", "Onion Masala / Garlic Masala / Namak Mirch"),
          i("Stuffed Kulcha", "104", "Aloo, paneer, pyaz"),
          i("Stuffed Paratha", "104", "Aloo, paneer, pyaz"),
          i("Bread Basket", "464"),
        ],
      },
      {
        title: "Rice & Biryani",
        items: [
          i("Plain / Jeera Rice", "150 / 170", "Fragrant rice tempered with cumin and ghee"),
          i("Onion Tomato Jeera Rice", "180", "Fragrant basmati rice saute with cumin, caramelized onion and tangy tomatoes"),
          i("Masala Rice", "200", "Mix of onion, tomato, butter and cumin seeds"),
          i("Peas Pulao", "200", "Mix of green peas and cumin seeds in butter"),
          i("Veg Pulao", "220", "Aromatic basmati rice cooked with seasonal vegetables and whole spice"),
          i("Kashmiri Pulao", "250", "Mildly sweet rice with dry fruits, nuts and pineapple royal feast"),
        ],
      },
    ],
  },
  {
    tab: "Biryani & Dal",
    sections: [
      {
        title: "Rice & Biryani",
        items: [
          i("Hyderabadi Dum Biryani", "300", "Fragrant spicy biryani with caramelized onion and herbs"),
          i("Paneer Tikka Biryani", "330", "Spiced cottage cheese tikka chunks layered with mint masala and flavoured rice"),
        ],
      },
      {
        title: "Signature Dal Creations",
        items: [
          i("Smoked Dal Tadka", "180", "Yellow dal tempered with garlic and chillies smoked for depth and drama"),
          i("Jeera Dal", "160", "Comforting combination of yellow lentils with the aromatic flavors of cumin"),
          i("Dal Fry", "180", "Cooked with a rich masala made with onion, ginger-garlic, tomatoes and a seasoning of curry leaves, cumin seeds"),
          i("Dal Fry (Jain)", "170", "Flavourful yellow lentil curry cooked without onion garlic, tempered with cumin and green chilies"),
          i("Dal Makhni", "170", "Whole black lentil and kidney beans simmered overnight and cooked in cream style gravies"),
        ],
      },
      {
        title: "Khichdi",
        items: [
          i("Punjabi Masala Khichdi", "230", "Spiced up version with onion, tomatoes, ginger and whole spices"),
          i("Mixed Vegetable Khichdi", "230", "Loaded with seasonal veggies and rice, one pot meal"),
          i("Burnt Garlic Khichdi", "200", "Earthy and comforting topped with smoky garlic tadka"),
        ],
      },
    ],
  },
  {
    tab: "Salads & Dahi",
    sections: [
      {
        title: "Farm Fresh Salads",
        items: [
          i("Green Salad", "100", "Assortment of garden fresh vegetables"),
          i("Kachumber Salad", "110", "Refreshing mix of chopped veggies tossed with lemon juice and powdered herbs"),
          i("Chana Chaat Salad", "150", "Boiled chickpeas mixed with chopped veggies, powdered herbs and tangy lemon dressing"),
          i("Grilled Paneer Salad", "240", "Smoky grilled cottage cheese cubes served over crisp vegetables with a minty dressing"),
          i("Corn Capsicum Salad", "150", "Sweet corn, colorful bellpeppers tossed in cumin-lime vinaigrette"),
          i("Classic Caesar Salad", "240", "Fresh and crunchy salad packed with lettuce, croutons and savory dressing"),
          i("Onion Salad", "90"),
          i("Cucumber Salad", "80"),
        ],
      },
      {
        title: "Dahi Licious",
        items: [
          i("Boondi Raita", "100"),
          i("Vegetable Raita", "110"),
          i("Pineapple Raita", "120"),
          i("Fruit Raita", "120"),
          i("Cucumber Raita", "120"),
          i("Masala / Plain Chaach", "70 / 60"),
          i("Sweet Lassi", "100"),
          i("Rose Lassi", "100"),
          i("Plain Curd", "60"),
        ],
      },
    ],
  },
  {
    tab: "Continental",
    sections: [
      {
        title: "Continental",
        items: [
          i("Veg Coleslaw Sandwich", "165", "Refreshing and light sandwich with a filling of shredded vegetables mixed with mayonnaise"),
          i("Bombay Veg Sandwich", "150", "Layers of spiced potato, cucumber and tomato with chutney and butter grilled bread"),
          i("Grilled Masala Vegetable Sandwich", "200", "Spicy veggie mix, cheese and green chutney toasted to golden perfection"),
          i("Grilled Paneer Sandwich", "220", "Classic medley of cottage cheese and cheese tossed on a bread grilled with perfection"),
          i("Club Sandwich", "180", "Multilayer sandwich with lettuce, tomato, cucumber, cheese and mayonnaise"),
          i("Bruschetta", "280", "Toasted bread topped with fresh tomato, garlic and olives"),
          i("Cheesy Garlic Bread", "170", "Crisp toasted bread brushed with mixture of garlic butter and herbs topped with cheese"),
          i("Chilli Cheese Toast", "190", "Crisp toasted bread with melted cheese, chillies and a hint of spice for a bold and cheesy bite"),
          i("Jalapeno Cheese Poppers", "240", "Crispy golden bites filled with spicy jalapenos and molten cheese, perfect for a fiery snack fix"),
          i("Potato Cheese Shots", "219", "Rolled potato and cheese served with tomato ketchup"),
        ],
      },
    ],
  },
  {
    tab: "Pasta & Pizza",
    sections: [
      {
        title: "Pasta and Pizza",
        items: [
          i("Penne Alfredo", "289", "Creamy cheesy sauce with herbs and exotic vegetables"),
          i("Aglio Olio", "279", "Simple yet flavorful Italian pasta tossed in olive oil, garlic, red chilli flakes and fresh herbs"),
          i("Pink Penne Pasta", "289", "Classic penne pasta cooked in delightful symphony of creamy tomato and rich cheese served with garlic bread"),
          i("Mac N Cheese", "289", "Classic baked macaroni in rich cheesy sauce"),
          i("Margherita Pizza", "280", "Classic, simple and timeless with fresh tomato sauce, mozzarella and basil"),
          i("Veggie Supreme Pizza", "349", "Freshly made dough loaded with onion, capsicum, tomatoes and sweet corn"),
          i("Paneer Tikka Pizza", "349", "Classic pizza with Indian flavour of spicy paneer tikka"),
          i("Chilli Cheese Mushroom Pizza", "299", "Indian style green chilli, onion and cheese with a kick"),
          i("Corn Cheese Pizza", "299", "Classic simple with fresh dough with sweet corn and cheese"),
        ],
      },
      {
        title: "Sizzlers",
        items: [
          i("Paneer Steak Sizzler", "450", "Pan fried cottage cheese steak served on a hot plate with sizzling sauce"),
          i("Mixed Veg Grilled Sizzler", "399", "Pan fried seasonal veggies served on sauce with herb rice and sizzling sauce"),
          i("Manchurian Sizzler", "350", "Flavorful manchurian balls served on a hot plate with sizzling sauce"),
          i("Chilli Paneer Sizzler", "429", "Crispy chilli paneer with fried rice and spicy garlic sauce"),
        ],
      },
    ],
  },
  {
    tab: "Dessert & Drinks",
    sections: [
      {
        title: "Dessert",
        items: [
          i("Gulab Jamun", "110 / 60", "With / without ice cream"),
          i("Ebony and Ivory", "200"),
          i("Ice Cream", "90", "Vanilla / Chocolate / Butterscotch"),
          i("Halwa (Seasonal)", "150", "Gajar / moong dal"),
        ],
      },
      {
        title: "Beverages",
        items: [
          i("Masala Tea", "50"),
          i("Ginger Tea", "40"),
          i("Lemon Tea", "35"),
          i("Nescafe (Hot)", "45"),
          i("Shikanji", "60"),
          i("Plain / Masala Butter Milk", "60 / 70"),
          i("Sweet Lassi", "100"),
          i("Rose Lassi", "100"),
          i("Aerated Drinks", "50"),
          i("Aerated Drinks Can", "80"),
          i("Packaged Water", "@ MRP"),
        ],
      },
    ],
  },
];

const LAST_INDEX = MENU.length - 1;

/* =========================================================
   HELPERS
========================================================= */

/** Scroll position that centres `el` inside `container` (container must be `relative`). */
function centerOffset(container: HTMLElement, el: HTMLElement) {
  return el.offsetLeft - (container.clientWidth - el.clientWidth) / 2;
}

/* =========================================================
   PAGE
========================================================= */

export default function Menu() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tabStripRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const frame = useRef(0);

  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    track.scrollTo({ left: centerOffset(track, card), behavior: "smooth" });
  }, []);

  /* The focused card is the one closest to the centre of the track */
  const handleScroll = useCallback(() => {
    if (frame.current) return;

    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const track = trackRef.current;
      if (!track) return;

      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
        if (distance < closestDistance) {
          closest = index;
          closestDistance = distance;
        }
      });

      setActive(closest);
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  /* Keep the active tab visible in the tab strip */
  useEffect(() => {
    const strip = tabStripRef.current;
    const tab = tabRefs.current[active];
    if (!strip || !tab) return;
    strip.scrollTo({ left: centerOffset(strip, tab), behavior: "smooth" });
  }, [active]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fff9ef] text-[#1d1b16]">
      <Hero />

      <section className="bg-[#f9f3ea] py-16 md:py-24">
        {/* Tabs */}
        <LayoutGroup>
          <div
            ref={tabStripRef}
            role="tablist"
            aria-label="Menu sections"
            className="relative mx-auto mb-10 flex max-w-[1280px] gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mb-14 md:px-16 [&::-webkit-scrollbar]:hidden"
          >
            {MENU.map((page, index) => {
              const isActive = index === active;

              return (
                <button
                  key={page.tab}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => goTo(index)}
                  className={`relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#904c2e] ${
                    isActive
                      ? "border-transparent text-white"
                      : "border-[#d8c1c3] text-[#534344] hover:border-[#3f0917] hover:text-[#3f0917]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="menu-tab"
                      transition={{ duration: 0.4, ease: smoothEase }}
                      className="absolute inset-0 rounded-full bg-[#5a1f2b]"
                    />
                  )}
                  <span className="relative z-10 whitespace-nowrap">{page.tab}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Slider */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div
            ref={trackRef}
            onScroll={handleScroll}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                goTo(Math.min(active + 1, LAST_INDEX));
              }
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                goTo(Math.max(active - 1, 0));
              }
            }}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Menu pages"
            className="relative flex snap-x snap-mandatory items-start gap-5 overflow-x-auto px-[calc(50%_-_min(42vw,220px))] pb-8 [scrollbar-width:none] focus-visible:outline-none md:gap-8 [&::-webkit-scrollbar]:hidden"
          >
            {MENU.map((page, index) => (
              <MenuCard
                key={page.tab}
                page={page}
                isActive={index === active}
                label={`Page ${index + 1} of ${MENU.length}`}
                cardRef={(el) => {
                  cardRefs.current[index] = el;
                }}
                onSelect={() => goTo(index)}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="mt-2 flex items-center justify-center gap-6">
            <ArrowButton
              label="Previous page"
              disabled={active === 0}
              onClick={() => goTo(active - 1)}
            >
              <ChevronLeft size={22} />
            </ArrowButton>

            <p className="min-w-[72px] text-center text-sm tabular-nums text-[#534344]" aria-live="polite">
              {active + 1} / {MENU.length}
            </p>

            <ArrowButton
              label="Next page"
              disabled={active === LAST_INDEX}
              onClick={() => goTo(active + 1)}
            >
              <ChevronRight size={22} />
            </ArrowButton>
          </div>

          <p className="mt-5 text-center text-sm text-[#534344]">
            Swipe, use the arrows or pick a section above.
          </p>
        </motion.div>
      </section>

      <ContactBanner />
    </main>
  );
}

/* =========================================================
   SECTIONS
========================================================= */

function Hero() {
  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden pt-[88px] md:min-h-[500px]">
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: smoothEase }}
          src={HERO_IMAGE}
          alt="A plated dish from the Verandah kitchen"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-[1280px] px-5 text-center text-white md:px-16"
      >
        <motion.p
          variants={heroItem}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
        >
          The menu
        </motion.p>

        <motion.h1
          variants={heroItem}
          className="font-serif text-[40px] font-bold leading-[1.15] tracking-tight md:text-[64px]"
        >
          From Our Kitchen
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/90 md:text-lg"
        >
          Smoky kebabs, slow gravies, sizzlers and sweets. Slide through the
          pages to see everything we serve.
        </motion.p>
      </motion.div>
    </section>
  );
}

function ContactBanner() {
  return (
    <section className="bg-[#5a1f2b] px-5 py-20 text-white md:px-16 md:py-[100px]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <h2 className="font-serif text-[36px] font-bold leading-[1.15] md:text-[48px]">
          Questions about the menu?
          <br />
          We're happy to help.
        </h2>

        <Link
          href="/contact"
          className="group flex items-center gap-3 border border-white px-8 py-4 text-sm font-medium tracking-[0.05em] text-white transition-colors duration-300 hover:bg-white hover:text-[#3f0917] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          CONTACT US
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function MenuCard({
  page,
  isActive,
  label,
  cardRef,
  onSelect,
}: {
  page: MenuPage;
  isActive: boolean;
  label: string;
  cardRef: (el: HTMLElement | null) => void;
  onSelect: () => void;
}) {
  return (
    <article
      ref={cardRef}
      aria-label={label}
      onClick={isActive ? undefined : onSelect}
      className={`w-[84vw] max-w-[440px] shrink-0 snap-center rounded-t-[999px] border border-[#eadfd2] bg-white px-6 pb-12 pt-14 transition-[transform,opacity,box-shadow] duration-500 ease-out motion-reduce:transition-none md:px-10 ${
        isActive
          ? "scale-100 opacity-100 shadow-[0_30px_70px_-35px_rgba(63,9,23,0.45)]"
          : "scale-[0.92] cursor-pointer opacity-45 hover:opacity-70"
      }`}
    >
      <ArchMark />

      <div className="mt-6 flex flex-col gap-12">
        {page.sections.map((section) => (
          <MenuSection key={section.title} section={section} />
        ))}
      </div>
    </article>
  );
}

function MenuSection({ section }: { section: Section }) {
  return (
    <section>
      <h2 className="text-center font-serif text-2xl font-bold uppercase leading-tight tracking-wide text-[#5a1f2b]">
        {section.title}
      </h2>

      <div className="mx-auto mb-7 mt-3 flex items-center justify-center gap-3" aria-hidden>
        <span className="h-px w-10 bg-[#d8c1c3]" />
        <span className="h-1.5 w-1.5 rotate-45 bg-[#904c2e]" />
        <span className="h-px w-10 bg-[#d8c1c3]" />
      </div>

      <ul className="flex flex-col gap-5">
        {section.items.map((item) => (
          <li key={item.name}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-base font-medium text-[#1d1b16]">{item.name}</span>
              <span className="shrink-0 text-sm tabular-nums text-[#3f0917]">{item.price}</span>
            </div>
            {item.note && (
              <p className="mt-1 max-w-[92%] text-[13px] leading-5 text-[#534344]">
                {item.note}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Small arched-window mark that echoes the printed menu. */
function ArchMark() {
  return (
    <svg
      viewBox="0 0 40 48"
      className="mx-auto h-12 w-10 text-[#904c2e]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 44V22C6 12 12 5 20 5s14 7 14 17v22z" />
      <path d="M13 44V24c0-6 3-11 7-11s7 5 7 11v20" />
    </svg>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8c1c3] text-[#3f0917] transition-colors duration-300 hover:bg-[#5a1f2b] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#904c2e] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#3f0917]"
    >
      {children}
    </button>
  );
}
import { useEffect, useMemo, useState } from 'react';

const MAPS_SEARCH_URL = 'https://www.google.com/maps/search/?api=1&query=Food+Factory+Silverlakes+Pretoria+East';
const GOOGLE_MENU_URL = 'https://www.google.com/search?q=Food+Factory+Silverlakes+menu+Pretoria+East';

const photoCards = [
  {
    src: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Restaurant interior with warm lighting',
  },
  {
    src: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Fine dining table setup',
  },
  {
    src: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Freshly prepared gourmet meal',
  },
  {
    src: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Colorful cocktail drinks',
  },
  {
    src: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Modern restaurant lounge',
  },
  {
    src: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Pizza and dining spread',
  },
];

const highlights = [
  'All-you-can-eat options',
  'Outdoor seating',
  'Great cocktails',
  'Fast service in a vibrant atmosphere',
];

const menuSections = [
  {
    title: 'Breakfast (from 08:00 all day)',
    items: [
      { name: 'Downtime', note: 'Brioche bun, layered with eggs, fruit and hash brown', price: 'R69.00' },
      { name: 'Productive', note: 'Eggs, hash brown, 100g rump, onion, mushroom and chips', price: 'R108.00' },
      { name: 'Foundry Breakfast', note: '2 eggs, wors, mushroom, beef strips, 2 slices toast, coffee', price: 'R90.00' },
      { name: 'Add Hash Brown', price: 'R20.00' },
      { name: 'Quality Control Eggs Bennie', note: 'Poached eggs, spinach and hollandaise', price: 'R78.00' },
      { name: 'Shift in Gear', note: 'Eggs, bacon and fries', price: 'R65.00' },
      { name: 'Spanish Omelette', note: 'Mushrooms, onion, green pepper and tomato', price: 'R75.00' },
      { name: 'Spanish Meaty Omelette', note: 'Bacon, sausage or pork sausage, with onion and cheese', price: 'R95.00' },
      { name: 'Mince and Onion with Cheddar or Mozzarella', price: 'R80.00' },
    ],
  },
  {
    title: 'Factory Patties',
    items: [
      { name: 'Classic Burger', note: 'Lettuce, tomato and onion', price: 'R85.00' },
      { name: 'Cheese Burger', price: 'R95.00' },
      { name: 'Mushroom Burger', price: 'R95.00' },
      { name: 'Piggy Burger', note: 'Bacon option available', price: 'R110.00' },
      { name: 'Factory Burger', note: 'With mozzarella cheese and bacon', price: 'R120.00' },
      { name: 'Factory Sauces', note: 'Mushroom, pepper, cheese', price: 'R26.00 each' },
    ],
  },
  {
    title: 'Curries @ the Factory',
    items: [
      { name: 'Seafood Curry', note: 'Prawns, calamari, mussels in Indian spices', price: 'R198.00' },
      { name: 'Butter Chicken Curry', note: 'Grilled chicken fillet in creamy butter sauce', price: 'R135.00' },
      { name: 'Beef Curry', note: 'Slow-cooked with own Factory curry', price: 'R155.00' },
      { name: 'Lamb Curry', note: 'Tender lamb pieces in authentic masala', price: 'R175.00' },
    ],
  },
  {
    title: 'We Mean Business Grill',
    items: [
      { name: 'Flame Grilled Rump 200g', price: 'R120.00' },
      { name: 'Flame Grilled Rump 300g', price: 'R175.00' },
      { name: 'Rump Espetada 300g', price: 'R195.00' },
      { name: 'Ladies Fillet 200g', note: 'Most tender cut', price: 'R182.00' },
      { name: 'Succulent Spare Ribs 300g', price: 'R160.00' },
      { name: 'Succulent Spare Ribs 600g', price: 'R224.00' },
      { name: 'Well Matured T-Bone', note: 'With garlic and black pepper', price: 'R190.00' },
      { name: 'Lamb Chops', note: '3 x prime grilled chops with glazed peppers', price: 'R185.00' },
      { name: 'Factory Carnivore Platter for 2', note: 'Succulent ribs, rump, boerewors', price: 'R386.00' },
    ],
  },
  {
    title: 'Downtime Through the Mill',
    items: [
      { name: 'Portuguese Steak', note: '300g rump with chips', price: 'R188.00' },
      { name: 'Beef Trippa', note: 'Served with pap and pepper sauce', price: 'R120.00' },
      { name: 'Chicken Trippa', note: 'Served with chips and sauce', price: 'R90.00' },
      { name: '2 x Pork Loin Chops', note: 'With crackling and fries', price: 'R144.00' },
      { name: '2 x Crumbed Pork Chops', note: 'Served with fries and apple sauce', price: 'R144.00' },
      { name: '+99g Fillet', note: 'With sauerkraut, mash and gravy', price: 'R158.00' },
      { name: 'Pap and 2x Wors / Chakalaka / Sheba', price: 'R92.00' },
    ],
  },
  {
    title: 'Quality Control Little Ones',
    items: [
      { name: 'Meaty Treats', note: 'Spare ribs with chips', price: 'R70.00' },
      { name: 'Beef Burger with cheese and chips', price: 'R68.00' },
      { name: 'Chicken Burger with cheese and chips', price: 'R60.00' },
      { name: 'Crumbed Chicken strips with chips', price: 'R65.00' },
      { name: 'Pink Panther Sauced chicken strips with chips', price: 'R68.00' },
      { name: 'Somathing Fishy', note: 'Baby hake with chips', price: 'R68.00' },
      { name: 'Pasta', note: 'Fresh calamari with chips or rice', price: 'R65.00' },
    ],
  },
  {
    title: 'Desserts',
    items: [
      { name: 'Dark Chocolate Brownie', price: 'R55.00' },
      { name: 'Malva Pudding', price: 'R55.00' },
      { name: 'Chocolate Sundae', price: 'R55.00' },
      { name: 'Slice of Cake of the Day', price: 'R55.00' },
      { name: 'Peppermint Crisp Tart', price: 'R50.00' },
    ],
  },
];

const specials = [
  {
    title: '5 Days of Crazy Specials',
    text: 'Jack Black Draught and Strongbow draw giveaway, with seafood and pork rib specials.',
  },
  {
    title: 'Braai Wednesdays, Saturdays and Sundays',
    text: 'Boerewors, pork chops, beef espetada and half Mozambican chicken specials.',
  },
];

const featuredMenuItems = [
  { section: 'Breakfast', name: 'Productive', price: 'R108.00' },
  { section: 'Factory Patties', name: 'Factory Burger', price: 'R120.00' },
  { section: 'Curries @ the Factory', name: 'Seafood Curry', price: 'R198.00' },
  { section: 'We Mean Business Grill', name: 'Factory Carnivore Platter for 2', price: 'R386.00' },
  { section: 'Desserts', name: 'Peppermint Crisp Tart', price: 'R50.00' },
];

export default function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || '';
  const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID || '';
  const directImageUrlsRaw = import.meta.env.VITE_GOOGLE_IMAGE_URLS || '';
  const canSyncGooglePhotos = Boolean(apiKey && placeId);

  const directImageUrls = useMemo(
    () =>
      String(directImageUrlsRaw)
        .split(',')
        .map((u) => u.trim())
        .filter(Boolean),
    [directImageUrlsRaw]
  );

  const [livePhotos, setLivePhotos] = useState([]);
  const [liveMapsUri, setLiveMapsUri] = useState('');
  const [syncState, setSyncState] = useState('idle');
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [activeMenuSection, setActiveMenuSection] = useState('ALL');
  const [menuSearch, setMenuSearch] = useState('');

  useEffect(() => {
    if (!canSyncGooglePhotos) {
      return;
    }

    let cancelled = false;
    const fieldMask = 'photos,googleMapsUri';

    async function fetchGooglePlacePhotos() {
      setSyncState('loading');
      try {
        const response = await fetch(
          `https://places.googleapis.com/v1/places/${placeId}?languageCode=en`,
          {
            headers: {
              'X-Goog-Api-Key': apiKey,
              'X-Goog-FieldMask': fieldMask,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Google Places request failed (${response.status})`);
        }

        const data = await response.json();
        if (cancelled) {
          return;
        }

        const photos = Array.isArray(data.photos) ? data.photos : [];
        const mapped = photos.slice(0, 8).map((photo, idx) => {
          const name = photo?.name || '';
          return {
            src: `https://places.googleapis.com/v1/${name}/media?maxWidthPx=1600&key=${apiKey}`,
            alt: `Food Factory Silverlakes official photo ${idx + 1}`,
          };
        });

        setLiveMapsUri(data.googleMapsUri || '');
        setLivePhotos(mapped.filter((item) => item.src.includes('/photos/')));
        setSyncState('ready');
      } catch {
        if (!cancelled) {
          setSyncState('error');
          setLivePhotos([]);
        }
      }
    }

    fetchGooglePlacePhotos();
    return () => {
      cancelled = true;
    };
  }, [apiKey, canSyncGooglePhotos, placeId]);

  const displayPhotos = useMemo(() => {
    if (directImageUrls.length > 0) {
      return directImageUrls.map((src, idx) => ({
        src,
        alt: `Food Factory Silverlakes listing photo ${idx + 1}`,
      }));
    }
    if (livePhotos.length > 0) {
      return livePhotos;
    }
    return photoCards;
  }, [directImageUrls, livePhotos]);

  const mapsLink = liveMapsUri || MAPS_SEARCH_URL;

  const menuSectionTitles = useMemo(() => menuSections.map((section) => section.title), []);

  const filteredMenuSections = useMemo(() => {
    const search = menuSearch.trim().toLowerCase();

    let sections = menuSections;
    if (activeMenuSection !== 'ALL') {
      sections = menuSections.filter((section) => section.title === activeMenuSection);
    }

    return sections
      .map((section) => {
        if (!search) {
          return section;
        }

        const items = section.items.filter((item) => {
          const haystack = `${item.name} ${item.note || ''} ${section.title}`.toLowerCase();
          return haystack.includes(search);
        });

        return {
          ...section,
          items,
        };
      })
      .filter((section) => section.items.length > 0);
  }, [activeMenuSection, menuSearch]);

  useEffect(() => {
    if (!menuModalOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuModalOpen(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuModalOpen]);

  useEffect(() => {
    if (!menuModalOpen) {
      return;
    }
    setActiveMenuSection('ALL');
    setMenuSearch('');
  }, [menuModalOpen]);

  return (
    <div className="site-shell">
      <div className="aurora aurora-a" aria-hidden="true" />
      <div className="aurora aurora-b" aria-hidden="true" />

      <header className="top-nav">
        <div>
          <p className="label">Pretoria East</p>
          <h1>Food Factory Silverlakes</h1>
        </div>
        <div className="nav-actions">
          <a className="btn btn-soft" href="tel:+27719358686">Call</a>
          <a className="btn btn-hot" href="#visit">Directions</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <article className="hero-copy panel pop-in">
            <p className="section-kicker">Restaurant Experience</p>
            <h2>5-Star Atmosphere for Food, Friends, and Unforgettable Nights</h2>
            <p>
              Food Factory Silverlakes brings bold flavor, polished presentation, and a lively social energy
              to Pretoria East. Built for celebrations, date nights, and premium casual dining.
            </p>

            <div className="chips">
              <span>Rating 4.4</span>
              <span>R200-300</span>
              <span>Open, closes 22:00</span>
            </div>

            <div className="cta-row">
              <a className="btn btn-hot" href="tel:+27719358686">Order Collection</a>
              <a
                className="btn btn-soft"
                target="_blank"
                rel="noreferrer"
                href={mapsLink}
              >
                Open on Maps
              </a>
            </div>
          </article>

          <aside className="hero-image panel slide-in">
            <img
              src="https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Premium restaurant bar and dining setup"
              loading="eager"
            />
          </aside>
        </section>

        <section className="panel google-sync">
          <div>
            <p className="section-kicker">Official Google Listing</p>
            <h3>Real Menu and Real Photos from Google</h3>
            <p>
              Menu highlights and listing photos are served through Google links below.
              This keeps everything aligned with the live business profile.
            </p>
          </div>

          <div className="action-links">
            <a className="btn btn-hot" target="_blank" rel="noreferrer" href={GOOGLE_MENU_URL}>
              Open Menu on Google
            </a>
            <a className="btn btn-soft" target="_blank" rel="noreferrer" href={mapsLink}>
              Open Photos on Google Maps
            </a>
          </div>

          {directImageUrls.length > 0 ? (
            <p className="sync-state">
              Direct link mode active. Gallery is using your provided image URLs.
            </p>
          ) : canSyncGooglePhotos ? (
            <p className="sync-state">
              {syncState === 'loading' && 'Syncing official Google photos...'}
              {syncState === 'ready' && 'Official Google photos are active in the gallery.'}
              {syncState === 'error' && 'Google photo sync failed. Using real licensed backups.'}
            </p>
          ) : (
            <p className="sync-state">
              Add VITE_GOOGLE_IMAGE_URLS (comma-separated links) or VITE_GOOGLE_API_KEY and VITE_GOOGLE_PLACE_ID.
            </p>
          )}
        </section>

        <section className="gallery-grid" aria-label="Restaurant photo gallery">
          {displayPhotos.map((card, idx) => (
            <figure className="gallery-card" key={card.src + idx}>
              <img src={card.src} alt={card.alt} loading="lazy" />
            </figure>
          ))}
        </section>

        <section className="menu-zone" id="menu">
          <div className="menu-head panel">
            <p className="section-kicker">Menu Board</p>
            <h3>Food Factory Silverlakes Menu Highlights</h3>
            <p>
              Top 5 picks are shown below. Tap see more to open the full menu popup.
            </p>
          </div>

          <div className="menu-preview panel">
            <ul>
              {featuredMenuItems.map((item) => (
                <li key={`${item.section}:${item.name}`}>
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="item-note">{item.section}</p>
                  </div>
                  <span className="item-price">{item.price}</span>
                </li>
              ))}
            </ul>
            <button className="see-more-link" type="button" onClick={() => setMenuModalOpen(true)}>
              see more
            </button>
          </div>

          <div className="specials-grid">
            {specials.map((card) => (
              <article className="special-card panel" key={card.title}>
                <h4>{card.title}</h4>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="info-layout" id="visit">
          <article className="panel card">
            <h3>Address</h3>
            <p>
              PTA East, Cnr N4 Highway and Solomon Mahlangu Dr,
              Pretoria East, Silver Lakes Golf Estate, 0054
            </p>
            <a
              target="_blank"
              rel="noreferrer"
              href={mapsLink}
            >
              Get GPS Directions
            </a>
          </article>

          <article className="panel card">
            <h3>Contact</h3>
            <p>Phone: 071 935 8686</p>
            <p>Service: Collection and delivery options available</p>
            <div className="mini-buttons">
              <a className="btn btn-soft" href="tel:+27719358686">Call Now</a>
              <a className="btn btn-soft" href="https://wa.me/27719358686" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </article>

          <article className="panel card card-highlight">
            <h3>Why Guests Return</h3>
            <ul>
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="map-wrap panel">
          <div className="map-head">
            <h3>Find Food Factory Silverlakes</h3>
            <p>Live Google Map location for instant navigation.</p>
          </div>
          <iframe
            title="Food Factory Silverlakes map"
            src="https://www.google.com/maps?q=Food+Factory+Silverlakes+Pretoria+East&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </main>

      {menuModalOpen ? (
        <div className="menu-modal-backdrop" role="presentation" onClick={() => setMenuModalOpen(false)}>
          <section
            className="menu-modal panel"
            role="dialog"
            aria-modal="true"
            aria-label="Full menu"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="menu-modal-head">
              <div>
                <p className="section-kicker">Full Menu</p>
                <h3>Food Factory Silverlakes</h3>
              </div>
              <button className="menu-close" type="button" onClick={() => setMenuModalOpen(false)}>
                Close
              </button>
            </div>

            <div className="menu-toolbar">
              <div className="menu-tabs" role="tablist" aria-label="Menu categories">
                <button
                  className={`menu-tab ${activeMenuSection === 'ALL' ? 'is-active' : ''}`}
                  type="button"
                  onClick={() => setActiveMenuSection('ALL')}
                >
                  All
                </button>
                {menuSectionTitles.map((title) => (
                  <button
                    key={title}
                    className={`menu-tab ${activeMenuSection === title ? 'is-active' : ''}`}
                    type="button"
                    onClick={() => setActiveMenuSection(title)}
                  >
                    {title}
                  </button>
                ))}
              </div>

              <label className="menu-search-wrap" htmlFor="menu-search">
                <span>Search menu</span>
                <input
                  id="menu-search"
                  type="text"
                  value={menuSearch}
                  onChange={(event) => setMenuSearch(event.target.value)}
                  placeholder="Type item name..."
                />
              </label>
            </div>

            <div className="menu-modal-grid">
              {filteredMenuSections.map((section) => (
                <article className="menu-card" key={section.title}>
                  <h4>{section.title}</h4>
                  <ul>
                    {section.items.map((item) => (
                      <li key={`${section.title}:${item.name}`}>
                        <div>
                          <p className="item-name">{item.name}</p>
                          {item.note ? <p className="item-note">{item.note}</p> : null}
                        </div>
                        <span className="item-price">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
              {filteredMenuSections.length === 0 ? (
                <article className="menu-card menu-empty">
                  <h4>No menu items found</h4>
                  <p className="item-note">Try another category or search term.</p>
                </article>
              ) : null}
            </div>
          </section>
        </div>
      ) : null}

      <footer>
        <p>Food Factory Silverlakes, Pretoria East</p>
        <p>Image sources: Pexels real photography and Google Maps embed</p>
      </footer>
    </div>
  );
}

import CoverPage from './components/CoverPage';
import EditorialSpread from './components/EditorialSpread';
import VideoFeature from './components/VideoFeature';
import MagazineGrid from './components/MagazineGrid';
import PhotoStory from './components/PhotoStory';
import SectionDivider from './components/SectionDivider';
import PersonalCarousel from './components/PersonalCarousel';
import BirthdayModal from './components/BirthdayModal';
import { rslImages, personalImages, videos } from './assets';

// Combine all images (RSL professional first for editorial sections)
const allImages = [...rslImages, ...personalImages];

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: '#EDE8E0' }}>
      <BirthdayModal />
      {/* ===== COVER ===== */}
      <CoverPage image={rslImages[0]} />

      {/* ===== EDITORIAL SPREAD 1 ===== */}
      <SectionDivider
        label="Issue 01 · A Love Letter"
        title="My World"
        subtitle="Every photograph, a page of the story I never want to end"
      />

      <EditorialSpread
        images={[rslImages[1], rslImages[2]]}
        quote="You are like a blooming rose in the garden of my heart. My world feels completely empty without you, and I will only became a poet just so you would come and listen."
        author="Your Husband, Always"
        reverse={false}
      />

      {/* ===== PHOTO STORY 1 ===== */}
      <PhotoStory
        image={rslImages[5]}
        caption="Every time I see your smile, I forget everything that is hard. That is the power you hold over me."
        issue="Vol. I · Portrait Series"
      />

      {/* ===== EDITORIAL SPREAD 2 ===== */}
      <EditorialSpread
        images={[rslImages[7], rslImages[8], rslImages[9]]}
        quote="There are five thousand kilometres between Dhaka and Bern — yet every morning I wake up and you are the very first thought that crosses my mind. Distance is just a number. You are the constant."
        author="From Dhaka, With All My Love"
        reverse={true}
      />

      {/* ===== VIDEO FEATURE 1 ===== */}


      {/* ===== PHOTO STORY 2 ===== */}
      <PhotoStory
        image={rslImages[16]}
        caption="On this, your first birthday as my wife — I want the whole world to know how extraordinary you are."
        issue="Vol. I · Feature"
        imagePosition="object-[center_35%]"
      />

      {/* ===== EDITORIAL SPREAD 3 ===== */}
      <SectionDivider
        label="Issue 01 · The Muse"
        title="Breathtaking"
        subtitle="There are no words beautiful enough to describe you, so I let these frames speak for me"
      />

      <EditorialSpread
        images={[rslImages[21], rslImages[22]]}
        quote="Every time I look at these photographs, I am reminded: I am the luckiest person alive. Not because of fate or chance — but because you chose me, and I will spend the rest of my life being worthy of that choice."
        author="Akib · September 2026"
        reverse={false}
      />



      {/* ===== PHOTO STORY 3 ===== */}
      {/* <PhotoStory
        image={rslImages[27]}
        caption="Not all art hangs in galleries — some walks beside you every day."
        issue="Vol. I · Gallery"
        imagePosition="object-[center_25%]"
      /> */}



      {/* ===== MOMENTS GRID (Infinite Scroll) ===== */}
      <MagazineGrid images={rslImages}
        imagePositions={{
          'RSL03349.jpg': 'object-[center_25%]',
          'RSL03152.jpg': 'object-[center_25%]',
          'RSL03369.jpg': 'object-[center_18%]',
          'RSL07002.jpg': 'object-[center_40%]',
          // 'RSL07012.jpg': 'object-[center_20%]',
          'RSL07018.jpg': 'object-[center_30%]',
          'RSL07449.jpg': 'object-[center_30%]',
          'RSL07499.png': 'object-[center_20%]',

          // Add any specific file you want adjusted here!
        }}
        imageHeights={{
          'RSL03349.jpg': '100vh',
          'RSL03369.jpg': '100vh',
          'RSL03531.jpg': '100vh',
          'RSL07002.jpg': '100vh',
          'RSL07018.jpg': '120vh',
          'RSL07449.jpg': '120vh',
          'RSL07499.png': '120vh',
        }}
      />
      {/* ===== PERSONAL CAROUSEL ===== */}
      {personalImages && personalImages.length > 0 && (
        <PersonalCarousel images={personalImages} />
      )}

      {/* ===== VIDEO FEATURE 2 ===== */}
      {videos[0] && (
        <VideoFeature
          video={videos[0]}
          title="Unscripted"
          subtitle="Candid. Real. Breathtaking."
        />
      )}

      {/* ===== FINAL SPREAD ===== */}
      <SectionDivider
        label="Fin"
        title="Always"
        subtitle="Made with love · For Sumiya"
      />

      {/* ===== COLOPHON / CLOSING ===== */}
      <div
        style={{
          background: '#0F0F0D',
          padding: '8rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {/* Ornament top */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ height: '1px', background: 'rgba(201,169,110,0.3)', width: '64px' }} />
            <span style={{ color: '#C9A96E', fontSize: '10px' }}>◆</span>
            <div style={{ height: '1px', background: 'rgba(201,169,110,0.3)', width: '64px' }} />
          </div>

          {/* Quote */}
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
              color: '#EDD5C5',
              lineHeight: 1.55,
              letterSpacing: '0.01em',
              marginBottom: '3rem',
            }}
          >
            &ldquo;You are my favorite chapter, my greatest adventure,
            the one face I want to see every single morning.&rdquo;
          </p>

          {/* Rule */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ height: '1px', background: 'rgba(201,169,110,0.25)', width: '48px' }} />
            <span style={{ color: '#C9A96E', fontSize: '10px' }}>◆</span>
            <div style={{ height: '1px', background: 'rgba(201,169,110,0.25)', width: '48px' }} />
          </div>

          {/* Folio */}
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '9px',
              letterSpacing: '0.4em',
              color: '#C9A96E',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Sumiya &nbsp;·&nbsp; Love Edition &nbsp;·&nbsp; Vol. I
          </p>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '8px',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.18)',
            }}
          >
            Made with ♥ just for you
          </p>
        </div>
      </div>
    </div>
  );
}

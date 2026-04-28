import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Hero from './features/Hero';
import Rooms from './features/Rooms';
import Services from './features/Services';
import Gallery from './features/Gallery';
import ScrollToTop from './components/ScrollToTop';
import BookingModal from './components/BookingModal';

const Footer = styled.footer`
  padding: 4rem 2rem;
  background: #1a2421;
  color: white;
  text-align: center;
`;

const FooterWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 3rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: left;
`;

const FooterSection = styled.div`
  h4 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
  p {
    opacity: 0.8;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 350px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const Copyright = styled.div`
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  font-size: 0.85rem;
  opacity: 0.6;
`;

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar onOpenBookingModal={() => setIsBookingModalOpen(true)} />
      <main>
        <Hero onOpenBookingModal={() => setIsBookingModalOpen(true)} />
        <Rooms />
        <Services />
        <Gallery />
        {/* Additional sections can be added here */}
      </main>
      <Footer id="contact">
        <FooterWrapper>
          <FooterContent>
            <FooterSection>
              <h4>Телефони</h4>
              <p>+38 (098) 006-60-88</p>
              <p>+38 (03849) 3-56-33</p>
              <p>+38 (03849) 3-32-31</p>
              <p>+38 (03849) 3-36-06</p>
              <p>+38 (03849) 3-25-75</p>
            </FooterSection>
            <FooterSection>
              <h4>Контакти</h4>
              <p>вул. Лесі Українки, 99</p>
              <p>м. Кам'янець-Подільський</p>
              <p>Хмельницька обл., Україна</p>
            </FooterSection>
            <FooterSection>
              <h4>Email</h4>
              <p>hotel@filvarki.com.ua</p>
            </FooterSection>
          </FooterContent>
          <MapContainer>
            <iframe
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=uk&amp;q=Фільварки%20Центр,%20Кам'янець-Подільський&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              title="Готель «Фільварки-Центр» на карті"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </MapContainer>
        </FooterWrapper>
        <Copyright>
          &copy; {new Date().getFullYear()} Готель «Фільварки-Центр». Всі права захищено.
        </Copyright>
      </Footer>
      <ScrollToTop />
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </ThemeProvider>
  );
}

export default App;

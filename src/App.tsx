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
import ContactModal from './components/ContactModal';

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.accent};
  color: white;
`;

const ContactSection = styled.div`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div`
  color: white;

  display: flex;
  flex-direction: column;
`;

const ContactHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 300;
  color: white;
  margin-bottom: 0.5rem;
  line-height: 1.2;
`;

const HeadingDivider = styled.div`
  width: 48px;
  height: 2px;
  background: ${({ theme }) => theme.colors.secondary};
  margin: 1.5rem 0 2.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  &:last-child {
    border-bottom: none;
  }
`;

const ContactIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
  font-size: 0.9rem;
`;

const ContactIconAddress = styled(ContactIcon)`
  background: transparent;
  border: 1.5px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondary};
`;

const ContactIconPhone = styled(ContactIcon)`
  background: transparent;
  border: 1.5px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondary};
`;


const ContactLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 0.5rem;
  opacity: 0.9;
`;

const ContactValue = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  color: inherit;
  margin-bottom: 0.2rem;
  font-weight: 400;
`;



const ContactLink = styled.a`
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 420px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);

  iframe {
    width: 100%;
    height: 100%;
    min-height: 420px;
    border: 0;
    display: block;
  }
`;

const Copyright = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);
`;

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleBook = () => setIsContactModalOpen(true);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar onOpenBookingModal={() => setIsBookingModalOpen(true)} onBook={handleBook} />
      <main>
        <Hero onOpenBookingModal={() => setIsBookingModalOpen(true)} onBook={handleBook} />
        <Rooms onOpenBookingModal={() => setIsBookingModalOpen(true)} onBook={handleBook} />
        <Services />
        <Gallery />
      </main>
      <Footer id="contact">
        <ContactSection>
          <ContactInfo>
            <ContactHeading>
              Контакти
            </ContactHeading>
            <HeadingDivider />

            <ContactItem>
              <ContactIconAddress>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </ContactIconAddress>
              <div>
                <ContactLabel>Адреса</ContactLabel>
                <ContactLink href="https://maps.app.goo.gl/iW3u1t6pF1Cmkr3JA" target="_blank" rel="noopener noreferrer">
                  <ContactValue>вул. Лесі Українки, 99</ContactValue>
                  <ContactValue>Кам'янець-Подільський, Хмельницька обл., Україна</ContactValue>
                </ContactLink>
              </div>
            </ContactItem>

            <ContactItem>
              <ContactIconPhone>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </ContactIconPhone>
              <div>
                <ContactLabel>Телефон</ContactLabel>
                <ContactLink href="tel:+380980066088">
                  <ContactValue>+38 (098) 006-60-88</ContactValue>
                </ContactLink>
              </div>
            </ContactItem>

            <ContactItem>
              <ContactIconPhone>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </ContactIconPhone>
              <div>
                <ContactLabel>Email</ContactLabel>
                <ContactLink href="mailto:hotel@filvarki.com.ua">
                  <ContactValue>hotel@filvarki.com.ua</ContactValue>
                </ContactLink>
              </div>
            </ContactItem>

          </ContactInfo>

          <MapContainer>
            <iframe
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=uk&amp;q=Фільварки%20Центр,%20Кам'янець-Подільський&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              title="Готель «Фільварки-Центр» на карті"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </MapContainer>
        </ContactSection>
        <Copyright>
          &copy; {new Date().getFullYear()} Готель «Фільварки-Центр». Всі права захищено.
        </Copyright>
      </Footer>
      <ScrollToTop />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </ThemeProvider>
  );
}

export default App;

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Nav = styled(motion.nav) <{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: ${({ $scrolled }) => ($scrolled ? '1rem 2rem' : '1.5rem 2rem')};
  background: ${({ $scrolled, theme }) => ($scrolled ? theme.colors.glass : 'transparent')};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(10px)' : 'none')};
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${({ $scrolled, theme }) => ($scrolled ? theme.shadows.soft : 'none')};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 1rem 1.5rem;
  }
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 1px;
  cursor: pointer;
  
  span {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-weight: 500;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.primary};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.secondary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const BookingBtn = styled(motion.button)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.7rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

const BOOKING_URL = "https://www.booking.com/searchresults.uk.html?dest_id=1094283&highlighted_hotels=1094283&dest_type=hotel&checkin=2026-07-20&checkout=2026-07-21&group_adults=2&req_adults=2&show_room=109428301_87372418_2_1_0&lang=uk&selected_currency=UAH&exrt=1.00000000&ext_price_total=1057.00&ext_price_tax=0.00&xfc=UAH&hca=m&group_children=0&req_children=0&&no_rooms=1&ts=1777248705&edgtid=1i2jddZPRt69tpdTLZEFDw&efpc=EFewChBXsAp5&utm_source=metagha&utm_medium=mapresults&utm_campaign=UA&utm_term=hotel-1094283&utm_content=dev-desktop_los-1_bw-83_dow-Monday_defdate-1_room-0_gstadt-2_rateid-public_aud-0_gacid-_mcid-10_ppa-0_clrid-0_ad-0_gstkid-0_checkin-20260720_ppt-&aid=2428387&label=metagha-link-MRUA-hotel-1094283_dev-desktop_los-1_bw-83_dow-Monday_defdate-1_room-0_gstadt-2_rateid-public_aud-0_gacid-_mcid-10_ppa-0_clrid-0_ad-0_gstkid-0_checkin-20260720_ppt-";

const MobileMenuBtn = styled.button`
  display: none;
  color: ${({ theme }) => theme.colors.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.white};
  z-index: 2000;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: -5px 0 15px rgba(0,0,0,0.1);
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 1500;
`;

interface NavbarProps {
  onOpenBookingModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenBookingModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: 'Головна', href: '#home' },
    { name: 'Номери', href: '#rooms' },
    { name: 'Послуги', href: '#services' },
    { name: 'Галерея', href: '#gallery' },
    { name: 'Контакти', href: '#contact' },
  ];

  return (
    <>
      <Nav $scrolled={scrolled}>
        <Logo>
          ФІЛЬВАРКИ<span>ЦЕНТР</span>
        </Logo>

        <NavLinks>
          {navItems.map((item) => (
            <NavLink key={item.name} href={item.href}>
              {item.name}
            </NavLink>
          ))}
        </NavLinks>

        <BookingBtn
          onClick={onOpenBookingModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Забронювати
        </BookingBtn>

        <MobileMenuBtn onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </MobileMenuBtn>
      </Nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <MobileMenu
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <button style={{ alignSelf: 'flex-end' }} onClick={() => setIsOpen(false)}>
                <X size={28} />
              </button>
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{ fontSize: '1.5rem' }}
                >
                  {item.name}
                </NavLink>
              ))}
              <BookingBtn
                onClick={() => {
                  setIsOpen(false);
                  onOpenBookingModal();
                }}
                style={{ display: 'block', marginTop: '1rem', width: '100%' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Забронювати
              </BookingBtn>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

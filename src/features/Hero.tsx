import styled from 'styled-components';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero-bg.png';

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${heroBg}) no-repeat center center/cover;
  color: ${({ theme }) => theme.colors.white};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.1;
  text-shadow: 0 4px 10px rgba(0,0,0,0.3);
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.25rem);
  margin-bottom: 2.5rem;
  opacity: 0.9;
  font-weight: 300;
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryBtn = styled(motion.button)`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  padding: 1rem 2.5rem;
  border-radius: 4px;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
`;

const SecondaryBtn = styled(motion.a)`
  border: 2px solid ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem 2.5rem;
  border-radius: 4px;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: transparent;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  text-align: center;
`;

const BOOKING_URL = "https://www.booking.com/searchresults.uk.html?dest_id=1094283&highlighted_hotels=1094283&dest_type=hotel&checkin=2026-07-20&checkout=2026-07-21&group_adults=2&req_adults=2&show_room=109428301_87372418_2_1_0&lang=uk&selected_currency=UAH&exrt=1.00000000&ext_price_total=1057.00&ext_price_tax=0.00&xfc=UAH&hca=m&group_children=0&req_children=0&&no_rooms=1&ts=1777248705&edgtid=1i2jddZPRt69tpdTLZEFDw&efpc=EFewChBXsAp5&utm_source=metagha&utm_medium=mapresults&utm_campaign=UA&utm_term=hotel-1094283&utm_content=dev-desktop_los-1_bw-83_dow-Monday_defdate-1_room-0_gstadt-2_rateid-public_aud-0_gacid-_mcid-10_ppa-0_clrid-0_ad-0_gstkid-0_checkin-20260720_ppt-&aid=2428387&label=metagha-link-MRUA-hotel-1094283_dev-desktop_los-1_bw-83_dow-Monday_defdate-1_room-0_gstadt-2_rateid-public_aud-0_gacid-_mcid-10_ppa-0_clrid-0_ad-0_gstkid-0_checkin-20260720_ppt-";

interface HeroProps {
  onOpenBookingModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenBookingModal }) => {
  return (
    <HeroSection id="home">
      <Content>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Відчуйте гостинність у самому серці міста
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Готель «Фільварки-Центр» — ваш ідеальний відпочинок у Кам'янці-Подільському з автентичною атмосферою та сучасним комфортом.
        </Subtitle>
        <CTAContainer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <PrimaryBtn
            onClick={onOpenBookingModal}
            whileHover={{ scale: 1.05, backgroundColor: '#d4af37' }}
            whileTap={{ scale: 0.95 }}
          >
            Бронювати зараз
          </PrimaryBtn>
          <SecondaryBtn
            href="#rooms"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            Наші номери
          </SecondaryBtn>
        </CTAContainer>
      </Content>
    </HeroSection>
  );
};

export default Hero;

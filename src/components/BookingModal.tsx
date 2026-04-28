import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 3000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ModalContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  padding: 2.5rem;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OptionButton = styled.a<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background: ${({ $primary }) => $primary ? '#003580' : '#00a3ff'};
  color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const BOOKING_URL = "https://www.booking.com/searchresults.uk.html?dest_id=1094283&highlighted_hotels=1094283&dest_type=hotel&checkin=2026-07-20&checkout=2026-07-21&group_adults=2&req_adults=2&show_room=109428301_87372418_2_1_0&lang=uk&selected_currency=UAH&exrt=1.00000000&ext_price_total=1057.00&ext_price_tax=0.00&xfc=UAH&hca=m&group_children=0&req_children=0&&no_rooms=1&ts=1777248705&edgtid=1i2jddZPRt69tpdTLZEFDw&efpc=EFewChBXsAp5&utm_source=metagha&utm_medium=mapresults&utm_campaign=UA&utm_term=hotel-1094283&utm_content=dev-desktop_los-1_bw-83_dow-Monday_defdate-1_room-0_gstadt-2_rateid-public_aud-0_gacid-_mcid-10_ppa-0_clrid-0_ad-0_gstkid-0_checkin-20260720_ppt-&aid=2428387&label=metagha-link-MRUA-hotel-1094283_dev-desktop_los-1_bw-83_dow-Monday_defdate-1_room-0_gstadt-2_rateid-public_aud-0_gacid-_mcid-10_ppa-0_clrid-0_ad-0_gstkid-0_checkin-20260720_ppt-";
const BLUEPILLOW_URL = "https://www.bluepillow.co.uk/search/59437e917c00cb0e643028b2?utm_campaign=hotel&begin=2026-07-20&end=2026-07-21&childrens=0&currency=UAH&language=uk&prid=domestic&block_id=-b,tD6p6qF9bT_y19LpPQeGFMoM9Tc_4hTlfxOiwlyKVB_U5TGK41Of0CNavKw3WveD,-bkng-Hotel&country=UA";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContainer
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>
              <X size={24} />
            </CloseButton>
            <Title>Оберіть сервіс бронювання</Title>
            <Text>Будь ласка, виберіть зручну для вас платформу, щоб забронювати номер.</Text>
            
            <OptionsContainer>
              <OptionButton 
                href={BOOKING_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                $primary
              >
                Booking.com
              </OptionButton>
              <OptionButton 
                href={BLUEPILLOW_URL} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Bluepillow
              </OptionButton>
            </OptionsContainer>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;

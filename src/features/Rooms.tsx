import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Underline = styled.div`
  width: 80px;
  height: 4px;
  background: ${({ theme }) => theme.colors.secondary};
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const RoomCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  border: 1px solid rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 0;
    background: ${({ theme }) => theme.colors.secondary};
    transition: height 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
    &::before {
      height: 100%;
    }
  }
`;

const RoomHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const RoomNumber = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 2px;
  display: block;
  margin-bottom: 0.5rem;
`;

const RoomTitle = styled.h3`
  font-size: 1.4rem;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const PriceItem = styled.div`
  display: flex;
  flex-direction: column;
  
  span:first-child {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: 0.2rem;
  }
  
  span:last-child {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const RoomDesc = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
`;

const BookBtn = styled(motion.button)`
  width: 100%;
  padding: 0.8rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  border-radius: 6px;
  font-size: 0.9rem;
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const LoadMoreBtn = styled(motion.button)`
  padding: 1rem 3rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const roomsData = [
  { id: 1, title: 'Люкс великий', prices: { single: '650', double: '830', triple: '1010' }, desc: 'Просторий номер преміум-класу з усіма зручностями для комфортного проживання.' },
  { id: 2, title: 'Люкс великий', prices: { single: '700', double: '880', triple: '1060' }, desc: 'Елегантний люкс з покращеним плануванням та вишуканим інтер’єром.' },
  { id: 3, title: 'Стандарт з 1 двоспальним ліжком', prices: { single: '500', double: '680' }, desc: 'Класичний затишний номер, ідеально підходить для пари або одного гостя.' },
  { id: 4, title: 'Стандарт з 2 односпальними ліжками', prices: { single: '500', double: '680' }, desc: 'Зручний номер з окремими ліжками та всім необхідним для відпочинку.' },
  { id: 5, title: 'Стандарт покращений з 1 двоспальним ліжком', prices: { single: '550', double: '730', triple: '910' }, desc: 'Покращений варіант стандарту з більшою площею та додатковим комфортом.' },
  { id: 6, title: 'Стандарт покращений з 3 односпальними ліжками', prices: { single: '500', double: '680' }, desc: 'Функціональний номер для трьох осіб або невеликої сім’ї.' },
  { id: 7, title: 'Стандарт з 1 двоспальним ліжком', prices: { single: '500', double: '680' }, desc: 'Затишний стандартний номер у самому центрі міста.' },
  { id: 8, title: 'Люкс малий', prices: { single: '450', double: '630', triple: '810' }, desc: 'Компактний номер класу люкс зі збереженням усіх преміальних зручностей.' },
  { id: 9, title: 'Стандарт покращений з 3 односпальними ліжками з терасою', prices: { single: '580', double: '760', triple: '940' }, desc: 'Унікальний номер з виходом на власну терасу для вашого відпочинку.' },
  { id: 10, title: 'Стандарт покращений з 1 двоспальним ліжком з терасою', prices: { single: '580', double: '600', triple: '760' }, desc: 'Романтичний номер з терасою та сучасним дизайном.' },
  { id: 11, title: 'Стандарт з 2 односпальними ліжками', prices: { single: '500', double: '680' }, desc: 'Надійний вибір для комфортного проживання за помірну ціну.' },
  { id: 12, title: 'Стандарт покращений з 1 двоспальним ліжком', prices: { single: '550', double: '730' }, desc: 'Сучасний номер з покращеним сервісом та затишною атмосферою.' },
  { id: 14, title: 'Стандарт з 1 двоспальним ліжком', prices: { single: '500', double: '680' }, desc: 'Тихий номер для спокійного відпочинку після насиченого дня.' },
  { id: 15, title: 'Стандарт покращений з 2 односпальними ліжками', prices: { single: '500', double: '680' }, desc: 'Покращений номер зі стильним інтер’єром та окремими ліжками.' },
  { id: 16, title: 'Стандарт покращений з 1 двоспальним ліжком', prices: { single: '550', double: '730' }, desc: 'Елегантний та функціональний номер для вибагливих гостей.' },
  { id: 17, title: 'Стандарт з 3 односпальними ліжками', prices: { single: '500', double: '680' }, desc: 'Просторий стандартний номер для комфортного розміщення трьох гостей.' },
];

interface RoomsProps {
  onOpenBookingModal: () => void;
}

const Rooms: React.FC<RoomsProps> = ({ onOpenBookingModal }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const visibleRooms = roomsData.slice(0, visibleCount);

  return (
    <Section id="rooms">
      <SectionHeader>
        <Title>Наші номери</Title>
        <Underline />
      </SectionHeader>
      <Grid>
        {visibleRooms.map((room, index) => (
          <RoomCard
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
          >
            <div>
              <RoomHeader>
                <RoomNumber>Номер {room.id}</RoomNumber>
                <RoomTitle>{room.title}</RoomTitle>
              </RoomHeader>
              <PriceGrid>
                <PriceItem>
                  <span>1 особа</span>
                  <span>{room.prices.single} ₴</span>
                </PriceItem>
                <PriceItem>
                  <span>2 особи</span>
                  <span>{room.prices.double} ₴</span>
                </PriceItem>
                {room.prices.triple && (
                  <PriceItem style={{ gridColumn: 'span 2', marginTop: '0.5rem', borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
                    <span>3 особи</span>
                    <span>{room.prices.triple} ₴</span>
                  </PriceItem>
                )}
              </PriceGrid>
              <RoomDesc>{room.desc}</RoomDesc>
            </div>
            <BookBtn 
              onClick={onOpenBookingModal}
              whileHover={{ opacity: 0.9 }} 
              whileTap={{ scale: 0.98 }}
            >
              Бронювати
            </BookBtn>
          </RoomCard>
        ))}
      </Grid>
      
      {visibleCount < roomsData.length && (
        <LoadMoreContainer>
          <LoadMoreBtn
            onClick={handleLoadMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Показати ще
          </LoadMoreBtn>
        </LoadMoreContainer>
      )}
    </Section>
  );
};

export default Rooms;

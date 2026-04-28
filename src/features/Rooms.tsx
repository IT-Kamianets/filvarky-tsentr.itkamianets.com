import styled from 'styled-components';
import { motion } from 'framer-motion';
import luxuryImg from '../assets/luxury.png';
import standardImg from '../assets/standard.png';

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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
`;

const RoomCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const RoomImage = styled.div<{ $bg: string }>`
  height: 250px;
  background: url(${({ $bg }) => $bg}) no-repeat center center/cover;
`;

const RoomContent = styled.div`
  padding: 2rem;
`;

const RoomTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const RoomPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
`;

const RoomDesc = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const BookBtn = styled(motion.button)`
  width: 100%;
  padding: 0.8rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  border-radius: 4px;
`;

const roomsData = [
  {
    title: 'Двокімнатний люкс',
    price: 'від 1200 грн',
    desc: 'Найвищий рівень комфорту. Дві кімнати, розкішне ліжко, зона відпочинку та ванна кімната з усіма зручностями.',
    image: luxuryImg,
  },
  {
    title: 'Напівлюкс',
    price: 'від 950 грн',
    desc: 'Просторий номер з вишуканим інтер’єром, ідеально підходить для ділових поїздок або романтичного відпочинку.',
    image: luxuryImg, // Using same for now
  },
  {
    title: 'Стандарт покращений',
    price: 'від 750 грн',
    desc: 'Затишний номер з усіма необхідними зручностями для комфортного перебування одного або двох гостей.',
    image: standardImg,
  },
];

const Rooms: React.FC = () => {
  return (
    <Section id="rooms">
      <SectionHeader>
        <Title>Наші номери</Title>
        <Underline />
      </SectionHeader>
      <Grid>
        {roomsData.map((room, index) => (
          <RoomCard
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <RoomImage $bg={room.image} />
            <RoomContent>
              <RoomTitle>{room.title}</RoomTitle>
              <RoomPrice>{room.price}</RoomPrice>
              <RoomDesc>{room.desc}</RoomDesc>
              <BookBtn whileHover={{ opacity: 0.9 }} whileTap={{ scale: 0.98 }}>
                Детальніше
              </BookBtn>
            </RoomContent>
          </RoomCard>
        ))}
      </Grid>
    </Section>
  );
};

export default Rooms;

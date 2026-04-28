import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Coffee, Wind, Trophy, Map } from 'lucide-react';

const Container = styled.section`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 8rem 2rem;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const ServiceItem = styled(motion.div)`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ServiceDesc = styled.p`
  opacity: 0.8;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const services = [
  {
    icon: <Coffee size={32} />,
    title: 'Кафе-бар',
    desc: 'Затишне кафе, де ви можете насолодитися сніданком, обідом або вечерею в приємній атмосфері.',
  },
  {
    icon: <Wind size={32} />,
    title: 'Сауна',
    desc: 'Відновіть сили після насиченого дня в нашій сучасній сауні з басейном та кімнатою відпочинку.',
  },
  {
    icon: <Trophy size={32} />,
    title: 'Більярд',
    desc: 'Чудове місце для вечірнього відпочинку та гри з друзями або колегами.',
  },
  {
    icon: <Map size={32} />,
    title: 'Екскурсії',
    desc: 'Ми допоможемо організувати незабутні екскурсії історичними пам’ятками Кам’янця-Подільського.',
  },
];

const Services: React.FC = () => {
  return (
    <Container id="services">
      <Content>
        <Header>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontSize: '3rem', marginBottom: '1rem' }}
          >
            Наші послуги
          </motion.h2>
          <div style={{ width: '80px', height: '4px', background: '#C5A059', margin: '0 auto' }} />
        </Header>
        <Grid>
          {services.map((service, index) => (
            <ServiceItem
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <IconWrapper>{service.icon}</IconWrapper>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDesc>{service.desc}</ServiceDesc>
            </ServiceItem>
          ))}
        </Grid>
      </Content>
    </Container>
  );
};

export default Services;

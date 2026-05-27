import React, { useState, useEffect } from 'react';
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
  max-width: 460px;
  padding: 2.5rem;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.95rem;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.85rem 1rem;
  border: 1.5px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  transition: border-color 0.2s;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SubmitBtn = styled(motion.button)<{ $loading?: boolean }>`
  width: 100%;
  padding: 0.95rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  font-size: 1rem;
  border-radius: 6px;
  margin-top: 0.5rem;
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  border: none;
  letter-spacing: 0.05em;
`;

const SuccessMsg = styled.div`
  text-align: center;
  padding: 1.5rem 0 0.5rem;

  p:first-child {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  p:last-child {
    color: ${({ theme }) => theme.colors.textLight};
    line-height: 1.5;
  }
`;

const ErrorMsg = styled.p`
  color: #e53e3e;
  font-size: 0.85rem;
  margin-top: 0.75rem;
  text-align: center;
`;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setName('');
      setPhone('');
      setSuccess(false);
      setError('');
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://it.webart.work/api/telegram/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: 'filvarky-tsentr',
          message: `Запит на бронювання\nІм'я: ${name}\nТелефон: ${phone}`,
        }),
      });

      const data = await res.json();
      if (data === true) {
        setSuccess(true);
      } else {
        setError('Не вдалося надіслати. Спробуйте ще раз.');
      }
    } catch {
      setError("Помилка з'єднання. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <ModalContainer
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={handleClose}>
              <X size={22} />
            </CloseButton>

            {success ? (
              <SuccessMsg>
                <p>✓</p>
                <Title>Дякуємо!</Title>
                <p>Ваш запит отримано. Ми зв'яжемося з вами найближчим часом.</p>
              </SuccessMsg>
            ) : (
              <>
                <Title>Бронювати</Title>
                <Subtitle>Залиште ваші контактні дані — ми зв'яжемося з вами для підтвердження.</Subtitle>
                <form onSubmit={handleSubmit}>
                  <Field>
                    <Label htmlFor="name">Ім'я</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Введіть ваше ім'я"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="phone">Номер телефону</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+380 XX XXX XX XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </Field>
                  {error && <ErrorMsg>{error}</ErrorMsg>}
                  <SubmitBtn
                    type="submit"
                    $loading={loading}
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                  >
                    {loading ? 'Надсилання...' : 'Надіслати запит'}
                  </SubmitBtn>
                </form>
              </>
            )}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;

// src/pages/HomePage.tsx
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { FaArrowRight, FaMoon, FaSun, FaMicrophone } from 'react-icons/fa';
import speechHandler from './SpeechHandler';
import { Link } from 'react-router-dom';
// Define light and dark themes
const lightTheme = {
  background: '#FFFFFF',
  color: '#121212',
  toggleBorder: '#FFF',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  cardBackground: '#F5F5F5',
};

const darkTheme = {
  background: '#121212',
  color: '#FFFFFF',
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
  cardBackground: '#1E1E1E',
};

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${(props: any) => props.theme.background};
    color: ${(props: any) => props.theme.color};
    font-family: 'Arial', sans-serif;
    transition: all 0.5s linear;
    scroll-behavior: smooth;
  }
`;

// Styled Components
const Container = styled.div`
  overflow-x: hidden;
`;

const Header = styled.header`
  height: 100vh;
  background-image: url('/images/assistive-tech-background.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin: 0;
  color: ${(props) => props.theme.color};
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-top: 1rem;
  color: ${(props) => props.theme.color};
`;

const Button = styled(motion.button)`
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: ${(props) => props.theme.gradient};
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  outline: none;
`;

const DarkModeToggle = styled.button`
  position: fixed;
  top: 1rem;
  right: 3rem;
  background: none;
  border: none;
  cursor: pointer;
  color: blue;
  font-size: 1.5rem;
  z-index: 1000;
`;

const VoiceControlToggle = styled.button`
  position: fixed;
  top: 1rem;
  right: 6rem;
  background: none;
  border: none;
  cursor: pointer;
  color: blue;
  font-size: 1.5rem;
  z-index: 1000;
`;

const ContentSection = styled.section`
  padding: 4rem 2rem;
  background: ${(props) => props.theme.cardBackground};
`;

const SVGAnimation = styled(motion.svg)`
  width: 100%;
  height: auto;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background: ${(props) => props.theme.background};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: ${(props) =>
    props.theme === darkTheme
      ? '0 4px 6px rgba(0,0,0,0.9)'
      : '0 4px 6px rgba(0,0,0,0.1)'};
  color: ${(props) => props.theme.color};
  cursor: pointer;
`;

const FutureSection = styled.section`
  padding: 4rem 2rem;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const HomePage: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [voiceControl, setVoiceControl] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleVoiceControl = () => {
    if (voiceControl) {
      speechHandler.stopListening();
    } else {
      speechHandler.startListening((transcript) => {
        console.log('Recognized Speech:', transcript);

        const cleanedTranscript = transcript.replace(/[^\w]/g, '').toLowerCase();
        if (
          cleanedTranscript.includes('goto') &&
          cleanedTranscript.includes('detectedobjects')
        ) {
          navigate('/detected-objects');
        }
      });
    }
    setVoiceControl(!voiceControl);
  };

  const data = [
    {
      title: 'AI-Powered Image Descriptions',
      description:
        'Real-time descriptions of images powered by advanced AI.',
    },
    {
      title: 'Voice-Controlled Navigation',
      description:
        'Navigate the entire website using simple voice commands.',
    },
    {
      title: 'Haptic Feedback Integration',
      description:
        'Experience tactile responses when interacting with elements.',
    },
  ];

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Container>
        <DarkModeToggle onClick={toggleTheme} aria-label="Toggle Dark Mode">
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </DarkModeToggle>

        <VoiceControlToggle
          onClick={toggleVoiceControl}
          aria-label="Toggle Voice Control"
        >
          <FaMicrophone
            style={{ color: voiceControl ? '#ff1744' : 'inherit' }}
          />
        </VoiceControlToggle>

        <Header>
          <Title
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            The Future of Assistive Technology
          </Title>
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Empowering Independence for Blind and Low Vision Users
          </Subtitle>
          <StyledLink to="/detected-objects">
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Get Started"
            >
              Get Started{' '}
              <FaArrowRight
                style={{ marginLeft: '0.5rem' }}
                aria-hidden="true"
              />
            </Button>
          </StyledLink>
        </Header>

        <ContentSection>
          <SVGAnimation
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 400"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          >
            <motion.path
              d="M0 200 Q400 0 800 200 T1600 200"
              stroke="#2196F3"
              strokeWidth="4"
              fill="none"
            />
          </SVGAnimation>
          <h2 style={{ textAlign: 'center' }}>Revolutionary Features</h2>
          <CardGrid>
            {data.map((item, index) => (
              <Card
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                tabIndex={0}
                role="button"
                aria-label={item.title}
              >
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </Card>
            ))}
          </CardGrid>
        </ContentSection>

        <FutureSection>
          <h2>What's to Come</h2>
          <p>
            We're constantly innovating to bring you the most advanced assistive
            technologies.
          </p>
          <CardGrid>
            <Card
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              tabIndex={0}
              role="button"
              aria-label="Neural Interface Controls"
            >
              <h2>Neural Interface Controls</h2>
              <p>
                Control devices directly with your thoughts using our upcoming
                neural interface technology.
              </p>
            </Card>
            <Card
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              tabIndex={0}
              role="button"
              aria-label="Real-Time Environment Mapping"
            >
              <h2>Real-Time Environment Mapping</h2>
              <p>
                Navigate complex environments with real-time 3D mapping and
                obstacle detection.
              </p>
            </Card>
            <Card
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              tabIndex={0}
              role="button"
              aria-label="Personalized AI Assistants"
            >
              <h2>Personalized AI Assistants</h2>
              <p>
                Get assistance tailored to your needs with our AI-powered
                personal assistants.
              </p>
            </Card>
          </CardGrid>
        </FutureSection>
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;

import { GlobalInnerContainer } from '@/styles/defaults';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled(GlobalInnerContainer)``;

export const HeroBigText = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 93px;
  line-height: 140px;
  /* identical to box height */

  letter-spacing: -1.5px;

  color: #845cd6;

  > strong {
    font-weight: 700;
    color: #fff;
  }
`;

export const HeroSubtitle = styled.h3`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 39px;
  line-height: 58px;
  color: #ffffff;
`;

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
`;

export const DownloadCV = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
  gap: 8px;

  width: 150px;
  height: 40px;

  border: 2px solid #845cd6;
  border-radius: 6px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  /* identical to box height */

  letter-spacing: 0.25px;

  color: #845cd6;
`;

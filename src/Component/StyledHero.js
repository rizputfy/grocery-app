import styled from 'styled-components';

export const CarouselContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 100px;
`;

export const CarouselImageLink = styled.a`
  display: block;
  width: 100%;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

export const GalleryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  padding: 20px;
`;

export const Card = styled.div`
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
  
`;

export const CardLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
`;

export const CardImage = styled.img`
  width: 100%;
  height: auto;
`;
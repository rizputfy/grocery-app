import styled from 'styled-components';

export const NavStyle = styled.nav`
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 50px;
    background: #006769;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: #9DDE8B;
    }
`;

export const LogoStyle = styled.h3`
    color: #fff;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`;

export const MenuStyle = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
`;

export const UlStyle = styled.ul`
    list-style: none;
    display: flex;
    gap: 15px;
    margin: 0;
    padding: 0;
`;

export const AStyle = styled.a`
    text-decoration: none;
    color: #fff;
    font-size: 1rem;
    font-weight: 350;
    padding: 10px 10px;
    border-radius: 5px;
    transition: color 0.3s ease-out, background-color 0.3s ease-out, transform 0.3s ease-out;

    &:hover {
        color: #FF9BD2;
        background-color: #fff;
        transform: scale(1.0);
    }
`;

export const HeadButton = styled.a`
    text-decoration: none;
    color: #006769;
    background-color: #fff;
    font-size: 1rem;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease-out, color 0.3s ease-out, transform 0.3s ease-out;

    &:hover {
        color: #fff;
        background-color: #006769;
        transform: scale(1.0);
    }
`;

export const SearchBarStyle = styled.div`
  display: flex;
  align-items: center;
`;

export const InputStyle = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  flex-grow: 1;
`;

export const DropdownStyle = styled.div`
  position: relative; /* Required for dropdown positioning */
  display: inline-block; /* Allow inline display for buttons */
`;

export const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0; /* Remove default padding */

  &:focus {
    outline: none; /* Remove focus outline */
  }
`;

export const DropdownMenu = styled.div`
  display: none; /* Initially hidden */
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1; /* Ensure dropdown stays above other elements */

  ${DropdownButton}:hover & {
    display: block; /* Show dropdown on hover */
  }
`;

export const DropdownItem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #ddd;
  }
`;
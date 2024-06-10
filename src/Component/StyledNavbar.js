import styled from 'styled-components';

export const SmallNavbarContainer = styled.div`
  width: 100%;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 20px; 
  position: fixed;
  height: 30px;
  top: 0;
  z-index: 1000;
  transition: top 0.3s;
`;

export const SmallNavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 12px;
  margin: 0 15px;
  &:hover {
    color: #9DDE8B;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  background-color: white;
  position: fixed;
  top: 30px; 
  width: 100%;
  z-index: 999;
  transition: top 0.3s;
`;

export const Logo = styled.a`
  font-size: 24px;
  font-weight: bold;
  color: #006769;
  text-decoration: none;
`;

export const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li`
  position: relative;
  margin: 0 10px;
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 14px;
  &:hover {
    color: #006769;
  }
`;

export const DropdownMenu = styled.div`
  display: flex;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
  padding: 20px;
  border: 1px solid #ddd;
  min-width: max-content; 
`;


export const DropdownColumn = styled.div`
  margin: 0 20px;
`;

export const DropdownCategory = styled.h3`
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #333;
`;

export const DropdownItem = styled.a`
  display: block;
  padding: 5px 0;
  text-decoration: none;
  color: #333;
  font-size: 14px;
  &:hover {
    background-color: #f1f1f1;
    color: #006769;
  }
`;

export const NavIcons = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
`;

export const SearchIcon = styled.a`
  margin-right: 5px;
  font-size: 18px;
  color: #333;
  text-decoration: none;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 5px;
  font-size: 14px;
`;

export const LoginButton = styled.a`
  margin-left: 10px;
  padding: 8px 16px;
  font-size: 14px;
  color: white;
  background-color: #006769;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  &:hover {
    background-color: #9DDE8B;
  }
`;

export const NavIcon = styled.a`
  margin: 0 10px;
  font-size: 18px;
  color: #333;
  position: relative;
  text-decoration: none;
  &:hover {
    color: #9DDE8B;
  }
`;



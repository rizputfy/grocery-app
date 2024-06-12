import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  NavbarContainer,
  Logo, NavMenu, NavItem, NavLink, DropdownMenu, DropdownColumn, DropdownCategory, DropdownItem, NavIcons, NavIcon,
  SearchContainer, SearchIcon, SearchInput, LoginButton, SmallNavbarContainer, SmallNavLink, 

} from './StyledNavbar';

const Navbar = () => {
  const [dropdown, setDropdown] = useState(null);

  const handleMouseEnter = (menu) => {
    setDropdown(menu);
  };

  const handleMouseLeave = () => {
    setDropdown(null);
  };

  return (
    <>
    {(
        <SmallNavbarContainer>
          <SmallNavLink href="#">Contact Us</SmallNavLink>
        </SmallNavbarContainer>
      )}
    
    {/* Main Navbar */}
    <NavbarContainer>
      <Logo href="#">GROCERY APP</Logo>
      <NavMenu>
        <NavItem
          onMouseEnter={() => handleMouseEnter('PRODUK_SEGAR')}
          onMouseLeave={handleMouseLeave}
        >
          <NavLink href="#">PRODUK SEGAR</NavLink>
          {dropdown === 'PRODUK_SEGAR' && (
            <DropdownMenu>
              <DropdownColumn>
                <DropdownCategory>Sayur & Buah</DropdownCategory>
                <DropdownItem href="#">Sayur</DropdownItem>
                <DropdownItem href="#">Jamur & Kecambah</DropdownItem>
                <DropdownItem href="#">Rempah & Bumbu</DropdownItem>
                <DropdownItem href="#">Buah Segar</DropdownItem>
                <DropdownItem href="#">Tahu & Fermentasi</DropdownItem>
              </DropdownColumn>
              <DropdownColumn>
                <DropdownCategory>Daging & Seafood</DropdownCategory>
                <DropdownItem href="#">Daging Sapi</DropdownItem>
                <DropdownItem href="#">Lamb</DropdownItem>
                <DropdownItem href="#">Unggas & Telur</DropdownItem>
                <DropdownItem href="#">Ikan Air Tawar</DropdownItem>
                <DropdownItem href="#">Seafood</DropdownItem>
              </DropdownColumn>
            </DropdownMenu>
          )}
        </NavItem>
        <NavItem
          onMouseEnter={() => handleMouseEnter('BAHAN_MASAK')}
          onMouseLeave={handleMouseLeave}
        >
          <NavLink href="#">BAHAN MASAK</NavLink>
          {dropdown === 'BAHAN_MASAK' && (
            <DropdownMenu>
              <DropdownColumn>
                <DropdownCategory>Rempah-Rempah</DropdownCategory>
                <DropdownItem href="#">Rempah-Rempah 1</DropdownItem>
                <DropdownItem href="#">Rempah-Rempah 2</DropdownItem>
              </DropdownColumn>
              <DropdownColumn>
                <DropdownCategory>Bumbu Dapur</DropdownCategory>
                <DropdownItem href="#">Bumbu Dapur 1</DropdownItem>
                <DropdownItem href="#">Bumbu Dapur 2</DropdownItem>
              </DropdownColumn>
            </DropdownMenu>
          )}
        </NavItem>
        <NavItem
          onMouseEnter={() => handleMouseEnter('SUSU_PRODUK_BEKU')}
          onMouseLeave={handleMouseLeave}
        >
          <NavLink href="#">SUSU & PRODUK BEKU</NavLink>
          {dropdown === 'SUSU_PRODUK_BEKU' && (
            <DropdownMenu>
              <DropdownColumn>
                <DropdownCategory>Susu Segar</DropdownCategory>
                <DropdownItem href="#">Susu Segar 1</DropdownItem>
                <DropdownItem href="#">Susu Segar 2</DropdownItem>
              </DropdownColumn>
              <DropdownColumn>
                <DropdownCategory>Keju</DropdownCategory>
                <DropdownItem href="#">Keju 1</DropdownItem>
                <DropdownItem href="#">Keju 2</DropdownItem>
              </DropdownColumn>
              <DropdownColumn>
                <DropdownCategory>Es Krim</DropdownCategory>
                <DropdownItem href="#">Es Krim 1</DropdownItem>
                <DropdownItem href="#">Es Krim 2</DropdownItem>
              </DropdownColumn>
            </DropdownMenu>
          )}
        </NavItem>
        <NavItem
          onMouseEnter={() => handleMouseEnter('SNACK')}
          onMouseLeave={handleMouseLeave}
        >
          <NavLink href="#">SNACK</NavLink>
          {dropdown === 'SNACK' && (
            <DropdownMenu>
              <DropdownColumn>
                <DropdownCategory>Keripik</DropdownCategory>
                <DropdownItem href="#">Keripik 1</DropdownItem>
                <DropdownItem href="#">Keripik 2</DropdownItem>
              </DropdownColumn>
              <DropdownColumn>
                <DropdownCategory>Cokelat</DropdownCategory>
                <DropdownItem href="#">Cokelat 1</DropdownItem>
                <DropdownItem href="#">Cokelat 2</DropdownItem>
              </DropdownColumn>
              <DropdownColumn>
                <DropdownCategory>Biskuit</DropdownCategory>
                <DropdownItem href="#">Biskuit 1</DropdownItem>
                <DropdownItem href="#">Biskuit 2</DropdownItem>
              </DropdownColumn>
            </DropdownMenu>
          )}
        </NavItem>
      </NavMenu>
      <NavIcons>
        <SearchContainer>
          <SearchIcon href="#"><i className="fas fa-shopping-cart"></i></SearchIcon>
          <SearchInput type="text" placeholder="Search" />
        </SearchContainer>
        <NavIcon href="#"><i className="fas fa-user"></i></NavIcon>
        <NavIcon href="#"><i className="fas fa-heart"></i></NavIcon>
        <LoginButton as={Link} to="/login">Login</LoginButton>
      </NavIcons>
    </NavbarContainer>
    </>
  );
};

export default Navbar;

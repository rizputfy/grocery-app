import React, { Component } from "react";
import {
  NavStyle, LogoStyle, MenuStyle, AStyle, SearchBarStyle, InputStyle, HeadButton, DropdownButton, DropdownItem, DropdownMenu
} from "../Component/StyledHeader";

class Header extends Component {
    constructor(props) {
      super(props);
      this.state = {
        searchTerm: "",
        isOpen: false, // Define isOpen in the constructor
      };
    }
  
    toggleDropdown = () => {
      this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    };
  
    handleSearchChange = (event) => {
      this.setState({ searchTerm: event.target.value });
    };
  
    handleSubmit = (event) => {
      event.preventDefault();
      console.log("Search term:", this.state.searchTerm);
    };
  
    render() {
      const { isOpen } = this.state; 
  
      return (
        <NavStyle>
          <LogoStyle>GROCERY APP</LogoStyle>
          <MenuStyle>
            <DropdownButton onClick={this.toggleDropdown} isOpen={isOpen}>
              <AStyle>Menu</AStyle>
              <DropdownMenu show={isOpen}>
                <DropdownItem>Grocery List</DropdownItem>
                <DropdownItem>Shopping Cart</DropdownItem>
                <DropdownItem>Orders</DropdownItem>
                <DropdownItem>Profile</DropdownItem>
              </DropdownMenu>
            </DropdownButton>
          </MenuStyle>
          <form onSubmit={this.handleSubmit}>
              <SearchBarStyle>
                <InputStyle
                  type="text"
                  placeholder="Search for groceries..."
                  value={this.state.searchTerm}
                  onChange={this.handleSearchChange}
                />
              </SearchBarStyle>
            </form>
          <HeadButton href="">Login</HeadButton>
        </NavStyle>
      );
    }
  }
  
  export default Header;

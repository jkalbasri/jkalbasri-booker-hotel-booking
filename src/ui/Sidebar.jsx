import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  border: 1px solid var(--color-grey-100);
  padding: 3.2rem 2.4rem;
  background-color: var(--color-grey-0);
  grid-row: 2/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding-top:0.9rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
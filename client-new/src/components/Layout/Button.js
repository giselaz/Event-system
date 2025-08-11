import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled(Link)`
  padding: 10px 20px 9px;
  display: inline-block;
  border: ${(props) =>
    props.isdark == 1 ? "2px solid white" : "2px solid #2f2f89"};
  background-color: transparent;
  font-size: 13px;
  line-height: 14px;
  border-radius: 6px;
  color: ${(props) => (props.isdark == 1 ? "white" : "#2f2f89")}; 
  font-weight: 700;
  text-transform: uppercase;
  text-decoration:none;
  position: relative;
  top: -8px;
  -webkit-transition: all 0.4s ease;
  &:hover {
    color: ${(props) => (props.isdark == 1 ? "#2f2f89" : "white")};
    background-color: ${(props) => (props.isdark == 1 ? "white" : "#2f2f89")};
    box-shadow: 0px 10px 30px rgba(47, 47, 137, 0.24);
  }
  a {
    color: inherit; // Inherits color from StyledButton
    text-decoration: none; // Removes underline from the link
    font-weight: inherit;


    &:hover {
      color: inherit; // Optional, but can add hover styling specifically for <a>
    }
  }
`;

const Button = ({ children, onClick, disabled = false, ...props }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

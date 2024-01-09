import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Cart from "../../utils/images/cart.svg";
import M from "../../utils/images/M.svg";
import colors from "../../utils/style/colors";

//-----------------------------------------------------------------------------------------------
const NavBarGlobalContainer = styled.article`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 5;
	transform: translateY(-100%);
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 10vh;
	background: linear-gradient(#b49446, ${colors.yellow});
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Images = styled.img`
	height: 50%;
	margin: 0 4vmax;
	cursor: pointer;
`;

const ImageLink = styled(Link)`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default function NavBar() {
	return (
		<NavBarGlobalContainer>
			<ImageLink to={`/`}>
				<Images src={M} alt="retour à l'accueil" />
			</ImageLink>
			<ImageLink to={`/cart`}>
				<Images src={Cart} alt="aller au panier" />
			</ImageLink>
		</NavBarGlobalContainer>
	);
}

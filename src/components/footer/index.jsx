import React from "react";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import { Link } from "react-router-dom";

//-----------------------------------------------------------------------------------------------

const GlobalContainer = styled.article`
	position: absolute;
	bottom: 0;
	transform: translateY(100%);
	display: flex;
	justify-content: center;
	align-items: start;
	flex-direction: column;
	width: 100%;
	height: 10vh;
	background: ${colors.darkBlue};
	padding: 1vmax;

	* {
		text-decoration: none;
		color: white;
		font-size: clamp(0.6rem, 2vw, 1rem);
	}
`;

//-----------------------------------------------------------------------------------------------

export default function Footer() {
	return (
		<GlobalContainer>
			<Link to="/admin">Admin</Link>
			<a href="">Signaler une erreur</a>
		</GlobalContainer>
	);
}

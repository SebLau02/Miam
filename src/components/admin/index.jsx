import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//-----------------------------------------------------------------------------------------------a

const GlobalContainer = styled.article`
	padding: 1vmax;

	h1 {
		text-decoration: underline;
	}
	div {
		display: flex;
		justify-content: center;
		align-items: start;
		flex-direction: column;
	}
	div > * {
		text-decoration: none;
		color: #383838;
	}
`;

export default function Admin() {
	return (
		<GlobalContainer>
			<h1>Admin</h1>

			<div>
				<Link to="/admin/gestion">Gestion</Link>
				<Link to="/admin/get_orders">Commandes en cours</Link>
				<Link to="/admin/served_orders">Commandes passées</Link>
			</div>
		</GlobalContainer>
	);
}

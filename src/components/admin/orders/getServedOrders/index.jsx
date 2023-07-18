import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiUrl from "../../../../utils/apiUrl";
import colors from "../../../../utils/style/colors";

//-----------------------------------------------------------------------------------------------
const GlobalContainer = styled.article`
	padding: 1vmax;
`;
const ServedOrderSection = styled.section`
	background: ${colors.lightBlue};
	border-radius: 1vmax;
	margin: 1vmax;
	padding: 1vmax;
	max-width: 90%;
	width: 30vmax;
	box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
		rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
		rgba(0, 0, 0, 0.09) 0px 32px 16px;

	ul {
		margin-left: 2vmax;
		list-style: decimal;
	}

	h3 {
		margin: 2vmax 0 0 0;
		border-top: 1px solid black;
	}
`;
//-----------------------------------------------------------------------------------------------

export default function GetServedOrders() {
	const [servedOrders, setServedOrders] = useState();

	useEffect(() => {
		fetch(apiUrl + `/miam/order/get-served-orders`, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setServedOrders(data.servedOrder);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<GlobalContainer>
			<h3>Commandes passées</h3>
			{servedOrders?.map((servedOrder) => (
				<ServedOrderSection>
					<p>Client: {servedOrder.clientName}</p>
					<p>Table: {servedOrder.tableNumber}</p>
					<h3>Plats</h3>
					<ul>
						{servedOrder.meals.map((meal) => (
							<li>{meal.name}</li>
						))}
					</ul>
				</ServedOrderSection>
			))}
		</GlobalContainer>
	);
}

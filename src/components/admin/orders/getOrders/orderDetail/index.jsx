import React, { useContext, Fragment, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../../../../utils/context";
import { useParams } from "react-router-dom";
import apiUrl from "../../../../../utils/apiUrl";

import colors from "../../../../../utils/style/colors";

//-----------------------------------------------------------------------------------------------

const OrderDetailGlobalContainer = styled.article`
	width: 100%;
	padding: 2vmax;
`;
const OrderDetailSection = styled.section`
	display: flex;
	justify-content: center;
	align-items: start;
	flex-direction: column;
	padding: 2vmax;
	background: ${colors.orange};
	border-radius: 1vmax;
	box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
		rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

	& :nth-child(1) span {
		font-weight: 900;
		color: ${colors.darkBlue};
	}

	h3 {
		margin: 2vmax 0 0 0;
	}
`;

const MealsContainer = styled.ul`
	list-style: inside;
`;

const Servir = styled.button`
	width: auto;
	height: auto;
	padding: 1vmax;
	align-self: end;
`;

const ServerResSection = styled.p`
	color: green;
	align-self: center;
`;
//-----------------------------------------------------------------------------------------------

export default function OrderDetail({ meals }) {
	const { orders, isLoadind } = useContext(UserContext);
	let { orderId } = useParams();
	const [serverRes, setServerRes] = useState();

	const orderData =
		orders && orders.length > 0
			? orders.filter((el) =>
					Object.values(el).some((item) => item === orderId)
			  )
			: [];

	const SendServedOrder = () => {
		//********** j'envoie la commande dans les historiques puis je la supprime du document "en cours" **********

		fetch(apiUrl + `/miam/order/served-order`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(orderData[0]),
		})
			.then((response) => response.json())
			.then((data) => {
				setServerRes(data.message);
			})
			.catch((error) => console.error(error));

		fetch(apiUrl + `/miam/order/delete-order/${orderData[0]._id}`, {
			method: "delete",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data.message);
			})
			.catch((error) => console.error(error));
	};

	return (
		<>
			{isLoadind ? (
				<p>Loading</p>
			) : (
				<OrderDetailGlobalContainer>
					{orderData?.map((el) => (
						<OrderDetailSection key={el._id}>
							<p>
								Commande de <span>{el.clientName}</span>
							</p>
							<h3>Plats</h3>

							<MealsContainer>
								{el.meals.map((meal) => (
									<li key={meal._id}>{meal.name}</li>
								))}
							</MealsContainer>
							<Servir onClick={() => SendServedOrder()}>
								Servir la commande
							</Servir>
							{serverRes && (
								<ServerResSection>
									✔ {serverRes} ✔
								</ServerResSection>
							)}
						</OrderDetailSection>
					))}
				</OrderDetailGlobalContainer>
			)}
		</>
	);
}

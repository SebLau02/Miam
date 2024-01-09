import React, { useContext, Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { UserContext } from "../../../../../utils/context";
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

export default function OrderDetail() {
	const { orders, setOrders, isLoadind } = useContext(UserContext);
	let { orderId } = useParams();
	const [serverRes, setServerRes] = useState();
	const navigate = useNavigate();

	const orderData =
		orders && orders.length > 0
			? orders.filter((el) =>
					Object.values(el).some((item) => item === orderId),
			  )
			: [];

	const SendServedOrder = () => {
		//********** je supprime la commande de celles en cours **********

		setOrders(
			orders.filter((order) => {
				return order.order_id !== orderId;
			}),
		);

		//********** j'envoie la commande dans les historiques **********

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

		navigate("/admin/get_orders");
	};

	return (
		<>
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
							<ServerResSection>✔ {serverRes} ✔</ServerResSection>
						)}
					</OrderDetailSection>
				))}
			</OrderDetailGlobalContainer>
		</>
	);
}

import React, { useEffect, useState, useContext } from "react";
import apiUrl from "../../../../utils/apiUrl";
import styled from "styled-components";
import colors from "../../../../utils/style/colors";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../../../utils/context";

//-----------------------------------------------------------------------------------------------

const OrdersBlobalSection = styled.article`
	margin: 1vmax;
`;
const OrderSection = styled.section`
	width: 20vmax;
	background: ${colors.orange};
	border: 2px solid ${colors.darkBlue};
	border-radius: 1vmax;
	margin: 1vmax 0;
	padding: 1vmax;
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
		rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
		rgba(0, 0, 0, 0.07) 0px 16px 16px;
`;
const StyledLink = styled(Link)`
	text-decoration: none;
	color: black;
`;
export default function GetOrders() {
	const { orders, isLoadind } = useContext(UserContext);
	const navigate = useNavigate();

	return (
		<OrdersBlobalSection>
			<h3>Commandes en cours</h3>

			{orders?.map((order) => (
				<StyledLink to={`/admin/order_detail/${order._id}`}>
					<OrderSection key={order._id}>
						<p>Client: {order.clientName}</p>
						<p>Table Number: {order.tableNumber}</p>
					</OrderSection>
				</StyledLink>
			))}
		</OrdersBlobalSection>
	);
}

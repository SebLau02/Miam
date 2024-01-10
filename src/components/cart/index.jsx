import React, { useState, useEffect } from "react";
import styled from "styled-components";

import apiUrl from "../../utils/apiUrl";

import colors from "../../utils/style/colors";
import Delete from "../../utils/images/delete.svg";

//-----------------------------------------------------------------------------------------------

const GlobalContainer = styled.article`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const Meals = styled.section`
	display: grid;
	grid-template-columns: 2fr 2fr 1fr;
	width: 90%;
	height: auto;
	padding: 1vmax;
	margin: 0.5vmax;
	border-radius: 0.5vmax;
	background: ${colors.lightBlue};

	* {
		align-self: center;
	}

	& :nth-child(1) {
		display: block;
	}

	& :nth-child(2) {
		height: 10vw;
		min-height: 80px;
		object-fit: cover;
		justify-self: center;
	}

	& :nth-child(3) {
		height: 2vw;
		min-height: 20px;
		cursor: pointer;
		justify-self: end;
	}

	@media (max-width: 425px) {
		& :nth-child(2) {
			max-width: 120px;
			object-fit: cover;
		}
	}
`;

const TotalSection = styled.section`
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
	width: 15vmax;
	height: 10vmax;
	background: ${colors.darkBlue};
	border-radius: 1vmax;
	padding: 1vmax;
`;

const OrderSentSection = styled.div`
	margin: 2vmax 0 0 0;
	color: green;
`;

const FormContainer = styled.div`
	// min-width: 250px;
	background: ${colors.lightBlue};
	border-radius: 1vmax;
	padding: 1vmax;
	margin: 1vmax;

	form label {
		display: flex;
		justify-content: flex-start;
		align-items: start;
		flex-direction: column;
	}
	form label input {
		margin: 0 2vmax;
		border-radius: 0.5vmax;
		padding: 0.5vmax;
		border: none;
	}
`;

//-----------------------------------------------------------------------------------------------

export default function Cart({ cart, setCart }) {
	const [totalCart, setTotalCart] = useState();
	const [orderSent, setOrderSent] = useState(false);
	const [pseudo, setPseudo] = useState();
	const [tableNumber, setTableNumber] = useState();
	const [serverRes, setServerRes] = useState();

	const serverCart = cart.map((el) => {
		return {
			name: el.name,
			price: el.price,
			_id: el._id,
		};
	});

	const order = {
		clientName: pseudo,
		tableNumber: tableNumber,
		meals: serverCart,
		order_id:
			pseudo + tableNumber + (Math.floor(Math.random() * 801) + 100),
	};

	let newCart = [];

	let prix = 0;
	cart.forEach((el) => {
		prix += el.price;
	});

	useEffect(() => {
		setTotalCart(prix);
	}, [prix]);

	const randomNumberFunc = (id) => {
		const randomNumber = id + Math.floor(Math.random() * 100) + 1;
	};

	const deleteArticle = (meal) => {
		newCart = cart.filter((el) => el._id !== meal._id);
		setCart(newCart);
	};

	const orderSentFunc = () => {
		setOrderSent(true);

		fetch(apiUrl + `/miam/order`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(order),
		})
			.then((response) => response.json())
			.then((data) => {
				setServerRes(data.message);
			})
			.catch((error) => console.error(error));
	};

	return (
		<GlobalContainer>
			{cart.map((meal) => (
				<Meals key={randomNumberFunc(meal._id)}>
					<div>
						<span>{meal.name} </span>
						<span> {meal.price * 0.01}€</span>
					</div>
					<img src={meal.image} alt="plat" />
					<img
						src={Delete}
						alt="supprimer élément"
						onClick={() => deleteArticle(meal)}
					/>
				</Meals>
			))}

			<FormContainer>
				<form>
					<label>
						Entrez un pseudo:
						<input
							type="text"
							onChange={(e) => setPseudo(e.target.value)}
						/>
					</label>

					<label>
						Entrez un numéro de table:
						<input
							type="number"
							onChange={(e) => setTableNumber(e.target.value)}
						/>
					</label>
				</form>
			</FormContainer>

			<TotalSection>
				<p>Total: {totalCart * 0.01}€</p>
				<button
					onClick={() => orderSentFunc()}
					disabled={pseudo && tableNumber ? "" : "disabled"}
				>
					Commander
				</button>
			</TotalSection>

			{orderSent && (
				<OrderSentSection>
					<h3>✔ {serverRes} ✔</h3>
				</OrderSentSection>
			)}
		</GlobalContainer>
	);
}

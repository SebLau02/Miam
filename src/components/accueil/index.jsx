import React, { useState, useEffect } from "react";
import styled from "styled-components";

import colors from "../../utils/style/colors";
import "./index.css";

//-----------------------------------------------------------------------------------------------

const GlobalContainer = styled.article`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1vmax 0;

	@media (max-width: 768px) {
		flex-direction: column;

		section {
			width: 80%;
			height: 20vh;
			transition: height 0.5s ease;
		}

		h1 {
			flex-direction: row;
			height: auto;
			transform: translate(-50%, 200%);
			z-index: 0;
		}
	}

	@media (max-width: 425px) {
		section div {
			grid-template-columns: 1fr 2fr 2fr;
			grid-template-rows: repeat(2, auto);
			grid-gap: 1vmax;
			width: 90%;

			& :nth-child(2) {
				grid-area: 2/1/3/2;
			}

			& :nth-child(4) {
				grid-row: span 2;
			}
		}
	}
`;
const MealsSections = styled.section`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 80vh;
	margin: 0.5vmax;
	background: linear-gradient(150deg, ${colors.lightBlue} 45%, #83dacf);
	border-radius: 1vmax;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
		rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
		rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
	cursor: pointer;
	transition: width 0.5s ease;

	div {
		display: grid;
		grid-template-columns: 1fr 0.5fr 2fr 2fr 0.5fr;
		grid-template-rows: 1fr;
		grid-gap: 1vmax;
		width: 90%;
		height: auto;
		max-height: 30%;
		margin: 0.5vmax 0;
		padding: 1vmax;
		background: linear-gradient(${colors.yellow}, #f5e6c0);
		border-radius: 1vmax;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
			rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
			rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
	}

	div p {
		font-size: clamp(1.2rem, 2vw, 1.6rem);
		align-self: center;
	}

	div img {
		width: 60%;
		height: 100%;
		object-fit: contain;
		align-self: center;
	}
	div button {
		align-self: end;
	}
`;
const Title = styled.h1`
	position: absolute;
	top: 0;
	left: 50%;
	transform: translate(-50%, 25%);
	display: flex;
	height: 80%;
	font-family: "caramelregular";
	font-size: clamp(1.4rem, 3vw, 6rem);
	color: #e8e8e8;
	text-shadow: 0 0.1em 0.04em #262626;
	transition: transform 0.2s 0.3s ease-out, flex-direction 0.2s ease;

	span {
		height: clamp(1rem, 3vw, 4rem);
	}
`;

//-----------------------------------------------------------------------------------------------

export default function Accueil({ meals, cart, setCart }) {
	const [isActive, setIsActive] = useState(0);
	const [isCategoryActive, setIsCategoryActive] = useState(0);

	const addToCart = (item) => {
		const meal = [];
		meal.push(item);

		setCart([...cart, item]);
	};

	return (
		<GlobalContainer>
			<MealsSections
				className={
					isActive === 0
						? "categories"
						: isActive === 1
						? "categories active"
						: "inactive"
				}
				onClick={() => {
					setIsActive(1);
					if (isCategoryActive !== 1) {
						setIsCategoryActive(0);
						setTimeout(() => {
							setIsCategoryActive(1);
						}, 600);
					}
				}}
			>
				<Title
					className={
						isActive === 1
							? "categories-title active"
							: "categories-title"
					}
				>
					<span>E</span>
					<span>n</span>
					<span>t</span>
					<span>r</span>
					<span>é</span>
					<span>e</span>
					<span>s</span>
				</Title>

				{meals[1]?.map(
					(meal) =>
						isCategoryActive === 1 && (
							<div key={meal._id}>
								<p>{meal.name}</p>
								<p>{meal.price * 0.01}€</p>
								<img src={meal.image} alt="plat" />
								<p>{meal.description}</p>
								<button onClick={() => addToCart(meal)}>
									Ajouter
								</button>
							</div>
						)
				)}
			</MealsSections>

			<MealsSections
				className={
					isActive === 0
						? "categories"
						: isActive === 2
						? "categories active"
						: "inactive"
				}
				onClick={() => {
					setIsActive(2);
					if (isCategoryActive !== 2) {
						setIsCategoryActive(0);
						setTimeout(() => {
							setIsCategoryActive(2);
						}, 600);
					}
				}}
			>
				<Title
					className={
						isActive === 2
							? "categories-title active"
							: "categories-title"
					}
				>
					<span>P</span>
					<span>l</span>
					<span>a</span>
					<span>t</span>
					<span>s</span>
				</Title>

				{meals[0]?.map(
					(meal) =>
						isCategoryActive === 2 && (
							<div key={meal._id}>
								<p>{meal.name}</p>
								<p>{meal.price * 0.01}€</p>
								<img src={meal.image} alt="plat" />
								<p>{meal.description}</p>
								<button onClick={() => addToCart(meal)}>
									Ajouter
								</button>
							</div>
						)
				)}
			</MealsSections>

			<MealsSections
				className={
					isActive === 0
						? "categories"
						: isActive === 3
						? "categories active"
						: "inactive"
				}
				onClick={() => {
					setIsActive(3);
					if (isCategoryActive !== 3) {
						setIsCategoryActive(0);
						setTimeout(() => {
							setIsCategoryActive(3);
						}, 600);
					}
				}}
			>
				<Title
					className={
						isActive === 3
							? "categories-title active"
							: "categories-title"
					}
				>
					<span>B</span>
					<span>o</span>
					<span>i</span>
					<span>s</span>
					<span>s</span>
					<span>o</span>
					<span>n</span>
					<span>s</span>
				</Title>

				{meals[2]?.map(
					(meal) =>
						isCategoryActive === 3 && (
							<div key={meal._id}>
								<p>{meal.name}</p>
								<p>{meal.price * 0.01}€</p>
								<img src={meal.image} alt="boisson" />
								<p>{meal.description}</p>
								<button onClick={() => addToCart(meal)}>
									Ajouter
								</button>
							</div>
						)
				)}
			</MealsSections>
			<MealsSections
				className={
					isActive === 0
						? "categories"
						: isActive === 4
						? "categories active"
						: "inactive"
				}
				onClick={() => {
					setIsActive(4);
					if (isCategoryActive !== 4) {
						setIsCategoryActive(0);
						setTimeout(() => {
							setIsCategoryActive(4);
						}, 600);
					}
				}}
			>
				<Title
					className={
						isActive === 4
							? "categories-title active"
							: "categories-title"
					}
				>
					<span>D</span>
					<span>e</span>
					<span>s</span>
					<span>s</span>
					<span>e</span>
					<span>r</span>
					<span>t</span>
					<span>s</span>
				</Title>

				{meals[3]?.map(
					(meal) =>
						isCategoryActive === 4 && (
							<div key={meal._id}>
								<p>{meal.name}</p>
								<p>{meal.price * 0.01}€</p>
								<img src={meal.image} alt="dessert" />
								<p>{meal.description}</p>
								<button onClick={() => addToCart(meal)}>
									Ajouter
								</button>
							</div>
						)
				)}
			</MealsSections>
		</GlobalContainer>
	);
}

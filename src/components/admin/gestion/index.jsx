import React, { useState, useEffect } from "react";
import styled from "styled-components";

//-----------------------------------------------------------------------------------------------

import AddForm from "./addForm";
import ModifyForm from "./modifyForm";

import "./index.css";
import apiUrl from "../../../utils/apiUrl";
import colors from "../../../utils/style/colors";

//-----------------------------------------------------------------------------------------------

const ServerResponse = styled.h3`
	font-size: clamp(1.4rem, 2vw, 2rem);
`;

const GlobalContainer = styled.article`
	margin: 2vmax;

	* {
		margin: 0.5vmax 0;
	}
`;
const SeachMeal = styled.input`
	width: 40vmax;
	height: 4vmax;
	border-radius: 1vmax;
	padding: 1vmax;
`;

const GlobalTitle = styled.h1`
	font-size: clamp(3rem, 3vw, 4rem);
	text-decoration: underline;
`;
const Etapes = styled.h3`
	text-decoration: underline;
`;
const StyledSelect = styled.select`
	width: 40vmax;
	max-width: 90%;
	height: auto;
	padding: 1vmax;
	border: none;
	border-radius: 0.5vmax;
	background: ${colors.yellow};
	box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
		rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
		rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

const DeleteMealSection = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 50vmax;
	border: 2px solid ${colors.darkBlue};
	border-radius: 1vmax;
	margin: 1vmax 0;
	box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
		rgba(0, 0, 0, 0.23) 0px 6px 6px;

	img {
		width: 80%;
		border-radius: 1vmax;
	}
	p {
		background: ${colors.lightBlue};
		border-radius: 1vmax;
		padding: 1vmax;
		box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
			rgba(0, 0, 0, 0.23) 0px 6px 6px;
	}
`;

//-----------------------------------------------------------------------------------------------

export default function Gestion({ meals }) {
	//********** données a envoyer au serveur **********

	const [name, setName] = useState("Nom");
	const [image, setImage] = useState("Image");
	const [description, setDescription] = useState("Description");
	const [price, setPrice] = useState(0);
	const [famille, setFamille] = useState("Famille");

	//********** state affichage conditionnel **********

	const [whichFunction, setWhichFunction] = useState();
	const [isActionChoosen, setIsActionChoosen] = useState(false);
	const [whichFamily, setWhichFamily] = useState();

	const [servRes, setServRes] = useState();
	const [mealId, setMealId] = useState();
	const [onSearchResult, setOnSearchResult] = useState({});

	const sendForm = (e) => {
		e.preventDefault();

		whichFunction === "add-meal"
			? fetch(apiUrl + `/miam/create-meal/mealFamily?mf=${whichFamily}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						// Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						name,
						image,
						description,
						price,
						famille,
					}),
			  })
					.then((response) => response.json())
					.then((data) => {
						setServRes(data.message);
					})
					.catch((error) => console.error(error))
			: whichFunction === "delete-meal"
			? fetch(apiUrl + `/miam/delete-meal/${mealId}`, {
					method: "delete",
					headers: {
						"Content-Type": "application/json",
						// Authorization: `Bearer ${token}`,
					},
			  })
					.then((response) => response.json())
					.then((data) => {
						setServRes(data.message);
					})
					.catch((error) => console.error(error))
			: fetch(apiUrl + `/miam/modify-meal/${mealId}`, {
					method: "put",
					headers: {
						"Content-Type": "application/json",
						// Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						name,
						image,
						description,
						price,
						famille,
					}),
			  })
					.then((response) => response.json())
					.then((data) => {
						setServRes(data.message);
					})
					.catch((error) => console.error(error));
	};

	const searchMealId = (e) => {
		Object.values(meals)?.forEach((meal) => {
			meal.forEach((item) => {
				if (
					item.name
						.toLowerCase()
						.includes(e.target.value.toLowerCase())
				) {
					setOnSearchResult(item);
				}
			});
		});
	};

	//-----------------------------------------------------------------------------------------------

	return (
		<GlobalContainer>
			<GlobalTitle>Gestion</GlobalTitle>
			<Etapes>Etape 1: Que faire ?</Etapes>
			<StyledSelect
				value={whichFunction}
				onChange={(e) => {
					setIsActionChoosen(true);
					setWhichFunction(e.target.value);
				}}
			>
				<option value="">Que faire ?</option>
				<option value="add-meal">Ajouter un plat</option>
				<option value="delete-meal">Supprimer un plat</option>
				<option value="modify-meal">Modifier un plat</option>
			</StyledSelect>

			{whichFunction === "delete-meal" && (
				<div>
					<Etapes>
						Etape 2: Trouver le plat que tu veux supprimer
					</Etapes>
					<SeachMeal type="search" onChange={searchMealId} />
					<p
						className="results"
						onClick={() => setMealId(onSearchResult?._id)}
					>
						{onSearchResult?.name}
					</p>
					{mealId && (
						<DeleteMealSection>
							<p>{onSearchResult?.name}</p>
							<img src={onSearchResult?.image} alt="" />
							<button onClick={sendForm}>Supprimer</button>
						</DeleteMealSection>
					)}
				</div>
			)}

			{whichFunction === "add-meal" && (
				<div>
					<Etapes>Etape 2: Choisir la famille de de ton plat</Etapes>

					<StyledSelect
						name="MealFamily"
						onChange={(e) => {
							setWhichFamily(e.target.value);
							setFamille(e.target.value);
						}}
					>
						<option value="">Famille</option>

						<option value="starters">Entrées</option>

						<option value="dishes">Plats</option>

						<option value="drinks">Boissons</option>

						<option value="afters">Desserts</option>
					</StyledSelect>

					{whichFamily && (
						<AddForm
							setName={setName}
							setImage={setImage}
							setDescription={setDescription}
							setPrice={setPrice}
							setFamille={setFamille}
							sendForm={sendForm}
						/>
					)}
				</div>
			)}

			{whichFunction === "modify-meal" && (
				<div>
					<h3>Etape 2: Trouver le plat que tu veux modifier</h3>

					<SeachMeal type="search" onChange={searchMealId} />

					<p
						className="results"
						onClick={() => {
							setMealId(onSearchResult?._id);
							setName(onSearchResult?.name);
							setImage(onSearchResult?.image);
							setDescription(onSearchResult?.description);
							setPrice(onSearchResult?.price);
							setFamille(onSearchResult?.famille);
						}}
					>
						{onSearchResult?.name}
					</p>

					{mealId && (
						<ModifyForm
							setName={setName}
							name={name}
							setImage={setImage}
							image={image}
							setDescription={setDescription}
							description={description}
							setPrice={setPrice}
							price={price}
							setFamille={setFamille}
							famille={famille}
							sendForm={sendForm}
						/>
					)}
				</div>
			)}

			<ServerResponse>{servRes}</ServerResponse>
		</GlobalContainer>
	);
}

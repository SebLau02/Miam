import React from "react";

export default function ModifyForm({
	name,
	setName,
	image,
	setImage,
	description,
	setDescription,
	price,
	setPrice,
	famille,
	setFamille,
	sendForm,
}) {
	return (
		<section>
			<h3>Formulaire de supression</h3>

			<form onSubmit={sendForm} className="formulaires">
				<label>
					Nom:
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>

				<label>
					Image:
					<input
						type="text"
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>
				</label>

				<label>
					Description:
					<textarea
						type="text"
						value={description}
						rows="5"
						cols="33"
						onChange={(e) => setDescription(e.target.value)}
					/>
				</label>

				<label>
					Prix:
					<input
						type="text"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</label>

				<label>
					Famille:
					<select
						onChange={(e) => setFamille(e.target.value)}
						className="famille"
						value={famille}
					>
						<option value="entree">Entrée</option>
						<option value="plat">Plat</option>
						<option value="boisson">Boisson</option>
						<option value="dessert">Dessert</option>
					</select>
				</label>

				<button type="submit">Modifier</button>
			</form>
		</section>
	);
}

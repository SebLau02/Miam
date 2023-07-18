import React from "react";

export default function AddForm({
	setName,
	setImage,
	setDescription,
	setPrice,
	setFamille,
	sendForm,
}) {
	return (
		<section>
			<h3>Formulaire d'ajout</h3>
			<form onSubmit={sendForm} className="formulaires">
				<label>
					Nom:
					<input
						type="text"
						onChange={(e) => setName(e.target.value)}
						required="required"
					/>
				</label>

				<label>
					Image:
					<input
						type="text"
						onChange={(e) => setImage(e.target.value)}
						required="required"
					/>
				</label>

				<label>
					Description:
					<textarea
						type="text"
						rows="5"
						cols="33"
						onChange={(e) => setDescription(e.target.value)}
						required="required"
					/>
				</label>

				<label>
					Prix:
					<input
						type="text"
						onChange={(e) => setPrice(e.target.value)}
						required="required"
					/>
				</label>

				<label>
					Famille:
					<select
						onChange={(e) => setFamille(e.target.value)}
						className="famille"
						required="required"
					>
						<option value="">Famille</option>
						<option value="entree">Entrée</option>
						<option value="plat">Plat</option>
						<option value="boisson">Boisson</option>
						<option value="dessert">Dessert</option>
					</select>
				</label>

				<button type="submit">Ajouter</button>
			</form>
		</section>
	);
}

import React from "react";
import "./index.css";

export default function Loader() {
	return (
		<section class="loader-container">
			<div class="loader">
				<svg
					width="94"
					height="82"
					viewBox="0 0 84 72"
					fill="#303030"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M42.866 2.5L80.9711 68.5C81.356 69.1667 80.8749 70 80.1051 70H3.89488C3.12508 70 2.64396 69.1667 3.02886 68.5L41.134 2.5C41.5189 1.83333 42.4811 1.83333 42.866 2.5Z"
						stroke="#000000"
						stroke-width="4"
					/>
				</svg>

				<svg
					width="84"
					height="72"
					viewBox="0 0 84 72"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="move"
				>
					<path
						d="M42.866 2.5L80.9711 68.5C81.356 69.1667 80.8749 70 80.1051 70H3.89488C3.12508 70 2.64396 69.1667 3.02886 68.5L41.134 2.5C41.5189 1.83333 42.4811 1.83333 42.866 2.5Z"
						stroke="#edc24b"
						stroke-width="4"
					/>
				</svg>
			</div>
		</section>
	);
}

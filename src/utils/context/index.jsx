import React, { useEffect, useState, createContext } from "react";

import apiUrl from "../apiUrl";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [orders, setOrders] = useState([]);
	const [isLoadind, setIsLoading] = useState(true);

	const getOrdersFunc = () => {
		fetch(apiUrl + `/miam/order/get-orders`, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setOrders(data.orders);
				setIsLoading(false);
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		const storedOrders = JSON.parse(localStorage.getItem("miamOrders"));

		if (storedOrders) {
			setOrders(storedOrders);
		}

		getOrdersFunc();
	}, []);

	useEffect(() => {
		localStorage.setItem("miamOrders", JSON.stringify(orders));
	}, [orders]);

	return (
		<UserContext.Provider value={{ orders, setOrders, isLoadind }}>
			{children}
		</UserContext.Provider>
	);
};

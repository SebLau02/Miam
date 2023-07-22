import React, { useEffect, useState, createContext } from "react";
import apiUrl from "../apiUrl";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [orders, setOrders] = useState();
	const [isLoadind, setIsLoading] = useState(true);

	useEffect(() => {
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
	}, []);

	return (
		<UserContext.Provider value={{ orders, setOrders, isLoadind }}>
			{children}
		</UserContext.Provider>
	);
};

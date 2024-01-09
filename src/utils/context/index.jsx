import React, { useEffect, useState, createContext } from "react";
import io from "socket.io-client";

import apiUrl from "../apiUrl";

const socket = io.connect(apiUrl);

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [orders, setOrders] = useState([]);
	const [isLoadind, setIsLoading] = useState(true);

	useEffect(() => {
		const storedOrders = JSON.parse(localStorage.getItem("miamOrders"));

		if (storedOrders) {
			setOrders(storedOrders);
		}
	}, []);

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setOrders((prevCommandes) => [...prevCommandes, data.order]);
		});
	}, [socket]);

	useEffect(() => {
		localStorage.setItem("miamOrders", JSON.stringify(orders));
	}, [orders]);

	return (
		<UserContext.Provider value={{ orders, setOrders, isLoadind }}>
			{children}
		</UserContext.Provider>
	);
};

import { useState, useEffect, useRef } from "react";

export const useFetch = (url) => {
	// Tenemos una variable que cuándo cambia no recarga el componente
	const isMounted = useRef(true);

	const [state, setState] = useState({
		data: null,
		loading: true,
		error: null,
	});

	useEffect(() => {
		//Cuando se desmonta
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		// Resteamos la data
		setState({ loading: true, error: null, data: null });
		fetch(url)
			.then((resp) => resp.json())
			.then((data) => {
				// setTimeout(() => {
				// Solo modificamos el state si el componente está montado
				if (isMounted.current) {
					setState({
						loading: false,
						error: null,
						data,
					});
				}
				// }, 4000);
			})
			.catch(() => {
				setState({
					data: null,
					loading: false,
					error: 'No se pudo cambiar la info',
				});
			});
	}, [url]);

	return state;
};

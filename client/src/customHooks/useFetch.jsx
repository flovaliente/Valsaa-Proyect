import { useEffect, useState } from "react";

export const useFetch = (url) =>{
    const [ data, setData ] = useState();
    const [ loading, setLoading ] = useState(true); //Lo pongo en true pq el fetch esta cargando
    const [ error, setError ] = useState(false); //Lo pongo en false pq se supone que no hay error, si lo llega a haber se cambia a true dentro del useFetch

    useEffect(() =>{
        fetch(url)
        .then(res => res.json())
        .then(res => {
            setData(res)
        })
        .catch(e => {
            setError(true);
            console.error(e);
        })
        .finally(() => setLoading(false))
    }, [url]);  

    return { data, loading, error };
}
import React, {createContext, useState, useContext} from 'react';

const Context = createContext();

export default function GlobalContext({children}) {
  const [userSession, setUserSession] = useState({
    id: null,
    name: null,
  });
  const [client, setClient] = useState(null);
  const [indexClient, setIndexClient] = useState(null);
  const [searched, setSearched] = useState('');
  const [sector, setSector] = useState({
    id: 0,
    description: 'Selecciona un sector',
  });

  return (
    <Context.Provider
      value={{
        userSession,
        client,
        sector,
        indexClient,
        searched,
        setUserSession,
        setClient,
        setSector,
        setIndexClient,
        setSearched,
      }}>
      {children}
    </Context.Provider>
  );
}

export function useGlobalContext() {
  return useContext(Context);
}

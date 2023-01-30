import { createContext, useContext, useState } from 'react';

export const JwtContext = createContext();

export function JwtProvide({ children }) {
  const [jwt, setJwt] = useState('');
  return (
    <JwtContext.Provider value={{ jwt, setJwt }}>
      {children}
    </JwtContext.Provider>
  );
}

export function useJwt() {
  return useContext(JwtContext);
}

"use client";

// import { Provider } from "jotai";

type Type = React.FC<{ children: React.ReactNode }>;

export const JotaiProvider: Type = ({ children }) => {
  return (
    <>
      {/* <Provider> */}
      {children}
      {/* </Provider>; */}
    </>
    //
  );
};

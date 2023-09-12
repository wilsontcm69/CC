import React, { useState, useContext, createContext } from "react";

const UserRoleContext = createContext();
const UserRoleUpdateContext = createContext();

export function useUserRole() {
    return useContext(UserRoleContext);
}

export function useUserRoleUpdate() {
    return useContext(UserRoleUpdateContext);
}

export function UserRoleProvider({ children }) {
    const [userRole, setUserRole] = useState("");

    function setForUserRole(role) {
        setUserRole(role);
    }

    return (
      <UserRoleContext.Provider value={userRole}>
        <UserRoleUpdateContext.Provider value={setForUserRole}>
        {children}
        </UserRoleUpdateContext.Provider>
      </UserRoleContext.Provider>
    );
}
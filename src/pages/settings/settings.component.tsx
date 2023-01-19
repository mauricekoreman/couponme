import { useAuth } from "../../context/auth-context";

export const Settings = () => {
  const { signOut } = useAuth();

  return (
    <div>
      <h1>Settings screen</h1>
      <button type='button' onClick={signOut}>
        Sign out
      </button>
    </div>
  );
};


import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { authAtom } from "_state";
import { useUserActions } from "_actions";

export { Nav };

function Nav() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();

  // only show nav when logged in
  if (!auth) return null;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav">
        <NavLink exact to="/" className="nav-item nav-link">
          AnaSayfa
        </NavLink>
        <NavLink to="/service-jobs" className="nav-item nav-link">
          Servisler
        </NavLink>
        <NavLink to="/users" className="nav-item nav-link">
          Kullanıcılar
        </NavLink>
        <button
          type="button"
          className="link-button nav-item nav-link"
          onClick={userActions.logout}
        >
          Çıkış
        </button>
      </div>
    </nav>
  );
}

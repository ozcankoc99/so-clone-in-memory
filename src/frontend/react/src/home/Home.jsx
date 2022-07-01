import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { authAtom } from "_state";

export { Home };

function Home() {
  const auth = useRecoilValue(authAtom);

  return (
    <div className="p-4">
      <div className="container">
        <h1>Merhaba {auth?.firstName}!</h1>
        <p>AXA GeoLocation Uygulamasına hoşgeldiniz</p>
        <p>
          <Link to="/users">Kullanıcıları Yönet</Link>
        </p>
      </div>
    </div>
  );
}

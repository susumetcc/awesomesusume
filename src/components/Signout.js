import React from 'react';
import { auth } from '../firebase';

function logout() {
    auth.signOut();
    window.location.href = "/";
}

const Signout = () => (
  <div>
    サインアウトする場合は、「サインアウト」を押してください。
    <button onClick={ logout() }>サインアウト</button>
  </div>
);

export default Signout;
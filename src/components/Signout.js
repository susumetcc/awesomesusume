import React from 'react';
import { auth } from '../firebase';

async function logout() {
    auth.signOut();
    await new Promise(resolve => setTimeout(resolve, 3000));
    window.location.href = "/";
}

function Signout() {
  logout();
  return (
    <div>
      サインアウトしました。<br/>まもなくメインページに移動します。
    </div>
  )
};

export default Signout;
import React from 'react';


const ProfilePage = () => {

    const username = user.username
  return (    
    <div>
        <header>
            Welcome to you profile!! { username }
        </header>
        {/* <% if(user) { %> 
        <li><a href='/auth/logout'>Log Out</a></li>
        <% } else { %>
        <li><a href='/auth/login'>Log In</a></li>
        <% }  %> */}
    </div>
  );
}

export default ProfilePage;
let regUsers = [];

/* Function to check if the user exists */
function doesExist(users, username)
{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

/* Function to check if the user is authenticated */
function authenticatedUser(users, username, password){
    let validusers = users.filter((user)=>{
      return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
      return true;
    } else {
      return false;
    }
  }

  module.exports = { doesExist, authenticatedUser, regUsers };
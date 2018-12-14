const users = [
{   
    _id: "12345678",    //generate a uuid here
    username:"mimaoda",
    password:"quidditch",
    hashedPassword:"$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
    profile:{
        name:"mimao da",
        hobby:"Coffee related tasks",
        gender:"male",
        _id:"7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310"
    },
    pokemon_team:[{
        name:"pikachu",
        cp:"123",
        iv:"123",
        capturetime:"2018/11/11"
    }]
}


]

function findUserByUserName(username) {
  return new Promise((resolve, reject) => {
    for(let user of users) { //find user with username and verify password
      if(user.username === username) {
        resolve(user);
        }
      } 
    reject(new Error("Could not find user"));    //otherwise return an error           
    });
  }


module.exports = {
  findUserByUserName: findUserByUserName
};

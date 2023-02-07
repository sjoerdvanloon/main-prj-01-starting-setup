// 📁 say.js
function convertCoachDtoToCoachState(key, x) {
  const coach = {
    firstName: x.data[key].firstName,
    lastName: x.data[key].lastName,
    description: x.data[key].description,
    areas: x.data[key].areas,
    hourlyRate: x.data[key].hourlyRate,
    id: key,
  };

  return coach;
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export { convertCoachDtoToCoachState, sayBye }; // a list of exported variables

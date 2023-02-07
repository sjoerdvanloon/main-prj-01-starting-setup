export function convertCoachDtoToCoachState(key, data) {
  const coach = {
    firstName: data[key].firstName,
    lastName: data[key].lastName,
    description: data[key].description,
    areas: data[key].areas,
    hourlyRate: data[key].hourlyRate,
    id: key,
  };

  return coach;
}

//export  { convertCoachDtoToCoachState };

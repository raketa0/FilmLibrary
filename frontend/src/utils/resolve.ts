export function resolveGenres(ids: number[], genres: any[]) {
  return ids
    .map(id => genres.find(g => g.id === id))
    .filter(Boolean);
}

export function resolvePersons(persons: any[], allPersons: any[]) {
  return persons
    .map(p => {
      const person = allPersons.find(ap => ap.id === p.personId);
      if (!person) return null;
      return {
        name: person.name,
        career: person.careerName,
      };
    })
    .filter(Boolean);
}
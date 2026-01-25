export type PersonDto = {
  id: number;
  name: string;
  careerId: number;
  careerName: string;
  linkToPhoto?: string;
};

export type CreatePersonDto = {
  name: string;
  careerId: number;
  dateOfBirth: Date;
  linkToPhoto?: string;
};

export type CareerDto = {
  id: number;
  name: string;
};



export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

export class Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    this.species = data.species;
    this.type = data.type;
    this.gender = data.gender;
    this.origin = data.origin;
    this.location = data.location;
    this.image = data.image;
    this.episode = data.episode;
    this.url = data.url;
    this.created = new Date(data.created);
  }
}

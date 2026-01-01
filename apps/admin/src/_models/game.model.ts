export type IGame = {
  id?: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IGameForm = Omit<IGame, 'createdAt' | 'updatedAt'>;

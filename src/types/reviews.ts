export type Review = {
  id: string;
  date: string;
  comment: string;
  rating: number;
  user: {
    avatarUrl: string;
    isPro: boolean;
    userName: string;
  };
};

export type Reviews = Review[];

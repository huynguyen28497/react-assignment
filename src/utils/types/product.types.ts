export interface IProduct {
  uuid: string;
  name: string;
  description: string;
  rank: number;
  status: string;
  justDropped: boolean;
  imageUrls: string[];
  isDeleted: boolean;
  seo: string;
  createdAt: string;
  updatedAt: string;
}

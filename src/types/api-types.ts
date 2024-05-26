import { ProductI, UserI } from ".";

export type MessageResponse = {
  id: string;
};

export type LogoutResponse = object;
export type LogoutRequest = object;

export type ProductsResponse = { products: ProductI[] };
export type ProductResponse = { product: ProductI };

export type UsersResponse = { users: UserI[] };
export type UserResponse = { users: UserI };

export type ProductBulkDeleteResponse = {
  ids: string[];
  deletedCount: number;
  success: boolean;
};

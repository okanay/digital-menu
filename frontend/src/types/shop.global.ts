interface Shop {
  uniqueId: string;
  name: string;
  slug: string;
  menuCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

type CreateShopReq = {
  name: string;
};

type CreateShopRes = {
  status: StatusTypes;
  error: string | null;
};

type UpdateShopReq = {
  uniqueId: string;
  name?: string;
  isActive?: boolean;
};

type UpdateShopRes = {
  status: StatusTypes;
  error: string | null;
};

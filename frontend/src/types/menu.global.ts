interface MenuData {
  shopUniqueId: string;
  uniqueId: string;
  name: string;
  type: number;
  json: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

type CreateMenuReq = {
  shopUniqueId: string;
  name: string;
  type: number;
  json: string;
};

type CreateMenuRes = {
  status: FetchStatus;
  error: string | null;
};

type UpdateMenuReq = {
  uniqueId: string;
  name?: string;
  type?: number;
  json?: string;
  isActive?: boolean;
};

type UpdateMenuRes = {
  status: FetchStatus;
  error: string | null;
};

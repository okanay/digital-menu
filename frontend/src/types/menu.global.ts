interface MenuData {
  shopUniqueId: string;
  uniqueId: string;
  name: string;
  type: number;
  json: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  isTestData?: boolean;
}

type CreateMenuReq = {
  shopUniqueId: string;
  name: string;
  type: number;
  json: string;
};

type CreateMenuRes = {
  status: StatusTypes;
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
  status: StatusTypes;
  error: string | null;
};

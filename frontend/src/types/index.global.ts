type Children = {
  children: React.ReactNode;
};

type ComponentWithChildren<P = {}> = React.FC<P & Children>;

type FetchStatus = "initial" | "loading" | "error" | "success" | "not-found";

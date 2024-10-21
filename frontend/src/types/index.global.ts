type Children = {
  children: React.ReactNode;
};

type ComponentWithChildren<P = {}> = React.FC<P & Children>;

type StatusTypes =
  | "idle"
  | "initial"
  | "loading"
  | "error"
  | "success"
  | "not-found"
  | "updating";

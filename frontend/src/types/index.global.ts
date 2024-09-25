type Children = {
  children: React.ReactNode;
};

type ComponentWithChildren<P = {}> = React.FC<P & Children>;

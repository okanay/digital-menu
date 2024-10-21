declare global {
  type NodeWrapperProps = {
    className?: string;
    children: React.ReactNode;
  };
}

export const DefaultNodeWrapper: React.FC<NodeWrapperProps> = ({
  className,
  children,
}) => <div className={className}>{children}</div>;

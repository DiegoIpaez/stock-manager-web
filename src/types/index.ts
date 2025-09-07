export * from './user.type';
export type NextParams = { params: Promise<{ id: string }> };

export type MenuItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  children?: MenuItem[];
};

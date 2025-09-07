export const formatInitials = ({
  firstName,
  lastName,
  fallback = 'AU',
}: {
  firstName?: string;
  lastName?: string;
  fallback?: string;
}) => {
  if (!firstName && !lastName) return fallback;
  const firstInitial = firstName?.charAt?.(0)?.toLocaleUpperCase?.() ?? '';
  const lastInitial = lastName?.charAt?.(0)?.toLocaleUpperCase?.() ?? '';
  return `${firstInitial}${lastInitial}`;
};

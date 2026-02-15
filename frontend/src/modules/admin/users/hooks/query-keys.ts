export const adminUsersQueryKeys = {
  usersBase: () => ["admin-users-table"] as const,
  getAllUsers: (params?: { search?: string; page?: number; limit?: number }) =>
    params
      ? ([...adminUsersQueryKeys.usersBase(), params] as const)
      : adminUsersQueryKeys.usersBase(),
  getUserAvatar: (userId: string) => ["user-avatar", userId] as const,
};

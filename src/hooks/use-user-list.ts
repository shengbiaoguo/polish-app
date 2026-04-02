import { useQuery } from '@tanstack/react-query'

import { getUserListApi } from '@/api/modules/user'
import { QUERY_KEYS } from '@/constants/query-key'
import type { UserListParams } from '@/types/user'

export const useUserList = (params: UserListParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.userList, params],
    queryFn: async () => {
      const res = await getUserListApi(params)
      return res.data
    },
  })
}

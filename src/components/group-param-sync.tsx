'use client'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export function GroupParamSync() {
  const params = useParams() as Record<string, string | string[] | undefined>
  const gid = typeof params?.groupId === 'string' ? params.groupId : Array.isArray(params?.groupId) ? params.groupId?.[0] : undefined
  useEffect(() => {
    if (gid) {
      try {
        document.cookie = `currentGroupId=${gid}; path=/; SameSite=Lax`
      } catch {}
    }
  }, [gid])
  return null
}
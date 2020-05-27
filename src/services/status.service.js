import { axiosData } from '@/core/api/dataApi'

class StatusService {
  setStatus (userStatus, userId) {
    return axiosData.patch(`/users/${userId}.json`, {
      status: userStatus
    })
  }

  getStatus (userId) {
    return axiosData.get(`/users/${userId}/status.json`)
  }
}

export const statusService = new StatusService()

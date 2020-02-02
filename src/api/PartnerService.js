import Api from '@/api'

export default {
  index (partners) {
    return Api().get('partners', partners)
  },
  show (id) {
    return Api().get(`partners/${id}`)
  },
  post (partner) {
    return Api().post('partners', partner)
  },
  put (partner) {
    return Api().put(`partners/${partner._id}`, partner)
  },
  remove (partner) {
    return Api().delete(`partners/${partner._id}`)
  }
}

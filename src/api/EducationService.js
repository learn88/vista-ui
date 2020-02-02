import Api from '@/api'

export default {
  index (educations) {
    return Api().get('educations', educations)
  },
  show (id) {
    return Api().get(`educations/${id}`)
  },
  post (education) {
    return Api().post('educations', education)
  },
  put (education) {
    return Api().put(`educations/${education._id}`, education)
  },
  remove (education) {
    return Api().delete(`educations/${education._id}`)
  }
}

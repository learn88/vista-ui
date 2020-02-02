import Api from '@/api'

export default {
  index (companys) {
    return Api().get('companys', companys)
  },
  show (id) {
    return Api().get(`companys/${id}`)
  },
  post (company) {
    return Api().post('companys', company)
  },
  put (company) {
    return Api().put(`companys/${company._id}`, company)
  },
  remove (company) {
    return Api().delete(`companys/${company._id}`)
  }
}

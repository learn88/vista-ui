import Api from '@/api'

export default {
  index (categories) {
    return Api().get('categories', categories)
  },

  getCategoryName (name) {
    return Api().get(`categories-name/${name}`, name)
  },
  show (id) {
    return Api().get(`categories/${id}`)
  },
  post (category) {
    return Api().post('categories', category)
  },
  put (category) {
    return Api().put(`categories/${category._id}`, category)
  },
  remove (category) {
    return Api().delete(`categories/${category._id}`)
  }
}

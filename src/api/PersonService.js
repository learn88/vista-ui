import Api from "@/api";

export default {
  index(categories, persons) {
    return Api().get(`${"persons/?c=" + categories}`, persons);
  },
  show(id) {
    return Api().get(`persons/${id}`);
  },
  post(person) {
    return Api().post("persons", person);
  },
  put(person) {
    return Api().put("persons", person);
    // return Api().put(`persons/${person._id}`, person)
  },
  remove(person) {
    return Api().delete(`persons/${person._id}`);
  },

  // for Resume Count

  resume_count(persons) {
    return Api().get("persons-resume", persons);
  },

  // Image Upload Gallery
  imageUplad(image) {
    return Api().post("image-upload", image);
  }
};

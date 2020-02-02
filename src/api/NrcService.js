import Api from "@/api";

export default {
  index(nrclists) {
    return Api().get("nrc-lists", nrclists);
  },
  show(id) {
    return Api().get(`nrc-lists/${id}`);
  },
  post(nrclist) {
    return Api().post("nrc-lists", nrclist);
  },
  put(nrclist) {
    return Api().put("nrc-lists", nrclist);
  },
  remove(nrclist) {
    return Api().delete(`nrc-lists/${nrclist._id}`);
  }
};

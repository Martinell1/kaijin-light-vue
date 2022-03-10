import axios from './axios'

const upload = async () => {
  return await axios.post("common/upload")
}

const toQiNiu= async (form: FormData) => {
  return await axios.post("http://upload-cn-east-2.qiniup.com", form)
}

export {
  upload,
  toQiNiu
}

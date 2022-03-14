import axios from './axios'

const uploadImage = async () => {
  return await axios.post("home/uploadImage")
}

const toQiNiu= async (form) => {
  return await axios.post("http://upload-cn-east-2.qiniup.com", form)
}

const uploadFile = async (params) => {
  return await axios.post("home/uploadFile",params)
}

export {
  uploadImage,
  toQiNiu,
  uploadFile
}

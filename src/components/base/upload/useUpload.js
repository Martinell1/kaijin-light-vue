import { uploadImage, toQiNiu } from '@/api/home'
export default function useUpload(){

    const fetchToken = async()=>{
        let { data: token } = await uploadImage();
        return token
    }

    const uploadToQiniu = async(form)=>{
        let { data: result } = await toQiNiu(form);
        return "http://qiniu.kaijinx.top/" + result.key
    }

    return {
        fetchToken,
        uploadToQiniu
    }
}

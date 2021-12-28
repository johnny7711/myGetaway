import { storage } from "~/plugins/firebase.js";
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";

export const actions = {
  async savePhoto(_, {shopId, files}) {

    const photosRef = ref(storage, `photos/${shopId}/hoge.jpg`)
    const uploadTask = uploadBytesResumable(photosRef, files[0])    

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')
    },
    (error) => {
      console.log(error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        console.log('File available at', downloadURL)
      })
    })
  },
};

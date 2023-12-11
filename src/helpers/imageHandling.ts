import { firebaseApp } from "@/firebaseConfig"
import store from "@/redux/store"
import { getDownloadURL, uploadBytes, ref, getStorage } from "firebase/storage"

export const uploadImagesAndReturnUrls = async (files: any) => {
    try {
        const imageRefs = await Promise.all(
            files.map((file: any) => {
                const storage = getStorage(firebaseApp)
                const storageRef = ref(storage, `products/${file.name}`)
                return uploadBytes(storageRef, file)
            })
        )
        const imageUrls = await Promise.all(
            imageRefs.map((imageRef: any) => getDownloadURL(imageRef.ref))
        )
        return imageUrls
    } catch (error: any) {
        throw new Error (error.message)
    }
}
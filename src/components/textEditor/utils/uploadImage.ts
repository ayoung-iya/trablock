import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, StorageReference } from 'firebase/storage';

import { storage, firestore } from '../../../../firebaseConfig';

async function uploadImage(file: File | null): Promise<string | undefined> {
  if (!file) {
    console.log('No file selected');
    return undefined;
  }

  try {
    // Create a storage reference
    const storageRef: StorageReference = ref(storage, `images/${file.name}`);

    // Upload the file
    await uploadBytes(storageRef, file);
    console.log('File uploaded');

    // Get the download URL
    const fileUrl: string = await getDownloadURL(storageRef);
    console.log('File URL:', fileUrl);

    // Add the file URL to the Firestore database
    await addDoc(collection(firestore, 'images'), { url: fileUrl, createdAt: new Date() });
    console.log('File URL added to Firestore');

    return fileUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    // Handle error without using alert
    return undefined; // Ensuring a consistent return type
  }
}

export default uploadImage;

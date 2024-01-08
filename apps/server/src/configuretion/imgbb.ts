import axios from "axios";



export async function uploadImage( base64Image: string) {
  const apiUrl = 'https://api.imgbb.com/1/upload';
  const apiKey = '0e4fa424c387d0f4bba4e5ed8cbb5bc2';
  const expirationTimeInSeconds = 600;
  try {
    const response = await axios.post(apiUrl, {
        key: apiKey,
        image: base64Image,
        expiration: expirationTimeInSeconds,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error.response.data);
    throw error;
  }
}


export async function handleImageUpload(base64Image: string) {
    try {
      const response = await uploadImage(base64Image);
      if (response && response.success) {
        console.log('Image uploaded successfully:', response.data);
      } else {
        console.error('Image upload failed:', response);
        // כאן תוכל להשתמש במידע מה response למערכת הממשק או הלקוח
        // לדוג', הצגת הודעת שגיאה למשתמש
      }
    } catch (error) {
      console.error('Error handling image upload:', error);
      // כאן תוכל להטיל על השגיאה ולעשות דברים נוספים
    }
  }
  
  // קריאה לפונקציה כאשר אתה מוכן להעלות תמונה
  handleImageUpload('מחרוזת Base64 של התמונה שאתה רוצה להעלות');
  
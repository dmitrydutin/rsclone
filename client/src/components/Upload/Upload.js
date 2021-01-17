import { cloudinary } from '../../api/api';

const Upload = () => {
    const uploadImage = async (e) => {
        const response = await cloudinary.uploadImage(e.target.files[0]);
        const imageURL = response.data.secure_url;
        console.log('imageURL', imageURL);
    };

    return (
        <main>
            <input
                type="file"
                placeholder="Upload an image"
                onChange={uploadImage}
            />
        </main>
    );
};

export default Upload;

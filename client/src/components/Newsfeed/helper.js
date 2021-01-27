import { cloudinary } from '../../api/api';

function getToday() {
    let d = new Date();
    let curr_date = d.getDate();
    let curr_month = d.getMonth() + 1;
    let curr_year = d.getFullYear();
    return curr_year + '-' + curr_month + '-' + curr_date;
}

const uploadImage = async (file) => {
    if (file) {
        const response = await cloudinary.uploadImage(file);
        const imageURL = response.data.secure_url;
        return imageURL;
    }
    return '';
};

export { getToday, uploadImage };

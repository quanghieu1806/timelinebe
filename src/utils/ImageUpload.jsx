import parse from "html-react-parser";

export const imageUpload = async (image) => {
    let imgArr = [];
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "ncpanat5");
    formData.append("cloud_name", "khanhbatluc");

    const res = await fetch(
        "https://api.cloudinary.com/v1_1/khanhbatluc/auto/upload",
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await res.json();
    return data.secure_url;
};

export const converstTimeDate = (string) => {
    const date = new Date(string).toLocaleString();
    return date
} 

export const getDataLocalStorage = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
}

export const showTitle = (status) => {
    let string = "Trạng Thái "
    switch (status) {
        case 'request':
            return string += 'Yêu Cầu';

            case 'progress':
                return    string += 'Đang Làm';

            case 'pending':
                return  string += 'Chờ Duyệt';

            case 'update':
                return  string += 'Sửa';
    
            case 'done':
                return   string += 'Hoàn Thành';


    
        default: return string += 'Yêu Cầu';

    }
}
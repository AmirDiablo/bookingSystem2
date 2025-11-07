import { useState, useEffect } from "react";
import { useUser } from "../context/userContext";

const EdditProfile = () => {
    const {user} = useUser()
    const [file, setFile] = useState()
    const [preview, setPreview] = useState(null)
    const [username, setUsername] = useState(user.userInfo[0].username)
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState()
    const [errro, setError] = useState(null)


    const save = async () => {
        setSaving(true);
        if (username) {
            const formData = new FormData();
            formData.append("name", username);

            // فقط اگر فایل جدید انتخاب شده باشه، اضافه کن
            if (file instanceof File) {
                formData.append("profile", file);
            }

            const response = await fetch("http://localhost:3000/api/user/editProfile", {
                method: "PATCH",
                body: formData,
                headers: {
                    "authorization": `Bearer ${user?.token}`,
                }
            });

            const json = await response.json();

            if (response.ok) {
                setSaving(false);
                setError(null);
            } else {
                setSaving(false);
                setError(json.message);
            }
        }
    };


    const chnagePreview = (e)=> {
        setFile(e.target.files[0])
        const files = e.target.files[0]
        if(files) {
            const reader = new FileReader()
            reader.onloadend = ()=> {
                setPreview(reader.result)
            }

            reader.readAsDataURL(files)
        }
    }

    return ( 
        <div>

            <button onClick={save} className="border-1 border-white rounded-2xl p-3 ">Save</button>

            <div className="relative mt-10">
                    {preview ? <img src={preview} alt="cover" className="w-45 object-cover rounded-full aspect-square mx-auto" /> : <img src={user.userInfo[0].avatar} alt="cover" className="w-45 object-cover aspect-square mx-auto rounded-full" />}
                    <input onChange={chnagePreview} type="file" name="profile" id="profile" className="opacity-0 absolute top-0 left-[50%] -translate-x-[50%] w-45 aspect-square rounded-full" />
            </div>
            <div className="flex flex-col w-[90%] mx-auto mt-10">
                <label >Username</label>
                <input type="text" className="text-center text-black bg-white text-xl focus:outline-none border-1 rounded-2xl p-2 " onChange={(e)=> setUsername(e.target.value)} value={username} />
            </div>

            
        </div>
     );
}
 
export default EdditProfile;
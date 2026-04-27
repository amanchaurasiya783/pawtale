"use client";
import { useState } from "react";

export default function Upload() {
  const [image, setImage] = useState(null);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(image);

    try {
      const data = new FormData();
      data.set("file", image);
      const result = await fetch(`/api/blogs/upload`, {
        method: "POST",
        body: data,
      });
      if (!result.ok) throw new Error("Failed to upload file");
      const res = await result.json();
      console.log(res);
      alert("File uploaded successfully");
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return (
    <div className="my-5 px-2 w-full mx-auto container justify-center flex flex-col md:flex-row">
      <form onSubmit={onSubmit} className="w-full md:w-2/3 shadow-lg p-4">
        <input type="file" onChange={(e) => setImage(e.target.files?.[0])} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

/*
File {name: 'aman43kb.jpg', lastModified: 1736224191638, lastModifiedDate: Tue Jan 07 2025 09:59:51 GMT+0530 (India Standard Time), webkitRelativePath: '', size: 44081, …}
lastModified
: 
1736224191638
lastModifiedDate
: 
Tue Jan 07 2025 09:59:51 GMT+0530 (India Standard Time)
[[Prototype]]
: 
Object
name
: 
"aman43kb.jpg"
size
: 
44081
type
: 
"image/jpeg"
webkitRelativePath
: 
""
[[Prototype]]
: 
File
lastModified
: 
(...)
lastModifiedDate
: 
(...)
name
: 
(...)
webkitRelativePath
: 
(...)
constructor
: 
ƒ File()
Symbol(Symbol.toStringTag)
: 
"File"
size
: 
44081
type
: 
"image/jpeg"
get lastModified
: 
ƒ lastModified()
get lastModifiedDate
: 
ƒ lastModifiedDate()
get name
: 
ƒ name()
get webkitRelativePath
: 
ƒ webkitRelativePath()
[[Prototype]]
: 
Blob
*/

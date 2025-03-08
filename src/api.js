/**
 * 获取图片总数
 * GET http://127.0.0.1:8000/api/img_total
 * 暂时不处理返回值，直接输出到控制台.
 */
export function getImgTotal() {
    fetch("http://127.0.0.1:8000/api/img_total")
        .then((response) => response.text())
        .then((data) => console.log(data))
        .catch((error) => console.error("请求失败:", error))
}

/**
 * 获取指定ID的图片文件
 * GET http://127.0.0.1:8000/img/{pic_id}
 * 返回类型： 文件
 */
export function getIdImage(pic_id) {
    fetch(`http://127.0.0.1:8000/img/${pic_id}`)
        .then((response) => response.blob())
        .then((blob) => console.log(blob))
        .catch((error) => console.error("请求失败:", error))
}

/**
 * 上传图片到服务器
 * POST http://127.0.0.1:8000/upload/
 * 参数： imageFile (File 对象)
 * 返回类型： Json
 */
export function postImg(imageFile) {
    const formData = new FormData()
    formData.append("img", imageFile)
    fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.error("请求失败:", error))
}

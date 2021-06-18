// functions to convert an image file into base 64

const getBase64 = (file, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(file)
}

// accepts the file and useState SET function to update a state variable
export const createImageString = (file, setVar) => {
    getBase64(file, (base64ImageString) => {
        setVar(base64ImageString)
    });
}
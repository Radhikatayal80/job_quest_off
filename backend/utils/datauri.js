import DataUriParser from "datauri/parser.js"
import path from "path";

const getDataUri = (file) => {
    if (!file) {
        throw new Error('File is required');
    }

    if (!file.originalname || !file.buffer) {
        throw new Error('Invalid file format: originalname and buffer are required');
    }

    try {
        const parser = new DataUriParser();
        const extName = path.extname(file.originalname).toString();
        return parser.format(extName, file.buffer);
    } catch (error) {
        throw new Error(`Error processing file: ${error.message}`);
    }
}

export default getDataUri;
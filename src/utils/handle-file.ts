import path from "path";

const handlePath = (
    filePath: string,
    baseUrl: string = path.resolve(process.cwd(), './src')
  ) => path.join(baseUrl, filePath)

export default handlePath
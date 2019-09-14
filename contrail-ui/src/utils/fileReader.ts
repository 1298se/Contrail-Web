export default (file: Blob): Promise<string | ArrayBuffer | null> => {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
        fileReader.onerror = () => {
            fileReader.abort();
            reject(new Error("Problem parsing file"));
        };

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.readAsText(file);
    });
};

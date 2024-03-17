async function postForm (data, url) {
    try {
        const response = await fetch(url, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response;
    }
    catch (error) {
        console.error("Error :", error);
    }
}

export default postForm;
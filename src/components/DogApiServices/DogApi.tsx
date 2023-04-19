export const getImages = (breed : string) => {
    return fetch(`https://dog.ceo/api/breed/${breed}/images`)
    .then((resp) => {
        if(resp.status === 200){
            return resp.json();
        }
    })
}
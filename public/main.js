const loadTweets = () => {
    const urlApiRest = `/api/tweets`;
    fetch(urlApiRest)
    .then(response => response.json())
    .then(json=>{
        if (json.items[0].tweets.length > 0) {
            const tweets = json.items[0].tweets;
            const texto = [];
            tweets.map(tweet => texto.push(`<h2>${tweet.user.name} dijo:</h2><h3>${tweet.content}</h3><h4>${tweet.createdAt}</h4></h5>comments: ${tweet.comments.length} likes: ${tweet.likes ? tweet.likes : 0}</h5>`));
            document.getElementById("tweets").innerHTML = texto.join("<br/><br/>");
        }else 
            alert(`no se pueden cargar los datos`);
    })
    .catch(error => alert(`no se pueden cargar los datos`));
};

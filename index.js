const APIURL = "https://api.github.com/users/";
const main= document.querySelector("#main");
const searchBox = document.querySelector("#search")
const getuser = async(username) =>{
    const response=await fetch(APIURL + username);
    const data = await response.json();
    const card= `
    <div class="card">
    <div>
        <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
    </div>
    <div class="userinfo">
        <h2>${data.name}</h2>
        <p>${data.bio}</p>

        <ul class="info">
            <li>${data.followers}<strong>Followers</strong></li>
            <li>${data.following}<strong>Following</strong></li>
            <li>${data.public_repos}<strong>Repos</strong></li>
        </ul>
        <div id="repos">

        </div>
    </div>
</div>
`
main.innerHTML=card;
getrepos(username);


}
//init call
getuser("iamHarshJain")

const getrepos = async (username) =>{
    const repos = document.querySelector("#repos");
    const response = await fetch(APIURL + username + "/repos");
    const data = await response.json();
    data.forEach(
        (item) => {
            const element = document.createElement("a");
            element.classList.add("repo");
            element.href=item.html_url    
            element.innerText=item.name
            element.target = "_blank"
            repos.appendChild(element)
        }
    )
     
}
const formSubmit = () => {
    if (searchBox.value != "") {
        getuser(searchBox.value);
        searchBox.value = ""
    }
    return false;
}


searchBox.addEventListener(
        "focusout",
        function() {
            formSubmit()
        }
    )

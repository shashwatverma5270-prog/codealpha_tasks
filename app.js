let user = localStorage.getItem("user");

// LOGIN
function login(){
  let u = document.getElementById("username").value;
  if(!u) return alert("Enter username");
  localStorage.setItem("user",u);
  window.location="feed.html";
}

// NAVIGATION
function goFeed(){ window.location="feed.html"; }
function goCreate(){ window.location="create.html"; }
function goProfile(){ window.location="profile.html"; }

// DB
function getPosts(){ return JSON.parse(localStorage.getItem("posts"))||[]; }
function savePosts(p){ localStorage.setItem("posts",JSON.stringify(p)); }

// IMAGE
function toBase64(file,cb){
  let r=new FileReader();
  r.onload=()=>cb(r.result);
  r.readAsDataURL(file);
}

// CREATE POST
function addPost(){
  let text=document.getElementById("text").value;
  let file=document.getElementById("img").files[0];

  if(file){
    toBase64(file,(img)=>save(text,img));
  } else save(text,"");
}

function save(text,img){
  let posts=getPosts();
  posts.unshift({user,text,img,likes:0,comments:[]});
  savePosts(posts);
  window.location="feed.html";
}

// LOAD FEED
if(document.getElementById("feed")) loadFeed();

function loadFeed(){
  let posts=getPosts();
  let box=document.getElementById("feed");
  box.innerHTML="";

  posts.forEach((p,i)=>{

    let commentsHTML = p.comments.map((c,ci)=>`
      <div style="font-size:12px;">
        <b>@${c.user}</b>: ${c.text}
        ${c.user===user?`<button onclick="deleteComment(${i},${ci})">❌</button>`:""}
      </div>
    `).join("");

    box.innerHTML+=`
      <div class="post">
        <b>@${p.user}</b>
        <p>${p.text}</p>
        ${p.img?`<img src="${p.img}">`:""}

        <button onclick="like(${i})">❤️ ${p.likes}</button>
        <button onclick="comment(${i})">💬</button>
        ${p.user===user?`<button onclick="deletePost(${i})">🗑</button>`:""}

        <div>${commentsHTML}</div>
      </div>`;
  });
}

// LIKE
function like(i){
  let p=getPosts();
  p[i].likes++;
  savePosts(p);
  loadFeed();
}

// COMMENT
function comment(i){
  let t=prompt("Enter comment");
  if(!t) return;

  let p=getPosts();
  p[i].comments.push({user,text:t});
  savePosts(p);
  loadFeed();
}

// DELETE POST
function deletePost(i){
  let p=getPosts();
  if(p[i].user!==user) return alert("Not allowed");
  p.splice(i,1);
  savePosts(p);
  loadFeed();
}

// DELETE COMMENT
function deleteComment(pi,ci){
  let p=getPosts();
  if(p[pi].comments[ci].user!==user) return alert("Not allowed");
  p[pi].comments.splice(ci,1);
  savePosts(p);
  loadFeed();
}

// PROFILE
if(document.getElementById("user")){
  document.getElementById("user").innerText="@"+user;

  let posts=getPosts().filter(p=>p.user===user);
  let box=document.getElementById("myPosts");

  posts.forEach(p=>{
    if(p.img) box.innerHTML+=`<img src="${p.img}">`;
  });

  loadFollow();
}

// FOLLOW
function loadFollow(){
  let f=JSON.parse(localStorage.getItem("follow"))||false;
  document.getElementById("followBtn").innerText=f?"Unfollow":"Follow";
}

function toggleFollow(){
  let f=JSON.parse(localStorage.getItem("follow"))||false;
  localStorage.setItem("follow",!f);
  loadFollow();
}
window.onload = function(){
  console.log("loaded");

  document.getElementById("toggleImage").addEventListener("click",toggleImageFunc);

  function toggleImageFunc(){
    console.log(this);
    if(document.getElementById('imageContainer').getAttribute("data-active")==="false"){
      document.getElementById('imageContainer').style.display = "inline-block";
      document.getElementById('imageContainer').setAttribute("data-active","true");
    }
    else{
      document.getElementById('imageContainer').style.display = "none";
        document.getElementById('imageContainer').setAttribute("data-active","false");
    }

  }
}

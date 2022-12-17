
const commentWrapper = document.querySelector(".comment-wrapper");
const commentInput = document.querySelector(".comment-input");
const addButton = document.querySelector(".add-button");


// const localStorageKey = "key";

// const StringToArray = () => {
//     const getString = JSON.getItem(localStorageKey);
//     if (!getString) {
//         return [];
//       }
//     return JSON.parse(getString);
// }

//store the all object of comment in the commentObjectArray
 const commentObjectArray = [];
//const commentObjectArray = StringToArray();

// const saveState = () =>{
//     const str = JSON.stringify(commentObjectArray);

//     localStorage.setItem(localStorageKey, str);
// }

//create a comment object, the object hold the given dada
const createObject = (commentText) => {
    return {
        id : Math.random(),
        like : 0,
        text : commentText,
        replies : [],
    }
}

const deleteComment = (comments, commentId) => {
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
  
      if (comment.id === commentId) {
        comments.splice(i, 1);
        return;
      }
  
      deleteComment(comment.replies, commentId);
    }
  };

// const deleteComment = (commentsArra, commentId) => {
//     console.log(commentsArra);
//     for(let i=0; i<commentsArra.length; i++){
//         if(commentsArra[i] === commentId){
//             commentsArra.splice(i, 1);
//             return;
//         }

//         deleteComment(commentsArra.replies, commentId);
//     }
// }



//create new commend node & button element and connect each other
const createNode = (commentObject) => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment", "hide-reply");

    const commentTextDiv = document.createElement("div");
    commentTextDiv.classList.add("comment-text");
    commentTextDiv.innerHTML = commentObject.text;

    const buttonAndLikesWrapperDiv = document.createElement("div");
    buttonAndLikesWrapperDiv.classList.add("button-and-likes-wrapper");
    
    const replyButton = document.createElement("button");
    replyButton.classList.add("button", "success");
    replyButton.innerHTML ="Reply";
    replyButton.onclick = () =>{
        commentDiv.classList.toggle("hide-reply");
    }

    const LikeButton = document.createElement("button");
    LikeButton.classList.add("button", "success");
    LikeButton.innerHTML = "Like";
    LikeButton.onclick = () => {
        commentObject.like ++;

        
        renderComments();
    }
    

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button", "delete");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = () => {
        deleteComment(commentObjectArray, commentObject.id);
        console.log(commentObjectArray);
        
        renderComments();
    }

    const likesTextDiv = document.createElement("div");
    likesTextDiv.classList.add("likes-text");
    likesTextDiv.innerHTML = `| ${commentObject.like} Likes`;


    // commentDiv.appendChild(commentContenerDiv);
    commentDiv.appendChild(commentTextDiv);
    commentDiv.appendChild(buttonAndLikesWrapperDiv);

    buttonAndLikesWrapperDiv.appendChild(replyButton);
    buttonAndLikesWrapperDiv.appendChild(LikeButton);
    buttonAndLikesWrapperDiv.appendChild(deleteButton);
    buttonAndLikesWrapperDiv.appendChild(likesTextDiv);


    //create replay box
    const replyWrapper = document.createElement("div");
    replyWrapper.classList.add("replay-wrapper");
 
    const replyInput = document.createElement("textarea");
    replyInput.classList.add("replay-input");
    replyInput.setAttribute("placeholder", "enter your reply here......");
 
    const replyAddButton = document.createElement("button");
    replyAddButton.classList.add("button", "success");
    replyAddButton.innerHTML ="add";
    replyAddButton.onclick = () => {
        if(replyInput.value === ""){
            alert("Please filled the replay box");
            return;
        }

        const commentId = commentObject.id;

        const newReplayObject = createObject(replyInput.value);
        // const findCommentobj = findCommentObject(commentObjectArray, commentId);
        commentObject.replies.push(newReplayObject);
        
        renderComments();
    }
 
    const deleteReplyButton = document.createElement("button");
    deleteReplyButton.classList.add("button", "delete");
    deleteReplyButton.innerHTML = "Cancel";
    deleteReplyButton.onclick = () => {
        replyInput.value = "";
        commentDiv.classList.toggle("hide-reply");
    }

    //creat a array of each commentObject replay and recursion to creat commentNode for the replays
    const replayCommentDomArray = commentObject.replies.map((replay) => {
        return createNode(replay);
    });

    commentDiv.appendChild(replyWrapper);

    replyWrapper.appendChild(replyInput);
    replyWrapper.appendChild(replyAddButton);
    replyWrapper.appendChild(deleteReplyButton);

    
    replayCommentDomArray.forEach((replayDom) => {
        commentDiv.appendChild(replayDom);
    });

    return commentDiv;

}



//link each child of comment-wrapper class with comment-wrapper class and render the all comments
function renderComments() {
    //each time 1st clear the all render comment
    commentWrapper.innerHTML ="";

    commentObjectArray.forEach((commentObject) => {
        const newCommentNode = createNode(commentObject);
        commentWrapper.appendChild(newCommentNode);
    });
}

//
const addComment = () => {
    //if input filled is empty, give a alert message and return
    if(commentInput.value === ""){
        alert("Please filled the comment box");
        return;
    }

    // when input box is not empty call function create object.
    const newCommentObject = createObject(commentInput.value);
    commentObjectArray.push(newCommentObject);

    commentInput.value = "";

    //call the renderComment function to render the all comments
    
    renderComments();
}


//add a click event on the add button
addButton.addEventListener("click", addComment);


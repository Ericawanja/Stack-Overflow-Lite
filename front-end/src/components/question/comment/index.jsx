function Comment({ single_comment}) {
 let {comment} =single_comment
  return (
    <div className="commentsList">
      <ol>
        <li>
         {comment}
        </li>
      </ol>
    </div>
  );
}
export default Comment;

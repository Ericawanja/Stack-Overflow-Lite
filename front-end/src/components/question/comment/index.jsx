function Comment({ single_comment}) {
 let {comment} =single_comment
  return (
    <div className="commentsList">
      <ul>
        <li>
         {comment}
        </li>
      </ul>
    </div>
  );
}
export default Comment;

function Comment(){
    return  <div className="answer_comment">
    <div className="answer_comment_header">
      <div className="comment_header">Comments</div>
      <div className="add_comment">
        <span className="comment_input">
          <input type="text" />
        </span>
        <span className="comment_btn">Add</span>
      </div>
    </div>
    <div className="commentsList">
      <ol>
        <li>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Unde dolores sed, esse quaerat eveniet voluptatum vitae
          magni repudiandae similique eos?
        </li>
      </ol>
    </div>
  </div>
}
export default Comment;
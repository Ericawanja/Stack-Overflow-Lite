import React from "react";

import { AiFillCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

function Question() {
  return (
    <div className="question-container">
      <div className="question_wrapper">
        <div className="question_header">
          <div className="question_title">The question title</div>
          <div className="question_creation_details">
            <span>Asked: Today</span>
            <span>Modified: Not Modified yet</span>
          </div>
        </div>
        <div className="question_description">
          <div className="question_votes">
            <div className="upvote">
              <IconContext.Provider value={{ color: "#100720", size: "42px" }}>
                <AiOutlineCaretUp />
              </IconContext.Provider>
            </div>
            <div className="votes">0</div>
            <div className="downvote">
              <IconContext.Provider value={{ color: "#100720", size: "42px" }}>
                <AiFillCaretDown />
              </IconContext.Provider>
            </div>
          </div>
          <div className="question_text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt
            adipisci iusto magnam fugiat voluptas! Id pariatur optio tempora
            earum assumenda nam velit, aspernatur, est eum quibusdam, laudantium
            adipisci vel fuga. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Aperiam nisi delectus quam dolor, id pariatur
            repellat magnam incidunt sed animi illum! Voluptatem molestiae quam
            consequatur minima delectus quisquam? Harum, dolorum?
          </div>
        </div>
        <div className="answers_container">
          <div className="answers_header">Answers</div>
          <div className="answers_list">
            <div className="answer">
              <div className="answer_body">
                <div className="answer_votes">
                  <div className="upvote">
                    <IconContext.Provider
                      value={{ color: "#100720", size: "42px" }}
                    >
                      <AiOutlineCaretUp />
                    </IconContext.Provider>
                  </div>
                  <div className="votes">0</div>
                  <div className="downvote">
                    <IconContext.Provider
                      value={{ color: "#100720", size: "42px" }}
                    >
                      <AiFillCaretDown />
                    </IconContext.Provider>
                  </div>
                </div>
                <div className="answer_text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem quidem voluptatem fuga laudantium, provident,
                  facere nemo illum numquam in impedit alias corporis, soluta
                  tempora repudiandae quod dignissimos odit esse pariatur!
                </div>
              </div>
              <div className="answer_comment">
                <div className="comment_header">Comments</div>
                <div className="add_comment">
                  <span className="comment_input">
                    <input type="text" />
                  </span>
                  <span className="comment_btn">Add</span>
                </div>
                <div className="commentsList">
                  a list of comments
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;

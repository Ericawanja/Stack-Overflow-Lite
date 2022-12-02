import React from "react";

import { AiFillCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import Comment from "../comment";

function Answers (){
    return(
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
             <Comment/>
            </div>
          </div>
        </div>
    )

}

export default Answers;
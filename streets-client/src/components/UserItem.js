import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/me.jpg";

const UserItem = ({
   
    messages,
    username,
    isCorrectUser
}) => (
        <div className="message-box">
            <li className="list-group-item">
                {/* <img
                    src={profileImageUrl || DefaultProfileImg}
                    alt={username}
                    height="100"
                    width="100"
                    className="timeline-image"
                /> */}
                <div className="message-area">
                    <Link to="/">@{username} &nbsp;</Link>
                    {/* <span className="text-muted">
                        <Moment className="text-muted" format="Do MMM YYYY">
                            {date}
                        </Moment>
                    </span> */}
                    <ul>{messages}</ul>
                    {isCorrectUser && (
                        <a className="btn btn-danger">
                            Delete
                        </a>
                    )}
                </div>
            </li>
        </div>
    );

export default UserItem;

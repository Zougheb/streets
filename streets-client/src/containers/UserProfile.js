import React, { Component } from "react";
import { connect } from "react-redux";
import { userProfile } from "../store/actions/user";
import UserItem from "../components/UserItem";

class Profile extends Component {

    componentDidMount() {
        this.props.userProfile();
    }
    render() {
        const { user, currentUser } = this.props;
        let UserInfo = user.map(u => (
            <UserItem
                key={u._id}
                /* date={m.createAt} */
                messgaes={u.messgaes}
                username={u.user.username} 
                /* profileImageUrl={m.user.profileImageUrl} */
                isCorrectUser={currentUser === u.user._id}
            />
        ));
        return (
            <div className="row col-sm-8">
                <div className="offset-1 col-sm-10">
                    <ul className="list-group" id="messages">
                        {UserInfo}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("print state here", state.user)
    return {
        user: state.user,
        currentUser: state.currentUser.user.id
    };
}

export default connect(mapStateToProps, { userProfile })(
    Profile
);


// export default UserProfile;
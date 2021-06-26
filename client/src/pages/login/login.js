import React, {useState} from 'react';
import {loadUser, loadUser1, loginUser} from "../../action/action";
import {Redirect, useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import swat from "sweetalert2";
import Swal from "sweetalert2";


const Login = ({loginUser, isLoggedIn}) => {


    console.log("step1");

    let [data, setData] = useState({
        user_email: '',
        user_password: ''
    });

    let [user, setUser] = useState({
        position: '',
        userId:''
    })


    let {user_email, user_password} = data;

    console.log("step2 : " + isLoggedIn);
     if (isLoggedIn) {
        console.log("step3");
        loadUser1().then((res) => {
            setUser({
                position: res.data.user_position,
                userId: res.data._id
            })

            if (!localStorage.getItem('userEmail')) {
                localStorage.setItem('userEmail', res.data.user_email);
            }

            if (!localStorage.getItem('fullName')) {
                localStorage.setItem('fullName',res.data.user_name);
            }
        });

        switch (user.position) {
            case 'admin':
                return <Redirect to="/admin"/>

            case 'editor':
                return <Redirect to="/editor"/>
            case 'user':
                if (!localStorage.getItem('userType')) {
                    localStorage.setItem('userType', user.position);
                }

                if (!localStorage.getItem('userId')) {
                    localStorage.setItem('userId', user.userId);
                }
                return <Redirect to={"/" + localStorage.getItem('userId')}/>
        }
    }

    const fieldmissAlart = ()=>{
        Swal.fire({
            icon: 'question',
            title: 'Oppss! something missing',
            text: 'Please enter user name and password!'
        })
    }


    const onChange = e => {
        setData({...data, [e.target.name]: e.target.value})
    };

    const submitData = (event) => {

        event.preventDefault();

        if (user_email === "" || user_password === "") {
            fieldmissAlart();
        } else {
            loginUser(user_email, user_password);
            //console.log(loginValue);
        }


    };

    return(
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={(event) => submitData(event)}>
                <div className="form-group-1">
                    <label htmlFor="exampleDropdownFormEmail2" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="user_email"
                        placeholder="email@example.com"
                        onChange={(e) => onChange(e)}
                        value={user_email}
                        name="user_email"
                    />
                </div>
                <div className="form-group-1">
                    <label htmlFor="exampleDropdownFormPassword2" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="user_password"
                        placeholder="Password"
                        onChange={(e) => onChange(e)}
                        value={user_password}
                        name="user_password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
        </div>
    )
}
const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
})
//console.log("maptos: " + isLoggedIn);
export default connect(mapStateToProps, {loginUser})(Login)
import React from "react"
import axios from 'axios'
import ImageContainer from '../containers/ImageContainer'
import Layout from "../components/Layout";
import LoadingIndicator from "../components/LoadingIndicator";
import '../App.css'

class UserProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
        this.mounted = true
    }


    // userID = this.props.match.params.id

    componentDidMount() {
        const { id } = this.props.match.params
        axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
            .then(resp => {
                if (this.mounted) {
                    let user = resp.data
                    this.setState({
                        user
                    })
                }
            })
    }

    componentWillUnmount() {
        this.mounted = false
    }

    render() {
        if (!this.state.user) return (
            <Layout>
                <LoadingIndicator />
            </Layout>
        )
        return (
            <Layout>
                <div className='bg-dark border border-warning rounded-bottom'
                    style={{display: 'inline-flex', flexWrap: 'wrap', width: '100%', fontFamily: 'Courier New' }}>
                    <div className='text-warning profile-image' style={{ flexGrow: '1', width: '50%' }}>
                        <h1>User Profile Page: {this.state.user.username}</h1>
                        {/* <h3>Email: {this.state.user.email}</h3> */}
                        <h3>User ID: {this.state.user.id}</h3>
                    </div>
                    
                    <img className='profile-image border border-warning' style={{ flexGrow: '1', width: '45%', borderRadius:'20%', margin: '16px' }} src={this.state.user.profileImage} alt='user'/>
                    


                </div>
                <ImageContainer id={this.state.user.id} />
            </Layout>
        )
    }
}

export default UserProfilePage
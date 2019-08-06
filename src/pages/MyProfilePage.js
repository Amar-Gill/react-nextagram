import React from 'react'

import axios from 'axios'
import Layout from '../components/Layout'
import LoadingIndicator from '../components/LoadingIndicator'
import UploadModal from '../containers/UploadModal'
import { withRouter } from 'react-router'
import { Form } from 'reactstrap'
import Image from "react-graceful-image";


class MyProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            imageData: null,
            isLoading: true,
            imageModal: false,
            imageUploading: false
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('JWT')

        axios.all([
            axios({
                url: `https://insta.nextacademy.com/api/v1/users/me`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            axios({
                url: `https://insta.nextacademy.com/api/v1/images/me`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        ])
            .then(axios.spread((userRes, imageRes) => {
                console.log(userRes)
                console.log(imageRes)
                this.setState({
                    user: userRes.data,
                    imageData: imageRes.data,
                    isLoading: false
                })
            }))
            .catch(axios.spread((userErr, imageErr) => {
                // console.error(userErr)
                // console.error(imageErr)
                this.props.history.push('/')
            }))

        // axios({
        //     url: `https://insta.nextacademy.com/api/v1/users/me`,
        //     method: 'GET',
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // })
        //     .then(resp => {
        //         console.log(resp)
        //         console.log(resp.data)
        //         this.setState({
        //             user: resp.data,
        //             isLoading: false
        //         })
        //     })
        //     .catch(error => {
        //         console.error(error.response)
        //     })

        // axios({
        //     url: `https://insta.nextacademy.com/api/v1/images/me`,
        //     method: 'GET',
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // })
        //     .then(resp => {
        //         // console.log(resp)
        //         // console.log(resp.data)
        //         this.setState({
        //             imageData: resp.data,
        //             isLoading: false
        //         })
        //     })
        //     .catch(error => {
        //         console.error(error.response) // so that we know what went wrong if the request failed
        //         this.props.history.push('/')
        //     })
    }

    componentDidUpdate() {
        const token = localStorage.getItem('JWT')

        axios({
            url: `https://insta.nextacademy.com/api/v1/images/me`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                this.setState({
                    imageData: response.data
                })
            })

    }

    toggleModal = (e) => {
        e.preventDefault()
        this.setState({
            imageModal: !this.state.imageModal
        })
    }

    toggleImageUploading = () => {
        this.setState({
            imageUploading: !this.state.imageUploading
        })
    }

    render() {
        
        if (this.state.isLoading) {
            return (
                <Layout>
                    <LoadingIndicator size='175px' />
                </Layout>
            )
        }
        return (
            <>
                <UploadModal isOpen={this.state.imageModal}
                    toggleModal={this.toggleModal}
                    toggleImageUploading={this.toggleImageUploading}
                // toggle={this.toggleModal}
                />

                <Layout>

                    <div className='bg-dark border border-warning rounded-bottom' style={{ display: 'inline-flex', flexWrap: 'wrap', width:'100%', fontFamily: 'Courier New' }}>
                        <div className='text-warning profile-image' style={{ flexGrow: '1', width: '50%' }}>
                            <h1>Welcome {this.state.user.username}</h1>
                            <h3>Email: {this.state.user.email}</h3>
                            <h3>Your ID: {this.state.user.id}</h3>
                            <Form onSubmit={this.toggleModal}>
                                <input type='submit'
                                    value='Upload Image'
                                    className='btn btn-warning text-dark'
                                />
                            </Form>
                        </div>

                        <Image className='profile-image border border-warning' style={{ flexGrow: '1', width: '45%', borderRadius: '20%', margin: '16px' }} src={this.state.user.profile_picture} />



                    </div>

                    {
                        this.state.imageData.map((image, i)=> {
                            return (<Image
                                    // style={styles.imgContainer}
                                    className = 'm-1 border border-warning user-images rounded'
                                    src={image}
                                    alt='userimg'
                                    key={i} />)
                        }
                        )
                    }
                </Layout>
            </>
        )
    }
}

export default withRouter(MyProfilePage);
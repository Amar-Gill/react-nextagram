import React from 'react';
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator';

import {
    Modal,
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    FormText
} from 'reactstrap';

class UploadModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageFile: null,
            previewImage: null,
            message: null,
            isLoading: false
        }
    }

    handleFile = e => {
        this.setState({
            previewImage: URL.createObjectURL(e.target.files[0]),
            imageFile: e.target.files[0]
        });
    };

    handleSubmitFile = e => {
        // Prevent the default behaviour of the form submitting
        e.preventDefault();
        //image is uploading
        this.props.toggleImageUploading()
        //set loading state to true
        this.setState({
            isLoading: true
        })
        // Authorization of the user
        let JWT = localStorage.getItem("JWT");
        // Formdata object to hold the image file to send to the server
        let formData = new FormData();
        // Append the key:value pair to the formData object
        formData.append("image", this.state.imageFile);

        axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {
            headers: { Authorization: `Bearer ${JWT}` }
        })
            .then(response => {
                if (response.data.success) {
                    console.log(response)
                    this.setState({
                        message: "Image Uploaded Successfully!",
                        previewImage: null,
                        imageFile: null,
                        isLoading: false
                    })
                }
                this.props.toggleImageUploading()
            })
            .catch(error => {
                console.log(error.response);
                this.setState({
                    message: "Image Failed tp Upload!",
                    previewImage: null,
                    imageFile: null,
                    isLoading: false
                })
                this.props.toggleImageUploading()
            });
    };

    closeModal = (e) => {

        setTimeout(() => {
            this.setState({
                message: null
            })
        }, 1000)
        this.props.toggleModal(e)
    }

    render() {
        const { previewImage, message } = this.state;

        const styles = {
            centerBox: {
                margin: 'auto'
            },
            previewContainer: {
                border: 'solid black',
                height: '350px',
                marginBottom: '8px'
            }
        }

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.closeModal}>
                <ModalHeader>Upload Image</ModalHeader>

                <ModalBody>

                    <div className="card" style={styles.previewContainer}>
                        {this.state.isLoading
                            ? (<LoadingIndicator
                                style={{ height: '175px', width: '175px', margin: 'auto' }} />)
                            : (previewImage ? (
                                <img
                                    src={previewImage}
                                    style={styles.centerBox}
                                    height="50%"
                                    alt='preview'
                                />
                            ) : (
                                    <h3 style={styles.centerBox} className="text-center">
                                        {message ? message : "Live Preview"}
                                    </h3>
                                ))}
                    </div>

                    <Form id='image-form'
                        onSubmit={this.handleSubmitFile}>
                        <FormGroup>
                            <Input
                                type="file"
                                name="image-file"
                                onChange={this.handleFile}
                                multiple={false}
                                // className='btn btn-primary'
                            />
                            <FormText color="muted">
                                Make sure the image being uploaded is a supported format.
                            </FormText>
                        </FormGroup>

                    </Form>

                </ModalBody>

                <ModalFooter>
                    <input disabled={!this.state.imageFile}
                        className="btn btn-primary"
                        form="image-form"
                        color="primary"
                        value={'Upload'}
                        type="submit"
                    />{' '}
                    <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
                </ModalFooter>

            </Modal>
        )
    }
}

export default UploadModal;
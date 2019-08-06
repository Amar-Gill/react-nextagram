import React from 'react'
import axios from 'axios'
// import './App.css';
import Image from "react-graceful-image";


export default class ImageContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            isLoading: true
        }
        this.mounted = true
    }

    componentDidMount() {
        axios('https://insta.nextacademy.com/api/v1/images?userId=' + this.props.id)
            .then(resp => {
                if(this.mounted){
                    let images = resp.data
                    this.setState({ images,
                    isLoading: false })
                }
            })
    }

    componentWillUnmount() {
        this.mounted = false
      }

    render() {
        if (this.state.images.length === 0) return null
        return (
            <div display='inline-flex'>
                {
                    this.state.images.map((image, i) => {
                        return (
                            <Image className='m-1 border border-warning user-images rounded' src={image} alt='image' key={i} />
                        )
                    })
                }
            </div>
        )
    }
}
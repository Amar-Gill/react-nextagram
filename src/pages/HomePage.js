import React from 'react';
import axios from 'axios'
import ImageContainer from '../containers/ImageContainer'
import '../App.css';
import LoadingIndicator from '../components/LoadingIndicator';
import Layout from '../components/Layout';

import {
  Card, CardBody,
   Row, Col, Container
} from 'reactstrap';
import { Link } from 'react-router-dom'


class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoading: true
    }
    // this.mounted = true
  }

  componentDidMount() {
    axios('https://insta.nextacademy.com/api/v1/users')
      .then(resp => {
        // if (this.mounted) {
          let users = resp.data
        this.setState({
          users,
          isLoading: false
        })
        // }
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
      <Layout>
        <Container fluid >
          {
            this.state.users.map(user => {
              return (
                <div key={user.id}>

                  <Row style={{ height: 'auto' }} className='py-1 my-1 bg-secondary border border-warning'>
                    
                    <Col sm='4' xs='12'>
                      
                      <Card className='bg-dark border border-warning ml-1 p-2' style={{ width: '100%' }}>
                        
                        {/* <CardImg style={{ borderRadius: '50%' }} className='border border-warning' top width='100%' src={user.profileImage} alt='profileimg' /> */}
                        <img style={{ borderRadius: '50%', margin: '0 auto' }} className='border border-warning' width='90%' src={user.profileImage} alt='profileimg' />
                        
                        <CardBody>
                          
                          <Link to={'/users/' + user.id} className='card-title text-warning'>{user.username}</Link>
                        
                        </CardBody>
                      
                      </Card>
                    
                    </Col>
                    <Col sm='8' xs='12'>
                      <ImageContainer id={user.id} />
                    </Col>
                  </Row>
                </div>
              )
            })
          }
        </Container>
      </Layout>
    )
  }


}

export default HomePage;

import React from "react"
import PropTypes from "prop-types"
import ReactDOM from 'react-dom'
import{Card, CardImg, Button, CardTitle, CardBody, CardSubtitle, CardText} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCog } from '@fortawesome/free-solid-svg-icons'

////parts
import Avatar from './avatar'
import ChangeAvatar from './changeAvatar'
import CloudFeed from  './feed'
import CloudPost from './post'
import FeedTopNav from "./feedTopNav.js"
import Navbar from './nav'
import NewPostBox from './newPostBox'
import UserMap from './userMap'

/////fetches
import{ getClosePosts } from './API'
import{ getCloseUsers } from './API'


class Home extends React.Component {
  constructor(props){
    super(props)
      this.state={
        closeUsers:[],
        closePosts: [],
        posts:[],
        test: "it worked",
        visible: "modalHide"
      }
  }

  componentWillMount(){
    getCloseUsers()
      .then(APIusers => {
        this.setState({
          closeUsers: APIusers
        })
      })
      getClosePosts()
        .then(APIposts => {
            this.setState({
                closePosts: APIposts
            })
        })

      this.setState({posts: this.props.posts})
  }
  componentDidUpdate(prevProps){
        if (this.props.posts.length != prevProps.posts.length) {
          getPosts()
            .then(APIposts => {
              this.setState({
                posts: APIposts
              })
            })
          this.setState({posts: this.props.posts})
     }
   }

  render () {

    let{ feed, currentLocation, closeUsers, posts, closePosts}=this.state

    let{ renderProfiles }=this
    const{  myLocation, statusFilter, getCloseUsers, current_user, sign_in, sign_out, logged_in }=this.props
    return (

        <div className = "home">

          <Navbar
            current_user = { current_user }
            sign_in = { sign_in }
            sign_out = { sign_out }
            logged_in = { logged_in }
          />

          <div className="grid-container">
            <div className="Feed">

              <FeedTopNav
                current_user={current_user}
                sign_in={sign_in}
                sign_out={sign_out}
                logged_in={logged_in}
              />

              <div className="Feed-Posts">
                <CloudFeed
                  posts={posts}
                  statusFilter={statusFilter}
                  closePosts={closePosts}
                  getClosePosts={getClosePosts}
                />
              </div>

            </div>

            <div className="Map-Container">
              <UserMap
                closeUsers= {closeUsers}
              />
              {current_user != null &&
                <div className="Comment-Box">
                  <CloudPost
                    current_user={current_user}
                  />
                </div>
              }
              <div className="Filter-Area">
                <p>Filter</p>
                { myLocation.length != 0 &&
                  <p>
                    Lat: {myLocation.location.lat}
                    Lng: {myLocation.location.lng}
                  </p>
                }
                <p>this button does not work currently</p>
                <Button>
                  {current_user && "Confirm Location" || "Hide my Location"}
                </Button>
              </div>
            </div>

          </div>
        </div>

       );
     }
   }

export default Home

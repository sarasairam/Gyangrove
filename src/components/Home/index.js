import {Component} from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import {Grid} from 'react-loader-spinner'
import {Circles} from 'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import EventCard from '../Events'
import Upcomming from '../Upcomming'

import './index.css'

const apiStatus={
  initial:"initial",
  success:"success",
  failure:"failure",
  inProgress:"inProgress"
}

class Home extends Component{
  state={recommended:[],upcomming:[],page:1,apiStatusR:apiStatus.initial,apiStatusU:apiStatus.initial,hasMore:true}

  componentDidMount(){
    this.getData1()
    this.getData2()
  }

  fetchData=()=>{
    const {page}= this.state
    if(page<5){
        this.setState(prev=>({page:prev.page+1}),this.getData2)
    }else{
        this.setState({hasMore:false})
    }
    }

  getData1=async()=>{
    this.setState({apiStatusR:apiStatus.inProgress})
    const url1 = 'https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco'
    const response1 = await fetch(url1)
    if(response1.ok){
      const responseData1 = await response1.json()
      this.setState({recommended:responseData1.events,apiStatusR:apiStatus.success})
    }else{
      this.setState({apiStatusR:apiStatus.failure})
    }
  }

  getData2=async()=>{
    const {page} = this.state
    const url2 = `https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=${page}&type=upcoming`
    const response2 = await fetch(url2)
    if(response2.ok){
      const responseData2 = await response2.json()
      this.setState(prev=>({upcomming:[...prev.upcomming,...responseData2.events],apiStatusU:apiStatus.success}))
    }else{
      this.setState({apiStatusU:apiStatus.failure})
    }
  }

  renderRFailureView = () => (
    <div className='failure-view'>
      <h1>Please try again</h1>
      <button type="button" className='failure' onClick={this.getData1}>Re-try</button>
    </div>
  )

  renderRLoadingView = () => (
    <div className="loader-container">
      <Grid type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderULoadingView = () => (
    <div className="loader-container">
      <Circles type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderRView=()=>{
    const {recommended} = this.state
    return(
      <>
      <div className='bottom-top'>
              <div className='bottom-top-left'>
                <p className='recommended-para'>Recommended shows</p>
                <p><IoIosArrowRoundForward /></p>
              </div>
              <button type='button' className='recommended-para button-see'>See all</button>
            </div>
            <ul className='recommended-container'>
              {recommended.map(event=>(
                <EventCard key={event.eventName} event={event}/>
              ))}
            </ul>
    </>
    )
  }


  loadRView=()=>{
    const {apiStatusR} = this.state
    switch (apiStatusR) {
      case apiStatus.success:
        return this.renderRView()
      case apiStatus.failure:
        return this.renderRFailureView()
      case apiStatus.inProgress:
        return this.renderRLoadingView()
      default:
        return null
    }
  }
  renderUView=()=>{
    const {upcomming,hasMore} = this.state
    return(
      <>
        <div className='Upcomming-top-left'>
                <p className='upcomming-para'>Upcomming Events</p>
                <p><IoIosArrowRoundForward /></p>
                <div>
                <p className='small-seeall'>See all</p>
                </div>
            </div>
            <div className='upcomming-main-container'>
                {
                    <InfiniteScroll
                    dataLength={upcomming.length} 
                    next={this.fetchData}
                    hasMore={hasMore}
                    loader={this.renderULoadingView()}
                    endMessage={
                      <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                      </p>
                    }
                    >
                    <div className='upcomming-main'>
                        {upcomming.map((each,index)=>(
                            <Upcomming key={index} data={each} />
                        ))}
                    </div>
                  </InfiniteScroll>
                }
            </div>
      </>
    )
  }

  loadUView=()=>{
  const {apiStatusU} = this.state
    switch (apiStatusU) {
      case apiStatus.success:
        return this.renderUView()
      case apiStatus.failure:
        return this.renderRFailureView()
      default:
        return null
    }
  }

  render(){
    return(
      <div className='main-container'>
        <div className='nav'>
        <div className='nav-left'>
          <h1 className='logo-heading'>BookUsNow</h1>
          <div className='nav-left-bottom'>
          <p><FaLocationDot /></p>
          <p>Mumbai, India</p>
          <p><MdOutlineKeyboardArrowRight /></p>
          </div>
        </div>
        <div className='nav-small'>
        <p className='search-icon-small'><IoIosSearch /></p>
        <p className='love-icon'><FaHeart /></p>
        <p><FaUser /></p>
        </div>
        <div className='nav-center'>
            <div className='nav-center-top'>
              <button type="button" className='categories-button'>
                <p className='hamberger-icon'><GiHamburgerMenu /></p>
                <p className='nav-center-categories'>Categories</p>
              </button>
              <div className='nav-center-search-container'>
                <input className='input-element' placeholder='DJI phantom' id="inputElement"/>
                <p className='search-icon'><IoIosSearch /></p>
              </div>
            </div>
            <div className='nav-center-bottom'>
              <button type='button' className='nav-center-bottom-button'>Live shows</button>
              <button type='button' className='nav-center-bottom-button'>Streams</button>
              <button type='button' className='nav-center-bottom-button'>Movies</button>
              <button type='button' className='nav-center-bottom-button'>Plays</button>
              <button type='button' className='nav-center-bottom-button'>Events</button>
              <button type='button' className='nav-center-bottom-button'>Sports</button>
              <button type='button' className='nav-center-bottom-button'>Activities</button>
            </div>
        </div>
        <div className='nav-right'>
              <div className='favorites-container'>
              <p className='love-icon'><FaHeart /></p>
              <p>Favorites</p>
              </div>
              <button type="button" className='sign-in-button'>Sign In</button>
            </div>
        </div>
        <div className='nav-center-bottom-small'>
              <button type='button' className='nav-center-bottom-button'>Live shows</button>
              <button type='button' className='nav-center-bottom-button'>Streams</button>
              <button type='button' className='nav-center-bottom-button'>Movies</button>
              <button type='button' className='nav-center-bottom-button'>Plays</button>
              <button type='button' className='nav-center-bottom-button'>Events</button>
              <button type='button' className='nav-center-bottom-button'>Sports</button>
              <button type='button' className='nav-center-bottom-button'>Activities</button>
            </div>
        <div className='background-container'>
          <div className='container'>
            <h1 className='main-heading'>Discover Exciting Events Happening Near You - Stay Tuned for Updates!</h1>
            <p className='main-para'>Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosq ad litora torquent per conubia nostra, per</p>
          </div>
          <div className='bottom-container'>
            {this.loadRView()}
          </div>
          <div className='upcomminig-container'>
            {this.loadUView()}
          </div>
        </div>
      </div>
    )
  }
}
export default Home
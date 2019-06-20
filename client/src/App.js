import React, { Component } from 'react'
import { ShopList, NavBar, SignInUp } from './components';
import { Spinner } from 'react-bootstrap';
import ApiService from './utils/Api';

export class App extends Component {
  constructor() {
    super();
    this.api = new ApiService() /// This is Baaaad.... shouldn't be here
    this.state = {
      authenticated: false,
      favTabSelected: false,
      user: null,
      loading: false,
      allShop: [],
      toShow:[],
      fav:[]
    }
  }

  AuthenticateUser = (user) => {
    this.setState({
      authenticated: true,
      user: user,
    });
    this.getAllShops();
    this.updateFav();
  }

  tweakShopsToShow = () => {
    this.setState({
      toShow:[...this.state.allShop.filter(x=>this.state.fav.includes(x))]
    })
  }

  getAllShops = async() => {
    const allShop = await this.api.get('/shops'); //Not a good way: Should separate the logic from display
    this.setState({
      allShop:allShop
    })
  }

  like = async(shop_id) =>{
    await this.api.put(`/users/${this.state.user._id}/like/${shop_id}`);
    this.updateFav();
  }

  dislike = async(shop_id)=>{
    await this.api.put(`/users/${this.state.user._id}/dislike/${shop_id}`);
    this.updateFav();
  }

  updateFav = async() =>{
    let fav = await this.api.get(`/users/${this.state.user._id}/shops`);
    await this.setState({
      fav:fav
    })
    this.tweakShopsToShow();
  }

  toggelShowAll = ()=>{
    this.setState({
      favTabSelected: false,
    })
  }

  toggelShowFav = () => {
    this.setState({
      favTabSelected: true,
    })
  }  

  logout = ()=>{
    this.setState({
      authenticated:false,
      user:null,
    })
  }

  render() {
    let { authenticated, loading, favTabSelected, fav, allShop } = this.state;
    return (
      <>
        <NavBar 
          toggelShowAll = {this.toggelShowAll}
          toggelShowFav = {this.toggelShowFav}
          authenticated = {this.state.authenticated}
          user = {this.state.user}
          logout = {this.logout}
        />
        {!authenticated
          && <SignInUp
            auth = {this.AuthenticateUser}
            />}

        {authenticated
          && <ShopList
            like={this.like}
            dislike={this.dislike}
            list={favTabSelected ? fav : allShop} />}
      </>
    )
  }
}

export default App

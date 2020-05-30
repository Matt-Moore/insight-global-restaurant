import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  function Search(props) {
    return (
      <header id="sitehead">
        {JSON.stringify(props.cities)}
        <input name="city" placeholder="City" aria-label="Search by city" aria-controls="content" onChange={props.searchCity}></input>
        <input name="refine" placeholder="Refine" aria-label="Refine search results" aria-controls="content" onChange={props.searchRefine}></input>
      </header>
    )
  }

  function Restaurant(props) {
    const image = 'https://via.placeholder.com/512x288.png?text=' + props.name.replace(/\s/g, '+');
    const value = calulateValue(props.price);

    return (
      <article className="card">
        <header>
          <h2>{props.name}</h2>
          <img src={image} width="512" height="288" title={props.name} alt=""></img>
        </header>
        <div>{props.address}</div>
        <footer>
          <span title={value.text + ' cost'} aria-label={value.text + ' cost'}>
            <span aria-hidden="true">{value.symbol}</span>
          </span>
        </footer>
      </article>
    );
  }

  function Restaurants(props) {
    return (
      <div id="restaurants" className="cardlist">
        {props.restaurants.map((restaurant, index) => 
          <div key={index.toString()}>
            {Restaurant(restaurant)}
          </div>
        )}
      </div>
    );
  }

  function RestaurantCount(props) {
    if (props.count.total) {
      return <small>Showing {props.count.from} to {props.count.to} of {props.count.total} found in {titleCase(props.count.city)}</small>
    } else {
      return <small>No results</small>
    }
  }

  class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        city: '',
        refine: '',
        restaurants: [],
        filtered: [],
        page: 1,
        pageCount: 100,
        totalCount: 0,
      }
    }

    searchCity(city) {
      if (city.length > 3) {
        fetch('https://opentable.herokuapp.com/api/restaurants?city=' + city + '&per_page=' + this.state.pageCount)
          .then(res => res.json())
          .then(
            (result) => {
              console.log("searchCity()")
              console.log(result)
              this.setState({
                isLoaded: true,
                totalCount: result.total_entries,
                restaurants: result.restaurants
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          );
      }

      this.setState({
        city: city,
        filtered: this.state.restaurants 
      });
    }

    searchRefine(refine) {
      let filter = new RegExp(escapeRegex(refine), 'i');

      this.setState({
        filtered: this.state.restaurants.filter((restaurant) => (restaurant.name.match(filter) || restaurant.area.match(filter) || restaurant.address.match(filter)))
      });
    } 

    render() {
      let count = {
        from: (this.state.page - 1) * this.state.pageCount + 1,
        to: this.state.page * this.state.pageCount,
        total: this.state.totalCount,
        city: this.state.city,
      }

      if (count.to > count.total) {
        count.to = count.total;
      }

      return (
        <div>{JSON.stringify(this.state.cities)}
          <Search
            searchCity={(event) => this.searchCity(event.target.value)}
            searchRefine={(event) => this.searchRefine(event.target.value)} />
          <main id="content" aria-live="polite">
            <h1>Restaurants</h1>
            <RestaurantCount count={count} />
            <Restaurants 
              restaurants={this.state.filtered} 
              />
          </main>
        </div>
      )
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Page />,
    document.getElementById('root')
  );
  
  function calulateValue(cost) {
    switch (cost) {
        case 4:
          return {
            text: 'Expensive',
            symbol: '$$$$'
          };
        case 3:
          return {
            text: 'Standard',
            symbol: '$$$'
          };
        case 2:
          return {
            text: 'Thrifty',
            symbol: '$$'
          };
        default:
          return {
            text: 'Cheap',
            symbol: '$'
          };
      }
  }

  function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  function titleCase(string) {
    return string.replace(/\b(\w)/g, (a, c1) => c1.toUpperCase()).replace(/\B(\w)/g, (a, c1) => c1.toLowerCase());
  }



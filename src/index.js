import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  function Search(props) {
    return (
      <div>
        <input name="city" title="Search by city" type="search" placeholder="City" aria-required="true" aria-controls="content" onChange={props.searchCity}></input>
        <input name="refine" title="Refine search results" type="search" placeholder="Refine" aria-controls="content" onChange={props.searchRefine}></input>
      </div>
    )
  }

  function Filters(props) {
    return (
      <div>
        <select name="price" title="Filter by price" aria-controls="content" onChange={props.searchFilter}>
          <option value="0">Price</option>
          <option value="4">$$$$</option>
          <option value="3">$$$</option>
          <option value="2">$$</option>
          <option value="1">$</option>
        </select>
        <select name="sort" title="Sort results" aria-controls="content" onChange={props.searchFilter}>
          <option value="0">A-Z</option>
          <option value="priceasc">Price (low to high)</option>
          <option value="pricedes">Price (high to low)</option>
        </select>
      </div>
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
    } else if (!props.count.city.length) {
      return <small>Enter a city above</small>
    } else {
      return <small>No results</small>
    }
  }

  class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        city: '',
        refine: /.*/i,
        restaurants: [],
        filtered: [],
        filters: {price: false, sort: false},
        page: 1,
        pageCount: 100,
        totalCount: 0,
      }
    }

    searchCity(city) {
      if (city.length > 0) {
        fetch('https://opentable.herokuapp.com/api/restaurants?city=' + city + '&per_page=' + this.state.pageCount)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                restaurants: result.restaurants,
                totalCount: result.total_entries,
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                restaurants: [],
                totalCount: 0,
                error,
              });
            }
          )
          .then(() => this.filterRestaurants());
      } else {
        this.setState({
          restaurants: [],
          totalCount: 0,
        });

        this.filterRestaurants();
      }

      this.setState({
        city: city,
      });
    }

    searchRefine(refine) {
      this.setState({
        refine: new RegExp(escapeRegex(refine), 'i')
      })

      this.filterRestaurants();
    }

    searchFilter(filter) {
      let filters = this.state.filters;

      switch (filter.name) {
        case 'price':
          if (filter.value == 0) {
            filters.price = false;
          } else {
            filters.price = parseInt(filter.value);
          }

          break;
        case 'sort':
          if (filter.value == 0) {
            filters.sort = false;
          } else {
            filters.sort = filter.value;
          }

          break;
      }

      this.setState({
        filters: filters,
      });

      this.filterRestaurants();
    }


    filterRestaurants() {
      let filtered = this.state.restaurants.filter((restaurant) => (restaurant.name.match(this.state.refine) || restaurant.area.match(this.state.refine) || restaurant.address.match(this.state.refine)));

      if (this.state.filters.price) {
        filtered = filtered.filter((restaurant) => (restaurant.price === this.state.filters.price));
      }

      if (this.state.filters.sort) {
        switch (this.state.filters.sort) {
          case 'priceasc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'pricedes':
            filtered.sort((a,b) => b.price - a.price);
            break;
        }
      }

      this.setState({
        filtered: filtered
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
        <div>
          <header id="sitehead" role="search" aria-label="Search restaurants">
            <Search
              searchCity={(event) => this.searchCity(event.target.value)}
              searchRefine={(event) => this.searchRefine(event.target.value)} />
            <Filters
              searchFilter={(event) => this.searchFilter(event.target)}
             />
          </header>
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



import React, { Component } from "react";
import arrow from "../arrow.png";
import classNames from "classnames";

class Filter extends Component {
  state = {
    magnitudeFilter: -1,
    timeFilter: null,
    selectedTime: 672,
    filterMenuHidden: false
  };

  handleSubmit = event => {
    event.preventDefault();
  };
  handleMagnitudeChange = event => {
    this.setState({ magnitudeFilter: event.target.value });
  };

  handleTimeChange = event => {
    const now = new Date();
    now.setHours(now.getHours() - event.target.value);
    const startTime = now.toISOString();
    this.setState({ timeFilter: startTime, selectedTime: event.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.timeFilter !== prevState.timeFilter) {
      this.props.fetchFilteredData(
        this.state.magnitudeFilter,
        this.state.timeFilter
      );
    } else if (this.state.magnitudeFilter !== prevState.magnitudeFilter) {
      this.props.fetchFilteredData(
        this.state.magnitudeFilter,
        this.state.timeFilter
      );
    }
  }

  toggleFilterVisible = () => {
    this.setState(currentState => {
      return { filterMenuHidden: !currentState.filterMenuHidden };
    });
  };
  render() {
    const filterMenuClasses = classNames({
      filter: true,
      "filter--hidden": this.state.filterMenuHidden
    });
    const filterButtonClasses = classNames({
      filter__hide: true,
      "filter__hide--menuHidden": this.state.filterMenuHidden
    });
    return (
      <aside className="filter__container">
        <button
          className={filterButtonClasses}
          onClick={this.toggleFilterVisible}
        >
          <img src={arrow} alt="minimise" />
        </button>
        <div className={filterMenuClasses}>
          <h2>Filters</h2>
          <form onSubmit={this.handleSubmit}>
            <h3>filter by magnitude</h3>
            <label>
              <select
                name="magSelector"
                id="magSelector"
                value={this.state.magnitudeFilter}
                onChange={this.handleMagnitudeChange}
              >
                <option value={-1}>all</option>
                <option value={2}>greater than 2</option>
                <option value={4}>greater than 4</option>
                <option value={6}>greater than 6</option>
              </select>
            </label>
          </form>
          <form onSubmit={this.handleSubmit}>
            <h3>filter by time</h3>
            <label>
              <select
                name="timeSelector"
                id="timeSelector"
                value={this.state.selectedTime}
                onChange={this.handleTimeChange}
              >
                <option value={672}>all</option>
                <option value={1}>within last hour</option>
                <option value={24}>within last 24 hours</option>
                <option value={168}>within last week</option>
              </select>
            </label>
          </form>
        </div>
      </aside>
    );
  }
}

export default Filter;

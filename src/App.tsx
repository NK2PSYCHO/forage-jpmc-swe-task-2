import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean, // This state variable controls whether the graph should be displayed or not.
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  /**
   * This function checks if the showGraph state is true.
   * If it is, it renders the Graph component with the current state data.
   */
  renderGraph() {
    if(this.state.showGraph)
      return (<Graph data={this.state.data}/>)
  }

  /**
   * Get new data from server and update the state with the new data
   */
  /**
   * This function is responsible for fetching new data from the server.
   * It sets an interval to fetch data every 100ms.
   * The data from the server is then set to the state.
   * The showGraph state is also set to true to ensure the graph is displayed after data fetch.
   * The interval is cleared after 1000 iterations to stop data fetch.
   */
  getDataFromServer() {
    let x = 0; // Initialize a counter variable to 0.
    // Set an interval to execute the function every 100ms.
    const interval = setInterval (() => {
      // Call the DataStreamer's getData function to fetch data from the server.
      DataStreamer.getData((serverResponse:ServerRespond[]) => {
        // Update the state with the new data fetched from the server.
        this.setState({
          data: serverResponse, // Update the data state with the new data.
          showGraph: true, // Set the showGraph state to true to display the graph.
        });
      });
      x++; // Increment the counter variable by 1 after each iteration.
      // If the counter variable exceeds 1000, clear the interval to stop fetching data.
      if (x > 1000) {
        clearInterval (interval);
      }
    }, 100); // The interval is set to 100ms.
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;